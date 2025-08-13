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
  TrendingDown
} from 'lucide-react';
import { apiService } from '../../../services/api';

const WarehouseStock = ({ 
  loading, 
  constants,
  showNotification 
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

  const getStockStatusIcon = (item) => {
    if (item.current_quantity === 0) {
      return <XCircle className="h-5 w-5 text-red-500" />;
    } else if (item.is_low_stock) {
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    } else if (item.is_overstocked) {
      return <TrendingUp className="h-5 w-5 text-blue-500" />;
    } else {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
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
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return filters.sort_order === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-purple-600" />
      : <ArrowDown className="h-4 w-4 text-purple-600" />;
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
    <div className="space-y-6">
      {/* Заголовок и статистика */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Archive className="h-6 w-6 text-purple-600" />
            <span>Остатки на складе</span>
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
            <div className="text-sm text-gray-600">
              Всего товаров: <span className="font-semibold">{summary.total_items}</span>
            </div>
            <div className="text-sm text-gray-600">
              Общая стоимость: <span className="font-semibold">{formatCurrency(summary.total_value)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleExportStock}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 self-start lg:self-auto"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Экспорт</span>
        </button>
      </div>

      {/* Фильтры */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Первый ряд: Поиск */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          {/* Второй ряд: Фильтры */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Категория */}
            <select
              value={filters.category_id}
              onChange={(e) => setFilters(prev => ({ ...prev, category_id: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.entries(constants.stock_filters || {}).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>

            {/* Кнопка сброса */}
            <button
              onClick={resetFilters}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>

      {/* Таблица остатков */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Товар</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Остаток</span>
                    {getSortIcon('quantity')}
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Нормы
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th 
                  className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Стоимость</span>
                    {getSortIcon('value')}
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loadingStock ? (
                <tr>
                  <td colSpan="7" className="px-4 sm:px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-2 text-gray-500">Загрузка остатков...</p>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 sm:px-6 py-12 text-center">
                    <Archive className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">Товары не найдены</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 break-words">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 break-words">
                          {item.sku && `Артикул: ${item.sku}`}
                          {item.barcode && ` • ${item.barcode}`}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {item.category?.name || 'Без категории'}
                      </div>
                      {item.category_path && (
                        <div className="text-sm text-gray-500">
                          {item.category_path}
                        </div>
                      )}
                    </td>
                    
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
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
                    
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-sm text-gray-500">
                        <div>Мин: {item.min_quantity}</div>
                        <div>Макс: {item.max_quantity}</div>
                      </div>
                    </td>
                    
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStockStatusIcon(item)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStockStatusColor(item)}`}>
                          {getStockStatusText(item)}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.cost_price)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Общая: {formatCurrency(item.total_value)}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-4 sm:px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="text-purple-600 hover:text-purple-900"
                          title="Просмотр"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Поступление"
                        >
                          <TrendingUp className="h-4 w-4" />
                        </button>
                        <button
                          className="text-orange-600 hover:text-orange-900"
                          title="Списание"
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={!pagination.has_prev}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Предыдущая
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={!pagination.has_next}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Следующая
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
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
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
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
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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