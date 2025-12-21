// components/admin/Animators.js
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, Edit, Trash2, Star, Sparkles, Upload, X, Save, Camera, Eye, Users, Zap } from 'lucide-react';
import { apiService } from '../../services/api';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const Animators = ({ showNotification }) => {
  const [showAddAnimator, setShowAddAnimator] = useState(false);
  const [editingAnimator, setEditingAnimator] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [animators, setAnimators] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    popular: 0
  });

  const imageInputRef = useRef(null);

  const [animatorForm, setAnimatorForm] = useState({
    name: '',
    title: '',
    description: '',
    age: '',
    price: '',
    duration: '',
    category: 'superheroes',
    image: '',
    link: '',
    popular: false,
    program_includes: '',
    suitable_for: '',
    advantages: '',
    related_characters: ''
  });

  const categories = [
    { id: 'superheroes', name: 'Супергерои' },
    { id: 'princesses', name: 'Принцессы' },
    { id: 'cartoons', name: 'Мультфильмы' },
    { id: 'fantasy', name: 'Фэнтези' },
    { id: 'animals', name: 'Животные' },
    { id: 'other', name: 'Другое' }
  ];

  useEffect(() => {
    loadAnimators();
    loadStats();
  }, []);

  const loadAnimators = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/animators`);
      const data = await response.json();
      
      if (data.success) {
        setAnimators(data.animators || []);
      } else {
        showNotification('Ошибка загрузки аниматоров', 'error');
      }
    } catch (error) {
      console.error('Ошибка загрузки аниматоров:', error);
      showNotification('Ошибка загрузки аниматоров', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/animators/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats || { total: 0, active: 0, popular: 0 });
      }
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error);
    }
  };

  const uploadImageToServer = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`${API_BASE_URL}/upload/image`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('Ошибка загрузки изображения');
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error);
      throw error;
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Пожалуйста, выберите файл изображения', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showNotification('Размер файла не должен превышать 10MB', 'error');
      return;
    }

    try {
      setUploadingImage(true);
      
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      
      const imageUrl = await uploadImageToServer(file);
      
      setAnimatorForm({
        ...animatorForm,
        image: imageUrl
      });
      
      showNotification('Изображение загружено успешно', 'success');
    } catch (error) {
      showNotification('Ошибка при загрузке изображения', 'error');
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const url = editingAnimator 
        ? `${API_BASE_URL}/animators/${editingAnimator.id}`
        : `${API_BASE_URL}/animators`;
      
      const method = editingAnimator ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(animatorForm)
      });

      const data = await response.json();

      if (data.success) {
        showNotification(
          editingAnimator ? 'Аниматор успешно обновлен' : 'Аниматор успешно добавлен',
          'success'
        );
        setShowAddAnimator(false);
        resetAnimatorForm();
        loadAnimators();
        loadStats();
      } else {
        showNotification(data.error || 'Ошибка сохранения', 'error');
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      showNotification('Ошибка сохранения аниматора', 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого аниматора?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/animators/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        showNotification('Аниматор удален', 'success');
        loadAnimators();
        loadStats();
      } else {
        showNotification('Ошибка удаления', 'error');
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
      showNotification('Ошибка удаления аниматора', 'error');
    }
  };

  const handleEdit = (animator) => {
    setEditingAnimator(animator);
    setAnimatorForm({
      name: animator.name || '',
      title: animator.title || '',
      description: animator.description || '',
      age: animator.age || '',
      price: animator.price || '',
      duration: animator.duration || '',
      category: animator.category || 'superheroes',
      image: animator.image || '',
      link: animator.link || '',
      popular: animator.popular || false,
      program_includes: animator.program_includes || '',
      suitable_for: animator.suitable_for || '',
      advantages: animator.advantages || '',
      related_characters: animator.related_characters || ''
    });
    setImagePreview(animator.image || null);
    setShowAddAnimator(true);
  };

  const resetAnimatorForm = () => {
    setAnimatorForm({
      name: '',
      title: '',
      description: '',
      age: '',
      price: '',
      duration: '',
      category: 'superheroes',
      image: '',
      link: '',
      popular: false,
      program_includes: '',
      suitable_for: '',
      advantages: '',
      related_characters: ''
    });
    setEditingAnimator(null);
    setImagePreview(null);
  };

  const filteredAnimators = animators.filter(animator =>
    animator.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    animator.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего аниматоров</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Активных</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Популярных</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.popular}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Заголовок и поиск */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Управление аниматорами</h2>
          <button
            onClick={() => {
              resetAnimatorForm();
              setShowAddAnimator(true);
            }}
            className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Добавить аниматора</span>
          </button>
        </div>

        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Поиск по имени или категории..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Список аниматоров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAnimators.map((animator) => (
          <div key={animator.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Изображение */}
            <div className="relative h-48 bg-gradient-to-br from-purple-200 to-pink-200">
              {animator.popular && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold z-10">
                  ПОПУЛЯРНЫЙ
                </div>
              )}
              
              {animator.image ? (
                <img
                  src={animator.image}
                  alt={animator.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-purple-400 opacity-50" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white text-lg font-bold">{animator.name}</h3>
                <p className="text-white/80 text-sm">{getCategoryName(animator.category)}</p>
              </div>
            </div>

            {/* Контент */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{animator.description}</p>

              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-gray-500">{animator.age}</span>
                <span className="text-purple-600 font-bold">от {animator.price} ₸</span>
              </div>

              {/* Действия */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(animator)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Изменить</span>
                </button>
                <button
                  onClick={() => handleDelete(animator.id)}
                  className="flex items-center justify-center bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnimators.length === 0 && (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
          <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Аниматоры не найдены</h3>
          <p className="text-gray-600">Попробуйте изменить критерии поиска или добавьте нового аниматора</p>
        </div>
      )}

      {/* Модальное окно добавления/редактирования */}
      {showAddAnimator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingAnimator ? 'Редактировать аниматора' : 'Добавить аниматора'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddAnimator(false);
                    resetAnimatorForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={submitLoading}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Основная информация */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя персонажа *
                  </label>
                  <input
                    type="text"
                    required
                    value={animatorForm.name}
                    onChange={(e) => setAnimatorForm({...animatorForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Человек-паук"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Заголовок (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={animatorForm.title}
                    onChange={(e) => setAnimatorForm({...animatorForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Аниматор Человек-паук на детский праздник"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория *
                  </label>
                  <select
                    required
                    value={animatorForm.category}
                    onChange={(e) => setAnimatorForm({...animatorForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={submitLoading}
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Возраст детей *
                  </label>
                  <input
                    type="text"
                    required
                    value={animatorForm.age}
                    onChange={(e) => setAnimatorForm({...animatorForm, age: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="4-10 лет"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (₸) *
                  </label>
                  <input
                    type="text"
                    required
                    value={animatorForm.price}
                    onChange={(e) => setAnimatorForm({...animatorForm, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="15 000"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Длительность *
                  </label>
                  <input
                    type="text"
                    required
                    value={animatorForm.duration}
                    onChange={(e) => setAnimatorForm({...animatorForm, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="1-2 часа"
                    disabled={submitLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ссылка (URL slug) *
                  </label>
                  <input
                    type="text"
                    required
                    value={animatorForm.link}
                    onChange={(e) => setAnimatorForm({...animatorForm, link: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="/spajder-men-animator"
                    disabled={submitLoading}
                  />
                </div>
              </div>

              {/* Изображение */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображение персонажа
                </label>
                
                {imagePreview && (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage || submitLoading}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                      <span className="text-sm text-gray-600">Загружаем изображение...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="h-6 w-6 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {imagePreview ? 'Изменить изображение' : 'Выберите изображение'}
                      </span>
                    </>
                  )}
                </button>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={submitLoading}
                />

                <p className="text-xs text-gray-500 mt-2">
                  Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 10MB
                </p>
              </div>

              {/* Описание */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание персонажа *
                </label>
                <textarea
                  required
                  value={animatorForm.description}
                  onChange={(e) => setAnimatorForm({...animatorForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Аниматор Человек-паук от агентства «Королевство Чудес» — один из самых популярных персонажей..."
                  disabled={submitLoading}
                />
              </div>

              {/* Дополнительные поля */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Что входит в программу (через запятую)
                </label>
                <textarea
                  value={animatorForm.program_includes}
                  onChange={(e) => setAnimatorForm({...animatorForm, program_includes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Сюжетные игры, Активные конкурсы, Музыкальное сопровождение, Фотосессия"
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Куда подойдёт (через запятую)
                </label>
                <input
                  type="text"
                  value={animatorForm.suitable_for}
                  onChange={(e) => setAnimatorForm({...animatorForm, suitable_for: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="День рождения, Дом, Кафе, Детский сад"
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Преимущества (через запятую)
                </label>
                <textarea
                  value={animatorForm.advantages}
                  onChange={(e) => setAnimatorForm({...animatorForm, advantages: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Профессиональный костюм, Опытный аниматор, Программа адаптируется"
                  disabled={submitLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Похожие персонажи (через запятую)
                </label>
                <input
                  type="text"
                  value={animatorForm.related_characters}
                  onChange={(e) => setAnimatorForm({...animatorForm, related_characters: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Бэтмен, Железный человек, Супермен"
                  disabled={submitLoading}
                />
              </div>

              {/* Популярный */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={animatorForm.popular}
                  onChange={(e) => setAnimatorForm({...animatorForm, popular: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  disabled={submitLoading}
                />
                <label htmlFor="popular" className="text-sm text-gray-700">
                  Популярный персонаж
                </label>
              </div>

              {/* Кнопки */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={submitLoading || uploadingImage}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {submitLoading || uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{uploadingImage ? 'Загружаем изображение...' : 'Сохранение...'}</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{editingAnimator ? 'Обновить аниматора' : 'Сохранить аниматора'}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAnimator(false);
                    resetAnimatorForm();
                  }}
                  disabled={submitLoading || uploadingImage}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
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

export default Animators;