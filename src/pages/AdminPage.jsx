// pages/AdminPage.js - Обновленная версия с новыми методами для отзывов

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

// Импорт компонентов
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import Dashboard from '../components/admin/Dashboard';
import Applications from '../components/admin/Applications';
import Portfolio from '../components/admin/Portfolio';
import Reviews from '../components/admin/Reviews';
import Blog from '../components/admin/Blog';
import Promotions from '../components/admin/Promotions';
import Services from '../components/admin/Services';
import AdminsManagement from '../components/admin/AdminsManagement';
import Settings from '../components/admin/Settings';

// Импорт модальных окон
import ConfirmModal from '../components/admin/modals/ConfirmModal';
import NotificationModal from '../components/admin/modals/NotificationModal';

const AdminPage = () => {
  const { admin, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Состояния данных
  const [stats, setStats] = useState({
    applications: 0,
    newApplications: 0,
    portfolio: 0,
    reviews: 0,
    blogPosts: 0,
    promotions: 0
  });
  
  const [recentApplications, setRecentApplications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [admins, setAdmins] = useState([]);
  
  // Состояния загрузки
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Состояния модальных окон
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('info');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Добавление класса к body при монтировании
  useEffect(() => {
    document.body.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, []);

  // Загрузка данных при монтировании
  useEffect(() => {
    if (isAuthenticated && admin) {
      loadDashboardData();
      loadBookings();
      loadReviews();
      if (admin?.role === 'super_admin' || admin?.role === 'admin') {
        loadAdmins();
      }
    }
  }, [admin, isAuthenticated]);

  // Проверка аутентификации
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Функции загрузки данных
  const loadDashboardData = async () => {
    setLoadingStats(true);
    try {
      const result = await apiService.getDashboardStats();
      if (result.success && result.stats) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      showNotification('Ошибка загрузки статистики', 'error');
    } finally {
      setLoadingStats(false);
    }
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const result = await apiService.getBookings({ 
        limit: 10, 
        sort: 'created_at', 
        order: 'desc' 
      });
      if (result.success && result.bookings) {
        
        setRecentApplications(result.bookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      showNotification('Ошибка загрузки заявок', 'error');
    } finally {
      setLoadingBookings(false);
    }
  };

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      // Используем обновленный метод для получения всех отзывов
      const result = await apiService.getAllReviewsAdmin({
        page: 1,
        per_page: 50,
        sort: 'created_at',
        order: 'desc'
      });
      
      if (result.success && result.reviews) {
        setReviews(result.reviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      showNotification('Ошибка загрузки отзывов', 'error');
    } finally {
      setLoadingReviews(false);
    }
  };

  const loadAdmins = async () => {
    try {
      const result = await apiService.getAllAdmins();
      if (result.success) {
        setAdmins(result.admins);
      }
    } catch (error) {
      console.error('Error loading admins:', error);
      showNotification('Ошибка загрузки администраторов', 'error');
    }
  };

  // Обработчики действий с заявками
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const result = await apiService.updateBookingStatus(bookingId, newStatus);
      if (result.success) {
        setRecentApplications(prev => 
          prev.map(booking => 
            booking.id === bookingId 
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        showNotification('Статус заявки обновлен', 'success');
      } else {
        throw new Error(result.error || 'Ошибка обновления статуса');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Error updating booking status:', error);
    }
  };

  // Обработчики действий с отзывами
  const handleApproveReview = async (reviewId) => {
    try {
      const result = await apiService.approveReview(reviewId);
      if (result.success) {
        // Обновляем локальное состояние
        setReviews(prev => 
          prev.map(review => 
            review.id === reviewId 
              ? { ...review, approved: true }
              : review
          )
        );
        showNotification('Отзыв одобрен', 'success');
      } else {
        throw new Error(result.error || 'Ошибка одобрения отзыва');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Error approving review:', error);
    }
  };

  const handleRejectReview = async (reviewId) => {
    try {
      const result = await apiService.rejectReview(reviewId);
      if (result.success) {
        // Удаляем отзыв из локального состояния
        setReviews(prev => prev.filter(review => review.id !== reviewId));
        showNotification('Отзыв отклонен', 'success');
      } else {
        throw new Error(result.error || 'Ошибка отклонения отзыва');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Error rejecting review:', error);
    }
  };

  const handleToggleReviewFeatured = async (reviewId, featured) => {
    try {
      const result = await apiService.toggleReviewFeatured(reviewId, featured);
      if (result.success) {
        setReviews(prev => 
          prev.map(review => 
            review.id === reviewId 
              ? { ...review, featured }
              : review
          )
        );
        const action = featured ? 'добавлен в избранные' : 'удален из избранных';
        showNotification(`Отзыв ${action}`, 'success');
      } else {
        throw new Error(result.error || 'Ошибка изменения статуса');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Error toggling review featured:', error);
    }
  };

  const handleBulkApproveReviews = async (reviewIds) => {
    try {
      const result = await apiService.bulkApproveReviews(reviewIds);
      if (result.success) {
        // Обновляем локальное состояние
        setReviews(prev => 
          prev.map(review => 
            reviewIds.includes(review.id)
              ? { ...review, approved: true }
              : review
          )
        );
        showNotification(`Одобрено отзывов: ${result.updated_count}`, 'success');
      } else {
        throw new Error(result.error || 'Ошибка массового одобрения');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Error bulk approving reviews:', error);
    }
  };

  const handleBulkDeleteReviews = async (reviewIds) => {
    try {
      const result = await apiService.bulkDeleteReviews(reviewIds);
      if (result.success) {
        // Удаляем отзывы из локального состояния
        setReviews(prev => 
          prev.filter(review => !reviewIds.includes(review.id))
        );
        showNotification(`Удалено отзывов: ${result.deleted_count}`, 'success');
      } else {
        throw new Error(result.error || 'Ошибка массового удаления');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Error bulk deleting reviews:', error);
    }
  };

  // Экспорт отзывов
  const handleExportReviews = async (filters = {}) => {
    try {
      const result = await apiService.exportReviews(filters);
      if (result.success && result.blob) {
        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(result.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reviews_export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        showNotification('Экспорт отзывов завершен', 'success');
      } else {
        throw new Error(result.error || 'Ошибка экспорта');
      }
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Error exporting reviews:', error);
    }
  };

  const showNotification = (message, type = 'info') => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  // Общие пропсы для всех компонентов
  const commonProps = {
    admin,
    stats,
    loadingStats,
    recentApplications,
    loadingBookings,
    reviews,
    loadingReviews,
    admins,
    onUpdateBookingStatus: handleUpdateBookingStatus,
    onApproveReview: handleApproveReview,
    onRejectReview: handleRejectReview,
    onToggleReviewFeatured: handleToggleReviewFeatured,
    onBulkApproveReviews: handleBulkApproveReviews,
    onBulkDeleteReviews: handleBulkDeleteReviews,
    onExportReviews: handleExportReviews,
    onLoadAdmins: loadAdmins,
    onLoadReviews: loadReviews,
    onLoadBookings: loadBookings,
    showNotification,
    setActiveTab
  };

  // Рендер контента в зависимости от активной вкладки
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <Dashboard {...commonProps} />;
      case 'applications': 
        return <Applications {...commonProps} />;
      case 'portfolio': 
        return <Portfolio {...commonProps} />;
      case 'reviews': 
        return <Reviews {...commonProps} />;
      case 'blog': 
        return <Blog {...commonProps} />;
      case 'promotions': 
        return <Promotions {...commonProps} />;
      case 'services': 
        return <Services {...commonProps} />;
      case 'admins': 
        return <AdminsManagement {...commonProps} />;
      case 'settings': 
        return <Settings {...commonProps} />;
      default: 
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader admin={admin} stats={stats} />
      
      <div className="flex">
        <AdminSidebar 
          admin={admin}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>

      {/* Модальные окна */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          // Логика подтверждения будет обрабатываться в соответствующих компонентах
          setConfirmDeleteId(null);
        }}
        message="Вы уверены, что хотите удалить этот элемент?"
      />

      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default AdminPage;