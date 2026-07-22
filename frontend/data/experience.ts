import { Experience } from "./types";

export const experience: Experience[] = [
  {
    role: "Systems Software Engineer",
    organization: "Hyve Solutions",
    location: "Fremont, CA",
    date: "May 2025 – Present",
    bullets: [
      "Architected an AI-native test orchestration platform with a Neo4j-backed GraphRAG system built on GPT-5, handling ~20k executions weekly, saving 1k+ analyst hours, and cutting manual reporting effort by 30%, eventually integrating live SSH device management with a real-time terminal interface.",
    ],
    stack: ["Flask", "Neo4j", "GraphRAG", "GPT-5", "Socket.IO", "Bootstrap"],
    photo: "/images/hyve.jpg",
  },
  {
    role: "Software Engineer Associate",
    organization: "NASA's Autonomy Research Center (ARCS)",
    location: "Northridge, CA",
    date: "October 2023 – May 2025",
    bullets: [
      "Built autonomous navigation for a Smart Wheelchair using hybrid control, state estimation, and YOLOv8/OpenCV object detection, cutting obstacle detection latency by 50% and collision risk by 30% after Gazebo/RViz simulation testing.",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "Gazebo", "RViz"],
    photo: "/images/arcs-logo.jpg",
  },
];
