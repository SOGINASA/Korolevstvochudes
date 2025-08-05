import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Star, 
  MapPin, 
  Calendar,
  Users,
  Camera,
  Music,
  Flower,
  Diamond,
  Gift,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  Download,
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award
} from 'lucide-react';

const WeddingsPage = () => {
  const [activeTab, setActiveTab] = useState('organizatsiya');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Данные о свадебных услугах
  const weddingServices = [
    {
      id: 'organizatsiya',
      title: 'Организация свадеб',
      description: 'Полная организация свадьбы под ключ от идеи до воплощения',
      icon: <Heart className="w-8 h-8" />,
      features: ['Планирование концепции', 'Координация поставщиков', 'Контроль бюджета', 'Сопровождение в день свадьбы'],
      priceFrom: '150,000 ₸'
    },
    {
      id: 'vyezdnaya-registratsiya',
      title: 'Выездная регистрация',
      description: 'Романтическая церемония на природе или в уютном месте',
      icon: <Diamond className="w-8 h-8" />,
      features: ['Оформление арки', 'Дорожка для невесты', 'Музыкальное сопровождение', 'Церемониймейстер'],
      priceFrom: '80,000 ₸'
    },
    {
      id: 'fotosessii',
      title: 'Свадебные фотосессии',
      description: 'Профессиональная съемка самого важного дня',
      icon: <Camera className="w-8 h-8" />,
      features: ['Love story съемка', 'Церемония и банкет', 'Обработка фото', 'Красивый фотоальбом'],
      priceFrom: '120,000 ₸'
    },
    {
      id: 'devichniki-malchishniki',
      title: 'Девичники и мальчишники',
      description: 'Яркие предсвадебные вечеринки с друзьями',
      icon: <Gift className="w-8 h-8" />,
      features: ['Тематические программы', 'Развлечения и игры', 'Фотозона', 'Кейтеринг'],
      priceFrom: '45,000 ₸'
    },
    {
      id: 'godovschiny',
      title: 'Годовщины свадеб',
      description: 'Празднование важных дат семейной жизни',
      icon: <Award className="w-8 h-8" />,
      features: ['Ситцевая свадьба (1 год)', 'Серебряная (25 лет)', 'Золотая (50 лет)', 'Индивидуальный подход'],
      priceFrom: '65,000 ₸'
    }
  ];

  // Пакеты услуг
  const weddingPackages = [
    {
      id: 'econom',
      name: 'Эконом',
      price: '250,000 ₸',
      originalPrice: '300,000 ₸',
      guests: 'До 50 гостей',
      popular: false,
      features: [
        'Ведущий на 6 часов',
        'DJ и звуковое оборудование',
        'Базовое оформление зала',
        'Свадебная арка',
        'Букет невесты',
        'Фотограф на 4 часа'
      ],
      notIncluded: ['Видеосъемка', 'Живые цветы', 'Спецэффекты']
    },
    {
      id: 'standart',
      name: 'Стандарт',
      price: '450,000 ₸',
      originalPrice: '520,000 ₸',
      guests: 'До 80 гостей',
      popular: true,
      features: [
        'Ведущий на 8 часов',
        'DJ + живая музыка',
        'Премиум оформление',
        'Выездная регистрация',
        'Букет и бутоньерка',
        'Фотограф на 8 часов',
        'Видеосъемка',
        'Спецэффекты (дым, конфетти)',
        'Свадебный торт'
      ],
      notIncluded: ['Автомобиль', 'Банкет']
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: '750,000 ₸',
      originalPrice: '900,000 ₸',
      guests: 'До 120 гостей',
      popular: false,
      features: [
        'Ведущий на 10 часов',
        'Живая музыка + DJ',
        'Luxury оформление',
        'Выездная регистрация',
        'Флористика (букеты, композиции)',
        'Фотограф + видеограф на весь день',
        'Профессиональная видеосъемка',
        'Спецэффекты и шоу-программа',
        'Многоярусный торт',
        'Свадебный автомобиль',
        'Координатор свадьбы'
      ],
      notIncluded: []
    }
  ];

  // Портфолио свадеб
  const weddingPortfolio = [
    {
      id: 1,
      title: 'Романтическая свадьба Анны и Дмитрия',
      style: 'Прованс',
      location: 'Загородный комплекс "Березка"',
      guests: 85,
      budget: '650,000 ₸',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Нежная свадьба в стиле прованс с лавандовыми акцентами и выездной регистрацией в саду'
    },
    {
      id: 2,
      title: 'Классическая свадьба Елены и Александра',
      style: 'Классика',
      location: 'Отель "Континенталь"',
      guests: 120,
      budget: '850,000 ₸',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Элегантная классическая свадьба с живой музыкой и изысканным декором'
    },
    {
      id: 3,
      title: 'Лофт-свадьба Марии и Сергея',
      style: 'Лофт',
      location: 'Лофт-пространство "Индустрия"',
      guests: 65,
      budget: '480,000 ₸',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Современная свадьба в индустриальном стиле с неоновыми акцентами'
    }
  ];

  // Отзывы
  const testimonials = [
    {
      id: 1,
      name: 'Анна и Дмитрий',
      wedding: 'Июль 2024',
      rating: 5,
      text: 'Команда "Королевство Чудес" сделала нашу свадьбу сказкой! Каждая деталь была продумана до мелочей. Спасибо за незабываемый день!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      video: true
    },
    {
      id: 2,
      name: 'Елена и Александр',
      wedding: 'Сентябрь 2024',
      rating: 5,
      text: 'Профессионализм на высшем уровне! Наши гости до сих пор говорят, что это была лучшая свадьба, на которой они были.',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      video: false
    },
    {
      id: 3,
      name: 'Мария и Сергей',
      wedding: 'Октябрь 2024',
      rating: 5,
      text: 'Мы хотели необычную свадьбу, и получили именно то, о чем мечтали! Креативный подход и внимание к деталям - это про вас!',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      video: true
    }
  ];

  // Процесс работы
  const workProcess = [
    {
      step: 1,
      title: 'Знакомство и концепция',
      description: 'Встречаемся, обсуждаем ваши мечты и создаем уникальную концепцию свадьбы',
      duration: '1-2 недели',
      icon: <Heart className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'Планирование и бюджет',
      description: 'Составляем детальный план, подбираем поставщиков и планируем бюджет',
      duration: '2-3 недели',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Подготовка и репетиция',
      description: 'Финальная подготовка, репетиция церемонии и проверка всех деталей',
      duration: '1 неделя',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'День свадьбы',
      description: 'Полное сопровождение вашего особенного дня от утра до позднего вечера',
      duration: '12-14 часов',
      icon: <Diamond className="w-6 h-6" />
    }
  ];

  // Локации
  const weddingLocations = [
    {
      name: 'Загородный комплекс "Березка"',
      type: 'Природа',
      capacity: '50-150 гостей',
      price: 'От 25,000 ₸/час',
      features: ['Банкетный зал', 'Открытая терраса', 'Сад для церемонии', 'Парковка'],
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Отель "Континенталь"',
      type: 'Отель',
      capacity: '80-200 гостей',
      price: 'От 35,000 ₸/час',
      features: ['Роскошный зал', 'Номера для молодоженов', 'Профессиональная кухня', 'Координатор'],
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Лофт-пространство "Индустрия"',
      type: 'Лофт',
      capacity: '40-100 гостей',
      price: 'От 20,000 ₸/час',
      features: ['Современный интерьер', 'Высокие потолки', 'Панорамные окна', 'Звуковое оборудование'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // FAQ
  const faqData = [
    {
      question: 'За сколько времени нужно начинать планировать свадьбу?',
      answer: 'Рекомендуем начинать планирование за 6-12 месяцев до даты свадьбы. Это позволит спокойно выбрать лучших поставщиков, локацию и продумать все детали без спешки.'
    },
    {
      question: 'Входит ли банкет в стоимость пакетов?',
      answer: 'Банкет оплачивается отдельно и зависит от выбранной локации и меню. Мы поможем подобрать оптимальный вариант под ваш бюджет и предпочтения.'
    },
    {
      question: 'Можно ли изменить состав пакета услуг?',
      answer: 'Конечно! Все наши пакеты можно адаптировать под ваши потребности. Мы добавим или уберем услуги согласно вашим пожеланиям.'
    },
    {
      question: 'Что включает координация в день свадьбы?',
      answer: 'Координатор контролирует тайминг, координирует работу всех поставщиков, решает организационные вопросы и следит за тем, чтобы вы наслаждались своим днем.'
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
    <>
      <Helmet>
        <title>Свадьбы в Петропавловске - Организация свадеб под ключ | Королевство Чудес</title>
        <meta 
          name="description" 
          content="Организация свадеб в Петропавловске ✨ Полный спектр услуг: ведущий, декор, фото, видео. Выездная регистрация. Более 100 счастливых пар ❤️" 
        />
        <meta name="keywords" content="свадьба петропавловск, организация свадьбы, свадебный организатор, выездная регистрация, свадебный ведущий" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero секция */}
        <section className="relative bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-8 h-8 text-pink-200" />
                <span className="text-pink-200 font-medium">Свадьбы мечты</span>
                <Heart className="w-8 h-8 text-pink-200" />
              </div>
              
              <h1 className="heading-1 mb-6">
                Создаём <span className="text-pink-200">свадьбу вашей мечты</span> в Петропавловске
              </h1>
              
              <p className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
                От романтической выездной регистрации до роскошного банкета — 
                воплощаем в жизнь самый важный день в вашей жизни с любовью к деталям
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-secondary bg-white text-pink-600 hover:bg-pink-50 text-lg px-8 py-4">
                  Заказать свадьбу
                </button>
                <button className="btn-outline border-white text-white hover:bg-white hover:text-pink-600 text-lg px-8 py-4">
                  Посмотреть портфолио
                </button>
              </div>

              {/* Статистика */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-200 mb-2">100+</div>
                  <div className="text-pink-100 text-sm">Счастливых пар</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-200 mb-2">7</div>
                  <div className="text-pink-100 text-sm">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-200 mb-2">4.9</div>
                  <div className="text-pink-100 text-sm">Средняя оценка</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-200 mb-2">25+</div>
                  <div className="text-pink-100 text-sm">Партнерских площадок</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Навигация по услугам */}
        <section className="py-12 bg-white top-0 z-40 shadow-sm">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2 justify-center">
              {weddingServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === service.id
                      ? 'bg-pink-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Детали услуги */}
        <section className="py-16">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              {weddingServices.map((service) => (
                activeTab === service.id && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white">
                          {service.icon}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {service.title}
                          </h2>
                          <div className="text-pink-600 font-semibold">
                            от {service.priceFrom}
                          </div>
                        </div>
                      </div>

                      <p className="text-lg text-gray-600 mb-8">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="btn-primary">
                          Заказать услугу
                        </button>
                        <button className="btn-outline">
                          Узнать подробнее
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                        <img
                          src={`https://images.unsplash.com/photo-${
                            service.id === 'organizatsiya' ? '1519741497674-611481863552' :
                            service.id === 'vyezdnaya-registratsiya' ? '1465495976277-4387d4b0e4a6' :
                            service.id === 'fotosessii' ? '1511285560929-80b456fea0bc' :
                            service.id === 'devichniki-malchishniki' ? '1530103862676-de8c9debad1d' :
                            '1464366400600-7168b8af9bc3'
                          }?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Декоративные элементы */}
                      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-20"></div>
                      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-rose-400 to-red-400 rounded-full opacity-20"></div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Пакеты услуг */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 mb-6">
                Свадебные <span className="text-pink-600">пакеты</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Выберите готовый пакет или создадим индивидуальное предложение специально для вас
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {weddingPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-white rounded-3xl p-8 shadow-xl transition-transform duration-300 hover:scale-105 ${
                    pkg.popular ? 'ring-2 ring-pink-500 ring-offset-4' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold px-6 py-2 rounded-full">
                        ПОПУЛЯРНЫЙ
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-pink-600">
                        {pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {pkg.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600">{pkg.guests}</div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    
                    {pkg.notIncluded.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          Дополнительно (за отдельную плату):
                        </div>
                        {pkg.notIncluded.map((item, i) => (
                          <div key={i} className="text-sm text-gray-400 ml-2">
                            • {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    Выбрать пакет
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Нужно что-то индивидуальное? Создадим уникальный пакет специально для вас!
              </p>
              <button className="btn-outline text-pink-600 border-pink-600 hover:bg-pink-600 hover:text-white">
                Индивидуальный расчет
              </button>
            </div>
          </div>
        </section>

        {/* Процесс работы */}
        <section className="py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 mb-6">
                Как мы <span className="text-pink-600">организуем</span> вашу свадьбу
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Пошаговый процесс создания идеальной свадьбы от первой встречи до последнего танца
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workProcess.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-pink-500 rounded-full flex items-center justify-center text-pink-500 font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-pink-600">
                    <Clock className="w-4 h-4" />
                    {step.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Портфолио свадеб */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 mb-6">
                Наши <span className="text-pink-600">свадьбы</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Каждая свадьба уникальна, как и история любви наших молодоженов
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weddingPortfolio.map((wedding, index) => (
                <motion.div
                  key={wedding.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="card overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={wedding.image}
                        alt={wedding.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-pink-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                          {wedding.style}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <Camera className="w-6 h-6 text-gray-700" />
                          </div>
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-red-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {wedding.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {wedding.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {wedding.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          {wedding.guests} гостей
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(wedding.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <div className="text-pink-600 font-semibold">
                          {wedding.budget}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="btn-primary">
                Смотреть все свадьбы
              </button>
            </div>
          </div>
        </section>

        {/* Локации */}
        <section className="py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 mb-6">
                Лучшие <span className="text-pink-600">площадки</span> города
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Партнерские локации с особыми условиями для наших клиентов
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weddingLocations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group cursor-pointer overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-pink-600 text-sm font-medium px-3 py-1 rounded-full">
                        {location.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                      {location.name}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        {location.capacity}
                      </div>
                      <div className="font-semibold text-pink-600">
                        {location.price}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {location.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-20 bg-gradient-to-r from-pink-50 to-rose-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 mb-6">
                Отзывы <span className="text-pink-600">молодоженов</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Счастливые пары делятся впечатлениями о своем особенном дне
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl p-8 shadow-xl"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        {testimonials[activeTestimonial].video && (
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-current" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      <blockquote className="text-lg text-gray-700 mb-4 italic">
                        "{testimonials[activeTestimonial].text}"
                      </blockquote>

                      <div className="flex items-center justify-center md:justify-start gap-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonials[activeTestimonial].name}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {testimonials[activeTestimonial].wedding}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Навигация */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setActiveTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        activeTestimonial === index ? 'bg-pink-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-pink-50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="heading-2 mb-6">
                Частые <span className="text-pink-600">вопросы</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ответы на самые популярные вопросы о организации свадеб
              </p>
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
                    className="card"
                  >
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center group-open:rotate-45 transition-transform">
                          <div className="w-4 h-0.5 bg-pink-500"></div>
                          <div className="w-0.5 h-4 bg-pink-500 absolute"></div>
                        </div>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA секция */}
        <section className="py-20 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-6">
                Готовы сказать <span className="text-pink-200">"Да!"</span> свадьбе мечты?
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                Начните планирование прямо сейчас! Первая консультация — бесплатно
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-secondary bg-white text-pink-600 hover:bg-pink-50 text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  Позвонить сейчас
                </button>
                <button className="btn-outline border-white text-white hover:bg-white hover:text-pink-600 text-lg px-8 py-4">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Написать в WhatsApp
                </button>
              </div>

              {/* Дополнительная информация */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Бесплатная консультация</h3>
                  <p className="text-pink-100 text-sm">Обсудим ваши мечты и составим план</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Чек-лист планирования</h3>
                  <p className="text-pink-100 text-sm">Скачайте бесплатный гид по организации</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Гарантия качества</h3>
                  <p className="text-pink-100 text-sm">100% возврат средств при невыполнении</p>
                </div>
              </div>

              {/* Контактная информация */}
              <div className="mt-12 pt-8 border-t border-pink-400/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
                  <div>
                    <h4 className="font-semibold mb-2">Наш офис:</h4>
                    <p className="text-pink-100">ул. Конституции, 15, Петропавловск</p>
                    <p className="text-pink-100">Ежедневно с 9:00 до 21:00</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Контакты:</h4>
                    <p className="text-pink-100">+7 (7152) 123-456</p>
                    <p className="text-pink-100">wedding@prazdnikvdom.kz</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WeddingsPage;