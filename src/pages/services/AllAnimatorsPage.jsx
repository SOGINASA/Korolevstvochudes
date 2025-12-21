import React, { useState } from 'react';
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
  Search
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const AllAnimatorsPage = () => {
  const { settings } = useSettings();
  const getCompanyPhone = () => settings?.company_phone || '8 (705) 519 5222';
  const getWhatsappPhone = () => settings?.whatsapp_phone || '8 (705) 519 5222';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Все персонажи' },
    { id: 'superheroes', name: 'Супергерои' },
    { id: 'princesses', name: 'Принцессы' },
    { id: 'cartoons', name: 'Мультфильмы' },
    { id: 'fantasy', name: 'Фэнтези' },
    { id: 'animals', name: 'Животные' }
  ];

  const animators = [
    {
      id: 1,
      name: 'Человек-паук',
      title: 'Аниматор Человек-паук в Петропавловске',
      description: 'Любимый супергерой всех мальчишек. Активные игры, квесты и приключения в стиле комиксов Marvel.',
      price: 'от 15 000 ₸',
      age: '4-12 лет',
      category: 'superheroes',
      image: '/images/animators/spiderman.jpg', // Placeholder
      link: '/spiderman-animator',
      popular: true
    },
    {
      id: 2,
      name: 'Эльза и Анна',
      title: 'Аниматоры Эльза и Анна в Петропавловске',
      description: 'Сестры из "Холодного сердца". Волшебные игры, песни и танцы в зимней сказке.',
      price: 'от 25 000 ₸',
      age: '3-10 лет',
      category: 'princesses',
      image: '/images/animators/elsa-anna.jpg',
      link: '/elsa-anna-holodnoe-serdce',
      popular: true
    },
    {
      id: 3,
      name: 'Барбоскины',
      title: 'Аниматоры Барбоскины в Петропавловске',
      description: 'Веселая семейка из популярного мультсериала. Добрые игры и конкурсы для малышей.',
      price: 'от 15 000 ₸',
      age: '3-8 лет',
      category: 'cartoons',
      image: '/images/animators/barboskiny.jpg',
      link: '/barboskiny-animatory',
      popular: true
    },
    {
      id: 4,
      name: 'Трансформер',
      title: 'Аниматор Трансформер в Петропавловске',
      description: 'Робот-герой из вселенной Трансформеров. Динамичная программа с боевыми играми.',
      price: 'от 20 000 ₸',
      age: '5-12 лет',
      category: 'superheroes',
      image: '/images/animators/transformer.jpg',
      link: '/transformery-animator',
      popular: false
    },
    {
      id: 5,
      name: 'Принцессы Disney',
      title: 'Принцессы Disney аниматоры в Петропавловске',
      description: 'Белль, Золушка, Рапунцель и другие принцессы. Волшебные истории и бал.',
      price: 'от 15 000 ₸',
      age: '3-10 лет',
      category: 'princesses',
      image: '/images/animators/disney-princesses.jpg',
      link: '/princessy-disnej',
      popular: true
    },
    {
      id: 6,
      name: 'Единорог',
      title: 'Аниматор Единорог в Петропавловске',
      description: 'Волшебный единорог для сказочного праздника. Игры в волшебном королевстве.',
      price: 'от 15 000 ₸',
      age: '3-8 лет',
      category: 'fantasy',
      image: '/images/animators/unicorn.jpg',
      link: '/edinorog-animator',
      popular: true
    },
    {
      id: 7,
      name: 'Бэтмен',
      title: 'Аниматор Бэтмен в Петропавловске',
      description: 'Темный рыцарь Готэма. Детективные квесты и супергеройские миссии.',
      price: 'от 15 000 ₸',
      age: '5-12 лет',
      category: 'superheroes',
      image: '/images/animators/batman.jpg',
      link: '/betmen-animator',
      popular: false
    },
    {
      id: 8,
      name: 'Маша и Медведь',
      title: 'Аниматоры Маша и Медведь в Петропавловске',
      description: 'Озорная Маша и добрый Медведь. Веселые приключения из любимого мультфильма.',
      price: 'от 25 000 ₸',
      age: '2-7 лет',
      category: 'cartoons',
      image: '/images/animators/masha-medved.jpg',
      link: '/masha-medved-animatory',
      popular: true
    },
    {
      id: 9,
      name: 'Фиксики',
      title: 'Аниматоры Фиксики в Петропавловске',
      description: 'Нолик, Симка и их друзья. Познавательные игры и технические загадки.',
      price: 'от 20 000 ₸',
      age: '4-10 лет',
      category: 'cartoons',
      image: '/images/animators/fixiki.jpg',
      link: '/fiksiki-animatory',
      popular: false
    },
    {
      id: 10,
      name: 'Леди Баг и Супер-Кот',
      title: 'Аниматоры Леди Баг и Супер-Кот в Петропавловске',
      description: 'Супергерои Парижа. Миссии по спасению города от злодеев.',
      price: 'от 25 000 ₸',
      age: '5-12 лет',
      category: 'superheroes',
      image: '/images/animators/ladybug.jpg',
      link: '/ledi-bag-super-kot',
      popular: true
    },
    {
      id: 11,
      name: 'Пони',
      title: 'Аниматор Пони в Петропавловске',
      description: 'Милые пони из Эквестрии. Дружба, магия и радужные приключения.',
      price: 'от 15 000 ₸',
      age: '3-9 лет',
      category: 'fantasy',
      image: '/images/animators/pony.jpg',
      link: '/poni-animator',
      popular: false
    },
    {
      id: 12,
      name: 'Щенячий патруль',
      title: 'Аниматоры Щенячий патруль в Петропавловске',
      description: 'Команда смелых щенков-спасателей. Миссии по спасению и помощи.',
      price: 'от 20 000 ₸',
      age: '3-7 лет',
      category: 'cartoons',
      image: '/images/animators/paw-patrol.jpg',
      link: '/schenachij-patrul',
      popular: true
    }
  ];

  // Фильтрация
  const filteredAnimators = animators.filter(animator => {
    const matchesCategory = selectedCategory === 'all' || animator.category === selectedCategory;
    const matchesSearch = animator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         animator.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                    to={animator.link}
                    className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full"
                  >
                    {/* Изображение */}
                    <div className="relative h-64 bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                      {animator.popular && (
                        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                          ПОПУЛЯРНЫЙ
                        </div>
                      )}
                      
                      {/* Placeholder для изображения */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-20 h-20 text-purple-400 opacity-50" />
                      </div>
                      
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
                          <span>{animator.age}</span>
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

            {/* Если ничего не найдено */}
            {filteredAnimators.length === 0 && (
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