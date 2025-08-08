// components/admin/Services.js
import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Star, Sparkles, TrendingUp, Save, X } from 'lucide-react';
import { getStatusColor, getStatusText, serviceCategories } from '../../utils/helpers';

const Services = ({ showNotification }) => {
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
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
    tags: ''
  });

  // Моковые данные услуг
  const [adminServices, setAdminServices] = useState([
    {
      id: 1,
      title: 'Детские праздники',
      category: 'children',
      duration: '3-4 часа',
      minGuests: '10 детей',
      rating: 5,
      price: 'от 45,000 ₸',
      priceDescription: 'базовый пакет',
      description: 'Яркие и веселые детские праздники с профессиональными аниматорами',
      features: ['Аниматоры', 'Игры', 'Аквагрим', 'Подарки'],
      subcategories: ['Дни рождения', 'Выпускные'],
      status: 'active',
      created: '2025-01-05'
    },
    {
      id: 2,
      title: 'Свадебные торжества',
      category: 'weddings',
      duration: '6-10 часов',
      minGuests: '30 человек',
      rating: 5,
      price: 'от 150,000 ₸',
      priceDescription: 'полный день',
      description: 'Создаем свадьбы мечты от регистрации до банкета',
      features: ['Ведущий', 'Музыка', 'Декор', 'Фото'],
      subcategories: ['Регистрация', 'Банкет'],
      status: 'active',
      created: '2025-01-03'
    }
  ]);

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
      tags: ''
    });
    setEditingService(null);
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    
    if (editingService) {
      // Обновление существующей услуги
      setAdminServices(prev => 
        prev.map(service => 
          service.id === editingService.id 
            ? { ...serviceForm, id: editingService.id, status: 'active' }
            : service
        )
      );
      showNotification('Услуга обновлена', 'success');
    } else {
      // Добавление новой услуги
      const newService = {
        ...serviceForm,
        id: Date.now(),
        status: 'active',
        created: new Date().toISOString().split('T')[0]
      };
      setAdminServices(prev => [...prev, newService]);
      showNotification('Услуга добавлена', 'success');
    }
    
    setShowAddService(false);
    resetServiceForm();
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      ...service,
      features: Array.isArray(service.features) ? service.features.join(', ') : service.features,
      subcategories: Array.isArray(service.subcategories) ? service.subcategories.join(', ') : service.subcategories
    });
    setShowAddService(true);
  };

  const handleDeleteService = (serviceId) => {
    setAdminServices(prev => prev.filter(service => service.id !== serviceId));
    showNotification('Услуга удалена', 'success');
  };

  const filteredServices = adminServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Управление услугами</h2>
        <button 
          onClick={() => setShowAddService(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
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
              <p className="text-2xl font-bold text-gray-900">{adminServices.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Активные</p>
              <p className="text-2xl font-bold text-gray-900">
                {adminServices.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Популярные</p>
              <p className="text-2xl font-bold text-gray-900">
                {adminServices.filter(s => s.featured).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Просмотры</p>
              <p className="text-2xl font-bold text-gray-900">15.2k</p>
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
            />
          </div>
        </div>

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
                      {[...Array(service.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
                      {getStatusText(service.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditService(service)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 hover:text-red-900"
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Категория *</label>
                  <select
                    required
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  />
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
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={serviceForm.featured}
                  onChange={(e) => setServiceForm({...serviceForm, featured: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">Популярная услуга</label>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingService ? 'Обновить услугу' : 'Сохранить услугу'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddService(false); resetServiceForm(); }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
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