import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DollarSign,
  Phone, 
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Gift,
  Star,
  Package,
  Zap,
  Crown,
  Calculator,
  Info
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const PricingPage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  const pricingPackages = [
    {
      name: 'Базовый',
      price: '15 000',
      duration: '1-1.5 часа',
      icon: Package,
      popular: false,
      features: [
        '1 аниматор в костюме',
        'Игры и конкурсы',
        'Музыкальное сопровождение',
        'Простой реквизит',
        'Подходит для малышей 3-5 лет'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Стандарт',
      price: '25 000',
      duration: '2-2.5 часа',
      icon: Zap,
      popular: true,
      features: [
        '1-2 аниматора',
        'Расширенная программа',
        'Квесты и сюжетные игры',
        'Профессиональный реквизит',
        'Аквагрим (по желанию)',
        'Фотосессия с персонажем'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Премиум',
      price: '40 000',
      duration: '3+ часа',
      icon: Crown,
      popular: false,
      features: [
        '2-3 аниматора',
        'Полная программа под ключ',
        'Шоу-программы (фокусы, научное шоу)',
        'Профессиональное оборудование',
        'Фотозона и декор',
        'Ведущий + персонажи',
        'Подарки для детей'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const additionalServices = [
    {
      title: 'Дополнительный аниматор',
      price: 'от 10 000 ₸',
      description: 'Второй или третий персонаж для большой группы детей'
    },
    {
      title: 'Шоу мыльных пузырей',
      price: 'от 15 000 ₸',
      description: 'Яркое шоу с гигантскими мыльными пузырями'
    },
    {
      title: 'Научное шоу',
      price: 'от 20 000 ₸',
      description: 'Интересные опыты и эксперименты для детей'
    },
    {
      title: 'Фокусы и магия',
      price: 'от 15 000 ₸',
      description: 'Профессиональный фокусник с иллюзионным шоу'
    },
    {
      title: 'Аквагрим',
      price: 'от 5 000 ₸',
      description: 'Рисунки на лицах для всех детей'
    },
    {
      title: 'Оформление шарами',
      price: 'от 10 000 ₸',
      description: 'Украшение праздника воздушными шарами'
    }
  ];

  const priceFactors = [
    {
      icon: Clock,
      title: 'Продолжительность',
      description: 'Чем дольше программа, тем выше стоимость'
    },
    {
      icon: Users,
      title: 'Количество детей',
      description: 'Для больших групп может потребоваться несколько аниматоров'
    },
    {
      icon: Sparkles,
      title: 'Выбор персонажа',
      description: 'Сложные костюмы и редкие персонажи могут стоить дороже'
    },
    {
      icon: Gift,
      title: 'Дополнительные услуги',
      description: 'Шоу-программы, декор и подарки увеличивают стоимость'
    }
  ];

  const locationPricing = [
    {
      location: 'Дома',
      priceNote: 'Базовые цены',
      description: 'Стандартные тарифы без доплат'
    },
    {
      location: 'В кафе',
      priceNote: 'Базовые цены + аренда кафе',
      description: 'Аренда помещения оплачивается отдельно по тарифам заведения'
    },
    {
      location: 'В детском саду',
      priceNote: 'от 20 000 ₸',
      description: 'Специальные программы для групп детского сада'
    },
    {
      location: 'В школе',
      priceNote: 'от 25 000 ₸',
      description: 'Программы для школьников с учетом класса'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Цены на детские праздники в Петропавловске | Королевство Чудес</title>
        <meta 
          name="description" 
          content="Цены на детские праздники и аниматоров в Петропавловске. Пакеты от 15 000 ₸. Базовые, стандартные и премиум программы. Дополнительные услуги и шоу-программы." 
        />
        <meta 
          name="keywords" 
          content="цены аниматоры, стоимость детского праздника, прайс аниматоры Петропавловск, сколько стоит праздник" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/ceny/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
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
                <Calculator className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Цены на детские праздники в Петропавловске
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-100 mb-8">
                Прозрачные тарифы без скрытых платежей. Выберите подходящий пакет для вашего праздника
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary bg-white text-emerald-600 hover:bg-gray-100"
                >
                  Рассчитать точную стоимость
                </a>
                <Link 
                  to="/animatory-dlya-detej" 
                  className="btn-outline border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  Выбрать аниматора
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Основной текст */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Стоимость детского праздника зависит от выбранной программы, персонажа и 
                  продолжительности мероприятия. Мы предлагаем несколько форматов праздников — 
                  от коротких программ до праздников под ключ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Основные пакеты */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Основные пакеты
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Выберите готовый пакет или соберите индивидуальную программу
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPackages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-2xl p-8 shadow-lg ${
                    pkg.popular ? 'border-2 border-emerald-500 transform scale-105' : 'border border-gray-200'
                  }`}
                >
                  {pkg.popular && (
                    <div className="text-center mb-4">
                      <span className="inline-block bg-emerald-500 text-white text-xs px-4 py-1 rounded-full font-semibold">
                        ПОПУЛЯРНЫЙ
                      </span>
                    </div>
                  )}

                  <div className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {pkg.name}
                  </h3>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">
                      {pkg.price} ₸
                    </div>
                    <div className="text-gray-600">{pkg.duration}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/animatory-dlya-detej"
                    className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Выбрать пакет
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Дополнительные услуги */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Дополнительные услуги
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Сделайте праздник еще ярче с дополнительными шоу-программами
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 flex-1">
                      {service.title}
                    </h3>
                    <Star className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  </div>
                  
                  <div className="text-2xl font-bold text-emerald-600 mb-3">
                    {service.price}
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* От чего зависит цена */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              От чего зависит стоимость
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {priceFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <factor.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {factor.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    {factor.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Цены по локациям */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Цены в зависимости от места проведения
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {locationPricing.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.location}
                  </h3>
                  
                  <div className="text-lg font-semibold text-emerald-600 mb-3">
                    {item.priceNote}
                  </div>
                  
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Важная информация */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-emerald-500">
                <div className="flex items-start gap-4">
                  <Info className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Важная информация о ценах
                    </h3>
                    
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Все цены указаны в тенге и актуальны на 2025 год</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Точная стоимость рассчитывается индивидуально после обсуждения деталей</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>При заказе нескольких услуг действуют специальные условия</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Выезд за пределы города обсуждается отдельно</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>Предоплата 30% для бронирования даты</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Рассчитайте стоимость вашего праздника
              </h2>
              <p className="text-xl mb-8 text-emerald-100">
                Свяжитесь с нами — мы подберем оптимальный вариант под ваш бюджет
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-emerald-600 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Написать в WhatsApp
                </a>
                <a
                  href={`tel:${getCompanyPhone().replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  Позвонить сейчас
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Phone className="w-10 h-10 mb-3 text-emerald-200" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href={`tel:${getCompanyPhone().replace(/\D/g, '')}`} className="text-emerald-100 hover:text-white">
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
                    className="text-emerald-100 hover:text-white"
                  >
                    {getWhatsappPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Clock className="w-10 h-10 mb-3 text-yellow-200" />
                  <h3 className="font-semibold mb-2">Время работы</h3>
                  <p className="text-emerald-100">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;