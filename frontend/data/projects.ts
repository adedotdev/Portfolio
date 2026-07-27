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
