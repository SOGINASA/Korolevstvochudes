// components/admin/Settings.js
import React, { useState, useEffect } from 'react';
import { Save, Settings as SettingsIcon, Users, MessageSquare, TrendingUp, ChevronDown } from 'lucide-react';
import { useAdminSettings } from '../../hooks/useSettings';

const Settings = ({ showNotification }) => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('company');
  const [showMobileSections, setShowMobileSections] = useState(false);
  const { settings, loadSettings, saveSettings, loading, error } = useAdminSettings();
  const [localSettings, setLocalSettings] = useState({});

  // Загружаем настройки при монтировании компонента
  useEffect(() => {
    loadSettings();
  }, []);

  // Синхронизируем локальные настройки с глобальными
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const settingsSections = [
    { id: 'company', icon: SettingsIcon, label: 'О компании' },
    { id: 'social', icon: Users, label: 'Социальные сети' },
    { id: 'notifications', icon: MessageSquare, label: 'Уведомления' },
    { id: 'seo', icon: TrendingUp, label: 'SEO' },
    { id: 'integration', icon: SettingsIcon, label: 'Интеграции' }
  ];

  const updateLocalSetting = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSectionChange = (sectionId) => {
    setActiveSettingsTab(sectionId);
    setShowMobileSections(false);
  };

  const handleSaveSettings = async () => {
    try {
      await saveSettings(localSettings);
      showNotification('Настройки сохранены', 'success');
    } catch (error) {
      showNotification('Ошибка при сохранении настроек', 'error');
      console.error('Settings save error:', error);
    }
  };

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Информация о компании</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <label className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base">
            Название компании
          </label>
          <input
            type="text"
            value={localSettings.company_name || ''}
            onChange={(e) => updateLocalSetting('company_name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Королевство Чудес"
          />
        </div>

        <div>
          <label className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base">
            Email компании
          </label>
          <input
            type="email"
            value={localSettings.company_email || ''}
            onChange={(e) => updateLocalSetting('company_email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="info@prazdnikvdom.kz"
          />
        </div>

        <div>
          <label className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base">
            Основной телефон
          </label>
          <input
            type="tel"
            value={localSettings.company_phone || ''}
            onChange={(e) => updateLocalSetting('company_phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="8 (705) 519 5222"
          />
        </div>

        <div>
          <label className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base">
            WhatsApp номер
          </label>
          <input
            type="tel"
            value={localSettings.whatsapp_phone || ''}
            onChange={(e) => updateLocalSetting('whatsapp_phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="8 (705) 519 5222"
          />
        </div>
      </div>

      <div>
        <label className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base">
          Адрес компании
        </label>
        <textarea
          value={localSettings.company_address || ''}
          onChange={(e) => updateLocalSetting('company_address', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="г. Петропавловск, ул. Ленина, 123"
        />
      </div>

      <div>
        <label className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base">
          Описание компании
        </label>
        <textarea
          value={localSettings.company_description || ''}
          onChange={(e) => updateLocalSetting('company_description', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Краткое описание деятельности компании..."
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Социальные сети</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instagram
          </label>
          <input
            type="url"
            value={localSettings.social_instagram || ''}
            onChange={(e) => updateLocalSetting('social_instagram', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://instagram.com/korolevstvo_chudes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Facebook
          </label>
          <input
            type="url"
            value={localSettings.social_facebook || ''}
            onChange={(e) => updateLocalSetting('social_facebook', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://facebook.com/korolevstvo.chudes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube
          </label>
          <input
            type="url"
            value={localSettings.social_youtube || ''}
            onChange={(e) => updateLocalSetting('social_youtube', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://youtube.com/@korolevstvo-chudes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telegram канал
          </label>
          <input
            type="url"
            value={localSettings.social_telegram || ''}
            onChange={(e) => updateLocalSetting('social_telegram', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://t.me/korolevstvo_chudes"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Уведомления</h3>
      
      <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
          <div>
            <h4 className="font-medium text-gray-900">Email уведомления о новых заявках</h4>
            <p className="text-sm text-gray-600">Получать письма при поступлении новых заявок</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.email_notifications || false}
              onChange={(e) => updateLocalSetting('email_notifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
            <div>
              <h4 className="font-medium text-gray-900">Telegram уведомления</h4>
              <p className="text-sm text-gray-600">Дублировать уведомления в Telegram</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.telegram_notifications || false}
                onChange={(e) => updateLocalSetting('telegram_notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          {/* Дополнительное поле Chat ID появляется только при включенных Telegram уведомлениях */}
          {localSettings.telegram_notifications && (
            <div className="ml-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telegram Chat ID
              </label>
              <input
                type="text"
                value={localSettings.telegram_chat_id || ''}
                onChange={(e) => updateLocalSetting('telegram_chat_id', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Например: -1001234567890"
              />
              <p className="text-xs text-gray-500 mt-1">
                Получить Chat ID можно через @korolevstvo_chudes_bot в Telegram.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
          <div>
            <h4 className="font-medium text-gray-900">SMS уведомления</h4>
            <p className="text-sm text-gray-600">Отправлять SMS о статусе заявок</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.sms_notifications || false}
              onChange={(e) => updateLocalSetting('sms_notifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email для уведомлений
        </label>
        <input
          type="email"
          value={localSettings.notification_email || ''}
          onChange={(e) => updateLocalSetting('notification_email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="admin@prazdnikvdom.kz"
        />
      </div>
    </div>
  );

  const renderSeoSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">SEO настройки</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Заголовок сайта (Title)
        </label>
        <input
          type="text"
          value={localSettings.site_title || ''}
          onChange={(e) => updateLocalSetting('site_title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Организация праздников в Петропавловске - Королевство Чудес"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Описание сайта (Description)
        </label>
        <textarea
          value={localSettings.site_description || ''}
          onChange={(e) => updateLocalSetting('site_description', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Профессиональная организация праздников в Петропавловске. Детские дни рождения, свадьбы, корпоративы. Более 1000 довольных клиентов."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ключевые слова (Keywords)
        </label>
        <input
          type="text"
          value={localSettings.site_keywords || ''}
          onChange={(e) => updateLocalSetting('site_keywords', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="праздники петропавловск, аниматоры, организация свадеб, детские праздники"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Google Analytics ID
        </label>
        <input
          type="text"
          value={localSettings.google_analytics_id || ''}
          onChange={(e) => updateLocalSetting('google_analytics_id', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="G-XXXXXXXXXX"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Яндекс.Метрика ID
        </label>
        <input
          type="text"
          value={localSettings.yandex_metrica_id || ''}
          onChange={(e) => updateLocalSetting('yandex_metrica_id', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="12345678"
        />
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Интеграции</h3>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Kaspi Pay</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              localSettings.kaspi_api_key ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {localSettings.kaspi_api_key ? 'Подключено' : 'Не настроено'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Прием онлайн платежей через Kaspi</p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="API ключ Kaspi"
              value={localSettings.kaspi_api_key || ''}
              onChange={(e) => updateLocalSetting('kaspi_api_key', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">1C Интеграция</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              localSettings.one_c_url ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            }`}>
              {localSettings.one_c_url ? 'В процессе' : 'Не настроено'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Синхронизация с системой учета</p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="URL сервера 1C"
              value={localSettings.one_c_url || ''}
              onChange={(e) => updateLocalSetting('one_c_url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Email рассылка</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              localSettings.smtp_server ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {localSettings.smtp_server ? 'Настроено' : 'Не настроено'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">SMTP настройки для отправки писем</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="SMTP сервер"
              value={localSettings.smtp_server || ''}
              onChange={(e) => updateLocalSetting('smtp_server', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Порт"
              value={localSettings.smtp_port || ''}
              onChange={(e) => updateLocalSetting('smtp_port', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSettingsTab) {
      case 'company': return renderCompanySettings();
      case 'social': return renderSocialSettings();
      case 'notifications': return renderNotificationSettings();
      case 'seo': return renderSeoSettings();
      case 'integration': return renderIntegrationSettings();
      default: return renderCompanySettings();
    }
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Настройки системы</h2>
        <button 
          onClick={handleSaveSettings}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          <span className="text-sm lg:text-base">{loading ? 'Сохранение...' : 'Сохранить изменения'}</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Ошибка: {error}</p>
        </div>
      )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Sidebar с разделами */}
        <div className="xl:col-span-1">
  <div className="bg-white rounded-lg lg:rounded-xl shadow-md lg:shadow-lg p-4 lg:p-6">
    <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Разделы настроек</h3>
    
    {/* Мобильное меню-селект */}
    <div className="block xl:hidden mb-4">
      <button
        onClick={() => setShowMobileSections(!showMobileSections)}
        className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-left"
      >
        <span className="flex items-center space-x-2">
          {settingsSections.find(s => s.id === activeSettingsTab)?.icon && 
            React.createElement(settingsSections.find(s => s.id === activeSettingsTab).icon, { className: "h-4 w-4" })
          }
          <span className="text-sm font-medium">
            {settingsSections.find(s => s.id === activeSettingsTab)?.label}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 transform transition-transform ${showMobileSections ? 'rotate-180' : ''}`} />
      </button>
      
      {showMobileSections && (
        <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-lg">
          {settingsSections.map(section => (
            <button
              key={section.id}
              onClick={() => handleSectionChange(section.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                activeSettingsTab === section.id ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
              }`}
            >
              <section.icon className="h-4 w-4" />
              <span className="text-sm">{section.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>

              {/* Десктопное меню */}
              <nav className="hidden xl:block space-y-2">
              {settingsSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSettingsTab(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSettingsTab === section.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Основной контент настроек */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-md lg:shadow-lg p-4 lg:p-6">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;