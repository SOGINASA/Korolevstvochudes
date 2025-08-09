import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext'; // предполагаем, что у вас есть хук авторизации
import SettingsContext from '../contexts/SettingsContext';

export const useSettings = () => {
  return useContext(SettingsContext);
};

// Специализированные хуки для удобства
export const useCompanyInfo = () => {
  const { companyInfo } = useSettings();
  return companyInfo;
};

export const useSocialLinks = () => {
  const { socialLinks } = useSettings();
  return socialLinks;
};

export const useSEOData = () => {
  const { seoData } = useSettings();
  return seoData;
};

// Хук для админских операций с настройками
export const useAdminSettings = () => {
  const { settings, loadAllSettings, updateSettings, loading, error } = useSettings();
  const { token } = useAuth(); // получаем токен из контекста авторизации

  const loadSettings = async () => {
    if (token) {
      await loadAllSettings(token);
    }
  };

  const saveSettings = async (newSettings) => {
    if (token) {
      return await updateSettings(newSettings, token);
    }
    throw new Error('Нет токена авторизации');
  };

  return {
    settings,
    loadSettings,
    saveSettings,
    loading,
    error
  };
};

// Хук для получения настроек уведомлений
export const useNotificationSettings = () => {
  const { getSetting } = useSettings();
  
  return {
    emailNotifications: getSetting('email_notifications', false),
    telegramNotifications: getSetting('telegram_notifications', false),
    smsNotifications: getSetting('sms_notifications', false),
    notificationEmail: getSetting('notification_email', ''),
  };
};

// Хук для интеграций
export const useIntegrationSettings = () => {
  const { getSetting } = useSettings();
  
  return {
    kaspiApiKey: getSetting('kaspi_api_key', ''),
    oneCUrl: getSetting('one_c_url', ''),
    smtpServer: getSetting('smtp_server', ''),
    smtpPort: getSetting('smtp_port', ''),
  };
};