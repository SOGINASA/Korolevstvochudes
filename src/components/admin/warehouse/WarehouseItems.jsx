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
  List
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

  // Загрузка товаров при монтировании и изменении фильтров
  useEffect(() => {
    loadItemsWithFilters();
  }, [selectedCategories, searchQuery, filters, pagination.page]);

  const loadItemsWithFilters = async () => {
    const params = {
      page: pagination.page,
      per_page: pagination.per_page,
      search: searchQuery,
      category_names: selectedCategories, // Передаем выбранные категории
      ...filters
    };

    const result = await loadItems(params);
    if (result.pagination) {
      setPagination(result.pagination);
    }
  };

  // Функция для группировки товаров по категориям
  const groupItemsByCategories = (items, selectedCategories = []) => {
    const categoryGroups = {};
    const itemsInGroups = new Set();

    // Проходим по всем товарам
    items.forEach(item => {
      const itemCategories = item.category_names || [];
      
      // Если есть выбранные категории, фильтруем товары
      if (selectedCategories.length > 0) {
        const hasSelectedCategory = selectedCategories.some(selectedCat => 
          itemCategories.includes(selectedCat)
        );
        if (!hasSelectedCategory) return;
      }

      // Получаем оставшиеся категории (исключая уже выбранные)
      const remainingCategories = itemCategories.filter(cat => 
        !selectedCategories.includes(cat)
      );

      // Если есть оставшиеся категории, группируем по ним
      if (remainingCategories.length > 0) {
        remainingCategories.forEach(category => {
          if (!categoryGroups[category]) {
            categoryGroups[category] = [];
          }
          categoryGroups[category].push(item);
          itemsInGroups.add(item.id);
        });
      } else {
        // Если нет оставшихся категорий, товар попадает в "Все вместе"
        if (!categoryGroups['__all__']) {
          categoryGroups['__all__'] = [];
        }
        categoryGroups['__all__'].push(item);
        itemsInGroups.add(item.id);
      }
    });

    return categoryGroups;
  };

  // Получаем группированные товары
  const categoryGroups = groupItemsByCategories(items, selectedCategories);

  // Обработчик выбора категории
  const handleCategorySelect = (categoryName) => {
    if (categoryName === '__all__') {
      // Показываем все товары в режиме таблицы
      setViewMode('table');
      return;
    }

    // Добавляем категорию к выбранным
    const newSelected = [...selectedCategories, categoryName];
    setSelectedCategories(newSelected);
    setBreadcrumbs([...breadcrumbs, categoryName]);

    // Проверяем, есть ли еще подкатегории
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
      // Если нет подкатегорий, переходим в режим таблицы
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
                  className="text-gray-400 hover:text-gray-500 text-xs sm:text-xs sm:text-sm sm:text-sm sm:text-base flex-shrink-0"
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
                      className="ml-2 sm:ml-4 text-xs sm:text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 flex-shrink-0"
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
    <h2 className="text-base sm:text-lg sm:text-lg sm:text-xl font-semibold text-gray-900 truncate">
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
                  // Подсчитываем количество товаров, которые будут показаны в таблице
                  const filteredItemsCount = selectedCategories.length > 0 
                    ? items.filter(item => {
                        const itemCategories = item.category_names || [];
                        return selectedCategories.every(selectedCat => 
                          itemCategories.includes(selectedCat)
                        );
                      }).length
                    : items.length;
                  
                  // Правильное склонение
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
            if (categoryName === '__all__') return null; // Пропускаем специальную группу
            
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
                  
                  <h3 className="text-sm sm:text-base sm:text-base sm:text-lg font-medium text-gray-900 mb-2 capitalize truncate">
                    {categoryName}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-500">Товаров:</span>
                      <span className="font-medium text-blue-600">
                        {categoryItems.length}
                      </span>
                    </div>
                    
                    {/* Показываем примеры товаров */}
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

  // Рендер таблицы товаров (оставляем как есть, но добавляем фильтрацию)
  const renderItemsTable = () => {
    // Фильтруем товары по выбранным категориям
    const filteredItems = selectedCategories.length > 0 
      ? items.filter(item => {
          const itemCategories = item.category_names || [];
          return selectedCategories.every(selectedCat => 
            itemCategories.includes(selectedCat)
          );
        })
      : items;

    return (
      <div className="space-y-6">
        {/* Заголовок и навигация */}
        <div className="flex items-center justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleBackToCategories}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-xs sm:text-sm sm:text-sm sm:text-base self-start"
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
                className="pl-8 sm:pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm sm:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Фильтр по статусу */}
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="pl-8 sm:pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm sm:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
              <option value="all">Все статусы</option>
            </select>

            {/* Фильтр по остаткам */}
            <select
              value={filters.stock_filter}
              onChange={(e) => setFilters(prev => ({ ...prev, stock_filter: e.target.value }))}
              className="pl-8 sm:pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm sm:text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    Товар
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Категории
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
            <div className="bg-white px-3 sm:px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={!pagination.has_prev}
                  className="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Предыдущая
                </button>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={!pagination.has_next}
                  className="relative inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
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