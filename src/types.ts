export interface Project {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  imageUrl: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  views: number;
}

export type Language = 'en' | 'es';

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'iot';
  icon: string;
}

export interface SkillCategory {
  id: string;
  title: {
    en: string;
    es: string;
  };
  skills: Skill[];
}