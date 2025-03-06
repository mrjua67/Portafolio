import React from 'react';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const texts = {
    contact: {
      en: 'Contact Me',
      es: 'Contáctame'
    },
    rights: {
      en: 'All rights reserved',
      es: 'Todos los derechos reservados'
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">{texts.contact[language]}</h4>
            <div className="space-y-2">
              <a href="mailto:jpguerraucatolica.edu.co<" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>jpguerra81@ucatolica.edu.co</span>
              </a>
              <a href="https://github.com/mrjua67/mrjua67" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/juan-pablo-guerra-porras-9608a9218/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} - {texts.rights[language]}</p>
        </div>
      </div>
    </footer>
  );
};