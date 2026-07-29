import { LeadershipRole } from "./types";

// Add a photo per org to frontend/public/images/leadership/<slug>.jpeg
// (e.g. csun-nsbe-chapter.jpeg), then set `photo: "/images/leadership/<slug>.jpeg"` below.
// The first entry is treated as the featured card — keep NSBE first.
export const leadership: LeadershipRole[] = [
  {
    organization: "National Society of Black Engineers (NSBE)",
    role: "Vice President",
    date: "June 2024 – May 2025",
    photo: "/images/leadership/nsbe.jpeg",
    bullets: [
      "Pioneered the revival of the CSUN-NSBE collegiate chapter, providing strategic counsel to the President and club leadership that successfully recruited 15+ active members",
      "Managed operations and tasks delegated by the President to completion using project management tools like Jira, ensuring the success of all projects, including the CSUN-NSBE website",
      "Established a new NSBE Jr. pre-collegiate chapter in the San Fernando Valley, bridging the gap between pre-collegiate and collegiate levels",
      "Collaborated with partner companies to promote diversity and inclusion initiatives on campus",
    ],
  },
  {
    organization: "Autonomy Research Center for STEAHM (ARCS)",
    role: "Research Associate",
    photo: "/images/leadership/arcs-photo.jpg",
    bullets: [
      "Led the Senior Design subteam on WATCHER (Wheelchair Assist Technology and Co-bot Helper Robot), a hybrid control scheme with autonomous navigation integrated using state estimation and path planning, enhancing independence for users with low mobility",
    ],
  },
  {
    organization: "Nigerian Student Association (NSA)",
    role: "Historian",
    date: "September 2024 – May 2025",
    photo: "/images/nsa-board.jpeg",
    bullets: [
      "Documented major decisions, events, and meetings for the executive board while maintaining a collection of club history and milestones, sharing it with members to foster a cohesive club environment",
    ],
  },
  {
    organization: "ColorStack",
    role: "Contributor",
    photo: "/images/leadership/colorstack.jpeg",
    bullets: [
      "Collaborated with a team of 4 to build SyllabAI, an AI-powered student support platform, during ColorStack's Winter '25 Hackathon",
    ],
    link: { label: "View project", href: "#projects" },
  },
  {
    organization: "CodePath",
    role: "Student Fellow/Alumni",
    photo: "/images/leadership/codepath.jpg",
    bullets: [
      "Completed CodePath's technical interview prep and AI Engineering courses, covering data structures and algorithms, RAG, fine-tuning, multi-tool calling, and AI safety, while collaborating with students and tech fellows to build proficiency with code-efficiency techniques",
    ],
  },
  {
    organization: "STEM Advantage",
    role: "Scholar/Alumni",
    photo: "/images/leadership/stem-advantage.jpg",
    bullets: [
      "This achievement exemplifies the steadfast commitment I’ve invested into my studies, highlights my potential for leadership, and underscores my passion for making meaningful contributions to my field",
      "The scholarship program provides opportunities to engage with industry professionals, attend insightful informational sessions, and participate in hands-on collaborative workshops, further demonstrating my strong dedication to both academic and professional excellence"
    ],
  },
];
