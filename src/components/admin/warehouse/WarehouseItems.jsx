import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Filter,
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  FolderOpen,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Grid3X3,
  List,
  X,
  Save,
  Plus,
  Tag,
  Hash,
  DollarSign,
  FileText,
  MapPin,
  User,
  Calendar,
  Barcode,
  Layers
} from 'lucide-react';

// Модальное окно просмотра товара
const ViewItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  const getStockStatusIcon = (item) => {
    if (item.current_quantity === 0) {
      return <XCircle className="h-6 w-6 text-red-500" />;
    } else if (item.is_low_stock) {
      return <AlertTriangle className="h-6 w-6 text-orange-500" />;
    } else {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
  };

  const getStockStatusText = (item) => {
    if (item.current_quantity === 0) {
      return 'Нет в наличии';
    } else if (item.is_low_stock) {
      return 'Низкий остаток';
    } else {
      return 'В наличии';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Не указано';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Информация о товаре
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Содержимое */}
        <div className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Название товара</label>
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              </div>

              {item.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Описание</label>
                  <p className="text-gray-900">{item.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {item.sku && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Артикул</label>
                    <div className="flex items-center space-x-2">
                      <Hash className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{item.sku}</p>
                    </div>
                  </div>
                )}
                {item.barcode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Штрихкод</label>
                    <div className="flex items-center space-x-2">
                      <Barcode className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{item.barcode}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Единица измерения</label>
                <p className="text-gray-900">{item.unit || 'шт'}</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Статус товара */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Статус товара</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  item.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status === 'active' ? 'Активный' : 'Неактивный'}
                </span>
              </div>

              {/* Статус остатка */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Статус остатка</label>
                <div className="flex items-center space-x-2">
                  {getStockStatusIcon(item)}
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    item.current_quantity === 0 ? 'bg-red-100 text-red-800' :
                    item.is_low_stock ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {getStockStatusText(item)}
                  </span>
                </div>
              </div>

              {/* Количество */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Текущий остаток</label>
                <p className="text-lg font-semibold text-gray-900">{item.current_quantity} {item.unit}</p>
              </div>

              {item.reserved_quantity > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Зарезервировано</label>
                  <p className="text-lg font-semibold text-orange-600">{item.reserved_quantity} {item.unit}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Доступно</label>
                <p className="text-lg font-semibold text-green-600">{item.available_quantity || item.current_quantity} {item.unit}</p>
              </div>
            </div>
          </div>

          {/* Категории */}
          {item.category_names && item.category_names.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <Layers className="h-5 w-5 text-purple-600" />
                <span>Категории</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.category_names.map((categoryName, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {categoryName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Нормы остатков */}
          {(item.min_quantity || item.max_quantity) && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Нормы остатков</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.min_quantity && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Минимальное количество</label>
                    <p className="text-gray-900">{item.min_quantity} {item.unit}</p>
                  </div>
                )}
                {item.max_quantity && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Максимальное количество</label>
                    <p className="text-gray-900">{item.max_quantity} {item.unit}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Финансовая информация */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Стоимость</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Себестоимость за единицу</label>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(item.cost_price)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Общая стоимость остатка</label>
                <p className="text-lg font-semibold text-purple-600">
                  {formatCurrency((item.cost_price || 0) * (item.current_quantity || 0))}
                </p>
              </div>
              {item.sale_price && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Цена продажи</label>
                  <p className="text-lg font-semibold text-green-600">{formatCurrency(item.sale_price)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Дополнительная информация */}
          {(item.location || item.supplier || item.created_at || item.updated_at) && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Дополнительная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Местоположение</label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{item.location}</p>
                    </div>
                  </div>
                )}
                {item.supplier && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Поставщик</label>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{item.supplier}</p>
                    </div>
                  </div>
                )}
                {item.created_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Дата создания</label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{formatDate(item.created_at)}</p>
                    </div>
                  </div>
                )}
                {item.updated_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Последнее обновление</label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900">{formatDate(item.updated_at)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Футер */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

// Модальное окно редактирования товара
const EditItemModal = ({ item, isOpen, onClose, onSave, categories, showNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    barcode: '',
    unit: '',
    min_quantity: '',
    max_quantity: '',
    cost_price: '',
    sale_price: '',
    location: '',
    supplier: '',
    status: 'active',
    category_names: []
  });
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        sku: item.sku || '',
        barcode: item.barcode || '',
        unit: item.unit || '',
        min_quantity: item.min_quantity || '',
        max_quantity: item.max_quantity || '',
        cost_price: item.cost_price || '',
        sale_price: item.sale_price || '',
        location: item.location || '',
        supplier: item.supplier || '',
        status: item.status || 'active',
        category_names: item.category_names || []
      });
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showNotification('Укажите название товара', 'error');
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        ...formData,
        min_quantity: formData.min_quantity ? parseFloat(formData.min_quantity) : 0,
        max_quantity: formData.max_quantity ? parseFloat(formData.max_quantity) : 0,
        cost_price: formData.cost_price ? parseFloat(formData.cost_price) : null,
        sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null
      };

      await onSave(item.id, updateData);
      showNotification('Товар успешно обновлен', 'success');
      onClose();
    } catch (error) {
      console.error('Error updating item:', error);
      showNotification('Ошибка при обновлении товара', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.category_names.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        category_names: [...prev.category_names, newCategory.trim()]
      }));
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      category_names: prev.category_names.filter(cat => cat !== categoryToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Edit className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Редактировать товар
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Содержимое */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название товара *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Введите название товара..."
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Описание товара..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Артикул
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleChange('sku', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Артикул товара..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Штрихкод
              </label>
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => handleChange('barcode', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Штрихкод..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Единица измерения
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange('unit', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="шт, кг, л и т.д."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Статус
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="active">Активный</option>
                <option value="inactive">Неактивный</option>
              </select>
            </div>
          </div>

          {/* Категории */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Категории</h3>
            
            {/* Добавление новой категории */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Добавить категорию..."
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Добавить</span>
              </button>
            </div>

            {/* Список категорий */}
            <div className="flex flex-wrap gap-2">
              {formData.category_names.map((categoryName, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {categoryName}
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(categoryName)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Нормы остатков */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Нормы остатков</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Минимальное количество
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.min_quantity}
                  onChange={(e) => handleChange('min_quantity', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Максимальное количество
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.max_quantity}
                  onChange={(e) => handleChange('max_quantity', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Цены */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Цены</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Себестоимость
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.cost_price}
                    onChange={(e) => handleChange('cost_price', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ₸
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена продажи
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.sale_price}
                    onChange={(e) => handleChange('sale_price', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ₸
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Дополнительная информация</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Местоположение
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Стеллаж, ряд, ячейка..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Поставщик
                </label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => handleChange('supplier', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Название поставщика..."
                />
              </div>
            </div>
          </div>
        </form>

        {/* Футер */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Сохранение...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Сохранить</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Модальное окно удаления товара
const DeleteItemModal = ({ item, isOpen, onClose, onDelete, showNotification }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !item) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(item.id);
      showNotification('Товар успешно удален', 'success');
      onClose();
    } catch (error) {
      console.error('Error deleting item:', error);
      showNotification('Ошибка при удалении товара', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Trash2 className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Удалить товар
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Содержимое */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Вы уверены, что хотите удалить этот товар?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Это действие нельзя отменить. Все данные о товаре будут удалены навсегда.
            </p>
          </div>

          {/* Информация о товаре */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Информация о товаре:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Название:</span> {item.name}</p>
              {item.sku && <p><span className="font-medium">Артикул:</span> {item.sku}</p>}
              <p><span className="font-medium">Остаток:</span> {item.current_quantity} {item.unit}</p>
              {item.category_names && item.category_names.length > 0 && (
                <p><span className="font-medium">Категории:</span> {item.category_names.join(', ')}</p>
              )}
            </div>
          </div>

          {/* Предупреждение о остатках */}
          {item.current_quantity > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-orange-800 mb-1">
                    Внимание! На складе есть остатки
                  </h4>
                  <p className="text-sm text-orange-700">
                    У данного товара есть остатки на складе ({item.current_quantity} {item.unit}). 
                    Рекомендуется сначала списать все остатки перед удалением товара.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Футер */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            Отмена
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Удаление...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Удалить товар</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Основной компонент WarehouseItems
const WarehouseItems = ({ 
  loading, 
  categories, 
  items, 
  loadCategories, 
  loadItems, 
  handleSearchItems,
  showNotification,
  updateItem, // Новый prop для обновления товара
  deleteItem  // Новый prop для удаления товара
}) => {
  const [viewMode, setViewMode] = useState('categories'); // 'categories' или 'table'
  const [selectedCategories, setSelectedCategories] = useState([]); // Выбранные категории для фильтрации
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'active',
    stock_filter: 'all'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 20,
    total: 0,
    pages: 1
  });

  // Состояния модальных окон
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Загрузка товаров при монтировании и изменении фильтров
  useEffect(() => {
    loadItemsWithFilters();
  }, [selectedCategories, searchQuery, filters, pagination.page]);

  const loadItemsWithFilters = async () => {
    const params = {
      page: pagination.page,
      per_page: pagination.per_page,
      search: searchQuery,
      category_names: selectedCategories,
      ...filters
    };

    const result = await loadItems(params);
    if (result.pagination) {
      setPagination(result.pagination);
    }
  };

  // Обработчики модальных окон
  const handleViewItem = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleSaveItem = async (itemId, formData) => {
    if (updateItem) {
      await updateItem(itemId, formData);
      loadItemsWithFilters();
    }
  };

  const handleConfirmDelete = async (itemId) => {
    if (deleteItem) {
      await deleteItem(itemId);
      loadItemsWithFilters();
    }
  };

  // Функция для группировки товаров по категориям
  const groupItemsByCategories = (items, selectedCategories = []) => {
    const categoryGroups = {};

    items.forEach(item => {
      const itemCategories = item.category_names || [];
      
      if (selectedCategories.length > 0) {
        const hasSelectedCategory = selectedCategories.some(selectedCat => 
          itemCategories.includes(selectedCat)
        );
        if (!hasSelectedCategory) return;
      }

      const remainingCategories = itemCategories.filter(cat => 
        !selectedCategories.includes(cat)
      );

      if (remainingCategories.length > 0) {
        remainingCategories.forEach(category => {
          if (!categoryGroups[category]) {
            categoryGroups[category] = [];
          }
          categoryGroups[category].push(item);
        });
      } else {
        if (!categoryGroups['__all__']) {
          categoryGroups['__all__'] = [];
        }
        categoryGroups['__all__'].push(item);
      }
    });

    return categoryGroups;
  };

  const categoryGroups = groupItemsByCategories(items, selectedCategories);

  // Обработчик выбора категории
  const handleCategorySelect = (categoryName) => {
    if (categoryName === '__all__') {
      setViewMode('table');
      return;
    }

    const newSelected = [...selectedCategories, categoryName];
    setSelectedCategories(newSelected);
    setBreadcrumbs([...breadcrumbs, categoryName]);

    const remainingItems = items.filter(item => {
      const itemCategories = item.category_names || [];
      return newSelected.every(selectedCat => itemCategories.includes(selectedCat));
    });

    const hasSubcategories = remainingItems.some(item => {
      const itemCategories = item.category_names || [];
      const remainingCategories = itemCategories.filter(cat => !newSelected.includes(cat));
      return remainingCategories.length > 0;
    });

    if (!hasSubcategories) {
      setViewMode('table');
    }
  };

  // Обработчик возврата назад
  const handleBackToCategories = () => {
    if (breadcrumbs.length > 0) {
      const newBreadcrumbs = breadcrumbs.slice(0, -1);
      setBreadcrumbs(newBreadcrumbs);
      setSelectedCategories(newBreadcrumbs);
      if (newBreadcrumbs.length === 0) {
        setViewMode('categories');
      }
    } else {
      setViewMode('categories');
      setSelectedCategories([]);
      setBreadcrumbs([]);
    }
  };

  const handleShowAllItems = () => {
    setViewMode('table');
  };

  const getStockStatusIcon = (item) => {
    if (item.current_quantity === 0) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    } else if (item.is_low_stock) {
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStockStatusText = (item) => {
    if (item.current_quantity === 0) {
      return 'Нет в наличии';
    } else if (item.is_low_stock) {
      return 'Низкий остаток';
    } else {
      return 'В наличии';
    }
  };

  // Рендер динамических категорий
  const renderDynamicCategories = () => {
    const groups = Object.entries(categoryGroups);
    
    return (
      <div className="space-y-6">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex overflow-x-auto pb-2" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 sm:space-x-4 whitespace-nowrap">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setBreadcrumbs([]);
                    setViewMode('categories');
                  }}
                  className="text-gray-400 hover:text-gray-500 text-xs sm:text-sm flex-shrink-0"
                >
                  Все категории
                </button>
              </li>
              {breadcrumbs.map((category, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
                    <button
                      onClick={() => {
                        const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
                        setBreadcrumbs(newBreadcrumbs);
                        setSelectedCategories(newBreadcrumbs);
                      }}
                      className="ml-2 sm:ml-4 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 flex-shrink-0"
                    >
                      {category}
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Заголовок с информацией */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
              {selectedCategories.length > 0 
                ? `Категории в "${selectedCategories.join(' → ')}"` 
                : 'Все категории товаров'
              }
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Найдено {groups.length} {groups.length === 1 ? 'категория' : 'категорий'} 
              {selectedCategories.length > 0 && ` в выбранном разделе`}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className="px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-1 sm:space-x-2"
            >
              <List className="h-4 w-4" />
              <span>Список товаров</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Кнопка "Все товары вместе" */}
          <div
            onClick={handleShowAllItems}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-purple-300 hover:border-purple-400"
          >
            <div className="p-6 text-center">
              <Grid3X3 className="mx-auto h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Все товары</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                Показать все товары{selectedCategories.length > 0 && ' в выбранных категориях'}
              </p>
              <div className="text-xs text-purple-600 font-medium">
                {(() => {
                  const filteredItemsCount = selectedCategories.length > 0 
                    ? items.filter(item => {
                        const itemCategories = item.category_names.map(item => item.toLowerCase()) || [];
                        return selectedCategories.every(selectedCat => 
                          itemCategories.includes(selectedCat.toLowerCase())
                        );
                      }).length
                    : items.length;
                  
                  const getItemsText = (count) => {
                    if (count === 1) return 'товар';
                    if (count >= 2 && count <= 4) return 'товара';
                    return 'товаров';
                  };
                  
                  return `${filteredItemsCount} ${getItemsText(filteredItemsCount)}`;
                })()}
              </div>
            </div>
          </div>

          {/* Динамические категории */}
          {groups.map(([categoryName, categoryItems]) => {
            if (categoryName === '__all__') return null;
            
            return (
              <div
                key={categoryName}
                onClick={() => handleCategorySelect(categoryName)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border hover:border-purple-300"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FolderOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 mb-2 capitalize truncate">
                    {categoryName}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">Товаров:</span>
                      <span className="font-medium text-blue-600">
                        {categoryItems.length}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      {categoryItems.slice(0, 2).map(item => item.name).join(', ')}
                      {categoryItems.length > 2 && ` и еще ${categoryItems.length - 2}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Если нет категорий */}
          {groups.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Категории не найдены</h3>
              <p className="text-gray-500">
                {selectedCategories.length > 0 
                  ? 'В выбранных категориях нет подкатегорий'
                  : 'Товары не имеют категорий или не найдены'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Рендер таблицы товаров
  const renderItemsTable = () => {
    const filteredItems = selectedCategories.length > 0 
      ? items.filter(item => {
          const itemCategories = item.category_names.map(item => item.toLowerCase()) || [];
          return selectedCategories.every(selectedCat => 
            itemCategories.includes(selectedCat.toLowerCase())
          );
        })
      : items;

    return (
      <div className="space-y-6">
        {/* Модальные окна */}
        <ViewItemModal
          item={selectedItem}
          isOpen={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedItem(null);
          }}
        />

        <EditItemModal
          item={selectedItem}
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={handleSaveItem}
          categories={categories}
          showNotification={showNotification}
        />

        <DeleteItemModal
          item={selectedItem}
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedItem(null);
          }}
          onDelete={handleConfirmDelete}
          showNotification={showNotification}
        />

        {/* Заголовок и навигация */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleBackToCategories}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-xs sm:text-base self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Назад к категориям</span>
            </button>
            
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {selectedCategories.length > 0 
                  ? `Товары: ${selectedCategories.join(' → ')}`
                  : 'Все товары'
                }
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Найдено {filteredItems.length} товаров
                {selectedCategories.length > 0 && ' в выбранных категориях'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setViewMode('categories')}
            className="px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <Grid3X3 className="h-4 w-4" />
            <span>К категориям</span>
          </button>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Поиск */}
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 sm:pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Фильтр по статусу */}
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
              <option value="all">Все статусы</option>
            </select>

            {/* Фильтр по остаткам */}
            <select
              value={filters.stock_filter}
              onChange={(e) => setFilters(prev => ({ ...prev, stock_filter: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Все товары</option>
              <option value="normal">Нормальные остатки</option>
              <option value="low">Низкие остатки</option>
              <option value="out">Нет в наличии</option>
              <option value="overstocked">Избыток</option>
            </select>

            {/* Кнопка сброса фильтров */}
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({ status: 'active', stock_filter: 'all' });
              }}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Сбросить
            </button>
          </div>
        </div>

        {/* Таблица товаров */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Мобильная версия - карточки */}
          <div className="block sm:hidden">
            {loading ? (
              <div className="px-4 py-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Загрузка товаров...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Товары не найдены</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <div key={item.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                        {(item.sku || item.barcode) && (
                          <p className="text-xs text-gray-500 truncate">
                            {item.sku && `Артикул: ${item.sku}`}
                            {item.barcode && ` • ${item.barcode}`}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <button 
                          onClick={() => handleViewItem(item)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Просмотреть"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Редактировать"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item)}
                          className="text-red-600 hover:text-red-900"
                          title="Удалить"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        {getStockStatusIcon(item)}
                        <span>{item.current_quantity} {item.unit}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full ${
                        item.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'active' ? 'Активный' : 'Неактивный'}
                      </span>
                    </div>
                    
                    {(item.category_names || []).length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {(item.category_names || []).map((categoryName, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                          >
                            {categoryName}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'KZT',
                        minimumFractionDigits: 0
                      }).format(item.cost_price || 0)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Десктопная версия - таблица */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Остаток
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Стоимость
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                      <p className="mt-2 text-gray-500">Загрузка товаров...</p>
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">Товары не найдены</p>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {item.sku && `Артикул: ${item.sku}`}
                            {item.barcode && ` • Штрих-код: ${item.barcode}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {(item.category_names || []).map((categoryName, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                            >
                              {categoryName}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStockStatusIcon(item)}
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-gray-900">
                              {item.current_quantity} {item.unit}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getStockStatusText(item)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status === 'active' ? 'Активный' : 'Неактивный'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'KZT',
                          minimumFractionDigits: 0
                        }).format(item.cost_price || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => handleViewItem(item)}
                            className="text-purple-600 hover:text-purple-900 hover:bg-purple-50 p-1 rounded transition-colors"
                            title="Просмотреть"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleEditItem(item)}
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 p-1 rounded transition-colors"
                            title="Редактировать"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteItem(item)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50 p-1 rounded transition-colors"
                            title="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Пагинация */}
          {pagination.pages > 1 && (
            <div className="bg-white px-3 sm:px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={!pagination.has_prev}
                  className="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Предыдущая
                </button>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={!pagination.has_next}
                  className="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Следующая
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Показано{' '}
                    <span className="font-medium">
                      {(pagination.page - 1) * pagination.per_page + 1}
                    </span>{' '}
                    до{' '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.per_page, pagination.total)}
                    </span>{' '}
                    из{' '}
                    <span className="font-medium">{pagination.total}</span>{' '}
                    результатов
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={!pagination.has_prev}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Предыдущая
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setPagination(prev => ({ ...prev, page: pageNumber }))}
                          className={`relative inline-flex items-center px-4 py-2 border text-xs sm:text-sm font-medium ${
                            pagination.page === pageNumber
                              ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={!pagination.has_next}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Следующая
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {viewMode === 'categories' ? renderDynamicCategories() : renderItemsTable()}
    </div>
  );
};

export default WarehouseItems;