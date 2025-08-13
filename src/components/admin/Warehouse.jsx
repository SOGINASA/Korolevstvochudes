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
  XCircle
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
    { id: 'dashboard', label: 'Главная', icon: BarChart3 },
    { id: 'items', label: 'Товары', icon: Package },
    { id: 'operations', label: 'Операции', icon: History },
    { id: 'stock', label: 'Остатки', icon: Archive }
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
      <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Package className="h-8 w-8 text-purple-600" />
            <span>Склад</span>
          </h1>
          <p className="text-gray-600 mt-1">Управление товарами и операциями</p>
        </div>
        
        {/* Быстрые действия */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddItemModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Добавить товар</span>
          </button>
          
          <button
            onClick={() => setShowAddStockModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Поступление</span>
          </button>
          
          <button
            onClick={() => setShowRemoveStockModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <Minus className="h-4 w-4" />
            <span>Списание</span>
          </button>
        </div>
      </div>

      {/* Навигация по вкладкам */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Контент */}
      {renderContent()}

      {/* Модальные окна */}
      

      </div>
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
    </>
  );
};



export default Warehouse;