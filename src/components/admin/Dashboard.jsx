// components/admin/Dashboard.js
import React from 'react';
import { MessageSquare, Star, Sparkles, Users, Eye } from 'lucide-react';
import { formatDate, getStatusColor, getStatusText } from '../../utils/helpers';

const Dashboard = ({ 
  stats, 
  loadingStats, 
  recentApplications, 
  loadingBookings, 
  admins,
  onUpdateBookingStatus,
  setActiveTab 
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Всего заявок</p>
              <p className="text-3xl font-bold text-gray-900">
                {loadingStats ? '...' : stats.bookings?.total || 0}
              </p>
              <p className="text-sm text-green-600 mt-2">
                +{loadingStats ? '...' : stats.bookings?.new || 0} новых
              </p>
            </div>
            <MessageSquare className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Отзывы</p>
              <p className="text-3xl font-bold text-gray-900">
                {loadingStats ? '...' : stats.reviews?.total || 0}
              </p>
              <p className="text-sm text-yellow-600 mt-2">
                Рейтинг: {loadingStats ? '...' : (stats.reviews?.average_rating || 0).toFixed(1)}
              </p>
            </div>
            <Star className="h-12 w-12 text-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Услуги</p>
              <p className="text-3xl font-bold text-gray-900">
                {loadingStats ? '...' : stats.services?.total || 0}
              </p>
              <p className="text-sm text-blue-600 mt-2">активных</p>
            </div>
            <Sparkles className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Администраторы</p>
              <p className="text-3xl font-bold text-gray-900">{admins.length}</p>
              <p className="text-sm text-green-600 mt-2">активных</p>
            </div>
            <Users className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Последние заявки</h3>
          <button 
            onClick={() => setActiveTab('applications')}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Смотреть все
          </button>
        </div>
        
        <div className="space-y-4">
          {loadingBookings ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : recentApplications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Нет заявок</p>
          ) : (
            recentApplications.slice(0, 5).map(app => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-semibold text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-600">{app.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-sm text-gray-900">{formatDate(app.created_at)}</p>
                  <p className="text-sm text-gray-600">{app.service_title || 'Услуга'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {getStatusText(app.status)}
                  </span>
                  {app.status === 'new' && (
                    <button 
                      onClick={() => onUpdateBookingStatus(app.id, 'confirmed')}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Подтвердить
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;