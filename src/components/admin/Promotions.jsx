// components/admin/Promotions.js
import React, { useState } from 'react';
import { Plus, Search, Gift, TrendingUp, Clock, Users, Eye, Edit, Trash2, Save, X } from 'lucide-react';
import { getStatusColor, getStatusText, promotionTypes } from '../../utils/helpers';

const Promotions = ({ showNotification }) => {
  const [showAddPromotion, setShowAddPromotion] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [promotionForm, setPromotionForm] = useState({
    title: '',
    description: '',
    discount: '',
    type: '',
    promoCode: '',
    startDate: '',
    endDate: '',
    maxUses: '',
    conditions: '',
    status: 'draft',
    featured: false
  });

  // Моковые данные акций
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: 'Скидка 20% на детские праздники',
      description: 'Специальное предложение на организацию детских дней рождения',
      discount: '20%',
      type: 'discount',
      promoCode: 'KIDS20',
      startDate: '2025-01-01',
      endDate: '2025-02-28',
      maxUses: 50,
      usedCount: 12,
      conditions: 'Минимальная сумма заказа 30,000 ₸',
      status: 'active',
      featured: true,
      validPeriod: '01.01 - 28.02',
      created: '2024-12-25'
    },
    {
      id: 2,
      title: 'Пакет "Свадьба мечты"',
      description: 'Комплексная организация свадьбы со скидкой',
      discount: '15%',
      type: 'package',
      promoCode: 'WEDDING15',
      startDate: '2025-03-01',
      endDate: '2025-09-30',
      maxUses: 20,
      usedCount: 0,
      conditions: 'При заказе полного пакета услуг',
      status: 'scheduled',
      featured: false,
      validPeriod: '01.03 - 30.09',
      created: '2025-01-05'
    },
    {
      id: 3,
      title: 'Раннее бронирование корпоративов',
      description: 'Скидка за раннее бронирование новогодних корпоративов',
      discount: '25%',
      type: 'seasonal',
      promoCode: 'EARLY25',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      maxUses: 30,
      usedCount: 25,
      conditions: 'Бронирование за 2 месяца',
      status: 'expired',
      featured: false,
      validPeriod: '01.10 - 31.12',
      created: '2024-09-15'
    }
  ]);

  const resetPromotionForm = () => {
    setPromotionForm({
      title: '',
      description: '',
      discount: '',
      type: '',
      promoCode: '',
      startDate: '',
      endDate: '',
      maxUses: '',
      conditions: '',
      status: 'draft',
      featured: false
    });
    setEditingPromotion(null);
  };

  const handlePromotionSubmit = (e) => {
    e.preventDefault();
    
    const validPeriod = `${new Date(promotionForm.startDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })} - ${new Date(promotionForm.endDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}`;
    
    if (editingPromotion) {
      // Обновление существующей акции
      setPromotions(prev => 
        prev.map(promotion => 
          promotion.id === editingPromotion.id 
            ? { 
                ...promotionForm, 
                id: editingPromotion.id,
                usedCount: promotion.usedCount,
                validPeriod,
                created: promotion.created
              }
            : promotion
        )
      );
      showNotification('Акция обновлена', 'success');
    } else {
      // Добавление новой акции
      const newPromotion = {
        ...promotionForm,
        id: Date.now(),
        usedCount: 0,
        validPeriod,
        created: new Date().toISOString().split('T')[0]
      };
      setPromotions(prev => [...prev, newPromotion]);
      showNotification('Акция добавлена', 'success');
    }
    
    setShowAddPromotion(false);
    resetPromotionForm();
  };

  const handleEditPromotion = (promotion) => {
    setEditingPromotion(promotion);
    setPromotionForm({
      ...promotion,
      maxUses: promotion.maxUses.toString()
    });
    setShowAddPromotion(true);
  };

  const handleDeletePromotion = (promotionId) => {
    setPromotions(prev => prev.filter(promotion => promotion.id !== promotionId));
    showNotification('Акция удалена', 'success');
  };

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = searchQuery === '' || 
      promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promotion.promoCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || promotion.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || promotion.type === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: promotions.length,
    active: promotions.filter(p => p.status === 'active').length,
    scheduled: promotions.filter(p => p.status === 'scheduled').length,
    totalUses: promotions.reduce((sum, p) => sum + p.usedCount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Акции и скидки</h2>
        <button 
          onClick={() => setShowAddPromotion(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить акцию</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Gift className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Всего акций</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Активные</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Запланированные</p>
              <p className="text-2xl font-bold text-gray-900">{stats.scheduled}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Использований</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUses}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск акций..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="scheduled">Запланированные</option>
            <option value="expired">Завершенные</option>
            <option value="draft">Черновики</option>
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Все типы</option>
            {promotionTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Список акций */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map(promotion => (
          <div key={promotion.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`h-2 ${
              promotion.status === 'active' ? 'bg-green-500' :
              promotion.status === 'scheduled' ? 'bg-yellow-500' :
              promotion.status === 'expired' ? 'bg-red-500' :
              'bg-gray-500'
            }`}></div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{promotion.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                  {getStatusText(promotion.status)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{promotion.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Скидка:</span>
                  <span className="font-semibold text-purple-600">{promotion.discount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Промокод:</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{promotion.promoCode}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Действует:</span>
                  <span className="text-gray-900">{promotion.validPeriod}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Использовано:</span>
                  <span className="text-gray-900">{promotion.usedCount} из {promotion.maxUses}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditPromotion(promotion)}
                  className="flex-1 bg-purple-100 text-purple-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-200"
                >
                  Редактировать
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeletePromotion(promotion.id)}
                  className="bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal для добавления/редактирования акции */}
      {showAddPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingPromotion ? 'Редактировать акцию' : 'Создать новую акцию'}
              </h3>
              <button
                onClick={() => { setShowAddPromotion(false); resetPromotionForm(); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handlePromotionSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название акции *
                  </label>
                  <input
                    type="text"
                    required
                    value={promotionForm.title}
                    onChange={(e) => setPromotionForm({...promotionForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: Скидка 20% на детские праздники"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип акции *
                  </label>
                  <select
                    required
                    value={promotionForm.type}
                    onChange={(e) => setPromotionForm({...promotionForm, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Выберите тип</option>
                    {promotionTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Размер скидки *
                  </label>
                  <input
                    type="text"
                    required
                    value={promotionForm.discount}
                    onChange={(e) => setPromotionForm({...promotionForm, discount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="20% или 10000 ₸"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Промокод
                  </label>
                  <input
                    type="text"
                    value={promotionForm.promoCode}
                    onChange={(e) => setPromotionForm({...promotionForm, promoCode: e.target.value.toUpperCase()})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="WINTER2025"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата начала *
                  </label>
                  <input
                    type="date"
                    required
                    value={promotionForm.startDate}
                    onChange={(e) => setPromotionForm({...promotionForm, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата окончания *
                  </label>
                  <input
                    type="date"
                    required
                    value={promotionForm.endDate}
                    onChange={(e) => setPromotionForm({...promotionForm, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Лимит использований
                  </label>
                  <input
                    type="number"
                    value={promotionForm.maxUses}
                    onChange={(e) => setPromotionForm({...promotionForm, maxUses: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус
                  </label>
                  <select
                    value={promotionForm.status}
                    onChange={(e) => setPromotionForm({...promotionForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Черновик</option>
                    <option value="scheduled">Запланировано</option>
                    <option value="active">Активно</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание акции
                </label>
                <textarea
                  value={promotionForm.description}
                  onChange={(e) => setPromotionForm({...promotionForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Подробное описание условий акции..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Условия использования
                </label>
                <textarea
                  value={promotionForm.conditions}
                  onChange={(e) => setPromotionForm({...promotionForm, conditions: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Минимальная сумма заказа, ограничения и т.д."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={promotionForm.featured}
                  onChange={(e) => setPromotionForm({...promotionForm, featured: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Показывать на главной странице
                </label>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingPromotion ? 'Обновить акцию' : 'Сохранить акцию'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddPromotion(false); resetPromotionForm(); }}
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

export default Promotions;