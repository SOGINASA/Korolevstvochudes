// components/admin/Blog.js
import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Globe, Clock, TrendingUp, Eye, Edit, Trash2, Save, X, Filter, Calendar, Tag, Star, Image, Link } from 'lucide-react';
import { getStatusColor, getStatusText, blogCategories, generateSlug } from '../../utils/helpers';
import { apiService } from '../../services/api';

const Blog = ({ 
  showNotification, 
  loadBlogPosts,
  loadBlogStats,
  handleCreateBlogPost,
  handleUpdateBlogPost,
  handleDeleteBlogPost,
  handleBulkDeleteBlogPosts,
  handleBulkUpdateBlogPosts,
  handleExportBlogPosts,
  handleBlogPageChange
}) => {
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [blogArticles, setBlogArticles] = useState([]);
  const [blogStats, setBlogStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    category: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft',
    featured: false,
    featured_image: '', // Добавлено поле для URL изображения
    metaTitle: '',
    metaDescription: ''
  });

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadData();
    loadStats();
  }, []);

  // Загрузка данных при изменении фильтров или пагинации
  useEffect(() => {
    loadData();
  }, [searchQuery, selectedCategory, selectedStatus, pagination.currentPage]);

  const loadData = async () => {
    if (!loadBlogPosts) return;
    
    setLoading(true);
    try {
      const params = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search: searchQuery,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined
      };

      const result = await loadBlogPosts(params);
      if (result && result.success) {
        setBlogArticles(result);
        setPagination(prev => ({
          ...prev,
          totalPages: result.pagination?.totalPages || 1,
          totalItems: result.pagination?.totalItems || 0
        }));
      }
    } catch (error) {
      console.error('Ошибка загрузки постов блога:', error);
      showNotification('Ошибка загрузки данных', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    if (!loadBlogStats) return;
    
    try {
      const stats = await loadBlogStats();
      if (stats) {
        setBlogStats(stats);
      }
    } catch (error) {
      console.error('Ошибка загрузки статистики блога:', error);
    }
  };

  const resetArticleForm = () => {
    setArticleForm({
      title: '',
      slug: '',
      category: '',
      content: '',
      excerpt: '',
      tags: '',
      status: 'draft',
      featured: false,
      featured_image: '', // Сброс поля изображения
      metaTitle: '',
      metaDescription: ''
    });
    setEditingArticle(null);
  };

  const handleTitleChange = (title) => {
    setArticleForm(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    
    if (!handleCreateBlogPost && !handleUpdateBlogPost) {
      showNotification('Методы создания/обновления не переданы', 'error');
      return;
    }

    setLoading(true);
    try {
      if (editingArticle) {
        // Обновление существующей статьи
        if (handleUpdateBlogPost) {
          await handleUpdateBlogPost(editingArticle.id, articleForm);
          showNotification('Статья обновлена', 'success');
        }
      } else {
        // Добавление новой статьи
        if (handleCreateBlogPost) {
          await handleCreateBlogPost(articleForm);
          showNotification('Статья добавлена', 'success');
        }
      }
      
      setShowAddArticle(false);
      resetArticleForm();
      await loadData(); // Перезагрузка данных
      await loadStats(); // Обновление статистики
    } catch (error) {
      console.error('Ошибка сохранения статьи:', error);
      showNotification('Ошибка сохранения статьи', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setArticleForm({
      title: article.title || '',
      slug: article.slug || '',
      category: article.category || '',
      content: article.content || '',
      excerpt: article.excerpt || '',
      tags: article.tags || '',
      status: article.status || 'draft',
      featured: article.featured || false,
      featured_image: article.featured_image || '', // Загрузка существующего изображения
      metaTitle: article.metaTitle || '',
      metaDescription: article.metaDescription || ''
    });
    setShowAddArticle(true);
  };

  const handleDeleteArticle = async (articleId) => {
    if (!handleDeleteBlogPost) {
      showNotification('Метод удаления не передан', 'error');
      return;
    }

    if (!window.confirm('Вы уверены, что хотите удалить эту статью?')) {
      return;
    }

    setLoading(true);
    try {
      await handleDeleteBlogPost(articleId);
      showNotification('Статья удалена', 'success');
      await loadData(); // Перезагрузка данных
      await loadStats(); // Обновление статистики
    } catch (error) {
      console.error('Ошибка удаления статьи:', error);
      showNotification('Ошибка удаления статьи', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    if (handleBlogPageChange) {
      handleBlogPageChange(page);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Сброс на первую страницу при поиске
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Сброс на первую страницу при смене фильтра
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Сброс на первую страницу при смене фильтра
  };

  // Функция для проверки валидности URL изображения
  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header с градиентом */}
      <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 rounded-full bg-white bg-opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-32 h-32 rounded-full bg-white bg-opacity-5"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">Управление блогом</h2>
            <p className="text-purple-100">Создавайте и управляйте контентом вашего сайта</p>
          </div>
          <button 
            onClick={() => setShowAddArticle(true)}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            disabled={loading}
          >
            <Plus className="h-5 w-5" />
            <span>Добавить статью</span>
          </button>
        </div>
      </div>

      {/* Статистика с улучшенным дизайном */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-white bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <FileText className="h-8 w-8" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{blogStats.total}</div>
                <div className="text-sm opacity-80">публикаций</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Всего статей</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-white bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Globe className="h-8 w-8" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{blogStats.published}</div>
                <div className="text-sm opacity-80">статей</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Опубликовано</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-white bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Clock className="h-8 w-8" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{blogStats.draft}</div>
                <div className="text-sm opacity-80">в работе</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Черновики</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-white bg-opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{blogStats.total_views}</div>
                <div className="text-sm opacity-80">всего</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Просмотры</h3>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск с улучшенным дизайном */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <Filter className="h-6 w-6 text-purple-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Фильтры и поиск</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск статей..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select 
              className="w-full pl-12 pr-8 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 appearance-none bg-white transition-all duration-300"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={loading}
            >
              <option value="all">Все категории</option>
              {blogCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select 
              className="w-full pl-12 pr-8 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 appearance-none bg-white transition-all duration-300"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={loading}
            >
              <option value="all">Все статусы</option>
              <option value="published">Опубликовано</option>
              <option value="draft">Черновик</option>
              <option value="scheduled">Запланировано</option>
            </select>
          </div>
        </div>
      </div>

      {/* Список статей */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center p-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200"></div>
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent absolute top-0"></div>
            </div>
            <span className="ml-4 text-lg text-gray-600">Загрузка...</span>
          </div>
        )}
        
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Статья
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Категория
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Просмотры
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {blogArticles?.pagination?.posts?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-8 py-16 text-center">
                      <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-xl font-semibold text-gray-500 mb-2">Статьи не найдены</p>
                      <p className="text-gray-400">Попробуйте изменить фильтры или создать новую статью</p>
                    </td>
                  </tr>
                ) : (
                  blogArticles?.posts?.map(article => (
                    <tr key={article.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200">
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <div className="h-14 w-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg overflow-hidden">
                            {article.featured_image && isValidImageUrl(article.featured_image) ? (
                              <img 
                                src={article.featured_image} 
                                alt={article.title}
                                className="h-14 w-14 object-cover rounded-2xl"
                                onError={(e) => {
                                  // Fallback к градиенту при ошибке загрузки
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className={`h-14 w-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center ${article.featured_image && isValidImageUrl(article.featured_image) ? 'hidden' : 'flex'}`}>
                              <FileText className="h-7 w-7 text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 mb-1">{article.title}</div>
                            <div className="text-sm text-gray-500">/{article.slug}</div>
                            {article.featured && (
                              <div className="flex items-center mt-2">
                                <span className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                                  <Star className="h-3 w-3 mr-1" />
                                  Рекомендуемая
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-xl">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-600">
                        {article.date || article.createdAt}
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`px-3 py-2 text-sm font-medium rounded-xl ${getStatusColor(article.status)}`}>
                          {getStatusText(article.status)}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-600">
                          <Eye className="h-4 w-4 mr-2 text-purple-500" />
                          {article.views || 0}
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <a 
                            href={`../blog/${article.slug}`}
                            className="p-2 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-all duration-200 transform hover:scale-110"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <button 
                            onClick={() => handleEditArticle(article)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all duration-200 transform hover:scale-110"
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteArticle(article.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-200 transform hover:scale-110"
                            disabled={loading}
                          >
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
        )}
      </div>

      {/* Пагинация */}
      {pagination.totalPages > 1 && (
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              Показано <span className="font-semibold text-purple-600">{Math.min((pagination.currentPage - 1) * pagination.itemsPerPage + 1, pagination.totalItems)}</span> - <span className="font-semibold text-purple-600">{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}</span> из <span className="font-semibold text-purple-600">{pagination.totalItems}</span> записей
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1 || loading}
                className="px-4 py-2 text-sm border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Назад
              </button>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={loading}
                  className={`px-4 py-2 text-sm border-2 rounded-xl transition-all duration-300 ${
                    pagination.currentPage === index + 1
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600 shadow-lg transform scale-110'
                      : 'border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages || loading}
                className="px-4 py-2 text-sm border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Вперед
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal для добавления/редактирования статьи */}
{showAddArticle && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {editingArticle ? 'Редактировать статью' : 'Создать новую статью'}
            </h3>
            <p className="text-purple-100">
              {editingArticle ? 'Внесите изменения в статью' : 'Заполните информацию для новой статьи'}
            </p>
          </div>
          <button
            onClick={() => { setShowAddArticle(false); resetArticleForm(); }}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-300"
            disabled={loading}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
        <form onSubmit={handleArticleSubmit} className="p-8 space-y-8">
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Основная информация
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Заголовок статьи *
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  placeholder="Например: Как выбрать аниматора для детского праздника"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  URL (slug)
                </label>
                <input
                  type="text"
                  value={articleForm.slug}
                  onChange={(e) => setArticleForm({...articleForm, slug: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  placeholder="kak-vybrat-animatora"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Категория *
                </label>
                <select
                  required
                  value={articleForm.category}
                  onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  disabled={loading}
                >
                  <option value="">Выберите категорию</option>
                  {blogCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Теги
                </label>
                <input
                  type="text"
                  value={articleForm.tags}
                  onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  placeholder="аниматор, детский праздник, советы"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Секция для изображения статьи */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Image className="h-5 w-5 mr-2 text-purple-600" />
              Изображение статьи
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  URL изображения
                </label>
                <div className="relative">
                  <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={articleForm.featured_image}
                    onChange={(e) => setArticleForm({...articleForm, featured_image: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                    disabled={loading}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Поддерживаемые форматы: JPG, JPEG, PNG, GIF, WebP, SVG
                </p>
              </div>

              {/* Предпросмотр изображения */}
              {articleForm.featured_image && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Предпросмотр изображения
                  </label>
                  {isValidImageUrl(articleForm.featured_image) ? (
                    <div className="relative">
                      <img
                        src={articleForm.featured_image}
                        alt="Предпросмотр"
                        className="w-full max-w-md h-48 object-cover rounded-2xl shadow-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <div className="hidden p-8 border-2 border-dashed border-red-300 rounded-2xl bg-red-50 text-center">
                        <Image className="h-12 w-12 text-red-400 mx-auto mb-2" />
                        <p className="text-red-600 font-medium">Не удалось загрузить изображение</p>
                        <p className="text-red-500 text-sm">Проверьте правильность URL</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 border-2 border-dashed border-yellow-300 rounded-2xl bg-yellow-50 text-center">
                      <Image className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                      <p className="text-yellow-700 font-medium">Неверный формат URL</p>
                      <p className="text-yellow-600 text-sm">URL должен начинаться с http:// или https:// и заканчиваться расширением изображения</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Edit className="h-5 w-5 mr-2 text-purple-600" />
              Содержание
            </h4>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Краткое описание
                </label>
                <textarea
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  placeholder="Краткое описание статьи для превью..."
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Содержание статьи *
                </label>
                
                {/* Панель инструментов редактора */}
                <div className="border-2 border-gray-200 rounded-t-2xl bg-gray-100 p-3 flex items-center space-x-2 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const newText = textarea.value.substring(0, start) + `**${selectedText}**` + textarea.value.substring(end);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-bold"
                    disabled={loading}
                  >
                    <strong>B</strong>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const newText = textarea.value.substring(0, start) + `*${selectedText}*` + textarea.value.substring(end);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm italic"
                    disabled={loading}
                  >
                    <em>I</em>
                  </button>
                  
                  <div className="h-6 w-px bg-gray-300"></div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + `\n# ` + textarea.value.substring(start);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    H1
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + `\n## ` + textarea.value.substring(start);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    H2
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + `\n### ` + textarea.value.substring(start);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    H3
                  </button>
                  
                  <div className="h-6 w-px bg-gray-300"></div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + `\n- ` + textarea.value.substring(start);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    • Список
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const newText = textarea.value.substring(0, start) + `\n1. ` + textarea.value.substring(start);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    1. Список
                  </button>
                  
                  <div className="h-6 w-px bg-gray-300"></div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Введите URL ссылки:');
                      const text = prompt('Введите текст ссылки:') || 'ссылка';
                      if (url) {
                        const textarea = document.getElementById('content-editor');
                        const start = textarea.selectionStart;
                        const newText = textarea.value.substring(0, start) + `[${text}](${url})` + textarea.value.substring(start);
                        setArticleForm({...articleForm, content: newText});
                      }
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    🔗 Ссылка
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Введите URL изображения:');
                      const alt = prompt('Введите описание изображения:') || 'изображение';
                      if (url) {
                        const textarea = document.getElementById('content-editor');
                        const start = textarea.selectionStart;
                        const newText = textarea.value.substring(0, start) + `![${alt}](${url})` + textarea.value.substring(start);
                        setArticleForm({...articleForm, content: newText});
                      }
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    🖼️ Фото
                  </button>
                  
                  <div className="h-6 w-px bg-gray-300"></div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const textarea = document.getElementById('content-editor');
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const newText = textarea.value.substring(0, start) + `\n> ${selectedText}\n` + textarea.value.substring(end);
                      setArticleForm({...articleForm, content: newText});
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    disabled={loading}
                  >
                    💬 Цитата
                  </button>
                </div>
                
                {/* Редактор с предпросмотром */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Текстовый редактор */}
                  <div>
                    <div className="text-xs text-gray-500 mb-2 font-medium">Редактор (Markdown)</div>
                    <textarea
                      id="content-editor"
                      required
                      value={articleForm.content}
                      onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                      rows={20}
                      className="w-full px-4 py-4 border-2 border-gray-200 border-t-0 rounded-b-2xl lg:rounded-tr-none lg:rounded-br-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 font-mono text-sm"
                      placeholder="# Заголовок статьи

Напишите содержание статьи здесь. Вы можете использовать Markdown для форматирования:

## Подзаголовок

**Жирный текст** и *курсив*

- Маркированный список
- Второй пункт

1. Нумерованный список
2. Второй пункт

> Цитата или важная информация

[Ссылка на сайт](https://example.com)

![Описание изображения](https://example.com/image.jpg)"
                      disabled={loading}
                    />
                  </div>
                  
                  {/* Предпросмотр */}
                  <div className="hidden lg:block">
                    <div className="text-xs text-gray-500 mb-2 font-medium">Предпросмотр</div>
                    <div className="border-2 border-gray-200 border-t-0 rounded-b-2xl lg:rounded-tl-none lg:rounded-bl-2xl p-4 bg-white h-[500px] overflow-y-auto">
                      <div className="prose prose-sm max-w-none">
                        {articleForm.content ? (
                          <div 
                            dangerouslySetInnerHTML={{
                              __html: articleForm.content
                                .replace(/\n# (.*)/g, '<h1 class="text-2xl font-bold mb-4 text-gray-900">$1</h1>')
                                .replace(/\n## (.*)/g, '<h2 class="text-xl font-bold mb-3 text-gray-800">$1</h2>')
                                .replace(/\n### (.*)/g, '<h3 class="text-lg font-bold mb-2 text-gray-700">$1</h3>')
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                                .replace(/\n- (.*)/g, '<li class="ml-4">$1</li>')
                                .replace(/\n\d+\. (.*)/g, '<li class="ml-4 list-decimal">$1</li>')
                                .replace(/\n> (.*)/g, '<blockquote class="border-l-4 border-purple-400 pl-4 italic text-gray-600 my-4">$1</blockquote>')
                                .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-purple-600 hover:text-purple-800 underline">$1</a>')
                                .replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')
                                .replace(/\n/g, '<br>')
                            }}
                          />
                        ) : (
                          <div className="text-gray-400 italic">Предпросмотр появится здесь...</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Подсказки по Markdown */}
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h5 className="text-sm font-semibold text-blue-800 mb-2">💡 Подсказки по форматированию:</h5>
                  <div className="text-xs text-blue-700 space-y-1">
                    <div><code className="bg-blue-100 px-1 rounded">**текст**</code> - жирный текст</div>
                    <div><code className="bg-blue-100 px-1 rounded">*текст*</code> - курсив</div>
                    <div><code className="bg-blue-100 px-1 rounded"># Заголовок</code> - большой заголовок</div>
                    <div><code className="bg-blue-100 px-1 rounded">## Подзаголовок</code> - средний заголовок</div>
                    <div><code className="bg-blue-100 px-1 rounded">- пункт</code> - маркированный список</div>
                    <div><code className="bg-blue-100 px-1 rounded">></code> - выделенная цитата</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-600" />
              SEO и публикация
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  value={articleForm.metaTitle}
                  onChange={(e) => setArticleForm({...articleForm, metaTitle: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  placeholder="SEO заголовок"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Статус публикации
                </label>
                <select
                  value={articleForm.status}
                  onChange={(e) => setArticleForm({...articleForm, status: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                  disabled={loading}
                >
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликовать</option>
                  <option value="scheduled">Запланировать</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Meta Description (SEO)
              </label>
              <textarea
                value={articleForm.metaDescription}
                onChange={(e) => setArticleForm({...articleForm, metaDescription: e.target.value})}
                rows={2}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                placeholder="SEO описание для поисковых систем..."
                disabled={loading}
              />
            </div>

            <div className="mt-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={articleForm.featured}
                  onChange={(e) => setArticleForm({...articleForm, featured: e.target.checked})}
                  className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  disabled={loading}
                />
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-semibold text-gray-700">Рекомендуемая статья</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-8 rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              <Save className="h-5 w-5" />
              <span className="font-semibold">
                {loading 
                  ? 'Сохранение...' 
                  : editingArticle 
                    ? 'Обновить статью' 
                    : 'Сохранить статью'
                }
              </span>
            </button>
            <button
              type="button"
              onClick={() => { setShowAddArticle(false); resetArticleForm(); }}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              disabled={loading}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Blog;