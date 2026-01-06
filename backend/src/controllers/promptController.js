import CareerPath from "../models/CareerPath.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";
dotenv.config();

// ✅ Gemini model from LangChain
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", 
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

export const runPrompt = async (req, res) => {
  try {
    let { skills} = req.body;


    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: "Skills (array) and country are required" });
    }

    // Normalize inputs
    skills = skills.map((s) => s.trim().toLowerCase()).sort();
    const skillsKey = skills.join(", ");
    //  Check cache
    const existing = await CareerPath.findOne({ skillsKey });
    if (existing) {
      console.log(" Returning cached response from MongoDB");
      if (!req.user.careerPaths.includes(existing._id)) {
      req.user.careerPaths.push(existing._id);
      await req.user.save();
    }

      return res.json({ success: true, id: existing._id, tree: existing.tree });
    }

    //  Build prompt
const careerPrompt = new PromptTemplate({
  inputVariables: ["skills"],
  template: `
You are an AI career advisor. The user will provide their list of skills.
Your task is to generate a **career path tree** in JSON format.

🔑 Rules for JSON structure:
- Think of it as a **tree-like hierarchy**:
  - The nodes are main career paths.
  - Each career path may have **sub-career paths**, going deeper until reaching a **specialization (leaf node)**.
  - **extra_skills_needed** should list concrete, domain-specific capabilities required for that role.
  - A specialization is the deepest node and does not contain further sub-career paths.
- At each level, include at most **10 sub-career paths**, selecting the most popular and relevant ones.
- Each node in the tree must have this schema:

{{
  "name": "Career Path or Specialization",
  "description": "Short description of this path",
  "future_trends": ["trend1", "trend2"],
  "extra_skills_needed": ["skill1", "skill2"],
  "sub_career_paths": [ ... recursive children, or empty list if specialization ... ]
}}

🎯 Relevance rules (CRITICAL):
- Generate ONLY career paths that are **strongly relevant** to the user’s provided skills.
- Do NOT include career paths that require a complete skill reset or are weakly related.
- Prefer career paths that:
  - Naturally extend the user’s existing skills, OR
  - Require a reasonable, learnable skill transition.
- If a career path is not a logical progression from the user’s skills, EXCLUDE it.

🔒 Strict constraints (MANDATORY):
- "extra_skills_needed" MUST contain ONLY:
  - Tools
  - Techniques
  - Methods
  - Certifications
  - Equipment
  - Domain-specific competencies
- NO explanations, NO sentences, NO personality traits.
- Each item must be **1–3 words max**.
- Max **15 items** in "extra_skills_needed".
- The items must be appropriate to the career domain (not necessarily technical).

⚠️ Important:
- Return **only valid JSON** following this schema.
- Do not include any text outside of JSON.
- First node (root) should be the title node with only **name** and **sub_career_paths** as fields.

Now, generate the career path tree for this user:

Skills: {skills}
`,
});


const formattedPrompt = careerPrompt.format({ skills });

const chain = careerPrompt.pipe(model).pipe(new StringOutputParser());

const rawOutput = await chain.invoke({ 
  skills: skills.join(", ")
});
// Clean Gemini output (remove markdown fences if present)
const formattedOutput = rawOutput.trim().replace(/```json|```/g, "");



    let jsonResponse;
    try {
      jsonResponse = JSON.parse(formattedOutput);

    } catch (e) {
      console.error(" JSON Parsing Error:", e);
      return res.status(500).json({ error: "Failed to parse model response to JSON" });
    }

    // Save the parsed JSON object to the database
     
    const entry = await CareerPath.create({
      skills,
      skillsKey,
      tree: jsonResponse,
    });
    req.user.careerPaths.push(entry._id);
    await req.user.save();

    return res.json({ success: true, id: entry._id, tree: jsonResponse });
  } catch (err) {
    console.error("Gemini Prompt Error:", err);
    return res.status(500).json({ error: "Failed to generate career path tree" });
  }
};

export const getLatestResponse = async (_, res) => {
  try {
    const latest = await CareerPath.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: "No stored career path yet" });
    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching latest response" });
  }
};