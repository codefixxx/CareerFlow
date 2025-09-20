// controllers/analyticsController.js
import Analytics from "../models/Analytics.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";
dotenv.config();

// ✅ Gemini model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.4,
  apiKey: process.env.GOOGLE_API_KEY,
});

export const runCareerAnalytics = async (req, res) => {
  try {
    let { job_name, country } = req.body;

    if (!job_name || !country) {
      return res.status(400).json({ error: "job_name and country are required" });
    }

    // ✅ Normalize inputs
    const dbJob = job_name.trim().toLowerCase();
    const dbCountry = country.trim();
    const prevYear = new Date().getFullYear() - 1;

    // ✅ Check DB cache (job + country + year)
    const existing = await Analytics.findOne({
      job_name: dbJob,
      country: dbCountry,
      year: prevYear,
    });
    if (existing) {
      console.log("Returning cached analytics from MongoDB");
      return res.json({
        source: "database",
        data: existing.data,
      });
    }

    // ✅ Prompt Template
    const analyticsPrompt = new PromptTemplate({
      inputVariables: ["job_name", "country", "current_year"],
      template: `
Please act as a career data analyst. Your task is to generate a comprehensive career profile in JSON format. 
The JSON object must conform to the exact structure and field names provided below. 
All data should be relevant and specific to the requested career and country. Provide accurate data based on your knowledge, 
and if specific information is not available online, please provide a reasonable estimate.

NOTE : return the salary figure in terms of the currency of the input country.
NOTE : give all the average salary as pure number specific to the given country, without assigning currency symbol.
NOTE : all the percentage values should be without "%" symbol.

Required Inputs:
- Job Name: {job_name}
- Country: {country}

Instructions for Generating the JSON Object:
Generate a single JSON object with the following structure:

{{
  "career_name": "{job_name}",
  "country": "{country}",
  "current_year": {current_year},
  "top_skills_with_weightage": [
    {{ "skill": "[Top Skill 1]", "weightage": [Weightage for Skill 1] }},
    {{ "skill": "[Top Skill 2]", "weightage": [Weightage for Skill 2] }},
    {{ "skill": "[Top Skill 3]", "weightage": [Weightage for Skill 3] }},
    {{ "skill": "[Top Skill 4]", "weightage": [Weightage for Skill 4] }},
    {{ "skill": "[Top Skill 5]", "weightage": [Weightage for Skill 5] }}
  ],
  "skills_acquisition_time_months": [Estimated time to learn the skills in months],
  "average_salary_growth": {{
    "[Year 1, current_year-5]": [Average annual salary],
    "[Year 2, current_year-4]": [Average annual salary],
    "[Year 3, current_year-3]": [Average annual salary],
    "[Year 4, current_year-2]": [Average annual salary],
    "[Year 5, current_year-1]": [Average annual salary]
  }},
  "job_openings_estimate": {{
    "[{current_year}]": [Estimated number of job openings]
  }},
  "future_demand_growth_percentage": [Projected growth percentage over the next 5 years],
  "geographic_opportunities": [
    "[Top city 1]",
    "[Top city 2]",
    "[Top city 3]",
    "[Top city 4]",
    "[Top city 5]"
  ],
  "recommended_certifications": [
    {{ "name": "[Certification 1]", "url": "[Link to Certification 1]" }},
    {{ "name": "[Certification 2]", "url": "[Link to Certification 2]" }},
    {{ "name": "[Certification 3]", "url": "[Link to Certification 3]" }}
  ],
  "education_level_requirement": "[Typical education level]",
  "learning_resources_distribution": {{
    "online": [Percentage for online],
    "offline": [Percentage for offline],
    "bootcamps": [Percentage for bootcamps]
  }},
  "work_life_balance_score": [Score from 1 to 5],
  "remote_vs_office_ratio": {{
    "remote": [Percentage for remote],
    "office": [Percentage for office]
  }},
  "company_size_distribution": {{
    "startup": [Percentage for startups],
    "mid_size": [Percentage for mid-size companies],
    "enterprise": [Percentage for enterprises]
  }},
  "automation_risk_percentage": [Percentage risk of automation],
  "career_diversity_options": [
    "[Related career 1]",
    "[Related career 2]",
    "[Related career 3]",
    "[Related career 4]",
    "[Related career 5]"
  ],
  "emerging_tools_and_tech": [
    "[Emerging tech 1]",
    "[Emerging tech 2]",
    "[Emerging tech 3]",
    "[Emerging tech 4]",
    "[Emerging tech 5]"
  ],
  "global_vs_local_demand_split": {{
    "global": [Percentage for global demand],
    "local": [Percentage for local demand]
  }}
}}
`,
    });

    const chain = analyticsPrompt.pipe(model).pipe(new StringOutputParser());

    const rawOutput = await chain.invoke({
      job_name: dbJob,
      country: dbCountry,
      current_year: prevYear,
    });

    // Clean Gemini output
    const formattedOutput = rawOutput.trim().replace(/```json|```/g, "");

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(formattedOutput);
    } catch (err) {
      console.error("JSON Parsing Error:", err);
      return res.status(500).json({ error: "Failed to parse model response to JSON" });
    }

    // ✅ Save new entry with year
    const entry = await Analytics.create({
      job_name: dbJob,
      country: dbCountry,
      year: prevYear,
      data: jsonResponse,
    });

    res.json({
      source: "ai",
      data: jsonResponse,
    });
  } catch (err) {
    console.error("Career Analytics Error:", err);
    res.status(500).json({ error: "Failed to generate career analytics" });
  }
};

//  Optional: get latest entry regardless of job/country
export const getLatestAnalytics = async (_, res) => {
  try {
    const latest = await Analytics.findOne().sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: "No stored analytics yet" });
    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching latest analytics" });
  }
};
