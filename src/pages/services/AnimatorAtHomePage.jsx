import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home,
  Phone, 
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  Users,
  Gift,
  Package,
  ShieldCheck,
  Smile
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const AnimatorAtHomePage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '+7 (7152) 123-456';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '+7 (777) 987-65-43';

  const advantages = [
    {
      icon: Home,
      title: 'Комфортная обстановка',
      description: 'Ребенок чувствует себя уверенно в знакомой домашней обстановке'
    },
    {
      icon: Clock,
      title: 'Удобное время',
      description: 'Вы сами выбираете время начала праздника, не подстраиваясь под заведение'
    },
    {
      icon: Users,
      title: 'Без ограничений по гостям',
      description: 'Пригласите столько друзей, сколько хотите'
    },
    {
      icon: Gift,
      title: 'Свое меню',
      description: 'Готовьте угощения по своему вкусу, учитывая предпочтения детей'
    },
    {
      icon: Package,
      title: 'Весь реквизит с собой',
      description: 'Аниматор приезжает со всем необходимым оборудованием и костюмами'
    },
    {
      icon: ShieldCheck,
      title: 'Безопасность',
      description: 'Вы контролируете ситуацию и знаете, что ребенок в безопасности'
    }
  ];

  const howItWorks = [
    {
      number: '1',
      title: 'Заявка',
      description: 'Вы оставляете заявку по телефону или в WhatsApp'
    },
    {
      number: '2',
      title: 'Подбор программы',
      description: 'Обсуждаем возраст детей, количество гостей и выбираем персонажа'
    },
    {
      number: '3',
      title: 'Подготовка',
      description: 'Уточняем адрес, время и особенности проведения'
    },
    {
      number: '4',
      title: 'Праздник',
      description: 'Аниматор приезжает вовремя и проводит яркую программу'
    }
  ];

  const popularCharacters = [
    'Человек-паук',
    'Эльза и Анна',
    'Единорог',
    'Барбоскины',
    'Принцессы Disney',
    'Трансформеры'
  ];

  const whatWeNeed = [
    'Свободное пространство 2x3 метра для игр',
    'Возможность включить музыку (колонка или музыкальный центр)',
    'Стол для реквизита',
    'Хорошее освещение'
  ];

  const programFeatures = [
    'Игры и конкурсы адаптированы для домашних условий',
    'Активности безопасны для квартиры',
    'Программа учитывает возраст всех детей',
    'Длительность от 1 до 3 часов на выбор',
    'Можно добавить шоу-программы',
    'Фотосессия с персонажем включена'
  ];

  return (
    <>
      <Helmet>
        <title>Аниматор на дом в Петропавловске | Заказать аниматора домой</title>
        <meta 
          name="description" 
          content="Закажите аниматора на дом в Петропавловске. Проведем детский праздник у вас дома с любимыми персонажами. Выезд со всем реквизитом. Цены от 15 000 ₸." 
        />
        <meta 
          name="keywords" 
          content="аниматор на дом, аниматор домой, детский праздник дома, аниматоры Петропавловск" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/animator-na-dom/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Home className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Аниматор на дом в Петропавловске
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-100 mb-8">
                Устроим незабываемый праздник у вас дома с любимыми персонажами
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/animatory-dlya-detej"
                  className="btn-primary bg-white text-purple-600 hover:bg-gray-100"
                >
                  Выбрать аниматора
                </Link>
                <Link 
                  to="/ceny" 
                  className="btn-outline border-white text-white hover:bg-white hover:text-purple-600"
                >
                  Узнать цены
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Основной текст */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Аниматор на дом — это удобный формат детского праздника, когда профессиональный ведущий 
                  в костюме любимого персонажа приезжает к вам домой и проводит яркую программу. 
                  Агентство «Королевство Чудес» организует праздники на дому в Петропавловске для детей 
                  от 3 до 12 лет.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Мы приезжаем со всем необходимым реквизитом, костюмами и музыкой. Вам нужно только 
                  подготовить пространство для игр и пригласить гостей.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества проведения дома */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Почему праздник дома — это удобно
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Домашний праздник имеет множество преимуществ перед проведением в кафе или центре
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <advantage.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
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

        {/* Как это работает */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Как заказать аниматора на дом
            </h2>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                {howItWorks.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Популярные персонажи */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Популярные персонажи для праздника дома
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {popularCharacters.map((character, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center border border-purple-100 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {character}
                  </h3>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/personazhi"
                className="inline-flex items-center gap-2 btn-primary"
              >
                Все персонажи
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Что нужно подготовить */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                Что нужно подготовить дома
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Для комфортного проведения праздника вам понадобится минимальная подготовка
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {whatWeNeed.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="flex items-start gap-4">
                  <Smile className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Не переживайте!</h3>
                    <p className="text-gray-700">
                      Если чего-то нет — это не проблема. Мы адаптируем программу под ваши условия. 
                      Главное — желание устроить праздник!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Что входит в программу */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Что входит в программу
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {programFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Стоимость */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Стоимость аниматора на дом
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Цена от 15 000 ₸. Стоимость зависит от выбранного персонажа, продолжительности 
                и дополнительных услуг (шоу-программы, второй аниматор).
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
                  <div className="text-4xl font-bold text-purple-600 mb-2">от 15 000 ₸</div>
                  <div className="text-gray-600 mb-4">1-1.5 часа</div>
                  <div className="text-sm text-gray-700">Базовая программа с одним персонажем</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-500">
                  <div className="inline-block bg-purple-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                    ПОПУЛЯРНО
                  </div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">от 25 000 ₸</div>
                  <div className="text-gray-600 mb-4">2-2.5 часа</div>
                  <div className="text-sm text-gray-700">Расширенная программа + игры</div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
                  <div className="text-4xl font-bold text-purple-600 mb-2">от 40 000 ₸</div>
                  <div className="text-gray-600 mb-4">3+ часа</div>
                  <div className="text-sm text-gray-700">Премиум программа + шоу</div>
                </div>
              </div>

              <Link to="/ceny" className="btn-primary inline-flex items-center gap-2">
                Подробнее о ценах
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Отзывы о праздниках на дому
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              Родители отмечают удобство домашнего формата и профессионализм наших аниматоров
            </p>
            <div className="text-center">
              <Link
                to="/otzyvy"
                className="btn-outline inline-flex items-center gap-2"
              >
                Смотреть все отзывы
                <Star className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Закажите аниматора на дом
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Свяжитесь с нами — подберем персонажа и программу для праздника у вас дома
              </p>

              <div className="flex justify-center mb-8">
                <Link
                  to="/animatory-dlya-detej"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-purple-600 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg text-lg"
                >
                  Выбрать аниматора
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Phone className="w-10 h-10 mb-3 text-purple-200" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href={`tel:${getCompanyPhone().replace(/\D/g, '')}`} className="text-purple-100 hover:text-white">
                    {getCompanyPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <MessageCircle className="w-10 h-10 mb-3 text-green-200" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <a 
                    href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-100 hover:text-white"
                  >
                    {getWhatsappPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Clock className="w-10 h-10 mb-3 text-yellow-200" />
                  <h3 className="font-semibold mb-2">Время работы</h3>
                  <p className="text-purple-100">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnimatorAtHomePage;