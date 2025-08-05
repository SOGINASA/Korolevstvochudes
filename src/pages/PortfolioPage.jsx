import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  List, 
  Heart, 
  Eye, 
  Calendar,
  MapPin,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Данные портфолио (имитация данных с сайта)
  const portfolioData = [
    {
      id: 1,
      title: 'День рождения принцессы Амелии (5 лет)',
      category: 'children',
      date: '2024-07-15',
      location: 'Ресторан "Золотой дракон"',
      guests: '25 детей',
      rating: 5,
      budget: '120,000 ₸',
      description: 'Волшебный праздник в стиле Disney с аниматорами в костюмах принцесс, интерактивными играми и сказочным декором.',
      tags: ['принцессы', 'disney', 'аниматоры', 'фотозона'],
      images: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1607343833574-da7843101542?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Свадьба Алексея и Марии',
      category: 'wedding',
      date: '2024-06-20',
      location: 'Загородный комплекс "Весна"',
      guests: '150 гостей',
      rating: 5,
      budget: '850,000 ₸',
      description: 'Романтическая свадьба в стиле прованс с выездной регистрацией, живой музыкой и изысканным декором.',
      tags: ['прованс', 'выездная регистрация', 'живая музыка', 'флористика'],
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: 3,
      title: 'Корпоратив компании "ТехноПрогресс"',
      category: 'corporate',
      date: '2024-05-18',
      location: 'Конференц-зал "Метрополь"',
      guests: '80 сотрудников',
      rating: 5,
      budget: '450,000 ₸',
      description: 'Новогодний корпоратив в стиле "Голливуд" с красной дорожкой, шоу-программой и тимбилдинг активностями.',
      tags: ['голливуд', 'тимбилдинг', 'шоу-программа', 'красная дорожка'],
      images: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Юбилей 60 лет Валентины Николаевны',
      category: 'anniversary',
      date: '2024-04-12',
      location: 'Ресторан "Империя"',
      guests: '45 гостей',
      rating: 5,
      budget: '280,000 ₸',
      description: 'Элегантный юбилей с живой музыкой, поздравлениями от звезд и трогательными видео от родных.',
      tags: ['юбилей', 'живая музыка', 'поздравления', 'элегантность'],
      images: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Огненное шоу на открытии ресторана',
      category: 'show',
      date: '2024-03-25',
      location: 'Ресторан "Fire Palace"',
      guests: '200 гостей',
      rating: 5,
      budget: '320,000 ₸',
      description: 'Захватывающее огненное шоу с акробатическими элементами и пиротехникой для торжественного открытия.',
      tags: ['огненное шоу', 'акробатика', 'пиротехника', 'открытие'],
      images: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Квест "Пираты Карибского моря" (10-12 лет)',
      category: 'children',
      date: '2024-02-14',
      location: 'Квест-центр "Приключения"',
      guests: '15 детей',
      rating: 5,
      budget: '95,000 ₸',
      description: 'Интерактивный квест с поиском сокровищ, костюмированными персонажами и морскими приключениями.',
      tags: ['квест', 'пираты', 'приключения', 'интерактив'],
      images: [
        'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все работы', count: portfolioData.length },
    { id: 'children', name: 'Детские праздники', count: portfolioData.filter(p => p.category === 'children').length },
    { id: 'wedding', name: 'Свадьбы', count: portfolioData.filter(p => p.category === 'wedding').length },
    { id: 'corporate', name: 'Корпоративы', count: portfolioData.filter(p => p.category === 'corporate').length },
    { id: 'anniversary', name: 'Юбилеи', count: portfolioData.filter(p => p.category === 'anniversary').length },
    { id: 'show', name: 'Шоу-программы', count: portfolioData.filter(p => p.category === 'show').length }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? portfolioData 
    : portfolioData.filter(project => project.category === activeFilter);

  const openLightbox = (project, imageIndex = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedProject) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, nextImage, prevImage, closeLightbox]);

  return (
    <>
      <Helmet>
        <title>Портфолио - Королевство Чудес | Наши лучшие праздники</title>
        <meta 
          name="description" 
          content="Посмотрите на наши лучшие работы: детские праздники, свадьбы, корпоративы и юбилеи в Петропавловске. Более 100 успешных проектов." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero секция */}
        <section className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="heading-1 mb-6">
                Наше <span className="text-secondary-200">портфолио</span>
              </h1>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                Каждый проект уникален и создан с любовью. Посмотрите на наши лучшие работы 
                и убедитесь в профессионализме нашей команды.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-200 mb-2">100+</div>
                  <div className="text-primary-100">Проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-200 mb-2">7+</div>
                  <div className="text-primary-100">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-200 mb-2">4.9</div>
                  <div className="text-primary-100">Рейтинг</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-200 mb-2">1000+</div>
                  <div className="text-primary-100">Счастливых клиентов</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Фильтры и управление */}
        <section className="py-8 bg-white shadow-sm top-0 z-40">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              {/* Фильтры категорий */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === category.id
                        ? 'bg-primary-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Переключатель вида */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Портфолио сетка */}
        <section className="py-12">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter + viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-8'
                }
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group cursor-pointer ${
                      viewMode === 'list' ? 'flex gap-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl' : ''
                    }`}
                    onClick={() => openLightbox(project)}
                  >
                    {viewMode === 'grid' ? (
                      // Сетка вид
                      <div className="card overflow-hidden">
                        {project.featured && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              ПОПУЛЯРНОЕ
                            </span>
                          </div>
                        )}
                        
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                          
                          {/* Оверлей с иконками */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Eye className="w-6 h-6 text-gray-700" />
                              </div>
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Heart className="w-6 h-6 text-red-500" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {new Date(project.date).toLocaleDateString('ru-RU')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              {project.guests}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(project.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <div className="text-primary-600 font-semibold">
                              {project.budget}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Список вид
                      <>
                        <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                ТОП
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {new Date(project.date).toLocaleDateString('ru-RU')}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              {project.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              {project.guests}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(project.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <div className="text-lg font-semibold text-primary-600">
                              {project.budget}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Проекты не найдены
                </h3>
                <p className="text-gray-600">
                  Попробуйте выбрать другую категорию или свяжитесь с нами для создания уникального проекта.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox модальное окно */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-6xl w-full bg-white rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Изображение */}
                  <div className="lg:w-2/3 relative">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                      className="w-full h-96 lg:h-[600px] object-cover"
                    />
                    
                    {/* Навигация по изображениям */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <ChevronRight size={24} />
                        </button>
                        
                        {/* Индикаторы */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-3 h-3 rounded-full transition-colors ${
                                currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Информация о проекте */}
                  <div className="lg:w-1/3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 pr-4">
                        {selectedProject.title}
                      </h2>
                      <button
                        onClick={closeLightbox}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary-500" />
                        <span className="text-gray-700">
                          {new Date(selectedProject.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <span className="text-gray-700">{selectedProject.location}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary-500" />
                        <span className="text-gray-700">{selectedProject.guests}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(selectedProject.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-gray-700">Оценка клиента</span>
                      </div>
                    </div>

                    {/* Теги */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Особенности:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Бюджет */}
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6">
                      <div className="text-sm text-gray-600 mb-1">Бюджет проекта:</div>
                      <div className="text-2xl font-bold text-primary-600">
                        {selectedProject.budget}
                      </div>
                    </div>

                    {/* CTA кнопки */}
                    <div className="space-y-3">
                      <button className="w-full btn-primary">
                        Заказать похожий праздник
                      </button>
                      <button className="w-full btn-outline">
                        Получить консультацию
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA секция */}
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6">
                Готовы создать свой <span className="text-secondary-200">незабываемый праздник?</span>
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Каждый проект уникален. Расскажите нам о своих мечтах, 
                и мы воплотим их в жизнь с тем же качеством и вниманием к деталям.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-secondary text-lg px-8 py-4">
                  Заказать праздник
                </button>
                <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
                  Бесплатная консультация
                </button>
              </div>

              {/* Контакты */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="font-semibold mb-2">Позвоните нам</h3>
                  <p className="text-primary-100">+7 (7152) 123-456</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-semibold mb-2">Напишите в WhatsApp</h3>
                  <p className="text-primary-100">Быстрый ответ 24/7</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h3 className="font-semibold mb-2">Приезжайте в офис</h3>
                  <p className="text-primary-100">ул. Конституции, 15</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioPage;