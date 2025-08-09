// utils/helpers.js - Вспомогательные функции

export const getStatusColor = (status) => {
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800';
    case 'confirmed': 
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    case 'approved': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'active': return 'bg-green-100 text-green-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'published': return 'bg-green-100 text-green-800';
    case 'scheduled': return 'bg-yellow-100 text-yellow-800';
    case 'expired': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case 'new': return 'Новая';
    case 'confirmed': return 'Подтверждена';
    case 'in-progress': return 'В работе';
    case 'completed': return 'Завершена';
    case 'cancelled': return 'Отменена';
    case 'approved': return 'Одобрен';
    case 'pending': return 'На модерации';
    case 'active': return 'Активно';
    case 'draft': return 'Черновик';
    case 'published': return 'Опубликовано';
    case 'scheduled': return 'Запланировано';
    case 'expired': return 'Завершено';
    default: return status;
  }
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const categories = [
  'Детские праздники',
  'Свадьбы',
  'Корпоративы',
  'Юбилеи и торжества',
  'Шоу-программы',
  'Квесты и игры'
];

export const serviceCategories = [
  { value: 'children', label: 'Детские' },
  { value: 'weddings', label: 'Свадьбы' },
  { value: 'corporate', label: 'Корпоративы' },
  { value: 'anniversaries', label: 'Юбилеи' },
  { value: 'seasonal', label: 'Праздники' },
  { value: 'quests', label: 'Квесты' },
  { value: 'photo', label: 'Фото/Видео' },
  { value: 'decoration', label: 'Декор' },
  { value: 'characters', label: 'Персонажи' },
  { value: 'shows', label: 'Шоу' },
  { value: 'balloons', label: 'Шары' },
  { value: 'animators', label: 'Аниматоры' }
];

export const promotionTypes = [
  { value: 'discount', label: 'Скидка' },
  { value: 'package', label: 'Пакетное предложение' },
  { value: 'seasonal', label: 'Сезонная акция' },
  { value: 'loyalty', label: 'Программа лояльности' }
];

export const adminRoles = [
  { value: 'admin', label: 'Администратор' },
  { value: 'manager', label: 'Менеджер' },
  { value: 'editor', label: 'Редактор' },
  { value: 'super_admin', label: 'Супер-администратор' }
];

export function formatPhoneNumber(input) {
  // Убираем всё, кроме цифр
  let digits = input.replace(/\D/g, '');

  // Если начинается с 8 — заменяем на 7
  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1);
  }

  // Если начинается без 7, но 11 цифр — считаем, что первая — код страны
  if (digits.length === 10) {
    digits = '7' + digits;
  }

  // Обрезаем до 11 цифр
  digits = digits.slice(0, 11);

  // Если длина меньше 11, возвращаем как есть
  if (digits.length !== 11) return input;

  // Форматируем
  return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
}

// Валидация форм
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[0-9\s\(\)\-]{10,}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

// Форматирование данных
export const formatPrice = (price) => {
  if (typeof price === 'number') {
    return new Intl.NumberFormat('ru-KZ', {
      style: 'currency',
      currency: 'KZT',
      minimumFractionDigits: 0
    }).format(price);
  }
  return price;
};


// Утилиты для работы с массивами
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
};

export const sortBy = (array, key, direction = 'asc') => {
  return [...array].sort((a, b) => {
    if (direction === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};

// Утилиты для фильтрации
export const filterByStatus = (items, status) => {
  if (status === 'all') return items;
  return items.filter(item => item.status === status);
};

export const filterByCategory = (items, category) => {
  if (category === 'all') return items;
  return items.filter(item => item.category === category);
};

export const searchItems = (items, query, searchFields = ['title', 'name']) => {
  if (!query) return items;
  
  const lowercaseQuery = query.toLowerCase();
  return items.filter(item => 
    searchFields.some(field => 
      item[field]?.toLowerCase().includes(lowercaseQuery)
    )
  );
};

// Добавить эти функции к существующим в utils/helpers.js

// Категории блога
export const blogCategories = [
  'советы',
  'кейсы', 
  'тренды',
  'сезонное',
  'новости',
  'обзоры'
];

// Генерация slug из заголовка
export const generateSlug = (title) => {
  if (!title) return '';
  
  // Транслитерация русских букв
  const translit = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };
  
  let slug = title.toLowerCase();
  
  // Заменяем русские буквы
  for (const [ru, en] of Object.entries(translit)) {
    slug = slug.replace(new RegExp(ru, 'g'), en);
  }
  
  // Убираем все кроме букв, цифр и пробелов
  slug = slug.replace(/[^a-zA-Z0-9\s-]/g, '');
  
  // Заменяем пробелы и множественные дефисы на один дефис
  slug = slug.replace(/[\s-]+/g, '-');
  
  // Убираем дефисы в начале и конце
  slug = slug.replace(/^-+|-+$/g, '');
  
  return slug;
};

// Форматирование даты для блога
export const formatBlogDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

// Форматирование даты и времени
export const formatBlogDateTime = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

// Генерация excerpt из контента
export const generateExcerpt = (content, maxLength = 150) => {
  if (!content) return '';
  
  // Убираем HTML теги
  const text = content.replace(/<[^>]*>/g, '');
  
  // Убираем лишние пробелы
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Обрезаем по словам
  const words = cleanText.split(' ');
  let excerpt = '';
  
  for (const word of words) {
    if ((excerpt + word).length > maxLength) {
      break;
    }
    excerpt += (excerpt ? ' ' : '') + word;
  }
  
  return excerpt + '...';
};

// Подсчет времени чтения
export const calculateReadingTime = (content) => {
  if (!content) return '1 мин';
  
  // Убираем HTML теги
  const text = content.replace(/<[^>]*>/g, '');
  
  // Считаем слова (примерно)
  const wordCount = text.split(/\s+/).length;
  
  // Средняя скорость чтения 200 слов в минуту
  const readingTime = Math.ceil(wordCount / 200);
  
  return `${readingTime} мин`;
};

// Валидация данных статьи на клиенте
export const validateBlogPost = (postData) => {
  const errors = [];
  
  if (!postData.title || postData.title.trim().length < 5) {
    errors.push('Заголовок должен содержать минимум 5 символов');
  }
  
  if (!postData.content || postData.content.trim().length < 50) {
    errors.push('Содержимое должно содержать минимум 50 символов');
  }
  
  if (!postData.category) {
    errors.push('Выберите категорию статьи');
  }
  
  if (postData.meta_title && postData.meta_title.length > 60) {
    errors.push('Meta Title не должен превышать 60 символов');
  }
  
  if (postData.meta_description && postData.meta_description.length > 160) {
    errors.push('Meta Description не должно превышать 160 символов');
  }
  
  if (postData.excerpt && postData.excerpt.length > 500) {
    errors.push('Краткое описание не должно превышать 500 символов');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Получение цвета статуса для блога
export const getBlogStatusColor = (status) => {
  const colors = {
    'published': 'bg-green-100 text-green-800',
    'draft': 'bg-gray-100 text-gray-800',
    'scheduled': 'bg-blue-100 text-blue-800',
    'archived': 'bg-yellow-100 text-yellow-800'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Получение текста статуса для блога
export const getBlogStatusText = (status) => {
  const texts = {
    'published': 'Опубликовано',
    'draft': 'Черновик',
    'scheduled': 'Запланировано',
    'archived': 'В архиве'
  };
  
  return texts[status] || 'Неизвестно';
};

// Фильтрация постов по поисковому запросу
export const filterBlogPosts = (posts, searchQuery) => {
  if (!searchQuery || !searchQuery.trim()) {
    return posts;
  }
  
  const query = searchQuery.toLowerCase().trim();
  
  return posts.filter(post => {
    return (
      post.title?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query) ||
      post.author_name?.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });
};

// Сортировка постов
export const sortBlogPosts = (posts, sortBy, sortOrder = 'desc') => {
  const sorted = [...posts].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'title':
        aValue = a.title || '';
        bValue = b.title || '';
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
          
      case 'views_count':
        aValue = a.views_count || 0;
        bValue = b.views_count || 0;
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        
      case 'created_at':
      case 'updated_at':
      case 'published_at':
        aValue = new Date(a[sortBy] || 0);
        bValue = new Date(b[sortBy] || 0);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        
      default:
        return 0;
    }
  });
  
  return sorted;
};

// Группировка постов по категориям
export const groupBlogPostsByCategory = (posts) => {
  return posts.reduce((groups, post) => {
    const category = post.category || 'Без категории';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(post);
    return groups;
  }, {});
};

// Получение статистики по постам
export const getBlogPostsStats = (posts) => {
  const total = posts.length;
  const published = posts.filter(p => p.status === 'published').length;
  const draft = posts.filter(p => p.status === 'draft').length;
  const featured = posts.filter(p => p.featured).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views_count || 0), 0);
  
  // Статистика по категориям
  const categories = groupBlogPostsByCategory(posts);
  const categoryStats = Object.entries(categories).map(([name, posts]) => ({
    name,
    count: posts.length,
    published: posts.filter(p => p.status === 'published').length
  }));
  
  return {
    total,
    published,
    draft,
    featured,
    totalViews,
    categories: categoryStats
  };
};

// Проверка, является ли пост новым (опубликован менее 7 дней назад)
export const isBlogPostNew = (publishedAt) => {
  if (!publishedAt) return false;
  
  try {
    const postDate = new Date(publishedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return postDate > weekAgo;
  } catch (error) {
    return false;
  }
};

// Получение похожих постов
export const getSimilarBlogPosts = (currentPost, allPosts, limit = 3) => {
  if (!currentPost || !allPosts || allPosts.length === 0) {
    return [];
  }
  
  // Фильтруем опубликованные посты, исключая текущий
  const candidates = allPosts.filter(post => 
    post.id !== currentPost.id && 
    post.status === 'published'
  );
  
  // Сначала ищем посты той же категории
  const sameCategory = candidates.filter(post => 
    post.category === currentPost.category
  );
  
  // Если постов в той же категории достаточно, возвращаем их
  if (sameCategory.length >= limit) {
    return sameCategory
      .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at))
      .slice(0, limit);
  }
  
  // Иначе добавляем посты из других категорий
  const otherCategory = candidates.filter(post => 
    post.category !== currentPost.category
  );
  
  const similarPosts = [
    ...sameCategory,
    ...otherCategory.slice(0, limit - sameCategory.length)
  ];
  
  return similarPosts
    .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at))
    .slice(0, limit);
};