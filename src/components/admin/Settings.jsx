// components/admin/Settings.js
import React, { useState } from 'react';
import { Save, Settings as SettingsIcon, Users, MessageSquare, TrendingUp } from 'lucide-react';

const Settings = ({ showNotification }) => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('company');
  const [settings, setSettings] = useState({
    // Компания
    companyName: 'Королевство Чудес',
    companyEmail: 'info@prazdnikvdom.kz',
    companyPhone: '+7 (777) 123-45-67',
    whatsappPhone: '+7 (777) 987-65-43',
    companyAddress: 'г. Петропавловск, ул. Ленина, 123',
    companyDescription: 'Профессиональная организация праздников и мероприятий',
    
    // Соцсети
    socialInstagram: 'https://instagram.com/korolevstvo_chudes',
    socialFacebook: '',
    socialYoutube: '',
    socialTelegram: '',
    
    // Уведомления
    emailNotifications: true,
    telegramNotifications: false,
    smsNotifications: false,
    notificationEmail: 'admin@prazdnikvdom.kz',
    
    // SEO
    siteTitle: 'Организация праздников в Петропавловске - Королевство Чудес',
    siteDescription: 'Профессиональная организация праздников в Петропавловске. Детские дни рождения, свадьбы, корпоративы.',
    siteKeywords: 'праздники петропавловск, аниматоры, организация свадеб',
    googleAnalyticsId: '',
    yandexMetricaId: '',
    
    // Интеграции
    kaspiApiKey: '',
    oneC_url: '',
    smtpServer: '',
    smtpPort: ''
  });

  const settingsSections = [
    { id: 'company', icon: SettingsIcon, label: 'О компании' },
    { id: 'social', icon: Users, label: 'Социальные сети' },
    { id: 'notifications', icon: MessageSquare, label: 'Уведомления' },
    { id: 'seo', icon: TrendingUp, label: 'SEO' },
    { id: 'integration', icon: SettingsIcon, label: 'Интеграции' }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      // Здесь будет API запрос для сохранения настроек
      // await apiService.updateSettings(settings);
      showNotification('Настройки сохранены', 'success');
    } catch (error) {
      showNotification('Ошибка при сохранении настроек', 'error');
      console.error('Settings save error:', error);
    }
  };

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Информация о компании</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название компании
          </label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => updateSetting('companyName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Королевство Чудес"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email компании
          </label>
          <input
            type="email"
            value={settings.companyEmail}
            onChange={(e) => updateSetting('companyEmail', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="info@prazdnikvdom.kz"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Основной телефон
          </label>
          <input
            type="tel"
            value={settings.companyPhone}
            onChange={(e) => updateSetting('companyPhone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="+7 (777) 123-45-67"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp номер
          </label>
          <input
            type="tel"
            value={settings.whatsappPhone}
            onChange={(e) => updateSetting('whatsappPhone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="+7 (777) 987-65-43"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Адрес компании
        </label>
        <textarea
          value={settings.companyAddress}
          onChange={(e) => updateSetting('companyAddress', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="г. Петропавловск, ул. Ленина, 123"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Описание компании
        </label>
        <textarea
          value={settings.companyDescription}
          onChange={(e) => updateSetting('companyDescription', e.target.value)}
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
            value={settings.socialInstagram}
            onChange={(e) => updateSetting('socialInstagram', e.target.value)}
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
            value={settings.socialFacebook}
            onChange={(e) => updateSetting('socialFacebook', e.target.value)}
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
            value={settings.socialYoutube}
            onChange={(e) => updateSetting('socialYoutube', e.target.value)}
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
            value={settings.socialTelegram}
            onChange={(e) => updateSetting('socialTelegram', e.target.value)}
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
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Email уведомления о новых заявках</h4>
            <p className="text-sm text-gray-600">Получать письма при поступлении новых заявок</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Telegram уведомления</h4>
            <p className="text-sm text-gray-600">Дублировать уведомления в Telegram</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.telegramNotifications}
              onChange={(e) => updateSetting('telegramNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">SMS уведомления</h4>
            <p className="text-sm text-gray-600">Отправлять SMS о статусе заявок</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) => updateSetting('smsNotifications', e.target.checked)}
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
          value={settings.notificationEmail}
          onChange={(e) => updateSetting('notificationEmail', e.target.value)}
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
          value={settings.siteTitle}
          onChange={(e) => updateSetting('siteTitle', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Организация праздников в Петропавловске - Королевство Чудес"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Описание сайта (Description)
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => updateSetting('siteDescription', e.target.value)}
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
          value={settings.siteKeywords}
          onChange={(e) => updateSetting('siteKeywords', e.target.value)}
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
          value={settings.googleAnalyticsId}
          onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
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
          value={settings.yandexMetricaId}
          onChange={(e) => updateSetting('yandexMetricaId', e.target.value)}
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
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Подключено
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Прием онлайн платежей через Kaspi</p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="API ключ Kaspi"
              value={settings.kaspiApiKey}
              onChange={(e) => updateSetting('kaspiApiKey', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="text-sm text-purple-600 hover:text-purple-700">
              Тестировать подключение
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">1C Интеграция</h4>
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              В процессе
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Синхронизация с системой учета</p>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="URL сервера 1C"
              value={settings.oneC_url}
              onChange={(e) => updateSetting('oneC_url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button className="text-sm text-purple-600 hover:text-purple-700">
              Настроить подключение
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">Email рассылка</h4>
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              Не настроено
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">SMTP настройки для отправки писем</p>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="SMTP сервер"
              value={settings.smtpServer}
              onChange={(e) => updateSetting('smtpServer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Порт"
              value={settings.smtpPort}
              onChange={(e) => updateSetting('smtpPort', e.target.value)}
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Настройки системы</h2>
        <button 
          onClick={handleSaveSettings}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Save className="h-4 w-4" />
          <span>Сохранить изменения</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar с разделами */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Разделы настроек</h3>
            <nav className="space-y-2">
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
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;