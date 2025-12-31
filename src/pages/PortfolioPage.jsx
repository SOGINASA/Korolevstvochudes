import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import BookingModal from '../components/BookingModal';
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
  X,
  Phone,
  MessageCircle,
  Check,
  Clock,
  ArrowRight,
  ArrowLeft,
  Loader,
  Sparkles,
  Link
} from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    selectedDate: '',
    selectedTime: '',
    selectedPackage: 'Базовый',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    guestCount: '',
    specialRequests: '',
    totalPrice: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [showCategorySelect, setShowCategorySelect] = useState(false);

  // Состояния для данных портфолио
  const [portfolioData, setPortfolioData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Загрузка данных портфолио из API
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (activeFilter !== 'all') {
          params.append('category', activeFilter);
        }
        
        const response = await fetch(`${API_BASE_URL}/portfolio/?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // API возвращает объект {portfolio: [...], pagination: {...}}
        setPortfolioData(data.portfolio || []);
        setPagination(data.pagination || null);
        setError(null);
        
      } catch (err) {
        console.error('Ошибка загрузки данных портфолио:', err);
        setError('Не удалось загрузить портфолио. Попробуйте обновить страницу.');
        setPortfolioData([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [activeFilter]);

  // Загрузка категорий
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/portfolio/categories`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки категорий');
        }
        
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
        // Устанавливаем базовые категории в случае ошибки
        setCategories([
          { id: 'all', name: 'Все работы', count: 0 },
          { id: 'children', name: 'Детские праздники', count: 0 },
          { id: 'wedding', name: 'Свадьбы', count: 0 },
          { id: 'corporate', name: 'Корпоративы', count: 0 },
          { id: 'anniversary', name: 'Юбилеи', count: 0 },
          { id: 'show', name: 'Шоу-программы', count: 0 }
        ]);
      }
    };

    fetchCategories();
  }, []);

  const filteredProjects = portfolioData;

  const openLightbox = async (project, imageIndex = 0) => {
    try {
      // Увеличиваем счетчик просмотров через API
      const response = await fetch(`${API_BASE_URL}/portfolio/${project.id}`);
      if (response.ok) {
        const data = await response.json();
        // Обновляем данные проекта с актуальным счетчиком просмотров
        setSelectedProject(data.portfolio_item);
      } else {
        setSelectedProject(project);
      }
    } catch (error) {
      console.error('Ошибка при записи просмотра:', error);
      setSelectedProject(project);
    }
    
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

  // Функции для бронирования
  const openBookingForm = (project) => {
    setSelectedProject(project);
    setBookingForm({
      selectedDate: '',
      selectedTime: '',
      selectedPackage: project.packages?.[0]?.name || 'Базовый',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      guestCount: '',
      specialRequests: '',
      totalPrice: project.packages?.[0]?.price ? parseFloat(project.packages[0].price.replace(/[^\d]/g, '')) : 0
    });
    setBookingStep(1);
    setShowBookingForm(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setBookingSuccess(false);
    setBookingStep(1);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextBookingStep = () => {
    setBookingStep(prev => Math.min(prev + 1, 4));
  };

  const prevBookingStep = () => {
    setBookingStep(prev => Math.max(prev - 1, 1));
  };

  const updateBookingForm = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Функции для работы с модалом бронирования
const openBookingModal = () => {
  setShowBookingModal(true);
};

const closeBookingModal = () => {
  setShowBookingModal(false);
};

  const selectPackage = (packageData) => {
    const price = parseFloat(packageData.price.replace(/[^\d]/g, ''));
    setBookingForm(prev => ({
      ...prev,
      selectedPackage: packageData.name,
      totalPrice: price
    }));
  };

  const submitBooking = async () => {
    setIsSubmitting(true);
    
    try {
      // Отправляем данные бронирования на API
      const response = await fetch(`${API_BASE_URL}/bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: bookingForm.clientName,
          phone: bookingForm.clientPhone,
          email: bookingForm.clientEmail,
          service_id: selectedProject?.id,
          event_date: bookingForm.selectedDate,
          event_time: bookingForm.selectedTime,
          guests_count: parseInt(bookingForm.guestCount) || null,
          budget: `${bookingForm.totalPrice.toLocaleString()} ₸`,
          message: `Пакет: ${bookingForm.selectedPackage}\nОсобые пожелания: ${bookingForm.specialRequests}`,
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки заявки');
      }

      setBookingSuccess(true);
      setBookingStep(4);
      
    } catch (error) {
      console.error('Ошибка бронирования:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCtaOrderClick = () => {
    openBookingModal();
  };

  // Календарь
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
      if (selectedProject && !showBookingForm) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
      if (showBookingForm && e.key === 'Escape') {
        closeBookingForm();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, showBookingForm, nextImage, prevImage, closeLightbox]);

  // Компонент загрузки
  const LoadingComponent = () => (
    <div className="py-20">
      <div className="container-custom">
        <div className="flex flex-col items-center justify-center">
          <Loader className="w-12 h-12 text-primary-500 animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Загружаем портфолио...
          </h3>
          <p className="text-gray-600">
            Пожалуйста, подождите немного
          </p>
        </div>
      </div>
    </div>
  );

  // Компонент ошибки
  const ErrorComponent = () => (
    <div className="py-20">
      <div className="container-custom">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Что-то пошло не так
          </h3>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  );

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
                  <div className="text-3xl font-bold text-secondary-200 mb-2">
                    {loading ? "..." : `${portfolioData.length}+`}
                  </div>
                  <div className="text-primary-100">Праздников</div>
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

        {/* Показываем загрузку или ошибку */}
        {loading && <LoadingComponent />}
        {error && !loading && <ErrorComponent />}

        {/* Основной контент - показываем только если нет загрузки и ошибки */}
        {!loading && !error && (
          <>
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
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr'
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
                          viewMode === 'list' ? 'flex gap-6 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl' : 'h-full'
                        }`}
                        onClick={() => openLightbox(project)}
                      >
                        {viewMode === 'grid' ? (
                          <div className="card overflow-hidden flex flex-col h-full">
                            {project.featured && (
                              <div className="absolute top-4 left-4 z-10">
                                <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                  ПОПУЛЯРНОЕ
                                </span>
                              </div>
                            )}
                            
                            <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden flex-shrink-0">
                              <img
                                src={project.coverImage}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Нет+изображения';
                                }}
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

                              {/* Счетчик просмотров */}
                              <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{project.views || 0}</span>
                              </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                                {project.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                {project.description}
                              </p>

                              <div className="flex items-center justify-between text-sm text-gray-500 mb-4 flex-shrink-0">
                                <div className="flex items-center gap-1">
                                  <Calendar size={16} />
                                  <span className="truncate">
                                    {new Date(project.date).toLocaleDateString('ru-RU')}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users size={16} />
                                  <span className="truncate">{project.guests}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-auto flex-shrink-0">
                                <div className="flex items-center gap-1">
                                  {[...Array(project.rating || 5)].map((_, i) => (
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
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Нет+изображения';
                                }}
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
                                <div className="flex items-center gap-1">
                                  <Eye size={16} />
                                  {project.views || 0} просмотров
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  {[...Array(project.rating || 5)].map((_, i) => (
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

                {filteredProjects.length === 0 && portfolioData.length > 0 && (
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

                {portfolioData.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📁</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Портфолио пусто
                    </h3>
                    <p className="text-gray-600">
                      Мы работаем над наполнением портфолио. Скоро здесь будут наши лучшие работы!
                    </p>
                  </div>
                )}
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
                    Готовы создать свой <span className="text-secondary-200">незабываемый праздник?</span>
                  </h2>
                  <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                    Каждый проект уникален. Расскажите нам о своих мечтах, 
                    и мы воплотим их в жизнь с тем же качеством и вниманием к деталям.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      className="btn-secondary text-lg px-8 py-4" 
                      onClick={handleCtaOrderClick}
                    >  
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
                      <p className="text-primary-100">8 (705) 519 5222</p>
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
                      <p className="text-primary-100">ул. Магжана Жумабаева 1075</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </>
        )}

        {/* Lightbox модальное окно */}
        <AnimatePresence>
          {selectedProject && !showBookingForm && (
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
                className="max-w-6xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col lg:flex-row flex-1 min-h-0">
                  {/* Изображение */}
                  <div className="lg:w-2/3 relative flex-shrink-0">
                    <img
                      src={selectedProject.images?.[currentImageIndex] || selectedProject.coverImage}
                      alt={selectedProject.title}
                      className="w-full h-64 sm:h-96 lg:h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x600/f3f4f6/9ca3af?text=Нет+изображения';
                      }}
                    />
                    
                    {/* Навигация по изображениям */}
                    {selectedProject.images && selectedProject.images.length > 1 && (
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
                  <div className="lg:w-1/3 p-6 flex flex-col min-h-0 overflow-y-auto">
                    <div className="flex items-start justify-between mb-4">
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 pr-4 line-clamp-2">
                        {selectedProject.title}
                      </h2>
                      <button
                        onClick={closeLightbox}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-6 text-sm lg:text-base">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-3 mb-6 flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          {new Date(selectedProject.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>

                      {selectedProject.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm line-clamp-2">{selectedProject.location}</span>
                        </div>
                      )}

                      {selectedProject.guests && (
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{selectedProject.guests}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {[...Array(selectedProject.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-gray-700 text-sm">Оценка клиента</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          {selectedProject.views || 0} просмотров
                        </span>
                      </div>
                    </div>

                    {/* Теги */}
                    {selectedProject.tags && selectedProject.tags.length > 0 && (
                      <div className="mb-6 flex-shrink-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Особенности:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary-50 text-primary-600 text-xs lg:text-sm rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Бюджет */}
                    {selectedProject.budget && (
                      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6 flex-shrink-0">
                        <div className="text-sm text-gray-600 mb-1">Бюджет проекта:</div>
                        <div className="text-xl lg:text-2xl font-bold text-primary-600">
                          {selectedProject.budget}
                        </div>
                      </div>
                    )}

                    {/* CTA кнопки */}
                    <div className="space-y-3 mt-auto">
                      <button 
                        className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-primary-700 transition-colors"
                        onClick={() => openBookingForm(selectedProject)}
                      >
                        Заказать похожий праздник
                      </button>
                      <button className="w-full border-2 border-primary-600 text-primary-600 py-3 px-6 rounded-xl font-medium hover:bg-primary-50 transition-colors">
                        Получить консультацию
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Модальное окно выбора категории */}
        <AnimatePresence>
          {showCategorySelect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
              onClick={() => setShowCategorySelect(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">Выберите категорию праздника</h3>
                <div className="space-y-3">
                  {categories.filter(c => c.id !== 'all').map(category => (
                    <button
                      key={category.id}
                      className="w-full py-3 px-4 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 font-semibold flex items-center gap-2 transition"
                      onClick={() => {
                        // Найти первый проект этой категории
                        const project = portfolioData.find(p => p.category === category.id);
                        if (project) {
                          setShowCategorySelect(false);
                          openBookingForm(project);
                        }
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                <button
                  className="mt-6 w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium"
                  onClick={() => setShowCategorySelect(false)}
                >
                  Отмена
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Форма бронирования */}
        <AnimatePresence>
          {showBookingForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
              onClick={closeBookingForm}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Заголовок */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Бронирование праздника</h2>
                      <p className="text-primary-100">{selectedProject?.title}</p>
                    </div>
                    <button
                      onClick={closeBookingForm}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Индикатор шагов */}
                  <div className="mt-6 flex items-center justify-between">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          bookingStep >= step 
                            ? 'bg-white text-primary-600' 
                            : 'bg-white/20 text-white/60'
                        }`}>
                          {bookingSuccess && step === 4 ? <Check size={16} /> : step}
                        </div>
                        {step < 4 && (
                          <div className={`flex-1 h-0.5 mx-2 ${
                            bookingStep > step ? 'bg-white' : 'bg-white/20'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Контент формы */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {bookingStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900">Выберите дату и время</h3>
                      
                      {/* Календарь */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => navigateCalendar(-1)}
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <ArrowLeft size={20} />
                          </button>
                          
                          <h4 className="text-lg font-semibold">
                            {monthNames[currentCalendarDate.getMonth()]} {currentCalendarDate.getFullYear()}
                          </h4>
                          
                          <button
                            onClick={() => navigateCalendar(1)}
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <ArrowRight size={20} />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {dayNames.map(day => (
                            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {generateCalendarDays().map((date, index) => {
                            const isCurrentMonth = date.getMonth() === currentCalendarDate.getMonth();
                            const isToday = date.toDateString() === new Date().toDateString();
                            const isPast = date < new Date().setHours(0, 0, 0, 0);
                            const isSelected = bookingForm.selectedDate === date.toISOString().split('T')[0];

                            return (
                              <button
                                key={index}
                                onClick={() => !isPast && updateBookingForm('selectedDate', date.toISOString().split('T')[0])}
                                disabled={isPast}
                                className={`p-2 text-sm rounded-lg transition-colors ${
                                  isPast
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : isSelected
                                    ? 'bg-primary-600 text-white'
                                    : isToday
                                    ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                                    : isCurrentMonth
                                    ? 'text-gray-900 hover:bg-primary-50'
                                    : 'text-gray-400 hover:bg-gray-100'
                                }`}
                              >
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Время */}
                      {bookingForm.selectedDate && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Выберите время</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].map(time => (
                              <button
                                key={time}
                                onClick={() => updateBookingForm('selectedTime', time)}
                                className={`p-3 text-center rounded-lg border transition-colors ${
                                  bookingForm.selectedTime === time
                                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900">Выберите пакет услуг</h3>
                      
                      <div className="grid gap-4">
                        {selectedProject?.packages?.map((pkg, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                              bookingForm.selectedPackage === pkg.name
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-gray-200 hover:border-primary-300'
                            }`}
                            onClick={() => selectPackage(pkg)}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                              <div className="text-xl font-bold text-primary-600">{pkg.price}</div>
                            </div>
                            
                            <div className="space-y-1">
                              {pkg.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <Check size={16} className="text-green-500 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )) || (
                          <div className="text-center py-8">
                            <p className="text-gray-600">Пакеты услуг будут определены при консультации</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

{bookingStep === 2 && (
  <div className="space-y-4 sm:space-y-6">
    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Контактная информация</h3>
    
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      {/* Имя - всегда на полную ширину на мобильных */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Имя *
        </label>
        <input
          type="text"
          value={bookingForm.clientName}
          onChange={(e) => updateBookingForm('clientName', e.target.value)}
          className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder="Ваше имя"
          required
        />
      </div>

      {/* Телефон - всегда на полную ширину на мобильных */}
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Телефон *
        </label>
        <input
          type="tel"
          value={bookingForm.clientPhone}
          onChange={(e) => updateBookingForm('clientPhone', e.target.value)}
          className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder="+7 (___) ___-__-__"
          required
        />
      </div>

      {/* Закомментированные поля - сохраняем как есть */}
      {/* <div className="w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={bookingForm.clientEmail}
          onChange={(e) => updateBookingForm('clientEmail', e.target.value)}
          className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder="your@email.com"
        />
      </div> */}

      {/* <div className="w-full md:w-1/2">
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-600" />
          Количество гостей
        </label>
        <input
          type="number"
          value={bookingForm.guestCount}
          onChange={(e) => updateBookingForm('guestCount', e.target.value)}
          className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
          placeholder="10"
          min="1"
        />
      </div> */}
    </div>

    {/* Особые пожелания - закомментировано */}
    {/* <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-purple-600" />
        Особые пожелания
      </label>
      <textarea
        value={bookingForm.specialRequests}
        onChange={(e) => updateBookingForm('specialRequests', e.target.value)}
        rows={4}
        className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors resize-vertical"
        placeholder="Расскажите о ваших пожеланиях к мероприятию..."
      />
    </div> */}
  </div>
)}

                  {bookingStep === 4 && (
                    <div className="text-center space-y-6">
                      {bookingSuccess ? (
                        <>
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <Check size={40} className="text-green-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">Заявка отправлена!</h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            Спасибо за заявку! Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
                          </p>
                          
                          <div className="bg-primary-50 rounded-xl p-4">
                            <h4 className="font-semibold text-primary-900 mb-2">Детали заявки:</h4>
                            <div className="space-y-1 text-sm text-primary-700">
                              <p>Услуга: {selectedProject?.title}</p>
                              <p>Дата: {new Date(bookingForm.selectedDate).toLocaleDateString('ru-RU')}</p>
                              <p>Время: {bookingForm.selectedTime}</p>
                              <p>Пакет: {bookingForm.selectedPackage}</p>
                              <p>Стоимость: {bookingForm.totalPrice.toLocaleString()} ₸</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold text-gray-900">Подтверждение заказа</h3>
                          
                          <div className="bg-gray-50 rounded-xl p-6 text-left">
                            <h4 className="font-semibold text-gray-900 mb-4">Детали заказа:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Услуга:</span>
                                <span className="font-medium">{selectedProject?.title}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Дата:</span>
                                <span className="font-medium">
                                  {bookingForm.selectedDate ? new Date(bookingForm.selectedDate).toLocaleDateString('ru-RU') : '-'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Время:</span>
                                <span className="font-medium">{bookingForm.selectedTime || '-'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Пакет:</span>
                                <span className="font-medium">{bookingForm.selectedPackage}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Гостей:</span>
                                <span className="font-medium">{bookingForm.guestCount || 'Не указано'}</span>
                              </div>
                              <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between text-lg">
                                  <span className="font-semibold">Итого:</span>
                                  <span className="font-bold text-primary-600">
                                    {bookingForm.totalPrice.toLocaleString()} ₸
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600">
                            Нажимая "Подтвердить заказ", вы соглашаетесь с нашими условиями обслуживания.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Навигация */}
                <div className="bg-gray-50 p-6 flex justify-between items-center flex-shrink-0">
                  <button
                    onClick={bookingStep === 1 ? closeBookingForm : prevBookingStep}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={isSubmitting}
                  >
                    {bookingStep === 1 ? 'Отмена' : 'Назад'}
                  </button>

                  <div className="flex gap-3">
                    {bookingStep < 4 && (
                      <button
                        onClick={bookingStep === 3 ? submitBooking : nextBookingStep}
                        disabled={
                          isSubmitting ||
                          (bookingStep === 1 && (!bookingForm.selectedDate || !bookingForm.selectedTime)) ||
                          (bookingStep === 3 && (!bookingForm.clientName || !bookingForm.clientPhone))
                        }
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Отправка...
                          </>
                        ) : bookingStep === 3 ? (
                          'Подтвердить заказ'
                        ) : (
                          'Далее'
                        )}
                      </button>
                    )}

                    {bookingStep === 4 && bookingSuccess && (
                      <button
                        onClick={closeBookingForm}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Закрыть
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Модальное окно бронирования */}
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={closeBookingModal} 
      />
    </>
  );
};

export default PortfolioPage;
