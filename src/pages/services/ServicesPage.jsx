import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RapuntselImg from '../images/rapuntsel.jpeg';
import ZajchikImg from '../images/zajchik-min.jpg';
import Fiksiki from '../images/fiksiki.jpeg';
import Luntik from '../images/luntik.jpeg';
import Mikkiiminni from '../images/mikki-i-minni.jpeg';
import minony from '../images/minony.jpeg';
import lala from '../images/lalalupsi-min.jpg';
import shhenyachki from '../images/shhenyachijj-patrul.jpg';
import sofia from '../images/sofiya-prekrasnaya.jpeg';
import { 
  ChevronLeft as CalendarChevronLeft,
  ChevronRight as CalendarChevronRight,
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
  Check,
  Trophy,
  Gem,
  Wallet,
  Target,
  ClipboardList,
  Palette
} from 'lucide-react';

const ServicesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedService, setSelectedService] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedServiceForCalendar, setSelectedServiceForCalendar] = useState(null);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

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
    },
  {
  id: 14,
    title: 'Принцесса Lalaloopsy',
    category: 'animators',
    duration: '60-90 минут',
    minGuests: '4 детей',
    rating: 5,
    price: 'от 18,000 ₸',
    priceDescription: 'за программу',
    description: 'Окунитесь в красочный и необычный мир кукол Lalaloopsy! Самая красивая куколка Принцесса приготовила свою лучшую тиару для именинницы. Волшебная программа с проверкой настроения, дружным весельем и пуговичным поздравлением.',
    features: ['Интерактивная игра с тиарой', 'Пуговичные поздравления', 'Красочные костюмы', 'Проверка настроения', 'Дружное веселье', 'Подарки от принцессы'],
    subcategories: ['Детские праздники', 'День рождения', 'Тематические вечеринки', 'Принцессы'],
    images: [lala],
    coverImage: lala,
    featured: true,
    tags: ['lalaloopsy', 'принцесса', 'куклы', 'тиара', 'интерактив'],
    packages: [
      { name: 'Базовая программа', price: '18,000 ₸', features: ['60 минут', 'Игры с тиарой', 'Поздравления', 'Реквизит'] },
      { name: 'Расширенная', price: '25,000 ₸', features: ['75 минут', 'Дополнительные игры', 'Подарки детям', 'Фотосессия'] },
      { name: 'Премиум', price: '35,000 ₸', features: ['90 минут', 'Эксклюзивная программа', 'Спецподарки', 'Видеосъемка'] }
    ],
  },
  {
    id: 15,
    title: 'Лунтик',
    category: 'animators',
    duration: '60-75 минут',
    minGuests: '3 детей',
    rating: 5,
    price: 'от 16,000 ₸',
    priceDescription: 'за программу',
    description: 'Любознательный и добрый Лунтик – один из любимых героев детей! Устройте своему малышу настоящее торжество с этим необычайно милым персонажем, который подарит незабываемые эмоции.',
    features: ['Добрый персонаж', 'Познавательные игры', 'Песни и танцы', 'Интерактивное общение', 'Воспитательные моменты', 'Подарки от Лунтика'],
    subcategories: ['Детские праздники', 'День рождения', 'Развивающие программы', 'Мультперсонажи'],
    images: [Luntik],
    coverImage: Luntik,
    featured: false,
    tags: ['лунтик', 'добрый', 'познавательно', 'развитие'],
    packages: [
      { name: 'Стандартная', price: '16,000 ₸', features: ['60 минут', 'Игры с Лунтиком', 'Песни', 'Реквизит'] },
      { name: 'Познавательная', price: '22,000 ₸', features: ['75 минут', 'Обучающие игры', 'Подарки', 'Интерактив'] },
      { name: 'Праздничная', price: '30,000 ₸', features: ['90 минут', 'Полная программа', 'Спецподарки', 'Фото/видео'] }
    ]
  },
  {
    id: 16,
    title: 'Фиксики (Симка и Нолик)',
    category: 'animators',
    duration: '60-90 минут',
    minGuests: '5 детей',
    rating: 5,
    price: 'от 20,000 ₸',
    priceDescription: 'за программу',
    description: 'Подарите ребёнку незабываемый день рождения с Симкой или Ноликом! Фиксики — маленькие человечки, живущие в технике, устроят познавательно-игровое шоу с веселым тематическим реквизитом.',
    features: ['Познавательное шоу', 'Тематический реквизит', 'Техническая тематика', 'Обучающие игры', 'Интерактивные эксперименты', 'Подарки-инструменты'],
    subcategories: ['Детские праздники', 'Познавательные программы', 'Мультперсонажи', 'Обучающие шоу'],
    images: [Fiksiki],
    coverImage: Fiksiki,
    featured: true,
    tags: ['фиксики', 'симка', 'нолик', 'техника', 'познавательно'],
    packages: [
      { name: 'Базовое шоу', price: '20,000 ₸', features: ['60 минут', 'Игры с техникой', 'Эксперименты', 'Реквизит'] },
      { name: 'Познавательное', price: '28,000 ₸', features: ['75 минут', 'Больше экспериментов', 'Подарки', 'Фотосессия'] },
      { name: 'Премиум шоу', price: '38,000 ₸', features: ['90 минут', 'Эксклюзивная программа', 'Спецреквизит', 'Видео'] }
    ]
  },
  {
    id: 17,
    title: 'Щенячий патруль',
    category: 'animators',
    duration: '75-90 минут',
    minGuests: '6 детей',
    rating: 5,
    price: 'от 22,000 ₸',
    priceDescription: 'за программу',
    description: 'Отважная команда «Щенячий патруль» — смелые щенки, которым любое дело по плечу! Маршал или Гонщик набирают новую команду. Каждый щенок подготовил задание для новобранцев.',
    features: ['Командные игры', 'Задания от щенков', 'Спасательные миссии', 'Смелость и смекалка', 'Тематические костюмы', 'Значки патруля'],
    subcategories: ['Детские праздники', 'Командные игры', 'Мультперсонажи', 'Приключения'],
    images: [shhenyachki],
    coverImage: shhenyachki,
    featured: true,
    tags: ['щенячий патруль', 'маршал', 'гонщик', 'команда', 'приключения'],
    packages: [
      { name: 'Базовый патруль', price: '22,000 ₸', features: ['75 минут', 'Командные игры', 'Задания', 'Значки'] },
      { name: 'Спасательная миссия', price: '30,000 ₸', features: ['90 минут', 'Больше заданий', 'Подарки', 'Фото'] },
      { name: 'Премиум патруль', price: '40,000 ₸', features: ['120 минут', 'Полная программа', 'Спецподарки', 'Видео'] }
    ]
  },
  {
    id: 18,
    title: 'Миньоны',
    category: 'animators',
    duration: '60-75 минут',
    minGuests: '4 детей',
    rating: 5,
    price: 'от 19,000 ₸',
    priceDescription: 'за программу',
    description: 'Миньоны – милые и смешные герои популярного мультфильма «Гадкий Я». Они полюбились всем за веселый язык и комичные ситуации. Когда дело касается вечеринки – они знают в них толк!',
    features: ['Веселый миньон-язык', 'Комичные ситуации', 'Танцы миньонов', 'Смешные игры', 'Желтые костюмы', 'Подарки-бананы'],
    subcategories: ['Детские праздники', 'Юмористическое шоу', 'Мультперсонажи', 'Веселые программы'],
    images: [minony],
    coverImage: minony,
    featured: false,
    tags: ['миньоны', 'веселье', 'юмор', 'танцы', 'смех'],
    packages: [
      { name: 'Веселая программа', price: '19,000 ₸', features: ['60 минут', 'Игры миньонов', 'Танцы', 'Реквизит'] },
      { name: 'Банановая вечеринка', price: '26,000 ₸', features: ['75 минут', 'Больше веселья', 'Подарки', 'Фото'] },
      { name: 'Премиум миньоны', price: '35,000 ₸', features: ['90 минут', 'Полная программа', 'Спецэффекты', 'Видео'] }
    ]
  },
  {
    id: 19,
    title: 'Принцесса София',
    category: 'animators',
    duration: '60-90 минут',
    minGuests: '4 детей',
    rating: 5,
    price: 'от 20,000 ₸',
    priceDescription: 'за программу',
    description: 'Аниматор София приглашает всех в королевскую академию! Она недавно начала посещать дворцовые уроки и знает, как непросто на первых занятиях. Добрый и отзывчивый характер поможет во всем.',
    features: ['Королевская академия', 'Дворцовые уроки', 'Добрый характер', 'Помощь и поддержка', 'Принцесские игры', 'Короны и подарки'],
    subcategories: ['Детские праздники', 'Принцессы', 'Обучающие программы', 'Королевские игры'],
    images: [sofia],
    coverImage: sofia,
    featured: true,
    tags: ['софия', 'принцесса', 'академия', 'королевская', 'обучение'],
    packages: [
      { name: 'Урок принцессы', price: '20,000 ₸', features: ['60 минут', 'Дворцовые игры', 'Уроки этикета', 'Корона'] },
      { name: 'Королевская академия', price: '28,000 ₸', features: ['75 минут', 'Больше уроков', 'Подарки', 'Фото'] },
      { name: 'Премиум принцесса', price: '38,000 ₸', features: ['90 минут', 'Полная программа', 'Спецподарки', 'Видео'] }
    ]
  },
  {
    id: 20,
    title: 'Принцесса Рапунцель',
    category: 'animators',
    duration: '60-90 минут',
    minGuests: '4 детей',
    rating: 5,
    price: 'от 21,000 ₸',
    priceDescription: 'за программу',
    description: 'Принцесса Рапунцель — едва ли не самая желанная гостья на детском празднике! Она обладает веселым нравом, обожает приключения, и сами приключения следуют за ней по пятам.',
    features: ['Длинные волосы', 'Веселый нрав', 'Приключения', 'Интерактивные игры', 'Принцесские танцы', 'Волшебные подарки'],
    subcategories: ['Детские праздники', 'Принцессы', 'Приключенческие программы', 'Сказочные персонажи'],
    images: [RapuntselImg],
    coverImage: RapuntselImg,
    featured: true,
    tags: ['рапунцель', 'принцесса', 'приключения', 'волосы', 'сказка'],
    packages: [
      { name: 'Сказочная программа', price: '21,000 ₸', features: ['60 минут', 'Приключения', 'Игры', 'Подарки'] },
      { name: 'Волшебное приключение', price: '29,000 ₸', features: ['75 минут', 'Больше игр', 'Фотосессия', 'Сувениры'] },
      { name: 'Премиум Рапунцель', price: '39,000 ₸', features: ['90 минут', 'Полная программа', 'Спецэффекты', 'Видео'] }
    ]
  },
  {
    id: 21,
    title: 'Микки и Минни Маус',
    category: 'animators',
    duration: '75-90 минут',
    minGuests: '5 детей',
    rating: 5,
    price: 'от 25,000 ₸',
    priceDescription: 'за программу',
    description: 'К вам в гости спешат аниматоры Микки Маус и его верная подружка Минни! Шутки, песни, танцы для маленьких участников чередуются с занимательными играми и конкурсами.',
    features: ['Дуэт аниматоров', 'Шутки и песни', 'Танцы', 'Занимательные игры', 'Конкурсы', 'Подарки от Диснея'],
    subcategories: ['Детские праздники', 'Дисней персонажи', 'Парные программы', 'Классические герои'],
    images: [Mikkiiminni],
    coverImage: Mikkiiminni,
    featured: true,
    tags: ['микки маус', 'минни', 'дисней', 'классика', 'дуэт'],
    packages: [
      { name: 'Классическая программа', price: '25,000 ₸', features: ['75 минут', 'Два аниматора', 'Игры', 'Подарки'] },
      { name: 'Расширенная', price: '35,000 ₸', features: ['90 минут', 'Больше игр', 'Конкурсы', 'Фото'] },
      { name: 'Премиум Дисней', price: '45,000 ₸', features: ['120 минут', 'Полная программа', 'Спецподарки', 'Видео'] }
    ]
  },
  {
    id: 22,
    title: 'Зайчик',
    category: 'animators',
    duration: '45-60 минут',
    minGuests: '3 детей',
    rating: 5,
    price: 'от 14,000 ₸',
    priceDescription: 'за программу',
    description: 'Зайчик мил и прекрасен. Он искренен, честен и добр. Такой аниматор запомнится ребенку своим внешним видом, будет веселить малыша, наполнять энергией счастья, утешать и радовать.',
    features: ['Милый персонаж', 'Искренность и доброта', 'Энергия счастья', 'Утешение и радость', 'Мягкие игры', 'Подарки-морковки'],
    subcategories: ['Детские праздники', 'Малыши', 'Добрые персонажи', 'Мягкие программы'],
    images: [ZajchikImg],
    coverImage: ZajchikImg,
    featured: false,
    tags: ['зайчик', 'добрый', 'милый', 'малыши', 'счастье'],
    packages: [
      { name: 'Мягкая программа', price: '14,000 ₸', features: ['45 минут', 'Добрые игры', 'Утешение', 'Подарки'] },
      { name: 'Радостная', price: '18,000 ₸', features: ['60 минут', 'Больше веселья', 'Морковки', 'Фото'] },
      { name: 'Счастливая', price: '25,000 ₸', features: ['75 минут', 'Полная программа', 'Спецподарки', 'Видео'] }
    ]
  }
  ];

  const bookingData = {
  14: { // ID услуги "Принцесса Lalaloopsy"
    bookedDates: ['2024-08-12', '2024-08-18', '2024-08-24', '2024-09-01', '2024-09-08'],
    availableSlots: {
      '2024-08-12': ['15:00-17:00'],
      '2024-08-18': ['14:00-16:00'],
      '2024-08-24': ['16:00-18:00'],
      '2024-09-01': ['13:00-15:00'],
      '2024-09-08': ['15:00-17:00']
    }
  },
  15: { // ID услуги "Лунтик"
    bookedDates: ['2024-08-14', '2024-08-21', '2024-08-28', '2024-09-04'],
    availableSlots: {
      '2024-08-14': ['14:00-16:00'],
      '2024-08-21': ['15:00-17:00'],
      '2024-08-28': ['16:00-18:00'],
      '2024-09-04': ['14:30-16:30']
    }
  }
};

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
    { id: 'balloons', name: 'Шары', count: servicesData.filter(s => s.category === 'balloons').length, icon: Gift },
    { id: 'animators', name: 'Аниматоры', count: servicesData.filter(s => s.category === 'animators').length, icon: Sparkles }
  ];

  const [selectedDate, setSelectedDate] = useState('');

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

  const openCalendar = (service, e) => {
  e.stopPropagation();
  setSelectedServiceForCalendar(service);
  setCurrentCalendarDate(new Date());
  setShowCalendar(true);
  document.body.style.overflow = 'hidden';
};

const closeCalendar = useCallback(() => {
  setShowCalendar(false);
  setSelectedServiceForCalendar(null);
  document.body.style.overflow = 'auto';
}, []);

const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const isDateBooked = (date) => {
  if (!selectedServiceForCalendar) return false;
  const dateStr = formatDate(date);
  const serviceBookings = bookingData[selectedServiceForCalendar.id];
  return serviceBookings?.bookedDates?.includes(dateStr) || false;
};

const getTimeSlots = (date) => {
  if (!selectedServiceForCalendar) return [];
  const dateStr = formatDate(date);
  const serviceBookings = bookingData[selectedServiceForCalendar.id];
  return serviceBookings?.availableSlots?.[dateStr] || [];
};

const generateCalendarDays = () => {
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  
  return days;
};

const navigateCalendar = (direction) => {
  const newDate = new Date(currentCalendarDate);
  newDate.setMonth(newDate.getMonth() + direction);
  setCurrentCalendarDate(newDate);
};

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

useEffect(() => {
  const handleKeyDown = (e) => {
    if (showCalendar && e.key === 'Escape') {
      closeCalendar();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [showCalendar, closeCalendar]);

const [bookingForm, setBookingForm] = useState({
  selectedDate: '',
  selectedTime: '',
  selectedPackage: '',
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  guestCount: '',
  specialRequests: '',
  totalPrice: 0
});
const [showBookingForm, setShowBookingForm] = useState(false);
const [bookingStep, setBookingStep] = useState(1); // 1-дата, 2-пакет, 3-контакты, 4-подтверждение
const [isSubmitting, setIsSubmitting] = useState(false);
const [bookingSuccess, setBookingSuccess] = useState(false);

const openBookingForm = (service, selectedDate = '', selectedTime = '') => {
  setSelectedServiceForCalendar(service);
  setBookingForm({
    selectedDate,
    selectedTime,
    selectedPackage: service.packages?.[0]?.name || '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    guestCount: '',
    specialRequests: '',
    totalPrice: service.packages?.[0]?.price ? parseFloat(service.packages[0].price.replace(/[^\d]/g, '')) : 0
  });
  setBookingStep(1);
  setShowBookingForm(true);
  setShowCalendar(false);
  document.body.style.overflow = 'hidden';
};

// Закрытие формы бронирования
const closeBookingForm = () => {
  setShowBookingForm(false);
  setBookingSuccess(false);
  setBookingStep(1);
  setSelectedServiceForCalendar(null);
  document.body.style.overflow = 'auto';
};

// Выбор даты и времени
const selectDateTime = (date, timeSlot) => {
  setBookingForm(prev => ({
    ...prev,
    selectedDate: date,
    selectedTime: timeSlot
  }));
};

// Выбор пакета услуг
const selectPackage = (packageData) => {
  const price = parseFloat(packageData.price.replace(/[^\d]/g, ''));
  setBookingForm(prev => ({
    ...prev,
    selectedPackage: packageData.name,
    totalPrice: price
  }));
};

// Обновление формы
const updateBookingForm = (field, value) => {
  setBookingForm(prev => ({
    ...prev,
    [field]: value
  }));
};

// Переход к следующему шагу
const nextBookingStep = () => {
  setBookingStep(prev => Math.min(prev + 1, 4));
};

// Возврат к предыдущему шагу
const prevBookingStep = () => {
  setBookingStep(prev => Math.max(prev - 1, 1));
};

// Отправка формы бронирования
const submitBooking = async () => {
  setIsSubmitting(true);
  
  try {
    // Здесь должна быть отправка на сервер
    // Пример:
    // const response = await fetch('/api/bookings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     serviceId: selectedServiceForCalendar.id,
    //     ...bookingForm
    //   })
    // });
    
    // Симуляция отправки
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Для демо добавим бронирование в локальные данные
    const newBooking = {
      id: Date.now(),
      serviceId: selectedServiceForCalendar.id,
      serviceName: selectedServiceForCalendar.title,
      ...bookingForm,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Сохранить в localStorage для демо
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
    
    setBookingSuccess(true);
    setBookingStep(4);
    
  } catch (error) {
    console.error('Ошибка бронирования:', error);
    alert('Произошла ошибка при бронировании. Попробуйте еще раз.');
  } finally {
    setIsSubmitting(false);
  }
};
useEffect(() => {
  const handleKeyDown = (e) => {
    if (showBookingForm && e.key === 'Escape') {
      closeBookingForm();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [showBookingForm]);

// 8. ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ЗАБРОНИРОВАННЫХ ДАННЫХ (для админ-панели)

const getBookings = () => {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};

const advantages = [
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    title: "7+ лет успешной работы",
    description: "Богатый опыт организации более 1000 мероприятий различного масштаба и тематики"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Индивидуальный подход",
    description: "Каждое мероприятие уникально. Мы учитываем все ваши пожелания и особенности"
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Команда профессионалов",
    description: "Только опытные специалисты: ведущие, аниматоры, декораторы, фотографы"
  },
  {
    icon: <Gem className="w-8 h-8 text-primary" />,
    title: "Комплексный сервис",
    description: "Полный цикл услуг от идеи до реализации. Вам остается только наслаждаться праздником"
  },
  {
    icon: <Wallet className="w-8 h-8 text-primary" />,
    title: "Честная цена",
    description: "Прозрачное ценообразование без скрытых платежей. Различные пакеты на любой бюджет"
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Гарантия качества",
    description: "Мы гарантируем высокое качество услуг и готовы нести ответственность за результат"
  }
];

const steps = [
  {
    step: "01",
    title: "Обращение",
    description: "Вы оставляете заявку или звоните нам. Мы выясняем ваши пожелания и бюджет",
    icon: <Phone className="w-8 h-8 text-white" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    step: "02", 
    title: "Планирование",
    description: "Составляем детальный план мероприятия с учетом всех ваших требований",
    icon: <ClipboardList className="w-8 h-8 text-white" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    step: "03",
    title: "Подготовка",
    description: "Готовим декор, подбираем артистов, бронируем площадку и оборудование",
    icon: <Palette className="w-8 h-8 text-white" />,
    color: "from-orange-500 to-red-500"
  },
  {
    step: "04",
    title: "Проведение",
    description: "В день мероприятия наша команда воплощает все в жизнь. Вы просто наслаждаетесь!",
    icon: <PartyPopper className="w-8 h-8 text-white" />,
    color: "from-green-500 to-teal-500"
  }
];

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
  className="inline-flex gap-4 justify-center mb-6"
>
  <PartyPopper className="w-12 h-12 text-yellow-200" />
  <Sparkles className="w-12 h-12 text-pink-200" />
  <PartyPopper className="w-12 h-12 text-purple-200" />
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
                        className="w-full h-full object-cover object-center" // изменено с object-cover на object-cover object-center
                        style={{ objectFit: 'cover', objectPosition: 'center' }} // добавлен inline стиль
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
                              className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer"
                                 onClick={(e) => openCalendar(service, e)}
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
                         className="w-full h-full object-cover object-center transition-transform duration-300"
                         style={{ objectFit: 'cover', objectPosition: 'center' }} // добавлен inline стиль
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
          {showCalendar && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={closeCalendar}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col" // ✅ Добавлен max-h и flex
      onClick={(e) => e.stopPropagation()}
    >
      {/* Заголовок календаря - фиксированный */}
      <div className="p-6 border-b flex-shrink-0"> {/* ✅ flex-shrink-0 для фиксации */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            Выбрать дату для "{selectedServiceForCalendar?.title}"
          </h3>
          <button
            onClick={closeCalendar}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Навигация по месяцам */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateCalendar(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <CalendarChevronLeft size={20} />
          </button>
          <h4 className="text-lg font-semibold">
            {monthNames[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
          </h4>
          <button
            onClick={() => navigateCalendar(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <CalendarChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Скроллируемое содержимое календаря */}
      <div className="flex-1 overflow-y-auto p-6"> {/* ✅ Скроллируемая область */}
        {/* Дни недели */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Календарная сетка */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((date, index) => {
            const isCurrentMonth = date.getMonth() === currentCalendarDate.getMonth();
            const isToday = formatDate(date) === formatDate(new Date());
            const isBooked = isDateBooked(date);
            const timeSlots = getTimeSlots(date);
            const isPast = date < new Date().setHours(0, 0, 0, 0);
            
            return (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-sm cursor-pointer rounded-lg transition-all
                  ${!isCurrentMonth ? 'text-gray-300' : ''}
                  ${isToday ? 'bg-blue-100 text-blue-600 font-bold' : ''}
                  ${isBooked ? 'bg-purple-100 text-purple-600 font-semibold' : ''}
                  ${isPast ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                  ${!isCurrentMonth || isPast ? '' : 'hover:shadow-md'}
                `}
                onClick={() => {
  if (isCurrentMonth && !isPast) {
    const dateStr = formatDate(date);
    const slots = getTimeSlots(date);
    
    if (slots.length > 0) {
      // Показать доступные слоты времени
      setSelectedDate(dateStr);
    } else if (!isBooked) {
      // Открыть форму бронирования для доступной даты
      openBookingForm(selectedServiceForCalendar, dateStr);
    }
  }
}}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        {/* Информация о выбранной дате */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-semibold text-gray-900 mb-2">Легенда:</h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 rounded"></div>
              <span>Занятые даты</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded"></div>
              <span>Сегодня</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span>Доступные даты</span>
            </div>
          </div>
        </div>

        {/* Дополнительная информация о услуге */}
        {selectedServiceForCalendar && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <h5 className="font-semibold text-purple-900 mb-2">Детали услуги:</h5>
            <div className="space-y-1 text-sm text-purple-700">
              <div>Длительность: {selectedServiceForCalendar.duration}</div>
              <div>Минимум гостей: {selectedServiceForCalendar.minGuests}</div>
              <div>Цена: {selectedServiceForCalendar.price}</div>
            </div>
          </div>
        )}
      </div>

      {/* Кнопки действий - фиксированные внизу */}
      <div className="p-6 border-t flex gap-3 flex-shrink-0"> {/* ✅ flex-shrink-0 для фиксации */}
        <button
          onClick={closeCalendar}
          className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Отмена
        </button>
        <button
  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
  onClick={() => openBookingForm(selectedServiceForCalendar)}
>
  Забронировать
</button>
      </div>
    </motion.div>
  </motion.div>
)}
{showBookingForm && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    onClick={closeBookingForm}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Заголовок */}
      <div className="p-6 border-b flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            Бронирование: {selectedServiceForCalendar?.title}
          </h3>
          <button onClick={closeBookingForm} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        {/* Прогресс бронирования */}
        <div className="flex items-center mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                bookingStep >= step 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {bookingStep > step ? <Check size={16} /> : step}
              </div>
              {step < 4 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  bookingStep > step ? 'bg-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          {bookingStep === 1 && 'Выберите дату и время'}
          {bookingStep === 2 && 'Выберите пакет услуг'}
          {bookingStep === 3 && 'Контактные данные'}
          {bookingStep === 4 && 'Подтверждение'}
        </div>
      </div>

      {/* Содержимое */}
      <div className="flex-1 overflow-y-auto p-6">
        {bookingStep === 1 && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Дата и время</h4>
            
            {/* Календарь для выбора даты */}
            <div className="grid grid-cols-7 gap-1 text-center">
              <div className="text-sm font-medium text-gray-500 py-2">Пн</div>
              <div className="text-sm font-medium text-gray-500 py-2">Вт</div>
              <div className="text-sm font-medium text-gray-500 py-2">Ср</div>
              <div className="text-sm font-medium text-gray-500 py-2">Чт</div>
              <div className="text-sm font-medium text-gray-500 py-2">Пт</div>
              <div className="text-sm font-medium text-gray-500 py-2">Сб</div>
              <div className="text-sm font-medium text-gray-500 py-2">Вс</div>
            </div>
            
            {/* Доступные слоты времени */}
            {bookingForm.selectedDate && (
              <div>
                <h5 className="font-medium mb-3">Доступное время:</h5>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00-12:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'].map(slot => (
                    <button
                      key={slot}
                      onClick={() => updateBookingForm('selectedTime', slot)}
                      className={`p-3 rounded-lg border text-center ${
                        bookingForm.selectedTime === slot
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {bookingStep === 2 && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Выберите пакет</h4>
            <div className="grid gap-4">
              {selectedServiceForCalendar?.packages?.map((pkg, index) => (
                <div
                  key={index}
                  onClick={() => selectPackage(pkg)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    bookingForm.selectedPackage === pkg.name
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-lg">{pkg.name}</h5>
                    <span className="text-xl font-bold text-purple-600">{pkg.price}</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Количество гостей
              </label>
              <input
                type="number"
                min="1"
                value={bookingForm.guestCount}
                onChange={(e) => updateBookingForm('guestCount', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Введите количество гостей"
              />
            </div>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Контактная информация</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.clientName}
                  onChange={(e) => updateBookingForm('clientName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  required
                  value={bookingForm.clientPhone}
                  onChange={(e) => updateBookingForm('clientPhone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={bookingForm.clientEmail}
                onChange={(e) => updateBookingForm('clientEmail', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Особые пожелания
              </label>
              <textarea
                value={bookingForm.specialRequests}
                onChange={(e) => updateBookingForm('specialRequests', e.target.value)}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Расскажите о ваших особых пожеланиях..."
              />
            </div>
          </div>
        )}

        {bookingStep === 4 && (
          <div className="space-y-6">
            {bookingSuccess ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check size={32} className="text-green-600" />
                </motion.div>
                <h4 className="text-xl font-bold text-green-600 mb-2">
                  Бронирование успешно отправлено!
                </h4>
                <p className="text-gray-600 mb-6">
                  Мы свяжемся с вами в ближайшее время для подтверждения деталей.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h5 className="font-semibold mb-2">Детали бронирования:</h5>
                  <div className="space-y-1 text-sm">
                    <div>Услуга: {selectedServiceForCalendar?.title}</div>
                    <div>Дата: {bookingForm.selectedDate}</div>
                    <div>Время: {bookingForm.selectedTime}</div>
                    <div>Пакет: {bookingForm.selectedPackage}</div>
                    <div>Гостей: {bookingForm.guestCount}</div>
                    <div className="font-semibold">Сумма: {bookingForm.totalPrice.toLocaleString()} ₸</div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-semibold mb-4">Подтверждение бронирования</h4>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Услуга:</span>
                      <span className="font-medium">{selectedServiceForCalendar?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Дата:</span>
                      <span className="font-medium">{bookingForm.selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Время:</span>
                      <span className="font-medium">{bookingForm.selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Пакет:</span>
                      <span className="font-medium">{bookingForm.selectedPackage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Количество гостей:</span>
                      <span className="font-medium">{bookingForm.guestCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Клиент:</span>
                      <span className="font-medium">{bookingForm.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Телефон:</span>
                      <span className="font-medium">{bookingForm.clientPhone}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-purple-600">{bookingForm.totalPrice.toLocaleString()} ₸</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Обратите внимание:</strong> После отправки заявки наш менеджер свяжется с вами 
                    для подтверждения деталей и обсуждения условий оплаты.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Кнопки навигации */}
      {!bookingSuccess && (
        <div className="p-6 border-t flex gap-3 flex-shrink-0">
          {bookingStep > 1 && (
            <button
              onClick={prevBookingStep}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Назад
            </button>
          )}
          
          {bookingStep < 4 ? (
            <button
              onClick={nextBookingStep}
              disabled={
                (bookingStep === 1 && (!bookingForm.selectedDate || !bookingForm.selectedTime)) ||
                (bookingStep === 2 && (!bookingForm.selectedPackage || !bookingForm.guestCount)) ||
                (bookingStep === 3 && (!bookingForm.clientName || !bookingForm.clientPhone))
              }
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Далее
            </button>
          ) : (
            <button
              onClick={submitBooking}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Отправка...
                </div>
              ) : (
                'Подтвердить бронирование'
              )}
            </button>
          )}
        </div>
      )}
    </motion.div>
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
  {advantages.map((advantage, index) => (

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
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative p-6 bg-white rounded-xl shadow-md text-center space-y-4"
              >
                <div className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color}`}>
    {step.icon}
  </div>

  {/* Номер шага */}
  <div className="text-sm font-semibold text-gray-500">
    Шаг {step.step}
  </div>

  {/* Заголовок */}
  <h3 className="text-lg font-bold text-gray-900">
    {step.title}
  </h3>

  {/* Описание */}
  <p className="text-gray-600 text-sm">
    {step.description}
  </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden"
                >
                </motion.div>
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