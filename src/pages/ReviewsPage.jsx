import React, { useState } from 'react';
import { Star, Calendar, User, MessageCircle, Send, Heart, Filter, Search } from 'lucide-react';

const ReviewsPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    text: '',
    serviceType: ''
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Существующие отзывы
  const existingReviews = [
    {
      id: 1,
      name: "Алена",
      date: "Feb 28, 2018",
      rating: 5,
      text: "Здраствуйте😊 хочу сказать Вам и Вашим ребятам, которые организовали нам праздник большое спасибо😘😘😘 Дети в восторге😄",
      serviceType: "Детские праздники",
      avatar: "👩"
    },
    {
      id: 2,
      name: "Марина",
      date: "Jan 16, 2018",
      rating: 5,
      text: "На протяжении последних 5 лет праздничное агентство \"Королевство Чудес\" приносит в жизнь нашей семьи мого радости,счастливых моментов,детский восторг! Ни одно мероприятие не проходит без веселых Гены и Чебурашки,медведей,милого сердечка,Зебры и многих других жителей Королевства.Конкурсы,мыльные пузыри и многие другие разалечения,шикарное музыкальное сопровождение расшевелят даже самых суровых гостей. Большое спасибо всему вашему коллективу и процветания!",
      serviceType: "Детские праздники",
      avatar: "👩‍💼"
    },
    {
      id: 3,
      name: "Валерия",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Здравствуйте! Спасибо Вам большое за весёлый, классный праздник. Ребёнку всё понравилось.",
      serviceType: "Детские праздники",
      avatar: "👱‍♀️"
    },
    {
      id: 4,
      name: "Елена Аличева",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Олю и Елену знаю уже очень давно! Вначале они проводили прекрасные и веселые праздники для детей и взрослых в Центральном Агентстве. В прошлом году пригласила Королевство чудес провести мой юбилей на природе😊. Это было незабываемо! Взрослые люди нахохотались, наигрались, надурачились как дети!👍👍👍Спасибо за организацию, позитив и возможность возвратиться туда, куда уже вроде и дороги то нет- в ДЕТСТВО!👏👏👏 Вы-лучшие!🎆🎉",
      serviceType: "Юбилеи",
      avatar: "👩‍🦳"
    },
    {
      id: 5,
      name: "Дмитрий",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Здравствуйте! Желаю выразить огромную благодарность вашей команде аниматоров: все сделали на высшем уровне, дети остались довольны, а вместе с ними и мы. Был приятно удивлен, спасибо!",
      serviceType: "Детские праздники",
      avatar: "👨"
    },
    {
      id: 6,
      name: "Александра",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Здравствуйте! Ваше агентство лучшее! Деткам очень понравилось,реалистичные костюмы, веселые, артистичные аниматоры. У нас на празднике была Баба Яга; огромный толстый костюм, как в нем получалось двигаться и веселиться с детьми это удивительно. Молодцы!!! Спасибо вам!",
      serviceType: "Детские праздники",
      avatar: "👩"
    },
    {
      id: 7,
      name: "Антон666",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Заказал два года назад фею на праздник, она мало того, что осталась у меня жить, так еще при разводе и пол квартиры отсудила!",
      serviceType: "Детские праздники",
      avatar: "😄"
    },
    {
      id: 8,
      name: "Айжан",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Пробовала разные праздничные агентства, ваш праздник был лучшим!!!",
      serviceType: "Детские праздники",
      avatar: "👩"
    },
    {
      id: 9,
      name: "Анастасия",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Здравствуйте! Хочу сказать спасибо команде \"Королевство чудес\" за прекрасное настроение наших деток 👍Вот уже 5 лет,на день рождения дочки мы приглашаем ваших аниматоров и заказываем шары, нас все устраивает! Успехов Вам!",
      serviceType: "Детские праздники",
      avatar: "👩‍💼"
    },
    {
      id: 10,
      name: "Горбань Евгения",
      date: "Jan 16, 2018",
      rating: 5,
      text: "Здравствуйте! Ваше праздничное агентство самое лучшее!!! Вы дарите взрослым и деткам столько радости, суперских эмоций,отличное настроение !!! Все праздники проходят на королевском уровне!!!🎉🎊🎉 Спасибо что вы у нас есть👍 без вас не было бы таких крутых праздников!🔥💣💥 Ваша команда заслуживает высших похвал👏👏👏 и больших слов благодарности! Спасибо еще раз и дальнейших вам успехов!!!!!",
      serviceType: "Детские праздники",
      avatar: "👩‍🦰"
    }
  ];

  const [reviews, setReviews] = useState(existingReviews);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.text && newReview.rating) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        avatar: "👤"
      };
      setReviews([review, ...reviews]);
      setNewReview({
        name: '',
        email: '',
        rating: 5,
        title: '',
        text: '',
        serviceType: ''
      });
      setShowReviewForm(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || review.serviceType.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         review.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400 transition-colors' : ''}`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Отзывы наших клиентов
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Узнайте, что говорят о нас те, кто уже доверил нам свои праздники
            </p>
            
            {/* Статистика */}
            <div className="flex flex-wrap justify-center items-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(averageRating))}
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              </div>
              <div className="text-lg">
                <span className="font-bold text-2xl">{reviews.length}</span> отзывов
              </div>
              <div className="text-lg">
                <span className="font-bold text-2xl">12000+</span> счастливых клиентов
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Оставить отзыв</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Фильтры и поиск */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Все отзывы</option>
              <option value="детские">Детские праздники</option>
              <option value="свадьбы">Свадьбы</option>
              <option value="корпоративы">Корпоративы</option>
              <option value="юбилеи">Юбилеи</option>
            </select>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по отзывам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
            />
          </div>
        </div>

        {/* Сетка отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>

              {review.serviceType && (
                <div className="mb-3">
                  <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    {review.serviceType}
                  </span>
                </div>
              )}

              <p className="text-gray-700 leading-relaxed mb-4">
                {review.text}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Рекомендует</span>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Ответить
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Отзывы не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить параметры поиска или фильтр
            </p>
          </div>
        )}
      </div>

      {/* Модальное окно формы отзыва */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Оставить отзыв</h2>
              <button
                onClick={() => setShowReviewForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (необязательно)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newReview.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип услуги
                </label>
                <select
                  name="serviceType"
                  value={newReview.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Выберите тип услуги</option>
                  <option value="Детские праздники">Детские праздники</option>
                  <option value="Свадьбы">Свадьбы</option>
                  <option value="Корпоративы">Корпоративы</option>
                  <option value="Юбилеи">Юбилеи</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Оценка *
                </label>
                <div className="flex items-center space-x-2">
                  {renderStars(newReview.rating, true, handleRatingChange)}
                  <span className="text-sm text-gray-600 ml-4">
                    {newReview.rating} из 5 звезд
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заголовок отзыва
                </label>
                <input
                  type="text"
                  name="title"
                  value={newReview.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Кратко опишите ваш опыт"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваш отзыв *
                </label>
                <textarea
                  name="text"
                  value={newReview.text}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Расскажите подробно о вашем опыте работы с нами..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all inline-flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Отправить отзыв</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Призыв к действию */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы создать свой незабываемый праздник?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Присоединяйтесь к нашим довольным клиентам и создайте магию вместе с нами
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Заказать праздник
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Получить консультацию
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;