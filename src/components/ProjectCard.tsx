import React from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Project, Language } from '../types';

interface ProjectCardProps {
  project: Project;
  language: Language;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, language }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title[language]}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title[language]}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description[language]}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Eye className="w-4 h-4 mr-1" />
            <span className="text-sm">{project.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};