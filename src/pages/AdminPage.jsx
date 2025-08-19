// pages/AdminPage.js - Обновленная версия с новыми методами для отзывов

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { Menu, X } from 'lucide-react';

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
import LeadsPage from '../components/admin/LeadsPage';
import AdminsManagement from '../components/admin/AdminsManagement';
import Settings from '../components/admin/Settings';
import Warehouse from '../components/admin/Warehouse';

import { Package } from 'lucide-react';

// Импорт модальных окон
import ConfirmModal from '../components/admin/modals/ConfirmModal';
import NotificationModal from '../components/admin/modals/NotificationModal';

const AdminPage = () => {
  const { admin, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Состояния данных
  const [stats, setStats] = useState({
    applications: 0,
    newApplications: 0,
    portfolio: 0,
    reviews: 0,
    blogPosts: 0,
    promotions: 0
  });
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogStats, setBlogStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0,
    total_views: 0,
    categories: []
  });
  const [blogPagination, setBlogPagination] = useState({
    page: 1,
    pages: 1,
    per_page: 20,
    total: 0,
    has_next: false,
    has_prev: false
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
  const [bookingsPagination, setBookingsPagination] = useState({
    page: 1,
    pages: 1,
    per_page: 10,
    total: 0,
    has_next: false,
    has_prev: false
  });

// Обновленная функция загрузки заявок
const loadBookings = async (page = 1, filters = {}) => {
  setLoadingBookings(true);
  try {
    const params = {
      page: page,
      per_page: 10,
      sort_by: 'created_at',
      sort_order: 'desc',
      ...filters
    };

    const result = await apiService.getBookingsPaginated(params);
    
    if (result.success && result.bookings) {
      setRecentApplications(result.bookings);
      
      // Обновляем информацию о пагинации
      if (result.pagination) {
        setBookingsPagination(result.pagination);
      }
    } else {
      throw new Error(result.error || 'Ошибка загрузки заявок');
    }
  } catch (error) {
    console.error('Error loading bookings:', error);
    showNotification('Ошибка загрузки заявок', 'error');
  } finally {
    setLoadingBookings(false);
  }
};

// Функция для смены страницы
const handleBookingsPageChange = async (newPage) => {
  await loadBookings(newPage);
};

// Функция удаления заявки
const handleDeleteBooking = async (bookingId) => {
  try {
    const result = await apiService.deleteBooking(bookingId);
    
    if (result.success) {
      // Удаляем заявку из локального состояния
      setRecentApplications(prev => 
        prev.filter(booking => booking.id !== bookingId)
      );
      
      // Если на текущей странице больше нет заявок, переходим на предыдущую
      const remainingBookings = recentApplications.filter(b => b.id !== bookingId);
      if (remainingBookings.length === 0 && bookingsPagination.page > 1) {
        await loadBookings(bookingsPagination.page - 1);
      } else {
        // Перезагружаем текущую страницу для обновления счетчиков
        await loadBookings(bookingsPagination.page);
      }
      
      showNotification('Заявка успешно удалена', 'success');
    } else {
      throw new Error(result.error || 'Ошибка удаления заявки');
    }
  } catch (error) {
    showNotification(error.message, 'error');
    console.error('Error deleting booking:', error);
  }
};

const handleTabChange = (tab) => {
  setActiveTab(tab);
  setIsMobileMenuOpen(false); // Закрываем меню при выборе вкладки
};

// Добавить обработчик для закрытия меню при клике вне его
useEffect(() => {
  const handleClickOutside = (event) => {
    if (isMobileMenuOpen && !event.target.closest('.mobile-sidebar')) {
      setIsMobileMenuOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [isMobileMenuOpen]);

// Функция массового удаления заявок
const handleBulkDeleteBookings = async (bookingIds) => {
  try {
    const result = await apiService.bulkDeleteBookings(bookingIds);
    
    if (result.success) {
      // Удаляем заявки из локального состояния
      setRecentApplications(prev => 
        prev.filter(booking => !bookingIds.includes(booking.id))
      );
      
      // Перезагружаем данные для обновления пагинации
      await loadBookings(bookingsPagination.page);
      
      showNotification(`Удалено заявок: ${bookingIds.length}`, 'success');
    } else {
      throw new Error(result.error || 'Ошибка массового удаления');
    }
  } catch (error) {
    showNotification(error.message, 'error');
    console.error('Error bulk deleting bookings:', error);
  }
};

// Функция экспорта заявок
const handleExportBookings = async (filters = {}) => {
  try {
    const result = await apiService.exportBookings(filters);
    
    if (result.success && result.blob) {
      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bookings_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showNotification('Экспорт заявок завершен', 'success');
    } else {
      throw new Error(result.error || 'Ошибка экспорта');
    }
  } catch (error) {
    showNotification(error.message, 'error');
    console.error('Error exporting bookings:', error);
  }
};
const loadBlogPosts = async (filters = {}) => {
  try {
    const result = await apiService.getBlogPostsWithFilters(filters);
    if (result.success) {
      setBlogPosts(result.posts || []);
      if (result.pagination) {
        setBlogPagination(result.pagination);
      }
      return result;
    } else {
      throw new Error(result.error || 'Ошибка загрузки статей блога');
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    showNotification('Ошибка загрузки статей блога', 'error');
    return { success: false, error: error.message };
  }
};

const loadBlogStats = async () => {
  try {
    const result = await apiService.getAdminBlogStats();
    
    if (result.success) {
      setBlogStats({
        total: result.total || 0,
        published: result.published || 0,
        draft: result.draft || 0,
        featured: result.featured || 0,
        total_views: result.total_views || 0,
        categories: result.categories || []
      });
      return result;
    } else {
      throw new Error(result.error || 'Ошибка загрузки статистики блога');
    }
  } catch (error) {
    console.error('Error loading blog stats:', error);
    showNotification('Ошибка загрузки статистики блога', 'error');
    return { success: false, error: error.message };
  }
};

const handleCreateBlogPost = async (postData) => {
  try {
    const result = await apiService.createBlogPost(postData);
    
    if (result.success) {
      // Обновляем локальные данные
      setBlogPosts(prev => [result.post, ...prev]);
      
      // Перезагружаем статистику
      await loadBlogStats();
      
      return result;
    } else {
      throw new Error(result.error || 'Ошибка создания статьи');
    }
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error: error.message };
  }
};

const handleUpdateBlogPost = async (postId, postData) => {
  try {
    const result = await apiService.updateBlogPost(postId, postData);
    
    if (result.success) {
      // Обновляем локальные данные
      setBlogPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, ...result.post }
            : post
        )
      );
      
      // Перезагружаем статистику если изменился статус
      if (postData.status) {
        await loadBlogStats();
      }
      
      return result;
    } else {
      throw new Error(result.error || 'Ошибка обновления статьи');
    }
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { success: false, error: error.message };
  }
};

const handleDeleteBlogPost = async (postId) => {
  try {
    const result = await apiService.deleteBlogPost(postId);
    
    if (result.success) {
      // Удаляем из локальных данных
      setBlogPosts(prev => prev.filter(post => post.id !== postId));
      
      // Перезагружаем статистику
      await loadBlogStats();
      
      return result;
    } else {
      throw new Error(result.error || 'Ошибка удаления статьи');
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { success: false, error: error.message };
  }
};

const handleBulkDeleteBlogPosts = async (postIds) => {
  try {
    const result = await apiService.bulkDeleteBlogPosts(postIds);
    
    if (result.success) {
      // Удаляем из локальных данных
      setBlogPosts(prev => 
        prev.filter(post => !postIds.includes(post.id))
      );
      
      // Перезагружаем статистику
      await loadBlogStats();
      
      return result;
    } else {
      throw new Error(result.error || 'Ошибка массового удаления статей');
    }
  } catch (error) {
    console.error('Error bulk deleting blog posts:', error);
    return { success: false, error: error.message };
  }
};

const handleBulkUpdateBlogPosts = async (postIds, updateData) => {
  try {
    const result = await apiService.bulkUpdateBlogPosts(postIds, updateData);
    
    if (result.success) {
      // Перезагружаем данные для корректного отображения
      await loadBlogPosts({
        page: blogPagination.page,
        per_page: blogPagination.per_page
      });
      
      // Перезагружаем статистику
      await loadBlogStats();
      
      return result;
    } else {
      throw new Error(result.error || 'Ошибка массового обновления статей');
    }
  } catch (error) {
    console.error('Error bulk updating blog posts:', error);
    return { success: false, error: error.message };
  }
};

const handleExportBlogPosts = async (filters = {}) => {
  try {
    const result = await apiService.exportBlogPosts(filters);
    
    if (result.success && result.blob) {
      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `blog_posts_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return result;
    } else {
      throw new Error(result.error || 'Ошибка экспорта статей');
    }
  } catch (error) {
    console.error('Error exporting blog posts:', error);
    return { success: false, error: error.message };
  }
};

// Функция для смены страницы блога
const handleBlogPageChange = async (newPage, filters = {}) => {
  await loadBlogPosts({
    ...filters,
    page: newPage,
    per_page: blogPagination.per_page
  });
};

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
      loadBlogStats(); // Добавить эту строку
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
      setStats({
        ...result.stats,
        // Добавляем статистику блога если она есть
        blogPosts: blogStats.total || 0,
        publishedPosts: blogStats.published || 0
      });
    }
  } catch (error) {
    console.error('Error loading dashboard stats:', error);
    showNotification('Ошибка загрузки статистики', 'error');
  } finally {
    setLoadingStats(false);
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
  bookingsPagination,
  reviews,
  loadingReviews,
  admins,
  
  // Данные блога
  blogPosts,
  blogStats,
  blogPagination,
  
  // Функции для заявок
  onUpdateBookingStatus: handleUpdateBookingStatus,
  onDeleteBooking: handleDeleteBooking,
  onBulkDeleteBookings: handleBulkDeleteBookings,
  onExportBookings: handleExportBookings,
  onBookingsPageChange: handleBookingsPageChange,
  
  // Функции для отзывов
  onApproveReview: handleApproveReview,
  onRejectReview: handleRejectReview,
  onToggleReviewFeatured: handleToggleReviewFeatured,
  onBulkApproveReviews: handleBulkApproveReviews,
  onBulkDeleteReviews: handleBulkDeleteReviews,
  onExportReviews: handleExportReviews,
  
  // Функции для блога
  loadBlogPosts: loadBlogPosts,
  loadBlogStats: loadBlogStats,
  handleCreateBlogPost: handleCreateBlogPost,
  handleUpdateBlogPost: handleUpdateBlogPost,
  handleDeleteBlogPost: handleDeleteBlogPost,
  handleBulkDeleteBlogPosts: handleBulkDeleteBlogPosts,
  handleBulkUpdateBlogPosts: handleBulkUpdateBlogPosts,
  handleExportBlogPosts: handleExportBlogPosts,
  handleBlogPageChange: handleBlogPageChange,
  
  // Общие функции
  onLoadAdmins: loadAdmins,
  onLoadReviews: loadReviews,
  onLoadBookings: loadBookings,
  showNotification,
  setActiveTab,

  setActiveTab: handleTabChange
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
      case 'leads':
        return <LeadsPage {...commonProps} />;
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
      case 'warehouse': 
        return <Warehouse showNotification={showNotification} />;
      case 'settings': 
        return <Settings {...commonProps} />;
      default: 
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ДОБАВЛЯЕМ мобильную шапку */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Админ-панель</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex relative">
        {/* ДОБАВЛЯЕМ overlay для мобильных устройств */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
        )}

        {/* ИЗМЕНЯЕМ сайдбар - делаем его адаптивным */}
        <div className={`
          mobile-sidebar fixed lg:static inset-y-0 left-0 z-50 w-64 
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:transition-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <AdminSidebar 
            admin={admin}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isMobile={true}
          />
        </div>
        
        {/* ИЗМЕНЯЕМ main - делаем адаптивным */}
        <main className="flex-1 p-4 lg:p-8 w-full lg:w-auto min-w-0">
          {renderContent()}
        </main>
      </div>

      {/* Модальные окна остаются без изменений */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
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