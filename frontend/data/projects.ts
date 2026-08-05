import { Project } from "./types";

export const projects: Project[] = [
  {
    title: "SyllabAI",
    subtitle: "ColorStack Winter Hackathon",
    date: "January 2025",
    stack: ["Node.js", "TypeScript", "Express", "pgvector", "React", "Docker"],
    bullets: [
      "Built a RAG pipeline using OpenAI embeddings and a pgvector-backed PostgreSQL store, chunking syllabus text by section and token count and retrieving via cosine-similarity vector search to ground GPT responses in course content and reduce hallucinations",
      "Added a structured extraction layer using GPT structured outputs (JSON schema) to parse syllabi into normalized Postgres tables (deadlines, grading weights, office hours, policies), routing deterministic queries directly to structured data instead of the LLM to cut latency and cost",
      "Integrated calendar export functionality (.ics/Google Calendar API) for parsed deadlines, and a custom Q&A evaluation harness to validate retrieval accuracy and track hallucination rate",
    ],
    githubUrl: "https://github.com/adedotdev/SyllabAI",
  },
  {
    title: "California Jones",
    subtitle: "Code for a Cause SS12 Hackathon",
    date: "February 2025",
    stack: ["C#", "Unity", "Git", "VS Code"],
    bullets: [
      "Collaborated with industry professionals in an Agile environment to develop an innovative video game using Unity, designed specifically for individuals with visual impairments",
      "Devised the game logic with C# by integrating a feedback loop to the user which included volume changes, haptic feedback, and spatial audio, enhancing player navigation",
      "Outlined the design process and presented a demo to the teams and judges, resulting in a 100% satisfaction rate for all testers and a first place win for the team",
    ],
  },
];
