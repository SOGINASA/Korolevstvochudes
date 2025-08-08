// components/admin/Services.js
import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Star, Sparkles, TrendingUp, Save, X, AlertCircle } from 'lucide-react';
import { getStatusColor, getStatusText, serviceCategories } from '../../utils/helpers';
import { apiService } from '../../services/api';

const Services = ({ showNotification }) => {
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [adminServices, setAdminServices] = useState([]);
  const [stats, setStats] = useState({
    total_services: 0,
    active_services: 0,
    featured_services: 0,
    total_views: 0
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 20,
    total: 0,
    pages: 0
  });
  
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: '',
    duration: '',
    minGuests: '',
    rating: 5,
    price: '',
    priceDescription: '',
    description: '',
    features: '',
    subcategories: '',
    coverImage: '',
    images: '',
    featured: false,
    tags: '',
    status: 'active'
  });

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadServices();
    loadStats();
  }, []);

  // Загрузка услуг с бэкенда
  const loadServices = async (page = 1, search = searchQuery) => {
    try {
      setLoading(true);
      const params = {
        page,
        per_page: 20,
        sort_by: 'created_at',
        sort_order: 'desc'
      };

      const result = await apiService.getAdminServices(params);
      
      if (result.success) {
        setAdminServices(result.services || []);
        setPagination(result.pagination || {});
      } else {
        showNotification('Ошибка загрузки услуг: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
      showNotification('Ошибка загрузки услуг', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Загрузка статистики
  const loadStats = async () => {
    try {
      const result = await apiService.getServicesStats();
      if (result.success) {
        setStats({
          total_services: result.total_services || 0,
          active_services: result.active_services || 0,
          featured_services: result.featured_services || 0,
          total_views: result.total_views || 0
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  };

  // Поиск с задержкой
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery !== undefined) {
        loadServices(1, searchQuery);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  const resetServiceForm = () => {
    setServiceForm({
      title: '',
      category: '',
      duration: '',
      minGuests: '',
      rating: 5,
      price: '',
      priceDescription: '',
      description: '',
      features: '',
      subcategories: '',
      coverImage: '',
      images: '',
      featured: false,
      tags: '',
      status: 'active'
    });
    setEditingService(null);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    
    try {
      // Подготавливаем данные для отправки
      const serviceData = {
        ...serviceForm,
        rating: parseFloat(serviceForm.rating) || 5.0
      };

      let result;
      if (editingService) {
        // Обновление существующей услуги
        result = await apiService.updateService(editingService.id, serviceData);
        if (result.success) {
          showNotification('Услуга успешно обновлена', 'success');
        }
      } else {
        // Создание новой услуги
        result = await apiService.createService(serviceData);
        if (result.success) {
          showNotification('Услуга успешно создана', 'success');
        }
      }

      if (result.success) {
        setShowAddService(false);
        resetServiceForm();
        loadServices(); // Перезагружаем список услуг
        loadStats(); // Обновляем статистику
      } else {
        showNotification('Ошибка: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Ошибка при сохранении услуги:', error);
      showNotification('Ошибка при сохранении услуги', 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title || '',
      category: service.category || '',
      duration: service.duration || '',
      minGuests: service.minGuests || '',
      rating: service.rating || 5,
      price: service.price || '',
      priceDescription: service.priceDescription || '',
      description: service.description || '',
      features: Array.isArray(service.features) ? service.features.join(', ') : (service.features || ''),
      subcategories: Array.isArray(service.subcategories) ? service.subcategories.join(', ') : (service.subcategories || ''),
      coverImage: service.coverImage || '',
      images: Array.isArray(service.images) ? service.images.join(', ') : (service.images || ''),
      featured: service.featured || false,
      tags: Array.isArray(service.tags) ? service.tags.join(', ') : (service.tags || ''),
      status: service.status || 'active'
    });
    setShowAddService(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
      return;
    }

    try {
      const result = await apiService.deleteService(serviceId);
      if (result.success) {
        showNotification('Услуга успешно удалена', 'success');
        loadServices(); // Перезагружаем список
        loadStats(); // Обновляем статистику
      } else {
        showNotification('Ошибка при удалении: ' + result.error, 'error');
      }
    } catch (error) {
      console.error('Ошибка при удалении услуги:', error);
      showNotification('Ошибка при удалении услуги', 'error');
    }
  };

  const handlePageChange = (newPage) => {
    loadServices(newPage);
  };

  // Отфильтрованные услуги (теперь фильтрация происходит на бэкенде)
  const filteredServices = adminServices;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Управление услугами</h2>
        <button 
          onClick={() => setShowAddService(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          disabled={loading}
        >
          <Plus className="h-4 w-4" />
          <span>Добавить услугу</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Всего услуг</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_services}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Активные</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active_services}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Популярные</p>
              <p className="text-2xl font-bold text-gray-900">{stats.featured_services}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Просмотры</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total_views.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Таблица услуг */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск услуг..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
              <span className="text-gray-600">Загрузка услуг...</span>
            </div>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {searchQuery ? 'Услуги не найдены' : 'Нет созданных услуг'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Услуга
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Категория
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Цена
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Рейтинг
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
                {filteredServices.map(service => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                          <Sparkles className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service.title}</div>
                          <div className="text-sm text-gray-500">{service.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {serviceCategories.find(cat => cat.value === service.category)?.label || service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.price}</div>
                      <div className="text-sm text-gray-500">{service.priceDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(Math.floor(service.rating || 0))].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {service.rating ? service.rating.toFixed(1) : '0.0'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                        {getStatusText(service.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-purple-600 hover:text-purple-900"
                          title="Просмотр"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditService(service)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Редактировать"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteService(service.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Удалить"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Пагинация */}
        {pagination.pages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Показано {((pagination.page - 1) * pagination.per_page) + 1}-{Math.min(pagination.page * pagination.per_page, pagination.total)} из {pagination.total}
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.has_prev}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Назад
              </button>
              {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                const page = i + Math.max(1, pagination.page - 2);
                if (page > pagination.pages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm border rounded-md ${
                      page === pagination.page
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.has_next}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                Вперед
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal для добавления/редактирования услуги */}
      {showAddService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingService ? 'Редактировать услугу' : 'Добавить новую услугу'}
              </h3>
              <button 
                onClick={() => { setShowAddService(false); resetServiceForm(); }} 
                className="text-gray-400 hover:text-gray-600"
                disabled={submitLoading}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Название услуги *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: Детские праздники"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Категория *</label>
                  <select
                    required
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={submitLoading}
                  >
                    <option value="">Выберите категорию</option>
                    {serviceCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Продолжительность *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: 3-4 часа"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Минимум гостей *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.minGuests}
                    onChange={(e) => setServiceForm({...serviceForm, minGuests: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: 10 детей"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Цена *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: от 45,000 ₸"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Описание цены</label>
                  <input
                    type="text"
                    value={serviceForm.priceDescription}
                    onChange={(e) => setServiceForm({...serviceForm, priceDescription: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: базовый пакет"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                  <select
                    value={serviceForm.status}
                    onChange={(e) => setServiceForm({...serviceForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={submitLoading}
                  >
                    <option value="active">Активная</option>
                    <option value="inactive">Неактивная</option>
                    <option value="draft">Черновик</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Рейтинг</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setServiceForm({...serviceForm, rating})}
                      className="focus:outline-none"
                      disabled={submitLoading}
                    >
                      <Star className={`h-6 w-6 ${rating <= serviceForm.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`} />
                    </button>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{serviceForm.rating} из 5</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Описание услуги *</label>
                <textarea
                  required
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Подробное описание услуги..."
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Особенности (через запятую)</label>
                <textarea
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Аниматоры, Игры, Аквагрим, Подарки"
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Подкатегории (через запятую)</label>
                <input
                  type="text"
                  value={serviceForm.subcategories}
                  onChange={(e) => setServiceForm({...serviceForm, subcategories: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Дни рождения, Выпускные"
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL обложки</label>
                <input
                  type="url"
                  value={serviceForm.coverImage}
                  onChange={(e) => setServiceForm({...serviceForm, coverImage: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL изображений (через запятую)</label>
                <textarea
                  value={serviceForm.images}
                  onChange={(e) => setServiceForm({...serviceForm, images: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Теги (через запятую)</label>
                <input
                  type="text"
                  value={serviceForm.tags}
                  onChange={(e) => setServiceForm({...serviceForm, tags: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="детский, праздник, аниматор"
                  disabled={submitLoading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={serviceForm.featured}
                  onChange={(e) => setServiceForm({...serviceForm, featured: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  disabled={submitLoading}
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Популярная услуга</label>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {submitLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Сохранение...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{editingService ? 'Обновить услугу' : 'Сохранить услугу'}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddService(false); resetServiceForm(); }}
                  disabled={submitLoading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;