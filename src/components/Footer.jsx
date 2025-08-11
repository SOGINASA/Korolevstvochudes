import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  MessageCircle,
  Send
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();
  const getWhatsappPhone = () => settings?.whatsapp_phone || '+7 (7152) 123-456';
  const getCompanyPhone = () => settings?.company_phone || '+7 (7152) 123-456';
  const getCompanyEmail = () => settings?.company_email || 'info@prazdnikvdom.kz';
  const getCompanyAddress = () => settings?.company_address || 'г. Петропавловск, ул. Конституции, 15';
  const services = [
    { name: 'Детские праздники', path: '/uslugi/detskie-prazdniki' },
    { name: 'Свадьбы', path: '/uslugi/svadby' },
    { name: 'Корпоративы', path: '/uslugi/korporativy' },
    { name: 'Юбилеи', path: '/uslugi/yubilei-torzhestva' },
    { name: 'Шоу-программы', path: '/uslugi/shou-programmy' },
  ];

  const company = [
    { name: 'О компании', path: '/o-kompanii' },
    { name: 'Портфолио', path: '/portfolio' },
    { name: 'Отзывы', path: '/otzyvy-klientov' },
    { name: 'Блог', path: '/blog' },
    { name: 'Контакты', path: '/kontakty' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Основная часть футера */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">КЧ</span>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">
                  Королевство Чудес
                </h3>
                <p className="text-sm text-gray-400">Праздничное агентство</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Создаем незабываемые праздники в Петропавловске уже более 7 лет. 
              Доверьте нам организацию вашего особенного дня!
            </p>

            {/* Социальные сети */}
            <div className="flex space-x-4">
              <a 
                href={settings.social_instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-primary-300">Услуги</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-primary-300 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-secondary-300">Компания</h3>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-secondary-300 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent-300">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+77152123456" 
                    className="text-gray-300 hover:text-accent-300 transition-colors duration-200"
                  >
                    {getCompanyPhone()}
                  </a>
                  <p className="text-sm text-gray-400">Основной номер</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:info@prazdnikvdom.kz"
                    className="text-gray-300 hover:text-accent-300 transition-colors duration-200"
                  >
                    {getCompanyEmail()}
                  </a>
                  <p className="text-sm text-gray-400">Для заявок</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    {getCompanyAddress()}
                  </p>
                  <p className="text-sm text-gray-400">Офис</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Ежедневно</p>
                  <p className="text-gray-300">с 9:00 до 21:00</p>
                  <p className="text-sm text-gray-400">Время работы</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Королевство Чудес. Все права защищены.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                Политика конфиденциальности
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Плавающая кнопка заказа */}
      <Link
        to={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
        className="fixed bottom-6 right-6 z-50 btn-primary shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
      >
        <Phone size={20} />
        <span className="hidden sm:inline">Заказать звонок</span>
      </Link>
    </footer>
  );
};

export default Footer;