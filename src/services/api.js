const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

class ApiService {

  setToken(token) {
    if (token) {
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }

  getToken() {
    return localStorage.getItem('admin_token');
  }

  async request(url, options = {}) {
    const token = this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };
    
    // Детальное логирование для отладки
    console.log(`=== API REQUEST ===`);
    console.log(`URL: ${API_BASE_URL}${url}`);
    console.log(`Method: ${config.method || 'GET'}`);
    console.log(`Token: ${token ? 'PRESENT' : 'MISSING'}`);
    console.log(`Headers:`, config.headers);
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      
      console.log(`Response Status: ${response.status}`);
      
      // Если токен истек или невалиден
      if (response.status === 401) {
        console.log('401 - Clearing token and redirecting to login');
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          error: `HTTP error! status: ${response.status}` 
        }));
        console.log('Error response:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Success response:', responseData);
      return responseData;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Исправлен URL для debug
  async test() {
    try {
      const response = await this.request('/auth/debug');
      console.log(response);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Методы аутентификации
  async login(email, password) {
    try {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response && response.access_token) {
        this.setToken(response.access_token);
        return { success: true, admin: response.admin };
      }
      
      return { success: false, error: 'Неверный ответ сервера' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async register(userData) {
    try {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      return { success: true, admin: response.admin };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCurrentAdmin() {
    try {
      const response = await this.request('/auth/me');
      return { success: true, admin: response.admin };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllAdmins() {
    try {
      const response = await this.request('/auth/admins');
      return { success: true, admins: response.admins };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateAdmin(adminId, userData) {
    try {
      const response = await this.request(`/auth/admins/${adminId}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
      return { success: true, admin: response.admin };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteAdmin(adminId) {
    try {
      await this.request(`/auth/admins/${adminId}`, {
        method: 'DELETE',
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Методы для бронирований
  async getBookings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/bookings/?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createBooking(bookingData) {
    try {
      const response = await this.request('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateBookingStatus(bookingId, status) {
    try {
      const response = await this.request(`/admin/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ============ МЕТОДЫ ДЛЯ ОТЗЫВОВ ============
  
  // Получить отзывы (публичный метод)
  async getReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/reviews/?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Создать новый отзыв (публичный метод)
  async createReview(reviewData) {
    try {
      // Очищаем данные перед отправкой
      const cleanData = {
        name: reviewData.name?.trim(),
        rating: parseInt(reviewData.rating),
        text: reviewData.text?.trim(),
        service_type: reviewData.serviceType?.trim() || null,
        service_id: reviewData.service_id || null,
        email: reviewData.email?.trim() || null
      };

      const response = await this.request('/reviews/send', {
        method: 'POST',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статистику отзывов
  async getReviewStats() {
    try {
      const response = await this.request('/reviews/stats');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить отзывы по услуге
  async getReviewsByService(serviceId) {
    try {
      const response = await this.request(`/reviews/by-service/${serviceId}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить избранные отзывы
  async getFeaturedReviews(limit = 6) {
    try {
      const response = await this.request(`/reviews/featured?limit=${limit}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Поиск отзывов
  async searchReviews(query, limit = 10) {
    try {
      const response = await this.request(`/reviews/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // АДМИНИСТРАТИВНЫЕ МЕТОДЫ ДЛЯ ОТЗЫВОВ

  // Получить отзывы на модерации (требует админские права)
  async getPendingReviews(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/reviews/pending?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Одобрить отзыв (требует админские права)
  async approveReview(reviewId) {
    try {
      const response = await this.request(`/reviews/moderate/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({ action: 'approve' }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Отклонить отзыв (требует админские права)
  async rejectReview(reviewId) {
    try {
      const response = await this.request(`/reviews/moderate/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({ action: 'reject' }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить конкретный отзыв
  async getReview(reviewId) {
    try {
      const response = await this.request(`/reviews/${reviewId}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ============ ДРУГИЕ МЕТОДЫ ============

  async getDashboardStats() {
    try {
      const response = await this.request('/admin/dashboard');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getServices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/services?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('admin_data');
    window.location.href = '/login';
  }
  async createAdminReview(reviewData) {
  try {
    const cleanData = {
      name: reviewData.name?.trim(),
      rating: parseInt(reviewData.rating),
      text: reviewData.text?.trim(),
      service_type: reviewData.service?.trim() || null,
      email: reviewData.email?.trim() || null,
      phone: reviewData.phone?.trim() || null,
      approved: true // Автоматически одобряем отзывы, созданные через админку
    };

    const response = await this.request('/admin/reviews', {
      method: 'POST',
      body: JSON.stringify(cleanData),
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Обновить отзыв
async updateReview(reviewId, reviewData) {
  try {
    const cleanData = {
      name: reviewData.name?.trim(),
      rating: parseInt(reviewData.rating),
      text: reviewData.text?.trim(),
      service_type: reviewData.service?.trim() || null,
      email: reviewData.email?.trim() || null,
      phone: reviewData.phone?.trim() || null
    };

    const response = await this.request(`/admin/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(cleanData),
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Удалить отзыв
async deleteReview(reviewId) {
  try {
    const response = await this.request(`/admin/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Получить все отзывы для админки (включая неодобренные)
async getAllReviewsAdmin(params = {}) {
  const queryString = new URLSearchParams({
    ...params,
    include_pending: true // Включаем неодобренные отзывы
  }).toString();
  
  try {
    const response = await this.request(`/admin/reviews?${queryString}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Массовые операции с отзывами
async bulkApproveReviews(reviewIds) {
  try {
    const response = await this.request('/admin/reviews/bulk-approve', {
      method: 'POST',
      body: JSON.stringify({ review_ids: reviewIds }),
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async bulkDeleteReviews(reviewIds) {
  try {
    const response = await this.request('/admin/reviews/bulk-delete', {
      method: 'POST',
      body: JSON.stringify({ review_ids: reviewIds }),
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Получить детальную статистику отзывов для админки
async getAdminReviewStats() {
  try {
    const response = await this.request('/admin/reviews/stats');
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Экспорт отзывов в CSV
async exportReviews(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/admin/reviews/export?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    return { success: true, blob };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Отметить отзыв как избранный/рекомендуемый
async toggleReviewFeatured(reviewId, featured = true) {
  try {
    const response = await this.request(`/admin/reviews/${reviewId}/featured`, {
      method: 'PUT',
      body: JSON.stringify({ featured }),
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Получить отзывы с расширенными фильтрами для админки
async getReviewsWithFilters(filters = {}) {
  const params = {
    page: filters.page || 1,
    per_page: filters.perPage || 20,
    status: filters.status, // 'approved', 'pending', 'all'
    rating: filters.rating,
    service_type: filters.serviceType,
    date_from: filters.dateFrom,
    date_to: filters.dateTo,
    search: filters.search,
    sort: filters.sort || 'created_at',
    order: filters.order || 'desc'
  };

  // Удаляем undefined значения
  Object.keys(params).forEach(key => 
    params[key] === undefined && delete params[key]
  );

  const queryString = new URLSearchParams(params).toString();
  
  try {
    const response = await this.request(`/admin/reviews/filtered?${queryString}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
}

export const apiService = new ApiService();