import React, { useState, useEffect } from 'react';
import { 
  Archive, 
  Search, 
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Edit,
  TrendingUp,
  TrendingDown,
  X,
  Save,
  Package,
  DollarSign,
  Hash,
  FileText,
  Tag,
  Calendar,
  User
} from 'lucide-react';
import { apiService } from '../../../services/api';

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
    } else if (item.is_overstocked) {
      return <TrendingUp className="h-6 w-6 text-blue-500" />;
    } else {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
  };

  const getStockStatusText = (item) => {
    if (item.current_quantity === 0) {
      return 'Нет в наличии';
    } else if (item.is_low_stock) {
      return 'Низкий остаток';
    } else if (item.is_overstocked) {
      return 'Избыток';
    } else {
      return 'Нормально';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Категория</label>
                <p className="text-gray-900">{item.category?.name || 'Без категории'}</p>
                {item.category_path && (
                  <p className="text-sm text-gray-500">{item.category_path}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {item.sku && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Артикул</label>
                    <p className="text-gray-900">{item.sku}</p>
                  </div>
                )}
                {item.barcode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Штрихкод</label>
                    <p className="text-gray-900">{item.barcode}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Статус остатка */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Статус остатка</label>
                <div className="flex items-center space-x-2">
                  {getStockStatusIcon(item)}
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    item.current_quantity === 0 ? 'bg-red-100 text-red-800' :
                    item.is_low_stock ? 'bg-orange-100 text-orange-800' :
                    item.is_overstocked ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {getStockStatusText(item)}
                  </span>
                </div>
              </div>

              {/* Количество */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Текущий остаток</label>
                  <p className="text-lg font-semibold text-gray-900">{item.current_quantity} {item.unit}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Доступно</label>
                  <p className="text-lg font-semibold text-green-600">{item.available_quantity} {item.unit}</p>
                </div>
              </div>

              {item.reserved_quantity > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Зарезервировано</label>
                  <p className="text-lg font-semibold text-orange-600">{item.reserved_quantity} {item.unit}</p>
                </div>
              )}

              {/* Нормы остатков */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Минимум</label>
                  <p className="text-gray-900">{item.min_quantity} {item.unit}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Максимум</label>
                  <p className="text-gray-900">{item.max_quantity} {item.unit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Финансовая информация */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Стоимость</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Себестоимость за единицу</label>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(item.cost_price)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Общая стоимость остатка</label>
                <p className="text-lg font-semibold text-purple-600">{formatCurrency(item.total_value)}</p>
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
          {(item.location || item.supplier || item.created_at) && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Дополнительная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Местоположение</label>
                    <p className="text-gray-900">{item.location}</p>
                  </div>
                )}
                {item.supplier && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Поставщик</label>
                    <p className="text-gray-900">{item.supplier}</p>
                  </div>
                )}
                {item.created_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Дата создания</label>
                    <p className="text-gray-900">
                      {new Date(item.created_at).toLocaleDateString('ru-RU')}
                    </p>
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

// Модальное окно операции (поступление/списание)
const StockOperationModal = ({ item, isOpen, onClose, operation, onSave, showNotification }) => {
  const [formData, setFormData] = useState({
    quantity: '',
    reason: '',
    comment: '',
    document_number: '',
    cost_price: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        quantity: '',
        reason: '',
        comment: '',
        document_number: '',
        cost_price: item.cost_price || ''
      });
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      showNotification('Укажите корректное количество', 'error');
      return;
    }

    if (!formData.reason.trim()) {
      showNotification('Укажите причину операции', 'error');
      return;
    }

    setLoading(true);

    try {
      const operationData = {
        item_id: item.id,
        operation_type: operation,
        quantity: parseFloat(formData.quantity),
        reason: formData.reason.trim(),
        comment: formData.comment.trim(),
        document_number: formData.document_number.trim(),
        cost_price: formData.cost_price ? parseFloat(formData.cost_price) : null
      };

      await onSave(operationData);
      showNotification(
        `${operation === 'add' ? 'Поступление' : 'Списание'} успешно выполнено`, 
        'success'
      );
      onClose();
    } catch (error) {
      console.error('Error saving operation:', error);
      showNotification('Ошибка при выполнении операции', 'error');
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

  const maxQuantity = operation === 'remove' ? item.available_quantity : 999999;
  const operationTitle = operation === 'add' ? 'Поступление товара' : 'Списание товара';
  const operationIcon = operation === 'add' ? 
    <TrendingUp className="h-6 w-6 text-green-600" /> : 
    <TrendingDown className="h-6 w-6 text-red-600" />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {operationIcon}
            <h2 className="text-xl font-semibold text-gray-900">
              {operationTitle}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Информация о товаре */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Товар</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Название:</span> {item.name}</p>
              <p><span className="font-medium">Текущий остаток:</span> {item.current_quantity} {item.unit}</p>
              {operation === 'remove' && (
                <p><span className="font-medium">Доступно для списания:</span> 
                  <span className="text-green-600"> {item.available_quantity} {item.unit}</span>
                </p>
              )}
            </div>
          </div>

          {/* Количество */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Количество *
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0.01"
                max={maxQuantity}
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Введите количество..."
                required
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                {item.unit}
              </span>
            </div>
            {operation === 'remove' && (
              <p className="text-xs text-gray-500 mt-1">
                Максимально доступно: {item.available_quantity} {item.unit}
              </p>
            )}
          </div>

          {/* Себестоимость (только для поступления) */}
          {operation === 'add' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Себестоимость за единицу
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.cost_price}
                  onChange={(e) => handleChange('cost_price', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Цена за единицу..."
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  ₸
                </span>
              </div>
            </div>
          )}

          {/* Причина */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Причина *
            </label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={operation === 'add' ? 'Поступление от поставщика...' : 'Причина списания...'}
              required
            />
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Комментарий
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Дополнительный комментарий..."
            />
          </div>

          {/* Номер документа */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Номер документа
            </label>
            <input
              type="text"
              value={formData.document_number}
              onChange={(e) => handleChange('document_number', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Номер накладной, счета и т.д."
            />
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
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50 ${
              operation === 'add' 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Выполнение...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{operation === 'add' ? 'Поступление' : 'Списание'}</span>
              </>
            )}
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
    category_id: '',
    sku: '',
    barcode: '',
    unit: '',
    min_quantity: '',
    max_quantity: '',
    cost_price: '',
    sale_price: '',
    location: '',
    supplier: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category_id: item.category?.id || '',
        sku: item.sku || '',
        barcode: item.barcode || '',
        unit: item.unit || '',
        min_quantity: item.min_quantity || '',
        max_quantity: item.max_quantity || '',
        cost_price: item.cost_price || '',
        sale_price: item.sale_price || '',
        location: item.location || '',
        supplier: item.supplier || ''
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                Категория
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleChange('category_id', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Без категории</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
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

const WarehouseStock = ({ 
  loading, 
  constants,
  showNotification,
  saveStockOperation, // Новый prop для сохранения операций
  updateItem // Новый prop для обновления товара
}) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category_id: '',
    stock_filter: 'all',
    sort_by: 'name',
    sort_order: 'asc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 50,
    total: 0,
    pages: 1,
    has_next: false,
    has_prev: false
  });
  const [summary, setSummary] = useState({
    total_items: 0,
    total_value: 0
  });
  const [loadingStock, setLoadingStock] = useState(false);
  const [categories, setCategories] = useState([]);

  // Состояния модальных окон
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [operationModalOpen, setOperationModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [operationType, setOperationType] = useState(null);

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    loadStockData();
  }, [searchQuery, filters, pagination.page]);

  // Загрузка категорий при монтировании
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await apiService.request('/warehouse/categories');
      if (response.categories) {
        setCategories(response.categories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadStockData = async () => {
    setLoadingStock(true);
    try {
      const params = {
        page: pagination.page,
        per_page: pagination.per_page,
        search: searchQuery,
        ...filters
      };

      // Удаляем пустые значения
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key];
        }
      });

      const response = await apiService.request(`/warehouse/stock?${new URLSearchParams(params)}`);
      
      if (response.items) {
        setItems(response.items);
      }
      
      if (response.pagination) {
        setPagination(response.pagination);
      }
      
      if (response.summary) {
        setSummary(response.summary);
      }
    } catch (error) {
      console.error('Error loading stock data:', error);
      showNotification('Ошибка загрузки остатков', 'error');
    } finally {
      setLoadingStock(false);
    }
  };

  const handleExportStock = async () => {
    try {
      const params = {
        ...filters,
        category_id: filters.category_id || undefined,
        stock_filter: filters.stock_filter !== 'all' ? filters.stock_filter : undefined
      };

      // Удаляем undefined значения
      Object.keys(params).forEach(key => {
        if (params[key] === undefined) {
          delete params[key];
        }
      });

      const queryString = new URLSearchParams(params).toString();
      const url = `/api/warehouse/export/stock?${queryString}`;
      
      // Создаем временную ссылку для скачивания
      const link = document.createElement('a');
      link.href = url;
      link.download = `stock_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotification('Экспорт остатков начат', 'success');
    } catch (error) {
      console.error('Error exporting stock:', error);
      showNotification('Ошибка экспорта остатков', 'error');
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

  const handleStockOperation = (item, operation) => {
    setSelectedItem(item);
    setOperationType(operation);
    setOperationModalOpen(true);
  };

  const handleSaveOperation = async (operationData) => {
    if (saveStockOperation) {
      await saveStockOperation(operationData);
      // Перезагружаем данные после операции
      loadStockData();
    }
  };

  const handleSaveItem = async (itemId, formData) => {
    if (updateItem) {
      await updateItem(itemId, formData);
      // Перезагружаем данные после обновления
      loadStockData();
    }
  };

  const getStockStatusIcon = (item) => {
    if (item.current_quantity === 0) {
      return <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />;
    } else if (item.is_low_stock) {
      return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />;
    } else if (item.is_overstocked) {
      return <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />;
    } else {
      return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
    }
  };

  const getStockStatusText = (item) => {
    if (item.current_quantity === 0) {
      return 'Нет в наличии';
    } else if (item.is_low_stock) {
      return 'Низкий остаток';
    } else if (item.is_overstocked) {
      return 'Избыток';
    } else {
      return 'Нормально';
    }
  };

  const getStockStatusColor = (item) => {
    if (item.current_quantity === 0) {
      return 'bg-red-100 text-red-800';
    } else if (item.is_low_stock) {
      return 'bg-orange-100 text-orange-800';
    } else if (item.is_overstocked) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  const handleSort = (column) => {
    setFilters(prev => ({
      ...prev,
      sort_by: column,
      sort_order: prev.sort_by === column && prev.sort_order === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (column) => {
    if (filters.sort_by !== column) {
      return <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />;
    }
    return filters.sort_order === 'asc' 
      ? <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
      : <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />;
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      category_id: '',
      stock_filter: 'all',
      sort_by: 'name',
      sort_order: 'asc'
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
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

      <StockOperationModal
        item={selectedItem}
        isOpen={operationModalOpen}
        onClose={() => {
          setOperationModalOpen(false);
          setSelectedItem(null);
          setOperationType(null);
        }}
        operation={operationType}
        onSave={handleSaveOperation}
        showNotification={showNotification}
      />

      {/* Заголовок и статистика */}
      <div className="flex flex-col sm:flex-row sm:items-start lg:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Archive className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 flex-shrink-0" />
            <span className="truncate">Остатки на складе</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2 mt-2">
            <div className="text-xs sm:text-sm text-gray-600">
              Всего товаров: <span className="font-semibold">{summary.total_items}</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Общая стоимость: <span className="font-semibold">{formatCurrency(summary.total_value)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleExportStock}
          className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 sm:space-x-2 self-start sm:self-auto flex-shrink-0 text-xs sm:text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Экспорт</span>
        </button>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {/* Первый ряд: Поиск */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 sm:pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          {/* Второй ряд: Фильтры */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Категория */}
            <select
              value={filters.category_id}
              onChange={(e) => setFilters(prev => ({ ...prev, category_id: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Все категории</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Фильтр по остаткам */}
            <select
              value={filters.stock_filter}
              onChange={(e) => setFilters(prev => ({ ...prev, stock_filter: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.entries(constants.stock_filters || {}).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>

            {/* Кнопка сброса */}
            <button
              onClick={resetFilters}
              className="w-full sm:col-span-2 lg:col-span-1 bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm"
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>

      {/* Таблица остатков */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Мобильная версия - карточки */}
        <div className="block lg:hidden">
          {loadingStock ? (
            <div className="px-4 py-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-2 text-gray-500 text-xs sm:text-sm">Загрузка остатков...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <Archive className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-xs sm:text-sm">Товары не найдены</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-4 space-y-3">
                  {/* Заголовок товара */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      {(item.sku || item.barcode) && (
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {item.sku && `Артикул: ${item.sku}`}
                          {item.barcode && ` • ${item.barcode}`}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      <button 
                        onClick={() => handleViewItem(item)}
                        className="text-purple-600 hover:text-purple-900 p-1"
                        title="Просмотреть"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditItem(item)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Редактировать"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleStockOperation(item, 'add')}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Поступление"
                      >
                        <TrendingUp className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleStockOperation(item, 'remove')}
                        className="text-orange-600 hover:text-orange-900 p-1"
                        title="Списание"
                      >
                        <TrendingDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Категория */}
                  {item.category?.name && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Категория:</span> {item.category.name}
                    </div>
                  )}
                  
                  {/* Остаток и статус */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {item.current_quantity} {item.unit}
                      </div>
                      {item.reserved_quantity > 0 && (
                        <div className="text-xs text-orange-600">
                          Зарезервировано: {item.reserved_quantity}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Доступно: {item.available_quantity} {item.unit}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStockStatusIcon(item)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(item)}`}>
                        {getStockStatusText(item)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Нормы */}
                  <div className="text-xs text-gray-500 flex space-x-4">
                    <span>Мин: {item.min_quantity}</span>
                    <span>Макс: {item.max_quantity}</span>
                  </div>
                  
                  {/* Стоимость */}
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">За единицу:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(item.cost_price)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Общая стоимость:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(item.total_value)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Десктопная версия - таблица */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Товар</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th 
                  className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Остаток</span>
                    {getSortIcon('quantity')}
                  </div>
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Нормы
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th 
                  className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Стоимость</span>
                    {getSortIcon('value')}
                  </div>
                </th>
                <th className="px-3 sm:px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loadingStock ? (
                <tr>
                  <td colSpan="7" className="px-3 sm:px-4 lg:px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-2 text-gray-500 text-xs sm:text-sm">Загрузка остатков...</p>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-3 sm:px-4 lg:px-6 py-12 text-center">
                    <Archive className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-xs sm:text-sm">Товары не найдены</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 lg:px-6 py-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 break-words max-w-xs">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 break-words max-w-xs">
                          {item.sku && `Артикул: ${item.sku}`}
                          {item.barcode && ` • ${item.barcode}`}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-4 lg:px-6 py-4">
                      <div className="text-xs sm:text-sm text-gray-900 max-w-xs truncate">
                        {item.category?.name || 'Без категории'}
                      </div>
                      {item.category_path && (
                        <div className="text-xs text-gray-500 max-w-xs truncate">
                          {item.category_path}
                        </div>
                      )}
                    </td>
                    
                    <td className="px-3 sm:px-4 lg:px-6 py-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {item.current_quantity} {item.unit}
                        </div>
                        {item.reserved_quantity > 0 && (
                          <div className="text-xs text-orange-600">
                            Зарезервировано: {item.reserved_quantity}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          Доступно: {item.available_quantity} {item.unit}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-4 lg:px-6 py-4">
                      <div className="text-xs text-gray-500">
                        <div>Мин: {item.min_quantity}</div>
                        <div>Макс: {item.max_quantity}</div>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-4 lg:px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStockStatusIcon(item)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(item)}`}>
                          {getStockStatusText(item)}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-4 lg:px-6 py-4">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          {formatCurrency(item.cost_price)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Общая: {formatCurrency(item.total_value)}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-4 lg:px-6 py-4 text-right text-xs sm:text-sm font-medium">
                      <div className="flex items-center justify-end space-x-1 sm:space-x-2">
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
                          onClick={() => handleStockOperation(item, 'add')}
                          className="text-green-600 hover:text-green-900 hover:bg-green-50 p-1 rounded transition-colors"
                          title="Поступление"
                        >
                          <TrendingUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleStockOperation(item, 'remove')}
                          className="text-orange-600 hover:text-orange-900 hover:bg-orange-50 p-1 rounded transition-colors"
                          title="Списание"
                          disabled={item.available_quantity === 0}
                        >
                          <TrendingDown className="h-4 w-4" />
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
          <div className="bg-white px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between lg:hidden">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={!pagination.has_prev}
                className="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Предыдущая
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={!pagination.has_next}
                className="ml-3 relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Следующая
              </button>
            </div>
            <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-700">
                  Показано <span className="font-medium">{((pagination.page - 1) * pagination.per_page) + 1}</span> до{' '}
                  <span className="font-medium">{Math.min(pagination.page * pagination.per_page, pagination.total)}</span> из{' '}
                  <span className="font-medium">{pagination.total}</span> результатов
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={!pagination.has_prev}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Назад
                  </button>
                  
                  {/* Номера страниц */}
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                        className={`relative inline-flex items-center px-3 sm:px-4 py-2 border text-xs sm:text-sm font-medium ${
                          pagination.page === pageNum
                            ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={!pagination.has_next}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xs sm:text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Вперед
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

export default WarehouseStock;