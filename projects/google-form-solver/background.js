// background.js

chrome.commands.onCommand.addListener((command) => {
    if (command === "fetch-answers" || command === "refetch-answers") {
        handleFetch();
    } else if (command === "hide-dots") {
        handleHide();
    }
});

async function handleHide() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;
    chrome.tabs.sendMessage(tab.id, { action: "toggleDots" });
}

async function handleFetch() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url.includes("docs.google.com/forms")) return;

    try {
        const settings = await chrome.storage.local.get(['gemini_api_key']);
        const apiKey = settings.gemini_api_key;

        if (!apiKey) {
            chrome.tabs.sendMessage(tab.id, { 
                action: "notify", 
                message: "Please set your FREE Google Gemini API key in the extension settings." 
            });
            return;
        }



        const domResponse = await chrome.tabs.sendMessage(tab.id, { action: "getQuizData" });
        if (!domResponse || !domResponse.data || domResponse.data.length === 0) {
            chrome.tabs.sendMessage(tab.id, { action: "notify", message: "No questions found." });
            return;
        }



        const modelsToTry = ["gemini-flash-latest", "gemini-pro-latest", "gemini-2.0-flash", "gemini-2.5-flash"];
        let answers = null;
        let lastError = null;

        for (const modelName of modelsToTry) {
            try {
                answers = await fetchAnswersFromGemini(apiKey, domResponse.data, modelName);
                if (answers) break;
            } catch (err) {
                lastError = err;
                console.log(`Failed with ${modelName}, trying next...`);
            }
        }

        if (!answers) throw lastError;
        
        chrome.tabs.sendMessage(tab.id, { action: "showAnswers", answers });

    } catch (err) {
        console.error(err);
        chrome.tabs.sendMessage(tab.id, { action: "notify", message: "Error: " + err.message });
    }
}

async function fetchAnswersFromGemini(apiKey, quizData, modelName) {
    const prompt = `You are a world-class expert in software applications and competitive exams. 
I will provide a list of questions and options from a Google Form.
For each question, select the MOST ACCURATE answer based on the latest version of the software (like Google Slides/Docs) or general knowledge.
Return ONLY a JSON array of objects with "questionId" and "correctOptionIndex".

Quiz Data:
${JSON.stringify(quizData)}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const result = await response.json();
    if (result.error) {
        if (result.error.message.includes("not found")) {
            const models = await listAvailableModels(apiKey);
            throw new Error(`Model not found. Available models for your key: ${models.join(", ")}`);
        }
        throw new Error(result.error.message);
    }

    const content = result.candidates[0].content.parts[0].text;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("AI response format error");
    
    return JSON.parse(jsonMatch[0]);
}

async function listAvailableModels(apiKey) {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const result = await response.json();
        return result.models
            .filter(m => m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name.replace("models/", ""));
    } catch (err) {
        return ["Unable to list models"];
    }
}
