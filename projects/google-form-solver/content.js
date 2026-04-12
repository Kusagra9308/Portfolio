// content.js

function getQuizData() {
    const questions = [];
    // Google Forms usually groups questions in elements with these attributes
    const questionContainers = document.querySelectorAll('[role="listitem"]');

    questionContainers.forEach((container, index) => {
        // Try to find the question text
        const titleElement = container.querySelector('[role="heading"], .M7eMe, .FreebirdFormviewerComponentsQuestionBaseTitle');
        if (!titleElement) return;

        const questionText = titleElement.innerText.trim();
        const options = [];
        
        // Find radio or checkbox options
        // Google Forms uses specific classes for option labels
        const optionElements = container.querySelectorAll('[role="radio"], [role="checkbox"], .aDTYNe');
        
        optionElements.forEach((opt, optIndex) => {
            // Find the label text for this option
            // Often it's the next sibling or a child with specific class
            const labelText = opt.closest('label')?.innerText.trim() || 
                             opt.parentElement?.innerText.trim() || 
                             "Option " + (optIndex + 1);
            
            options.push({
                text: labelText,
                element: opt
            });
        });

        if (options.length > 0) {
            questions.push({
                id: index,
                question: questionText,
                options: options.map(o => o.text),
                _elements: options.map(o => o.element)
            });
        }
    });

    return questions;
}

function showStatus(msg) {
    let statusEl = document.getElementById('gpt-status-bar');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'gpt-status-bar';
        statusEl.style.position = 'fixed';
        statusEl.style.bottom = '20px';
        statusEl.style.right = '20px';
        statusEl.style.backgroundColor = 'rgba(0,0,0,0.8)';
        statusEl.style.color = 'white';
        statusEl.style.padding = '10px 20px';
        statusEl.style.borderRadius = '30px';
        statusEl.style.fontSize = '12px';
        statusEl.style.zIndex = '1000000';
        statusEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
        document.body.appendChild(statusEl);
    }
    statusEl.textContent = msg;
    setTimeout(() => { if(statusEl) statusEl.remove(); }, 5000);
}

function showAnswers(answers) {
    clearDots();
    const quizData = getQuizData();
    let markedCount = 0;
    
    answers.forEach(ans => {
        const question = quizData.find(q => q.id === ans.questionId);
        if (question && question._elements[ans.correctOptionIndex]) {
            const target = question._elements[ans.correctOptionIndex];
            const dot = document.createElement('div');
            dot.className = 'gpt-answer-dot';
            dot.style.display = 'inline-block';
            
            // Try to find the best place to append (container or label)
            const labelContainer = target.closest('.aDTYNe') || target.closest('label') || target.parentElement;
            labelContainer.appendChild(dot);
            markedCount++;
        }
    });
    
    showStatus(`Marked ${markedCount} answers!`);
}

function toggleDots() {
    const dots = document.querySelectorAll('.gpt-answer-dot');
    if (dots.length === 0) return;

    const isHidden = dots[0].style.display === 'none';
    dots.forEach(dot => {
        dot.style.display = isHidden ? 'inline-block' : 'none';
    });
}

function clearDots() {
    const dots = document.querySelectorAll('.gpt-answer-dot');
    dots.forEach(dot => dot.remove());
}

function toggleDots() {
    const dots = document.querySelectorAll('.gpt-answer-dot');
    if (dots.length === 0) return;

    const isHidden = dots[0].style.display === 'none';
    dots.forEach(dot => {
        dot.style.display = isHidden ? 'inline-block' : 'none';
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getQuizData") {
        const data = getQuizData().map(q => ({
            id: q.id,
            question: q.question,
            options: q.options
        }));
        sendResponse({ data });
    } else if (request.action === "showAnswers") {
        clearDots();
        showAnswers(request.answers);
        sendResponse({ status: "done" });
    } else if (request.action === "toggleDots") {
        toggleDots();
        sendResponse({ status: "done" });
    } else if (request.action === "notify") {
        alert(request.message);
        sendResponse({ status: "done" });
    } else if (request.action === "highlight") {
        const quizData = getQuizData();
        const overlays = [];
        
        quizData.forEach(q => {
            // Highlight the question title and all options
            q._elements.concat([document.querySelectorAll('[role="listitem"]')[q.id]]).forEach(el => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const overlay = document.createElement('div');
                overlay.className = 'gpt-highlight-overlay';
                overlay.style.top = (rect.top + window.scrollY) + 'px';
                overlay.style.left = (rect.left + window.scrollX) + 'px';
                overlay.style.width = rect.width + 'px';
                overlay.style.height = rect.height + 'px';
                document.body.appendChild(overlay);
                overlays.push(overlay);
            });
        });

        setTimeout(() => {
            overlays.forEach(o => o.remove());
        }, 1000);
        
        sendResponse({ status: "done" });
    }
    return true;
});
