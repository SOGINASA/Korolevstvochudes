// components/admin/Reviews.js
import React, { useState, useEffect } from 'react';
import { 
  Plus, User, Star, Save, X, Edit, Trash2, Eye, 
  Filter, Download, CheckSquare, Square, MoreVertical,
  Search, Calendar, Award, AlertCircle 
} from 'lucide-react';
import { formatDate } from '../../utils/helpers';
import { apiService } from '../../services/api';

const Reviews = ({ 
  reviews: initialReviews, 
  loadingReviews, 
  onApproveReview, 
  onRejectReview,
  onToggleReviewFeatured,
  onBulkApproveReviews,
  onBulkDeleteReviews,
  onExportReviews,
  onLoadReviews, 
  showNotification 
}) => {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Состояния фильтров
  const [filters, setFilters] = useState({
    status: 'all', // all, approved, pending
    rating: 'all', // all, 1, 2, 3, 4, 5
    service: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
    featured: 'all' // all, featured, not_featured
  });

  const [reviewForm, setReviewForm] = useState({
    name: '',
    service: '',
    rating: 5,
    text: '',
    email: '',
    phone: ''
  });

  const services = [
    'Детские праздники',
    'Свадебные торжества',
    'Корпоративные мероприятия',
    'Юбилеи и торжества',
    'Квесты и игры',
    'Шоу-программы',
    'Праздничные программы',
    'Дополнительные услуги'
  ];

  // Обновляем локальные отзывы при изменении пропсов
  useEffect(() => {
    setReviews(initialReviews || []);
  }, [initialReviews]);

  // Применяем фильтры
  useEffect(() => {
    applyFilters();
  }, [reviews, filters]);

  const applyFilters = () => {
    let filtered = [...reviews];

    // Фильтр по статусу
    if (filters.status === 'approved') {
      filtered = filtered.filter(review => review.approved);
    } else if (filters.status === 'pending') {
      filtered = filtered.filter(review => !review.approved);
    }

    // Фильтр по рейтингу
    if (filters.rating !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(filters.rating));
    }

    // Фильтр по услуге
    if (filters.service !== 'all') {
      filtered = filtered.filter(review => review.service_type === filters.service);
    }

    // Фильтр по избранным
    if (filters.featured === 'featured') {
      filtered = filtered.filter(review => review.featured);
    } else if (filters.featured === 'not_featured') {
      filtered = filtered.filter(review => !review.featured);
    }

    // Поиск по тексту
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(review => 
        review.name.toLowerCase().includes(searchLower) ||
        review.text.toLowerCase().includes(searchLower) ||
        (review.service_type && review.service_type.toLowerCase().includes(searchLower))
      );
    }

    // Фильтр по дате
    if (filters.dateFrom) {
      filtered = filtered.filter(review => 
        new Date(review.created_at || review.date) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(review => 
        new Date(review.created_at || review.date) <= new Date(filters.dateTo)
      );
    }

    setFilteredReviews(filtered);
  };

  const resetReviewForm = () => {
    setReviewForm({
      name: '',
      service: '',
      rating: 5,
      text: '',
      email: '',
      phone: ''
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let result;
      if (editingReview) {
        result = await apiService.updateReview(editingReview.id, {
          ...reviewForm,
          service_type: reviewForm.service
        });
      } else {
        result = await apiService.createAdminReview({
          ...reviewForm,
          service_type: reviewForm.service
        });
      }
      
      if (result.success) {
        await onLoadReviews();
        setShowAddReview(false);
        setShowEditReview(false);
        setEditingReview(null);
        resetReviewForm();
        showNotification(
          editingReview ? 'Отзыв обновлен!' : 'Отзыв добавлен!', 
          'success'
        );
      } else {
        throw new Error(result.error || 'Ошибка при сохранении отзыва');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Review form error:', error);
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      name: review.name || '',
      service: review.service_type || '',
      rating: review.rating || 5,
      text: review.text || '',
      email: review.email || '',
      phone: review.phone || ''
    });
    setShowEditReview(true);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const result = await apiService.deleteReview(reviewId);
      if (result.success) {
        await onLoadReviews();
        setShowDeleteConfirm(false);
        setDeletingReviewId(null);
        showNotification('Отзыв удален!', 'success');
      } else {
        throw new Error(result.error || 'Ошибка при удалении отзыва');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Delete review error:', error);
    }
  };

  const confirmDelete = (reviewId) => {
    setDeletingReviewId(reviewId);
    setShowDeleteConfirm(true);
  };

  const closeModals = () => {
    setShowAddReview(false);
    setShowEditReview(false);
    setShowDeleteConfirm(false);
    setEditingReview(null);
    setDeletingReviewId(null);
    resetReviewForm();
  };

  const handleSelectReview = (reviewId) => {
    setSelectedReviews(prev => {
      if (prev.includes(reviewId)) {
        return prev.filter(id => id !== reviewId);
      } else {
        return [...prev, reviewId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(filteredReviews.map(review => review.id));
    }
  };

  const handleBulkApprove = async () => {
    if (selectedReviews.length === 0) {
      showNotification('Выберите отзывы для одобрения', 'warning');
      return;
    }
    
    await onBulkApproveReviews(selectedReviews);
    setSelectedReviews([]);
  };

  const handleBulkDelete = async () => {
    if (selectedReviews.length === 0) {
      showNotification('Выберите отзывы для удаления', 'warning');
      return;
    }
    
    if (window.confirm(`Вы уверены, что хотите удалить ${selectedReviews.length} отзывов?`)) {
      await onBulkDeleteReviews(selectedReviews);
      setSelectedReviews([]);
    }
  };

  const handleExport = () => {
    onExportReviews(filters);
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      rating: 'all',
      service: 'all',
      search: '',
      dateFrom: '',
      dateTo: '',
      featured: 'all'
    });
  };

  const getStatusBadge = (review) => {
    if (review.featured) {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center">
          <Award className="h-3 w-3 mr-1" />
          Избранный
        </span>
      );
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        review.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {review.approved ? 'Одобрен' : 'На модерации'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и действия */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
  <div>
    <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Управление отзывами</h2>
    <p className="text-gray-600 mt-1 text-sm lg:text-base">
      Всего: {reviews.length}, Показано: {filteredReviews.length}
      {selectedReviews.length > 0 && ` | Выбрано: ${selectedReviews.length}`}
    </p>
  </div>
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
    <button 
      onClick={() => setShowFilters(!showFilters)}
      className={`flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50 ${
        showFilters ? 'bg-blue-50 border-blue-300' : 'border-gray-300'
      }`}
    >
      <Filter className="h-4 w-4" />
      <span>Фильтры</span>
    </button>
    <button 
      onClick={() => setShowAddReview(true)}
      className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      <Plus className="h-4 w-4" />
      <span>Добавить отзыв</span>
    </button>
  </div>
</div>

      {/* Панель фильтров */}
      {showFilters && (
  <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-gray-200">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
              <div className="relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Поиск по имени или тексту..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Все статусы</option>
                <option value="approved">Одобренные</option>
                <option value="pending">На модерации</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Рейтинг</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Все рейтинги</option>
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>{rating} звезд</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Услуга</label>
              <select
                value={filters.service}
                onChange={(e) => setFilters({...filters, service: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Все услуги</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Дата от</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Дата до</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Избранные</label>
              <select
                value={filters.featured}
                onChange={(e) => setFilters({...filters, featured: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Все</option>
                <option value="featured">Только избранные</option>
                <option value="not_featured">Не избранные</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Массовые операции */}
      {selectedReviews.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              Выбрано отзывов: {selectedReviews.length}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkApprove}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Одобрить все
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Удалить все
              </button>
              <button
                onClick={() => setSelectedReviews([])}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Список отзывов */}
      <div className="space-y-4">
        {loadingReviews ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Загрузка отзывов...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {reviews.length === 0 ? 'Отзывов пока нет' : 'Не найдено отзывов по заданным фильтрам'}
            </p>
          </div>
        ) : (
          <>
            {/* Заголовок с выбором всех */}
            <div className="bg-gray-50 rounded-lg p-3 flex items-center">
              <button
                onClick={handleSelectAll}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                {selectedReviews.length === filteredReviews.length ? (
                  <CheckSquare className="h-4 w-4 mr-2" />
                ) : (
                  <Square className="h-4 w-4 mr-2" />
                )}
                Выбрать все ({filteredReviews.length})
              </button>
            </div>

            {filteredReviews.map(review => (
  <div key={review.id} className="bg-white rounded-lg lg:rounded-xl shadow-md lg:shadow-lg p-4 lg:p-6 border border-gray-200">
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 space-y-3 lg:space-y-0">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleSelectReview(review.id)}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
        >
          {selectedReviews.includes(review.id) ? (
            <CheckSquare className="h-5 w-5 text-purple-600" />
          ) : (
            <Square className="h-5 w-5" />
          )}
        </button>
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="h-5 w-5 lg:h-6 lg:w-6 text-purple-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 text-sm lg:text-base truncate">{review.name}</h3>
          <p className="text-xs lg:text-sm text-gray-600 truncate">{review.service_type}</p>
          {review.email && (
            <p className="text-xs text-gray-500 truncate">{review.email}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 space-y-2 lg:space-y-0">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        {getStatusBadge(review)}
      </div>
    </div>
    
    <p className="text-gray-700 mb-4 text-sm lg:text-base">{review.text}</p>
    
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
      <span className="text-xs lg:text-sm text-gray-500">
        {formatDate(review.created_at || review.date)}
      </span>
      <div className="flex flex-wrap gap-2">
        {!review.approved && (
          <button 
            onClick={() => onApproveReview(review.id)}
            className="flex items-center space-x-1 text-green-600 hover:text-green-700 px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium hover:bg-green-50 rounded"
          >
            <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
            <span>Одобрить</span>
          </button>
        )}
        <button 
          onClick={() => handleEditReview(review)}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium hover:bg-blue-50 rounded"
        >
          <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
          <span>Редактировать</span>
        </button>
        <button 
          onClick={() => confirmDelete(review.id)}
          className="flex items-center space-x-1 text-red-600 hover:text-red-700 px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium hover:bg-red-50 rounded"
        >
          <Trash2 className="h-3 w-3 lg:h-4 lg:w-4" />
          <span>Удалить</span>
        </button>
      </div>
    </div>
  </div>
))}
          </>
        )}
      </div>

      {/* Modal для добавления/редактирования отзыва */}
      {(showAddReview || showEditReview) && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingReview ? 'Редактировать отзыв' : 'Добавить отзыв'}
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя клиента *
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Имя клиента"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={reviewForm.email}
                    onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={reviewForm.phone}
                    onChange={(e) => setReviewForm({...reviewForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+7 (777) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Услуга *
                </label>
                <select
                  required
                  value={reviewForm.service}
                  onChange={(e) => setReviewForm({...reviewForm, service: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Выберите услугу</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Оценка *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewForm({...reviewForm, rating})}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= reviewForm.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {reviewForm.rating} из 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текст отзыва *
                </label>
                <textarea
                  required
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Расскажите о вашем опыте работы с нашей компанией..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingReview ? 'Сохранить изменения' : 'Сохранить отзыв'}</span>
                </button>
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal подтверждения удаления */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Удалить отзыв</h3>
                  <p className="text-sm text-gray-600">Это действие нельзя отменить</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Вы уверены, что хотите удалить этот отзыв? Все данные будут удалены безвозвратно.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDeleteReview(deletingReviewId)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Удалить
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;