// components/admin/Portfolio.js
import React, { useState } from 'react';
import { Plus, Image, Eye, Edit, Trash2, Upload, Save, X } from 'lucide-react';
import { getStatusColor, getStatusText, categories } from '../../utils/helpers';

const Portfolio = ({ showNotification }) => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    date: '',
    description: '',
    budget: '',
    client: '',
    status: 'draft'
  });

  // Моковые данные портфолио
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: 'День рождения принцессы Алисы',
      category: 'Детские праздники',
      date: '2024-12-15',
      description: 'Волшебный день рождения в стиле принцесс Диснея',
      budget: '250,000 ₸',
      client: 'Семья Ивановых',
      status: 'published',
      photos: 45,
      views: 2341,
      created: '2024-12-16'
    },
    {
      id: 2,
      title: 'Свадьба Анны и Дмитрия',
      category: 'Свадьбы',
      date: '2024-11-20',
      description: 'Элегантная свадьба в классическом стиле',
      budget: '800,000 ₸',
      client: 'Анна Петрова',
      status: 'published',
      photos: 120,
      views: 5672,
      created: '2024-11-22'
    },
    {
      id: 3,
      title: 'Корпоратив IT-компании',
      category: 'Корпоративы',
      date: '2024-12-31',
      description: 'Новогодний корпоратив в современном стиле',
      budget: '450,000 ₸',
      client: 'ТechSoft LLC',
      status: 'draft',
      photos: 0,
      views: 0,
      created: '2025-01-05'
    }
  ]);

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      category: '',
      date: '',
      description: '',
      budget: '',
      client: '',
      status: 'draft'
    });
    setEditingProject(null);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    
    if (editingProject) {
      // Обновление существующего проекта
      setPortfolioItems(prev => 
        prev.map(item => 
          item.id === editingProject.id 
            ? { ...projectForm, id: editingProject.id, photos: item.photos, views: item.views, created: item.created }
            : item
        )
      );
      showNotification('Проект обновлен', 'success');
    } else {
      // Добавление нового проекта
      const newProject = {
        ...projectForm,
        id: Date.now(),
        photos: 0,
        views: 0,
        created: new Date().toISOString().split('T')[0]
      };
      setPortfolioItems(prev => [...prev, newProject]);
      showNotification('Проект добавлен', 'success');
    }
    
    setShowAddProject(false);
    resetProjectForm();
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm(project);
    setShowAddProject(true);
  };

  const handleDeleteProject = (projectId) => {
    setPortfolioItems(prev => prev.filter(item => item.id !== projectId));
    showNotification('Проект удален', 'success');
  };

  const handleStatusChange = (projectId, newStatus) => {
    setPortfolioItems(prev => 
      prev.map(item => 
        item.id === projectId ? { ...item, status: newStatus } : item
      )
    );
    showNotification('Статус проекта изменен', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Портфолио</h2>
        <button 
          onClick={() => setShowAddProject(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить проект</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <Image className="h-16 w-16 text-white opacity-50" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
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
              <p className="text-sm text-gray-600 mb-3">{item.category}</p>
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{item.date}</span>
                <div className="flex items-center space-x-4">
                  <span>{item.photos} фото</span>
                  <span className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{item.views}</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditProject(item)}
                  className="flex-1 bg-purple-100 text-purple-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-200"
                >
                  Редактировать
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeleteProject(item.id)}
                  className="bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal для добавления/редактирования проекта */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
                      <option key={cat} value={cat}>{cat}</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Загрузить фото
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Перетащите фото сюда или нажмите для выбора</p>
                  <p className="text-sm text-gray-500 mt-1">Поддерживаются JPG, PNG до 10MB</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
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