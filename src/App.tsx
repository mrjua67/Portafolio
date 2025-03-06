import React, { useState } from 'react';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ProjectCard } from './components/ProjectCard';
import { SkillSection } from './components/SkillSection';
import { Footer } from './components/Footer';
import { projects } from './data/projects';
import { skillCategories } from './data/skills';
import { Language } from './types';
import { Briefcase } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState<Language>('en');

  const texts = {
    title: {
      en: 'My Portfolio',
      es: 'Mi Portafolio'
    },
    subtitle: {
      en: 'Transforming ideas into functional and scalable solutions',
      es: 'Transformando ideas en soluciones funcionales y escalables'
    },
    projects: {
      en: 'Featured Projects',
      es: 'Proyectos Destacados'
    },
    skills: {
      en: 'Professional Skills',
      es: 'Habilidades Profesionales'
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <LanguageSwitch
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {texts.title[language]}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {texts.subtitle[language]}
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {texts.projects[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
              />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {texts.skills[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <SkillSection
                key={category.id}
                category={category}
                language={language}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer language={language} />
    </div>
  );
}

export default App;