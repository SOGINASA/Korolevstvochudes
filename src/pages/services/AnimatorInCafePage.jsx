import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed,
  Phone, 
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  Users,
  Camera,
  Music,
  ChefHat,
  ShieldCheck,
  PartyPopper
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const AnimatorInCafePage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  const advantages = [
    {
      icon: ChefHat,
      title: 'Готовое меню',
      description: 'Профессиональное банкетное меню без забот о готовке и сервировке'
    },
    {
      icon: Users,
      title: 'Профессиональное обслуживание',
      description: 'Официанты заботятся о гостях, вы можете спокойно наслаждаться праздником'
    },
    {
      icon: ShieldCheck,
      title: 'Безопасное пространство',
      description: 'Детские кафе оборудованы с учетом безопасности для детей'
    },
    {
      icon: Camera,
      title: 'Красивый интерьер',
      description: 'Готовые фотозоны и праздничное оформление для отличных снимков'
    },
    {
      icon: Music,
      title: 'Звук и музыка',
      description: 'Профессиональная аудиосистема для музыкального сопровождения'
    },
    {
      icon: PartyPopper,
      title: 'Не нужно убирать',
      description: 'После праздника персонал кафе уберет все сам'
    }
  ];

  const howToChoose = [
    {
      title: 'Учитывайте количество гостей',
      description: 'Выбирайте зал подходящего размера — не слишком большой и не тесный'
    },
    {
      title: 'Проверьте меню',
      description: 'Убедитесь, что в меню есть блюда, которые нравятся детям'
    },
    {
      title: 'Уточните условия',
      description: 'Можно ли приносить свой торт, есть ли детская зона или игровая комната'
    },
    {
      title: 'Посмотрите расположение',
      description: 'Кафе должно быть удобно расположено для большинства гостей'
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

  const programFeatures = [
    'Программа адаптирована для кафе и ресторанов',
    'Учитываем особенности помещения',
    'Активности безопасны для зала',
    'Координируем с персоналом кафе',
    'Можем провести программу во время банкета',
    'Фотосессия с персонажем включена'
  ];

  const popularCafes = [
    'Детские кафе с игровыми зонами',
    'Семейные рестораны',
    'Кафе с банкетными залами',
    'Пиццерии и фастфуд',
    'Кондитерские с детскими залами',
    'Любое кафе на ваш выбор'
  ];

  return (
    <>
      <Helmet>
        <title>Аниматор в кафе Петропавловск | Заказать аниматора в ресторан</title>
        <meta 
          name="description" 
          content="Закажите аниматора в кафе или ресторан в Петропавловске. Проведем детский праздник с учетом особенностей заведения. Работаем со всеми кафе. Цены от 15 000 ₸." 
        />
        <meta 
          name="keywords" 
          content="аниматор в кафе, аниматор в ресторан, детский праздник в кафе, аниматоры Петропавловск" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/animator-v-kafe/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white overflow-hidden">
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
                <UtensilsCrossed className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Аниматор в кафе в Петропавловске
              </h1>
              
              <p className="text-xl md:text-2xl text-orange-100 mb-8">
                Организуем яркий детский праздник в любом кафе или ресторане города
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/animatory-dlya-detej"
                  className="btn-primary bg-white text-orange-600 hover:bg-gray-100"
                >
                  Выбрать аниматора
                </Link>
                <Link 
                  to="/ceny" 
                  className="btn-outline border-white text-white hover:bg-white hover:text-orange-600"
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
                  Аниматор в кафе — это удобный формат детского праздника, когда вы арендуете зал 
                  в кафе или ресторане, а мы организуем развлекательную программу с профессиональным 
                  аниматором. Агентство «Королевство Чудес» работает со всеми кафе Петропавловска 
                  и адаптирует программу под особенности заведения.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Мы учитываем планировку зала, количество гостей и согласовываем программу с 
                  персоналом кафе, чтобы праздник прошел максимально комфортно.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества проведения в кафе */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Почему праздник в кафе — это удобно
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Проведение праздника в кафе освобождает от многих хлопот и дает дополнительные возможности
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
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
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

        {/* Как выбрать кафе */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                Как выбрать кафе для детского праздника
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Несколько советов от наших специалистов по выбору подходящего заведения
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {howToChoose.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      {tip.title}
                    </h3>
                    <p className="text-gray-700">
                      {tip.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl border border-orange-100">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Не знаете, где провести?</h3>
                    <p className="text-gray-700">
                      Мы поможем выбрать подходящее кафе в Петропавловске исходя из ваших пожеланий 
                      и бюджета. У нас есть опыт работы с большинством заведений города.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Популярные типы кафе */}
        <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Где мы работаем
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {popularCafes.map((cafe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center border border-orange-100 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {cafe}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Популярные персонажи */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Популярные персонажи для кафе
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {popularCharacters.map((character, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center border border-orange-100"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
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
                Стоимость аниматора в кафе
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Цена от 15 000 ₸. Стоимость зависит от выбранного персонажа, продолжительности 
                и дополнительных услуг. Аренда кафе оплачивается отдельно по тарифам заведения.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                  <div className="text-4xl font-bold text-orange-600 mb-2">от 15 000 ₸</div>
                  <div className="text-gray-600 mb-4">1-1.5 часа</div>
                  <div className="text-sm text-gray-700">Базовая программа с одним персонажем</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-500">
                  <div className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                    ПОПУЛЯРНО
                  </div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">от 25 000 ₸</div>
                  <div className="text-gray-600 mb-4">2-2.5 часа</div>
                  <div className="text-sm text-gray-700">Расширенная программа + игры</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                  <div className="text-4xl font-bold text-orange-600 mb-2">от 40 000 ₸</div>
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
              Отзывы о праздниках в кафе
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              Родители отмечают удобство формата и качество проведения программ в кафе
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
        <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Закажите аниматора в кафе
              </h2>
              <p className="text-xl mb-8 text-orange-100">
                Свяжитесь с нами — подберем персонажа, поможем выбрать кафе и организуем отличный праздник
              </p>

              <div className="flex justify-center mb-8">
                <Link
                  to="/animatory-dlya-detej"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-orange-600 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg text-lg"
                >
                  Выбрать аниматора
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Phone className="w-10 h-10 mb-3 text-orange-200" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href={`tel:${getCompanyPhone().replace(/\D/g, '')}`} className="text-orange-100 hover:text-white">
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
                    className="text-orange-100 hover:text-white"
                  >
                    {getWhatsappPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Clock className="w-10 h-10 mb-3 text-yellow-200" />
                  <h3 className="font-semibold mb-2">Время работы</h3>
                  <p className="text-orange-100">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnimatorInCafePage;