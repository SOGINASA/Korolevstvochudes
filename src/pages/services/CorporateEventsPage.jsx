import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  Play,
  Award,
  Briefcase,
  Target,
  ArrowRight,
  Phone,
  MessageCircle,
  MapPin,
  Trophy,
  Camera,
  Music,
  Building2,
  ChevronDown,
  ChevronUp,
  Download,
  TrendingUp,
  Lightbulb,
  Zap,
  Globe,
  Shield,
  Heart,
  Eye,
  X
} from 'lucide-react';

const CorporateEventsPage = () => {
  const [activePackage, setActivePackage] = useState(1);
  const [activeEventType, setActiveEventType] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  // Типы корпоративных мероприятий
  const eventTypes = [
    {
      id: 1,
      name: 'Новогодние корпоративы',
      category: 'Праздничные мероприятия',
      capacity: '30-500 человек',
      duration: '4-6 часов',
      price: 'от 2,500 ₸/чел',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Незабываемые новогодние корпоративы с банкетом, развлекательной программой и призами',
      includes: ['Банкетное обслуживание', 'Шоу-программа', 'Ведущий и музыка', 'Новогодние подарки', 'Фотозона'],
      popular: true
    },
    {
      id: 2,
      name: 'День рождения компании',
      category: 'Юбилейные мероприятия',
      capacity: '50-1000 человек',
      duration: '3-5 часов',
      price: 'от 3,000 ₸/чел',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Торжественное празднование юбилея компании с презентацией достижений и награждением',
      includes: ['Торжественная часть', 'Видеопрезентация', 'Награждение сотрудников', 'Банкет', 'Концертная программа']
    },
    {
      id: 3,
      name: 'Тимбилдинг',
      category: 'Командообразование',
      capacity: '15-200 человек',
      duration: '4-8 часов',
      price: 'от 8,000 ₸/чел',
      image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Активности для укрепления команды: квесты, спортивные игры, творческие задания',
      includes: ['Командные игры', 'Квесты на природе', 'Спортивные активности', 'Мастер-классы', 'Общий обед']
    },
    {
      id: 4,
      name: 'Конференции и семинары',
      category: 'Деловые мероприятия',
      capacity: '20-300 человек',
      duration: '2-8 часов',
      price: 'от 1,500 ₸/чел',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Профессиональная организация деловых мероприятий с техническим обеспечением',
      includes: ['Аренда площадки', 'Техническое оборудование', 'Кофе-брейки', 'Материалы участникам', 'Регистрация гостей']
    },
    {
      id: 5,
      name: 'Награждения и презентации',
      category: 'Торжественные церемонии',
      capacity: '50-500 человек',
      duration: '2-4 часа',
      price: 'от 2,000 ₸/чел',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Торжественные церемонии награждения лучших сотрудников и презентации достижений',
      includes: ['Сценарий церемонии', 'Наградная атрибутика', 'Фото и видеосъемка', 'Музыкальное сопровождение', 'Фуршет']
    },
    {
      id: 6,
      name: 'Корпоративные вечеринки',
      category: 'Развлекательные мероприятия',
      capacity: '30-300 человек',
      duration: '4-6 часов',
      price: 'от 3,500 ₸/чел',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Неформальные корпоративные вечеринки для укрепления дружеских отношений в коллективе',
      includes: ['Тематическое оформление', 'DJ и танцпол', 'Барная программа', 'Интерактивы', 'Призы и подарки']
    }
  ];

  // Пакеты услуг
  const packages = [
    {
      id: 1,
      name: 'Базовый',
      price: 'от 75,000 ₸',
      capacity: 'до 30 человек',
      duration: '3 часа',
      popular: false,
      includes: [
        'Аренда площадки (до 3 часов)',
        'Базовое техническое оборудование',
        'Кофе-брейк (чай, кофе, печенье)',
        'Ведущий мероприятия',
        'Музыкальное сопровождение',
        'Простое оформление зала'
      ],
      ideal: 'Идеально для небольших встреч и презентаций',
      features: ['Проектор и экран', 'Микрофоны', 'Фоновая музыка']
    },
    {
      id: 2,
      name: 'Стандарт',
      price: 'от 150,000 ₸',
      capacity: 'до 100 человек',
      duration: '5 часов',
      popular: true,
      includes: [
        'Аренда площадки (до 5 часов)',
        'Полное техническое оборудование',
        'Банкетное обслуживание',
        'Профессиональный ведущий',
        'Live музыка или DJ',
        'Тематическое оформление',
        'Фотосъемка мероприятия',
        'Транспорт для VIP-гостей'
      ],
      ideal: 'Самый популярный выбор для корпоративов',
      features: ['Световое оборудование', 'Сценическое оформление', 'Профессиональная съемка']
    },
    {
      id: 3,
      name: 'Премиум',
      price: 'от 300,000 ₸',
      capacity: 'до 300 человек',
      duration: '8 часов',
      popular: false,
      includes: [
        'Аренда премиум площадки',
        'VIP техническое оснащение',
        'Изысканное банкетное меню',
        'Звездный ведущий',
        'Концертная программа',
        'Эксклюзивное оформление',
        'Профессиональная фото/видеосъемка',
        'Персональные подарки гостям',
        'Транспортное обслуживание',
        'Координатор мероприятия'
      ],
      ideal: 'Для особенных событий и крупных компаний',
      features: ['Эксклюзивная площадка', 'Звездные артисты', 'Персональный сервис']
    }
  ];

  // Дополнительные услуги
  const additionalServices = [
    {
      id: 1,
      name: 'Кейтеринг',
      price: 'от 1,500 ₸/чел',
      description: 'Банкетное обслуживание любого уровня',
      icon: '🍽️',
      features: ['Разнообразное меню', 'VIP обслуживание', 'Диетические блюда']
    },
    {
      id: 2,
      name: 'Техническое оборудование',
      price: 'от 25,000 ₸',
      description: 'Звук, свет, видео оборудование',
      icon: '🎤',
      features: ['Профессиональный звук', 'Световое шоу', 'LED экраны']
    },
    {
      id: 3,
      name: 'Фото/Видеосъемка',
      price: 'от 35,000 ₸',
      description: 'Профессиональная съемка мероприятия',
      icon: '📸',
      features: ['Репортажная съемка', 'Постобработка', 'Быстрая доставка']
    },
    {
      id: 4,
      name: 'Транспорт',
      price: 'от 15,000 ₸',
      description: 'Трансфер для участников',
      icon: '🚌',
      features: ['Комфортабельные автобусы', 'VIP автомобили', 'Опытные водители']
    }
  ];

  // FAQ
  const faqData = [
    {
      question: 'Какие площадки вы можете предложить для корпоративного мероприятия?',
      answer: 'У нас есть партнерские отношения с лучшими площадками города: отели, рестораны, конференц-залы, загородные комплексы. Подберем идеальное место под ваш бюджет и количество гостей.'
    },
    {
      question: 'За сколько времени нужно заказывать корпоративное мероприятие?',
      answer: 'Рекомендуем бронировать за 2-4 недели до события. Для новогодних корпоративов и крупных мероприятий лучше заказывать за 1-2 месяца.'
    },
    {
      question: 'Можете ли вы организовать мероприятие с учетом корпоративного стиля компании?',
      answer: 'Конечно! Мы создаем индивидуальный дизайн с использованием ваших корпоративных цветов, логотипов и фирменного стиля. Все материалы согласовываем заранее.'
    },
    {
      question: 'Предоставляете ли вы отчетность по мероприятию?',
      answer: 'Да, после мероприятия вы получите полный отчет с фотографиями, видео, чеками и актами выполненных работ для вашей бухгалтерии.'
    },
    {
      question: 'Работаете ли вы с юридическими лицами?',
      answer: 'Да, мы работаем как с юридическими, так и с физическими лицами. Предоставляем все необходимые документы, работаем по договору, принимаем безналичную оплату.'
    }
  ];

  // Отзывы
  const reviews = [
    {
      id: 1,
      company: 'ТОО "ТехноПрогресс"',
      author: 'Анна Сергеевна, HR-директор',
      rating: 5,
      date: '2024-01-15',
      text: 'Великолепно организованный новогодний корпоратив! Сотрудники в восторге, все прошло на высшем уровне. Особенно понравилась шоу-программа и банкет.',
      service: 'Новогодний корпоратив, 120 человек',
      employees: '120 сотрудников'
    },
    {
      id: 2,
      company: 'АО "СтройИнвест"',
      author: 'Дмитрий Петров, Генеральный директор',
      rating: 5,
      date: '2024-03-22',
      text: 'Провели юбилей компании на самом высоком уровне. Гости были впечатлены организацией, все детали продуманы до мелочей. Рекомендуем!',
      service: '10-летие компании, пакет Премиум',
      employees: '200 сотрудников'
    },
    {
      id: 3,
      company: 'ТОО "Финанс Групп"',
      author: 'Мария Козлова, Офис-менеджер',
      rating: 5,
      date: '2024-06-10',
      text: 'Отличный тимбилдинг на природе! Команда сплотилась, все получили массу положительных эмоций. Организаторы - настоящие профессионалы!',
      service: 'Тимбилдинг, 45 человек',
      employees: '45 сотрудников'
    }
  ];

  const closeLightbox = () => {
    setActiveEventType(null);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero секция */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Корпоративные <span className="text-purple-200">мероприятия</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Укрепляем команды и создаем корпоративную культуру через незабываемые мероприятия. 
                Профессиональная организация от новогодних корпоративов до деловых конференций.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <Calendar size={20} />
                  Заказать мероприятие
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2">
                  <Download size={20} />
                  Скачать презентацию
                </button>
              </div>

              {/* Ключевые показатели */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="text-3xl font-bold text-purple-200 mb-1">200+</div>
                  <div className="text-sm text-blue-100">Мероприятий</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-3xl font-bold text-purple-200 mb-1">50+</div>
                  <div className="text-sm text-blue-100">Компаний</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="text-3xl font-bold text-purple-200 mb-1">5000+</div>
                  <div className="text-sm text-blue-100">Участников</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-3xl font-bold text-purple-200 mb-1">98%</div>
                  <div className="text-sm text-blue-100">Довольных клиентов</div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Корпоративное мероприятие"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <motion.div 
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-8 h-8 text-blue-500" />
                      <div>
                        <div className="font-semibold text-gray-900">От 1,500 ₸/чел</div>
                        <div className="text-sm text-gray-600">Под ключ</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Плавающие элементы */}
              <motion.div 
                className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Trophy className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Описание услуги */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Почему компании <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">выбирают нас</span>?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Корпоративные мероприятия — это инвестиция в команду и имидж компании. 
              Мы понимаем бизнес-задачи и создаем события, которые не только развлекают, 
              но и укрепляют корпоративную культуру, мотивируют сотрудников и впечатляют партнеров.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Рост эффективности',
                description: 'Наши мероприятия повышают мотивацию сотрудников на 40% и укрепляют командный дух.',
                color: 'blue'
              },
              {
                icon: Shield,
                title: 'Надежность',
                description: 'Работаем с договором, предоставляем отчетность, имеем все необходимые лицензии.',
                color: 'purple'
              },
              {
                icon: Lightbulb,
                title: 'Креативность',
                description: 'Уникальные концепции и нестандартные решения для каждого мероприятия.',
                color: 'green'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Типы мероприятий */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Типы <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">мероприятий</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Организуем любые корпоративные события — от деловых встреч до масштабных празднований
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.id}
                className="group cursor-pointer"
                onClick={() => setActiveEventType(event)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  {event.popular && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        ПОПУЛЯРНОЕ
                      </span>
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Оверлей с иконками */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                          <Eye className="w-6 h-6 text-gray-700" />
                        </div>
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-200">
                          <Heart className="w-6 h-6 text-red-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-sm text-purple-200 mb-1">{event.category}</div>
                      <div className="font-bold text-lg">{event.name}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {event.capacity}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {event.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-purple-600">
                        {event.price}
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                        Подробнее →
                      </button>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Пакеты <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">услуг</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Готовые решения для мероприятий любого масштаба или индивидуальное предложение
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                className={`relative ${pkg.popular ? 'transform scale-105' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      РЕКОМЕНДУЕМ
                    </div>
                  </div>
                )}
                
                <div className={`bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-xl ${pkg.popular ? 'border-2 border-purple-200' : ''}`}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-1">{pkg.price}</div>
                    <div className="text-gray-500">{pkg.capacity} • {pkg.duration}</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.includes.map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="text-sm font-medium text-gray-900 mb-2">Особенности:</div>
                    <div className="space-y-1">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <Zap className="w-3 h-3 text-purple-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center text-sm text-purple-600 font-medium mb-6">
                    {pkg.ideal}
                  </div>

                  <button 
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      pkg.popular 
                        ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg' 
                        : 'border border-purple-200 text-purple-600 hover:bg-purple-500 hover:text-white'
                    }`}
                  >
                    Выбрать пакет
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Дополнительная информация о пакетах */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Нужно что-то особенное?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Создадим индивидуальное предложение с учетом всех ваших пожеланий и особенностей компании. 
                Бесплатная консультация и расчет стоимости.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  <Phone size={20} />
                  Получить консультацию
                </button>
                <button className="border border-purple-200 text-purple-600 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  <Download size={20} />
                  Скачать прайс-лист
                </button>
              </div>
            </div>
          </motion.div>

          {/* Преимущества для бизнеса */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Работаем с НДС', desc: 'Полный пакет документов для бухгалтерии', color: 'green' },
              { icon: Users, title: 'Договор', desc: 'Официальное сотрудничество с гарантиями', color: 'blue' },
              { icon: Globe, title: 'Любые масштабы', desc: 'От 15 до 1000+ участников', color: 'purple' },
              { icon: TrendingUp, title: 'Рост эффективности', desc: 'Повышение мотивации сотрудников', color: 'orange' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Дополнительные услуги */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Дополнительные <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">услуги</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Расширьте возможности вашего мероприятия дополнительными опциями
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div 
                key={service.id} 
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-lg font-bold text-purple-600 mb-4">{service.price}</div>
                
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Отзывы <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">клиентов</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Что говорят о нас компании, которые доверили нам свои мероприятия
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div 
                key={review.id} 
                className="bg-gray-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 italic group-hover:text-gray-900 transition-colors">
                  "{review.text}"
                </p>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {review.company}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{review.author}</div>
                  <div className="text-xs text-purple-600 font-medium">{review.service}</div>
                  <div className="text-xs text-gray-500">{review.employees}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">вопросы</span>
            </h2>
            <p className="text-xl text-gray-600">
              Ответы на популярные вопросы о корпоративных мероприятиях
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors group"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-gray-900 pr-4 group-hover:text-purple-600 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы организовать незабываемое мероприятие?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Свяжитесь с нами сегодня для бесплатной консультации и расчета стоимости. 
              Наши эксперты помогут создать идеальное мероприятие для вашей компании.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button 
                className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                8 (705) 519 5222
              </motion.button>
              <motion.button 
                className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
                Написать в WhatsApp
              </motion.button>
            </div>

            <div className="flex items-center justify-center gap-2 text-blue-200">
              <MapPin size={16} />
              <span className="text-sm">г. Петропавловск, ул. Магжана Жумабаева 107</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal для деталей мероприятия */}
      <AnimatePresence>
        {activeEventType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={activeEventType.image}
                  alt={activeEventType.name}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="text-sm text-purple-600 font-medium mb-2">{activeEventType.category}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{activeEventType.name}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">{activeEventType.capacity}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">{activeEventType.duration}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{activeEventType.price}</div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{activeEventType.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Что включено:</h4>
                  <div className="space-y-2">
                    {activeEventType.includes.map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <motion.button 
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Заказать мероприятие
                  </motion.button>
                  <motion.button 
                    className="flex-1 border border-purple-200 text-purple-600 hover:bg-purple-50 py-3 rounded-xl font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Получить предложение
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorporateEventsPage;