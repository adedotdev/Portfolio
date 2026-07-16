import { Project } from "./types";

export const projects: Project[] = [
  {
    title: "SyllabAI",
    subtitle: "ColorStack Winter Hackathon",
    date: "January 2025",
    stack: ["Node.js", "OpenAI API", "Postman"],
    bullets: [
      "Built an AI-powered academic assistant using Node.js and the OpenAI API that parses course syllabi and answers student questions with context-aware responses tied to deadlines, policies, and course structure",
      "Designed a query routing pipeline that preprocesses user input, injects relevant syllabus context into GPT prompts, and returns structured guidance, reducing average student responsiveness compared to manual syllabus review",
      "Enhanced user experience by designing an intuitive interface that facilitates easy access to student support resources and AI-generated advice",
    ],
  },
  {
    title: "Rent-N-Run",
    subtitle: "Web Development",
    date: "February 2024 – May 2024",
    stack: ["Spring Boot", "PostgreSQL", "Postman"],
    bullets: [
      "Engineered a Spring Boot backend with RESTful APIs to handle client requests, implement CRUD operations, and integrate seamlessly with PostgreSQL for reliable data management",
      "Designed maintainable controller logic and validated endpoints with automated API tests in Postman, ensuring product reliability and improved performance",
    ],
  },
];
