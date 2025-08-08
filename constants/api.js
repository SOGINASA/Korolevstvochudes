export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',
  ADMINS: '/auth/admins',
  DEBUG: '/auth/debug',
  
  // Bookings
  BOOKINGS: '/bookings',
  ADMIN_BOOKINGS: '/admin/bookings',
  
  // Reviews - Публичные эндпоинты
  REVIEWS: '/reviews',
  REVIEWS_SEND: '/reviews/send',
  REVIEW_STATS: '/reviews/stats',
  REVIEWS_BY_SERVICE: '/reviews/by-service',
  FEATURED_REVIEWS: '/reviews/featured',
  SEARCH_REVIEWS: '/reviews/search',
  SINGLE_REVIEW: '/reviews',
  
  // Reviews - Административные эндпоинты
  PENDING_REVIEWS: '/reviews/pending',
  MODERATE_REVIEW: '/reviews/moderate',
  APPROVE_REVIEW: '/reviews/moderate',
  
  // Services
  SERVICES: '/services',
  SERVICE_CATEGORIES: '/services/categories',
  
  // Portfolio
  PORTFOLIO: '/portfolio',
  
  // Team
  TEAM: '/team',
  
  // Dashboard
  DASHBOARD: '/admin/dashboard',
  
  // Analytics
  ANALYTICS: '/analytics'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const REVIEW_ACTIONS = {
  APPROVE: 'approve',
  REJECT: 'reject'
};

export const REVIEW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const SERVICE_TYPES = {
  CHILDREN: 'Детские праздники',
  WEDDINGS: 'Свадьбы',
  CORPORATE: 'Корпоративы',
  ANNIVERSARIES: 'Юбилеи',
  OTHER: 'Другое'
};

export const RATING_SCALE = {
  MIN: 1,
  MAX: 5
};

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  PER_PAGE: 20,
  MAX_PER_PAGE: 100
};

export const VALIDATION_RULES = {
  REVIEW: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    TEXT_MIN_LENGTH: 10,
    TEXT_MAX_LENGTH: 2000,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  BOOKING: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15,
    MESSAGE_MAX_LENGTH: 1000
  }
};