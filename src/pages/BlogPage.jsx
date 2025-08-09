import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, Eye, Search, Filter, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { apiService } from '../services/api';

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

  // Функции загрузки данных
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

  // Компонент отдельной статьи
  const BlogPostView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    if (error || !currentPost) {
      return (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
          <p className="text-gray-600 mb-6">{error || 'Запрашиваемая статья не существует или была удалена.'}</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Вернуться к блогу
          </Link>
        </div>
      );
    }

    return (
      <>
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

        <article className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-purple-600">Главная</Link>
            <span>•</span>
            <Link to="/blog" className="hover:text-purple-600">Блог</Link>
            <span>•</span>
            <span className="text-gray-900">{currentPost.title}</span>
          </nav>

          {/* Заголовок статьи */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                {currentPost.category}
              </span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(currentPost.published_at || currentPost.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{currentPost.author_name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{currentPost.views_count || 0} просмотров</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentPost.title}
            </h1>
            
            {currentPost.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {currentPost.excerpt}
              </p>
            )}
          </header>

          {/* Главное изображение */}
          {currentPost.featured_image && (
            <div className="mb-8">
              <img
                src={currentPost.featured_image}
                alt={currentPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Содержимое статьи */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />

          {/* Теги */}
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-8 pb-8 border-b border-gray-200">
              <Tag className="h-4 w-4 text-gray-500" />
              {currentPost.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Навигация */}
          <div className="flex justify-between items-center mb-12">
            <Link 
              to="/blog"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Все статьи
            </Link>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Поделиться статьей</p>
              <div className="flex space-x-2 mt-2">
                <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">VK</button>
                <button className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500">TG</button>
                <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">WA</button>
              </div>
            </div>
          </div>

          {/* Похожие статьи */}
          {relatedPosts.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Похожие статьи</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                    )}
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mb-2">
                        {post.category}
                      </span>
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(post.published_at || post.date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </>
    );
  };

  // Компонент списка статей
  const BlogListView = () => {
    return (
      <>
        <Helmet>
          <title>Блог - Королевство Чудес</title>
          <meta name="description" content="Полезные советы, кейсы и тренды в организации праздников от экспертов Королевства Чудес" />
        </Helmet>

        <div className="space-y-8">
          {/* Заголовок и поиск */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Блог</h1>
            <p className="text-xl text-gray-600 mb-8">
              Полезные советы, кейсы и тренды в организации праздников
            </p>
            
            {/* Поиск */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="search"
                  placeholder="Поиск по статьям..."
                  defaultValue={filters.search}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Найти
                </button>
              </div>
            </form>
          </div>

          {/* Избранные статьи */}
          {featuredPosts.length > 0 && !filters.search && !filters.category && filters.page === 1 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Рекомендуемые статьи</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPosts.map(post => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                    )}
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full mb-2">
                        Рекомендуемая
                      </span>
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {generateExcerpt(post.excerpt || post.content)}
                      </p>
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

          {/* Фильтры */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Фильтры</span>
              </button>
              
              {(filters.category || filters.search) && (
                <button
                  onClick={() => setFilters({ category: '', search: '', page: 1 })}
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Сбросить все
                </button>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {loading ? 'Загрузка...' : `Найдено статей: ${pagination.total || 0}`}
            </div>
          </div>

          {/* Категории */}
          {showFilters && categories.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Категории</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryFilter(category.name)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      filters.category === category.name
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Список статей */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ошибка загрузки</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Попробовать снова
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Статьи не найдены</h2>
              <p className="text-gray-600">
                {filters.search || filters.category
                  ? 'Попробуйте изменить критерии поиска'
                  : 'В блоге пока нет опубликованных статей'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  {post.featured_image && (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Рекомендуемая
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {generateExcerpt(post.excerpt || post.content)}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.published_at || post.date)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views_count || 0}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author_name}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Пагинация */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.has_prev}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg ${
                      page === pagination.page
                        ? 'bg-purple-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.has_next}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="container-custom py-12">
      {isPostView ? <BlogPostView /> : <BlogListView />}
    </div>
  );
};

export default BlogPage;