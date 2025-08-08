// components/admin/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Image, Eye, Edit, Trash2, Upload, Save, X, TrendingUp, Calendar, MapPin, Users, Star } from 'lucide-react';

const Portfolio = ({ showNotification }) => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    date: '',
    description: '',
    budget: '',
    client: '',
    location: '',
    guests: '',
    rating: 5,
    status: 'draft',
    featured: false,
    tags: [],
    images: [],
    cover_image: '',
    packages: []
  });

  const categories = [
    { id: 'children', name: 'Детские праздники' },
    { id: 'wedding', name: 'Свадьбы' },
    { id: 'corporate', name: 'Корпоративы' },
    { id: 'anniversary', name: 'Юбилеи' },
    { id: 'show', name: 'Шоу-программы' }
  ];

  // Загрузка данных портфолио
  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus !== 'all') params.append('status', selectedStatus);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      
      const response = await fetch(`http://127.0.0.1:5000/api/portfolio/admin?${params}`);
      if (!response.ok) throw new Error('Ошибка загрузки данных');
      
      const data = await response.json();
      setPortfolioItems(data.portfolio || []);
    } catch (error) {
      console.error('Ошибка:', error);
      showNotification('Ошибка при загрузке портфолио', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Загрузка статистики
  const fetchStats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/portfolio/stats');
      if (!response.ok) throw new Error('Ошибка загрузки статистики');
      
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
    fetchStats();
  }, [selectedStatus, selectedCategory]);

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      category: '',
      date: '',
      description: '',
      budget: '',
      client: '',
      location: '',
      guests: '',
      rating: 5,
      status: 'draft',
      featured: false,
      tags: [],
      images: [],
      cover_image: '',
      packages: []
    });
    setEditingProject(null);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingProject 
        ? `http://127.0.0.1:5000/api/portfolio/admin/${editingProject.id}`
        : 'http://127.0.0.1:5000/api/portfolio/admin';
      
      const method = editingProject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectForm)
      });
      
      if (!response.ok) throw new Error('Ошибка сохранения проекта');
      
      const result = await response.json();
      
      if (editingProject) {
        showNotification('Проект обновлен', 'success');
      } else {
        showNotification('Проект создан', 'success');
      }
      
      setShowAddProject(false);
      resetProjectForm();
      fetchPortfolioData();
      fetchStats();
      
    } catch (error) {
      console.error('Ошибка:', error);
      showNotification('Ошибка при сохранении проекта', 'error');
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      ...project,
      tags: project.tags || [],
      images: project.images || [],
      packages: project.packages || []
    });
    setShowAddProject(true);
  };

  const handleDeleteProject = async (projectId) => {
    // if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/portfolio/admin/${projectId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Ошибка удаления проекта');
      
      showNotification('Проект удален', 'success');
      fetchPortfolioData();
      fetchStats();
    } catch (error) {
      console.error('Ошибка:', error);
      showNotification('Ошибка при удалении проекта', 'error');
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/portfolio/admin/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('Ошибка изменения статуса');
      
      showNotification('Статус проекта изменен', 'success');
      fetchPortfolioData();
      fetchStats();
    } catch (error) {
      console.error('Ошибка:', error);
      showNotification('Ошибка при изменении статуса', 'error');
    }
  };

  const handleToggleFeatured = async (projectId, currentFeatured) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/portfolio/admin/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !currentFeatured })
      });
      
      if (!response.ok) throw new Error('Ошибка изменения статуса избранного');
      
      showNotification(currentFeatured ? 'Убрано из избранного' : 'Добавлено в избранное', 'success');
      fetchPortfolioData();
    } catch (error) {
      console.error('Ошибка:', error);
      showNotification('Ошибка при изменении статуса избранного', 'error');
    }
  };

  const addTag = (tag) => {
    if (tag && !projectForm.tags.includes(tag)) {
      setProjectForm({
        ...projectForm,
        tags: [...projectForm.tags, tag]
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setProjectForm({
      ...projectForm,
      tags: projectForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addPackage = () => {
    setProjectForm({
      ...projectForm,
      packages: [...projectForm.packages, { name: '', price: '', features: [] }]
    });
  };

  const updatePackage = (index, field, value) => {
    const updatedPackages = [...projectForm.packages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setProjectForm({ ...projectForm, packages: updatedPackages });
  };

  const removePackage = (index) => {
    setProjectForm({
      ...projectForm,
      packages: projectForm.packages.filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'published': return 'Опубликовано';
      case 'draft': return 'Черновик';
      case 'archived': return 'Архив';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок и статистика */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Портфолио</h2>
          {stats && (
            <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
              <span>Всего: {stats.total}</span>
              <span>Опубликовано: {stats.published}</span>
              <span>Черновики: {stats.draft}</span>
              <span>Просмотров: {stats.total_views.toLocaleString()}</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setShowAddProject(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить проект</span>
        </button>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Все статусы</option>
            <option value="published">Опубликовано</option>
            <option value="draft">Черновик</option>
            <option value="archived">Архив</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Все категории</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Список проектов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              {item.coverImage ? (
                <img 
                  src={item.coverImage} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="h-16 w-16 text-white opacity-50" />
              )}
              
              {/* Бэйдж избранного */}
              {item.featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ⭐ ТОП
                  </span>
                </div>
              )}

              {/* Счетчик просмотров */}
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{item.views || 0}</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                  {item.title}
                </h3>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-purple-500 ${getStatusColor(item.status)}`}
                >
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликовано</option>
                  <option value="archived">Архив</option>
                </select>
              </div>

              {/* Информация о проекте */}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date ? new Date(item.date).toLocaleDateString('ru-RU') : 'Не указана'}</span>
                </div>
                
                {item.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{item.location}</span>
                  </div>
                )}

                {item.guests && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{item.guests}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium text-purple-600">{item.budget || 'Не указан'}</span>
                </div>
              </div>

              {/* Категория и фото */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {categories.find(c => c.id === item.category)?.name || item.category}
                </span>
                <span>{item.photos || 0} фото</span>
              </div>

              {/* Теги */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{item.tags.length - 3}</span>
                  )}
                </div>
              )}

              {/* Действия */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditProject(item)}
                  className="flex-1 bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                >
                  <Edit className="h-4 w-4 inline mr-1" />
                  Редактировать
                </button>
                
                <button 
                  onClick={() => handleToggleFeatured(item.id, item.featured)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    item.featured 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={item.featured ? 'Убрать из избранного' : 'Добавить в избранное'}
                >
                  <Star className={`h-4 w-4 ${item.featured ? 'fill-current' : ''}`} />
                </button>
                
                <button 
                  onClick={() => handleDeleteProject(item.id)}
                  className="bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  title="Удалить проект"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {portfolioItems.length === 0 && (
        <div className="text-center py-12">
          <Image className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Проекты не найдены</h3>
          <p className="text-gray-600">Попробуйте изменить фильтры или создайте новый проект</p>
        </div>
      )}

      {/* Modal для добавления/редактирования проекта */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProject ? 'Редактировать проект' : 'Добавить новый проект'}
              </h3>
              <button
                onClick={() => { setShowAddProject(false); resetProjectForm(); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: День рождения принцессы Алисы"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория *
                  </label>
                  <select
                    required
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата мероприятия *
                  </label>
                  <input
                    type="date"
                    required
                    value={projectForm.date}
                    onChange={(e) => setProjectForm({...projectForm, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Бюджет проекта
                  </label>
                  <input
                    type="text"
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: 300,000 ₸"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя клиента
                  </label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Имя клиента"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Место проведения
                  </label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: Ресторан 'Золотой дракон'"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество гостей
                  </label>
                  <input
                    type="text"
                    value={projectForm.guests}
                    onChange={(e) => setProjectForm({...projectForm, guests: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: 25 детей"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Рейтинг
                  </label>
                  <select
                    value={projectForm.rating}
                    onChange={(e) => setProjectForm({...projectForm, rating: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map(rating => (
                      <option key={rating} value={rating}>
                        {rating} звезд{rating === 1 ? 'а' : rating < 5 ? 'ы' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликовано</option>
                    <option value="archived">Архив</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL обложки
                  </label>
                  <input
                    type="url"
                    value={projectForm.cover_image}
                    onChange={(e) => setProjectForm({...projectForm, cover_image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание проекта
                </label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Расскажите о проекте: задачи, решения, особенности..."
                />
              </div>

              {/* Теги */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Теги
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {projectForm.tags.map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-purple-500 hover:text-purple-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Добавить тег и нажать Enter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag(e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
              </div>

              {/* Избранное */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Добавить в избранное (будет показан на главной странице)
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingProject ? 'Обновить проект' : 'Сохранить проект'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddProject(false); resetProjectForm(); }}
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

export default Portfolio;