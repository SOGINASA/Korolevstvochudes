// components/admin/Blog.js
import React, { useState } from 'react';
import { Plus, Search, FileText, Globe, Clock, TrendingUp, Eye, Edit, Trash2, Save, X } from 'lucide-react';
import { getStatusColor, getStatusText, blogCategories, generateSlug } from '../../utils/helpers';

const Blog = ({ showNotification }) => {
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
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

  // Моковые данные блога
  const [blogArticles, setBlogArticles] = useState([
    {
      id: 1,
      title: 'Как выбрать аниматора для детского праздника',
      slug: 'kak-vybrat-animatora',
      category: 'советы',
      excerpt: 'Полное руководство по выбору профессионального аниматора для незабываемого детского праздника',
      content: 'Полная статья о выборе аниматора...',
      tags: 'аниматоры, дети, праздники, советы',
      status: 'published',
      featured: true,
      views: 2341,
      date: '2024-12-20',
      author: 'Анна Иванова'
    },
    {
      id: 2,
      title: 'Тренды свадебного декора 2025',
      slug: 'trendy-svadebnogo-dekora-2025',
      category: 'тренды',
      excerpt: 'Актуальные тенденции в свадебном декоре на предстоящий год',
      content: 'Подробная статья о трендах...',
      tags: 'свадьба, декор, тренды, 2025',
      status: 'published',
      featured: false,
      views: 1876,
      date: '2024-12-15',
      author: 'Мария Петрова'
    },
    {
      id: 3,
      title: 'Организация корпоратива: чек-лист',
      slug: 'organizaciya-korporativa-chek-list',
      category: 'кейсы',
      excerpt: 'Пошаговый план организации успешного корпоративного мероприятия',
      content: 'Черновик статьи о корпоративах...',
      tags: 'корпоратив, планирование, чек-лист',
      status: 'draft',
      featured: false,
      views: 0,
      date: '2025-01-05',
      author: 'Дмитрий Сидоров'
    }
  ]);

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

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    
    if (editingArticle) {
      // Обновление существующей статьи
      setBlogArticles(prev => 
        prev.map(article => 
          article.id === editingArticle.id 
            ? { 
                ...articleForm, 
                id: editingArticle.id, 
                views: article.views,
                author: article.author,
                date: article.date
              }
            : article
        )
      );
      showNotification('Статья обновлена', 'success');
    } else {
      // Добавление новой статьи
      const newArticle = {
        ...articleForm,
        id: Date.now(),
        views: 0,
        author: 'Администратор',
        date: new Date().toISOString().split('T')[0]
      };
      setBlogArticles(prev => [...prev, newArticle]);
      showNotification('Статья добавлена', 'success');
    }
    
    setShowAddArticle(false);
    resetArticleForm();
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setArticleForm(article);
    setShowAddArticle(true);
  };

  const handleDeleteArticle = (articleId) => {
    setBlogArticles(prev => prev.filter(article => article.id !== articleId));
    showNotification('Статья удалена', 'success');
  };

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Управление блогом</h2>
        <button 
          onClick={() => setShowAddArticle(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить статью</span>
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Всего статей</p>
              <p className="text-2xl font-bold text-gray-900">{blogArticles.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Опубликовано</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogArticles.filter(a => a.status === 'published').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Черновики</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogArticles.filter(a => a.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Просмотры</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogArticles.reduce((sum, article) => sum + article.views, 0)}
              </p>
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Все категории</option>
            {blogCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
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
              {filteredArticles.map(article => (
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
                    {article.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                      {getStatusText(article.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditArticle(article)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={articleForm.featured}
                  onChange={(e) => setArticleForm({...articleForm, featured: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Рекомендуемая статья
                </label>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingArticle ? 'Обновить статью' : 'Сохранить статью'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddArticle(false); resetArticleForm(); }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
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