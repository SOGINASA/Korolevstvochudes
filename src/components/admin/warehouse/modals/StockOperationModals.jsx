import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Package,
  AlertTriangle,
  CheckCircle,
  Loader
} from 'lucide-react';

// Модальное окно поступления товара
export const AddStockModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onSearchItems, 
  constants 
}) => {
  const [formData, setFormData] = useState({
    item_id: '',
    quantity: '',
    reason: '',
    comment: '',
    document_number: ''
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Очистка формы при открытии
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      item_id: '',
      quantity: '',
      reason: '',
      comment: '',
      document_number: ''
    });
    setSelectedItem(null);
    setSearchQuery('');
    setSearchResults([]);
    setErrors({});
    setShowSearchResults(false);
  };

  const handleSearchItems = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const results = await onSearchItems(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching items:', error);
      setSearchResults([]);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setFormData(prev => ({ ...prev, item_id: item.id }));
    setSearchQuery(item.name);
    setShowSearchResults(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedItem) {
      newErrors.item = 'Выберите товар';
    }
    
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Укажите количество больше 0';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Укажите причину поступления';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        quantity: parseInt(formData.quantity)
      });
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Поступление товара
            </h2>
          </div>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Контент */}
        <div className="p-6 space-y-4">
          {/* Поиск товара */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Товар *
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearchItems(e.target.value);
                }}
                className={`w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.item ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Поиск товара..."
              />
              
              {/* Результаты поиска */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        Остаток: {item.current_quantity} {item.unit}
                        {item.barcode && ` • ${item.barcode}`}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.item && (
              <p className="mt-1 text-sm text-red-600">{errors.item}</p>
            )}
          </div>

          {/* Выбранный товар */}
          {selectedItem && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">{selectedItem.name}</div>
                  <div className="text-sm text-gray-600">
                    Текущий остаток: {selectedItem.current_quantity} {selectedItem.unit}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Количество */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Количество для поступления *
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                className={`flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="1"
              />
              {selectedItem && (
                <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                  {selectedItem.unit}
                </div>
              )}
            </div>
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          {/* Причина */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Причина поступления *
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите причину</option>
              {constants.addition_reasons?.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
            </select>
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>

          {/* Номер документа */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер документа
            </label>
            <input
              type="text"
              value={formData.document_number}
              onChange={(e) => setFormData(prev => ({ ...prev, document_number: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Номер накладной, счета и т.д."
            />
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Комментарий
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
              placeholder="Дополнительная информация..."
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            disabled={loading}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedItem || !formData.quantity}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            <span>Добавить на склад</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Модальное окно списания товара
export const RemoveStockModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onSearchItems, 
  constants 
}) => {
  const [formData, setFormData] = useState({
    item_id: '',
    quantity: '',
    reason: '',
    comment: '',
    document_number: ''
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Очистка формы при открытии
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      item_id: '',
      quantity: '',
      reason: '',
      comment: '',
      document_number: ''
    });
    setSelectedItem(null);
    setSearchQuery('');
    setSearchResults([]);
    setErrors({});
    setShowSearchResults(false);
  };

  const handleSearchItems = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const results = await onSearchItems(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching items:', error);
      setSearchResults([]);
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setFormData(prev => ({ ...prev, item_id: item.id }));
    setSearchQuery(item.name);
    setShowSearchResults(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedItem) {
      newErrors.item = 'Выберите товар';
    }
    
    const quantity = parseInt(formData.quantity);
    if (!formData.quantity || quantity <= 0) {
      newErrors.quantity = 'Укажите количество больше 0';
    } else if (selectedItem && quantity > selectedItem.available_quantity) {
      newErrors.quantity = `Недостаточно товара. Доступно: ${selectedItem.available_quantity} ${selectedItem.unit}`;
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Укажите причину списания';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        quantity: parseInt(formData.quantity)
      });
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Списание товара
            </h2>
          </div>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Контент */}
        <div className="p-6 space-y-4">
          {/* Поиск товара */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Товар *
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearchItems(e.target.value);
                }}
                className={`w-full pl-10 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.item ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Поиск товара..."
              />
              
              {/* Результаты поиска */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemSelect(item)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        Доступно: {item.available_quantity} {item.unit}
                        {item.barcode && ` • ${item.barcode}`}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.item && (
              <p className="mt-1 text-sm text-red-600">{errors.item}</p>
            )}
          </div>

          {/* Выбранный товар */}
          {selectedItem && (
            <div className={`border rounded-lg p-3 ${
              selectedItem.current_quantity === 0 
                ? 'bg-red-50 border-red-200' 
                : selectedItem.current_quantity <= selectedItem.min_quantity
                ? 'bg-orange-50 border-orange-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center space-x-2">
                {selectedItem.current_quantity === 0 ? (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                ) : (
                  <Package className="h-5 w-5 text-blue-600" />
                )}
                <div>
                  <div className="font-medium text-gray-900">{selectedItem.name}</div>
                  <div className="text-sm text-gray-600">
                    Всего: {selectedItem.current_quantity} {selectedItem.unit}
                    {selectedItem.reserved_quantity > 0 && (
                      <span className="text-orange-600">
                        {' '}(зарезервировано: {selectedItem.reserved_quantity})
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Доступно для списания: {selectedItem.available_quantity} {selectedItem.unit}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Количество */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Количество для списания *
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                className={`flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="1"
                max={selectedItem?.available_quantity || undefined}
              />
              {selectedItem && (
                <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600">
                  {selectedItem.unit}
                </div>
              )}
            </div>
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          {/* Причина */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Причина списания *
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите причину</option>
              {constants.removal_reasons?.map((reason, index) => (
                <option key={index} value={reason}>{reason}</option>
              ))}
            </select>
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>

          {/* Номер документа */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер документа
            </label>
            <input
              type="text"
              value={formData.document_number}
              onChange={(e) => setFormData(prev => ({ ...prev, document_number: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Номер акта, заявки и т.д."
            />
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Комментарий
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="3"
              placeholder="Дополнительная информация..."
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            disabled={loading}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !selectedItem || !formData.quantity || (selectedItem && parseInt(formData.quantity) > selectedItem.available_quantity)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {loading && <Loader className="h-4 w-4 animate-spin" />}
            <span>Списать товар</span>
          </button>
        </div>
      </div>
    </div>
  );
};