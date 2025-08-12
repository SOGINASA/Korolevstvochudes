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
  XCircle
} from 'lucide-react';

const WarehouseItems = ({ 
  loading, 
  categories, 
  items, 
  loadCategories, 
  loadItems, 
  handleSearchItems,
  showNotification 
}) => {
  const [viewMode, setViewMode] = useState('categories'); // 'categories' или 'table'
  const [currentCategory, setCurrentCategory] = useState(null);
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

  // Загрузка категорий при монтировании
  useEffect(() => {
    if (viewMode === 'categories') {
      loadCategories(currentCategory?.id);
    }
  }, [currentCategory, viewMode]);

  // Загрузка товаров при переходе в режим таблицы
  useEffect(() => {
    if (viewMode === 'table') {
      loadItemsWithFilters();
    }
  }, [viewMode, currentCategory, searchQuery, filters, pagination.page]);

  const loadItemsWithFilters = async () => {
    const params = {
      page: pagination.page,
      per_page: pagination.per_page,
      search: searchQuery,
      category_id: currentCategory?.id,
      ...filters
    };

    const result = await loadItems(params);
    if (result.pagination) {
      setPagination(result.pagination);
    }
  };

  const handleCategoryClick = async (category) => {
    // Добавляем категорию в breadcrumbs
    setBreadcrumbs(prev => [...prev, currentCategory].filter(Boolean));
    setCurrentCategory(category);
    
    // Загружаем подкатегории
    const result = await loadCategories(category.id);
    
    // Если нет подкатегорий, переходим в режим таблицы
    if (!result.categories || result.categories.length === 0) {
      setViewMode('table');
    }
  };

  const handleShowAllItems = () => {
    setViewMode('table');
    setCurrentCategory(null);
  };

  const handleBackToPreviousCategory = () => {
    const previousCategory = breadcrumbs[breadcrumbs.length - 1];
    setBreadcrumbs(prev => prev.slice(0, -1));
    setCurrentCategory(previousCategory);
    
    if (!previousCategory) {
      setViewMode('categories');
    }
  };

  const handleBackToCategories = () => {
    setViewMode('categories');
    setCurrentCategory(null);
    setBreadcrumbs([]);
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

  // Рендер карточек категорий
  const renderCategoriesGrid = () => (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button
                onClick={handleBackToCategories}
                className="text-gray-400 hover:text-gray-500"
              >
                Все категории
              </button>
            </li>
            {breadcrumbs.map((category, index) => (
              <li key={category.id}>
                <div className="flex items-center">
                  <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {category.name}
                  </span>
                </div>
              </li>
            ))}
            {currentCategory && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {currentCategory.name}
                  </span>
                </div>
              </li>
            )}
          </ol>
        </nav>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Кнопка "Показать все товары" */}
        <div
          onClick={handleShowAllItems}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-gray-300 hover:border-purple-400"
        >
          <div className="p-6 text-center">
            <Package className="mx-auto h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Все товары</h3>
            <p className="text-sm text-gray-500">
              Показать все товары в текущей категории
            </p>
          </div>
        </div>

        {/* Категории */}
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <FolderOpen 
                    className="h-6 w-6" 
                    style={{ color: category.color }}
                  />
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {category.name}
              </h3>
              
              {category.description && (
                <p className="text-sm text-gray-500 mb-3">
                  {category.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Товаров: {category.items_count || 0}
                </span>
                {category.children && category.children.length > 0 && (
                  <span className="text-purple-600">
                    +{category.children.length} категорий
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Рендер таблицы товаров
  const renderItemsTable = () => (
    <div className="space-y-6">
      {/* Заголовок и навигация */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={breadcrumbs.length > 0 ? handleBackToPreviousCategory : handleBackToCategories}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Назад</span>
          </button>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentCategory ? currentCategory.name : 'Все товары'}
            </h2>
            <p className="text-sm text-gray-500">
              {currentCategory ? currentCategory.description : 'Список всех товаров'}
            </p>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Фильтр по статусу */}
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="all">Все статусы</option>
          </select>

          {/* Фильтр по остаткам */}
          <select
            value={filters.stock_filter}
            onChange={(e) => setFilters(prev => ({ ...prev, stock_filter: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Товар
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
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
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">Товары не найдены</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.sku && `Артикул: ${item.sku}`}
                          {item.barcode && ` • Штрих-код: ${item.barcode}`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.category?.name || 'Без категории'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStockStatusIcon(item)}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'KZT',
                        minimumFractionDigits: 0
                      }).format(item.cost_price || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-purple-600 hover:text-purple-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={!pagination.has_prev}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Предыдущая
              </button>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={!pagination.has_next}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Следующая
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
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
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Предыдущая
                  </button>
                  
                  {/* Номера страниц */}
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setPagination(prev => ({ ...prev, page: pageNumber }))}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
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
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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

  return (
    <div className="space-y-6">
      {viewMode === 'categories' ? renderCategoriesGrid() : renderItemsTable()}
    </div>
  );
};

export default WarehouseItems;