// contexts/SettingsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    // Дефолтные значения
    company_name: 'Королевство Чудес',
    company_email: 'info@prazdnikvdom.kz',
    company_phone: '+7 (777) 123-45-67',
    whatsapp_phone: '+7 (777) 987-65-43',
    company_address: 'г. Петропавловск, ул. Ленина, 123',
    company_description: 'Профессиональная организация праздников и мероприятий',
    social_instagram: 'https://instagram.com/korolevstvo_chudes',
    social_facebook: '',
    social_youtube: '',
    social_telegram: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Базовый URL для API
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Вспомогательная функция для безопасных запросов
  const safeFetch = async (url, options = {}) => {
    try {
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      console.log(`Ответ от ${url}:`, {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type')
      });

      // Проверяем статус ответа
      if (!response.ok) {
        // Пытаемся прочитать ошибку как текст
        const errorText = await response.text();
        console.error(`HTTP ${response.status} error:`, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Проверяем тип контента
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Ожидался JSON, но получен:', contentType);
        console.error('Содержимое ответа:', responseText.substring(0, 500));
        
        // Если это HTML с ошибкой 404, значит endpoint не найден
        if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
          throw new Error(`Endpoint ${url} не найден. Сервер вернул HTML страницу вместо JSON.`);
        }
        
        throw new Error(`Сервер вернул ${contentType} вместо JSON`);
      }

      const data = await response.json();
      console.log(`Данные от ${url}:`, data);
      return data;

    } catch (error) {
      console.error(`Ошибка запроса к ${url}:`, error);
      throw error;
    }
  };

  // Функция для загрузки публичных настроек
  const loadPublicSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ИСПРАВЛЕНО: правильный URL с слэшем в конце
      const data = await safeFetch(`${API_BASE_URL}/settings/`);
      setSettings(prevSettings => ({
        ...prevSettings,
        ...data
      }));
      
    } catch (err) {
      console.error('Ошибка загрузки настроек:', err);
      setError(`Не удалось загрузить настройки: ${err.message}`);
      
      // При ошибке оставляем дефолтные настройки
      console.log('Используем дефолтные настройки');
      
    } finally {
      setLoading(false);
    }
  };

  // Функция для загрузки всех настроек (для админки)
  const loadAllSettings = async (token) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!token) {
        throw new Error('Токен авторизации не предоставлен');
      }

      // ИСПРАВЛЕНО: правильный URL для админских настроек
      const data = await safeFetch(`${API_BASE_URL}/settings/admin/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setSettings(data);
      
    } catch (err) {
      console.error('Ошибка загрузки всех настроек:', err);
      setError(`Не удалось загрузить настройки администратора: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для обновления настроек (только для админки)
  const updateSettings = async (newSettings, token) => {
    try {
      
      setLoading(true);
      setError(null);
      
      if (!token) {
        throw new Error('Токен авторизации не предоставлен');
      }

      // ИСПРАВЛЕНО: правильный URL для обновления админских настроек
      const result = await safeFetch(`${API_BASE_URL}/settings/admin/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSettings)
      });

      setSettings(prevSettings => ({
        ...prevSettings,
        ...newSettings
      }));
      
      return result;
      
    } catch (err) {
      console.error('Ошибка обновления настроек:', err);
      setError(`Не удалось сохранить настройки: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Получить настройку по ключу
  const getSetting = (key, defaultValue = '') => {
    return settings[key] || defaultValue;
  };

  // Получить настройки по категории
  const getSettingsByCategory = (category) => {
    const categorySettings = {};
    Object.keys(settings).forEach(key => {
      if (key.startsWith(category + '_')) {
        const shortKey = key.replace(category + '_', '');
        categorySettings[shortKey] = settings[key];
      }
    });
    return categorySettings;
  };

  // Автозагрузка настроек при инициализации
  useEffect(() => {
    // Добавляем задержку для отладки
    const timer = setTimeout(() => {
      loadPublicSettings();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const value = {
    settings,
    loading,
    error,
    loadPublicSettings,
    loadAllSettings,
    updateSettings,
    getSetting,
    getSettingsByCategory,
    // Удобные геттеры для часто используемых настроек
    companyInfo: {
      name: getSetting('company_name'),
      email: getSetting('company_email'),
      phone: getSetting('company_phone'),
      whatsapp: getSetting('whatsapp_phone'),
      address: getSetting('company_address'),
      description: getSetting('company_description'),
    },
    socialLinks: {
      instagram: getSetting('social_instagram'),
      facebook: getSetting('social_facebook'),
      youtube: getSetting('social_youtube'),
      telegram: getSetting('social_telegram'),
    },
    seoData: {
      title: getSetting('site_title'),
      description: getSetting('site_description'),
      keywords: getSetting('site_keywords'),
    }
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;