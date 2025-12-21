import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Cake, 
  UtensilsCrossed, 
  School, 
  Building, 
  Phone, 
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Gift
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const AnimatorsPage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '+7 (7152) 123-456';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '+7 (777) 987-65-43';

  const locations = [
    {
      icon: Cake,
      title: 'Аниматоры на день рождения ребёнка',
      description: 'Яркий праздник для вашего ребенка с любимыми персонажами и интересными играми',
      link: '/animatory-na-den-rozhdeniya'
    },
    {
      icon: Home,
      title: 'Аниматор на дом',
      description: 'Аниматоры приедут к вам домой в удобное время со всем необходимым реквизитом',
      link: '/animator-na-dom'
    },
    {
      icon: UtensilsCrossed,
      title: 'Аниматор в кафе',
      description: 'Организуем и проведем праздник в любом кафе или ресторане Петропавловска',
      link: '/animator-v-kafe'
    },
    {
      icon: School,
      title: 'Аниматоры в детский сад',
      description: 'Праздники и утренники для групп детского сада с учетом возраста детей',
      link: '/animatory-v-detskij-sad'
    },
    {
      icon: Building,
      title: 'Аниматоры в школу',
      description: 'Выпускные, дни рождения и школьные мероприятия для начальных классов',
      link: '/animatory-v-shkolu'
    }
  ];

  const characters = [
    { name: 'Человек-паук', link: '/spajder-men-animator' },
    { name: 'Эльза и Анна', link: '/elsa-anna-holodnoe-serdce' },
    { name: 'Барбоскины', link: '/barboskiny-animatory' },
    { name: 'Трансформеры', link: '/transformery-animator' },
    { name: 'Принцессы Disney', link: '/princessy-disnej' },
    { name: 'Единорог', link: '/edinorog-animator' }
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Знакомство',
      description: 'Аниматор знакомится с детьми и вовлекает их в игру'
    },
    {
      number: '2',
      title: 'Активности',
      description: 'Активные конкурсы, сюжетные задания и командные игры'
    },
    {
      number: '3',
      title: 'Завершение',
      description: 'Спокойные активности, поздравление и фотосессия'
    }
  ];

  const showPrograms = [
    {
      title: 'Шоу мыльных пузырей',
      description: 'Магическое представление с гигантскими мыльными пузырями',
      price: 'от 15 000 ₸',
      link: '/shou-mylnyh-puzyrej'
    },
    {
      title: 'Научное шоу',
      description: 'Увлекательные опыты и эксперименты для детей',
      price: 'от 20 000 ₸',
      link: '/nauchnoe-shou'
    },
    {
      title: 'Шоу фокусов',
      description: 'Профессиональный фокусник с иллюзионным представлением',
      price: 'от 15 000 ₸',
      link: '/shou-fokusov'
    },
    {
      title: 'Бумажное шоу',
      description: 'Яркое шоу с конфетти и бумажными спецэффектами',
      price: 'от 10 000 ₸',
      link: '/bumazhnoe-shou'
    }
  ];

  const advantages = [
    'Опыт работы более 5 лет',
    'Профессиональные костюмы и реквизит',
    'Программы адаптированы под возраст',
    'Выезд по всему Петропавловску',
    'Пунктуальность и ответственность',
    'Положительные отзывы родителей'
  ];

  return (
    <>
      <Helmet>
        <title>Аниматоры в Петропавловске | Агентство Королевство Чудес</title>
        <meta 
          name="description" 
          content="Профессиональные аниматоры для детских праздников в Петропавловске от агентства «Королевство Чудес». День рождения, дом, кафе, детский сад. Цены и отзывы." 
        />
        <meta 
          name="keywords" 
          content="аниматоры Петропавловск, аниматоры на день рождения, детские аниматоры, аниматор на дом, персонажи на праздник" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/animatory-petropavlovsk/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Аниматоры в Петропавловске для детских праздников
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8">
                Профессиональная организация детских праздников для детей от 3 до 12 лет
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/animatory-dlya-detej"
                  className="btn-primary bg-white text-purple-600 hover:bg-gray-100"
                >
                  Заказать аниматора
                </Link>
                <Link to="/ceny" className="btn-outline border-white text-white hover:bg-white hover:text-purple-600">
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
                  Аниматоры от агентства «Королевство Чудес» — это профессиональная организация детских праздников 
                  в Петропавловске для детей от 3 до 12 лет. Мы проводим дни рождения, утренники и тематические 
                  праздники дома, в кафе, детских садах и школах. Каждая программа подбирается по возрасту ребёнка, 
                  количеству гостей и формату мероприятия, чтобы детям было интересно, а родителям — спокойно.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Куда выезжают наши аниматоры */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Куда выезжают наши аниматоры
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Мы работаем по всему Петропавловску и приезжаем со всем необходимым реквизитом
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {location.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {location.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                      Подробнее
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Популярные персонажи */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Популярные персонажи
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Каждый персонаж — это отдельная программа с костюмами, играми и сценарием
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {characters.map((character, index) => (
                <Link
                  key={index}
                  to={character.link}
                  className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {character.name}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
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

        {/* Шоу-программы */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Шоу-программы
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Добавьте к программе яркое шоу, которое удивит и порадует детей
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {showPrograms.map((show, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={show.link}
                    className="block bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 h-full"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {show.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {show.description}
                    </p>

                    <div className="text-purple-600 font-semibold mb-3">
                      {show.price}
                    </div>

                    <div className="inline-flex items-center gap-2 text-purple-600 font-semibold text-sm">
                      Подробнее
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/shou-programmy"
                className="inline-flex items-center gap-2 btn-outline"
              >
                Все шоу-программы
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Как проходит праздник */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Как проходит праздник с аниматором
            </h2>

            <div className="max-w-5xl mx-auto">
              <p className="text-center text-gray-700 mb-12 text-lg">
                Программа начинается со знакомства с детьми и вовлечения в игру. Далее следуют активные конкурсы, 
                сюжетные задания и командные игры, адаптированные под возраст. В завершение — спокойные активности, 
                поздравление именинника и фотосессия с персонажем.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 shadow-lg text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Сколько стоит */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                Сколько стоит аниматор в Петропавловске
              </h2>
              <p className="text-xl text-center text-gray-700 mb-8">
                Стоимость услуг аниматора — от 15 000 ₸. Цена зависит от выбранного персонажа, 
                продолжительности программы и формата праздника.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-green-50 rounded-lg"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-800 text-left">{advantage}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link to="/ceny" className="btn-primary inline-flex items-center gap-2">
                  Узнать точные цены
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Отзывы родителей
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
              Родители отмечают внимательное отношение к детям, интересные сценарии и пунктуальность 
              наших аниматоров. Мы регулярно получаем положительные отзывы после проведённых праздников.
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
                Заказать аниматора в Петропавловске
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Оставьте заявку или свяжитесь с нами — мы подберём аниматора и формат праздника под ваш запрос
              </p>

              <div className="flex justify-center mb-8">
                <Link
                  to="/animatory-dlya-detej"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-purple-600 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg text-lg"
                >
                  Заказать аниматора
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

export default AnimatorsPage;