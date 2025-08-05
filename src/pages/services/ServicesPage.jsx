import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  List, 
  Heart, 
  Star,
  Clock,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Calendar,
  Gift,
  Sparkles,
  Baby,
  HeartHandshake,
  Building2,
  PartyPopper,
  Cake,
  Music,
  Gamepad2,
  Camera,
  Award,
  Eye,
  ArrowRight,
  Check
} from 'lucide-react';

const ServicesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Данные услуг
  const servicesData = [
    {
      id: 1,
      title: 'Детские праздники',
      category: 'children',
      duration: '3-4 часа',
      minGuests: '10 детей',
      rating: 5,
      price: 'от 45,000 ₸',
      priceDescription: 'базовый пакет',
      description: 'Яркие и веселые детские праздники с профессиональными аниматорами, интерактивными играми и незабываемыми шоу-программами.',
      features: ['Профессиональные аниматоры', 'Интерактивные игры', 'Шоу-программы', 'Аквагрим', 'Фото и видео', 'Праздничное оформление'],
      subcategories: ['Дни рождения', 'Выпускные в детском саду', 'Школьные мероприятия', 'Семейные торжества'],
      images: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1607743386760-88ac62b89b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['дети', 'аниматоры', 'праздник', 'веселье'],
      packages: [
        { name: 'Базовый', price: '45,000 ₸', features: ['2 аниматора', '2 часа программы', 'Аквагрим', 'Игры'] },
        { name: 'Стандарт', price: '65,000 ₸', features: ['3 аниматора', '3 часа программы', 'Шоу мыльных пузырей', 'Фотограф', 'Декор'] },
        { name: 'Премиум', price: '95,000 ₸', features: ['4 аниматора', '4 часа программы', 'Кукольный театр', 'Видеосъемка', 'Торт в подарок'] }
      ]
    },
    {
      id: 2,
      title: 'Свадебные торжества',
      category: 'weddings',
      duration: '6-10 часов',
      minGuests: '30 человек',
      rating: 5,
      price: 'от 150,000 ₸',
      priceDescription: 'полный день',
      description: 'Создаем свадьбы мечты: от выездной регистрации до торжественного банкета. Каждая деталь продумана до мелочей.',
      features: ['Ведущий церемонии', 'Музыкальное сопровождение', 'Оформление зала', 'Фото и видеосъемка', 'Флористика', 'Свадебный торт'],
      subcategories: ['Выездная регистрация', 'Банкет', 'Фотосессии', 'Девичники', 'Годовщины'],
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['свадьба', 'торжество', 'любовь', 'церемония'],
      packages: [
        { name: 'Камерная', price: '150,000 ₸', features: ['Ведущий', 'Звук', 'Декор', 'Фотограф'] },
        { name: 'Классическая', price: '280,000 ₸', features: ['Полный день', 'Живая музыка', 'Видео', 'Флористика'] },
        { name: 'Роскошная', price: '450,000 ₸', features: ['VIP сервис', 'Фейерверк', 'Лимузин', 'Премиум локация'] }
      ]
    },
    {
      id: 3,
      title: 'Корпоративные мероприятия',
      category: 'corporate',
      duration: '4-8 часов',
      minGuests: '20 человек',
      rating: 5,
      price: 'от 80,000 ₸',
      priceDescription: 'за мероприятие',
      description: 'Профессиональная организация корпоративных праздников, тимбилдингов и деловых мероприятий любого масштаба.',
      features: ['Профессиональный ведущий', 'Техническое оборудование', 'Кейтеринг', 'Развлекательная программа', 'Тимбилдинг активности', 'Призы и подарки'],
      subcategories: ['Новогодние корпоративы', 'День компании', 'Тимбилдинг', 'Конференции', 'Презентации'],
      images: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['корпоратив', 'бизнес', 'команда', 'тимбилдинг'],
      packages: [
        { name: 'Базовый', price: '80,000 ₸', features: ['Ведущий', 'Звук', 'Развлечения', 'Фуршет'] },
        { name: 'Бизнес', price: '150,000 ₸', features: ['Тимбилдинг', 'Конкурсы', 'Фото', 'Банкет'] },
        { name: 'Премиум', price: '280,000 ₸', features: ['VIP программа', 'Артисты', 'Видео', 'Подарки'] }
      ]
    },
    {
      id: 4,
      title: 'Юбилеи и торжества',
      category: 'anniversaries',
      duration: '4-6 часов',
      minGuests: '25 человек',
      rating: 5,
      price: 'от 70,000 ₸',
      priceDescription: 'за празднование',
      description: 'Организуем незабываемые юбилеи и семейные торжества с учетом всех традиций и пожеланий именинника.',
      features: ['Ведущий-тамада', 'Живая музыка', 'Праздничное оформление', 'Фото и видео', 'Поздравительные номера', 'Подарки от организаторов'],
      subcategories: ['Юбилеи взрослых', 'Серебряные свадьбы', 'Золотые свадьбы', 'Семейные праздники'],
      images: [
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1481240916879-cbf444df40ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['юбилей', 'торжество', 'семья', 'традиции'],
      packages: [
        { name: 'Семейный', price: '70,000 ₸', features: ['Ведущий', 'Музыка', 'Декор', 'Фото'] },
        { name: 'Торжественный', price: '120,000 ₸', features: ['Живая музыка', 'Артисты', 'Видео', 'Подарки'] },
        { name: 'Роскошный', price: '200,000 ₸', features: ['Полный сервис', 'VIP декор', 'Шоу', 'Сюрпризы'] }
      ]
    },
    {
      id: 5,
      title: 'Праздничные программы',
      category: 'seasonal',
      duration: '2-4 часа',
      minGuests: '15 человек',
      rating: 4,
      price: 'от 35,000 ₸',
      priceDescription: 'за программу',
      description: 'Тематические праздничные программы к Новому году, 8 марта, Наурызу и другим значимым датам.',
      features: ['Тематическое оформление', 'Костюмированные персонажи', 'Интерактивные игры', 'Подарки гостям', 'Фото зона', 'Праздничное угощение'],
      subcategories: ['Новый год', '8 марта', '23 февраля', 'Наурыз', 'День Победы', 'День Независимости'],
      images: [
        'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512389098783-66b81f86e199?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['праздники', 'традиции', 'сезон', 'культура'],
      packages: [
        { name: 'Мини', price: '35,000 ₸', features: ['2 часа', 'Ведущий', 'Игры', 'Подарки'] },
        { name: 'Стандарт', price: '55,000 ₸', features: ['3 часа', 'Артисты', 'Декор', 'Фото'] },
        { name: 'Большой', price: '85,000 ₸', features: ['4 часа', 'Шоу', 'Банкет', 'Видео'] }
      ]
    },
    {
      id: 6,
      title: 'Квесты и игровые программы',
      category: 'quests',
      duration: '2-3 часа',
      minGuests: '8 человек',
      rating: 5,
      price: 'от 25,000 ₸',
      priceDescription: 'за группу',
      description: 'Увлекательные квесты и интерактивные игры для детей и взрослых. Логические задачи, головоломки и командные испытания.',
      features: ['Уникальные сценарии', 'Профессиональные актеры', 'Интерактивный реквизит', 'Командная работа', 'Призы победителям', 'Памятные подарки'],
      subcategories: ['Детские квесты', 'Взрослые квесты', 'Командные игры', 'Интеллектуальные викторины'],
      images: [
        'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['квест', 'игры', 'логика', 'команда'],
      packages: [
        { name: 'Легкий', price: '25,000 ₸', features: ['1 квест', '2 часа', 'До 10 человек', 'Призы'] },
        { name: 'Продвинутый', price: '40,000 ₸', features: ['2 квеста', '3 часа', 'До 15 человек', 'Подарки'] },
        { name: 'Экстрим', price: '65,000 ₸', features: ['3 квеста', '4 часа', 'До 20 человек', 'VIP призы'] }
      ]
    },
    {
      id: 7,
      title: 'Фото и видеосъемка',
      category: 'photo',
      duration: '2-8 часов',
      minGuests: 'любое',
      rating: 5,
      price: 'от 15,000 ₸',
      priceDescription: 'за час',
      description: 'Профессиональная фото и видеосъемка любых мероприятий. Создаем красивые воспоминания на всю жизнь.',
      features: ['Профессиональное оборудование', 'Опытные фотографы', 'Обработка материалов', 'Онлайн галерея', 'Печать фотографий', 'Монтаж видео'],
      subcategories: ['Свадебная съемка', 'Детская съемка', 'Корпоративная съемка', 'Семейные фотосессии'],
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['фото', 'видео', 'съемка', 'воспоминания'],
      packages: [
        { name: 'Фото', price: '15,000 ₸/час', features: ['1 фотограф', 'Обработка', '50+ фото', 'Онлайн галерея'] },
        { name: 'Видео', price: '25,000 ₸/час', features: ['Видеооператор', 'Монтаж', 'Цветокоррекция', 'Музыка'] },
        { name: 'Комплекс', price: '35,000 ₸/час', features: ['Фото+видео', 'Дрон съемка', 'Same day edit', 'Подарки'] }
      ]
    },
    {
      id: 8,
      title: 'Оформление и декор',
      category: 'decoration',
      duration: 'весь день',
      minGuests: 'любое',
      rating: 4,
      price: 'от 20,000 ₸',
      priceDescription: 'за проект',
      description: 'Создаем волшебную атмосферу с помощью профессионального декора. Каждая деталь продумана для вашего идеального праздника.',
      features: ['Индивидуальный дизайн', 'Цветочные композиции', 'Воздушные шары', 'Текстильное оформление', 'Световые инсталляции', 'Фотозоны'],
      subcategories: ['Свадебный декор', 'Детское оформление', 'Корпоративный стиль', 'Тематические зоны'],
      images: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['декор', 'оформление', 'дизайн', 'атмосфера'],
      packages: [
        { name: 'Базовый', price: '20,000 ₸', features: ['Цветы', 'Шары', 'Ткани', 'Свечи'] },
        { name: 'Стандарт', price: '45,000 ₸', features: ['Композиции', 'Подсветка', 'Фотозона', 'Стиль'] },
        { name: 'Люкс', price: '80,000 ₸', features: ['VIP декор', 'Инсталляции', 'Авторский дизайн', 'Эксклюзив'] }
      ]
    },
    {
      id: 9,
      title: 'Ростовые куклы',
      category: 'characters',
      duration: '1-3 часа',
      minGuests: '5 детей',
      rating: 5,
      price: 'от 12,000 ₸',
      priceDescription: 'за час',
      description: 'Яркие и веселые ростовые куклы для детского праздника. Легкие костюмы из безопасных материалов не стесняют движений.',
      features: ['Безопасные материалы', 'Легкие костюмы', 'Популярные персонажи', 'Интерактивное общение', 'Фото с героями', 'Игры и развлечения'],
      subcategories: ['Супергерои', 'Мультперсонажи', 'Принцессы', 'Животные', 'Сказочные герои'],
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['куклы', 'персонажи', 'дети', 'герои'],
      packages: [
        { name: '1 персонаж', price: '12,000 ₸/час', features: ['1 ростовая кукла', 'Интерактив', 'Фото', 'Игры'] },
        { name: '2 персонажа', price: '20,000 ₸/час', features: ['2 ростовых куклы', 'Мини-спектакль', 'Конкурсы', 'Подарки'] },
        { name: 'Шоу персонажей', price: '35,000 ₸/час', features: ['3+ персонажей', 'Полноценное шоу', 'Сценарий', 'Декорации'] }
      ]
    },
    {
      id: 10,
      title: 'Шоу "Блести-Сверкай"',
      category: 'shows',
      duration: '30-60 минут',
      minGuests: '8 детей',
      rating: 5,
      price: 'от 18,000 ₸',
      priceDescription: 'за шоу',
      description: 'Невероятное шоу с переливающейся фольгой! Море эмоций, смеха и блеска. Гости могут бросаться мягкой фольгой и создавать фигуры.',
      features: ['Много переливающейся фольги', 'Серебряная и золотая фольга', 'Творческие задания', 'Танцевальные батлы', 'Сражения фольгой', 'Яркий салют эмоций'],
      subcategories: ['Детское шоу', 'Семейные мероприятия', 'Корпоративы', 'Дни рождения'],
      images: [
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1607743386760-88ac62b89b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1481240916879-cbf444df40ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['шоу', 'фольга', 'блеск', 'интерактив'],
      packages: [
        { name: 'Мини-шоу', price: '18,000 ₸', features: ['30 минут', 'Основная программа', 'Фольга', 'Аниматор'] },
        { name: 'Полное шоу', price: '28,000 ₸', features: ['60 минут', 'Расширенная программа', 'Больше фольги', 'Призы'] },
        { name: 'Мега-шоу', price: '45,000 ₸', features: ['90 минут', 'VIP программа', 'Много фольги', 'Подарки всем'] }
      ]
    },
    {
      id: 11,
      title: 'Воздушные шары',
      category: 'balloons',
      duration: 'по договоренности',
      minGuests: 'любое',
      rating: 4,
      price: 'от 200 ₸',
      priceDescription: 'за шарик',
      description: 'Большой выбор воздушных шаров под любой стиль праздника. Обычные, гелиевые и светящиеся шары различных цветов и рисунков.',
      features: ['Большой выбор цветов', 'Различные рисунки', 'Гелиевые шары', 'Светящиеся шары', 'Фигурные шары', 'Букеты из шаров'],
      subcategories: ['Обычные шары', 'Гелиевые шары', 'Светящиеся шары', 'Фигурные шары', 'Цифры из шаров'],
      images: [
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1607743386760-88ac62b89b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['шары', 'гелий', 'декор', 'праздник'],
      packages: [
        { name: 'Набор 50 шт', price: '8,000 ₸', features: ['50 обычных шаров', 'Разные цвета', 'Лента', 'Доставка'] },
        { name: 'Гелиевый букет', price: '15,000 ₸', features: ['25 гелиевых шаров', 'Утяжелители', 'Красивые ленты', 'Композиция'] },
        { name: 'VIP композиция', price: '35,000 ₸', features: ['100+ шаров', 'Фигурные элементы', 'Светящиеся шары', 'Авторский дизайн'] }
      ]
    },
    {
      id: 12,
      title: 'Цифры и буквы из шаров',
      category: 'balloons',
      duration: 'изготовление 1 день',
      minGuests: 'любое',
      rating: 5,
      price: 'от 3,500 ₸',
      priceDescription: 'за цифру',
      description: 'Яркие и индивидуальные цифры и буквы для украшения праздника или фотосессии. Создают прекрасную атмосферу и подчеркивают стиль мероприятия.',
      features: ['Любые цифры и буквы', 'Различные цвета', 'Из обычных шаров', 'Фольгированные варианты', 'Крепление в комплекте', 'Индивидуальный дизайн'],
      subcategories: ['Цифры возраста', 'Юбилейные даты', 'Имена', 'Поздравительные надписи'],
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',  
  'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  
      ],
      coverImage: 'https://images.unsplash.com/photo-1607743386760-88ac62b89b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['цифры', 'буквы', 'шары', 'фотозона'],
      packages: [
        { name: '1 цифра', price: '3,500 ₸', features: ['Высота 1м', 'Из шаров', 'Любой цвет', 'Крепление'] },
        { name: 'Фольгированная', price: '5,500 ₸', features: ['Высота 80см', 'Фольга', 'Гелий в комплекте', 'Яркие цвета'] },
        { name: 'Комплект цифр', price: '12,000 ₸', features: ['2-3 цифры', 'Композиция', 'Подставка', 'Декор дополнительно'] }
      ]
    },
    {
      id: 13,
      title: 'Шоу мыльных пузырей',
      category: 'shows',
      duration: '30-45 минут',
      minGuests: '5 детей',
      rating: 5,
      price: 'от 15,000 ₸',
      priceDescription: 'за шоу',
      description: 'Волшебное шоу с гигантскими мыльными пузырями! Гости увидят радужных гигантов и попробуют создать их сами. Отличное дополнение к любой программе.',
      features: ['Гигантские мыльные пузыри', 'Интерактивное участие', 'Профессиональные растворы', 'Различные инструменты', 'Радужные эффекты', 'Безопасные материалы'],
      subcategories: ['Детские праздники', 'Юмористическое шоу', 'Новогоднее шоу', 'Свадебное шоу'],
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1607743386760-88ac62b89b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      featured: true,
      tags: ['пузыри', 'шоу', 'интерактив', 'волшебство'],
      packages: [
        { name: 'Базовое шоу', price: '15,000 ₸', features: ['30 минут', 'Стандартная программа', 'Реквизит', 'Аниматор'] },
        { name: 'Расширенное', price: '22,000 ₸', features: ['45 минут', 'Больше эффектов', 'Участие детей', 'Подарки'] },
        { name: 'Премиум шоу', price: '35,000 ₸', features: ['60 минут', 'Эксклюзивная программа', 'Спецэффекты', 'Фото/видео'] }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'Все услуги', count: servicesData.length, icon: Sparkles },
    { id: 'children', name: 'Детские', count: servicesData.filter(s => s.category === 'children').length, icon: Baby },
    { id: 'weddings', name: 'Свадьбы', count: servicesData.filter(s => s.category === 'weddings').length, icon: HeartHandshake },
    { id: 'corporate', name: 'Корпоративы', count: servicesData.filter(s => s.category === 'corporate').length, icon: Building2 },
    { id: 'anniversaries', name: 'Юбилеи', count: servicesData.filter(s => s.category === 'anniversaries').length, icon: PartyPopper },
    { id: 'seasonal', name: 'Праздники', count: servicesData.filter(s => s.category === 'seasonal').length, icon: Gift },
    { id: 'quests', name: 'Квесты', count: servicesData.filter(s => s.category === 'quests').length, icon: Gamepad2 },
    { id: 'photo', name: 'Фото/Видео', count: servicesData.filter(s => s.category === 'photo').length, icon: Camera },
    { id: 'decoration', name: 'Декор', count: servicesData.filter(s => s.category === 'decoration').length, icon: Cake },
    { id: 'characters', name: 'Персонажи', count: servicesData.filter(s => s.category === 'characters').length, icon: Baby },
    { id: 'shows', name: 'Шоу', count: servicesData.filter(s => s.category === 'shows').length, icon: PartyPopper },
    { id: 'balloons', name: 'Шары', count: servicesData.filter(s => s.category === 'balloons').length, icon: Gift }
  ];

  const filteredServices = activeFilter === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.category === activeFilter);

  const openServiceModal = (service, imageIndex = 0) => {
    setSelectedService(service);
    setCurrentImageIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = useCallback(() => {
    setSelectedService(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    if (selectedService) {
      setCurrentImageIndex((prev) => 
        prev === selectedService.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedService]);

  const prevImage = useCallback(() => {
    if (selectedService) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedService.images.length - 1 : prev - 1
      );
    }
  }, [selectedService]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedService) {
        if (e.key === 'Escape') closeServiceModal();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedService, nextImage, prevImage, closeServiceModal]);

  return (
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

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-block text-6xl mb-6"
            >
              🎉✨🎊
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
              Наши услуги
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
            >
              Создаем незабываемые моменты для любого случая! От детских дней рождения до роскошных свадеб - 
              мы воплотим ваши мечты в реальность!
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
                  8
                </motion.div>
                <div className="text-purple-100">Категорий услуг</div>
              </div>
              <div className="text-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl font-bold text-pink-300 mb-2"
                >
                  1000+
                </motion.div>
                <div className="text-purple-100">Праздников</div>
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
                  7+
                </motion.div>
                <div className="text-purple-100">Лет опыта</div>
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
          🎈
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
          🎂
        </motion.div>
      </section>

      {/* Фильтры и управление */}
      <section className="py-8 bg-white shadow-lg top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Фильтры категорий */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
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

      {/* Услуги сетка */}
      <section className="py-12">
        <div className="container mx-auto px-4">
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
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group cursor-pointer ${
                    viewMode === 'list' ? 'flex gap-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl' : ''
                  }`}
                  onClick={() => openServiceModal(service)}
                >
                  {viewMode === 'grid' ? (
                    // Сетка вид
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 relative"
                    >
                      {service.featured && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 left-4 z-10"
                        >
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            ⭐ ПОПУЛЯРНО
                          </span>
                        </motion.div>
                      )}
                      
                      <div className="relative h-64 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          src={service.coverImage}
                          alt={service.title}
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
                              <Calendar className="w-6 h-6 text-purple-600" />
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
                          {service.title}
                        </motion.h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {service.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            {service.minGuests}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(service.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">
                              {service.price}
                            </div>
                            <div className="text-xs text-gray-500">
                              {service.priceDescription}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Список вид
                    <>
                      <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden relative">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={service.coverImage}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-300"
                        />
                        {service.featured && (
                          <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            ХИТ
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {service.title}
                          </h3>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                        
                        <p className="text-gray-600 mb-3">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {service.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            {service.minGuests}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(service.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">
                              {service.price}
                            </div>
                            <div className="text-xs text-gray-500">
                              {service.priceDescription}
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

          {filteredServices.length === 0 && (
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
                Услуги не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте выбрать другую категорию или свяжитесь с нами для индивидуального предложения.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Модальное окно деталей услуги */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeServiceModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-7xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Галерея изображений */}
                <div className="lg:w-2/3 relative">
                  <div className="relative h-96 lg:h-[600px]">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={selectedService.images[currentImageIndex]}
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Навигация по изображениям */}
                  {selectedService.images.length > 1 && (
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
                        {selectedService.images.map((image, index) => (
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
                </div>

                {/* Информация об услуге */}
                <div className="lg:w-1/3 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 pr-4">
                      {selectedService.title}
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeServiceModal}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>

                  {selectedService.featured && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-4"
                    >
                      ⭐ Популярная услуга
                    </motion.div>
                  )}

                  <p className="text-gray-600 mb-6">
                    {selectedService.description}
                  </p>

                  {/* Основные характеристики */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-700">Продолжительность: {selectedService.duration}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-700">Количество гостей: {selectedService.minGuests}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(selectedService.rating)].map((_, i) => (
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
                      {selectedService.features.map((feature, index) => (
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

                  {/* Подкатегории */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Виды услуг:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.subcategories.map((subcategory, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-full"
                        >
                          {subcategory}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Пакеты услуг */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Пакеты услуг:</h4>
                    <div className="space-y-3">
                      {selectedService.packages.map((pkg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900">{pkg.name}</h5>
                            <span className="text-purple-600 font-bold">{pkg.price}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {pkg.features.join(' • ')}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Теги */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Теги:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.tags.map((tag, index) => (
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
                      <div className="text-sm text-gray-600 mb-1">{selectedService.priceDescription}</div>
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {selectedService.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        Итоговая стоимость рассчитывается индивидуально
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA кнопки */}
                  <div className="space-y-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                    >
                      Заказать услугу
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Почему выбирают <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">нас?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы не просто организуем мероприятия - мы создаем волшебные моменты
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🏆",
                title: "7+ лет успешной работы",
                description: "Богатый опыт организации более 1000 мероприятий различного масштаба и тематики"
              },
              {
                icon: "✨",
                title: "Индивидуальный подход",
                description: "Каждое мероприятие уникально. Мы учитываем все ваши пожелания и особенности"
              },
              {
                icon: "👥",
                title: "Команда профессионалов",
                description: "Только опытные специалисты: ведущие, аниматоры, декораторы, фотографы"
              },
              {
                icon: "💎",
                title: "Комплексный сервис",
                description: "Полный цикл услуг от идеи до реализации. Вам остается только наслаждаться праздником"
              },
              {
                icon: "💰",
                title: "Честная цена",
                description: "Прозрачное ценообразование без скрытых платежей. Различные пакеты на любой бюджет"
              },
              {
                icon: "🎯",
                title: "Гарантия качества",
                description: "Мы гарантируем высокое качество услуг и готовы нести ответственность за результат"
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

      {/* Процесс работы */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Как мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">работаем?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Простой и понятный процесс от заявки до проведения мероприятия
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Обращение",
                description: "Вы оставляете заявку или звоните нам. Мы выясняем ваши пожелания и бюджет",
                icon: "📞",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02", 
                title: "Планирование",
                description: "Составляем детальный план мероприятия с учетом всех ваших требований",
                icon: "📋",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Подготовка",
                description: "Готовим декор, подбираем артистов, бронируем площадку и оборудование",
                icon: "🎨",
                color: "from-orange-500 to-red-500"
              },
              {
                step: "04",
                title: "Проведение",
                description: "В день мероприятия наша команда воплощает все в жизнь. Вы просто наслаждаетесь!",
                icon: "🎉",
                color: "from-green-500 to-teal-500"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden"
                >
                  {/* Фоновый градиент */}
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${step.color}`}></div>
                  
                  {/* Номер шага */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-xl mb-4`}
                  >
                    {step.step}
                  </motion.div>

                  {/* Иконка */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className="text-4xl mb-4"
                  >
                    {step.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </motion.div>

                {/* Соединительная линия */}
                {index < 3 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 z-10"
                  />
                )}
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

        <div className="container mx-auto px-4 text-center relative z-10">
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
              🎈
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Готовы создать <span className="text-yellow-300">незабываемый праздник?</span>
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Оставьте заявку прямо сейчас и получите бесплатную консультацию и скидку 10% на первое мероприятие!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Получить скидку 10%
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
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
                <h3 className="font-semibold mb-2">Позвоните нам</h3>
                <p className="text-purple-100">+7 (7152) 123-456</p>
                <p className="text-sm text-purple-200">Ежедневно 9:00-22:00</p>
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
                <p className="text-purple-100">Напишите нам</p>
                <p className="text-sm text-purple-200">Ответим за 5 минут</p>
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
                  <MapPin className="w-8 h-8" />
                </motion.div>
                <h3 className="font-semibold mb-2">Наш офис</h3>
                <p className="text-purple-100">ул. Конституции, 15</p>
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
              <p className="text-purple-200 text-sm mb-4">
                🎁 При заказе любой услуги - дизайн-проект мероприятия в подарок!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-purple-200">
                <span>✓ Договор и гарантии</span>
                <span>✓ Без предоплаты</span>
                <span>✓ Работаем в выходные</span>
                <span>✓ Выезд по области</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Декоративные элементы */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 text-6xl"
        >
          🎊
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 10, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 text-6xl"
        >
          🎭
        </motion.div>
        <motion.div
          animate={{
            x: [0, 20, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-20 text-4xl"
        >
          ✨
        </motion.div>
      </section>

      {/* FAQ секция */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Часто задаваемые <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">вопросы</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ответы на самые популярные вопросы о наших услугах
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                question: "За сколько времени нужно заказывать мероприятие?",
                answer: "Рекомендуем обращаться за 2-4 недели до события. Но мы можем организовать праздник и за несколько дней - все зависит от сложности мероприятия и доступности артистов."
              },
              {
                question: "Работаете ли вы в выходные и праздничные дни?",
                answer: "Да, мы работаем 7 дней в неделю, включая праздничные дни. Большинство мероприятий как раз проходят в выходные, поэтому мы всегда готовы к работе."
              },
              {
                question: "Можно ли изменить программу в день мероприятия?",
                answer: "Небольшие корректировки возможны, но кардинальные изменения могут повлиять на качество. Лучше обсудить все детали заранее на этапе планирования."
              },
              {
                question: "Предоставляете ли вы оборудование и декор?",
                answer: "Да, у нас есть все необходимое оборудование: звук, свет, микрофоны, декоративные элементы. Можем также арендовать специальное оборудование под ваши задачи."
              },
              {
                question: "Как происходит оплата услуг?",
                answer: "Обычно 30% предоплата при подписании договора, остальное - в день мероприятия. Принимаем наличные, переводы на карту, безналичный расчет."
              },
              {
                question: "Выезжаете ли вы за пределы Петропавловска?",
                answer: "Да, мы работаем по всей Северо-Казахстанской области. Стоимость выезда рассчитывается индивидуально в зависимости от расстояния."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-3">
                    <span className="text-purple-500">❓</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-8">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">Не нашли ответ на свой вопрос?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
            >
              Задать вопрос специалисту
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;