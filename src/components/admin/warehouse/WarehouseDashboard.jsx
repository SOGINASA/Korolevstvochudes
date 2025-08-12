import {
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Plus,
  TrendingUp,
  Minus
} from "lucide-react";

// Компонент главной страницы склада
const WarehouseDashboard = ({ 
  loading, 
  stats, 
  onOpenAddItem, 
  onOpenAddStock, 
  onOpenRemoveStock 
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Всего товаров
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.total_items}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Низкие остатки
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.low_stock_items}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Нет в наличии
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stats.out_of_stock_items}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Общая стоимость
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {new Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'KZT',
                    minimumFractionDigits: 0
                  }).format(stats.total_value)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={onOpenAddItem}
            className="p-6 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group"
          >
            <div className="text-center">
              <Plus className="mx-auto h-12 w-12 text-purple-400 group-hover:text-purple-500" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Добавить товар
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                Добавить новый товар в каталог
              </span>
            </div>
          </button>

          <button
            onClick={onOpenAddStock}
            className="p-6 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group"
          >
            <div className="text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-green-400 group-hover:text-green-500" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Поступление товара
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                Увеличить количество на складе
              </span>
            </div>
          </button>

          <button
            onClick={onOpenRemoveStock}
            className="p-6 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors group"
          >
            <div className="text-center">
              <Minus className="mx-auto h-12 w-12 text-orange-400 group-hover:text-orange-500" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Списать со склада
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                Уменьшить количество на складе
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default WarehouseDashboard;