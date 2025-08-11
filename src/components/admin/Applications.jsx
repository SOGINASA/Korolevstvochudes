// components/admin/Applications.js
import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Phone, Mail, Calendar, Clock, Eye, Edit, Trash2, ChevronLeft, ChevronRight, X, User, MessageSquare, DollarSign, Users, MapPin, Save, AlertCircle } from 'lucide-react';
import { formatDate, getStatusColor, getStatusText } from '../../utils/helpers';

const Applications = ({ 
  recentApplications, 
  loadingBookings, 
  bookingsPagination,
  onUpdateBookingStatus,
  onDeleteBooking,
  onBulkDeleteBookings,
  onExportBookings,
  onBookingsPageChange,
  onLoadBookings,
  onUpdateBooking, // Новая функция для обновления заявки
  showNotification 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editFormErrors, setEditFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Применяем фильтры при их изменении
  useEffect(() => {
    const filters = {};
    if (searchQuery) filters.search = searchQuery;
    if (statusFilter !== 'all') filters.status = statusFilter;
    
    const timeoutId = setTimeout(() => {
      onLoadBookings(1, filters);
    }, 500); // Дебаунс для поиска

    return () => clearTimeout(timeoutId);
  }, [searchQuery, statusFilter]);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await onUpdateBookingStatus(appId, newStatus);
      showNotification('Статус заявки обновлен', 'success');
    } catch (error) {
      showNotification('Ошибка при обновлении статуса', 'error');
    }
  };

  const handleDelete = async (bookingId) => {
    if (showDeleteConfirm === bookingId) {
      try {
        await onDeleteBooking(bookingId);
        setShowDeleteConfirm(null);
      } catch (error) {
        showNotification('Ошибка при удалении заявки', 'error');
      }
    } else {
      setShowDeleteConfirm(bookingId);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedBookings.length === 0) {
      showNotification('Выберите заявки для удаления', 'warning');
      return;
    }

    if (window.confirm(`Вы уверены, что хотите удалить ${selectedBookings.length} заявок?`)) {
      try {
        await onBulkDeleteBookings(selectedBookings);
        setSelectedBookings([]);
      } catch (error) {
        showNotification('Ошибка при массовом удалении', 'error');
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === recentApplications.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(recentApplications.map(app => app.id));
    }
  };

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings(prev => 
      prev.includes(bookingId)
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleExport = async () => {
    const filters = {};
    if (searchQuery) filters.search = searchQuery;
    if (statusFilter !== 'all') filters.status = statusFilter;
    
    await onExportBookings(filters);
  };

  const handlePageChange = (newPage) => {
    onBookingsPageChange(newPage);
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedApplication(null);
  };

  // Функции для редактирования заявок
  const handleEditApplication = (application) => {
    setSelectedApplication(application);
    setEditFormData({
      name: application.name || '',
      phone: application.phone || '',
      email: application.email || '',
      service_title: application.service_title || '',
      service_id: application.service_id || '',
      event_date: application.event_date || '',
      event_time: application.event_time || '',
      guests_count: application.guests_count || '',
      budget: application.budget || '',
      location: application.location || '',
      message: application.message || '',
      status: application.status || 'new'
    });
    setEditFormErrors({});
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedApplication(null);
    setEditFormData({});
    setEditFormErrors({});
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (editFormErrors[field]) {
      setEditFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateEditForm = () => {
    const errors = {};
    
    if (!editFormData.name?.trim()) {
      errors.name = 'Имя обязательно для заполнения';
    }
    
    if (!editFormData.phone?.trim()) {
      errors.phone = 'Телефон обязателен для заполнения';
    } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(editFormData.phone)) {
      errors.phone = 'Неверный формат телефона';
    }
    
    if (editFormData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email)) {
      errors.email = 'Неверный формат email';
    }
    
    if (editFormData.event_date && !/^\d{4}-\d{2}-\d{2}$/.test(editFormData.event_date)) {
      errors.event_date = 'Неверный формат даты (YYYY-MM-DD)';
    }
    
    if (editFormData.event_time && !/^\d{2}:\d{2}$/.test(editFormData.event_time)) {
      errors.event_time = 'Неверный формат времени (HH:MM)';
    }
    
    if (editFormData.guests_count && (isNaN(editFormData.guests_count) || editFormData.guests_count < 0)) {
      errors.guests_count = 'Количество гостей должно быть числом';
    }
    
    return errors;
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setEditFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Подготавливаем данные для отправки
      const updateData = {
        ...editFormData,
        guests_count: editFormData.guests_count ? parseInt(editFormData.guests_count) : null,
        budget: editFormData.budget || null,
        location: editFormData.location || null,
        message: editFormData.message || null,
        email: editFormData.email || null,
        service_id: editFormData.service_id || null
      };

      await onUpdateBooking(selectedApplication.id, updateData);
      showNotification('Заявка успешно обновлена', 'success');
      closeEditModal();
      
      // Обновляем данные в списке
      onLoadBookings(bookingsPagination?.page || 1);
    } catch (error) {
      console.error('Ошибка при обновлении заявки:', error);
      showNotification('Ошибка при обновлении заявки', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCreatedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusDisplayText = (status) => {
    const statusMap = {
      'new': 'Новая',
      'confirmed': 'Подтверждена',
      'in-progress': 'В работе',
      'completed': 'Завершена',
      'cancelled': 'Отменена'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Заявки клиентов</h2>
        <div className="flex space-x-3">
          {selectedBookings.length > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              <Trash2 className="h-4 w-4" />
              <span>Удалить выбранные ({selectedBookings.length})</span>
            </button>
          )}
          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Download className="h-4 w-4" />
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по имени, телефону или email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="confirmed">Подтвержденные</option>
              <option value="in-progress">В работе</option>
              <option value="completed">Завершенные</option>
              <option value="cancelled">Отмененные</option>
            </select>
          </div>
        </div>

        {loadingBookings ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Загрузка заявок...</p>
          </div>
        ) : recentApplications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Заявки не найдены</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedBookings.length === recentApplications.length && recentApplications.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Услуга
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата события
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Время события
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map(app => (
                  <tr key={app.id} className={`hover:bg-gray-50 ${selectedBookings.includes(app.id) ? 'bg-purple-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(app.id)}
                        onChange={() => handleSelectBooking(app.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{app.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Phone className="h-3 w-3" />
                          <span>{app.phone}</span>
                        </div>
                        {app.email && (
                          <div className="text-sm text-gray-500 flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span>{app.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.service_title || 'Не указано'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.event_date ? (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{app.event_date}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Не указана</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {app.event_time ? (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{app.event_time}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Не указано</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-purple-500 ${getStatusColor(app.status)}`}
                      >
                        <option value="new">Новая</option>
                        <option value="confirmed">Подтверждена</option>
                        <option value="in-progress">В работе</option>
                        <option value="completed">Завершена</option>
                        <option value="cancelled">Отменена</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => handleViewDetails(app)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Просмотр"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditApplication(app)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Редактировать"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(app.id)}
                          className={`${
                            showDeleteConfirm === app.id 
                              ? 'text-red-900 bg-red-100 px-2 py-1 rounded' 
                              : 'text-red-600 hover:text-red-900'
                          }`}
                          title={showDeleteConfirm === app.id ? 'Нажмите еще раз для подтверждения' : 'Удалить'}
                        >
                          <Trash2 className="h-4 w-4" />
                          {showDeleteConfirm === app.id && (
                            <span className="ml-1 text-xs">Подтвердить?</span>
                          )}
                        </button>
                        {showDeleteConfirm === app.id && (
                          <button 
                            onClick={() => setShowDeleteConfirm(null)}
                            className="text-gray-500 hover:text-gray-700 text-xs"
                          >
                            Отмена
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Пагинация */}
        {bookingsPagination && bookingsPagination.pages > 1 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Показано {recentApplications.length} из {bookingsPagination.total} заявок
                (страница {bookingsPagination.page} из {bookingsPagination.pages})
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handlePageChange(bookingsPagination.page - 1)}
                  disabled={!bookingsPagination.has_prev}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Предыдущая
                </button>
                
                {/* Номера страниц */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, bookingsPagination.pages) }, (_, i) => {
                    let pageNum;
                    if (bookingsPagination.pages <= 5) {
                      pageNum = i + 1;
                    } else {
                      const current = bookingsPagination.page;
                      const total = bookingsPagination.pages;
                      
                      if (current <= 3) {
                        pageNum = i + 1;
                      } else if (current >= total - 2) {
                        pageNum = total - 4 + i;
                      } else {
                        pageNum = current - 2 + i;
                      }
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 text-sm rounded ${
                          pageNum === bookingsPagination.page
                            ? 'bg-purple-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button 
                  onClick={() => handlePageChange(bookingsPagination.page + 1)}
                  disabled={!bookingsPagination.has_next}
                  className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Следующая
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно детального просмотра */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Заголовок модального окна */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Детали заявки #{selectedApplication.id}
              </h3>
              <button 
                onClick={closeDetailsModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Контент модального окна */}
            <div className="p-6 space-y-6">
              {/* Информация о клиенте */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-600" />
                  Информация о клиенте
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Имя</label>
                    <p className="text-gray-900">#{selectedApplication.id}</p>
                  </div>
                  {selectedApplication.service_id && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">ID услуги</label>
                      <p className="text-gray-900">{selectedApplication.service_id}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Изменение статуса */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изменить статус заявки
                </label>
                <select
                  value={selectedApplication.status}
                  onChange={(e) => {
                    handleStatusChange(selectedApplication.id, e.target.value);
                    setSelectedApplication({...selectedApplication, status: e.target.value});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="new">Новая</option>
                  <option value="confirmed">Подтверждена</option>
                  <option value="in-progress">В работе</option>
                  <option value="completed">Завершена</option>
                  <option value="cancelled">Отменена</option>
                </select>
              </div>
            </div>

            {/* Футер модального окна */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button 
                onClick={closeDetailsModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно редактирования заявки */}
      {showEditModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Заголовок модального окна */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Edit className="h-6 w-6 mr-2 text-blue-600" />
                Редактирование заявки #{selectedApplication.id}
              </h3>
              <button 
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Форма редактирования */}
            <form onSubmit={handleSaveEdit} className="p-6">
              <div className="space-y-8">
                {/* Информация о клиенте */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-600" />
                    Информация о клиенте
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => handleEditFormChange('name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          editFormErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Введите имя клиента"
                        disabled={isSubmitting}
                      />
                      {editFormErrors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {editFormErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={editFormData.phone}
                        onChange={(e) => handleEditFormChange('phone', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          editFormErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+7 (XXX) XXX-XX-XX"
                        disabled={isSubmitting}
                      />
                      {editFormErrors.phone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {editFormErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => handleEditFormChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          editFormErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="example@email.com"
                        disabled={isSubmitting}
                      />
                      {editFormErrors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {editFormErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Информация об услуге */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Услуга и мероприятие
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Название услуги
                      </label>
                      <input
                        type="text"
                        value={editFormData.service_title}
                        onChange={(e) => handleEditFormChange('service_title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Например: Детский день рождения"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID услуги
                      </label>
                      <input
                        type="text"
                        value={editFormData.service_id}
                        onChange={(e) => handleEditFormChange('service_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Идентификатор услуги"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дата события
                      </label>
                      <input
                        type="date"
                        value={editFormData.event_date}
                        onChange={(e) => handleEditFormChange('event_date', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          editFormErrors.event_date ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isSubmitting}
                      />
                      {editFormErrors.event_date && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {editFormErrors.event_date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Время события
                      </label>
                      <input
                        type="time"
                        value={editFormData.event_time}
                        onChange={(e) => handleEditFormChange('event_time', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          editFormErrors.event_time ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isSubmitting}
                      />
                      {editFormErrors.event_time && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {editFormErrors.event_time}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Количество гостей
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editFormData.guests_count}
                        onChange={(e) => handleEditFormChange('guests_count', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          editFormErrors.guests_count ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Например: 15"
                        disabled={isSubmitting}
                      />
                      {editFormErrors.guests_count && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {editFormErrors.guests_count}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Бюджет
                      </label>
                      <input
                        type="text"
                        value={editFormData.budget}
                        onChange={(e) => handleEditFormChange('budget', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Например: 50000 тенге"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Место проведения
                      </label>
                      <input
                        type="text"
                        value={editFormData.location}
                        onChange={(e) => handleEditFormChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Например: Ресторан 'Жемчужина', ул. Абая 15"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Статус заявки */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Статус заявки
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Текущий статус
                      </label>
                      <select
                        value={editFormData.status}
                        onChange={(e) => handleEditFormChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={isSubmitting}
                      >
                        <option value="new">Новая</option>
                        <option value="confirmed">Подтверждена</option>
                        <option value="in-progress">В работе</option>
                        <option value="completed">Завершена</option>
                        <option value="cancelled">Отменена</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Сообщение клиента */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                    Сообщение клиента
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дополнительная информация
                    </label>
                    <textarea
                      value={editFormData.message}
                      onChange={(e) => handleEditFormChange('message', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={4}
                      placeholder="Дополнительные пожелания клиента..."
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Футер формы */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button 
                  type="button"
                  onClick={closeEditModal}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={isSubmitting}
                >
                  Отмена
                </button>
                <button 
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Сохранение...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Сохранить изменения</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;