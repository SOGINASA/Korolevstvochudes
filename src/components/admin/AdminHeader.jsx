// components/admin/AdminHeader.js - Красивая адаптивная версия
import React, { useState } from 'react';
import { 
  MessageSquare, 
  User, 
  Bell, 
  Search, 
  Menu, 
  X, 
  ExternalLink,
  Settings,
  LogOut,
  Crown,
  Sparkles
} from 'lucide-react';

const AdminHeader = ({ admin, stats }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'super_admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin':
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      default:
        return <User className="h-4 w-4 text-blue-500" />;
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'super_admin': return 'Супер админ';
      case 'admin': return 'Администратор';
      case 'manager': return 'Менеджер';
      case 'editor': return 'Редактор';
      default: return role;
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Левая часть - Логотип и навигация */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Логотип */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-xl lg:rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"></div>
                <div className="absolute inset-0 w-10 h-10 lg:w-12 lg:h-12 bg-white bg-opacity-20 rounded-xl lg:rounded-2xl backdrop-blur-sm"></div>
                <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Королевство Чудес
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 font-medium">Админ-панель</p>
              </div>
            </div>

            {/* Навигация для десктопа */}
            <nav className="hidden lg:flex items-center space-x-8 ml-8">
              <a 
                href="/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-all duration-300"
              >
                <span>Перейти на сайт</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
              
              <div className="flex items-center space-x-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-gray-700">
                    Заявок: <span className="text-purple-600">{stats?.applications || 0}</span>
                  </span>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-gray-700">
                    Отзывов: <span className="text-blue-600">{stats?.reviews || 0}</span>
                  </span>
                </div>
              </div>
            </nav>
          </div>

          {/* Правая часть - Уведомления и профиль */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Поиск (только на десктопе) */}
            <div className="hidden lg:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Быстрый поиск..."
                className="pl-10 pr-4 py-2 w-48 xl:w-64 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Уведомления */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 lg:p-3 bg-gray-50 hover:bg-gray-100 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Bell className="h-5 w-5 lg:h-6 lg:w-6 text-gray-600" />
                {stats?.newApplications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center shadow-lg animate-pulse">
                    {stats.newApplications > 9 ? '9+' : stats.newApplications}
                  </span>
                )}
              </button>

              {/* Выпадающее меню уведомлений */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Уведомления</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {stats?.newApplications > 0 ? (
                      <div className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Новые заявки ({stats.newApplications})
                            </p>
                            <p className="text-xs text-gray-500">Требуют вашего внимания</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Нет новых уведомлений</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Профиль пользователя */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 lg:p-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full lg:rounded-xl flex items-center justify-center shadow-lg">
                  <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                {admin && (
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-semibold text-gray-900 flex items-center space-x-1">
                      <span>{admin.name}</span>
                      {getRoleIcon(admin.role)}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {getRoleLabel(admin.role)}
                    </div>
                  </div>
                )}
              </button>

              {/* Выпадающее меню профиля */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 flex items-center space-x-1">
                          <span>{admin?.name}</span>
                          {getRoleIcon(admin?.role)}
                        </p>
                        <p className="text-sm text-gray-500">{admin?.email}</p>
                        <p className="text-xs text-purple-600 font-medium">
                          {getRoleLabel(admin?.role)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                      <Settings className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Настройки</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                      <LogOut className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Выйти</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Мобильное меню (только иконка) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное выпадающее меню */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="space-y-4">
              {/* Статистика на мобильных */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-600">Заявки</p>
                  <p className="text-lg font-bold text-purple-600">{stats?.applications || 0}</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-600">Отзывы</p>
                  <p className="text-lg font-bold text-blue-600">{stats?.reviews || 0}</p>
                </div>
              </div>

              {/* Поиск на мобильных */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                />
              </div>

              {/* Навигация на мобильных */}
              <a 
                href="/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-700">Перейти на сайт</span>
                <ExternalLink className="w-4 h-4 text-gray-500" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Overlay для закрытия выпадающих меню */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default AdminHeader;