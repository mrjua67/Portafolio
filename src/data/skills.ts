import { SkillCategory } from '../types';
import { Code2, Server, Database, Wrench, Cpu } from 'lucide-react';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: {
      en: 'Frontend Development',
      es: 'Desarrollo Frontend'
    },
    skills: [
      { name: 'React', level: 90, category: 'frontend', icon: 'Code2' },
      { name: 'TypeScript', level: 85, category: 'frontend', icon: 'Code2' },
      { name: 'HTML/CSS', level: 95, category: 'frontend', icon: 'Code2' },
      { name: 'Tailwind CSS', level: 88, category: 'frontend', icon: 'Code2' }
    ]
  },
  {
    id: 'backend',
    title: {
      en: 'Backend Development',
      es: 'Desarrollo Backend'
    },
    skills: [
      { name: 'Node.js', level: 85, category: 'backend', icon: 'Server' },
      { name: 'Python', level: 80, category: 'backend', icon: 'Server' },
      { name: 'Java', level: 75, category: 'backend', icon: 'Server' },
      { name: 'Express', level: 82, category: 'backend', icon: 'Server' }
    ]
  },
  {
    id: 'database',
    title: {
      en: 'Databases',
      es: 'Bases de Datos'
    },
    skills: [
      { name: 'MongoDB', level: 85, category: 'database', icon: 'Database' },
      { name: 'PostgreSQL', level: 80, category: 'database', icon: 'Database' },
      { name: 'Redis', level: 75, category: 'database', icon: 'Database' }
    ]
  },
  {
    id: 'iot',
    title: {
      en: 'IoT & Hardware',
      es: 'IoT y Hardware'
    },
    skills: [
      { name: 'ESP32', level: 75, category: 'iot', icon: 'Cpu' },
      { name: 'MicroPython', level: 70, category: 'iot', icon: 'Cpu' },
      { name: 'Arduino', level: 80, category: 'iot', icon: 'Cpu' }
    ]
  }
];