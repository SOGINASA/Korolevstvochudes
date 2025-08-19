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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        // Добавляем дополнительные заголовки для CORS
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        ...options.headers,
      },
      // Важно для CORS
      credentials: 'include',
      mode: 'cors',
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
      const response = await this.request('/bookings/', {
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

    const response = await this.request('/reviews/admin/reviews', {
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

      const response = await this.request(`/reviews/admin/reviews/${reviewId}`, {
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
      const response = await this.request(`/reviews/admin/reviews/${reviewId}`, {
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
      const response = await this.request('/reviews/admin/reviews/bulk-approve', {
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
      const response = await this.request('/reviews/admin/reviews/bulk-delete', {
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
      const response = await this.request('/reviews/admin/reviews/stats');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Экспорт отзывов в CSV


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
      const response = await this.request(`/reviews/admin/reviews/filtered?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
    // Добавьте эти методы в ваш существующий ApiService класс

  // ============ МЕТОДЫ ДЛЯ УСЛУГ ============

  // Получить услуги для админки (включая неактивные)
  async getAdminServices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/services/admin?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Создать новую услугу
  async createService(serviceData) {
    try {
      // Очищаем данные перед отправкой
      const cleanData = {
        title: serviceData.title?.trim(),
        category: serviceData.category?.trim(),
        duration: serviceData.duration?.trim(),
        minGuests: serviceData.minGuests?.trim(),
        rating: parseFloat(serviceData.rating) || 5.0,
        price: serviceData.price?.trim(),
        priceDescription: serviceData.priceDescription?.trim(),
        description: serviceData.description?.trim(),
        features: serviceData.features || [],
        subcategories: serviceData.subcategories || [],
        coverImage: serviceData.coverImage?.trim(),
        images: serviceData.images || [],
        featured: Boolean(serviceData.featured),
        tags: serviceData.tags || [],
        status: serviceData.status || 'active'
      };

      // Обрабатываем строковые значения, разделенные запятыми
      if (typeof cleanData.features === 'string') {
        cleanData.features = cleanData.features.split(',').map(f => f.trim()).filter(f => f);
      }
      if (typeof cleanData.subcategories === 'string') {
        cleanData.subcategories = cleanData.subcategories.split(',').map(s => s.trim()).filter(s => s);
      }
      if (typeof cleanData.tags === 'string') {
        cleanData.tags = cleanData.tags.split(',').map(t => t.trim()).filter(t => t);
      }
      if (typeof cleanData.images === 'string') {
        cleanData.images = cleanData.images.split(',').map(i => i.trim()).filter(i => i);
      }

      const response = await this.request('/services/admin', {
        method: 'POST',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Обновить услугу
  async updateService(serviceId, serviceData) {
    try {
      // Очищаем данные перед отправкой
      const cleanData = {
        title: serviceData.title?.trim(),
        category: serviceData.category?.trim(),
        duration: serviceData.duration?.trim(),
        minGuests: serviceData.minGuests?.trim(),
        rating: parseFloat(serviceData.rating) || 5.0,
        price: serviceData.price?.trim(),
        priceDescription: serviceData.priceDescription?.trim(),
        description: serviceData.description?.trim(),
        features: serviceData.features || [],
        subcategories: serviceData.subcategories || [],
        coverImage: serviceData.coverImage?.trim(),
        images: serviceData.images || [],
        featured: Boolean(serviceData.featured),
        tags: serviceData.tags || [],
        status: serviceData.status || 'active'
      };

      // Обрабатываем строковые значения, разделенные запятыми
      if (typeof cleanData.features === 'string') {
        cleanData.features = cleanData.features.split(',').map(f => f.trim()).filter(f => f);
      }
      if (typeof cleanData.subcategories === 'string') {
        cleanData.subcategories = cleanData.subcategories.split(',').map(s => s.trim()).filter(s => s);
      }
      if (typeof cleanData.tags === 'string') {
        cleanData.tags = cleanData.tags.split(',').map(t => t.trim()).filter(t => t);
      }
      if (typeof cleanData.images === 'string') {
        cleanData.images = cleanData.images.split(',').map(i => i.trim()).filter(i => i);
      }

      const response = await this.request(`/services/admin/${serviceId}`, {
        method: 'PUT',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Удалить услугу
  async deleteService(serviceId) {
    try {
      const response = await this.request(`/services/admin/${serviceId}`, {
        method: 'DELETE',
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статистику услуг
  async getServicesStats() {
    try {
      const response = await this.request('/services/admin/stats');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Массовое обновление услуг
  async bulkUpdateServices(serviceIds, updateData) {
    try {
      const response = await this.request('/services/admin/bulk-update', {
        method: 'POST',
        body: JSON.stringify({
          service_ids: serviceIds,
          update_data: updateData
        }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Массовое удаление услуг
  async bulkDeleteServices(serviceIds) {
    try {
      const response = await this.request('/services/admin/bulk-delete', {
        method: 'POST',
        body: JSON.stringify({
          service_ids: serviceIds
        }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить публичные услуги (существующий метод, но с улучшенной обработкой)
  async getServices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/services/?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить конкретную услугу
  async getService(serviceId) {
    try {
      const response = await this.request(`/services/${serviceId}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить категории услуг
  async getServiceCategories() {
    try {
      const response = await this.request('/services/categories');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить рекомендуемые услуги
  async getFeaturedServices(limit = 6) {
    try {
      const response = await this.request(`/services/featured?limit=${limit}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Поиск услуг
  async searchServices(query, filters = {}) {
    try {
      const params = new URLSearchParams({
        q: query,
        ...filters
      });
      
      const response = await this.request(`/services/search?${params}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  async getBookingsPaginated(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/bookings/?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить конкретную заявку по ID
  async getBooking(bookingId) {
    try {
      const response = await this.request(`/bookings/${bookingId}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Обновить заявку
  async updateBooking(bookingId, bookingData) {
    try {
      const response = await this.request(`/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify(bookingData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Удалить заявку
  async deleteBooking(bookingId) {
    try {
      const response = await this.request(`/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Проверить доступность даты
  async checkAvailability(date, serviceId = null) {
    try {
      const params = new URLSearchParams({ date });
      if (serviceId) {
        params.append('service_id', serviceId);
      }
      
      const response = await this.request(`/bookings/check-availability?${params}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статистику заявок
  async getBookingStats() {
    try {
      const response = await this.request('/bookings/stats');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Массовое удаление заявок
  async bulkDeleteBookings(bookingIds) {
    try {
      const response = await this.request('/bookings/bulk-delete', {
        method: 'POST',
        body: JSON.stringify({ booking_ids: bookingIds }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Экспорт заявок в CSV
  async exportBookings(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await this.request(`/bookings/export?${params}`, {
        headers: {
          'Accept': 'text/csv',
        }
      });
      
      // Если response - это текст CSV, создаем blob
      if (typeof response === 'string') {
        const blob = new Blob([response], { type: 'text/csv' });
        return { success: true, blob };
      }
      
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
    async getBlogPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/blog/?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статью по slug
  async getBlogPostBySlug(slug) {
    try {
      const response = await this.request(`/blog/${slug}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить категории блога
  async getBlogCategories() {
    try {
      const response = await this.request('/blog/categories');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить избранные статьи
  async getFeaturedBlogPosts(limit = 6) {
    try {
      const response = await this.request(`/blog/featured?limit=${limit}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить последние статьи
  async getLatestBlogPosts(limit = 5) {
    try {
      const response = await this.request(`/blog/latest?limit=${limit}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Поиск по статьям блога
  async searchBlogPosts(query, limit = 10) {
    try {
      const params = new URLSearchParams({ q: query, limit });
      const response = await this.request(`/blog/search?${params}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить публичную статистику блога
  async getBlogStats() {
    try {
      const response = await this.request('/blog/stats');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ============ АДМИНИСТРАТИВНЫЕ МЕТОДЫ ДЛЯ БЛОГА ============

  // Получить все статьи для админки
  async getAdminBlogPosts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/blog/admin?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Создать новую статью
  async createBlogPost(postData) {
    try {
      // Очищаем данные перед отправкой
      const cleanData = {
        title: postData.title?.trim(),
        slug: postData.slug?.trim(),
        category: postData.category?.trim(),
        content: postData.content?.trim(),
        excerpt: postData.excerpt?.trim(),
        tags: postData.tags || [],
        status: postData.status || 'draft',
        featured: Boolean(postData.featured),
        featured_image: postData.featured_image?.trim(),
        gallery: postData.gallery || [],
        author_name: postData.author_name?.trim(),
        meta_title: postData.meta_title?.trim(),
        meta_description: postData.meta_description?.trim(),
        scheduled_date: postData.scheduled_date
      };

      // Обрабатываем строковые значения, разделенные запятыми
      if (typeof cleanData.tags === 'string') {
        cleanData.tags = cleanData.tags.split(',').map(t => t.trim()).filter(t => t);
      }
      if (typeof cleanData.gallery === 'string') {
        cleanData.gallery = cleanData.gallery.split(',').map(g => g.trim()).filter(g => g);
      }

      const response = await this.request('/blog/admin', {
        method: 'POST',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статью для редактирования
  async getAdminBlogPost(postId) {
    try {
      const response = await this.request(`/blog/admin/${postId}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Обновить статью
  async updateBlogPost(postId, postData) {
    try {
      // Очищаем данные перед отправкой
      const cleanData = {
        title: postData.title?.trim(),
        slug: postData.slug?.trim(),
        category: postData.category?.trim(),
        content: postData.content?.trim(),
        excerpt: postData.excerpt?.trim(),
        tags: postData.tags || [],
        status: postData.status || 'draft',
        featured: Boolean(postData.featured),
        featured_image: postData.featured_image?.trim(),
        gallery: postData.gallery || [],
        author_name: postData.author_name?.trim(),
        meta_title: postData.meta_title?.trim(),
        meta_description: postData.meta_description?.trim(),
        scheduled_date: postData.scheduled_date
      };

      // Обрабатываем строковые значения, разделенные запятыми
      if (typeof cleanData.tags === 'string') {
        cleanData.tags = cleanData.tags.split(',').map(t => t.trim()).filter(t => t);
      }
      if (typeof cleanData.gallery === 'string') {
        cleanData.gallery = cleanData.gallery.split(',').map(g => g.trim()).filter(g => g);
      }

      const response = await this.request(`/blog/admin/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Удалить статью
  async deleteBlogPost(postId) {
    try {
      const response = await this.request(`/blog/admin/${postId}`, {
        method: 'DELETE',
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Массовое удаление статей
  async bulkDeleteBlogPosts(postIds) {
    try {
      const response = await this.request('/blog/admin/bulk-delete', {
        method: 'POST',
        body: JSON.stringify({ post_ids: postIds }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Массовое обновление статей
  async bulkUpdateBlogPosts(postIds, updateData) {
    try {
      const response = await this.request('/blog/admin/bulk-update', {
        method: 'POST',
        body: JSON.stringify({
          post_ids: postIds,
          update_data: updateData
        }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статистику блога для админки
  async getAdminBlogStats() {
    try {
      const response = await this.request('/blog/admin/stats');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Экспорт статей в CSV
  async exportBlogPosts(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await this.request(`/blog/admin/export?${params}`, {
        headers: {
          'Accept': 'text/csv',
        }
      });
      
      // Если response - это текст CSV, создаем blob
      if (typeof response === 'string') {
        const blob = new Blob([response], { type: 'text/csv' });
        return { success: true, blob };
      }
      
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статьи с расширенными фильтрами
  async getBlogPostsWithFilters(filters = {}) {
    const params = {
      page: filters.page || 1,
      per_page: filters.perPage || 20,
      status: filters.status,
      category: filters.category,
      author_id: filters.authorId,
      search: filters.search,
      sort_by: filters.sortBy || 'updated_at',
      sort_order: filters.sortOrder || 'desc'
    };
    

    // Удаляем undefined значения
    Object.keys(params).forEach(key => 
      params[key] === undefined && delete params[key]
    );

    const queryString = new URLSearchParams(params).toString();
    
    try {
      const response = await this.request(`/blog/admin?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
// Обновленные методы API для склада с поддержкой множественных категорий

async getWarehouseDashboard() {
  try {
    const response = await this.request('/warehouse/dashboard');
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getWarehouseCategories(parentId = null, includeChildren = true) {
  try {
    const params = new URLSearchParams();
    if (parentId !== null) {
      params.append('parent_id', parentId);
    }
    if (includeChildren) {
      params.append('include_children', 'true');
    }
    
    const queryString = params.toString();
    const response = await this.request(`/warehouse/categories${queryString ? `?${queryString}` : ''}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async createWarehouseCategory(categoryData) {
  try {
    const response = await this.request('/warehouse/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async searchWarehouseCategories(query, limit = 10) {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString()
    });
    const response = await this.request(`/warehouse/categories/search?${params}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getWarehouseItems(filters = {}) {
  try {
    // Поддержка множественных категорий
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category_ids' && Array.isArray(value)) {
        // Добавляем каждый category_id отдельно для поддержки массивов
        value.forEach(id => params.append('category_ids', id.toString()));
      } else if (key === 'category_path' && Array.isArray(value)) {
        // Поддержка пути категорий (для breadcrumbs)
        value.forEach(id => params.append('category_ids', id.toString()));
      } else if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/warehouse/items?${params}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async createWarehouseItem(itemData) {
  try {
    // Обработка множественных категорий
    const processedData = { ...itemData };
    
    // Если переданы selectedCategories (из модального окна)
    if (itemData.selectedCategories && Array.isArray(itemData.selectedCategories)) {
      processedData.selectedCategories = itemData.selectedCategories;
    }
    
    // Если переданы category_ids
    if (itemData.category_ids && Array.isArray(itemData.category_ids)) {
      processedData.category_ids = itemData.category_ids;
    }
    
    // Если переданы category_names
    if (itemData.category_names && Array.isArray(itemData.category_names)) {
      processedData.category_names = itemData.category_names;
    }
    
    const response = await this.request('/warehouse/items', {
      method: 'POST',
      body: JSON.stringify(processedData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async updateWarehouseItem(itemId, itemData) {
  try {
    // Обработка множественных категорий при обновлении
    const processedData = { ...itemData };
    
    if (itemData.selectedCategories && Array.isArray(itemData.selectedCategories)) {
      processedData.selectedCategories = itemData.selectedCategories;
    }
    
    if (itemData.category_ids && Array.isArray(itemData.category_ids)) {
      processedData.category_ids = itemData.category_ids;
    }
    
    const response = await this.request(`/warehouse/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(processedData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async deleteWarehouseItem(itemId) {
  try {
    const response = await this.request(`/warehouse/items/${itemId}`, {
      method: 'DELETE'
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async searchWarehouseItems(query, options = {}) {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: (options.limit || 10).toString()
    });
    
    // Поддержка поиска в конкретных категориях
    if (options.category_ids && Array.isArray(options.category_ids)) {
      options.category_ids.forEach(id => params.append('category_ids', id.toString()));
    } else if (options.category_id) {
      params.append('category_id', options.category_id.toString());
    }
    
    // Поддержка поиска в пути категорий
    if (options.category_path && Array.isArray(options.category_path)) {
      options.category_path.forEach(id => params.append('category_ids', id.toString()));
    }
    
    // Дополнительные фильтры
    if (options.status) {
      params.append('status', options.status);
    }
    
    if (options.stock_filter) {
      params.append('stock_filter', options.stock_filter);
    }
    
    const response = await this.request(`/warehouse/items/search?${params}`);
    return response.items || [];
  } catch (error) {
    console.error('Error searching warehouse items:', error);
    return [];
  }
}

async getItemByBarcode(barcode) {
  try {
    const response = await this.request(`/warehouse/items/barcode/${barcode}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getBarcodeInfo(barcode) {
  try {
    const response = await this.request('/warehouse/barcode/info', {
      method: 'POST',
      body: JSON.stringify({ barcode })
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getWarehouseOperations(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category_ids' && Array.isArray(value)) {
        value.forEach(id => params.append('category_ids', id.toString()));
      } else if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/warehouse/operations?${params}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async addStock(operationData) {
  try {
    const response = await this.request('/warehouse/operations/add-stock', {
      method: 'POST',
      body: JSON.stringify(operationData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async removeStock(operationData) {
  try {
    const response = await this.request('/warehouse/operations/remove-stock', {
      method: 'POST',
      body: JSON.stringify(operationData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async adjustStock(operationData) {
  try {
    const response = await this.request('/warehouse/operations/adjust-stock', {
      method: 'POST',
      body: JSON.stringify(operationData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async bulkAddStock(itemsData) {
  try {
    const response = await this.request('/warehouse/operations/bulk-add', {
      method: 'POST',
      body: JSON.stringify(itemsData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async bulkRemoveStock(itemsData) {
  try {
    const response = await this.request('/warehouse/operations/bulk-remove', {
      method: 'POST',
      body: JSON.stringify(itemsData)
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getWarehouseStock(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category_ids' && Array.isArray(value)) {
        // Поддержка множественных категорий для остатков
        value.forEach(id => params.append('category_ids', id.toString()));
      } else if (key === 'category_path' && Array.isArray(value)) {
        // Поддержка пути категорий
        value.forEach(id => params.append('category_ids', id.toString()));
      } else if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/warehouse/stock?${params}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getWarehouseConstants() {
  try {
    const response = await this.request('/warehouse/constants');
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Аналитика склада с поддержкой множественных категорий
async getWarehouseAnalytics(options = {}) {
  try {
    const params = new URLSearchParams();
    
    if (options.days) {
      params.append('days', options.days.toString());
    }
    
    if (options.category_ids && Array.isArray(options.category_ids)) {
      options.category_ids.forEach(id => params.append('category_ids', id.toString()));
    } else if (options.category_id) {
      params.append('category_id', options.category_id.toString());
    }
    
    const response = await this.request(`/warehouse/analytics/stock-movement?${params}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getLowStockAlerts(categoryIds = null) {
  try {
    const params = new URLSearchParams();
    
    if (categoryIds && Array.isArray(categoryIds)) {
      categoryIds.forEach(id => params.append('category_ids', id.toString()));
    }
    
    const queryString = params.toString();
    const response = await this.request(`/warehouse/analytics/low-stock-alerts${queryString ? `?${queryString}` : ''}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Методы экспорта с поддержкой множественных категорий
async exportWarehouseItems(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category_ids' && Array.isArray(value)) {
        params.append('category_ids', value.join(','));
      } else if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/warehouse/export/items?${params}`, {
      headers: { 'Accept': 'text/csv' }
    });
    
    if (typeof response === 'string') {
      const blob = new Blob([response], { type: 'text/csv' });
      return { success: true, blob };
    }
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async exportWarehouseOperations(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category_ids' && Array.isArray(value)) {
        params.append('category_ids', value.join(','));
      } else if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/warehouse/export/operations?${params}`, {
      headers: { 'Accept': 'text/csv' }
    });
    
    if (typeof response === 'string') {
      const blob = new Blob([response], { type: 'text/csv' });
      return { success: true, blob };
    }
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async exportWarehouseStock(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'category_ids' && Array.isArray(value)) {
        params.append('category_ids', value.join(','));
      } else if (key === 'category_path' && Array.isArray(value)) {
        params.append('category_ids', value.join(','));
      } else if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/warehouse/export/stock?${params}`, {
      headers: { 'Accept': 'text/csv' }
    });
    
    if (typeof response === 'string') {
      const blob = new Blob([response], { type: 'text/csv' });
      return { success: true, blob };
    }
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Дополнительные методы для работы с категориями
async getCategoryHierarchy(categoryId = null) {
  try {
    const params = categoryId ? `?category_id=${categoryId}` : '';
    const response = await this.request(`/warehouse/categories/hierarchy${params}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getCategoryPath(categoryId) {
  try {
    const response = await this.request(`/warehouse/categories/${categoryId}/path`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async getItemsInCategoryTree(categoryIds, options = {}) {
  try {
    const params = new URLSearchParams();
    
    if (Array.isArray(categoryIds)) {
      categoryIds.forEach(id => params.append('category_ids', id.toString()));
    } else {
      params.append('category_ids', categoryIds.toString());
    }
    
    // Дополнительные параметры
    Object.entries(options).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await this.request(`/warehouse/items/by-categories?${params}`);
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Вспомогательные методы для работы с множественными категориями
async addItemToCategories(itemId, categoryIds) {
  try {
    const response = await this.request(`/warehouse/items/${itemId}/categories`, {
      method: 'POST',
      body: JSON.stringify({ category_ids: categoryIds })
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async removeItemFromCategories(itemId, categoryIds) {
  try {
    const response = await this.request(`/warehouse/items/${itemId}/categories`, {
      method: 'DELETE',
      body: JSON.stringify({ category_ids: categoryIds })
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async setItemCategories(itemId, categoryIds) {
  try {
    const response = await this.request(`/warehouse/items/${itemId}/categories`, {
      method: 'PUT',
      body: JSON.stringify({ category_ids: categoryIds })
    });
    return { success: true, ...response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

    // ============ МЕТОДЫ ДЛЯ ЛИДОВ ============

  // Получить лидов с фильтрацией и пагинацией
  async getLeads(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await this.request(`/leads/?${queryString}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить конкретного лида
  async getLead(leadId) {
    try {
      const response = await this.request(`/leads/${leadId}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Создать нового лида
  async createLead(leadData) {
    try {
      const cleanData = {
        name: leadData.name?.trim(),
        phone: leadData.phone?.trim(),
        email: leadData.email?.trim(),
        source: leadData.source?.trim(),
        event_type: leadData.event_type?.trim(),
        preferred_budget: leadData.preferred_budget?.trim(),
        guests_count: leadData.guests_count ? parseInt(leadData.guests_count) : null,
        location_preference: leadData.location_preference?.trim(),
        preferred_date: leadData.preferred_date,
        status: leadData.status || 'new',
        temperature: leadData.temperature || 'cold',
        preferred_contact_method: leadData.preferred_contact_method || 'phone',
        notes: leadData.notes?.trim(),
        birthday: leadData.birthday,
        age: leadData.age ? parseInt(leadData.age) : null,
        gender: leadData.gender?.trim(),
        referrer: leadData.referrer?.trim(),
        assigned_to: leadData.assigned_to ? parseInt(leadData.assigned_to) : null,
        interested_services: leadData.interested_services || [],
        tags: leadData.tags || []
      };

      // Обрабатываем массивы из строк
      if (typeof cleanData.interested_services === 'string') {
        cleanData.interested_services = cleanData.interested_services.split(',').map(s => s.trim()).filter(s => s);
      }
      if (typeof cleanData.tags === 'string') {
        cleanData.tags = cleanData.tags.split(',').map(t => t.trim()).filter(t => t);
      }

      const response = await this.request('/leads/', {
        method: 'POST',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Обновить лида
  async updateLead(leadId, leadData) {
    try {
      const cleanData = {
        name: leadData.name?.trim(),
        phone: leadData.phone?.trim(),
        email: leadData.email?.trim(),
        source: leadData.source?.trim(),
        event_type: leadData.event_type?.trim(),
        preferred_budget: leadData.preferred_budget?.trim(),
        guests_count: leadData.guests_count ? parseInt(leadData.guests_count) : null,
        location_preference: leadData.location_preference?.trim(),
        preferred_date: leadData.preferred_date,
        status: leadData.status || 'new',
        temperature: leadData.temperature || 'cold',
        preferred_contact_method: leadData.preferred_contact_method || 'phone',
        notes: leadData.notes?.trim(),
        birthday: leadData.birthday,
        age: leadData.age ? parseInt(leadData.age) : null,
        gender: leadData.gender?.trim(),
        referrer: leadData.referrer?.trim(),
        assigned_to: leadData.assigned_to ? parseInt(leadData.assigned_to) : null,
        interested_services: leadData.interested_services || [],
        tags: leadData.tags || []
      };

      // Обрабатываем массивы из строк
      if (typeof cleanData.interested_services === 'string') {
        cleanData.interested_services = cleanData.interested_services.split(',').map(s => s.trim()).filter(s => s);
      }
      if (typeof cleanData.tags === 'string') {
        cleanData.tags = cleanData.tags.split(',').map(t => t.trim()).filter(t => t);
      }

      const response = await this.request(`/leads/${leadId}`, {
        method: 'PUT',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Удалить лида
  async deleteLead(leadId) {
    try {
      const response = await this.request(`/leads/${leadId}`, {
        method: 'DELETE',
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Добавить запись о контакте
  async addContactRecord(leadId, contactData) {
    try {
      const cleanData = {
        contact_date: contactData.contact_date || new Date().toISOString(),
        result: contactData.result, // answered, no_answer, not_interested, interested
        notes: contactData.notes?.trim()
      };

      const response = await this.request(`/leads/${leadId}/contact`, {
        method: 'POST',
        body: JSON.stringify(cleanData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Конвертировать лида в заявку
  async convertLeadToBooking(leadId, bookingData = {}) {
    try {
      const response = await this.request(`/leads/${leadId}/convert`, {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить статистику лидов
  async getLeadsStats(period = 30) {
    try {
      const response = await this.request(`/leads/stats?period=${period}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить лидов с приближающимися днями рождения
  async getBirthdayLeads(days = 30) {
    try {
      const response = await this.request(`/leads/birthday?days=${days}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Импорт лидов
  async importLeads(importData) {
    try {
      const response = await this.request('/leads/import', {
        method: 'POST',
        body: JSON.stringify(importData),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Экспорт лидов
  async exportLeads(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await this.request(`/leads/export?${params}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Массовое обновление лидов
  async bulkUpdateLeads(leadIds, updates) {
    try {
      const response = await this.request('/leads/bulk-update', {
        method: 'POST',
        body: JSON.stringify({
          lead_ids: leadIds,
          updates: updates
        }),
      });
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить константы для лидов
  async getLeadConstants() {
    try {
      const response = await this.request('/leads/constants');
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Получить воронку лидов
  async getLeadsFunnel(period = 30) {
    try {
      const response = await this.request(`/leads/funnel?period=${period}`);
      return { success: true, ...response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const apiService = new ApiService();