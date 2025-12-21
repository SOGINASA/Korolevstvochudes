import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  Play,
  Gift,
  Sparkles,
  Heart,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Trophy,
  Camera,
  Music,
  Gamepad2,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';

const ChildrenPartiesPage = () => {
  const [activePackage, setActivePackage] = useState(0);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Данные персонажей/аниматоров
  const characters = [
    {
      id: 1,
      name: 'Принцесса Эльза',
      category: 'Принцессы Disney',
      age: '3-8 лет',
      duration: '60 минут',
      price: '25,000 ₸',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Волшебная принцесса из королевства Эренделл подарит детям настоящую сказку',
      includes: ['Костюм принцессы', 'Интерактивные игры', 'Песни из мультфильма', 'Фотосессия'],
      popular: true
    },
    {
      id: 2,
      name: 'Человек-паук',
      category: 'Супергерои',
      age: '4-10 лет',
      duration: '60 минут',
      price: '28,000 ₸',
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Дружелюбный сосед-супергерой научит детей быть храбрыми и справедливыми',
      includes: ['Костюм супергероя', 'Тренировка супергероев', 'Спасательные миссии', 'Награждение']
    },
    {
      id: 3,
      name: 'Пират Джек',
      category: 'Приключения',
      age: '5-12 лет',
      duration: '90 минут',
      price: '30,000 ₸',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Отважный пират проведет детей через захватывающий квест за сокровищами',
      includes: ['Костюм пирата', 'Поиск сокровищ', 'Пиратские игры', 'Карта сокровищ на память']
    },
    {
      id: 4,
      name: 'Фея Динь-Динь',
      category: 'Волшебство',
      age: '3-7 лет',
      duration: '60 минут',
      price: '24,000 ₸',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Маленькая фея научит детей настоящей магии и исполнит их желания',
      includes: ['Волшебный костюм', 'Фокусы и магия', 'Создание волшебных предметов', 'Исполнение желаний']
    }
  ];

  // Пакеты услуг
  const packages = [
    {
      id: 1,
      name: 'Базовый',
      price: '35,000 ₸',
      duration: '2 часа',
      guests: 'до 10 детей',
      popular: false,
      includes: [
        'Аниматор в костюме (1 персонаж)',
        'Интерактивная программа 60 минут',
        'Простые конкурсы и игры',
        'Аквагрим (5 детей)',
        'Мыльные пузыри',
        'Поздравление именинника'
      ],
      ideal: 'Идеально для домашнего праздника'
    },
    {
      id: 2,
      name: 'Стандарт',
      price: '55,000 ₸',
      duration: '3 часа',
      guests: 'до 15 детей',
      popular: true,
      includes: [
        'Аниматор в костюме (1-2 персонажа)',
        'Интерактивная программа 90 минут',
        'Тематические конкурсы и квесты',
        'Аквагрим (10 детей)',
        'Шоу мыльных пузырей',
        'Воздушные шарики',
        'Фотосессия с персонажем',
        'Музыкальное сопровождение'
      ],
      ideal: 'Самый популярный выбор для кафе и залов'
    },
    {
      id: 3,
      name: 'Премиум',
      price: '85,000 ₸',
      duration: '4 часа',
      guests: 'до 20 детей',
      popular: false,
      includes: [
        'Два аниматора в костюмах',
        'Интерактивная программа 120 минут',
        'Тематическое шоу-представление',
        'Аквагрим (все дети)',
        'Шоу мыльных пузырей + твисты из шаров',
        'Воздушные фигуры',
        'Профессиональная фотосессия',
        'Музыкальное и световое оборудование',
        'Подарки для всех детей',
        'Торжественное поздравление'
      ],
      ideal: 'Для особенных дней рождения и больших компаний'
    }
  ];

  // Шоу-программы
  const showPrograms = [
    {
      id: 1,
      name: 'Шоу мыльных пузырей',
      price: '15,000 ₸',
      duration: '20 минут',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Завораживающее шоу с гигантскими мыльными пузырями'
    },
    {
      id: 2,
      name: 'Кукольный театр',
      price: '18,000 ₸',
      duration: '30 минут',
      image: 'https://images.unsplash.com/photo-1607343833574-da7843101542?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Интерактивный спектакль с участием детей'
    },
    {
      id: 3,
      name: 'Научное шоу',
      price: '22,000 ₸',
      duration: '40 минут',
      image: 'https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Удивительные эксперименты и открытия'
    }
  ];

  // FAQ
  const faqData = [
    {
      question: 'Какой возраст детей подходит для ваших программ?',
      answer: 'Наши программы адаптированы для детей от 2 до 12 лет. Каждая программа подбирается индивидуально с учетом возраста именинника и гостей.'
    },
    {
      question: 'Можно ли заказать праздник на дому?',
      answer: 'Конечно! Мы проводим праздники дома, в кафе, детских центрах, на природе и в любом удобном для вас месте.'
    },
    {
      question: 'Что входит в стоимость базового пакета?',
      answer: 'В базовый пакет входит работа аниматора, интерактивная программа, простой аквагрим, мыльные пузыри и поздравление именинника.'
    },
    {
      question: 'За сколько дней нужно бронировать праздник?',
      answer: 'Рекомендуем бронировать за 1-2 недели. В выходные и праздники желательно бронировать заранее за 2-3 недели.'
    },
    {
      question: 'Предоставляете ли вы музыкальное оборудование?',
      answer: 'Да, в стандартный и премиум пакеты входит музыкальное оборудование. Для базового пакета можно заказать отдельно.'
    }
  ];

  // Отзывы
  const reviews = [
    {
      id: 1,
      name: 'Анна Петрова',
      rating: 5,
      date: '2024-07-15',
      text: 'Принцесса Эльза была просто волшебной! Дочка до сих пор вспоминает свой день рождения. Аниматор профессиональный, дети были в восторге 2 часа!',
      service: 'Принцесса Эльза, пакет Стандарт'
    },
    {
      id: 2,
      name: 'Дмитрий Сидоров',
      rating: 5,
      date: '2024-06-28',
      text: 'Человек-паук покорил всех мальчишек! Организация на высшем уровне, пунктуальность, креативность. Обязательно обратимся еще!',
      service: 'Человек-паук, пакет Премиум'
    },
    {
      id: 3,
      name: 'Мария Козлова',
      rating: 5,
      date: '2024-06-10',
      text: 'Спасибо за незабываемый праздник! Пиратский квест был невероятным, даже взрослые участвовали. Дети получили море положительных эмоций!',
      service: 'Пират Джек, пакет Стандарт'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Детские праздники в Петропавловске - Королевство Чудес | Аниматоры и шоу-программы</title>
        <meta 
          name="description" 
          content="Организация детских праздников в Петропавловске: аниматоры, шоу-программы, квесты. Принцессы, супергерои, пираты. От 25,000 ₸. Более 500 проведенных праздников!" 
        />
        <meta 
          name="keywords" 
          content="детские праздники Петропавловск, аниматоры, день рождения ребенка, детские шоу, принцессы, супергерои" 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero секция */}
        <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="heading-1 mb-6">
                  Детские <span className="text-secondary-200">праздники</span>
                </h1>
                <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                  Создаем волшебные моменты для ваших малышей! Профессиональные аниматоры, 
                  яркие шоу-программы и незабываемые эмоции для детей от 2 до 12 лет.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="btn-secondary flex items-center gap-2">
                    <Calendar size={20} />
                    Заказать праздник
                  </button>
                  <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 flex items-center gap-2">
                    <Phone size={20} />
                    Бесплатная консультация
                  </button>
                </div>

                {/* Ключевые преимущества */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-200 mb-1">500+</div>
                    <div className="text-sm text-primary-100">Праздников</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-200 mb-1">20+</div>
                    <div className="text-sm text-primary-100">Персонажей</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-200 mb-1">5</div>
                    <div className="text-sm text-primary-100">Лет опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-200 mb-1">4.9</div>
                    <div className="text-sm text-primary-100">Рейтинг</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Детский праздник"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <Gift className="w-8 h-8 text-primary-500" />
                        <div>
                          <div className="font-semibold text-gray-900">От 25,000 ₸</div>
                          <div className="text-sm text-gray-600">Праздник под ключ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Плавающие элементы */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full animate-pulse flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Описание услуги */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="heading-2 text-gray-900 mb-6">
                Почему дети <span className="gradient-text">обожают</span> наши праздники?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Каждый детский праздник — это уникальная сказка, созданная специально для вашего ребенка. 
                Наши профессиональные аниматоры не просто развлекают детей, а создают волшебную атмосферу, 
                где каждый маленький гость чувствует себя главным героем приключения.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Профессиональные аниматоры</h3>
                <p className="text-gray-600">
                  Наши артисты имеют театральное образование и опыт работы с детьми. 
                  Каждый персонаж проработан до мелочей.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Интерактивные программы</h3>
                <p className="text-gray-600">
                  Программа адаптируется под возраст и интересы детей. 
                  Никто не останется в стороне!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Яркие воспоминания</h3>
                <p className="text-gray-600">
                  Фотосессия с любимыми персонажами и подарки на память. 
                  Эмоции, которые останутся на всю жизнь.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Наши персонажи */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-gray-900 mb-4">
                Каталог <span className="gradient-text">персонажей</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Выберите любимого героя вашего ребенка из нашего большого каталога персонажей
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {characters.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                  onClick={() => setActiveCharacter(character)}
                >
                  <div className="card overflow-hidden">
                    {character.popular && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ТОП
                        </span>
                      </div>
                    )}

                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <button className="w-full bg-white/90 text-gray-900 py-2 rounded-lg font-medium">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {character.name}
                      </h3>
                      <div className="text-sm text-gray-500 mb-2">{character.category}</div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>Возраст: {character.age}</span>
                        <span>{character.duration}</span>
                      </div>
                      <div className="text-xl font-bold text-primary-600">
                        {character.price}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Пакеты услуг */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-gray-900 mb-4">
                Пакеты <span className="gradient-text">услуг</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Выберите подходящий пакет или создадим индивидуальную программу специально для вас
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${pkg.popular ? 'transform scale-105' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        ПОПУЛЯРНЫЙ
                      </div>
                    </div>
                  )}
                  
                  <div className={`card p-8 h-full ${pkg.popular ? 'border-2 border-primary-200 shadow-xl' : ''}`}>
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-4xl font-bold text-primary-600 mb-1">{pkg.price}</div>
                      <div className="text-gray-500">{pkg.duration} • {pkg.guests}</div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pkg.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center text-sm text-primary-600 font-medium mb-6">
                      {pkg.ideal}
                    </div>

                    <button 
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        pkg.popular 
                          ? 'btn-primary' 
                          : 'btn-outline text-primary-600 border-primary-200 hover:bg-primary-500 hover:text-white'
                      }`}
                    >
                      Выбрать пакет
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Шоу-программы */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-gray-900 mb-4">
                Дополнительные <span className="gradient-text">шоу-программы</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Сделайте праздник еще ярче с нашими захватывающими шоу-программами
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {showPrograms.map((show, index) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="card overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={show.image}
                        alt={show.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary-600" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {show.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{show.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <Clock size={16} className="inline mr-1" />
                          {show.duration}
                        </div>
                        <div className="text-xl font-bold text-primary-600">
                          {show.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Процесс организации */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-gray-900 mb-4">
                Как мы организуем <span className="gradient-text">праздник</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Простой процесс от заявки до незабываемого праздника
              </p>
            </motion.div>

            <div className="relative">
              {/* Соединительная линия */}
              <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Заявка',
                    description: 'Оставьте заявку или позвоните нам. Обсудим детали и пожелания',
                    icon: Phone,
                    color: 'primary'
                  },
                  {
                    step: '02',
                    title: 'Планирование',
                    description: 'Выберем персонажей, программу и составим сценарий праздника',
                    icon: Calendar,
                    color: 'secondary'
                  },
                  {
                    step: '03',
                    title: 'Подготовка',
                    description: 'Готовим костюмы, реквизит и оборудование для вашего праздника',
                    icon: Gift,
                    color: 'accent'
                  },
                  {
                    step: '04',
                    title: 'Праздник!',
                    description: 'Проводим незабываемый праздник и создаем яркие воспоминания',
                    icon: Sparkles,
                    color: 'gradient'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative text-center"
                  >
                    <div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className={`w-8 h-8 ${
                          item.color === 'primary' ? 'bg-primary-500' :
                          item.color === 'secondary' ? 'bg-secondary-500' :
                          item.color === 'accent' ? 'bg-accent-500' :
                          'bg-gradient-to-r from-primary-500 to-secondary-500'
                        } rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {item.step}
                        </div>
                      </div>

                      <div className={`w-16 h-16 ${
                        item.color === 'primary' ? 'bg-primary-100' :
                        item.color === 'secondary' ? 'bg-secondary-100' :
                        item.color === 'accent' ? 'bg-accent-100' :
                        'bg-gradient-to-br from-primary-100 to-secondary-100'
                      } rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <item.icon className={`w-8 h-8 ${
                          item.color === 'primary' ? 'text-primary-600' :
                          item.color === 'secondary' ? 'text-secondary-600' :
                          item.color === 'accent' ? 'text-accent-600' :
                          'text-primary-600'
                        }`} />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Отзывы клиентов */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-gray-900 mb-4">
                Отзывы <span className="gradient-text">родителей</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Узнайте, что говорят о нас довольные родители и счастливые дети
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <div className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                  
                  <div className="text-sm text-primary-600 font-medium">
                    {review.service}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-gray-900 mb-4">
                Часто задаваемые <span className="gradient-text">вопросы</span>
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-gray-200 rounded-xl mb-4 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex items-center justify-between transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50"
                      >
                        <div className="px-6 py-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Связанные услуги */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="heading-2 text-gray-900 mb-4">
                Другие <span className="gradient-text">услуги</span>
              </h2>
              <p className="text-xl text-gray-600">
                Организуем праздники для всей семьи
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Свадьбы',
                  description: 'Свадьбы мечты с идеальной организацией',
                  price: 'от 150,000 ₸',
                  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  link: '/uslugi/svadby'
                },
                {
                  title: 'Корпоративы',
                  description: 'Корпоративные мероприятия любого масштаба',
                  price: 'от 50,000 ₸',
                  image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  link: '/uslugi/korporativy'
                },
                {
                  title: 'Юбилеи',
                  description: 'Торжественные юбилеи и семейные праздники',
                  price: 'от 80,000 ₸',
                  image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                  link: '/uslugi/yubilei-torzhestva'
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="card overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white">
                          <div className="text-xl font-bold mb-1">{service.title}</div>
                          <div className="text-secondary-200">{service.price}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <button className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all duration-200">
                        Подробнее
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                Подарите ребенку <span className="text-secondary-200">сказку!</span>
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Закажите незабываемый детский праздник уже сегодня. 
                Консультация бесплатно, скидка 10% при раннем бронировании!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2">
                  <Calendar size={20} />
                  Заказать праздник
                </button>
                <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Написать в WhatsApp
                </button>
              </div>

              {/* Контакты */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Позвоните нам</h3>
                  <p className="text-primary-100">8 (705) 519 5222</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Напишите в WhatsApp</h3>
                  <p className="text-primary-100">Ответим в течение 5 минут</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Приезжайте в офис</h3>
                  <p className="text-primary-100">ул. Конституции, 15</p>
                </div>
              </div>

              {/* Гарантии */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-secondary-200 mb-1">100%</div>
                    <div className="text-sm text-primary-100">Гарантия качества</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-200 mb-1">24/7</div>
                    <div className="text-sm text-primary-100">Поддержка</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-200 mb-1">-10%</div>
                    <div className="text-sm text-primary-100">Раннее бронирование</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-200 mb-1">∞</div>
                    <div className="text-sm text-primary-100">Радости детей</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Модальное окно для персонажа */}
        <AnimatePresence>
          {activeCharacter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
              onClick={() => setActiveCharacter(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={activeCharacter.image}
                    alt={activeCharacter.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setActiveCharacter(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeCharacter.name}</h3>
                  <div className="text-primary-600 font-medium mb-4">{activeCharacter.category}</div>
                  <p className="text-gray-600 mb-6">{activeCharacter.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Возраст</div>
                      <div className="font-semibold">{activeCharacter.age}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Длительность</div>
                      <div className="font-semibold">{activeCharacter.duration}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">В программу входит:</h4>
                    <div className="space-y-2">
                      {activeCharacter.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-primary-600">
                      {activeCharacter.price}
                    </div>
                    <button className="btn-primary">
                      Заказать персонажа
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChildrenPartiesPage;