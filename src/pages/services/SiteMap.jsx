import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Home, 
  Users, 
  Sparkles, 
  Calendar,
  Award,
  Phone,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const SitemapPage = () => {
  const sitemapSections = [
    {
      title: 'Основные страницы',
      icon: Home,
      color: 'purple',
      links: [
        { path: '/', label: 'Главная страница' },
        { path: '/o-nas', label: 'О нас' },
        { path: '/ceny', label: 'Цены' },
        { path: '/otzyvy', label: 'Отзывы' },
        { path: '/kejsy', label: 'Портфолио / Кейсы' },
        { path: '/blog', label: 'Блог' },
        { path: '/kontakty', label: 'Контакты' },
        { path: '/faq', label: 'Часто задаваемые вопросы' },
      ]
    },
    {
      title: 'Аниматоры в Петропавловске',
      icon: Users,
      color: 'blue',
      links: [
        { path: '/animatory-petropavlovsk', label: 'Аниматоры в Петропавловске' },
        { path: '/animatory-na-den-rozhdeniya', label: 'Аниматоры на день рождения' },
        { path: '/animatory-dlya-detej', label: 'Аниматоры для детей' },
        { path: '/animatory-v-detskij-sad', label: 'Аниматоры в детский сад' },
        { path: '/animatory-v-shkolu', label: 'Аниматоры в школу' },
        { path: '/animator-na-dom', label: 'Аниматор на дом' },
        { path: '/animator-v-kafe', label: 'Аниматор в кафе' },
      ]
    },
    {
      title: 'Персонажи',
      icon: Sparkles,
      color: 'pink',
      links: [
        { path: '/personazhi', label: 'Все персонажи' },
        { path: '/spajder-men-animator', label: 'Спайдер-мен аниматор' },
        { path: '/elsa-anna-holodnoe-serdce', label: 'Эльза и Анна (Холодное сердце)' },
        { path: '/barboskiny-animatory', label: 'Барбоскины аниматоры' },
        { path: '/transformery-animator', label: 'Трансформеры аниматор' },
        { path: '/princessy-disnej', label: 'Принцессы Диснея' },
        { path: '/edinorog-animator', label: 'Единорог аниматор' },
      ]
    },
    {
      title: 'Шоу-программы',
      icon: Award,
      color: 'yellow',
      links: [
        { path: '/shou-programmy', label: 'Все шоу-программы' },
        { path: '/bumazhnoe-shou', label: 'Бумажное шоу' },
        { path: '/shou-mylnyh-puzyrej', label: 'Шоу мыльных пузырей' },
        { path: '/nauchnoe-shou', label: 'Научное шоу' },
        { path: '/shou-slaymov', label: 'Шоу слаймов' },
        { path: '/krioshou', label: 'Криошоу' },
      ]
    },
    {
      title: 'Праздники и поводы',
      icon: Calendar,
      color: 'green',
      links: [
        { path: '/prazdniki', label: 'Все праздники' },
        { path: '/den-rozhdeniya-rebenka', label: 'День рождения ребенка' },
        { path: '/vypusknoj-detskij-sad', label: 'Выпускной в детском саду' },
        { path: '/vypusknoj-4-klass', label: 'Выпускной 4 класс' },
        { path: '/novyj-god-dlya-detej', label: 'Новый год для детей' },
        { path: '/utrenniki', label: 'Утренники' },
        { path: '/prazdnik-pod-klyuch', label: 'Праздник под ключ' },
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        hover: 'hover:text-purple-600'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        hover: 'hover:text-blue-600'
      },
      pink: {
        bg: 'bg-pink-100',
        text: 'text-pink-600',
        hover: 'hover:text-pink-600'
      },
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        hover: 'hover:text-yellow-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        hover: 'hover:text-green-600'
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Карта сайта | Королевство Чудес - Аниматоры в Петропавловске</title>
        <meta name="description" content="Полная карта сайта агентства праздников Королевство Чудес. Все страницы и услуги по организации детских праздников в Петропавловске." />
        <meta name="keywords" content="карта сайта, sitemap, аниматоры, праздники, Петропавловск" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Карта сайта
            </h1>
            <p className="text-xl text-purple-100">
              Все страницы и услуги нашего агентства в одном месте
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sitemapSections.map((section, index) => {
                const IconComponent = section.icon;
                const colors = getColorClasses(section.color);
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mr-4`}>
                        <IconComponent className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                    
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.path}
                            className={`flex items-center text-gray-600 ${colors.hover} transition-all hover:translate-x-1`}
                          >
                            <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="hover:underline">{link.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Не нашли нужную страницу?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Свяжитесь с нами, и мы поможем найти нужную информацию или услугу
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/kontakty"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Связаться с нами
                </a>
                <a
                  href="/faq"
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors border border-purple-200"
                >
                  <HelpCircle className="w-5 h-5 mr-2" />
                  FAQ
                </a>
              </div>
            </div>

            {/* SEO Text */}
            <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                О карте сайта агентства "Королевство Чудес"
              </h2>
              
              <p className="text-gray-600 mb-4">
                Карта сайта поможет вам быстро найти нужную информацию о наших услугах по организации праздников в Петропавловске. Мы предлагаем широкий спектр услуг: от аниматоров на детские дни рождения до организации выпускных в детских садах и школах.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Наши основные услуги
              </h3>
              
              <p className="text-gray-600 mb-4">
                <strong>Аниматоры в Петропавловске</strong> - профессиональные актеры в костюмах популярных персонажей для детских праздников. Работаем на дому, в кафе, детских садах и школах.
              </p>

              <p className="text-gray-600 mb-4">
                <strong>Шоу-программы</strong> - зрелищные научные шоу, бумажное шоу, шоу мыльных пузырей и другие интерактивные программы для детей всех возрастов.
              </p>

              <p className="text-gray-600 mb-4">
                <strong>Организация праздников</strong> - комплексная организация дней рождения, выпускных, новогодних утренников и других детских мероприятий под ключ.
              </p>

              <p className="text-gray-600">
                Все наши услуги адаптированы под разные возрастные группы и проводятся профессиональными аниматорами с большим опытом работы с детьми.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Готовы заказать праздник?</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами в течение 15 минут
          </p>
          <a 
            href="/kontakty" 
            className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Заказать праздник
          </a>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;