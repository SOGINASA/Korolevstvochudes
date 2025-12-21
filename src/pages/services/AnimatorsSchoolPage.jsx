import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap,
  Phone, 
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Trophy,
  Music,
  BookOpen,
  Award,
  ShieldCheck,
  Zap,
  PartyPopper
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const AnimatorsSchoolPage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '+7 (7152) 123-456';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '+7 (777) 987-65-43';

  const advantages = [
    {
      icon: Users,
      title: 'Опыт работы с классами',
      description: 'Умеем удержать внимание большой группы школьников и вовлечь всех в программу'
    },
    {
      icon: Zap,
      title: 'Современные форматы',
      description: 'Квесты, челленджи, интеллектуальные игры — то, что интересно современным детям'
    },
    {
      icon: ShieldCheck,
      title: 'Безопасность',
      description: 'Все активности безопасны для актового зала или класса'
    },
    {
      icon: Music,
      title: 'Профессиональное оборудование',
      description: 'Привозим звук, микрофоны и весь необходимый реквизит'
    },
    {
      icon: BookOpen,
      title: 'Образовательный элемент',
      description: 'Программы содержат познавательные элементы и развивающие задания'
    },
    {
      icon: Award,
      title: 'Координация с учителями',
      description: 'Согласовываем программу с классным руководителем и администрацией'
    }
  ];

  const eventTypes = [
    {
      title: 'День знаний',
      description: '1 сентября — торжественное начало учебного года с играми и квестами',
      icon: BookOpen
    },
    {
      title: 'Выпускной начальной школы',
      description: 'Торжественное прощание с начальной школой для 4 класса',
      icon: GraduationCap
    },
    {
      title: 'Дни рождения в классе',
      description: 'Празднование дня рождения ученика вместе с одноклассниками',
      icon: PartyPopper
    },
    {
      title: 'Тематические праздники',
      description: 'Новый год, 8 марта, 23 февраля, День учителя и другие праздники',
      icon: Star
    },
    {
      title: 'Последний звонок',
      description: 'Развлекательная программа для выпускников',
      icon: Trophy
    },
    {
      title: 'Классные часы',
      description: 'Интерактивные развлекательно-познавательные программы',
      icon: Sparkles
    }
  ];

  const popularCharacters = [
    'Супергерои (Человек-паук, Бэтмен)',
    'Аниме персонажи',
    'Игровые персонажи',
    'Звездные войны',
    'Гарри Поттер',
    'Трансформеры'
  ];

  const programFeatures = [
    'Программы для разных возрастов (1-4 класс, 5-8 класс)',
    'Командные игры и соревнования',
    'Интеллектуальные викторины',
    'Активные квесты и челленджи',
    'Тематические сценарии',
    'Фотозона и групповые фото'
  ];

  const whatWeNeed = [
    'Актовый зал или просторный класс',
    'Возможность подключить звук',
    'Координация времени с администрацией',
    'Приблизительное количество детей'
  ];

  const ageGroups = [
    {
      grade: '1-2 класс',
      age: '7-8 лет',
      duration: '45-60 минут',
      features: [
        'Сказочные персонажи и герои мультфильмов',
        'Простые квесты и загадки',
        'Активные игры и танцы',
        'Творческие задания'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      grade: '3-4 класс',
      age: '9-10 лет',
      duration: '60-75 минут',
      features: [
        'Супергерои и популярные персонажи',
        'Сложные квесты и головоломки',
        'Командные соревнования',
        'Интеллектуальные игры'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      grade: '5-8 класс',
      age: '11-14 лет',
      duration: '75-90 минут',
      features: [
        'Современные форматы и челленджи',
        'Командные баттлы',
        'Интерактивные викторины',
        'Музыкальные конкурсы'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Аниматоры в школу Петропавловск | Праздники и выпускные</title>
        <meta 
          name="description" 
          content="Закажите аниматоров в школу в Петропавловске. Проведем выпускные, дни рождения, праздники для 1-8 классов. Квесты, игры, современные форматы. Цены от 25 000 ₸." 
        />
        <meta 
          name="keywords" 
          content="аниматоры в школу, выпускной начальной школы, праздник в классе, аниматоры Петропавловск" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/animatory-v-shkolu/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
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
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Аниматоры в школу в Петропавловске
              </h1>
              
              <p className="text-xl md:text-2xl text-indigo-100 mb-8">
                Проведем выпускные, праздники и дни рождения для школьников 1-8 классов
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/animatory-dlya-detej"
                  className="btn-primary bg-white text-indigo-600 hover:bg-gray-100"
                >
                  Выбрать программу
                </Link>
                <Link 
                  to="/ceny" 
                  className="btn-outline border-white text-white hover:bg-white hover:text-indigo-600"
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
                  Аниматоры в школу — это профессиональная организация праздников для школьников 
                  в Петропавловске. Агентство «Королевство Чудес» проводит выпускные, дни рождения, 
                  тематические праздники и классные часы для учеников 1-8 классов с учетом их возраста 
                  и интересов.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Мы используем современные форматы: квесты, интеллектуальные викторины, командные 
                  соревнования и интерактивные программы, которые нравятся школьникам.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Почему выбирают нас */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Почему школы выбирают нас
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Мы понимаем особенности работы со школьниками разных возрастов
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
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
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

        {/* Какие мероприятия проводим */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Какие мероприятия мы проводим в школах
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <event.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Программы по классам */}
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Программы по классам
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Каждая программа учитывает возраст, интересы и особенности школьников
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {ageGroups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center mb-4`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {group.grade}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{group.age}</p>
                    <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {group.duration}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {group.features.map((feature, idx) => (
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
              Популярные персонажи для школьников
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {popularCharacters.map((character, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center border border-indigo-100"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
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
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                Что нужно подготовить в школе
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Минимальная подготовка для проведения праздника
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {whatWeNeed.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                <div className="flex items-start gap-4">
                  <Trophy className="w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Работаем с администрацией</h3>
                    <p className="text-gray-700">
                      Согласовываем все детали с классным руководителем и администрацией школы. 
                      Приезжаем заранее для подготовки. Все технические вопросы берем на себя.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Что входит в программу */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Что входит в программу
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {programFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
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
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Стоимость проведения в школе
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Цена от 25 000 ₸. Стоимость зависит от количества учеников, класса, 
                продолжительности и выбранной программы.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">от 25 000 ₸</div>
                  <div className="text-gray-600 mb-4">Один класс</div>
                  <div className="text-sm text-gray-700">45-60 минут, до 30 учеников</div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-500">
                  <div className="inline-block bg-indigo-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                    ПОПУЛЯРНО
                  </div>
                  <div className="text-4xl font-bold text-indigo-600 mb-2">от 40 000 ₸</div>
                  <div className="text-gray-600 mb-4">Параллель</div>
                  <div className="text-sm text-gray-700">90 минут, 2-3 класса</div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">от 60 000 ₸</div>
                  <div className="text-gray-600 mb-4">Большое мероприятие</div>
                  <div className="text-sm text-gray-700">Выпускной, последний звонок</div>
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
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Отзывы учителей и родителей
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              Школы и родители отмечают качество программ и профессионализм аниматоров
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
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Закажите программу для школы
              </h2>
              <p className="text-xl mb-8 text-indigo-100">
                Свяжитесь с нами — подберем программу и формат для вашего класса
              </p>

              <div className="flex justify-center mb-8">
                <Link
                  to="/animatory-dlya-detej"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg text-lg"
                >
                  Выбрать программу
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Phone className="w-10 h-10 mb-3 text-indigo-200" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href={`tel:${getCompanyPhone().replace(/\D/g, '')}`} className="text-indigo-100 hover:text-white">
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
                    className="text-indigo-100 hover:text-white"
                  >
                    {getWhatsappPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Clock className="w-10 h-10 mb-3 text-yellow-200" />
                  <h3 className="font-semibold mb-2">Время работы</h3>
                  <p className="text-indigo-100">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnimatorsSchoolPage;