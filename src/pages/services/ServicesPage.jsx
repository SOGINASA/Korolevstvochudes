import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Grid, 
  List, 
  Heart, 
  Eye, 
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
  PartyPopper,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Gift,
  Camera,
  Music,
  Palette,
  Cake,
  Crown,
  Building,
  Baby,
  Zap,
  Gamepad2,
  Building2,
  HeartHandshake,
  Loader2,
  AlertCircle,
  RefreshCw,
  Loader,
  Link
} from 'lucide-react';
import { apiService } from '../../services/api';
import { formatPhoneNumber } from '../../utils/helpers';
import { useSettings } from '../../contexts/SettingsContext';
import BookingModal from '../../components/BookingModal';

const ServicesPage = () => {
  // Состояния для данных с сервера
  const [servicesData, setServicesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();
  const getCompanyName = () => settings?.company_name || 'Королевство Чудес';
  const getCompanyDescription = () => settings?.company_description || 'Праздничное агентство';
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';
  const getCompanyEmail = () => settings?.company_email || 'info@prazdnikvdom.kz';
  const getCompanyAddress = () => settings?.company_address || 'г. Петропавловск, ул. Магжана Жумабаева 107';
  const getWhatsAppPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  // Существующие состояния
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedService, setSelectedService] = useState(null);
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
  const [showBookingModal, setShowBookingModal] = useState(false);


  // Загрузка данных с сервера
  const loadData = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);

      // Параллельно загружаем услуги и категории
      const [servicesResponse, categoriesResponse] = await Promise.all([
        apiService.getServices({
          per_page: 100, // Загружаем много услуг для фильтрации
          sort_by: 'created_at',
          sort_order: 'desc'
        }),
        apiService.getServiceCategories()
      ]);

      if (servicesResponse.success && categoriesResponse.success) {
        // Преобразуем данные с сервера в формат, ожидаемый компонентом
        console.log(servicesResponse)
        const transformedServices = servicesResponse.services.map(service => ({
          id: service.id,
          title: service.title,
          category: service.category,
          duration: service.duration || '2-3 часа',
          minGuests: service.min_guests || '5 человек',
          rating: parseFloat(service.rating) || 5.0,
          reviews: service.reviews_count || 0,
          price: service.price || 'Уточняйте',
          priceDescription: service.price_description || 'за услугу',
          description: service.description || '',
          fullDescription: service.full_description || service.description || '',
          features: Array.isArray(service.features) ? service.features : (service.features ? service.features.split(',').map(f => f.trim()) : []),
          subcategories: Array.isArray(service.subcategories) ? service.subcategories : (service.subcategories ? service.subcategories.split(',').map(s => s.trim()) : []),
          images: Array.isArray(service.images) && service.images.length > 0 ? service.images : [
            service.coverImage
          ],
          coverImage: service.coverImage,
          featured: Boolean(service.featured),
          tags: Array.isArray(service.tags) ? service.tags : (service.tags ? service.tags.split(',').map(t => t.trim()) : []),
          icon: getCategoryIcon(service.category),
          packages: service.packages || generateDefaultPackages(service.price)
        }));

        setServicesData(transformedServices);
        setCategories(transformCategoriesData(categoriesResponse.categories));
      } else {
        throw new Error('Ошибка загрузки данных');
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message || 'Не удалось загрузить данные');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Функция для получения иконки категории
  const getCategoryIcon = (category) => {
    const iconMap = {
      'children': <Baby className="w-5 h-5 text-purple-600" />,
      'weddings': <HeartHandshake className="w-5 h-5 text-pink-600" />,
      'corporate': <Building2 className="w-5 h-5 text-blue-600" />,
      'animators': <Users className="w-5 h-5 text-green-600" />,
      'shows': <Zap className="w-5 h-5 text-orange-600" />,
      'photo': <Camera className="w-5 h-5 text-indigo-600" />,
      'decoration': <Palette className="w-5 h-5 text-red-600" />,
      'anniversaries': <Cake className="w-5 h-5 text-yellow-600" />,
      'seasonal': <Gift className="w-5 h-5 text-emerald-600" />,
      'quests': <Gamepad2 className="w-5 h-5 text-cyan-600" />
    };
    return iconMap[category] || <Star className="w-5 h-5 text-purple-600" />;
  };

  // Функция для генерации пакетов по умолчанию
  const generateDefaultPackages = (basePrice) => {
    const priceNum = basePrice ? parseInt(basePrice.replace(/\D/g, '')) : 20000;
    return [
      { 
        name: 'Базовый', 
        price: `${priceNum.toLocaleString()} ₸`, 
        duration: '2 часа', 
        features: ['Основная программа', 'Стандартный реквизит'] 
      },
      { 
        name: 'Стандарт', 
        price: `${Math.round(priceNum * 1.5).toLocaleString()} ₸`, 
        duration: '3 часа', 
        features: ['Расширенная программа', 'Дополнительный реквизит', 'Фотосессия'] 
      },
      { 
        name: 'Премиум', 
        price: `${Math.round(priceNum * 2).toLocaleString()} ₸`, 
        duration: '4 часа', 
        features: ['VIP программа', 'Премиум реквизит', 'Фото и видео', 'Подарки'] 
      }
    ];
  };

  // Функция для преобразования категорий
  const transformCategoriesData = (backendCategories) => {
    const categoryIcons = {
      'children': Baby,
      'weddings': HeartHandshake,
      'corporate': Building2,
      'animators': Users,
      'shows': Zap,
      'photo': Camera,
      'decoration': Palette,
      'anniversaries': Cake,
      'seasonal': Gift,
      'quests': Gamepad2
    };

    return backendCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: cat.count,
      iconComponent: categoryIcons[cat.id] || Sparkles
    }));
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadData();
  }, []);

  // Фильтрация услуг
  const filteredServices = activeFilter === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.category === activeFilter);
  // Функции модального окна (без изменений)
  console.log(filteredServices)
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

  // Функции бронирования
  const openBookingForm = (service) => {
    setSelectedService(service);
    setBookingForm({
      selectedDate: '',
      selectedTime: '',
      selectedPackage: service.packages?.[0]?.name || 'Базовый',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      guestCount: '',
      specialRequests: '',
      totalPrice: service.packages?.[0]?.price ? parseFloat(service.packages[0].price.replace(/[^\d]/g, '')) : 0
    });
    setBookingStep(1);
    setShowBookingForm(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setBookingSuccess(false);
    setBookingStep(1);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  const nextBookingStep = () => {
    setBookingStep(prev => Math.min(prev + 1, 3));
  };

  const prevBookingStep = () => {
    setBookingStep(prev => Math.max(prev - 1, 1));
  };

  const openBookingModal = () => {
    setShowBookingModal(true);
  };
  
  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  const handleCtaOrderClick = () => {
    openBookingModal();
  };

  const updateBookingForm = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
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
    // Функция для форматирования даты в строку YYYY-MM-DD
    const formatDate = (dateValue) => {
      if (!dateValue) return null;
      
      // Если это уже строка в правильном формате
      if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return dateValue;
      }
      
      // Если это объект Date
      if (dateValue instanceof Date) {
        return dateValue.toISOString().split('T')[0];
      }
      
      // Попытаемся преобразовать в Date и затем в строку
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      
      return null;
    };

    // Функция для форматирования времени в строку HH:MM
    const formatTime = (timeValue) => {
      if (!timeValue) return null;
      
      // Если это уже строка в правильном формате
      if (typeof timeValue === 'string' && /^\d{2}:\d{2}$/.test(timeValue)) {
        return timeValue;
      }
      
      // Если это объект Date
      if (timeValue instanceof Date) {
        return timeValue.toTimeString().slice(0, 5);
      }
      
      // Если это строка времени в другом формате
      if (typeof timeValue === 'string') {
        const time = new Date(`2000-01-01T${timeValue}`);
        if (!isNaN(time.getTime())) {
          return time.toTimeString().slice(0, 5);
        }
      }
      
      return null;
    };

    // Правильно сформированные данные для отправки на бэкенд
    const bookingData = {
      // Обязательные поля
      name: bookingForm.clientName || '',
      phone: formatPhoneNumber(bookingForm.clientPhone),
      
      // Опциональные поля (используем правильные названия)
      email: bookingForm.clientEmail || null,
      service_id: selectedService?.id || null,
      event_date: formatDate(bookingForm.selectedDate),
      event_time: formatTime(bookingForm.selectedTime),
      guests_count: bookingForm.guestCount ? parseInt(bookingForm.guestCount) : null,
      budget: bookingForm.totalPrice ? bookingForm.totalPrice.toString() : null,
      location: bookingForm.location || null,
      message: 
        bookingForm.specialRequests
    };


    // Валидация перед отправкой
    if (!bookingData.name.trim()) {
      throw new Error('Имя обязательно для заполнения');
    }
    
    if (!bookingData.phone.trim()) {
      throw new Error('Телефон обязателен для заполнения');
    }

    // Отправляем бронирование на сервер
    const result = await apiService.createBooking(bookingData);
    
    if (result.success) {
      setBookingSuccess(true);
      setBookingStep(3);
      
      // Очищаем форму после успешной отправки
      setBookingForm({
        prev: bookingForm,
        selectedDate: null,
        selectedTime: null,
        selectedPackage: null,
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        guestCount: '',
        specialRequests: '',
        location: '',
        totalPrice: 0
      });
      
    } else {
      throw new Error(result.error || 'Ошибка при создании бронирования');
    }
    
  } catch (error) {
    console.error('Ошибка бронирования:', error);
    
    // Более детальная обработка ошибок
    let errorMessage = 'Произошла ошибка при бронировании';
    
    if (error.message.includes('400')) {
      errorMessage = 'Проверьте правильность заполнения всех полей';
    } else if (error.message.includes('401')) {
      errorMessage = 'Необходима авторизация';
    } else if (error.message.includes('500')) {
      errorMessage = 'Ошибка сервера. Попробуйте позже';
    } else {
      errorMessage = error.message;
    }
    
    alert(errorMessage);
    
  } finally {
    setIsSubmitting(false);
  }
};

  // Календарь (без изменений)
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

  // Обработчики клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedService && !showBookingForm) {
        if (e.key === 'Escape') closeServiceModal();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
      }
      if (showBookingForm && e.key === 'Escape') {
        closeBookingForm();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedService, showBookingForm, nextImage, prevImage, closeServiceModal]);

  // const handleCtaOrderClick = () => {
  //   setShowCategorySelect(true);
  // };

  // Компонент загрузки
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
      <p className="text-lg text-gray-600">Загружаем услуги...</p>
    </div>
  );

  // Компонент ошибки
  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ошибка загрузки</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button
        onClick={() => loadData()}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Попробовать снова
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && servicesData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage />
      </div>
    );
  }

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
                  {categories.length - 1}
                </motion.div>
                <div className="text-purple-100">Категорий услуг</div>
              </div>
              <div className="text-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl font-bold text-pink-300 mb-2"
                >
                  {servicesData.length}+
                </motion.div>
                <div className="text-purple-100">Услуг</div>
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
      <section className="py-8 bg-white shadow-sm top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Фильтры категорий */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.iconComponent;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name} ({category.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Переключатель вида и обновление */}
            <div className="flex items-center gap-3">
              {refreshing && <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />}
              
              <button
                // onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Обновить данные"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>

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
        </div>
      </section>

      {/* Сетка услуг */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    // Grid View
                    
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden flex-shrink-0">
                        <img
                          src={service.coverImage ? (service.coverImage != "" ? (service.coverImage) : service.images[0]) : service.images[0]}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                        
                        {/* Service Icon Overlay */}
                        <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          {service.icon}
                        </div>
                        
                        {/* Hover Icons */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <Eye className="w-6 h-6 text-gray-700" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span className="truncate">{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            <span className="truncate"> отзывов</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-1">
                            {[...Array(Math.floor(service.rating))].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">
                              {service.rating}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-purple-600">
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <>
                      <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden relative">
                        <img
                          src={service.coverImage ? (service.coverImage != "" ? (service.coverImage) : service.images[0]) : service.images[0]}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          
                        />
                        <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                          {React.cloneElement(service.icon, { className: "w-4 h-4" })}
                        </div>
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1 mr-4">
                            {service.title}
                          </h3>
                          {service.featured && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                              ТОП
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            <span>{service.reviews} отзывов</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(Math.floor(service.rating))].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                            <span>{service.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {service.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="text-lg font-bold text-purple-600">
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredServices.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Услуги не найдены
              </h3>
              <p className="text-gray-600">
                {activeFilter === 'all' 
                  ? 'В данный момент услуги недоступны. Попробуйте обновить страницу.'
                  : 'В этой категории пока нет услуг. Попробуйте выбрать другую категорию.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && !showBookingForm && (
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
              className="max-w-6xl w-full bg-white rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col lg:flex-row flex-1 min-h-0">
                {/* Images Section */}
                <div className="lg:w-2/3 relative flex-shrink-0">
                  <img
                    src={selectedService.images[currentImageIndex]}
                    alt={selectedService.title}
                    className="w-full h-64 sm:h-96 lg:h-full object-cover"
                  />
                  
                  {/* Navigation */}
                  {selectedService.images.length > 1 && (
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
                      
                      {/* Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedService.images.map((_, index) => (
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

                {/* Service Info */}
                <div className="lg:w-1/3 p-6 flex flex-col min-h-0 overflow-y-auto">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {selectedService.icon}
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 line-clamp-2">
                        {selectedService.title}
                      </h2>
                    </div>
                    <button
                      onClick={closeServiceModal}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-6 text-sm lg:text-base">
                    {selectedService.fullDescription}
                  </p>

                  {/* Service Details */}
                  <div className="space-y-3 mb-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">
                        Продолжительность: {selectedService.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <div className="flex items-center gap-1">
                        {[...Array(Math.floor(selectedService.rating))].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  {selectedService.features.length > 0 && (
                    <div className="mb-6 flex-shrink-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Что входит в услугу:</h4>
                      <div className="space-y-2">
                        {selectedService.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check size={16} className="text-green-500 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedService.tags.length > 0 && (
                    <div className="mb-6 flex-shrink-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Теги:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-600 text-xs lg:text-sm rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 flex-shrink-0">
                    <div className="text-sm text-gray-600 mb-1">Стоимость услуги:</div>
                    <div className="text-xl lg:text-2xl font-bold text-purple-600">
                      {selectedService.price}
                    </div>
                    {selectedService.priceDescription && (
                      <div className="text-sm text-gray-500">
                        {selectedService.priceDescription}
                      </div>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3 mt-auto">
                    <button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => openBookingForm(selectedService)}
                    >
                      Заказать услугу
                    </button>
                    <button className="w-full border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-xl font-medium hover:bg-purple-50 transition-colors">
                      Получить консультацию
                    </button>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                        <MessageCircle size={18} />
                        WhatsApp
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        <Phone size={18} />
                        Позвонить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Selection Modal */}
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
              <h3 className="text-xl font-bold mb-4 text-gray-900">Выберите категорию мероприятия</h3>
              <div className="space-y-3">
                {categories.filter(c => c.id !== 'all').map(category => (
                  <button
                    key={category.id}
                    className="w-full py-3 px-4 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold flex items-center gap-2 transition"
                    onClick={() => {
                      const service = servicesData.find(s => s.category === category.id);
                      if (service) {
                        openBookingForm(service);
                        setShowCategorySelect(false);
                      } else {
                        alert('В этой категории пока нет услуг');
                      }
                    }}
                  >
                    <category.iconComponent className="w-5 h-5" />
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

      {/* Booking Form Modal */}
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
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Бронирование услуги</h2>
                    <p className="text-purple-100">{selectedService?.title}</p>
                  </div>
                  <button
                    onClick={closeBookingForm}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="mt-6 flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        bookingStep >= step 
                          ? 'bg-white text-purple-600' 
                          : 'bg-white/20 text-white/60'
                      }`}>
                        {bookingSuccess && step === 3 ? <Check size={16} /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-0.5 mx-2 ${
                          bookingStep > step ? 'bg-white' : 'bg-white/20'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Выберите дату и время</h3>
                    
                    {/* Calendar */}
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
                                  ? 'bg-purple-600 text-white'
                                  : isToday
                                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                  : isCurrentMonth
                                  ? 'text-gray-900 hover:bg-purple-50'
                                  : 'text-gray-400 hover:bg-gray-100'
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Selection */}
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
                                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
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

                {bookingStep === 3 && (
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
                        
                        <div className="bg-purple-50 rounded-xl p-4">
                          <h4 className="font-semibold text-purple-900 mb-2">Детали заявки:</h4>
                          <div className="space-y-1 text-sm text-purple-700">
                            <p>Услуга: {selectedService?.title}</p>
                            <p>Дата: {new Date(bookingForm.prev.selectedDate).toLocaleDateString('ru-RU')}</p>
                            <p>Время: {bookingForm.prev.selectedTime}</p>
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
                              <span className="font-medium">{selectedService?.title}</span>
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
                                <span className="font-bold text-purple-600">
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

              {/* Navigation */}
              <div className="bg-gray-50 p-6 flex justify-between items-center flex-shrink-0">
                <button
                  onClick={bookingStep === 1 ? closeBookingForm : prevBookingStep}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  disabled={isSubmitting}
                >
                  {bookingStep === 1 ? 'Отмена' : 'Назад'}
                </button>

                <div className="flex gap-3">
                  {bookingStep < 3 && (
                    <button
                      onClick={bookingStep === 2 ? submitBooking : nextBookingStep}
                      disabled={
                        isSubmitting ||
                        (bookingStep === 1 && (!bookingForm.selectedDate || !bookingForm.selectedTime)) ||
                        (bookingStep === 2 && (!bookingForm.clientName || !bookingForm.clientPhone))
                      }
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Отправка...
                        </>
                      ) : bookingStep === 2 ? (
                        'Подтвердить заказ'
                      ) : (
                        'Далее'
                      )}
                    </button>
                  )}

                  {bookingStep === 3 && bookingSuccess && (
                    <button
                      onClick={closeBookingForm}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">вопросы</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ответы на самые популярные вопросы о наших услугах
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Как далеко заранее нужно бронировать мероприятие?",
                answer: "Рекомендуем бронировать за 2-4 недели до даты мероприятия. В пик сезона (май-сентябрь) желательно бронировать за 1-2 месяца."
              },
              {
                question: "Можно ли изменить детали заказа после бронирования?",
                answer: "Да, изменения возможны до 7 дней до мероприятия. Некоторые изменения могут повлиять на стоимость услуг."
              },
              {
                question: "Что включено в стоимость базового пакета?",
                answer: "Базовый пакет включает основные услуги согласно описанию. Дополнительные услуги оплачиваются отдельно и обговариваются при бронировании."
              },
              {
                question: "Работаете ли вы в выходные и праздничные дни?",
                answer: "Да, мы работаем 7 дней в неделю, включая праздники. В выходные и праздничные дни может действовать праздничная наценка."
              },
              {
                question: "Какие способы оплаты вы принимаете?",
                answer: "Принимаем наличные, банковские карты, банковские переводы. Возможна рассрочка платежа по договоренности."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
<section className="relative py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white overflow-hidden">
  {/* Animated Background */}
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
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Готовы создать свой <span className="text-yellow-200">незабываемый праздник?</span>
      </h2>
      <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
        Превратим любой день в особенный! Наша команда профессионалов сделает ваше мероприятие идеальным.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleCtaOrderClick}
        >
          Заказать услугу
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
        >
          Бесплатная консультация
        </motion.button>
      </div>

      {/* Contact Options */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        <div className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Phone className="w-8 h-8" />
          </motion.div>
          <h3 className="font-bold text-lg mb-2">Позвоните нам</h3>
          <p className="text-purple-100">{getCompanyPhone()}</p>
          <p className="text-sm text-purple-200">Ежедневно 9:00-21:00</p>
        </div>
        
        <div className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <svg 
              width="32" 
              height="32" 
              fill="white" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </motion.div>
          <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
          <p className="text-purple-100">Быстрый ответ 24/7</p>
          <p className="text-sm text-purple-200">{getWhatsappPhone()}</p>
        </div>
        
        <div className="text-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <MapPin className="w-8 h-8" />
          </motion.div>
          <h3 className="font-bold text-lg mb-2">Наш офис</h3>
          <p className="text-purple-100">
            {
              getCompanyAddress().split(',')[1] + 
                (getCompanyAddress().split(',').length > 2 ? 
                getCompanyAddress().split(',')[2] : '')
            }
          </p>
          <p className="text-sm text-purple-200">{getCompanyAddress().split(',')[0].includes('г') ? getCompanyAddress().split(',')[0] : getCompanyAddress().split(',')[1]}</p>
        </div>
      </motion.div>
    </motion.div>
  </div>

  {/* Floating Elements */}
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
    🎊
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
    🎉
  </motion.div>
  <motion.div
    animate={{
      x: [0, 15, 0],
      y: [0, -10, 0]
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute top-1/2 right-20 text-3xl opacity-25"
  >
    ✨
  </motion.div>
</section>

{/* Модальное окно бронирования */}
<BookingModal 
  isOpen={showBookingModal} 
  onClose={closeBookingModal} 
/>
</div>
);
};

export default ServicesPage;