import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  Home,
  Cake,
  UtensilsCrossed,
  School,
  Star,
  Gift,
  Music,
  Camera,
  Loader2
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { apiService } from '../../services/api';
import BookingModal from '../../components/BookingModal';

const SpidermanAnimatorPage = () => {
  const { settings } = useSettings();
  const { id } = useParams();
  const navigate = useNavigate();
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [animator, setAnimator] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузка данных аниматора
  useEffect(() => {
    loadAnimator();
  }, [id]);

  const loadAnimator = async () => {
    try {
      setLoading(true);
      const result = await apiService.getAnimator(id);

      if (result.success) {
        setAnimator(result.animator);
        // Увеличиваем счетчик просмотров
        await apiService.incrementAnimatorViews(result.animator.id);
      } else {
        // Если не найден, перенаправляем на страницу всех аниматоров
        navigate('/animatory-dlya-detej');
      }
    } catch (error) {
      console.error('Ошибка загрузки аниматора:', error);
      navigate('/animatory-dlya-detej');
    } finally {
      setLoading(false);
    }
  };

  // Показываем загрузку
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  // Если данные не загружены
  if (!animator) {
    return null;
  }

  const character = {
    name: animator.name,
    title: animator.title,
    description: animator.description,
    age: animator.age_range,
    price: animator.price,
    duration: animator.duration,
    image: animator.image,
    category: animator.category
  };

  // Программа - используем данные из API или дефолтные
  const programIncludesText = animator.program_includes || 'Сюжетные игры, активные конкурсы, музыкальное сопровождение, фотосессия';
  const programIncludes = programIncludesText.split(',').map((item, index) => ({
    icon: [Sparkles, Users, Music, Camera][index % 4],
    title: item.trim(),
    description: ''
  }));

  const suitableFor = [
    {
      icon: Cake,
      title: 'День рождения',
      description: 'Идеальный формат для празднования дня рождения ребенка',
      link: '/animatory-na-den-rozhdeniya'
    },
    {
      icon: Home,
      title: 'Дом',
      description: 'Аниматор приедет к вам домой со всем реквизитом',
      link: '/animator-na-dom'
    },
    {
      icon: UtensilsCrossed,
      title: 'Кафе',
      description: 'Проведем праздник в любом кафе Петропавlovска',
      link: '/animator-v-kafe'
    },
    {
      icon: School,
      title: 'Детский сад',
      description: 'Программа для группы детского сада или школьного класса',
      link: '/animatory-v-detskij-sad'
    }
  ];

  // Преимущества - используем данные из API или дефолтные
  const advantagesText = animator.advantages || 'Профессиональный костюм, Опытный аниматор, Программа адаптируется под возраст, Все игры включены';
  const advantages = advantagesText.split(',').map(item => item.trim());

  // Похожие персонажи - используем данные из API или дефолтные
  const relatedText = animator.related_characters || '';
  const relatedCharacters = relatedText ? relatedText.split(',').map(name => ({
    name: name.trim(),
    link: '#'
  })) : [];

  return (
    <>
      <Helmet>
        <title>{animator.meta_title || `${animator.title} | Королевство Чудес`}</title>
        <meta
          name="description"
          content={animator.meta_description || animator.description}
        />
        <meta
          name="keywords"
          content={animator.meta_keywords || `аниматор ${animator.name}, ${animator.category}, петропавловск`}
        />
        <link rel="canonical" href={`https://prazdnikvdom.kz/${animator.slug}/`} />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-red-600 via-blue-600 to-red-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <span className="text-sm font-semibold">{character.category}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {character.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Users className="w-5 h-5" />
                    <span>{character.age}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Clock className="w-5 h-5" />
                    <span>{character.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Gift className="w-5 h-5" />
                    <span>от {character.price} ₸</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="btn-primary bg-white text-red-600 hover:bg-gray-100 inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Заказать
                  </button>
                  <Link 
                    to="/ceny" 
                    className="btn-outline border-white text-white hover:bg-white hover:text-red-600"
                  >
                    Узнать цены
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Фото персонажа */}
                <div className="relative h-96 bg-gradient-to-br from-red-400 to-blue-400 rounded-3xl overflow-hidden shadow-2xl">
                  {character.image ? (
                    <img
                      src={apiService.getImageUrl(character.image)}
                      alt={character.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-32 h-32 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white">{character.name}</h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Основной текст */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {character.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Что входит в программу */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Что входит в программу
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {programIncludes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Куда подойдёт программа */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Куда подойдёт программа
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {suitableFor.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={item.link}
                    className="block bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-6 border border-red-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-blue-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Почему выбирают нас
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-800">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Стоимость */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Стоимость
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Стоимость аниматора {character.name} — от {character.price} ₸.
                Цена зависит от продолжительности программы и дополнительных услуг.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">15 000 ₸</div>
                  <div className="text-gray-600 mb-4">1-1.5 часа</div>
                  <div className="text-sm text-gray-700">Базовая программа</div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl p-6 border-2 border-red-500">
                  <div className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full mb-2">
                    ПОПУЛЯРНО
                  </div>
                  <div className="text-4xl font-bold text-red-600 mb-2">25 000 ₸</div>
                  <div className="text-gray-600 mb-4">2-2.5 часа</div>
                  <div className="text-sm text-gray-700">Расширенная программа</div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">40 000 ₸</div>
                  <div className="text-gray-600 mb-4">3+ часа</div>
                  <div className="text-sm text-gray-700">Полная программа + шоу</div>
                </div>
              </div>

              <Link to="/ceny" className="btn-primary inline-flex items-center gap-2">
                Подробнее о ценах
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Похожие персонажи */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Похожие персонажи
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {relatedCharacters.map((char, index) => (
                <Link
                  key={index}
                  to={char.link}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {char.name}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/animatory-dlya-detej"
                className="inline-flex items-center gap-2 btn-outline"
              >
                Все персонажи
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-red-600 via-blue-600 to-red-700 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Заказать {character.name} в Петропавловске
              </h2>
              <p className="text-xl mb-8 text-red-100">
                Оставьте заявку — мы свяжемся с вами и уточним детали праздника
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-red-600 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Оставить заявку
                </button>
                <a
                  href={`tel:${getCompanyPhone().replace(/\D/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  Позвонить сейчас
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Phone className="w-10 h-10 mb-3 text-red-200" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href={`tel:${getCompanyPhone().replace(/\D/g, '')}`} className="text-red-100 hover:text-white">
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
                    className="text-red-100 hover:text-white"
                  >
                    {getWhatsappPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Clock className="w-10 h-10 mb-3 text-yellow-200" />
                  <h3 className="font-semibold mb-2">Время работы</h3>
                  <p className="text-red-100">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Модальное окно бронирования */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
};

export default SpidermanAnimatorPage;