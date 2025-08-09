// components/admin/Blog.js
import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Globe, Clock, TrendingUp, Eye, Edit, Trash2, Save, X } from 'lucide-react';
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
    console.log(loadBlogPosts);
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
      console.log(`Загрузка постов блога с параметрами: ${JSON.stringify(result)}`);
      if (result && result.success) {
        console.log(`Получены посты блога: ${JSON.stringify(result)}`);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Управление блогом</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddArticle(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            <span>Добавить статью</span>
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Всего статей</p>
              <p className="text-2xl font-bold text-gray-900">{blogStats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Опубликовано</p>
              <p className="text-2xl font-bold text-gray-900">{blogStats.published}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Черновики</p>
              <p className="text-2xl font-bold text-gray-900">{blogStats.draft}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Просмотры</p>
              <p className="text-2xl font-bold text-gray-900">{blogStats.total_views}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск статей..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              disabled={loading}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={loading}
          >
            <option value="all">Все категории</option>
            {blogCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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

      {/* Список статей */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Загрузка...</span>
          </div>
        )}
        
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статья
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Категория
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Просмотры
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogArticles?.pagination?.posts?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      Статьи не найдены
                    </td>
                  </tr>
                ) : (
                  blogArticles?.posts?.map(article => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <FileText className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{article.title}</div>
                            <div className="text-sm text-gray-500">{article.slug}</div>
                            {article.featured && (
                              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">
                                Рекомендуемая
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {article.date || article.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                          {getStatusText(article.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {article.views || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <a 
                            href={`../blog/${article.slug}`}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <button 
                            onClick={() => handleEditArticle(article)}
                            className="text-blue-600 hover:text-blue-900"
                            disabled={loading}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-red-600 hover:text-red-900"
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
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Показано {Math.min((pagination.currentPage - 1) * pagination.itemsPerPage + 1, pagination.totalItems)} - {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} из {pagination.totalItems} записей
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1 || loading}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Назад
              </button>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={loading}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    pagination.currentPage === index + 1
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages || loading}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Вперед
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal для добавления/редактирования статьи */}
      {showAddArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingArticle ? 'Редактировать статью' : 'Создать новую статью'}
              </h3>
              <button
                onClick={() => { setShowAddArticle(false); resetArticleForm(); }}
                className="text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleArticleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заголовок статьи *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: Как выбрать аниматора для детского праздника"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL (slug)
                  </label>
                  <input
                    type="text"
                    value={articleForm.slug}
                    onChange={(e) => setArticleForm({...articleForm, slug: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="kak-vybrat-animatora"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория *
                  </label>
                  <select
                    required
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value="">Выберите категорию</option>
                    {blogCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Теги
                  </label>
                  <input
                    type="text"
                    value={articleForm.tags}
                    onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="аниматор, детский праздник, советы"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Краткое описание
                </label>
                <textarea
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Краткое описание статьи для превью..."
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Содержание статьи *
                </label>
                <textarea
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Полный текст статьи..."
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title (SEO)
                  </label>
                  <input
                    type="text"
                    value={articleForm.metaTitle}
                    onChange={(e) => setArticleForm({...articleForm, metaTitle: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="SEO заголовок"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус публикации
                  </label>
                  <select
                    value={articleForm.status}
                    onChange={(e) => setArticleForm({...articleForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={loading}
                  >
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликовать</option>
                    <option value="scheduled">Запланировать</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description (SEO)
                </label>
                <textarea
                  value={articleForm.metaDescription}
                  onChange={(e) => setArticleForm({...articleForm, metaDescription: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="SEO описание для поисковых систем..."
                  disabled={loading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={articleForm.featured}
                  onChange={(e) => setArticleForm({...articleForm, featured: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  disabled={loading}
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Рекомендуемая статья
                </label>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <Save className="h-4 w-4" />
                  <span>
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
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;