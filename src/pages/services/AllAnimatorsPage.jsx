import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Filter,
  Search,
  Loader2
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { apiService } from '../../services/api';

const AllAnimatorsPage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [animators, setAnimators] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'Все персонажи' }]);
  const [loading, setLoading] = useState(true);

  // Загрузка данных
  useEffect(() => {
    loadAnimators();
    loadCategories();
  }, [selectedCategory, searchQuery]);

  const loadAnimators = async () => {
    try {
      setLoading(true);
      const params = {};

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const result = await apiService.getAnimators(params);

      if (result.success) {
        setAnimators(result.animators || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки аниматоров:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await apiService.getAnimatorCategories();

      if (result.success && result.categories) {
        setCategories([
          { id: 'all', name: 'Все персонажи' },
          ...result.categories
        ]);
      }
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    }
  };

  const filteredAnimators = animators;

  return (
    <>
      <Helmet>
        <title>Все аниматоры для детских праздников в Петропавловске | Каталог персонажей</title>
        <meta 
          name="description" 
          content="Полный каталог аниматоров в Петропавловске. Более 50 персонажей: супергерои, принцессы, герои мультфильмов. Выберите аниматора для детского праздника." 
        />
        <meta 
          name="keywords" 
          content="аниматоры Петропавловск, каталог аниматоров, персонажи на праздник, детские аниматоры" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/animatory-dlya-detej/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Hero секция */}
        <section className="relative py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white overflow-hidden">
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
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Все аниматоры для детских праздников
              </h1>
              
              <p className="text-xl md:text-2xl text-violet-100 mb-8">
                Более 50 персонажей для незабываемого праздника в Петропавlovске
              </p>
            </motion.div>
          </div>
        </section>

        {/* Фильтры и поиск */}
        <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Поиск */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск персонажа..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Категории */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center text-gray-600">
              Найдено персонажей: <span className="font-semibold text-purple-600">{filteredAnimators.length}</span>
            </div>
          </div>
        </section>

        {/* Каталог аниматоров */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {/* Индикатор загрузки */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAnimators.map((animator, index) => (
                <motion.div
                  key={animator.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/animator/${animator.id}`}
                    className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full"
                  >
                    {/* Изображение */}
                    <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                      {animator.popular && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                          ПОПУЛЯРНЫЙ
                        </div>
                      )}

                      {/* Изображение или placeholder */}
                      {animator.image ? (
                        <img
                          src={apiService.getImageUrl(animator.image)}
                          alt={animator.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-20 h-20 text-purple-400 opacity-50" />
                        </div>
                      )}
                      
                      {/* Градиент overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Имя персонажа на изображении */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white text-xl font-bold drop-shadow-lg">
                          {animator.name}
                        </h3>
                      </div>
                    </div>

                    {/* Контент */}
                    <div className="p-5">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {animator.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{animator.age_range}</span>
                        </div>
                        <div className="text-purple-600 font-bold">
                          {animator.price}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                        Подробнее
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              </div>
            )}

            {/* Если ничего не найдено */}
            {!loading && filteredAnimators.length === 0 && (
              <div className="text-center py-16">
                <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Персонажи не найдены
                </h3>
                <p className="text-gray-600 mb-6">
                  Попробуйте изменить критерии поиска или сбросить фильтры
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="btn-primary"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Не нашли персонажа? */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Не нашли нужного персонажа?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Свяжитесь с нами — у нас более 50 персонажей, и мы поможем подобрать 
                идеального героя для праздника вашего ребенка
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Написать в WhatsApp
                </a>
                <a
                  href={`tel:${getCompanyPhone().replace(/\D/g, '')}`}
                  className="btn-outline inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Готовы заказать аниматора?
              </h2>
              <p className="text-xl mb-8 text-violet-100">
                Выберите персонажа и свяжитесь с нами для уточнения деталей
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Phone className="w-10 h-10 mb-3 text-violet-200" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href={`tel:${getCompanyPhone().replace(/\D/g, '')}`} className="text-violet-100 hover:text-white">
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
                    className="text-violet-100 hover:text-white"
                  >
                    {getWhatsappPhone()}
                  </a>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <Clock className="w-10 h-10 mb-3 text-yellow-200" />
                  <h3 className="font-semibold mb-2">Время работы</h3>
                  <p className="text-violet-100">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AllAnimatorsPage;