const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EXTENSION_START_DATE = new Date("2026-03-14T00:00:00");
const app = express();
const REVIEW_STEPS = [1, 3, 7, 15, 30, 60, 120, 240, 480, 720, 1095];

app.use(cors());
app.use(express.json());

const DAY = 86400000;

mongoose
  .connect(
    "mongodb+srv://kushagrasinghchauhan6_db_user:ggEh3DukZlgcDaDU@cluster0.jbynfzs.mongodb.net/leetcode_revision",
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const ProblemSchema = new mongoose.Schema({
  username: String,
  slug: String,
  title: String,
  lastSolved: Date,
  interval: Number,
  nextReview: Date,
  lastReviewed: Date,
});

ProblemSchema.index({ username: 1, slug: 1 }, { unique: true });

const Problem = mongoose.model("Problem", ProblemSchema);

app.post("/sync-problems", async (req, res) => {
  try {
    const { username, problems } = req.body;

    const existing = await Problem.find({ username });

    const existingSlugs = new Set(existing.map((p) => p.slug));

    await Problem.deleteMany({
      lastSolved: { $lt: new Date("2026-03-14T00:00:00") },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const EXTENSION_START_DATE = new Date("2026-03-14T00:00:00");

    const newProblems = problems
      .filter((p) => {
        if (existingSlugs.has(p.slug)) return false;

        const solvedDate = new Date(p.timestamp * 1000);

        return solvedDate >= EXTENSION_START_DATE;
      })
      .map((p) => {
        const lastSolved = new Date(p.timestamp * 1000);

        const firstReview = new Date(lastSolved.getTime() + DAY);

        const now = new Date();

        const nextReview = firstReview < now ? now : firstReview;

        return {
          username,
          slug: p.slug,
          title: p.title,
          lastSolved,
          interval: 0,
          nextReview,
        };
      });

    if (newProblems.length > 0) {
      await Problem.insertMany(newProblems);
    }

    res.json({
      inserted: newProblems.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sync failed" });
  }
});

app.get("/today-revision/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const now = new Date();

    const problems = await Problem.find({
      username,
      nextReview: { $lte: now },
    });

    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.post("/update-review", async (req, res) => {
  try {
    const { username, slug, result } = req.body;

    const problem = await Problem.findOne({ username, slug });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    let interval = problem.interval;

    if (result === "solved") {
      interval = Math.min(interval + 1, REVIEW_STEPS.length - 1);
    } else if (result === "hint") {
      interval = Math.max(interval - 1, 0);
    } else if (result === "fail") {
      interval = 0;
    }

    problem.interval = interval;
    const days = REVIEW_STEPS[interval];
    problem.nextReview = new Date(Date.now() + days * DAY);
    problem.lastReviewed = new Date();

    await problem.save();

    res.json(problem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

app.get("/all/:username", async (req, res) => {
  const problems = await Problem.find({
    username: req.params.username,
  });

  res.json(problems);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
