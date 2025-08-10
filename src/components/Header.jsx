import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Clock,
  MessageCircle,
  Loader2,
  Star,
  Baby,
  HeartHandshake,
  Building2,
  Users,
  Zap,
  Camera,
  Palette,
  Cake,
  Gift,
  Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../services/api';
import { formatPhoneNumber } from '../utils/helpers';
import { useSettings, useCompanyInfo } from '../contexts/SettingsContext';
import BookingModal from './BookingModal';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  
  const location = useLocation();
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();
  const getCompanyName = () => settings?.company_name || 'Королевство Чудес';
  const getCompanyDescription = () => settings?.company_description || 'Праздничное агентство';
  const getCompanyPhone = () => settings?.company_phone || '+7 (7152) 123-456';
  const getCompanyEmail = () => settings?.company_email || 'info@prazdnikvdom.kz';
  const getCompanyAddress = () => settings?.company_address || 'г. Петропавловск, ул. Конституции, 15';
  const getWhatsAppPhone = () => settings?.whatsapp_phone || '+7 (777) 987-65-43';

  // Функции для работы с модалом бронирования (как в HeroSection)
  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setShowCategorySelect(false);
  };

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

  // Категории услуг (сохраняем для старого стиля выбора категории)
  const categories = [
    { 
      id: 'children', 
      name: 'Детские праздники', 
      icon: <Baby className="w-6 h-6 text-purple-600" />,
    },
    { 
      id: 'weddings', 
      name: 'Свадьбы', 
      icon: <HeartHandshake className="w-6 h-6 text-pink-600" />,
    },
    { 
      id: 'corporate', 
      name: 'Корпоративы', 
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
    },
    { 
      id: 'anniversaries', 
      name: 'Юбилеи', 
      icon: <Cake className="w-6 h-6 text-yellow-600" />,
    },
    { 
      id: 'shows', 
      name: 'Шоу-программы', 
      icon: <Zap className="w-6 h-6 text-orange-600" />,
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Функции для работы с выбором категории (сохраняем старый стиль)
  const openCategorySelect = () => {
    setShowCategorySelect(true);
    document.body.style.overflow = 'hidden';
  };

  const selectCategory = (category) => {
    setShowCategorySelect(false);
    setShowBookingModal(true);
  };

  const closeCategorySelect = () => {
    setShowCategorySelect(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((showBookingModal || showCategorySelect) && e.key === 'Escape') {
        if (showCategorySelect) {
          closeCategorySelect();
        } else {
          closeBookingModal();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showBookingModal, showCategorySelect]);

  return (
    <>
      {/* Верхняя полоса с контактами */}
      <div className="bg-primary-600 text-white text-sm py-2 hidden lg:block">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>{getCompanyPhone()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>{getCompanyEmail()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>{getCompanyAddress()}</span>
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

      {/* Модальное окно выбора категории (сохраняем старый стиль) */}
      <AnimatePresence>
        {showCategorySelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
            onClick={closeCategorySelect}
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
                  onClick={closeCategorySelect}
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
                    <div className="w-8 h-8 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <span className="flex-1 text-left">{category.name}</span>
                    <ChevronDown size={16} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 justify-center">
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  <p className="text-sm text-gray-600 text-center">
                    Не знаете что выбрать? Наш менеджер поможет определиться с типом праздника и составить индивидуальную программу
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно бронирования (как в HeroSection) */}
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={closeBookingModal} 
      />
    </>
  );
};

export default Header;