import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Star, 
  MapPin, 
  Calendar,
  Users,
  Camera,
  Music,
  Flower,
  Crown,
  Heart,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  Download,
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
  Cake,
  Sparkles,
  PartyPopper
} from 'lucide-react';

const AnniversaryCelebrationsPage = () => {
  const [activeTab, setActiveTab] = useState('yubilei-vzroslykh');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Данные о услугах юбилеев и торжеств
  const anniversaryServices = [
    {
      id: 'yubilei-vzroslykh',
      title: 'Юбилеи взрослых',
      description: 'Торжественные юбилеи 30, 40, 50, 60, 70 лет с элегантным оформлением',
      icon: <Crown className="w-8 h-8" />,
      features: ['Торжественная программа', 'Живая музыка', 'Поздравления от звезд', 'Фото и видеосъемка'],
      priceFrom: '80,000 ₸'
    },
    {
      id: 'serebryanye-zolotye-svadby',
      title: 'Серебряные и золотые свадьбы',
      description: '25 и 50 лет совместной жизни - особые даты, требующие особого подхода',
      icon: <Heart className="w-8 h-8" />,
      features: ['Ретро-оформление', 'Семейная фотосессия', 'Видео-поздравления', 'Торжественный ужин'],
      priceFrom: '100,000 ₸'
    },
    {
      id: 'pominalnie-obedy',
      title: 'Поминальные обеды',
      description: 'Деликатная организация поминальных мероприятий с соблюдением традиций',
      icon: <Flower className="w-8 h-8" />,
      features: ['Скромное оформление', 'Традиционное меню', 'Тихая музыка', 'Организация речей'],
      priceFrom: '45,000 ₸'
    },
    {
      id: 'religioznye-prazdniki',
      title: 'Религиозные праздники',
      description: 'Празднование религиозных дат с учетом традиций и обычаев',
      icon: <Sparkles className="w-8 h-8" />,
      features: ['Соблюдение традиций', 'Тематическое оформление', 'Национальная кухня', 'Культурная программа'],
      priceFrom: '65,000 ₸'
    }
  ];

  // Пакеты услуг для юбилеев
  const anniversaryPackages = [
    {
      id: 'family',
      name: 'Семейный',
      price: '150,000 ₸',
      originalPrice: '180,000 ₸',
      guests: 'До 30 гостей',
      popular: false,
      features: [
        'Ведущий на 4 часа',
        'Музыкальное сопровождение',
        'Базовое оформление зала',
        'Фотограф на 3 часа',
        'Торжественный торт',
        'Поздравительные открытки'
      ],
      notIncluded: ['Видеосъемка', 'Живые цветы', 'Специальные эффекты']
    },
    {
      id: 'classic',
      name: 'Классический',
      price: '280,000 ₸',
      originalPrice: '320,000 ₸',
      guests: 'До 60 гостей',
      popular: true,
      features: [
        'Ведущий на 6 часов',
        'Живая музыка + DJ',
        'Элегантное оформление',
        'Фото и видеосъемка',
        'Многоярусный торт',
        'Флористические композиции',
        'Поздравления от звезд (видео)',
        'Слайд-шоу из фотографий',
        'Памятные подарки гостям'
      ],
      notIncluded: ['Банкет', 'Транспорт']
    },
    {
      id: 'luxury',
      name: 'Люкс',
      price: '450,000 ₸',
      originalPrice: '550,000 ₸',
      guests: 'До 100 гостей',
      popular: false,
      features: [
        'Ведущий на 8 часов',
        'Оркестр + вокалисты',
        'Премиум оформление',
        'Профессиональная фото/видеосъемка',
        'Эксклюзивный торт на заказ',
        'Роскошная флористика',
        'Персональные поздравления от звезд',
        'Профессиональное слайд-шоу',
        'VIP подарки для гостей',
        'Красная дорожка',
        'Координатор мероприятия'
      ],
      notIncluded: []
    }
  ];

  // Портфолио юбилеев
  const anniversaryPortfolio = [
    {
      id: 1,
      title: 'Юбилей 60 лет Валентины Николаевны',
      type: 'Юбилей',
      location: 'Ресторан "Империя"',
      guests: 55,
      budget: '320,000 ₸',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Элегантный юбилей с живой музыкой, поздравлениями от звезд и трогательными воспоминаниями'
    },
    {
      id: 2,
      title: 'Золотая свадьба Анатолия и Розы',
      type: '50 лет вместе',
      location: 'Банкетный зал "Версаль"',
      guests: 80,
      budget: '480,000 ₸',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Торжественное празднование золотой свадьбы с семейными традициями и ретро-атмосферой'
    },
    {
      id: 3,
      title: 'Юбилей 70 лет Михаила Петровича',
      type: 'Юбилей',
      location: 'Загородный клуб "Отдых"',
      guests: 40,
      budget: '250,000 ₸',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Душевный юбилей с военными песнями, воспоминаниями о молодости и теплой атмосферой'
    }
  ];

  // Отзывы
  const testimonials = [
    {
      id: 1,
      name: 'Валентина Николаевна',
      event: 'Юбилей 60 лет, август 2024',
      rating: 5,
      text: 'Спасибо огромное за незабываемый праздник! Все было организовано безупречно. Гости до сих пор вспоминают этот вечер с восхищением.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      video: false
    },
    {
      id: 2,
      name: 'Анатолий и Роза',
      event: 'Золотая свадьба, сентябрь 2024',
      rating: 5,
      text: '50 лет назад мы и мечтать не могли о таком красивом празднике! Дети и внуки были в восторге. Профессионализм на высшем уровне!',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      video: true
    },
    {
      id: 3,
      name: 'Семья Петровых',
      event: 'Юбилей 70 лет, октябрь 2024',
      rating: 5,
      text: 'Мой отец был так счастлив! Вы смогли создать именно ту атмосферу, которую мы хотели - теплую, семейную, но в то же время торжественную.',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      video: false
    }
  ];

  // Процесс работы
  const workProcess = [
    {
      step: 1,
      title: 'Знакомство и планирование',
      description: 'Узнаем историю юбиляра, его предпочтения и создаем персональную концепцию',
      duration: '1-2 недели',
      icon: <Heart className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'Подготовка программы',
      description: 'Составляем сценарий, подбираем музыку и готовим сюрпризы',
      duration: '2-3 недели',
      icon: <Music className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Оформление и декор',
      description: 'Создаем атмосферу торжества с учетом возраста и предпочтений',
      duration: '1 неделя',
      icon: <Flower className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'Проведение торжества',
      description: 'Полное сопровождение праздника от встречи гостей до последнего тоста',
      duration: '6-8 часов',
      icon: <PartyPopper className="w-6 h-6" />
    }
  ];

  // Идеи для юбилеев
  const anniversaryIdeas = [
    {
      age: '30-40 лет',
      theme: 'Современные тренды',
      description: 'Стильные вечеринки с современной музыкой и трендовым оформлением',
      features: ['DJ и танцпол', 'Фотозона в Instagram-стиле', 'Коктейльный бар', 'Интерактивные игры'],
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      age: '50-60 лет',
      theme: 'Ретро и классика',
      description: 'Элегантные торжества с музыкой молодости и классическим оформлением',
      features: ['Живая музыка 70-80х', 'Элегантный декор', 'Танцы под ретро-хиты', 'Слайд-шоу воспоминаний'],
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      age: '70+ лет',
      theme: 'Семейные традиции',
      description: 'Душевные празднования с акцентом на семейные ценности и традиции',
      features: ['Песни военных лет', 'Семейные фотографии', 'Традиционные угощения', 'Теплая атмосфера'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // FAQ
  const faqData = [
    {
      question: 'Как выбрать подходящий формат для юбилея?',
      answer: 'Мы учитываем возраст юбиляра, количество гостей, их предпочтения и семейные традиции. Для каждого возраста есть свои особенности организации торжества.'
    },
    {
      question: 'Можете ли вы организовать поздравления от звезд?',
      answer: 'Да, мы можем организовать видео-поздравления от популярных артистов, актеров и других знаменитостей. Стоимость зависит от уровня звезды.'
    },
    {
      question: 'Входит ли банкет в стоимость пакетов?',
      answer: 'Банкет оплачивается отдельно. Мы поможем выбрать подходящее меню и ресторан, учитывая предпочтения юбиляра и бюджет.'
    },
    {
      question: 'Как происходит организация поминальных обедов?',
      answer: 'Мы организуем поминальные мероприятия с особым тактом и деликатностью, соблюдая все традиции и пожелания семьи.'
    }
  ];

  // Автоматическая смена отзывов
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero секция */}
      <section 
        className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-20 overflow-hidden"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Анимированные фоновые элементы */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
            animate={{ 
              scale: isHoveringHero ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: [0, 360],
              x: isHoveringHero ? [0, 20, 0] : [0, 10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              y: isHoveringHero ? [0, -30, 0] : [0, -15, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.4, 1],
              rotate: [0, -360],
              x: isHoveringHero ? [0, -25, 0] : [0, -12, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/3 w-8 h-8 bg-amber-300/20 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              className="flex items-center justify-center gap-2 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="w-8 h-8 text-amber-200" />
              </motion.div>
              <span className="text-amber-200 font-medium">Торжественные моменты</span>
              <motion.div
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Crown className="w-8 h-8 text-amber-200" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Отмечаем <motion.span 
                className="text-amber-200"
                animate={{ textShadow: ["0 0 0px #fbbf24", "0 0 20px #fbbf24", "0 0 0px #fbbf24"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                важные даты
              </motion.span> с достоинством
            </motion.h1>
            
            <motion.p 
              className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Юбилеи, годовщины свадеб и семейные торжества — каждая важная дата 
              заслуживает особого внимания и трепетного отношения к деталям
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button 
                className="bg-white text-amber-600 hover:bg-amber-50 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                Заказать торжество
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Посмотреть примеры</span>
              </motion.button>
            </motion.div>

            {/* Статистика с анимациями */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {[
                { value: "250+", label: "Юбилеев проведено", delay: 0 },
                { value: "50+", label: "Золотых свадеб", delay: 0.1 },
                { value: "5.0", label: "Средняя оценка", delay: 0.2 },
                { value: "15+", label: "Лет опыта", delay: 0.3 }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className="text-3xl font-bold text-amber-200 mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + stat.delay, type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      scale: 1.2,
                      textShadow: "0 0 15px rgba(251, 191, 36, 0.8)"
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    className="text-amber-100 text-sm group-hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Навигация по услугам */}
      <motion.section 
        className="py-12 bg-white top-0 z-40 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {anniversaryServices.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  activeTab === service.id
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0"
                  whileHover={{ opacity: activeTab === service.id ? 0 : 0.1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{service.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Детали услуги */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {anniversaryServices.map((service) => (
              activeTab === service.id && (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <motion.div 
                      className="flex items-center gap-4 mb-6"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white"
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.1,
                          boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)"
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.icon}
                      </motion.div>
                      <div>
                        <motion.h2 
                          className="text-3xl font-bold text-gray-900 mb-2"
                          whileHover={{ color: "#f59e0b" }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.title}
                        </motion.h2>
                        <motion.div 
                          className="text-amber-600 font-semibold"
                          whileHover={{ scale: 1.05 }}
                        >
                          от {service.priceFrom}
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.p 
                      className="text-lg text-gray-600 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      {service.description}
                    </motion.p>

                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      {service.features.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center gap-3 group cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.4 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 group-hover:text-green-600" />
                          </motion.div>
                          <motion.span 
                            className="text-gray-700 group-hover:text-gray-900 transition-colors"
                            whileHover={{ fontWeight: 600 }}
                          >
                            {feature}
                          </motion.span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    >
                      <motion.button 
                        className="bg-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Заказать услугу</span>
                      </motion.button>
                      <motion.button 
                        className="border-2 border-amber-500 text-amber-500 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 relative overflow-hidden group"
                        whileHover={{ 
                          scale: 1.05,
                          borderColor: "#f59e0b",
                          boxShadow: "0 8px 25px rgba(245, 158, 11, 0.2)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Узнать подробнее</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <motion.div 
                      className="aspect-square rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
                      whileHover={{ 
                        scale: 1.05,
                        rotate: 2,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.img
                        src={`https://images.unsplash.com/photo-${
                          service.id === 'yubilei-vzroslykh' ? '1464366400600-7168b8af9bc3' :
                          service.id === 'serebryanye-zolotye-svadby' ? '1551698618-1dfe5d97d256' :
                          service.id === 'pominalnie-obedy' ? '1507003211169-0a1dd7228f2d' :
                          '1470229722913-7c0e2dbbafd3'
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ filter: "brightness(1.1)" }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />
                    </motion.div>
                    
                    {/* Декоративные элементы с анимацией */}
                    <motion.div 
                      className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 8, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <motion.div 
                      className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -180, -360]
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 2
                      }}
                    />
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Идеи по возрастам */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Идеи для <motion.span 
                className="text-amber-600"
                whileHover={{ 
                  textShadow: "0 0 20px rgba(245, 158, 11, 0.5)"
                }}
              >
                разных возрастов
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Каждый возраст имеет свои особенности и предпочтения. Мы знаем, как сделать праздник идеальным
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {anniversaryIdeas.map((idea, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={idea.image}
                    alt={idea.theme}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-full shadow-lg">
                      {idea.age}
                    </span>
                  </motion.div>
                </div>

                <motion.div 
                  className="p-6"
                  whileHover={{ backgroundColor: "#fefbf3" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {idea.theme}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 mb-4"
                    whileHover={{ color: "#374151" }}
                  >
                    {idea.description}
                  </motion.p>

                  <div className="space-y-2">
                    {idea.features.map((feature, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-2 text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                        whileHover={{ x: 5, color: "#374151" }}
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.4 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        </motion.div>
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Пакеты услуг */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Пакеты для <motion.span 
                className="text-amber-600"
                whileHover={{ 
                  textShadow: "0 0 20px rgba(245, 158, 11, 0.5)"
                }}
              >
                торжеств
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              От скромного семейного ужина до роскошного торжества — выберите подходящий формат
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {anniversaryPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl cursor-pointer group ${
                  pkg.popular ? 'ring-2 ring-amber-500 ring-offset-4' : ''
                }`}
                whileHover={{ 
                  y: -15,
                  boxShadow: pkg.popular 
                    ? "0 25px 50px rgba(245, 158, 11, 0.25)" 
                    : "0 25px 50px rgba(0,0,0,0.15)",
                  scale: 1.02
                }}
                transition ={{ duration: 0.4 }}>
                {pkg.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                      ПОПУЛЯРНЫЙ
                    </span>
                  </motion.div>
                )}

                <motion.div 
                  className="text-center mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors"
                    whileHover={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                  >
                    {pkg.name}
                  </motion.h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <motion.span 
                      className="text-3xl font-bold text-amber-600"
                      whileHover={{ 
                        scale: 1.1,
                        textShadow: "0 0 15px rgba(245, 158, 11, 0.5)"
                      }}
                    >
                      {pkg.price}
                    </motion.span>
                    {pkg.originalPrice && (
                      <motion.span 
                        className="text-lg text-gray-400 line-through"
                        whileHover={{ scale: 1.05 }}
                      >
                        {pkg.originalPrice}
                      </motion.span>
                    )}
                  </div>
                  <motion.div 
                    className="text-gray-600"
                    whileHover={{ color: "#374151" }}
                  >
                    {pkg.guests}
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {pkg.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-3 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                      whileHover={{ x: 5, backgroundColor: "#fefbf3" }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.4 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover/item:text-green-600" />
                      </motion.div>
                      <motion.span 
                        className="text-gray-700 group-hover/item:text-gray-900 transition-colors"
                        whileHover={{ fontWeight: 600 }}
                      >
                        {feature}
                      </motion.span>
                    </motion.div>
                  ))}
                  
                  {pkg.notIncluded.length > 0 && (
                    <motion.div 
                      className="pt-4 border-t border-gray-100"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="text-sm font-medium text-gray-500 mb-2"
                        whileHover={{ color: "#6b7280" }}
                      >
                        Дополнительно (за отдельную плату):
                      </motion.div>
                      {pkg.notIncluded.map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="text-sm text-gray-400 ml-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
                          whileHover={{ x: 5, color: "#6b7280" }}
                        >
                          • {item}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                <motion.button 
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group/btn ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: pkg.popular 
                      ? "0 10px 25px rgba(245, 158, 11, 0.4)" 
                      : "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className={`absolute inset-0 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-orange-400 to-red-400' 
                        : 'bg-gradient-to-r from-amber-400 to-orange-400'
                    } opacity-0 group-hover/btn:opacity-100`}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Выбрать пакет</span>
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-gray-600 mb-6"
              whileHover={{ color: "#374151" }}
            >
              Особые пожелания? Создадим индивидуальную программу специально для вашего торжества!
            </motion.p>
            <motion.button 
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(245, 158, 11, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-amber-600 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Индивидуальный расчет</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Частые <motion.span 
                className="text-amber-600"
                whileHover={{ 
                  textShadow: "0 0 20px rgba(245, 158, 11, 0.5)"
                }}
              >
                вопросы
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ответы на самые популярные вопросы о организации юбилеев и торжеств
            </motion.p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                >
                  <details className="group/details">
                    <motion.summary 
                      className="flex items-center justify-between cursor-pointer p-6"
                      whileHover={{ backgroundColor: "#fefbf3" }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 
                        className="text-lg font-semibold text-gray-900 pr-4"
                        whileHover={{ color: "#f59e0b" }}
                      >
                        {faq.question}
                      </motion.h3>
                      <motion.div 
                        className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-open/details:rotate-45 transition-transform duration-300 relative"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "#fef3c7"
                        }}
                      >
                        <motion.div 
                          className="w-4 h-0.5 bg-amber-500 absolute"
                          whileHover={{ backgroundColor: "#f59e0b" }}
                        />
                        <motion.div 
                          className="w-0.5 h-4 bg-amber-500 absolute"
                          whileHover={{ backgroundColor: "#f59e0b" }}
                        />
                      </motion.div>
                    </motion.summary>
                    <motion.div 
                      className="px-6 pb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p 
                        className="text-gray-600 leading-relaxed"
                        whileHover={{ color: "#374151" }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white relative overflow-hidden">
        {/* Анимированные фоновые элементы */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-1/2 right-20 w-24 h-24 bg-amber-300/20 rounded-full"
            animate={{ 
              scale: [1, 1.4, 1],
              rotate: [0, -360],
              y: [0, 40, 0]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute bottom-16 left-1/3 w-20 h-20 bg-orange-300/20 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Готовы отметить <motion.span 
                className="text-amber-200"
                animate={{ 
                  textShadow: [
                    "0 0 0px #fbbf24", 
                    "0 0 30px #fbbf24", 
                    "0 0 0px #fbbf24"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                важную дату
              </motion.span> достойно?
            </motion.h2>
            <motion.p 
              className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Каждый юбилей заслуживает особого внимания. Доверьте нам организацию вашего торжества
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="bg-white text-amber-600 hover:bg-amber-50 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Phone className="w-5 h-5 relative z-10" />
                </motion.div>
                <span className="relative z-10">Обсудить торжество</span>
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="w-5 h-5 relative z-10" />
                </motion.div>
                <span className="relative z-10">Написать в WhatsApp</span>
              </motion.button>
            </motion.div>

            {/* Дополнительная информация */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <Calendar className="w-8 h-8" />,
                  title: "Персональный подход",
                  desc: "Учитываем все пожелания и традиции семьи"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Опытная команда", 
                  desc: "15+ лет опыта в организации торжеств"
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Внимание к деталям",
                  desc: "Каждая мелочь имеет значение"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="text-center group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 10px 25px rgba(255,255,255,0.1)"
                    }}
                    animate={{
                      boxShadow: [
                        "0 5px 15px rgba(255,255,255,0.1)",
                        "0 10px 25px rgba(255,255,255,0.15)",
                        "0 5px 15px rgba(255,255,255,0.1)"
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                  </motion.div>
                  <motion.h3 
                    className="font-semibold mb-2 group-hover:text-amber-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-amber-100 text-sm group-hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    {item.desc}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Дополнительные декоративные элементы */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-200 rounded-full"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-orange-200 rounded-full"
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/2 w-1 h-1 bg-red-200 rounded-full"
          animate={{ 
            scale: [0, 2, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            delay: 0.5
          }}
        />
      </section>
    </div>
  );
};

export default AnniversaryCelebrationsPage;