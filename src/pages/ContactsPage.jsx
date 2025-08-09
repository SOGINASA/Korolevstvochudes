import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPhoneNumber } from '../utils/helpers';
import { apiService } from '../services/api';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  Calendar,
  User,
  Building2,
  Users,
  CheckCircle,
  Instagram,
  Globe,
  Navigation,
  Car,
  Bus,
  ArrowRight,
  Star,
  Heart,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const ContactsPage = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();
  const getCompanyName = () => settings?.company_name || 'Королевство Чудес';
  const getCompanyDescription = () => settings?.company_description || 'Праздничное агентство';
  const getCompanyPhone = () => settings?.company_phone || '+7 (7152) 123-456';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '+7 (7152) 123-456';
  const getCompanyEmail = () => settings?.company_email || 'info@prazdnikvdom.kz';
  const getCompanyAddress = () => settings?.company_address || 'г. Петропавловск, ул. Конституции, 15';
  const getWhatsAppPhone = () => settings?.whatsapp_phone || '+7 (777) 987-65-43';

  // Контактная информация
  const contactInfo = {
    workingHours: 'Ежедневно с 9:00 до 21:00'
  };

  // Офисы и локации
  const locations = [
    {
      id: 1,
      name: 'Главный офис',
      address: 'ул. Конституции, 15, офис 201',
      phone: '+7 (7152) 123-456',
      hours: '9:00 - 21:00',
      services: ['Консультации', 'Заключение договоров', 'Просмотр реквизита'],
      coordinates: { lat: 54.8684, lng: 69.1398 },
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Склад реквизита',
      address: 'ул. Промышленная, 42',
      phone: '+7 (7152) 123-457',
      hours: '10:00 - 18:00',
      services: ['Хранение костюмов', 'Подготовка реквизита', 'Выдача оборудования'],
      coordinates: { lat: 54.8584, lng: 69.1298 },
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Команда
  const team = [
    {
      id: 1,
      name: 'Анна Петрова',
      position: 'Директор компании',
      phone: '+7 (7152) 123-456',
      email: 'director@prazdnikvdom.kz',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b743?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      description: 'Опыт в event-индустрии более 10 лет'
    },
    {
      id: 2,
      name: 'Дмитрий Сидоров',
      position: 'Руководитель отдела',
      phone: '+7 (7152) 123-458',
      email: 'manager@prazdnikvdom.kz',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      description: 'Специалист по корпоративным мероприятиям'
    },
    {
      id: 3,
      name: 'Мария Иванова',
      position: 'Креативный директор',
      phone: '+7 (7152) 123-459',
      email: 'creative@prazdnikvdom.kz',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      description: 'Создает уникальные концепции праздников'
    }
  ];

  // Обработка формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        name: formData.name || '',
        phone: formatPhoneNumber(formData.phone),
        
        // Опциональные поля (используем правильные названия)
        email: formData.email || null,
        service_id: null,
        event_date: formatDate(formData.eventDate),
        event_time: null,
        guests_count: formData.guestCount ? parseInt(formData.guestCount) : null,
        budget: formData.budget ? formData.budget.toString() : null,
        location: null,
        message: formData.message || null,
      };

      // Валидация перед отправкой
      if (!formData.name.trim()) {
        throw new Error('Имя обязательно для заполнения');
      }
      
      if (!formData.phone.trim()) {
        throw new Error('Телефон обязателен для заполнения');
      }

      // Отправляем бронирование на сервер
      const result = await apiService.createBooking(bookingData);
      
      if (result.success) {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Очищаем форму после успешной отправки
        setFormData(prev => ({
          prev: prev,
          name: '',
          phone: '',
          email: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          budget: '',
          message: ''
        }));
        
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

  return (
    <>
      <Helmet>
        <title>Контакты - Королевство Чудес | Телефоны, адреса, как добраться в Петропавловске</title>
        <meta 
          name="description" 
          content={`Контакты праздничного агентства Королевство Чудес в Петропавловске: телефон ${getCompanyPhone()}, адрес ${getCompanyAddress()}, WhatsApp, email. Схема проезда и время работы.`}
        />
        <meta 
          name="keywords" 
          content="контакты праздничное агентство Петропавловск, телефон, адрес, как добраться, время работы" 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        {/* <div className="bg-white py-4 border-b border-gray-100">
          <div className="container-custom">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-primary-600 transition-colors">Главная</a>
              <span>/</span>
              <span className="text-primary-600 font-medium">Контакты</span>
            </nav>
          </div>
        </div> */}

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
                  Свяжитесь <span className="text-secondary-200">с нами</span>
                </h1>
                <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                  Готовы ответить на все ваши вопросы и помочь организовать незабываемый праздник. 
                  Выберите удобный способ связи!
                </p>

                {/* Быстрые контакты */}
                <div className="space-y-4 mb-8">
                  <motion.a
                    href={`tel:${settings.company_phone}`}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Позвонить сейчас</div>
                      <div className="text-primary-100">{settings.company_phone}</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`https://wa.me/${settings.whatsapp_phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Написать в WhatsApp</div>
                      <div className="text-primary-100">Быстрый ответ 24/7</div>
                    </div>
                  </motion.a>
                </div>

                {/* Время работы */}
                <div className="flex items-center gap-3 text-primary-100">
                  <Clock className="w-5 h-5" />
                  <span>{contactInfo.workingHours}</span>
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
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                    alt="Наш офис"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-primary-500" />
                        <div>
                          <div className="font-semibold text-gray-900">Наш офис</div>
                          <div className="text-sm text-gray-600">ул. Конституции, 15</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Плавающие элементы */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-secondary-400 rounded-full animate-bounce flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-400 rounded-full animate-pulse flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Табы навигации */}
        <section className="py-8 bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: 'contact', name: 'Связаться с нами', icon: Phone },
                { id: 'locations', name: 'Наши адреса', icon: MapPin },
                { id: 'team', name: 'Наша команда', icon: Users },
                { id: 'directions', name: 'Как добраться', icon: Navigation }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Контент табов */}
        <section className="py-16">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              {/* Таб: Связаться с нами */}
              {activeTab === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Форма обратной связи */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Оставьте заявку
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Расскажите о своем мероприятии, и мы свяжемся с вами в течение 15 минут
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Ваше имя *
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                              placeholder="Введите ваше имя"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Телефон *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                              placeholder="+7 (___) ___-__-__"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            placeholder="your@email.com"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Тип мероприятия
                            </label>
                            <select
                              name="eventType"
                              value={formData.eventType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Выберите тип</option>
                              <option value="children">Детский праздник</option>
                              <option value="wedding">Свадьба</option>
                              <option value="corporate">Корпоратив</option>
                              <option value="anniversary">Юбилей</option>
                              <option value="other">Другое</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Дата мероприятия
                            </label>
                            <input
                              type="date"
                              name="eventDate"
                              value={formData.eventDate}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Количество гостей
                            </label>
                            <select
                              name="guestCount"
                              value={formData.guestCount}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Выберите количество</option>
                              <option value="1-10">1-10 человек</option>
                              <option value="11-25">11-25 человек</option>
                              <option value="26-50">26-50 человек</option>
                              <option value="51-100">51-100 человек</option>
                              <option value="100+">Более 100 человек</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Бюджет
                            </label>
                            <select
                              name="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Выберите бюджет</option>
                              <option value="25000-50000">25,000 - 50,000 ₸</option>
                              <option value="50000-100000">50,000 - 100,000 ₸</option>
                              <option value="100000-200000">100,000 - 200,000 ₸</option>
                              <option value="200000+">Более 200,000 ₸</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Сообщение
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                            placeholder="Расскажите подробнее о вашем мероприятии..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                            isSubmitting
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'btn-primary hover:shadow-lg'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Отправляем...
                            </>
                          ) : (
                            <>
                              <Send size={20} />
                              Отправить заявку
                            </>
                          )}
                        </button>
                      </form>

                      {/* Уведомление об успешной отправке */}
                      <AnimatePresence>
                        {showSuccess && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl"
                          >
                            <div className="flex items-center gap-3 text-green-800">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Заявка отправлена!</span>
                            </div>
                            <p className="text-green-700 text-sm mt-1">
                              Мы свяжемся с вами в течение 15 минут
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Контактная информация */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Контактная информация
                      </h2>

                      <div className="space-y-6">
                        {/* Телефон */}
                        <motion.div
                          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                              <Phone className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Телефон</h3>
                              <a href={`tel:${settings.company_phone}`} className="text-primary-600 hover:text-primary-700">
                                {settings.company_phone}
                              </a>
                              <p className="text-sm text-gray-600">Звонки принимаем с 9:00 до 21:00</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                              <Mail className="w-6 h-6 text-secondary-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Email</h3>
                              <a href={`mailto:${settings.company_email}`} className="text-secondary-600 hover:text-secondary-700">
                                {settings.company_email}
                              </a>
                              <p className="text-sm text-gray-600">Ответим в течение 2 часов</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Адрес */}
                        <motion.div
                          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-accent-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Адрес офиса</h3>
                              <p className="text-accent-600">{getCompanyAddress()}</p>
                              <p className="text-sm text-gray-600">У нас есть несколько отделений</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Социальные сети */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                          <h3 className="font-semibold text-gray-900 mb-4">Мы в социальных сетях</h3>
                          <div className="flex gap-4">
                            <a
                              href={`${settings.social_instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                            >
                              <Instagram size={24} />
                            </a>
                            <a
                              href={`https://wa.me/${settings.whatsapp_phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                            >
                              <MessageCircle size={24} />
                            </a>
                            <a
                              href={`https://${contactInfo.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                            >
                              <Globe size={24} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Таб: Наши адреса */}
              {activeTab === 'locations' && (
                <motion.div
                  key="locations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="heading-2 text-gray-900 mb-4">
                      Наши <span className="gradient-text">адреса</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                      Удобные локации для встреч и консультаций
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    >
                      <div className="relative h-48">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-lg font-semibold text-white">{location.name}</h3>
                          <p className="text-sm text-gray-200">{location.address}</p>
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone size={16} />
                          <a href={`tel:${location.phone}`} className="hover:text-primary-600">
                            {location.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock size={16} />
                          <span>{location.hours}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {location.services.map((service) => (
                            <span
                              key={service}
                              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary-600 font-medium hover:underline"
                        >
                          <Navigation size={16} />
                          Построить маршрут
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              )}

              {/* Таб: Наша команда */}
              {activeTab === 'team' && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="heading-2 text-gray-900 mb-4">
                      Наша <span className="gradient-text">команда</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                      Профессионалы, готовые воплотить ваши идеи в реальность
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-6 space-y-3">
                          <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-secondary-600">{member.position}</p>
                          <p className="text-gray-700 text-sm">{member.description}</p>
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                              <User size={16} />
                              <span>{member.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Phone size={16} />
                              <a href={`tel:${member.phone}`} className="hover:text-secondary-600">
                                {member.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Mail size={16} />
                              <a href={`mailto:${member.email}`} className="hover:text-secondary-600">
                                {member.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Таб: Как добраться */}
              {activeTab === 'directions' && (
                <motion.div
                  key="directions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="heading-2 text-gray-900 mb-4">
                      Как <span className="gradient-text">добраться</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                      Выберите удобную для вас локацию и проложите маршрут
                    </p>
                  </div>
                  <div className="space-y-8">
                    {locations.map((location) => (
                      <div key={location.id} className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-shrink-0">
                          <MapPin size={32} className="text-accent-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                          <p className="text-gray-700">{location.address}</p>
                        </div>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 btn-primary"
                        >
                          <Car size={16} />
                          На машине
                        </a>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}&travelmode=transit`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 btn-secondary"
                        >
                          <Bus size={16} />
                          На общественном транспорте
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactsPage;
