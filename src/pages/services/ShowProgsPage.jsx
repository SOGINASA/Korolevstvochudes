import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  List,
  Heart,
  Eye,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Music,
  Flame,
  Sparkles,
  Zap,
  Award,
  Phone,
  MessageCircle,
  Loader2,
  ShoppingCart
} from 'lucide-react';
import { apiService } from '../../services/api';
import { useSettings } from '../../contexts/SettingsContext';
import BookingModal from '../../components/BookingModal';

const ShowProgramsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedShow, setSelectedShow] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showsData, setShowsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { settings } = useSettings();
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  // Загрузка шоу-программ из API
  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getShows({ status: 'active' });

        if (response.success && response.shows) {
          setShowsData(response.shows);
        } else {
          setError('Не удалось загрузить шоу-программы');
        }
      } catch (err) {
        console.error('Error fetching shows:', err);
        setError('Ошибка при загрузке шоу-программ');
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  // Моковые данные для fallback (если API не вернет данные)
  const mockShowsData = [
    {
      id: 1,
      title: 'Огненное шоу "Драконы стихий"',
      category: 'fire',
      duration: '15-20 минут',
      minAudience: '50 человек',
      rating: 5,
      price: '120,000 ₸',
      priceDescription: 'за выступление',
      description: 'Захватывающее огненное шоу с элементами акробатики и пиротехники. Профессиональные артисты создают невероятные огненные картины под энергичную музыку.',
      features: ['Пиротехника', 'Акробатика', 'LED-костюмы', 'Дым-машина', 'Профессиональная музыка'],
      suitableFor: ['Корпоративы', 'Свадьбы', 'Дни рождения', 'Открытия заведений'],
      images: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      ],
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['огонь', 'пиротехника', 'акробатика', 'эффекты']
    },
    {
      id: 2,
      title: 'Музыкальное шоу "Звездная ночь"',
      category: 'music',
      duration: '30-45 минут',
      minAudience: '30 человек',
      rating: 5,
      price: '180,000 ₸',
      priceDescription: 'за программу',
      description: 'Живое музыкальное шоу с профессиональными вокалистами и музыкантами. Исполняем хиты разных эпох от классики до современных композиций.',
      features: ['Живое исполнение', 'Профессиональные музыканты', 'Световые эффекты', 'Интерактив с залом', 'Костюмированные номера'],
      suitableFor: ['Свадьбы', 'Юбилеи', 'Корпоративы', 'Частные вечеринки'],
      images: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      ],
      coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['музыка', 'вокал', 'живое исполнение', 'хиты']
    },
    {
      id: 3,
      title: 'Танцевальное шоу "Ритмы мира"',
      category: 'dance',
      duration: '20-25 минут',
      minAudience: '40 человек',
      rating: 5,
      price: '95,000 ₸',
      priceDescription: 'за номер',
      description: 'Энергичное танцевальное шоу с элементами различных стилей: от классических бальных танцев до современного хип-хопа и латиноамериканских ритмов.',
      features: ['Разные танцевальные стили', 'Профессиональные хореографы', 'Яркие костюмы', 'Интерактивные номера', 'Обучение гостей'],
      suitableFor: ['Свадьбы', 'Дни рождения', 'Корпоративы', 'Тематические вечеринки'],
      images: [
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      ],
      coverImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['танцы', 'хореография', 'ритм', 'энергия']
    },
    {
      id: 4,
      title: 'Шоу фокусов и иллюзий "Магическая реальность"',
      category: 'magic',
      duration: '25-30 минут',
      minAudience: '20 человек',
      rating: 5,
      price: '150,000 ₸',
      priceDescription: 'за программу',
      description: 'Удивительное шоу иллюзий и фокусов от профессионального иллюзиониста. Интерактивные номера с участием зрителей и невероятные трюки.',
      features: ['Профессиональный иллюзионист', 'Интерактивные фокусы', 'Участие зрителей', 'Реквизит высокого класса', 'Комедийные элементы'],
      suitableFor: ['Детские праздники', 'Семейные торжества', 'Корпоративы', 'Частные мероприятия'],
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      ],
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['магия', 'фокусы', 'иллюзии', 'интерактив']
    },
    {
      id: 5,
      title: 'Акробатическое шоу "Воздушные грёзы"',
      category: 'acrobatic',
      duration: '18-22 минуты',
      minAudience: '60 человек',
      rating: 5,
      price: '200,000 ₸',
      priceDescription: 'за выступление',
      description: 'Впечатляющее воздушное акробатическое шоу с элементами цирка. Профессиональные акробаты демонстрируют невероятные трюки на высоте.',
      features: ['Воздушная акробатика', 'Цирковые элементы', 'Профессиональное оборудование', 'Световые эффекты', 'Музыкальное сопровождение'],
      suitableFor: ['Большие торжества', 'Корпоративы', 'Открытия', 'Фестивали'],
      images: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      ],
      coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['акробатика', 'цирк', 'воздушные трюки', 'высота']
    },
    {
      id: 6,
      title: 'LED и световое шоу "Неоновые сны"',
      category: 'light',
      duration: '12-15 минут',
      minAudience: '30 человек',
      rating: 4,
      price: '85,000 ₸',
      priceDescription: 'за номер',
      description: 'Современное световое шоу с использованием LED-технологий и светящихся костюмов. Создаем невероятную атмосферу в темноте.',
      features: ['LED-костюмы', 'Световые эффекты', 'Синхронизация с музыкой', 'Интерактивные элементы', 'Современные технологии'],
      suitableFor: ['Ночные мероприятия', 'Клубные вечеринки', 'Корпоративы', 'Тематические праздники'],
      images: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      videos: [
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      ],
      coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['led', 'свет', 'неон', 'технологии']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все шоу', count: showsData.length, icon: Sparkles },
    { id: 'fire', name: 'Огненные шоу', count: showsData.filter(s => s.category === 'fire').length, icon: Flame },
    { id: 'music', name: 'Музыкальные', count: showsData.filter(s => s.category === 'music').length, icon: Music },
    { id: 'dance', name: 'Танцевальные', count: showsData.filter(s => s.category === 'dance').length, icon: Zap },
    { id: 'magic', name: 'Фокусы', count: showsData.filter(s => s.category === 'magic').length, icon: Star },
    { id: 'acrobatic', name: 'Акробатика', count: showsData.filter(s => s.category === 'acrobatic').length, icon: Award },
    { id: 'light', name: 'Световые', count: showsData.filter(s => s.category === 'light').length, icon: Sparkles }
  ];

  const filteredShows = activeFilter === 'all' 
    ? showsData 
    : showsData.filter(show => show.category === activeFilter);

  const openShowModal = (show, imageIndex = 0) => {
    setSelectedShow(show);
    setCurrentImageIndex(imageIndex);
    setCurrentVideoIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeShowModal = useCallback(() => {
    setSelectedShow(null);
    setCurrentImageIndex(0);
    setCurrentVideoIndex(0);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    if (selectedShow) {
      setCurrentImageIndex((prev) => 
        prev === selectedShow.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedShow]);

  const prevImage = useCallback(() => {
    if (selectedShow) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedShow.images.length - 1 : prev - 1
      );
    }
  }, [selectedShow]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedShow) {
        if (e.key === 'Escape') closeShowModal();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedShow, nextImage, prevImage, closeShowModal]);

  return (
    <>
      <Helmet>
        <title>Шоу-программы - Королевство Чудес | Яркие выступления в Петропавловске</title>
        <meta 
          name="description" 
          content="Профессиональные шоу-программы в Петропавловске: огненные шоу, акробатика, фокусы, танцы. Заказать артистов для праздника." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero секция */}
        <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white py-20 overflow-hidden">
          {/* Анимированный фон */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="absolute inset-0"
            />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block text-6xl mb-6"
              >
                🎭✨🔥
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
                Шоу-программы
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
              >
                Профессиональные артисты и захватывающие выступления, которые сделают ваш праздник 
                незабываемым. От огненных шоу до воздушной акробатики!
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                <div className="text-center">
                  <motion.div 
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-3xl font-bold text-yellow-300 mb-2"
                  >
                    50+
                  </motion.div>
                  <div className="text-purple-100">Шоу-программ</div>
                </div>
                <div className="text-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl font-bold text-pink-300 mb-2"
                  >
                    20+
                  </motion.div>
                  <div className="text-purple-100">Артистов</div>
                </div>
                <div className="text-center">
                  <motion.div 
                    animate={{ rotateZ: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-3xl font-bold text-blue-300 mb-2"
                  >
                    4.9
                  </motion.div>
                  <div className="text-purple-100">Рейтинг</div>
                </div>
                <div className="text-center">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-3xl font-bold text-green-300 mb-2"
                  >
                    500+
                  </motion.div>
                  <div className="text-purple-100">Выступлений</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Декоративные элементы */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 text-4xl opacity-30"
          >
            🎪
          </motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 text-5xl opacity-20"
          >
            🎨
          </motion.div>
        </section>

        {/* Фильтры и управление */}
        <section className="py-8 bg-white shadow-lg top-0 z-40">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              {/* Фильтры категорий */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeFilter === category.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600'
                      }`}
                    >
                      <IconComponent size={16} />
                      {category.name} ({category.count})
                    </motion.button>
                  );
                })}
              </div>

              {/* Переключатель вида */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Индикатор загрузки */}
        {loading && (
          <section className="py-12">
            <div className="container-custom">
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                <p className="text-gray-600 text-lg">Загружаем шоу-программы...</p>
              </div>
            </div>
          </section>
        )}

        {/* Сообщение об ошибке */}
        {error && !loading && (
          <section className="py-12">
            <div className="container-custom">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 text-lg mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Попробовать снова
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Шоу-программы сетка */}
        {!loading && !error && (
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
                {filteredShows.map((show, index) => (
                  <motion.div
                    key={show.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group cursor-pointer ${
                      viewMode === 'list' ? 'flex gap-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl' : ''
                    }`}
                    onClick={() => openShowModal(show)}
                  >
                    {viewMode === 'grid' ? (
                      // Сетка вид
                      <motion.div 
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                      >
                        {show.featured && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 left-4 z-10"
                          >
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                              ⭐ ХИТ
                            </span>
                          </motion.div>
                        )}
                        
                        <div className="relative h-64 overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={show.coverImage}
                            alt={show.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Оверлей с иконками */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="flex gap-4">
                              <motion.div 
                                whileHover={{ scale: 1.2 }}
                                className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                              >
                                <Eye className="w-6 h-6 text-gray-700" />
                              </motion.div>
                              <motion.div 
                                whileHover={{ scale: 1.2 }}
                                className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                              >
                                <Play className="w-6 h-6 text-purple-600" />
                              </motion.div>
                              <motion.div 
                                whileHover={{ scale: 1.2 }}
                                className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
                              >
                                <Heart className="w-6 h-6 text-red-500" />
                              </motion.div>
                            </div>
                          </motion.div>
                        </div>

                        <div className="p-6">
                          <motion.h3 
                            className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors"
                          >
                            {show.title}
                          </motion.h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {show.description}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              {show.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              от {show.minAudience}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(show.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-purple-600">
                                {show.price}
                              </div>
                              <div className="text-xs text-gray-500">
                                {show.priceDescription}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      // Список вид
                      <>
                        <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={show.coverImage}
                            alt={show.title}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {show.title}
                            </h3>
                            {show.featured && (
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                ХИТ
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {show.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              {show.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              от {show.minAudience}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(show.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-purple-600">
                                {show.price}
                              </div>
                              <div className="text-xs text-gray-500">
                                {show.priceDescription}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredShows.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎭
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Шоу не найдены
                </h3>
                <p className="text-gray-600">
                  Попробуйте выбрать другую категорию или свяжитесь с нами для индивидуального шоу.
                </p>
              </motion.div>
            )}
          </div>
        </section>
        )}

        {/* Модальное окно деталей шоу */}
        <AnimatePresence>
          {selectedShow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={closeShowModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-7xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Галерея изображений и видео */}
                  <div className="lg:w-2/3 relative">
                    <div className="relative h-96 lg:h-[600px]">
                      <motion.img
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={selectedShow.images[currentImageIndex]}
                        alt={selectedShow.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Навигация по изображениям */}
                    {selectedShow.images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                          <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                        >
                          <ChevronRight size={24} />
                        </motion.button>
                        
                        {/* Миниатюры */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 rounded-full px-3 py-2">
                          {selectedShow.images.map((image, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.2 }}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-12 h-8 rounded overflow-hidden border-2 transition-colors ${
                                currentImageIndex === index ? 'border-white' : 'border-transparent'
                              }`}
                            >
                              <img
                                src={image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </motion.button>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Видео превью */}
                    {selectedShow.videos && selectedShow.videos.length > 0 && (
                      <div className="absolute top-4 right-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                        >
                          <Play size={16} />
                          Видео ({selectedShow.videos.length})
                        </motion.button>
                      </div>
                    )}
                  </div>

                  {/* Информация о шоу */}
                  <div className="lg:w-1/3 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 pr-4">
                        {selectedShow.title}
                      </h2>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={closeShowModal}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X size={20} />
                      </motion.button>
                    </div>

                    {selectedShow.featured && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4"
                      >
                        ⭐ Популярное шоу
                      </motion.div>
                    )}

                    <p className="text-gray-600 mb-6">
                      {selectedShow.description}
                    </p>

                    {/* Основные характеристики */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700">Продолжительность: {selectedShow.duration}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700">Минимум зрителей: {selectedShow.minAudience}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(selectedShow.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-gray-700">Рейтинг клиентов</span>
                      </div>
                    </div>

                    {/* Особенности */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Что включено:</h4>
                      <div className="space-y-2">
                        {selectedShow.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Подходит для */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Подходит для:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedShow.suitableFor.map((event, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Теги */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Теги:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedShow.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Цена */}
                    <motion.div 
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6"
                    >
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">{selectedShow.priceDescription}</div>
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {selectedShow.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          Окончательная стоимость зависит от деталей мероприятия
                        </div>
                      </div>
                    </motion.div>

                    {/* CTA кнопки */}
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsBookingModalOpen(true);
                        }}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={20} />
                        Заказать это шоу
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`, '_blank');
                        }}
                        className="w-full border-2 border-purple-600 text-purple-600 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
                      >
                        Получить консультацию
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Секция преимуществ */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Почему выбирают <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">наши шоу?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Мы создаем не просто выступления, а настоящие эмоциональные переживания
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎭",
                  title: "Профессиональные артисты",
                  description: "Только опытные исполнители с многолетним стажем и безупречной репутацией"
                },
                {
                  icon: "🔥",
                  title: "Безопасность превыше всего",
                  description: "Все номера проходят строгую проверку безопасности, используем только сертифицированное оборудование"
                },
                {
                  icon: "✨",
                  title: "Индивидуальный подход",
                  description: "Адаптируем каждое шоу под специфику вашего мероприятия и пожелания"
                },
                {
                  icon: "🎪",
                  title: "Полное техническое обеспечение",
                  description: "Своя звуковая и световая аппаратура, костюмы, реквизит высокого качества"
                },
                {
                  icon: "⭐",
                  title: "Гарантия качества",
                  description: "Если шоу не понравится - вернем деньги. Но такого еще не было!"
                },
                {
                  icon: "💫",
                  title: "Уникальные номера",
                  description: "Собственные авторские программы, которые вы не увидите больше нигде"
                }
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-4xl mb-4"
                  >
                    {advantage.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA секция */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
          {/* Анимированный фон */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          />

          <div className="container-custom text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🎉
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Готовы удивить <span className="text-yellow-300">своих гостей?</span>
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Закажите шоу-программу прямо сейчас и получите скидку 15% на первое выступление!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  Заказать шоу со скидкой
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`, '_blank')}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={24} />
                  Бесплатная консультация
                </motion.button>
              </div>

              {/* Контакты */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div 
                    animate={{ bounce: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                  >
                    <Phone className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-semibold mb-2">Позвоните прямо сейчас</h3>
                  <p className="text-purple-100">8 (705) 519 5222</p>
                  <p className="text-sm text-purple-200">Работаем 24/7</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                  >
                    <MessageCircle className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-purple-100">Быстрый ответ</p>
                  <p className="text-sm text-purple-200">В течение 5 минут</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                  >
                    <span className="text-2xl">📍</span>
                  </motion.div>
                  <h3 className="font-semibold mb-2">Наш офис</h3>
                  <p className="text-purple-100">ул. Магжана Жумабаева 107</p>
                  <p className="text-sm text-purple-200">Петропавловск</p>
                </motion.div>
              </div>

              {/* Дополнительная информация */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <p className="text-purple-200 text-sm">
                  🎁 При заказе любого шоу - консультация организатора в подарок!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Модальное окно бронирования */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default ShowProgramsPage;