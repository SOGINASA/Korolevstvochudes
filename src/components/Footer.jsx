import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  MessageCircle
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();
  
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getCompanyEmail = () => settings?.company_email || 'info@prazdnikvdom.kz';
  const getCompanyAddress = () => settings?.company_address || 'г. Петропавловск, ул. Конституции, 15';

  const mainLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Аниматоры', path: '/animatory-petropavlovsk' },
    { name: 'Персонажи', path: '/personazhi' },
    { name: 'Цены', path: '/ceny' },
    { name: 'Отзывы', path: '/otzyvy' },
    { name: 'Контакты', path: '/kontakty' },
    { name: 'Карта сайта', path: '/sitemap' },
  ];

  const services = [
    { name: 'Аниматоры на день рождения', path: '/animatory-na-den-rozhdeniya' },
    { name: 'Аниматоры для детей', path: '/animatory-dlya-detej' },
    { name: 'Аниматоры в детский сад', path: '/animatory-v-detskij-sad' },
    { name: 'Аниматоры в школу', path: '/animatory-v-shkolu' },
    { name: 'Шоу-программы', path: '/shou-programmy' },
  ];

  const company = [
    { name: 'О нас', path: '/o-nas' },
    { name: 'Кейсы', path: '/kejsy' },
    { name: 'Блог', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Основная часть футера */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">КЧ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Королевство Чудес
                </h3>
                <p className="text-sm text-gray-400">Праздничное агентство</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Агентство «Королевство Чудес» — организация детских праздников в Петропавловске. 
              Создаем незабываемые праздники уже более 7 лет!
            </p>

            {/* Социальные сети */}
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/korolevstvochudes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <svg 
                  width="20" 
                  height="20" 
                  fill="white" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <svg 
                  width="20" 
                  height="20" 
                  fill="white" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-purple-300">Наши услуги</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-purple-300 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-pink-300">Компания</h3>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-pink-300 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-300">Контакты</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href={`tel:${getCompanyPhone().replace(/\D/g, '')}`}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-200"
                  >
                    {getCompanyPhone()}
                  </a>
                  <p className="text-sm text-gray-400">Основной номер</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href={`mailto:${getCompanyEmail()}`}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-200"
                  >
                    {getCompanyEmail()}
                  </a>
                  <p className="text-sm text-gray-400">Для заявок</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    {getCompanyAddress()}
                  </p>
                  <p className="text-sm text-gray-400">Офис</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
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
        <div className="container mx-auto px-4 py-6">
          {/* Главные ссылки */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm">
            {mainLinks.map((link, index) => (
              <React.Fragment key={index}>
                <Link 
                  to={link.path}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
                {index < mainLinks.length - 1 && (
                  <span className="text-gray-600">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Копирайт */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <div className="text-center md:text-left">
              <p>© {currentYear} Королевство Чудес. Все права защищены.</p>
              <p className="text-xs mt-1">
                Агентство «Королевство Чудес» — организация детских праздников в Петропавловске
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span>Сделано</span>
              <a 
                href="https://sunity.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
              >
                Sunity.kz
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Плавающая кнопка WhatsApp */}
      <a
        href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </footer>
  );
};

export default Footer;