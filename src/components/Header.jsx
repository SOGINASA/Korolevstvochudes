import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    selectedDate: '',
    selectedTime: '',
    selectedPackage: 'Базовый',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    guestCount: '',
    specialRequests: '',
    totalPrice: 0,
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const location = useLocation();

  // Отслеживание скролла для изменения стиля хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие мобильного меню при смене маршрута
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Портфолио', path: '/portfolio' },
    { name: 'Услуги', path: '/uslugi' },
    { name: 'Отзывы', path: '/otzyvy-klientov' },
    { name: 'О нас', path: '/o-kompanii' },
    { name: 'Контакты', path: '/kontakty' },
  ];

  // Категории и проекты для бронирования
  const categories = [
    { 
      id: 'children', 
      name: 'Детские праздники', 
      emoji: '🎈',
      packages: [
        { name: 'Базовый', price: '85,000 ₸', features: ['2 аниматора', '2 часа программы', 'Аквагрим', 'Игры', 'Фотозона'] },
        { name: 'Стандарт', price: '120,000 ₸', features: ['3 аниматора', '3 часа программы', 'Шоу мыльных пузырей', 'Фотограф', 'Тематический декор'] },
        { name: 'Премиум', price: '180,000 ₸', features: ['4 аниматора', '4 часа программы', 'Кукольный театр', 'Видеосъемка', 'Торт в подарок'] }
      ]
    },
    { 
      id: 'wedding', 
      name: 'Свадьбы', 
      emoji: '💕',
      packages: [
        { name: 'Камерная', price: '400,000 ₸', features: ['Ведущий', 'Звуковое оформление', 'Декор', 'Фотограф'] },
        { name: 'Классическая', price: '650,000 ₸', features: ['Полный день', 'Живая музыка', 'Видеосъемка', 'Флористика', 'Выездная церемония'] },
        { name: 'Роскошная', price: '850,000 ₸', features: ['VIP сервис', 'Фейерверк', 'Лимузин', 'Премиум локация', 'Банкет'] }
      ]
    },
    { 
      id: 'corporate', 
      name: 'Корпоративы', 
      emoji: '🏢',
      packages: [
        { name: 'Базовый', price: '200,000 ₸', features: ['Ведущий', 'Звуковое оформление', 'Развлечения', 'Фуршет'] },
        { name: 'Бизнес', price: '320,000 ₸', features: ['Тимбилдинг', 'Конкурсы', 'Фотограф', 'Банкет'] },
        { name: 'Премиум', price: '450,000 ₸', features: ['VIP программа', 'Артисты', 'Видеосъемка', 'Подарки сотрудникам'] }
      ]
    },
    { 
      id: 'anniversary', 
      name: 'Юбилеи', 
      emoji: '🎂',
      packages: [
        { name: 'Семейный', price: '150,000 ₸', features: ['Ведущий-тамада', 'Музыкальное сопровождение', 'Декор', 'Фотограф'] },
        { name: 'Торжественный', price: '220,000 ₸', features: ['Живая музыка', 'Артисты', 'Видеосъемка', 'Подарки'] },
        { name: 'Роскошный', price: '280,000 ₸', features: ['Полный сервис', 'VIP декор', 'Шоу-программа', 'Сюрпризы'] }
      ]
    },
    { 
      id: 'show', 
      name: 'Шоу-программы', 
      emoji: '🎭',
      packages: [
        { name: 'Базовое шоу', price: '180,000 ₸', features: ['20 минут шоу', '2 артиста', 'Базовый реквизит', 'Страховка'] },
        { name: 'Расширенное', price: '250,000 ₸', features: ['30 минут шоу', '3 артиста', 'Спецэффекты', 'Костюмы'] },
        { name: 'Премиум', price: '320,000 ₸', features: ['45 минут шоу', '4 артиста', 'Полная программа', 'Фото/видео'] }
      ]
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Функции для бронирования
  const openCategorySelect = () => {
    setShowCategorySelect(true);
    document.body.style.overflow = 'hidden';
  };

  const selectCategory = (category) => {
    const selectedCategory = categories.find(c => c.id === category.id);
    setSelectedProject({
      title: category.name,
      category: category.id,
      packages: selectedCategory.packages
    });
    setBookingForm(prev => ({
      ...prev,
      selectedPackage: selectedCategory.packages[0].name,
      totalPrice: parseFloat(selectedCategory.packages[0].price.replace(/[^\d]/g, '')),
      category: category.id
    }));
    setShowCategorySelect(false);
    setBookingStep(1);
    setShowBookingForm(true);
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setShowCategorySelect(false);
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
      // Имитация отправки данных
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBookingSuccess(true);
      setBookingStep(4);
      
    } catch (error) {
      console.error('Ошибка бронирования:', error);
      alert('Произошла ошибка при бронировании. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
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
      if ((showBookingForm || showCategorySelect) && e.key === 'Escape') {
        closeBookingForm();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showBookingForm, showCategorySelect]);

  return (
    <>
      {/* Верхняя полоса с контактами */}
      <div className="bg-primary-600 text-white text-sm py-2 hidden lg:block">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+7 (7152) 123-456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>info@prazdnikvdom.kz</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>г. Петропавловск, ул. Конституции, 15</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-secondary-300">Работаем ежедневно с 9:00 до 21:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Основной хедер */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Логотип */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">КЧ</span>
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-gray-900">
                  Королевство Чудес
                </h1>
                <p className="text-sm text-gray-600">Праздничное агентство</p>
              </div>
            </Link>

            {/* Десктопное меню */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                        onMouseEnter={() => setActiveDropdown(index)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                            onMouseLeave={() => setActiveDropdown(null)}
                          >
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                to={child.path}
                                className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 ${
                        location.pathname === item.path ? 'text-primary-600' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA кнопка и мобильное меню */}
            <div className="flex items-center space-x-4">
              <button
                onClick={openCategorySelect}
                className="hidden md:inline-flex btn-primary"
              >
                Заказать праздник
              </button>
              
              {/* Мобильная кнопка меню */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Мобильное меню */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container-custom py-4">
                <nav className="space-y-4">
                  {navItems.map((item, index) => (
                    <div key={index}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => handleDropdown(index)}
                            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                          >
                            <span>{item.name}</span>
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform duration-200 ${
                                activeDropdown === index ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          <AnimatePresence>
                            {activeDropdown === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 ml-4 space-y-2"
                              >
                                {item.children.map((child, childIndex) => (
                                  <Link
                                    key={childIndex}
                                    to={child.path}
                                    className="block text-gray-600 hover:text-primary-600 transition-colors duration-200"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={`block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 ${
                            location.pathname === item.path ? 'text-primary-600' : ''
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  <button
                    onClick={openCategorySelect}
                    className="block w-full text-center btn-primary mt-6"
                  >
                    Заказать праздник
                  </button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Модальное окно выбора категории */}
      <AnimatePresence>
        {showCategorySelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
            onClick={closeBookingForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Выберите тип праздника</h3>
                <button
                  onClick={closeBookingForm}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className="w-full py-4 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold flex items-center gap-3 transition-colors group"
                    onClick={() => selectCategory(category)}
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="flex-1 text-left">{category.name}</span>
                    <ChevronDown size={16} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  💡 Не знаете что выбрать? Наш менеджер поможет определиться с типом праздника и составить индивидуальную программу
                </p>
              </div>
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
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Бронирование праздника</h2>
                    <p className="text-purple-100">{selectedProject?.title}</p>
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
                          ? 'bg-white text-purple-600' 
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
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Выберите пакет услуг</h3>
                    
                    <div className="grid gap-4">
                      {selectedProject?.packages?.map((pkg, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                            bookingForm.selectedPackage === pkg.name
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                          onClick={() => selectPackage(pkg)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">{pkg.name}</h4>
                            <div className="text-xl font-bold text-purple-600">{pkg.price}</div>
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
                      ))}
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Контактная информация</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Имя *
                        </label>
                        <input
                          type="text"
                          value={bookingForm.clientName}
                          onChange={(e) => updateBookingForm('clientName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Ваше имя"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          value={bookingForm.clientPhone}
                          onChange={(e) => updateBookingForm('clientPhone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="+7 (___) ___-__-__"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={bookingForm.clientEmail}
                          onChange={(e) => updateBookingForm('clientEmail', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Количество гостей
                        </label>
                        <input
                          type="number"
                          value={bookingForm.guestCount}
                          onChange={(e) => updateBookingForm('guestCount', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Особые пожелания
                      </label>
                      <textarea
                        value={bookingForm.specialRequests}
                        onChange={(e) => updateBookingForm('specialRequests', e.target.value)}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Расскажите о ваших пожеланиях к празднику..."
                      />
                    </div>
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
                        
                        <div className="bg-purple-50 rounded-xl p-4">
                          <h4 className="font-semibold text-purple-900 mb-2">Детали заявки:</h4>
                          <div className="space-y-1 text-sm text-purple-700">
                            <p>Услуга: {selectedProject?.title}</p>
                            <p>Дата: {bookingForm.selectedDate ? new Date(bookingForm.selectedDate).toLocaleDateString('ru-RU') : '-'}</p>
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
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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
    </>
  );
};

export default Header;