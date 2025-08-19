import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Minus, 
  TrendingUp, 
  Search, 
  Filter,
  ArrowLeft,
  ShoppingCart,
  BarChart3,
  History,
  Archive,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Menu,
  X
} from 'lucide-react';
import { apiService } from '../../services/api';

// Подкомпоненты (будут созданы отдельно)
import WarehouseDashboard from './warehouse/WarehouseDashboard';
import WarehouseItems from './warehouse/WarehouseItems';
import WarehouseOperations from './warehouse/WarehouseOperations';
import WarehouseStock from './warehouse/WarehouseStock';

// Модальные окна (будут созданы отдельно)
import AddItemModal from './warehouse/modals/AddItemModal';
import { AddStockModal, RemoveStockModal } from './warehouse/modals/StockOperationModals';
import { success } from 'zod/v4';

const Warehouse = ({ showNotification }) => {
  // Основные состояния
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Данные
  const [stats, setStats] = useState({
    total_items: 0,
    total_categories: 0,
    low_stock_items: 0,
    out_of_stock_items: 0,
    total_value: 0,
    recent_operations: 0
  });
  
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [operations, setOperations] = useState([]);
  const [constants, setConstants] = useState({
    operation_types: {},
    removal_reasons: [],
    addition_reasons: [],
    stock_filters: {},
    item_statuses: {}
  });
  
  // Состояния модальных окон
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showRemoveStockModal, setShowRemoveStockModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);

  // Загрузка данных при монтировании
  useEffect(() => {
    loadDashboardData();
    loadConstants();
  }, []);

  // Функции загрузки данных
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await apiService.request('/warehouse/dashboard');
      if (response.stats) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error loading warehouse dashboard:', error);
      showNotification('Ошибка загрузки данных склада', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadConstants = async () => {
    try {
      const response = await apiService.request('/warehouse/constants');
      if (response) {
        setConstants(response);
      }
    } catch (error) {
      console.error('Error loading constants:', error);
    }
  };

  const loadCategories = async (parentId = null) => {
    try {
      const params = parentId ? `?parent_id=${parentId}` : '';
      const response = await apiService.request(`/warehouse/categories${params}`);
      if (response.categories) {
        setCategories(response.categories);
      }
      return response;
    } catch (error) {
      console.error('Error loading categories:', error);
      showNotification('Ошибка загрузки категорий', 'error');
      return { success: false };
    }
  };

  const loadItems = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiService.request(`/warehouse/items?${params}`);
      if (response.items) {
        setItems(response.items);
      }
      return response;
    } catch (error) {
      console.error('Error loading items:', error);
      showNotification('Ошибка загрузки товаров', 'error');
      return { success: false };
    }
  };

  const loadOperations = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiService.request(`/warehouse/operations?${params}`);
      if (response.operations) {
        setOperations(response.operations);
      }
      return response;
    } catch (error) {
      console.error('Error loading operations:', error);
      showNotification('Ошибка загрузки операций', 'error');
      return { success: false };
    }
  };

  // Обработчики операций
  const handleCreateItem = async (itemData) => {
    try {
      const response = await apiService.request('/warehouse/items', {
        method: 'POST',
        body: JSON.stringify(itemData)
      });
      
      if (response.item) {
        setItems(prev => [response.item, ...prev]);
        await loadDashboardData(); // Обновляем статистику
        showNotification('Товар успешно добавлен', 'success');
        setShowAddItemModal(false);
        return { success: true };
      }
    } catch (error) {
      console.error('Error creating item:', error);
      showNotification(error.message || 'Ошибка добавления товара', 'error');
      return { success: false, error: error.message };
    }
  };

  const handleAddStock = async (operationData) => {
    try {
      const response = await apiService.request('/warehouse/operations/add-stock', {
        method: 'POST',
        body: JSON.stringify(operationData)
      });
      
      if (response.operation) {
        await loadDashboardData(); // Обновляем статистику
        await loadOperations(); // Обновляем операции
        showNotification(response.message || 'Товар поступил на склад', 'success');
        setShowAddStockModal(false);
        return { success: true };
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      showNotification(error.message || 'Ошибка поступления товара', 'error');
      return { success: false, error: error.message };
    }
  };

  const handleRemoveStock = async (operationData) => {
    try {
      const response = await apiService.request('/warehouse/operations/remove-stock', {
        method: 'POST',
        body: JSON.stringify(operationData)
      });
      
      if (response.operation) {
        await loadDashboardData(); // Обновляем статистику
        await loadOperations(); // Обновляем операции
        showNotification(response.message || 'Товар списан со склада', 'success');
        setShowRemoveStockModal(false);
        return { success: true };
      }
    } catch (error) {
      console.error('Error removing stock:', error);
      showNotification(error.message || 'Ошибка списания товара', 'error');
      return { success: false, error: error.message };
    }
  };

  const handleSearchItems = async (query, categoryId = null) => {
    try {
      const params = new URLSearchParams({
        q: query,
        limit: 10,
        ...(categoryId && { category_id: categoryId })
      });
      
      const response = await apiService.request(`/warehouse/items/search?${params}`);
      return response.items || [];
    } catch (error) {
      console.error('Error searching items:', error);
      return [];
    }
  };

  const handleGetBarcodeInfo = async (barcode) => {
    try {
      const response = await apiService.request('/warehouse/barcode/info', {
        method: 'POST',
        body: JSON.stringify({ barcode })
      });
      return response;
    } catch (error) {
      console.error('Error getting barcode info:', error);
      return { success: false, error: error.message };
    }
  };

  // Вкладки
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: BarChart3, shortLabel: 'Главная' },
    { id: 'items', label: 'Товары', icon: Package, shortLabel: 'Товары' },
    { id: 'operations', label: 'Операции', icon: History, shortLabel: 'Операции' },
    { id: 'stock', label: 'Остатки', icon: Archive, shortLabel: 'Остатки' }
  ];

  // Рендер контента в зависимости от активной вкладки
  const renderContent = () => {
    const commonProps = {
      loading,
      stats,
      categories,
      items,
      operations,
      constants,
      loadCategories,
      loadItems,
      loadOperations,
      handleSearchItems,
      showNotification,
      onOpenAddItem: () => setShowAddItemModal(true),
      onOpenAddStock: () => setShowAddStockModal(true),
      onOpenRemoveStock: () => setShowRemoveStockModal(true)
    };

    switch (activeTab) {
      case 'dashboard':
        return <WarehouseDashboard {...commonProps} />;
      case 'items':
        return <WarehouseItems {...commonProps} />;
      case 'operations':
        return <WarehouseOperations {...commonProps} />;
      case 'stock':
        return <WarehouseStock {...commonProps} />;
      default:
        return <WarehouseDashboard {...commonProps} />;
    }
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Заголовок */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center space-x-2 sm:space-x-3">
              <Package className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600 flex-shrink-0" />
              <span className="truncate">Склад</span>
            </h1>
            <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base">Управление товарами и операциями</p>
          </div>
          
          {/* Быстрые действия для десктопа */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <button
              onClick={() => setShowAddItemModal(true)}
              className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Добавить товар</span>
              <span className="md:hidden">Товар</span>
            </button>
            
            <button
              onClick={() => setShowAddStockModal(true)}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden md:inline">Поступление</span>
              <span className="md:hidden">+</span>
            </button>
            
            <button
              onClick={() => setShowRemoveStockModal(true)}
              className="bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
            >
              <Minus className="h-4 w-4" />
              <span className="hidden md:inline">Списание</span>
              <span className="md:hidden">-</span>
            </button>
          </div>

          {/* Мобильное меню быстрых действий */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Мобильное меню быстрых действий */}
        {showMobileMenu && (
          <div className="sm:hidden bg-white border border-gray-200 rounded-lg shadow-lg p-4 space-y-3">
            <button
              onClick={() => {
                setShowAddItemModal(true);
                setShowMobileMenu(false);
              }}
              className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Добавить товар</span>
            </button>
            
            <button
              onClick={() => {
                setShowAddStockModal(true);
                setShowMobileMenu(false);
              }}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Поступление товара</span>
            </button>
            
            <button
              onClick={() => {
                setShowRemoveStockModal(true);
                setShowMobileMenu(false);
              }}
              className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 text-sm"
            >
              <Minus className="h-4 w-4" />
              <span>Списание товара</span>
            </button>
          </div>
        )}

        {/* Навигация по вкладкам */}
        <div className="border-b border-gray-200">
          {/* Десктопная навигация */}
          <nav className="hidden sm:flex -mb-px space-x-4 lg:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>

          {/* Мобильная навигация */}
          <nav className="sm:hidden -mb-px flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 border-b-2 font-medium text-xs whitespace-nowrap flex flex-col items-center space-y-1 flex-shrink-0 min-w-0 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span className="truncate">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Контент */}
        <div className="min-h-0 flex-1">
          {renderContent()}
        </div>
      </div>

      {/* Модальные окна */}
      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        onSubmit={handleCreateItem}
        onSearchItems={handleSearchItems}
        onGetBarcodeInfo={handleGetBarcodeInfo}
        loadCategories={loadCategories}
        categories={categories}
        constants={constants}
      />
      
      <AddStockModal
        isOpen={showAddStockModal}
        onClose={() => setShowAddStockModal(false)}
        onSubmit={handleAddStock}
        onSearchItems={handleSearchItems}
        constants={constants}
      />

      <RemoveStockModal
        isOpen={showRemoveStockModal}
        onClose={() => setShowRemoveStockModal(false)}
        onSubmit={handleRemoveStock}
        onSearchItems={handleSearchItems}
        constants={constants}
      />

      {/* Overlay для мобильного меню */}
      {showMobileMenu && (
        <div
          className="sm:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </>
  );
};

export default Warehouse;