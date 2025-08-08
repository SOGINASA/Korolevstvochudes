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

export const blogCategories = [
  'советы',
  'кейсы',
  'тренды',
  'сезонное'
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

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Удаляем специальные символы
    .replace(/[\s_-]+/g, '-') // Заменяем пробелы и подчеркивания на дефисы
    .replace(/^-+|-+$/g, ''); // Удаляем дефисы в начале и конце
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