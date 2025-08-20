import React, { useState, useEffect } from 'react';
import { 
  History, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  User,
  Calendar,
  Package,
  FileText,
  Download,
  Eye,
  Edit,
  X,
  Save,
  Clock
} from 'lucide-react';

// Модальное окно просмотра операции
const ViewOperationModal = ({ operation, isOpen, onClose, constants }) => {
  if (!isOpen || !operation) return null;

  const getOperationIcon = (operationType) => {
    switch (operationType) {
      case 'add':
        return <TrendingUp className="h-6 w-6 text-green-600" />;
      case 'remove':
        return <TrendingDown className="h-6 w-6 text-red-600" />;
      case 'adjust':
        return <RefreshCw className="h-6 w-6 text-blue-600" />;
      default:
        return <Package className="h-6 w-6 text-gray-600" />;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Не указано';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getOperationIcon(operation.operation_type)}
            <h2 className="text-xl font-semibold text-gray-900">
              Детали операции #{operation.id}
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
                <label className="block text-sm font-medium text-gray-500 mb-1">Товар</label>
                <p className="text-lg font-semibold text-gray-900">
                  {operation.item?.name || 'Неизвестный товар'}
                </p>
                {operation.item?.category && (
                  <p className="text-sm text-gray-500">{operation.item.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Тип операции</label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                  operation.operation_type === 'add' ? 'bg-green-100 text-green-800' :
                  operation.operation_type === 'remove' ? 'bg-red-100 text-red-800' :
                  operation.operation_type === 'adjust' ? 'bg-blue-100 text-blue-800' :
                  operation.operation_type === 'reserve' ? 'bg-orange-100 text-orange-800' :
                  operation.operation_type === 'unreserve' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {operation.operation_description || constants?.operation_types?.[operation.operation_type] || operation.operation_type}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Изменение количества</label>
                <div className={`text-lg font-semibold ${
                  operation.quantity_change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {operation.quantity_change > 0 ? '+' : ''}{operation.quantity_change} {operation.item?.unit || 'шт'}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Количество до операции</label>
                <p className="text-lg text-gray-900">{operation.quantity_before} {operation.item?.unit || 'шт'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Количество после операции</label>
                <p className="text-lg text-gray-900">{operation.quantity_after} {operation.item?.unit || 'шт'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Дата и время</label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{formatDateTime(operation.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            {operation.reason && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Причина</label>
                <p className="text-gray-900">{operation.reason}</p>
              </div>
            )}

            {operation.comment && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Комментарий</label>
                <p className="text-gray-900">{operation.comment}</p>
              </div>
            )}

            {operation.document_number && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Номер документа</label>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{operation.document_number}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Пользователь</label>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900">{operation.user?.name || 'Системная операция'}</p>
              </div>
            </div>
          </div>
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

// Модальное окно редактирования операции
const EditOperationModal = ({ operation, isOpen, onClose, onSave, constants, showNotification }) => {
  const [formData, setFormData] = useState({
    reason: '',
    comment: '',
    document_number: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (operation) {
      setFormData({
        reason: operation.reason || '',
        comment: operation.comment || '',
        document_number: operation.document_number || ''
      });
    }
  }, [operation]);

  if (!isOpen || !operation) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave(operation.id, formData);
      showNotification('Операция успешно обновлена', 'success');
      onClose();
    } catch (error) {
      console.error('Error updating operation:', error);
      showNotification('Ошибка при обновлении операции', 'error');
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
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Редактировать операцию #{operation.id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Содержимое */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Информация о товаре (только для чтения) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Информация об операции</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Товар:</span> {operation.item?.name || 'Неизвестный товар'}</p>
              <p><span className="font-medium">Тип операции:</span> {operation.operation_description}</p>
              <p><span className="font-medium">Изменение:</span> 
                <span className={operation.quantity_change > 0 ? 'text-green-600' : 'text-red-600'}>
                  {operation.quantity_change > 0 ? '+' : ''}{operation.quantity_change} {operation.item?.unit || 'шт'}
                </span>
              </p>
            </div>
          </div>

          {/* Поля для редактирования */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Причина
            </label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Введите причину операции..."
            />
          </div>

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

const WarehouseOperations = ({ 
  loading, 
  operations, 
  loadOperations, 
  constants,
  showNotification,
  updateOperation // Новый prop для обновления операции
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    operation_type: '',
    date_from: '',
    date_to: '',
    user_id: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 20,
    total: 0,
    pages: 1,
    has_next: false,
    has_prev: false
  });

  // Состояния модальных окон
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);

  // Загрузка операций при изменении фильтров
  useEffect(() => {
    loadOperationsWithFilters();
  }, [searchQuery, filters, pagination.page]);

  const loadOperationsWithFilters = async () => {
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

    const result = await loadOperations(params);
    if (result.pagination) {
      setPagination(result.pagination);
    }
  };

  const handleExportOperations = async () => {
    try {
      const params = {
        ...filters,
        operation_type: filters.operation_type || undefined,
        date_from: filters.date_from || undefined,
        date_to: filters.date_to || undefined
      };

      // Удаляем undefined значения
      Object.keys(params).forEach(key => {
        if (params[key] === undefined) {
          delete params[key];
        }
      });

      const queryString = new URLSearchParams(params).toString();
      const url = `/api/warehouse/export/operations?${queryString}`;
      
      // Создаем временную ссылку для скачивания
      const link = document.createElement('a');
      link.href = url;
      link.download = `operations_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotification('Экспорт операций начат', 'success');
    } catch (error) {
      console.error('Error exporting operations:', error);
      showNotification('Ошибка экспорта операций', 'error');
    }
  };

  // Обработчики модальных окон
  const handleViewOperation = (operation) => {
    setSelectedOperation(operation);
    setViewModalOpen(true);
  };

  const handleEditOperation = (operation) => {
    setSelectedOperation(operation);
    setEditModalOpen(true);
  };

  const handleSaveOperation = async (operationId, formData) => {
    if (updateOperation) {
      await updateOperation(operationId, formData);
      // Перезагружаем данные после обновления
      loadOperationsWithFilters();
    }
  };

  const getOperationIcon = (operationType) => {
    switch (operationType) {
      case 'add':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'remove':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      case 'adjust':
        return <RefreshCw className="h-5 w-5 text-blue-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getOperationTypeColor = (operationType) => {
    switch (operationType) {
      case 'add':
        return 'bg-green-100 text-green-800';
      case 'remove':
        return 'bg-red-100 text-red-800';
      case 'adjust':
        return 'bg-blue-100 text-blue-800';
      case 'reserve':
        return 'bg-orange-100 text-orange-800';
      case 'unreserve':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatQuantityChange = (operation) => {
    const change = operation.quantity_change;
    if (change > 0) {
      return `+${change}`;
    }
    return change.toString();
  };

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      operation_type: '',
      date_from: '',
      date_to: '',
      user_id: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Не указано';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Модальные окна */}
      <ViewOperationModal
        operation={selectedOperation}
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedOperation(null);
        }}
        constants={constants}
      />

      <EditOperationModal
        operation={selectedOperation}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedOperation(null);
        }}
        onSave={handleSaveOperation}
        constants={constants}
        showNotification={showNotification}
      />

      {/* Заголовок */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <History className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 flex-shrink-0" />
            <span className="truncate">История операций</span>
          </h2>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">Все операции поступления и списания товаров</p>
        </div>
        
        <button
          onClick={handleExportOperations}
          className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 sm:space-x-2 flex-shrink-0 text-xs sm:text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Экспорт</span>
        </button>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
          {/* Поиск */}
          <div className="sm:col-span-2 xl:col-span-2 relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по товару, причине..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 sm:pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Тип операции */}
          <div className="xl:col-span-1">
            <select
              value={filters.operation_type}
              onChange={(e) => setFilters(prev => ({ ...prev, operation_type: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Все операции</option>
              {Object.entries(constants.operation_types || {}).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          {/* Дата с */}
          <div className="xl:col-span-1">
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) => setFilters(prev => ({ ...prev, date_from: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Дата с"
            />
          </div>

          {/* Дата по */}
          <div className="xl:col-span-1">
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) => setFilters(prev => ({ ...prev, date_to: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Дата по"
            />
          </div>

          {/* Кнопка сброса */}
          <div className="xl:col-span-1">
            <button
              onClick={resetFilters}
              className="w-full bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm"
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>

      {/* Таблица операций */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Мобильная версия - карточки */}
        <div className="block sm:hidden">
          {loading ? (
            <div className="px-4 py-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-2 text-gray-500 text-xs">Загрузка операций...</p>
            </div>
          ) : operations.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-xs">Операции не найдены</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {operations.map((operation) => (
                <div key={operation.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-medium text-gray-900 truncate">
                        {operation.item?.name || 'Неизвестный товар'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDateTime(operation.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {getOperationIcon(operation)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOperationTypeColor(operation.operation_type)}`}>
                      {operation.operation_description}
                    </span>
                    <div className={`text-xs font-medium ${
                      operation.quantity_change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatQuantityChange(operation)} {operation.item?.unit || 'шт'}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {operation.quantity_before} → {operation.quantity_after}
                  </div>
                  
                  {operation.reason && (
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">Причина:</span> {operation.reason}
                    </div>
                  )}
                  
                  {operation.comment && (
                    <div className="text-xs text-gray-500 truncate">
                      {operation.comment}
                    </div>
                  )}
                  
                  {operation.document_number && (
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {operation.document_number}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <User className="h-3 w-3 text-gray-400" />
                      <span>{operation.user?.name || 'Системная операция'}</span>
                    </div>
                    
                    {/* Кнопки действий для мобильной версии */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleViewOperation(operation)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="Просмотреть"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleEditOperation(operation)}
                        className="p-1 text-purple-600 hover:text-purple-800 transition-colors"
                        title="Редактировать"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                    </div>
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
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Операция
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Количество
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Причина
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-3 sm:px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-2 text-gray-500 text-xs sm:text-sm">Загрузка операций...</p>
                  </td>
                </tr>
              ) : operations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-3 sm:px-6 py-12 text-center">
                    <History className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-xs sm:text-sm">Операции не найдены</p>
                  </td>
                </tr>
              ) : (
                operations.map((operation) => (
                  <tr key={operation.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div className="text-xs sm:text-sm text-gray-900">
                          {formatDateTime(operation.created_at)}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-xs">
                          {operation.item?.name || 'Неизвестный товар'}
                        </div>
                        {operation.item?.category && (
                          <div className="text-xs text-gray-500">
                            {operation.item.category}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getOperationIcon(operation)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOperationTypeColor(operation.operation_type)}`}>
                          {operation.operation_description}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className={`text-xs sm:text-sm font-medium ${
                          operation.quantity_change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatQuantityChange(operation)} {operation.item?.unit || 'шт'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {operation.quantity_before} → {operation.quantity_after}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-6 py-4">
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900 truncate max-w-xs">
                          {operation.reason || 'Не указана'}
                        </div>
                        {operation.comment && (
                          <div className="text-xs text-gray-500 max-w-xs truncate">
                            {operation.comment}
                          </div>
                        )}
                        {operation.document_number && (
                          <div className="flex items-center space-x-1 mt-1">
                            <FileText className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {operation.document_number}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div className="text-xs sm:text-sm text-gray-900 truncate max-w-xs">
                          {operation.user?.name || 'Системная операция'}
                        </div>
                      </div>
                    </td>
                    
                    {/* Колонка с кнопками действий */}
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOperation(operation)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Просмотреть операцию"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditOperation(operation)}
                          className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Редактировать операцию"
                        >
                          <Edit className="h-4 w-4" />
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
              className="ml-3 relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
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
                      className={`relative inline-flex items-center px-3 sm:px-4 py-2 border text-xs sm:text-sm font-medium ${
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
      </div>
    </div>
  );
};

export default WarehouseOperations;