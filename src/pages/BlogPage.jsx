import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, Eye, Search, Filter, ChevronLeft, ChevronRight, Tag, Star, Share2, ArrowRight, Sparkles, TrendingUp, FileText } from 'lucide-react';
import { apiService } from '../services/api';
import BookingModal from '../components/BookingModal';

const BlogPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Состояния
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Пагинация и фильтры
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    has_next: false,
    has_prev: false
  });
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page')) || 1
  });
  
  const [showFilters, setShowFilters] = useState(false);

  // Определяем режим отображения
  const isPostView = !!slug;
  const isListView = !slug;

  // Загрузка данных при монтировании
  useEffect(() => {
    if (isPostView) {
      loadBlogPost(slug);
    } else {
      loadBlogPosts();
      loadCategories();
      loadFeaturedPosts();
    }
  }, [slug, filters]);

  // Обновление URL при изменении фильтров
  useEffect(() => {
    if (isListView) {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      if (filters.page > 1) params.set('page', filters.page.toString());
      
      setSearchParams(params);
    }
  }, [filters, isListView, setSearchParams]);

  // Функция копирования ссылки
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setLinkCopied(true);
      
      // Сброс состояния через 2 секунды
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Ошибка копирования ссылки:', err);
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    }
  };

  // Функции для работы с модалом бронирования
const openBookingModal = () => {
  setShowBookingModal(true);
};

const closeBookingModal = () => {
  setShowBookingModal(false);
};

  // Функции загрузки данных (остаются без изменений)
  const loadBlogPost = async (postSlug) => {
    setLoading(true);
    try {
      const result = await apiService.getBlogPostBySlug(postSlug);
      if (result.success) {
        setCurrentPost(result.post);
        setRelatedPosts(result.related_posts || []);
        setError(null);
      } else {
        setError('Статья не найдена');
      }
    } catch (err) {
      setError('Ошибка загрузки статьи');
      console.error('Error loading blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    setLoading(true);
    try {
      const params = {
        page: filters.page,
        per_page: 12,
        category: filters.category,
        search: filters.search
      };
      
      const result = await apiService.getBlogPosts(params);
      if (result.success) {
        setPosts(result.posts || []);
        setPagination(result.pagination || {});
        setError(null);
      } else {
        setError('Ошибка загрузки статей');
      }
    } catch (err) {
      setError('Ошибка загрузки статей');
      console.error('Error loading blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await apiService.getBlogCategories();
      if (result.success) {
        setCategories(result.categories || []);
      }
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadFeaturedPosts = async () => {
    try {
      const result = await apiService.getFeaturedBlogPosts(4);
      if (result.success) {
        setFeaturedPosts(result.posts || []);
      }
    } catch (err) {
      console.error('Error loading featured posts:', err);
    }
  };

  // Обработчики событий
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get('search');
    
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      page: 1
    }));
  };

  const handleCategoryFilter = (category) => {
    setFilters(prev => ({
      ...prev,
      category: category === filters.category ? '' : category,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Утилиты
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateExcerpt = (content, maxLength = 150) => {
    if (!content) return '';
    const text = content.replace(/<[^>]*>/g, ''); // Убираем HTML теги
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Компонент загрузки
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0"></div>
      </div>
    </div>
  );

  // Компонент отдельной статьи
  const BlogPostView = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error || !currentPost) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-12">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
                <p className="text-gray-600 mb-8">{error || 'Запрашиваемая статья не существует или была удалена.'}</p>
                <Link 
                  to="/blog" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Вернуться к блогу
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <Helmet>
          <title>{currentPost.meta_title || currentPost.title} - Королевство Чудес</title>
          <meta name="description" content={currentPost.meta_description || currentPost.excerpt} />
          <meta property="og:title" content={currentPost.title} />
          <meta property="og:description" content={currentPost.excerpt} />
          {currentPost.featured_image && (
            <meta property="og:image" content={currentPost.featured_image} />
          )}
          <meta property="og:type" content="article" />
        </Helmet>

        <div className="container mx-auto px-4 py-8">
          <article className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
              <Link to="/" className="hover:text-purple-600 transition-colors">Главная</Link>
              <span>•</span>
              <Link to="/blog" className="hover:text-purple-600 transition-colors">Блог</Link>
              <span>•</span>
              <span className="text-gray-900 font-medium">{currentPost.title}</span>
            </nav>

            {/* Главная карточка статьи */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
              {/* Главное изображение */}
              {currentPost.featured_image && (
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img
                    src={currentPost.featured_image}
                    alt={currentPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              )}

              {/* Заголовок статьи */}
              <header className="p-8 md:p-12">
                <div className="flex items-center flex-wrap gap-4 text-sm mb-6">
                  <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-medium">
                    {currentPost.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(currentPost.published_at || currentPost.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{currentPost.author_name}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Eye className="h-4 w-4" />
                    <span>{currentPost.views_count || 0} просмотров</span>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {currentPost.title}
                </h1>
                
                {currentPost.excerpt && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {currentPost.excerpt}
                  </p>
                )}
              </header>

              {/* Содержимое статьи */}
              <div className="px-8 md:px-12 pb-12">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />

                {/* Теги */}
                {currentPost.tags && currentPost.tags.length > 0 && (
                  <div className="flex items-center flex-wrap gap-3 mt-12 pt-8 border-t border-gray-100">
                    <Tag className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">Теги:</span>
                    {currentPost.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 rounded-full text-sm font-medium hover:from-purple-200 hover:to-indigo-200 cursor-pointer transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-gray-100">
                  <Link 
                    to="/blog"
                    className="inline-flex items-center px-6 py-3 border-2 border-purple-200 text-purple-700 rounded-2xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 font-medium"
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Все статьи
                  </Link>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600">Поделиться:</span>
                    <button
                      onClick={handleCopyLink}
                      className={`inline-flex items-center px-4 py-3 rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        linkCopied 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                          : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600'
                      }`}
                    >
                      {linkCopied ? (
                        <>
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Ссылка скопирована!
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Скопировать ссылку
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Похожие статьи */}
            {relatedPosts.length > 0 && (
              <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <Sparkles className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Похожие статьи</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(post => (
                    <Link 
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group block bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {post.featured_image && (
                        <div className="relative overflow-hidden">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mb-3 font-medium">
                          {post.category}
                        </span>
                        <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3 leading-tight">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.published_at || post.date)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    );
  };

  // Компонент списка статей
  const BlogListView = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <Helmet>
          <title>Блог - Королевство Чудес</title>
          <meta name="description" content="Полезные советы, кейсы и тренды в организации праздников от экспертов Королевства Чудес" />
        </Helmet>

        {/* Hero секция */}
        <div className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-white bg-opacity-10"></div>
            <div className="absolute bottom-0 left-0 -mb-32 -ml-32 w-64 h-64 rounded-full bg-white bg-opacity-5"></div>
            <div className="absolute top-1/2 left-1/2 -mt-16 -ml-16 w-32 h-32 rounded-full bg-white bg-opacity-10"></div>
          </div>
          
          <div className="relative container mx-auto px-4 py-20 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 mr-3 text-yellow-300" />
                <span className="text-lg font-medium text-purple-100">Экспертный блог</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Секреты идеальных <span className="text-yellow-300">праздников</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-100 mb-10 leading-relaxed">
                Полезные советы, вдохновляющие кейсы и актуальные тренды от экспертов Королевства Чудес
              </p>
              
              {/* Поиск */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Найти статью по теме..."
                    defaultValue={filters.search}
                    className="w-full pl-16 pr-32 py-5 text-lg border-0 rounded-2xl shadow-2xl focus:ring-4 focus:ring-white focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg"
                  >
                    Найти
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Избранные статьи */}
          {featuredPosts.length > 0 && !filters.search && !filters.category && filters.page === 1 && (
            <section className="mb-16">
              <div className="flex items-center mb-8">
                <Star className="h-6 w-6 text-yellow-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Рекомендуемые статьи</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPosts.map(post => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative">
                      {post.featured_image && (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs rounded-full font-bold shadow-lg">
                          <Star className="h-3 w-3 mr-1" />
                          ТОП
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mb-3 font-medium">
                        {post.category}
                      </span>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {generateExcerpt(post.excerpt || post.content)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.published_at || post.date)}
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Фильтры и статистика */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 rounded-2xl hover:from-purple-200 hover:to-indigo-200 transition-all duration-300 font-medium"
                >
                  <Filter className="h-5 w-5" />
                  <span>Фильтры</span>
                </button>
                
                {(filters.category || filters.search) && (
                  <button
                    onClick={() => setFilters({ category: '', search: '', page: 1 })}
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Сбросить все
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">
                  {loading ? 'Загрузка...' : `Найдено статей: ${pagination.total || 0}`}
                </span>
              </div>
            </div>

            {/* Категории */}
            {showFilters && categories.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-purple-600" />
                  Категории
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map(category => (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryFilter(category.name)}
                      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                        filters.category === category.name
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-800'
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Список статей */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ошибка загрузки</h2>
                <p className="text-gray-600 mb-8">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Попробовать снова
                </button>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Статьи не найдены</h2>
                <p className="text-gray-600">
                  {filters.search || filters.category
                    ? 'Попробуйте изменить критерии поиска'
                    : 'В блоге пока нет опубликованных статей'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Изображение и бейджи */}
                  <div className="relative">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-purple-400" />
                      </div>
                    )}
                    
                    {/* Градиентный overlay для лучшей читаемости бейджей */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
                    
                    {/* Бейджи */}
                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                      {/* Категория */}
                      <span className="inline-block px-3 py-1.5 bg-white/90 backdrop-blur-sm text-purple-800 text-xs font-semibold rounded-full shadow-lg border border-white/50">
                        {post.category}
                      </span>
                      
                      {/* ТОП бейдж (если статья рекомендуемая) */}
                      {post.featured && (
                        <span className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                          <Star className="h-3 w-3 mr-1" />
                          ТОП
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Контент карточки */}
                  <div className="p-6">
                    {/* Заголовок */}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3 leading-tight line-clamp-2 min-h-[3.5rem]">
                      {post.title}
                    </h3>
                    
                    {/* Описание */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 min-h-[4rem]">
                      {generateExcerpt(post.excerpt || post.content)}
                    </p>
                    
                    {/* Метаинформация */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(post.published_at || post.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{post.views_count || 0}</span>
                        </div>
                      </div>
                      
                      {/* Автор */}
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        <span className="truncate max-w-[80px]">{post.author_name}</span>
                      </div>
                    </div>
                    
                    {/* Разделитель и кнопка */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-purple-600">Читать далее</span>
                        <ArrowRight className="h-4 w-4 text-purple-600 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Пагинация */}
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-16">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.has_prev}
                    className="p-3 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(pagination.pages, 7) }, (_, i) => {
                      let page;
                      if (pagination.pages <= 7) {
                        page = i + 1;
                      } else if (pagination.page <= 4) {
                        page = i + 1;
                      } else if (pagination.page >= pagination.pages - 3) {
                        page = pagination.pages - 6 + i;
                      } else {
                        page = pagination.page - 3 + i;
                      }
                      
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            page === pagination.page
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-110'
                              : 'border-2 border-gray-200 hover:bg-purple-50 hover:border-purple-300'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.has_next}
                    className="p-3 rounded-xl border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 hover:border-purple-300 transition-all duration-300"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CTA секция с обновленными кнопками */}
      <div className="mt-20">
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative p-12 text-center text-white">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-white bg-opacity-10"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 rounded-full bg-white bg-opacity-5"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 mr-3 text-yellow-300" />
                <span className="text-lg font-medium text-purple-100">Готовы к празднику?</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Воплотим ваши мечты о <span className="text-yellow-300">идеальном празднике</span>
              </h2>
              
              <p className="text-xl text-purple-100 mb-8">
                Более 1000 счастливых клиентов доверили нам свои самые важные моменты
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Заменяем Link на button с функцией открытия модального окна */}
                <button
                  onClick={openBookingModal}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-2xl hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-bold"
                >
                  <Star className="h-5 w-5 mr-2" />
                  Заказать праздник
                </button>
                
                {/* Эта кнопка остается как Link, если нужно перейти на страницу портфолио */}
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white hover:text-purple-700 transition-all duration-300 font-medium"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Посмотреть работы
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isPostView ? <BlogPostView /> : <BlogListView />}
      
      {/* Модальное окно бронирования - ТОЛЬКО ЗДЕСЬ */}
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={closeBookingModal} 
      />
    </div>
  );
};

export default BlogPage;