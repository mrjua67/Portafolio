import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: {
      en: 'CarsCollection',
      es: 'Coleccion de Autos.'
    },
    description: {
      en: 'CarsCollection-T showcases a variety of cars with images, details, and prices in a sleek, modern design.',
      es: 'CarsCollection-T muestra una variedad de autos con imágenes, detalles y precios en un diseño moderno y elegante.'
    },
    imageUrl: '/images/car.jpg',
    technologies: ['React', 'JavaScript'],
    githubUrl: 'https://github.com/mrjua67/creadores-de-contenido',
    demoUrl: 'https://carscollection-t.netlify.app/',
    views: 1234
  },
  {
    id: '2',
    title: {
      en: 'FoodTech',
      es: 'Tecnología alimentaria.'
    },
    description: {
      en: 'FoodTech Store is an online shop for food technology, featuring detailed products, images, and prices in an intuitive interface.',
      es: 'FoodTech Store es una tienda en línea de tecnología alimentaria con productos detallados, imágenes y precios en una interfaz intuitiva.'
    },
    imageUrl: '/images/food.jpg',
    technologies: ['React', 'Tailwind', 'JavaScript','Vite'],
    githubUrl: 'https://github.com/mrjua67/FoodTech/tree/master',
    demoUrl: 'https://foodtech67.netlify.app/ ',
    views: 856
  },
  {
    id: '3',
    title: {
      en: 'TeleDomoFarm',
      es: 'TeleDomoFarm'
    },
    description: {
      en: 'TeleDomoFarm is an IoT-based agricultural management system designed to monitor and control variables like temperature, humidity, and lighting in real-time. It uses ESP32, MicroPython, and WebSockets for communication, with an interactive web interface. Its goal is to optimize farm efficiency through automation and data analysis.',
      es: 'TeleDomoFarm es un sistema de gestión agrícola basado en IoT, diseñado para monitorear y controlar variables como temperatura, humedad e iluminación en tiempo real. Utiliza ESP32, MicroPython y WebSockets para la comunicación, con una interfaz web interactiva. Su objetivo es optimizar la eficiencia en fincas mediante automatización y análisis de datos.'
    },
    imageUrl: '/images/teledomofarm.jpg',
    technologies: ['React', 'Firebase', 'JavaScript', 'Vite', 'Tailwind'],
    githubUrl: 'https://github.com/mrjua67/TeleDomoFarm-React/tree/main',
    demoUrl: 'https://teledomofarm.netlify.app/',
    views: 2156
  }
];