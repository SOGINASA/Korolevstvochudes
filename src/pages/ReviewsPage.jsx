import React, { useState, useEffect } from 'react';
import { Star, Calendar, User, MessageCircle, Send, Heart, Filter, Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { apiService } from '../services/api';
import BookingModal from '../components/BookingModal';

const ReviewsPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    text: '',
    serviceType: ''
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    total_reviews: 0,
    average_rating: 0,
    rating_distribution: []
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
  const [submitMessage, setSubmitMessage] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 12,
    total: 0,
    pages: 0,
    has_next: false,
    has_prev: false
  });
  const [errors, setErrors] = useState({});

  // Функции для работы с модалом бронирования
  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  // Загрузка отзывов при монтировании компонента
  useEffect(() => {
    loadReviews();
    loadStats();
  }, [filter, pagination.page]);

  // Поиск с задержкой
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchReviews();
      } else {
        loadReviews();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        per_page: pagination.per_page,
        approved_only: true
      };

      if (filter !== 'all') {
        // Примерное сопоставление фильтров с service_type
        const serviceTypeMap = {
          'детские': 'Детские праздники',
          'свадьбы': 'Свадьбы',
          'корпоративы': 'Корпоративы',
          'юбилеи': 'Юбилеи'
        };
        params.service_type = serviceTypeMap[filter];
      }

      const result = await apiService.getReviews(params);
      
      if (result.success) {
        setReviews(result.reviews || []);
        setPagination(result.pagination || pagination);
      } else {
        console.error('Ошибка загрузки отзывов:', result.error);
      }
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await apiService.getReviewStats();
      if (result.success) {
        setStats({
          total_reviews: result.total_reviews || 0,
          average_rating: result.average_rating || 0,
          rating_distribution: result.rating_distribution || []
        });
      }
    } catch (error) {
      console.error('Ошибка при загрузке статистики:', error);
    }
  };

  const searchReviews = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const result = await apiService.searchReviews(searchTerm, 20);
      if (result.success) {
        setReviews(result.reviews || []);
        // Обнуляем пагинацию для поиска
        setPagination(prev => ({ 
          ...prev, 
          page: 1, 
          total: result.total_found || 0,
          pages: 1,
          has_next: false,
          has_prev: false
        }));
      }
    } catch (error) {
      console.error('Ошибка поиска:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибки при изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newReview.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    } else if (newReview.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    if (!newReview.text.trim()) {
      newErrors.text = 'Текст отзыва обязателен для заполнения';
    } else if (newReview.text.trim().length < 10) {
      newErrors.text = 'Текст отзыва должен содержать минимум 10 символов';
    }

    if (newReview.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newReview.email)) {
      newErrors.email = 'Некорректный email адрес';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const result = await apiService.createReview(newReview);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Спасибо за отзыв! Он будет опубликован после модерации.');
        
        // Очищаем форму
        setNewReview({
          name: '',
          email: '',
          rating: 5,
          text: '',
          serviceType: ''
        });
        
        // Закрываем форму через 3 секунды
        setTimeout(() => {
          setShowReviewForm(false);
          setSubmitStatus(null);
          setSubmitMessage('');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Произошла ошибка при отправке отзыва');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Произошла ошибка при отправке отзыва');
      console.error('Ошибка отправки отзыва:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                {renderStars(Math.round(stats.average_rating))}
                <span className="text-2xl font-bold">{stats.average_rating.toFixed(1)}</span>
              </div>
              <div className="text-lg">
                <span className="font-bold text-2xl">{stats.total_reviews}</span> отзывов
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

        {/* Загрузка */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600">Загрузка отзывов...</span>
          </div>
        )}

        {/* Сетка отзывов */}
        {!loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl">
                        {review.avatar || '👤'}
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

                  {review.service_type && (
                    <div className="mb-3">
                      <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                        {review.service_type}
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
                  </div>
                </div>
              ))}
            </div>

            {/* Пагинация */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-2 mb-8">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.has_prev}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Назад
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                          page === pagination.page
                            ? 'bg-purple-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.has_next}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Вперед
                </button>
              </div>
            )}
          </>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Отзывы не найдены
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Попробуйте изменить поисковый запрос' 
                : 'Попробуйте изменить параметры фильтра'
              }
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
                disabled={submitting}
              >
                ×
              </button>
            </div>

            {/* Статус отправки */}
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                submitStatus === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {submitStatus === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span>{submitMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-6">
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Введите ваше имя"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
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
                  disabled={submitting}
                >
                  <option value="">Выберите тип услуги</option>
                  <option value="Детские праздники">Детские праздники</option>
                  <option value="Свадебные торжества">Свадьбы</option>
                  <option value="Корпоративные мероприятия">Корпоративы</option>
                  <option value="Квесты и игры">Квесты и игры</option>
                  <option value="Шоу-программы">Шоу-программы</option>
                  <option value="Дополнительные услуги">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Оценка *
                </label>
                <div className="flex items-center space-x-2">
                  {renderStars(newReview.rating, !submitting, handleRatingChange)}
                  <span className="text-sm text-gray-600 ml-4">
                    {newReview.rating} из 5 звезд
                  </span>
                </div>
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
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                    errors.text ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Расскажите подробно о вашем опыте работы с нами..."
                  disabled={submitting}
                />
                {errors.text && (
                  <p className="text-red-500 text-sm mt-1">{errors.text}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Минимум 10 символов ({newReview.text.length}/2000)
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Отправка...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Отправить отзыв</span>
                    </>
                  )}
                </button>
              </div>
            </form>
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
            <button 
              onClick={openBookingModal}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Заказать праздник
            </button>
            <button 
              onClick={openBookingModal}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно бронирования */}
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={closeBookingModal} 
      />
    </div>
  );
};

export default ReviewsPage;