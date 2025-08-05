import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, Gift, HeartHandshake, Star, Calculator, Percent, Heart, Users, Phone, MessageCircle, Sparkles, Baby } from 'lucide-react';

const PricesPage = () => {
  const [activeTab, setActiveTab] = useState('animators');
  const [calculatorData, setCalculatorData] = useState({
    service: 'animator-1',
    duration: 1,
    extras: []
  });
  const [totalPrice, setTotalPrice] = useState(7000);

  // Данные из прайс-листа со скриншотов
  const priceData = {
    animators: [
      {
        id: 'animator-1',
        title: 'Аниматоры',
        subtitle: '1 ПЕРСОНАЖ',
        price: 7000,
        duration: '1 час от',
        description: 'Один профессиональный аниматор в любом костюме на выбор'
      },
      {
        id: 'animator-2',
        title: 'Аниматоры',
        subtitle: '2 ПЕРСОНАЖЕЙ',
        price: 9000,
        duration: '1 час от',
        description: 'Два аниматора для более насыщенной программы'
      },
      {
        id: 'animator-3',
        title: 'Аниматоры',
        subtitle: '3 ПЕРСОНАЖЕЙ',
        price: 12000,
        duration: 'от',
        description: 'Три аниматора для больших мероприятий'
      }
    ],
    shows: [
      {
        id: 'bubbles',
        title: 'Шоу Мыльных Пузырей',
        price: 8000,
        duration: 'от',
        description: 'Волшебное шоу с гигантскими мыльными пузырями'
      },
      {
        id: 'paper',
        title: 'Бумажное Шоу',
        price: 10000,
        duration: 'от',
        description: 'Яркое и красочное бумажное представление'
      },
      {
        id: 'packets',
        title: 'Шоу Пакетиков',
        price: 8000,
        duration: 'от',
        description: 'Интерактивное шоу с цветными пакетиками'
      },
      {
        id: 'foam',
        title: 'Поролон шоу',
        price: 10000,
        duration: 'от',
        description: 'Безопасное и веселое поролоновое шоу'
      },
      {
        id: 'ebru',
        title: 'Эбру шоу',
        price: 5000,
        duration: 'от',
        description: 'Искусство рисования на воде'
      },
      {
        id: 'numbers',
        title: 'Цифры высота 1 метр',
        price: 2700,
        duration: 'от',
        description: 'Большие цифры для украшения праздника'
      }
    ],
    balloons: [
      {
        id: 'balloons-simple',
        title: 'Шары Гелиевые',
        subtitle: 'БЕЗ РИСУНКА',
        price: 250,
        duration: 'от',
        description: 'Обычные гелиевые шары'
      },
      {
        id: 'balloons-print',
        title: 'Шары Гелиевые',
        subtitle: 'С РИСУНКОМ',
        price: 330,
        duration: 'от',
        description: 'Гелиевые шары с тематическими рисунками'
      },
      {
        id: 'balloons-led',
        title: 'Шары гелиевые',
        subtitle: 'СВЕТЯЩИЕСЯ',
        price: 400,
        duration: 'от',
        description: 'Светящиеся гелиевые шары'
      }
    ],
    costumes: [
      {
        id: 'costume-1',
        title: 'Ростовые куклы',
        subtitle: '1 КУКЛА',
        price: 3500,
        duration: 'от',
        description: 'Аренда одной ростовой куклы'
      },
      {
        id: 'costume-2',
        title: 'Ростовые куклы',
        subtitle: '2 КУКЛЫ',
        price: 6000,
        duration: 'от',
        description: 'Аренда двух ростовых кукол'
      },
      {
        id: 'figures',
        title: 'Фигуры',
        subtitle: 'ФОЛЬГИРОВАННЫЕ',
        price: 800,
        duration: 'от',
        description: 'Фольгированные фигуры'
      },
      {
        id: 'transformer-bumblebee',
        title: 'Ростовые куклы',
        subtitle: 'ТРАНСФОРМЕР БАМБЛБИ',
        price: 5000,
        duration: 'от',
        description: 'Эксклюзивный костюм Трансформера Бамблби'
      },
      {
        id: 'transformer-optimus',
        title: 'Ростовые куклы',
        subtitle: 'ТРАНСФОРМЕР ОПТИМУС',
        price: 7000,
        duration: 'от',
        description: 'Эксклюзивный костюм Трансформера Оптимуса'
      },
      {
        id: 'iron-man',
        title: 'Ростовые куклы',
        subtitle: 'ЖЕЛЕЗНЫЙ ЧЕЛОВЕК',
        price: 12000,
        duration: 'от',
        description: 'Премиальный костюм Железного Человека'
      }
    ],
    mermaids: [
      {
        id: 'mermaids-2',
        title: 'Русалки',
        subtitle: '2 ПЕРСОНАЖА НА ВЫБОР',
        price: 12000,
        duration: 'от',
        description: 'Два персонажа русалок на выбор'
      },
      {
        id: 'mermaids-3',
        title: 'Русалки',
        subtitle: '3 ПЕРСОНАЖА НА ВЫБОР',
        price: 18000,
        duration: 'от',
        description: 'Три персонажа русалок на выбор'
      },
      {
        id: 'mermaids-4',
        title: 'Русалки',
        subtitle: '4 ПЕРСОНАЖА НА ВЫБОР',
        price: 22000,
        duration: 'от',
        description: 'Четыре персонажа русалок на выбор'
      },
      {
        id: 'sparkle-gold',
        title: 'Шоу Блести - Сверкай',
        subtitle: 'ЗОЛОТО',
        price: 12000,
        duration: 'от',
        description: 'Золотое сверкающее шоу'
      },
      {
        id: 'sparkle-silver',
        title: 'Шоу Блести - Сверкай',
        subtitle: 'СЕРЕБРО',
        price: 10000,
        duration: 'от',
        description: 'Серебряное сверкающее шоу'
      }
    ]
  };

  const extraServices = [
    { id: 'photo', name: 'Фотосъемка (2 часа)', price: 25000 },
    { id: 'video', name: 'Видеосъемка', price: 35000 },
    { id: 'decoration', name: 'Оформление шарами', price: 15000 },
    { id: 'sound', name: 'Музыкальное оборудование', price: 8000 },
    { id: 'face-paint', name: 'Аквагрим', price: 5000 },
    { id: 'balloon-modeling', name: 'Моделирование из шаров', price: 6000 }
  ];

  const serviceCategories = [
    { id: 'animators', name: 'Аниматоры', icon: Baby, color: 'text-pink-500' },
    { id: 'shows', name: 'Шоу-программы', icon: Sparkles, color: 'text-purple-500' },
    { id: 'balloons', name: 'Шары', icon: Heart, color: 'text-red-500' },
    { id: 'costumes', name: 'Ростовые куклы', icon: Users, color: 'text-blue-500' },
    { id: 'mermaids', name: 'Русалки и шоу', icon: Star, color: 'text-cyan-500' }
  ];

  useEffect(() => {
    const selectedService = Object.values(priceData).flat().find(service => service.id === calculatorData.service);
    if (selectedService) {
      let price = selectedService.price * calculatorData.duration;
      calculatorData.extras.forEach(extraId => {
        const extra = extraServices.find(e => e.id === extraId);
        if (extra) price += extra.price;
      });
      setTotalPrice(price);
    }
  }, [calculatorData]);

  const handleExtraToggle = (extraId) => {
    setCalculatorData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId) 
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  const PriceCard = ({ item, index }) => (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 border-transparent hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-2 ${index === 1 ? 'border-purple-300 ring-2 ring-purple-100' : ''}`}>
      {index === 1 && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
          <Star className="w-4 h-4 inline mr-1" />
          ПОПУЛЯРНО
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
        {item.subtitle && (
          <p className="text-sm text-purple-600 font-medium mb-3">{item.subtitle}</p>
        )}
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-3xl font-bold text-gray-900">{item.price.toLocaleString()}</span>
          <span className="text-lg text-gray-600 ml-1">₸</span>
        </div>
        <p className="text-gray-500 text-sm">{item.duration}</p>
      </div>
      
      <p className="text-gray-600 text-sm mb-6 text-center">{item.description}</p>
      
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200">
        ПОДРОБНЕЕ
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumbs */}
      {/* <nav className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/" className="hover:text-purple-600 transition-colors">Главная</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Цены</span>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-yellow-300 opacity-20 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            Прайс-лист
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Честные и прозрачные цены на все наши услуги. Никаких скрытых доплат!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield className="w-4 h-4 inline mr-2" />
              Фиксированные цены
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Gift className="w-4 h-4 inline mr-2" />
              Без скрытых доплат
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <HeartHandshake className="w-4 h-4 inline mr-2" />
              Гибкие условия
            </div>
          </div>
        </div>
      </section>

      {/* Services Description */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши услуги</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Полный спектр праздничных услуг для создания незабываемых моментов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Аниматоры для детей */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Аниматоры для детей</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Аниматоры на день рождения от агентства «Королевство Чудес» – это залог веселого праздника, который обязательно понравится маленьким гостям вашего торжества. Профессиональные актеры, яркие костюмы и бесконечная любовь к своему делу позволяют нам создавать увлекательные и необычные программы, помогающие претворить детские мечты в реальность!
              </p>
            </div>

            {/* Квесты для детей */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Квесты для детей</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Все дети без исключения любят приключения! С нашими программами-квестами мы предлагаем маленьким гостям вашего праздника отправиться в незабываемое путешествие! Деток ждут необычные конкурсы, головоломки и веселые задания, пройдя которые они приблизятся к отгадке главной загадки квеста.
              </p>
            </div>

            {/* Дополнительные услуги */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Дополнительные услуги</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Праздничное Агенство «Королевство Чудес» предоставляет множество дополнительных услуг, которые в двойне разнообразят ваш праздник. Мы вовлечем вас в интригующую игру «Мафия», устроим потрясающий Караоке батл, покажем отличные мастер-классы, а также запуск Волшебных шариков.
              </p>
            </div>

            {/* Шоу программы */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Шоу программы</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Сделать праздник еще ярче и красочнее помогут наши шоу-программы. Необычные номера в исполнении лучших артистов станут отличным дополнением к любой программе празднования дня рождения, корпоратива или иного события. Зажигательные танцы, художественные номера или волшебный красочный салют с огненным шоу.
              </p>
            </div>

            {/* Выпускной */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Выпускной</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Выпускной – будь то окончание сада, начальной или средней школы – значимое событие в жизни ребенка, которое олицетворяет завершение одного этапа и переход на новую ступень. Мы с радостью поможем организовать для ваших деток удивительный праздник по поводу окончания сада или школы.
              </p>
            </div>

            {/* Ростовые куклы */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ростовые куклы</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Все дети верят в чудеса, волшебство и сказки. А какой ребенок откажется от личного знакомства с любимыми персонажами? Ростовые куклы — это отличный способ воочию познакомиться со сказочными героями, сделать программу праздника яркой и собрать всех детей в одном месте.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Детские VIP-программы */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Детские VIP-программы</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Предлагаем детские интерактивные сказки — спектакли для малышей и подростков. Остросюжетные представления с хорошей музыкой, красивые костюмы и яркий реквизит обязательно понравятся имениннику и его гостям. Программы подразумевают активное участие детей в празднике.
              </p>
            </div>

            {/* Новый год */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Новый год</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                В «Королевстве Чудес» живут не только клоуны, фокусники и персонажи сказок, но и главные виновники новогодних торжеств – Дед Мороз и Снегурочка. Они с удовольствием придут поздравить ребенка прямо к вам домой, чтобы вручить ему тот самый подарок, о котором он мечтал.
              </p>
            </div>

            {/* Организация Свадеб */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Организация Свадеб</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Все любящие друг-друга пары без исключения хотят связать свои узы браком. Начинаются вопросы по организации свадьбы, украшению залы и тд. И мы предлагаем возложить эту ответственность на нас. Мы можем предоставить огромный спектр проведения свадьбы начиная с регистрации и заканчивая самим празднованием.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Categories Navigation */}
      <section className="bg-white py-8 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === category.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 mr-2 ${activeTab === category.id ? 'text-white' : category.color}`} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Price Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {priceData[activeTab]?.map((item, index) => (
              <PriceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Calculator className="w-10 h-10 inline mr-3 text-purple-600" />
              Калькулятор стоимости
            </h2>
            <p className="text-xl text-gray-600">
              Рассчитайте примерную стоимость вашего праздника
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Выберите услугу
                </label>
                <select
                  value={calculatorData.service}
                  onChange={(e) => setCalculatorData(prev => ({...prev, service: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Object.entries(priceData).map(([category, items]) => (
                    <optgroup key={category} label={serviceCategories.find(c => c.id === category)?.name}>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.title} {item.subtitle ? `(${item.subtitle})` : ''} - {item.price.toLocaleString()}₸
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                <label className="block text-sm font-medium text-gray-700 mb-3 mt-6">
                  Продолжительность (часы)
                </label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={calculatorData.duration}
                  onChange={(e) => setCalculatorData(prev => ({...prev, duration: parseInt(e.target.value) || 1}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />

                <label className="block text-sm font-medium text-gray-700 mb-3 mt-6">
                  Дополнительные услуги
                </label>
                <div className="space-y-3">
                  {extraServices.map(extra => (
                    <label key={extra.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={calculatorData.extras.includes(extra.id)}
                        onChange={() => handleExtraToggle(extra.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {extra.name} (+{extra.price.toLocaleString()}₸)
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Итоговая стоимость</h3>
                <div className="text-4xl font-bold text-purple-600 mb-6">
                  {totalPrice.toLocaleString()}₸
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Базовая услуга:</span>
                    <span>{Object.values(priceData).flat().find(s => s.id === calculatorData.service)?.price.toLocaleString()}₸</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Продолжительность:</span>
                    <span>×{calculatorData.duration} час</span>
                  </div>
                  {calculatorData.extras.length > 0 && (
                    <div className="border-t pt-2 mt-2">
                      <div className="font-medium mb-1">Дополнительные услуги:</div>
                      {calculatorData.extras.map(extraId => {
                        const extra = extraServices.find(e => e.id === extraId);
                        return (
                          <div key={extraId} className="flex justify-between text-xs">
                            <span>{extra?.name}</span>
                            <span>+{extra?.price.toLocaleString()}₸</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                  Заказать консультацию
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section id="special-offers" className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <Percent className="w-10 h-10 inline mr-3 text-orange-500" />
              Специальные предложения
            </h2>
            <p className="text-xl text-gray-600">
              Акции и скидки для наших клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-200">
              <div className="bg-orange-100 text-orange-800 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                СКИДКА 15%
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Постоянным клиентам</h3>
              <p className="text-gray-600 mb-4">
                При заказе от 3-х мероприятий в течение года
              </p>
              <div className="text-2xl font-bold text-orange-600">-15% на все услуги</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
              <div className="bg-purple-100 text-purple-800 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                КОМПЛЕКС
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Аниматор + Шоу</h3>
              <p className="text-gray-600 mb-4">
                При заказе аниматора и любого шоу вместе
              </p>
              <div className="text-2xl font-bold text-purple-600">-10% на шоу</div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
              <div className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                БОНУС
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">День рождения в будни</h3>
              <p className="text-gray-600 mb-4">
                При заказе праздника с понедельника по четверг
              </p>
              <div className="text-2xl font-bold text-green-600">Аквагрим в подарок</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Остались вопросы?</h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами для бесплатной консультации и расчета точной стоимости
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Позвонить нам
            </button>
            <button className="bg-green-500 text-white font-semibold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Написать в WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricesPage;