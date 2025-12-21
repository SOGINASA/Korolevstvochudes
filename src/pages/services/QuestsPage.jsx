import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Users, 
  MapPin, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  X,
  Search,
  Zap,
  Target,
  Heart,
  Eye,
  Calendar,
  Award,
  TrendingUp,
  Filter,
  Puzzle,
  Brain,
  Gamepad,
  Trophy,
  Shield,
  Lightbulb,
  Timer,
  Gift
} from 'lucide-react';

const QuestsGamesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');

  // Данные квестов и игр
  const questsAndGames = [
    {
      id: 1,
      title: 'Квест "Пираты Карибского моря"',
      category: 'children_quest',
      ageGroup: '8-14',
      minAge: 8,
      maxAge: 14,
      duration: '60-90 минут',
      durationMinutes: 75,
      maxPlayers: 12,
      minPlayers: 6,
      priceFrom: '15000',
      rating: 4.9,
      difficulty: 'medium',
      location: 'indoor',
      description: 'Захватывающее приключение в поисках сокровищ капитана Флинта. Дети станут настоящими пиратами, решая головоломки и выполняя задания.',
      features: ['Костюмы пиратов', 'Карта сокровищ', 'Интерактивные задания', 'Реквизит', 'Призы для всех'],
      story: 'Злой капитан Черная Борода украл сокровища, и только юные пираты могут их вернуть!',
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      popular: true,
      occasions: ['Дни рождения', 'Школьные праздники', 'Летние лагеря'],
      skills: ['Логика', 'Командная работа', 'Креативность'],
      includes: ['Ведущий-аниматор', 'Костюмы', 'Реквизит', 'Призы', 'Фотосессия']
    },
    {
      id: 2,
      title: 'Детективный квест "Тайна старого особняка"',
      category: 'adults_quest',
      ageGroup: '16+',
      minAge: 16,
      maxAge: 99,
      duration: '90-120 минут',
      durationMinutes: 105,
      maxPlayers: 8,
      minPlayers: 4,
      priceFrom: '25000',
      rating: 5,
      difficulty: 'high',
      location: 'indoor',
      description: 'Загадочное убийство в викторианском особняке. Участники становятся детективами и должны раскрыть преступление, собирая улики.',
      features: ['Профессиональные актеры', 'Детективные улики', 'Интерактивный сюжет', 'Костюмированные персонажи', 'Неожиданный финал'],
      story: 'В старом особняке произошло загадочное убийство. Кто виновен и что скрывается за этими стенами?',
      image: 'https://images.unsplash.com/photo-1518709594023-6eab9bcd5233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1518709594023-6eab9bcd5233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      popular: true,
      occasions: ['Корпоративы', 'Дни рождения взрослых', 'Тимбилдинг'],
      skills: ['Дедукция', 'Внимательность', 'Анализ'],
      includes: ['Профессиональные актеры', 'Декорации', 'Улики', 'Костюмы', 'Сертификат детектива']
    },
    {
      id: 3,
      title: 'Командная игра "Форт Боярд"',
      category: 'team_game',
      ageGroup: '12+',
      minAge: 12,
      maxAge: 99,
      duration: '120-150 минут',
      durationMinutes: 135,
      maxPlayers: 16,
      minPlayers: 8,
      priceFrom: '35000',
      rating: 4.8,
      difficulty: 'high',
      location: 'outdoor',
      description: 'Легендарная игра с физическими и интеллектуальными испытаниями. Команды соревнуются за ключи и сокровища.',
      features: ['Физические испытания', 'Интеллектуальные задачи', 'Старец Фура', 'Ключи и сокровища', 'Командное взаимодействие'],
      story: 'Добро пожаловать в Форт Боярд! Пройдите все испытания и завоюйте сокровища!',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      popular: false,
      occasions: ['Корпоративы', 'Тимбилдинг', 'Спортивные мероприятия'],
      skills: ['Физическая подготовка', 'Стратегия', 'Командная работа'],
      includes: ['Инструкторы', 'Спортивный инвентарь', 'Костюмы', 'Призы команде-победителю', 'Фото/видео съемка']
    },
    {
      id: 4,
      title: 'Интеллектуальная викторина "Что? Где? Когда?"',
      category: 'quiz',
      ageGroup: '14+',
      minAge: 14,
      maxAge: 99,
      duration: '90-120 минут',
      durationMinutes: 105,
      maxPlayers: 24,
      minPlayers: 6,
      priceFrom: '20000',
      rating: 4.7,
      difficulty: 'medium',
      location: 'indoor',
      description: 'Классическая интеллектуальная игра с оригинальными вопросами. Команды знатоков соревнуются в эрудиции.',
      features: ['Оригинальные вопросы', 'Профессиональный ведущий', 'Игровые столы', 'Система подсчета', 'Награждение победителей'],
      story: 'Против вас играют лучшие знатоки города. Сможете ли вы ответить на все вопросы?',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518709594023-6eab9bcd5233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      popular: true,
      occasions: ['Корпоративы', 'Школьные мероприятия', 'Интеллектуальные клубы'],
      skills: ['Эрудиция', 'Логическое мышление', 'Командная работа'],
      includes: ['Профессиональный ведущий', 'Игровое оборудование', 'Вопросы и задания', 'Призы', 'Дипломы']
    },
    {
      id: 5,
      title: 'Квест "Школа магии и волшебства"',
      category: 'children_quest',
      ageGroup: '6-12',
      minAge: 6,
      maxAge: 12,
      duration: '75-90 минут',
      durationMinutes: 82,
      maxPlayers: 10,
      minPlayers: 4,
      priceFrom: '18000',
      rating: 4.9,
      difficulty: 'low',
      location: 'indoor',
      description: 'Магический квест в стиле Гарри Поттера. Дети изучают заклинания, варят зелья и сражаются с темными силами.',
      features: ['Магические заклинания', 'Зелья и ингредиенты', 'Волшебные палочки', 'Мантии волшебников', 'Сова с письмом'],
      story: 'Добро пожаловать в школу магии! Изучите заклинания и спасите волшебный мир!',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      popular: true,
      occasions: ['Дни рождения', 'Тематические праздники', 'Школьные мероприятия'],
      skills: ['Воображение', 'Творчество', 'Внимательность'],
      includes: ['Волшебник-ведущий', 'Магические атрибуты', 'Костюмы', 'Зелья', 'Диплом волшебника']
    },
    {
      id: 6,
      title: 'Экшн-игра "Лазертаг в космосе"',
      category: 'team_game',
      ageGroup: '10+',
      minAge: 10,
      maxAge: 99,
      duration: '60-90 минут',
      durationMinutes: 75,
      maxPlayers: 20,
      minPlayers: 8,
      priceFrom: '22000',
      rating: 4.8,
      difficulty: 'medium',
      location: 'indoor',
      description: 'Футуристическая битва в космических декорациях. Команды сражаются с лазерным оружием в темноте с неоновой подсветкой.',
      features: ['Лазерное оружие', 'Космические декорации', 'Неоновая подсветка', 'Командные задания', 'Электронная система подсчета'],
      story: 'Год 2157. Галактическая война в разгаре. Выберите сторону и сражайтесь за будущее!',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      popular: false,
      occasions: ['Дни рождения подростков', 'Корпоративы', 'Тимбилдинг'],
      skills: ['Реакция', 'Стратегия', 'Координация'],
      includes: ['Лазерное оборудование', 'Защитная экипировка', 'Инструктор', 'Статистика игры', 'Призы победителям']
    },
    {
      id: 7,
      title: 'Кулинарный квест "Шеф-повар"',
      category: 'creative_game',
      ageGroup: '8+',
      minAge: 8,
      maxAge: 99,
      duration: '90-120 минут',
      durationMinutes: 105,
      maxPlayers: 12,
      minPlayers: 6,
      priceFrom: '28000',
      rating: 4.9,
      difficulty: 'medium',
      location: 'indoor',
      description: 'Увлекательный кулинарный квест, где участники готовят блюда по рецептам и соревнуются за звание лучшего повара.',
      features: ['Настоящие рецепты', 'Кулинарные задания', 'Дегустация блюд', 'Поварские колпаки', 'Мастер-класс от шефа'],
      story: 'Ресторан в беде! Нужны новые повара, чтобы спасти репутацию заведения!',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      popular: false,
      occasions: ['Дни рождения', 'Семейные мероприятия', 'Корпоративы'],
      skills: ['Кулинарные навыки', 'Творчество', 'Командная работа'],
      includes: ['Шеф-повар', 'Все ингредиенты', 'Кухонная утварь', 'Рецепты', 'Дипломы повара']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все квесты и игры', icon: <Award size={20} />, count: questsAndGames.length },
    { id: 'children_quest', name: 'Детские квесты', icon: <Gift size={20} />, count: questsAndGames.filter(q => q.category === 'children_quest').length },
    { id: 'adults_quest', name: 'Квесты для взрослых', icon: <Search size={20} />, count: questsAndGames.filter(q => q.category === 'adults_quest').length },
    { id: 'team_game', name: 'Командные игры', icon: <Users size={20} />, count: questsAndGames.filter(q => q.category === 'team_game').length },
    { id: 'quiz', name: 'Интеллектуальные викторины', icon: <Brain size={20} />, count: questsAndGames.filter(q => q.category === 'quiz').length },
    { id: 'creative_game', name: 'Творческие игры', icon: <Lightbulb size={20} />, count: questsAndGames.filter(q => q.category === 'creative_game').length }
  ];

  const ageGroups = [
    { id: 'all', name: 'Все возрасты' },
    { id: 'kids', name: 'Дети (6-12)', min: 6, max: 12 },
    { id: 'teens', name: 'Подростки (13-17)', min: 13, max: 17 },
    { id: 'adults', name: 'Взрослые (18+)', min: 18, max: 99 }
  ];

  const durationGroups = [
    { id: 'all', name: 'Любая продолжительность' },
    { id: 'short', name: 'До 90 минут', max: 90 },
    { id: 'medium', name: '90-120 минут', min: 90, max: 120 },
    { id: 'long', name: 'Более 120 минут', min: 120 }
  ];

  const getFilteredQuests = () => {
    let filtered = questsAndGames;

    // Фильтр по категории
    if (activeCategory !== 'all') {
      filtered = filtered.filter(quest => quest.category === activeCategory);
    }

    // Фильтр по возрасту
    if (ageFilter !== 'all') {
      const ageGroup = ageGroups.find(g => g.id === ageFilter);
      if (ageGroup && ageGroup.min && ageGroup.max) {
        filtered = filtered.filter(quest => 
          quest.minAge <= ageGroup.max && quest.maxAge >= ageGroup.min
        );
      }
    }

    // Фильтр по продолжительности
    if (durationFilter !== 'all') {
      const durationGroup = durationGroups.find(g => g.id === durationFilter);
      if (durationGroup) {
        if (durationGroup.max && !durationGroup.min) {
          filtered = filtered.filter(quest => quest.durationMinutes <= durationGroup.max);
        } else if (durationGroup.min && durationGroup.max) {
          filtered = filtered.filter(quest => 
            quest.durationMinutes >= durationGroup.min && quest.durationMinutes <= durationGroup.max
          );
        } else if (durationGroup.min && !durationGroup.max) {
          filtered = filtered.filter(quest => quest.durationMinutes >= durationGroup.min);
        }
      }
    }

    return filtered;
  };

  const filteredQuests = getFilteredQuests();

  const openQuestModal = (quest) => {
    setSelectedQuest(quest);
    document.body.style.overflow = 'hidden';
  };

  const closeQuestModal = () => {
    setSelectedQuest(null);
    document.body.style.overflow = 'auto';
  };

  const openVideoModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideoUrl('');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isVideoModalOpen) closeVideoModal();
        if (selectedQuest) closeQuestModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVideoModalOpen, selectedQuest]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'low': return '⭐ Легкий';
      case 'medium': return '⭐⭐ Средний';
      case 'high': return '⭐⭐⭐ Сложный';
      default: return 'Не указано';
    }
  };

  const getLocationIcon = (location) => {
    return location === 'indoor' ? '🏢' : '🌳';
  };

  const getLocationText = (location) => {
    return location === 'indoor' ? 'В помещении' : 'На улице';
  };

  return (
    <>
      <Helmet>
        <title>Квесты и игры - Королевство Чудес | Интерактивные развлечения в Петропавловске</title>
        <meta 
          name="description" 
          content="Увлекательные квесты и интерактивные игры для детей и взрослых: детективные квесты, командные игры, викторины. Более 15 программ в Петропавловске." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero секция */}
        <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-24 overflow-hidden">
          {/* Анимированный фон */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/40"></div>
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
                backgroundSize: '100% 100%',
              }}
            />
          </div>

          {/* Плавающие игровые элементы */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-10"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: Math.random() * window.innerHeight,
                  rotate: 0 
                }}
                animate={{ 
                  y: [null, Math.random() * window.innerHeight],
                  rotate: 360
                }}
                transition={{ 
                  duration: 20 + Math.random() * 10, 
                  repeat: Infinity, 
                  repeatType: 'reverse',
                  delay: i * 2
                }}
              >
                {['🎯', '🧩', '🏆', '⚡', '🎮', '🧠'][i]}
              </motion.div>
            ))}
          </div>

          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
              >
                <Puzzle className="w-5 h-5 text-pink-400" />
                <span className="text-sm font-semibold">Квесты и интерактивные игры</span>
              </motion.div>

              <h1 className="heading-1 mb-6">
                Приключения, которые <br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                  захватывают дух
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                От детских сказочных квестов до сложных детективных расследований — 
                создаём незабываемые интерактивные приключения для любого возраста
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                {[
                  { icon: <Target size={24} />, value: '15+', label: 'Квестов' },
                  { icon: <Trophy size={24} />, value: '300+', label: 'Игр проведено' },
                  { icon: <Users size={24} />, value: '2-24', label: 'Участников' },
                  { icon: <Star size={24} />, value: '4.8', label: 'Рейтинг' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                      <span className="text-pink-400">{stat.icon}</span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button 
                  onClick={() => document.getElementById('quests-catalog').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary text-lg px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Выбрать квест
                </button>
                <button className="btn-outline border-white text-white hover:bg-white hover:text-purple-900 text-lg px-8 py-4">
                  Получить консультацию
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Фильтры */}
        <section className="py-8 bg-white shadow-lg top-0 z-40">
          <div className="container-custom">
            {/* Категории */}
            <div className="flex items-center gap-4 overflow-x-auto pb-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600 mr-4 whitespace-nowrap">
                <Filter size={20} />
                <span className="font-medium">Категории:</span>
              </div>
              
              <div className="flex gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600'
                    }`}
                  >
                    <span className={activeCategory === category.id ? 'text-white' : 'text-indigo-500'}>
                      {category.icon}
                    </span>
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Дополнительные фильтры */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Возраст:</span>
                <select
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {ageGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Длительность:</span>
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {durationGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Каталог квестов */}
        <section id="quests-catalog" className="py-16">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${ageFilter}-${durationFilter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                    onClick={() => openQuestModal(quest)}
                  >
                    {/* Популярный бэдж */}
                    {quest.popular && (
                      <div className="absolute top-4 left-4 z-10">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                        >
                          <Star size={12} />
                          ХИТ
                        </motion.span>
                      </div>
                    )}

                    {/* Сложность */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(quest.difficulty)} backdrop-blur-sm`}>
                        {getDifficultyText(quest.difficulty)}
                      </span>
                    </div>

                    {/* Изображение */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={quest.image}
                        alt={quest.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.1 }}
                      />
                      
                      {/* Градиентный оверлей */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Иконки действий */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openVideoModal(quest.videoUrl);
                            }}
                            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                          >
                            <Play className="w-6 h-6 text-indigo-600 ml-1" />
                          </motion.button>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                          >
                            <Eye className="w-6 h-6 text-indigo-600" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Информация о локации */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-xs">
                        <span className={`px-2 py-1 rounded-full ${quest.location === 'indoor' ? 'bg-blue-500' : 'bg-green-500'} backdrop-blur-sm`}>
                          {getLocationIcon(quest.location)} {getLocationText(quest.location)}
                        </span>
                        <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                          {quest.ageGroup} лет
                        </span>
                      </div>
                    </div>

                    {/* Контент карточки */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {quest.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {quest.description}
                      </p>

                      {/* Основные характеристики */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock size={16} />
                            <span>{quest.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Users size={16} />
                            <span>{quest.minPlayers}-{quest.maxPlayers} чел.</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(Math.floor(quest.rating))].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({quest.rating})</span>
                          </div>
                          
                          <div className="text-lg font-bold text-indigo-600">
                            от {quest.priceFrom} ₸
                          </div>
                        </div>
                      </div>

                      {/* Навыки */}
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Развивает:</div>
                        <div className="flex flex-wrap gap-1">
                          {quest.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA кнопка */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-sm py-3"
                      >
                        Подробнее о квесте
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredQuests.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-8xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Квесты не найдены
                </h3>
                <p className="text-gray-600 mb-6">
                  Попробуйте изменить фильтры или свяжитесь с нами для создания индивидуального квеста.
                </p>
                <button className="btn-primary">
                  Создать индивидуальный квест
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Модальное окно квеста */}
        <AnimatePresence>
          {selectedQuest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={closeQuestModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-6xl w-full bg-white rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Изображения */}
                  <div className="lg:w-1/2">
                    <div className="relative h-80 lg:h-full">
                      <img
                        src={selectedQuest.image}
                        alt={selectedQuest.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Галерея внизу */}
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                        {selectedQuest.gallery.slice(1).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${selectedQuest.title} ${index + 2}`}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Информация */}
                  <div className="lg:w-1/2 p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedQuest.title}
                        </h2>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedQuest.difficulty)}`}>
                            {getDifficultyText(selectedQuest.difficulty)}
                          </span>
                          {selectedQuest.popular && (
                            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              ХИТ
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={closeQuestModal}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    {/* Сюжет */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-indigo-500" />
                        Сюжет квеста
                      </h4>
                      <p className="text-gray-700 italic">"{selectedQuest.story}"</p>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {selectedQuest.description}
                    </p>

                    {/* Характеристики */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Clock className="w-5 h-5 text-indigo-500" />
                        <div>
                          <div className="text-sm text-gray-500">Длительность</div>
                          <div className="font-semibold">{selectedQuest.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Users className="w-5 h-5 text-indigo-500" />
                        <div>
                          <div className="text-sm text-gray-500">Участники</div>
                          <div className="font-semibold">{selectedQuest.minPlayers}-{selectedQuest.maxPlayers} чел.</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Gift className="w-5 h-5 text-indigo-500" />
                        <div>
                          <div className="text-sm text-gray-500">Возраст</div>
                          <div className="font-semibold">{selectedQuest.ageGroup} лет</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-indigo-500" />
                        <div>
                          <div className="text-sm text-gray-500">Место</div>
                          <div className="font-semibold">{getLocationText(selectedQuest.location)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Что включено */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        Что включено в стоимость:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedQuest.includes.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Навыки */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-500" />
                        Развиваемые навыки:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedQuest.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full border border-purple-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Подходящие мероприятия */}
                    <div className="mb-8">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Подходит для:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedQuest.occasions.map((occasion, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-50 text-orange-600 text-sm rounded-full border border-orange-200"
                          >
                            {occasion}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Цена и CTA */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Стоимость от:</div>
                          <div className="text-3xl font-bold text-indigo-600">
                            {selectedQuest.priceFrom} ₸
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(Math.floor(selectedQuest.rating))].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-gray-600 ml-2">({selectedQuest.rating})</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA кнопки */}
                    <div className="space-y-3">
                      <button className="w-full btn-primary bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                        Заказать этот квест
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => openVideoModal(selectedQuest.videoUrl)}
                          className="btn-outline text-indigo-600 border-indigo-300 hover:bg-indigo-50"
                        >
                          <Play size={16} className="mr-1" />
                          Видео
                        </button>
                        <button className="btn-outline text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                          Задать вопрос
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Модальное окно видео */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-black bg-opacity-95 flex items-center justify-center p-4"
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeVideoModal}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <X size={32} />
                </button>
                <iframe
                  src={currentVideoUrl}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title="Quest video"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA секция */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6">
                Готовы к <span className="text-yellow-300">захватывающим приключениям?</span>
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Каждый квест — это уникальная история, которую вы создаёте вместе с нашими героями. 
                Выберите своё приключение уже сегодня!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-secondary bg-yellow-500 hover:bg-yellow-600 text-yellow-900 text-lg px-8 py-4">
                  Заказать квест
                </button>
                <button className="btn-outline border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4">
                  Бесплатная консультация
                </button>
              </div>

              {/* Контакты */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="font-semibold mb-2">Позвоните нам</h3>
                  <p className="text-indigo-100">8 (705) 519 5222</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-semibold mb-2">Напишите в WhatsApp</h3>
                  <p className="text-indigo-100">Быстрый ответ 24/7</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h3 className="font-semibold mb-2">Приезжайте в офис</h3>
                  <p className="text-indigo-100">ул. Конституции, 15</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default QuestsGamesPage;