import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart,
  Phone, 
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Users,
  Award,
  Target,
  Shield,
  Smile,
  TrendingUp,
  Sparkles,
  ThumbsUp,
  UserCheck,
  Calendar
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const AboutPage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  const stats = [
    {
      icon: Calendar,
      number: '10+',
      label: 'лет на рынке',
      description: 'Опыт организации праздников'
    },
    {
      icon: Smile,
      number: '10000+',
      label: 'праздников',
      description: 'Успешно проведено'
    },
    {
      icon: Users,
      number: '50+',
      label: 'персонажей',
      description: 'В нашей коллекции'
    },
    {
      icon: Star,
      number: '98%',
      label: 'довольных клиентов',
      description: 'Рекомендуют нас друзьям'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Все программы и реквизит безопасны для детей. Наши аниматоры следят за безопасностью на протяжении всего праздника.'
    },
    {
      icon: Heart,
      title: 'Любовь к детям',
      description: 'Мы искренне любим свою работу и детей. Каждый праздник для нас — возможность подарить радость ребенку.'
    },
    {
      icon: Target,
      title: 'Индивидуальный подход',
      description: 'Подбираем программу под возраст, интересы ребенка и формат мероприятия. Нет шаблонных решений.'
    },
    {
      icon: Award,
      title: 'Профессионализм',
      description: 'Работаем только с опытными аниматорами. Используем качественные костюмы и профессиональное оборудование.'
    },
    {
      icon: ThumbsUp,
      title: 'Ответственность',
      description: 'Пунктуальность, соблюдение договоренностей и внимательное отношение к каждой детали праздника.'
    },
    {
      icon: TrendingUp,
      title: 'Развитие',
      description: 'Постоянно добавляем новых персонажей, создаем современные программы и следим за трендами.'
    }
  ];

  const advantages = [
    {
      icon: UserCheck,
      title: 'Опытные аниматоры',
      description: 'Все наши специалисты имеют опыт работы более 2 лет и регулярно проходят обучение'
    },
    {
      icon: Sparkles,
      title: 'Качественные костюмы',
      description: 'Профессиональные костюмы героев, регулярно обновляемые и поддерживаемые в отличном состоянии'
    },
    {
      icon: Users,
      title: 'Работа с группами',
      description: 'Умеем удерживать внимание как 5, так и 50 детей одновременно'
    },
    {
      icon: Clock,
      title: 'Пунктуальность',
      description: 'Приезжаем вовремя, программа начинается точно по расписанию'
    },
    {
      icon: Heart,
      title: 'Любовь к деталям',
      description: 'Продумываем каждый момент праздника, чтобы он прошел идеально'
    },
    {
      icon: CheckCircle,
      title: 'Гарантия качества',
      description: 'Если что-то пойдет не так — вернем деньги или проведем праздник бесплатно'
    }
  ];

  const howWeWork = [
    {
      number: '1',
      title: 'Заявка',
      description: 'Вы оставляете заявку по телефону, в WhatsApp или на сайте',
      icon: Phone
    },
    {
      number: '2',
      title: 'Консультация',
      description: 'Обсуждаем детали: возраст детей, количество гостей, формат, персонажей',
      icon: Users
    },
    {
      number: '3',
      title: 'Подбор программы',
      description: 'Предлагаем оптимальную программу под ваши пожелания и бюджет',
      icon: Target
    },
    {
      number: '4',
      title: 'Бронирование',
      description: 'Фиксируем дату и время, вносите предоплату 30%',
      icon: Calendar
    },
    {
      number: '5',
      title: 'Подготовка',
      description: 'За день до праздника уточняем детали и готовим реквизит',
      icon: CheckCircle
    },
    {
      number: '6',
      title: 'Праздник',
      description: 'Аниматор приезжает вовремя и проводит яркую программу',
      icon: Sparkles
    }
  ];

  const team = [
    {
      role: 'Аниматоры',
      description: 'Профессиональные актеры и ведущие с опытом работы с детьми',
      count: '15+'
    },
    {
      role: 'Менеджеры',
      description: 'Помогают подобрать программу и организуют все детали',
      count: '3'
    },
    {
      role: 'Технический персонал',
      description: 'Отвечают за костюмы, реквизит и оборудование',
      count: '5'
    }
  ];

  return (
    <>
      <Helmet>
        <title>О нас — Агентство Королевство Чудес | Детские праздники в Петропавловске</title>
        <meta 
          name="description" 
          content="Агентство детских праздников «Королевство Чудес» в Петропавловске. Более 5 лет опыта, 1000+ проведенных праздников. Профессиональные аниматоры для детей от 3 до 12 лет." 
        />
        <meta 
          name="keywords" 
          content="о нас, агентство праздников, Королевство Чудес, аниматоры Петропавловск, детские праздники" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/o-nas/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 text-white overflow-hidden">
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
                <Heart className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Агентство детских праздников «Королевство Чудес»
              </h1>
              
              <p className="text-xl md:text-2xl text-rose-100 mb-8">
                Создаем яркие воспоминания для детей в Петропавловске с 2015 года
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/animatory-dlya-detej"
                  className="btn-primary bg-white text-rose-600 hover:bg-gray-100"
                >
                  Выбрать аниматора
                </Link>
                <Link 
                  to="/ceny" 
                  className="btn-outline border-white text-white hover:bg-white hover:text-rose-600"
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
                  Агентство «Королевство Чудес» занимается организацией детских праздников в Петропавловске. 
                  Мы создаём яркие и безопасные мероприятия для детей от 3 до 12 лет, подбирая программы 
                  по возрасту и формату праздника. Наша цель — чтобы детям было весело, а родителям спокойно 
                  за организацию.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Наши достижения
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="text-4xl font-bold text-rose-600 mb-2">
                    {stat.number}
                  </div>
                  
                  <div className="font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Наши ценности */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Наши ценности
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Принципы, которыми мы руководствуемся в работе
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6 border border-rose-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-700">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Почему выбирают нас */}
        <section className="py-16 bg-gradient-to-br from-rose-50 to-purple-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Почему родители выбирают нас
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <advantage.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Как мы работаем */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Как мы работаем
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {howWeWork.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-gray-50 rounded-2xl p-6"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-auto mb-4">
                    <step.icon className="w-6 h-6 text-rose-600" />
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
        </section>

        {/* Наша команда */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Наша команда
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg"
                >
                  <div className="text-4xl font-bold text-rose-600 mb-2">
                    {member.count}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {member.role}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              Отзывы наших клиентов
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              Более 1000 довольных семей уже доверили нам организацию праздников своих детей
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
        <section className="py-20 bg-gradient-to-br from-rose-600 via-pink-600 to-purple-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Доверьте нам праздник вашего ребенка
              </h2>
              <p className="text-xl mb-8 text-rose-100">
                Свяжитесь с нами — мы создадим незабываемые воспоминания для всей семьи
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-rose-600 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Написать в WhatsApp
                </a>
                <a
                  href={`tel:${getCompanyPhone().replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  Позвонить сейчас
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Phone className="w-10 h-10 mb-3 text-rose-200" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href={`tel:${getCompanyPhone().replace(/\D/g, '')}`} className="text-rose-100 hover:text-white">
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
                    className="text-rose-100 hover:text-white"
                  >
                    {getWhatsappPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Clock className="w-10 h-10 mb-3 text-yellow-200" />
                  <h3 className="font-semibold mb-2">Время работы</h3>
                  <p className="text-rose-100">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;