import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Users, Award, Calendar } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Фоновые изображения/видео для слайдера
  const slides = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Детский праздник с аниматорами',
    },
    {
      type: 'image', 
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Красивая свадебная церемония',
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      alt: 'Корпоративное мероприятие',
    },
  ];

  // Автоматическая смена слайдов
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const trustElements = [
    { icon: Calendar, text: '7+ лет опыта', color: 'text-primary-500' },
    { icon: Users, text: '1000+ праздников', color: 'text-secondary-500' },
    { icon: Award, text: 'Гарантия качества', color: 'text-accent-500' },
    { icon: Star, text: '4.9 рейтинг', color: 'text-yellow-500' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновый слайдер */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.src})` }}
            />
            {/* Темный оверлей */}
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>
        ))}
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-accent-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Основной контент */}
      <div className="relative z-20 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Главный заголовок */}
          <motion.h1 
            className="heading-1 mb-6 text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Создаём{' '}
            <span className="gradient-text bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300 bg-clip-text text-transparent">
              незабываемые праздники
            </span>{' '}
            в Петропавловске
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            От детских дней рождения до свадеб мечты — более{' '}
            <span className="text-secondary-300 font-semibold">1000 счастливых клиентов</span>{' '}
            доверили нам свои самые важные моменты
          </motion.p>

          {/* CTA кнопки */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/zakazat-prazdnik"
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
            >
              Заказать праздник
            </Link>
            
            <Link
              to="/portfolio"
              className="btn-outline border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Посмотреть портфолио
            </Link>
          </motion.div>

          {/* Элементы доверия */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {trustElements.map((element, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <element.icon className={`w-8 h-8 ${element.color} mx-auto mb-2`} />
                <p className="text-white font-semibold text-sm md:text-base">
                  {element.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Индикаторы слайдов */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Стрелка вниз */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/75 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;