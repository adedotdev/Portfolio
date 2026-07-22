export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  about: string[];
  seeking?: string;
  location: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
  };
  resumeUrl: string;
  photo?: string;
}

export interface Education {
  school: string;
  location: string;
  degree: string;
  date: string;
  coursework: string[];
  affiliations?: { organization: string; role: string }[];
  photo?: string;
}

export interface Experience {
  role: string;
  organization: string;
  location: string;
  date: string;
  bullets: string[];
  stack?: string[];
  photo?: string;
}

export interface Project {
  title: string;
  subtitle: string;
  date: string;
  stack: string[];
  bullets: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface LeadershipRole {
  organization: string;
  role: string;
  date?: string;
  bullets?: string[];
  link?: { label: string; href: string };
  photo?: string;
}
