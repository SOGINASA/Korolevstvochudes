import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cake,
  Home, 
  UtensilsCrossed, 
  Building2,
  Phone, 
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Gift,
  Clock,
  Baby,
  School,
  GraduationCap
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const AnimatorBirthdayPage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  const agePrograms = [
    {
      icon: Baby,
      age: '3–5 лет',
      title: 'Программа для малышей',
      description: 'Спокойные игры, простые задания, знакомство с персонажем. Программа создана специально для самых маленьких гостей.',
      features: [
        'Простые понятные игры',
        'Короткие активности по 5-10 минут',
        'Добрые персонажи без страшных моментов',
        'Знакомство и взаимодействие с героем',
        'Продолжительность: 1-1.5 часа'
      ],
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: School,
      age: '6–8 лет',
      title: 'Программа для дошкольников и младших школьников',
      description: 'Активные конкурсы, командные игры, сюжетные элементы. Дети полностью погружаются в приключение.',
      features: [
        'Активные конкурсы и эстафеты',
        'Командные игры',
        'Сюжетные элементы и приключения',
        'Интерактивные задания',
        'Продолжительность: 2-2.5 часа'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: GraduationCap,
      age: '9–12 лет',
      title: 'Программа для школьников',
      description: 'Квесты, соревнования, интерактивные сценарии. Программа учитывает интересы и уровень развития подростков.',
      features: [
        'Увлекательные квесты',
        'Командные соревнования',
        'Интерактивные сценарии',
        'Современные челленджи',
        'Продолжительность: 2.5-3 часа'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const locations = [
    {
      icon: Home,
      title: 'Дом',
      description: 'Проведём праздник у вас дома в уютной обстановке. Приедем со всем реквизитом.',
      advantages: [
        'Комфортная домашняя обстановка',
        'Не нужно никуда везти детей',
        'Можно пригласить любое количество гостей',
        'Свое меню и угощения'
      ],
      link: '/animator-na-dom'
    },
    {
      icon: UtensilsCrossed,
      title: 'Кафе',
      description: 'Организуем праздник в любом кафе Петропавловска с учетом особенностей площадки.',
      advantages: [
        'Готовое банкетное меню',
        'Профессиональное обслуживание',
        'Не нужно убирать после праздника',
        'Красивый интерьер для фотографий'
      ],
      link: '/animator-v-kafe'
    },
    {
      icon: Building2,
      title: 'Детский центр',
      description: 'Праздник в детском развлекательном центре с дополнительными активностями.',
      advantages: [
        'Игровые зоны и аттракционы',
        'Безопасное пространство для детей',
        'Дополнительные развлечения',
        'Опытный персонал центра'
      ],
      link: '/animatory-petropavlovsk'
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

  const advantages = [
    'Профессиональные аниматоры с опытом работы более 5 лет',
    'Яркие костюмы и качественный реквизит',
    'Программы разработаны с учетом возраста',
    'Гибкая продолжительность программы',
    'Индивидуальный подход к каждому ребенку',
    'Фотосессия с персонажем в подарок'
  ];

  return (
    <>
      <Helmet>
        <title>Аниматор на день рождения ребёнка в Петропавловске | Королевство Чудес</title>
        <meta 
          name="description" 
          content="Закажите аниматора на день рождения ребёнка в Петропавловске. Программы для детей 3-12 лет. Проведение дома, в кафе или детском центре. Цены от 15 000 ₸." 
        />
        <meta 
          name="keywords" 
          content="аниматор на день рождения, день рождения ребенка, детский праздник, аниматоры Петропавловск" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/animatory-na-den-rozhdeniya/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white overflow-hidden">
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
                <Cake className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Аниматор на день рождения ребёнка
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-100 mb-8">
                Яркий незабываемый праздник для детей от 3 до 12 лет в Петропавловске
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
                <p className="text-lg text-gray-700 leading-relaxed">
                  Аниматор на день рождения ребёнка — это удобный и яркий формат праздника, который подойдёт 
                  как для домашнего торжества, так и для кафе или детского центра. Агентство «Королевство Чудес» 
                  проводит дни рождения с учётом возраста детей, количества гостей и интересов именинника.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Программы по возрастам */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Программы по возрастам
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Каждая программа адаптирована под возраст и интересы детей
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {agePrograms.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center mb-4`}>
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-1 rounded-full mb-2">
                      <span className="text-purple-700 font-bold">{program.age}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {program.description}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Популярные персонажи */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Популярные персонажи для дня рождения
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {popularCharacters.map((character, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100"
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

        {/* Стоимость */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Стоимость
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Цена аниматора на день рождения — от 15 000 ₸. Стоимость зависит от выбранного персонажа, 
                продолжительности программы и дополнительных услуг.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">от 15 000 ₸</div>
                  <div className="text-gray-600 mb-4">Базовая программа</div>
                  <ul className="text-left space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>1-1.5 часа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>1 персонаж</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Игры и конкурсы</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-500">
                  <div className="inline-block bg-purple-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                    ПОПУЛЯРНО
                  </div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">от 25 000 ₸</div>
                  <div className="text-gray-600 mb-4">Стандартная программа</div>
                  <ul className="text-left space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>2-2.5 часа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>1-2 персонажа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Квесты и шоу</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">от 40 000 ₸</div>
                  <div className="text-gray-600 mb-4">Премиум программа</div>
                  <ul className="text-left space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>3+ часа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>2-3 персонажа</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Полный формат + шоу</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Link to="/ceny" className="btn-primary inline-flex items-center gap-2">
                Подробнее о ценах
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Где можно провести праздник */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Где можно провести праздник
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
              Мы адаптируем программу под любую площадку
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={location.link}
                    className="block bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 h-full"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                      <location.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {location.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {location.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {location.advantages.map((advantage, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>

                    {/* <div className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                      Подробнее
                      <ArrowRight className="w-4 h-4" />
                    </div> */}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Почему выбирают нас
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-green-50 rounded-lg"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Заказать аниматора на день рождения
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Свяжитесь с нами, чтобы подобрать персонажа и программу
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

export default AnimatorBirthdayPage;