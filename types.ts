export type ProjectType = string;

export interface ProjectMetrics {
  views?: string;
  likes?: string;
  ctr?: string;
  retention?: string;
  commentCount?: string;
  viewCount?: string;
  likeCount?: string;
}

export interface Project {
  id: string;
  title: string;
  thumbnail?: string; // Optional in sheet
  type: ProjectType;
  role: string[];
  tools: string[];
  description: string;
  metrics?: ProjectMetrics;
  youtubeUrl: string;
  date: string;
  tags: string[];
  featured?: boolean;
  visible?: boolean; // New field
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Editing' | 'Motion' | 'Optimization' | 'Storytelling' | 'Tools';
  order?: number; // New field
  visible?: boolean; // New field
}

export interface EducationItem {
  id: string;
  year: string;
  institution: string;
  degree: string;
  description: string;
  tags: string[];
  visible?: boolean;
}

export interface Certificate {
  name: string;
  issuer: string;
  visible?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  responsibilities: string[];
  metrics: string[]; // e.g. ["+50% Views", "+20% CTR"]
  tags?: string[]; // New field for tools/skills
  visible?: boolean;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface UserProfile {
  name: string;
  title: string;
  tagline: string;
  description: string;
  // Stats can be dynamic or static
  stats: {
    videosEdited: number;
    totalViews: string;
    clients: number;
  };
  email: string;
  // Socials map directly from sheet keys
  socials: {
    [key: string]: string | undefined;
    youtube?: string;
    linkedin?: string;
    facebook?: string;
    zalo?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export interface AppData {
  profile: UserProfile;
  skills: Skill[];
  projects: Project[];
  education: EducationItem[];
  experience: ExperienceItem[];
  certificates: Certificate[];
}