import { Experience } from "./types";

export const experience: Experience[] = [
  {
    role: "Systems Software Engineer",
    organization: "Hyve Solutions",
    location: "Fremont, CA",
    date: "May 2025 – Present",
    bullets: [
      "Architected the development of a scalable AI-native test orchestration platform (Bootstrap, Flask, Neo4j) managing approximately 20k executions weekly and saving 1k+ manual hours for analysts, enabling teams to dynamically build, track, and analyze test coverage with AJAX-driven RESTful interactions",
      "Designed a graph-based data model in Neo4j capturing hierarchical relationships across entities, then implemented a GraphRAG system utilizing OpenAI's GPT-5 for test result analysis, test case generation, and inference over an extensive test case library, reducing manual reporting effort by 30%",
      "Extended the platform by enabling live SSH device management and a real-time terminal interface via Socket.IO and Gunicorn/eventlet, supporting multi-customer server environments and enabling direct UUT test logging across VLAN-detected devices",
    ],
  },
  {
    role: "Software Engineer Associate",
    organization: "NASA's Autonomy Research Center (ARCS)",
    location: "Northridge, CA",
    date: "October 2023 – May 2025",
    bullets: [
      "Contributed to the development of a Smart Wheelchair by integrating autonomous navigation into a hybrid control scheme using state estimation and path planning, enhancing independence for users with low mobility",
      "Developed a Python script integrating real-time object detection and tracking using YOLOv8 and OpenCV, reducing obstacle detection latency by 50% and expanding navigable environment coverage",
      "Validated system reliability through pre-deployment simulation in Gazebo (RViz) and comprehensive unit testing, reducing obstacle collision risk by 30% before hardware testing",
    ],
  },
];
