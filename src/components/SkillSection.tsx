import React from 'react';
import { SkillCategory, Language } from '../types';
import { Code2, Server, Database, Wrench, Cpu } from 'lucide-react';

const IconMap = {
  Code2,
  Server,
  Database,
  Wrench,
  Cpu
};

interface SkillSectionProps {
  category: SkillCategory;
  language: Language;
}

export const SkillSection: React.FC<SkillSectionProps> = ({ category, language }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {category.title[language]}
      </h3>
      <div className="space-y-4">
        {category.skills.map((skill) => {
          const Icon = IconMap[skill.icon as keyof typeof IconMap];
          return (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};