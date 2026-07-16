import { LeadershipRole } from "./types";

// Add a photo per org to frontend/public/images/leadership/<slug>.jpeg
// (e.g. csun-nsbe-chapter.jpeg), then set `photo: "/images/leadership/<slug>.jpeg"` below.
export const leadership: LeadershipRole[] = [
  {
    organization: "CSUN-NSBE Chapter",
    role: "Vice President",
    photo: "/images/leadership/nsbe.jpeg",
  },
  {
    organization: "CSUN ARCS",
    role: "Associate",
    photo: "/images/leadership/arcs.jpg",
  },
  { 
    organization: "STEM Advantage", 
    role: "Scholar/Alumni",
    // photo: "/images/leadership/stem-advantage.jpeg",
  },
  { 
    organization: "CodePath", 
    role: "Alumni",
    // photo: "/images/leadership/codepath.jpeg",
  },
  { 
    organization: "ColorStack", 
    role: "Contributor",
    // photo: "/images/leadership/colorstack.jpeg",
  },
];
