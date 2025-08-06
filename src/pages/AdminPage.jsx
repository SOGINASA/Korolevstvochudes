import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Image, 
  Star, 
  PenTool, 
  Gift, 
  Settings, 
  TrendingUp,
  Users,
  Calendar,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  X,
  Upload,
  Save,
  FileText,
  Globe,
  Clock
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    date: '',
    description: '',
    budget: '',
    client: '',
    status: 'draft'
  });
  const [reviewForm, setReviewForm] = useState({
    name: '',
    service: '',
    rating: 5,
    text: '',
    email: '',
    phone: ''
  });

  const [showAddArticle, setShowAddArticle] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedStatus, setSelectedStatus] = useState('all');
const [articleForm, setArticleForm] = useState({
  title: '',
  slug: '',
  category: '',
  content: '',
  excerpt: '',
  tags: '',
  status: 'draft',
  featured: false,
  metaTitle: '',
  metaDescription: ''
});

const [showAddPromotion, setShowAddPromotion] = useState(false);
const [promotionForm, setPromotionForm] = useState({
  title: '',
  description: '',
  discount: '',
  type: '',
  promoCode: '',
  startDate: '',
  endDate: '',
  maxUses: '',
  conditions: '',
  status: 'draft',
  featured: false
});

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
    { id: 'company', icon: Settings, label: 'О компании' },
    { id: 'social', icon: Users, label: 'Социальные сети' },
    { id: 'notifications', icon: MessageSquare, label: 'Уведомления' },
    { id: 'seo', icon: TrendingUp, label: 'SEO' },
    { id: 'integration', icon: Settings, label: 'Интеграции' }
  ];

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Mock data
  const stats = {
    applications: 142,
    newApplications: 23,
    portfolio: 85,
    reviews: 267,
    blogPosts: 34,
    promotions: 8
  };

  const recentApplications = [
    {
      id: 1,
      name: 'Анна Петрова',
      phone: '+7 (777) 123-45-67',
      email: 'anna@email.com',
      service: 'Детский день рождения',
      date: '2025-02-15',
      budget: '150,000 ₸',
      status: 'new',
      created: '2025-01-08 14:30'
    },
    {
      id: 2,
      name: 'Максим Иванов',
      phone: '+7 (777) 987-65-43',
      email: 'maxim@email.com',
      service: 'Корпоратив',
      date: '2025-02-20',
      budget: '500,000 ₸',
      status: 'in-progress',
      created: '2025-01-08 12:15'
    },
    {
      id: 3,
      name: 'Светлана Козлова',
      phone: '+7 (777) 555-33-22',
      email: 'svetlana@email.com',
      service: 'Свадьба',
      date: '2025-03-10',
      budget: '800,000 ₸',
      status: 'completed',
      created: '2025-01-07 16:45'
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'День рождения принцессы Алисы',
      category: 'Детские праздники',
      date: '2024-12-15',
      photos: 24,
      views: 1250,
      status: 'published'
    },
    {
      id: 2,
      title: 'Свадьба в стиле лофт',
      category: 'Свадьбы',
      date: '2024-12-10',
      photos: 45,
      views: 2100,
      status: 'published'
    },
    {
      id: 3,
      title: 'Новогодний корпоратив IT-компании',
      category: 'Корпоративы',
      date: '2024-12-28',
      photos: 36,
      views: 890,
      status: 'draft'
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Елена Сидорова',
      service: 'Детский праздник',
      rating: 5,
      text: 'Потрясающий праздник для дочки! Аниматоры профессионалы своего дела...',
      date: '2025-01-05',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Дмитрий Волков',
      service: 'Корпоратив',
      rating: 4,
      text: 'Отличная организация корпоративного мероприятия. Все прошло на высоте...',
      date: '2025-01-04',
      status: 'pending'
    }
  ];

  const blogArticles = [
    {
      id: 1,
      title: 'Как выбрать идеального аниматора для детского праздника',
      slug: 'kak-vybrat-animatora',
      category: 'Советы',
      date: '2025-01-05',
      status: 'published',
      views: '2.1k'
    },
    {
      id: 2,
      title: 'Топ-10 локаций для свадьбы в Петропавловске',
      slug: 'top-10-lokatsiy-svadba',
      category: 'Кейсы',
      date: '2025-01-03',
      status: 'published',
      views: '1.8k'
    },
    {
      id: 3,
      title: 'Тренды детских праздников 2025',
      slug: 'trendy-detskih-prazdnikov-2025',
      category: 'Тренды',
      date: '2025-01-01',
      status: 'draft',
      views: '0'
    },
    {
      id: 4,
      title: 'Бюджет корпоратива: на чем можно сэкономить',
      slug: 'byudzhet-korporativa',
      category: 'Советы',
      date: '2024-12-28',
      status: 'published',
      views: '1.5k'
    }
  ];

  const promotions = [
    {
      id: 1,
      title: 'Скидка 20% на детские праздники',
      description: 'Специальное предложение на все детские мероприятия',
      discount: '20%',
      type: 'discount',
      status: 'active',
      validPeriod: '01.01 - 31.03.2025',
      usedCount: 45,
      maxUses: 100,
      promoCode: 'KIDS20'
    },
    {
      id: 2,
      title: 'Весенний пакет "Свадьба мечты"',
      description: 'Комплексное предложение для весенних свадеб',
      discount: '15%',
      type: 'package',
      status: 'scheduled',
      validPeriod: '01.04 - 30.06.2025',
      usedCount: 0,
      maxUses: 50,
      promoCode: 'SPRING2025'
    },
    {
      id: 3,
      title: 'Корпоратив со скидкой',
      description: 'Скидка на корпоративные мероприятия',
      discount: '10000 ₸',
      type: 'discount',
      status: 'active',
      validPeriod: '01.01 - 28.02.2025',
      usedCount: 12,
      maxUses: 30,
      promoCode: 'CORP2025'
    }
  ];

  const categories = [
    'Детские праздники',
    'Свадьбы',
    'Корпоративы',
    'Юбилеи и торжества',
    'Шоу-программы',
    'Квесты и игры'
  ];

  const services = [
    'Детские праздники',
    'Свадьбы', 
    'Корпоративы',
    'Юбилеи и торжества',
    'Праздничные программы',
    'Шоу-программы',
    'Квесты и игры',
    'Дополнительные услуги'
  ];

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Дашборд' },
    { id: 'applications', icon: MessageSquare, label: 'Заявки' },
    { id: 'portfolio', icon: Image, label: 'Портфолио' },
    { id: 'reviews', icon: Star, label: 'Отзывы' },
    { id: 'blog', icon: PenTool, label: 'Блог' },
    { id: 'promotions', icon: Gift, label: 'Акции' },
    { id: 'settings', icon: Settings, label: 'Настройки' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'in-progress': return 'В работе';
      case 'completed': return 'Завершена';
      case 'cancelled': return 'Отменена';
      case 'approved': return 'Одобрен';
      case 'pending': return 'На модерации';
      case 'published': return 'Опубликовано';
      case 'draft': return 'Черновик';
      default: return status;
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    console.log('Новый проект:', projectForm);
    setShowAddProject(false);
    setProjectForm({
      title: '',
      category: '',
      date: '',
      description: '',
      budget: '',
      client: '',
      status: 'draft'
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Новый отзыв:', reviewForm);
    setShowAddReview(false);
    setReviewForm({
      name: '',
      service: '',
      rating: 5,
      text: '',
      email: '',
      phone: ''
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Всего заявок</p>
              <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
              <p className="text-sm text-green-600 mt-2">+{stats.newApplications} новых</p>
            </div>
            <MessageSquare className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Портфолио</p>
              <p className="text-3xl font-bold text-gray-900">{stats.portfolio}</p>
              <p className="text-sm text-blue-600 mt-2">проектов</p>
            </div>
            <Image className="h-12 w-12 text-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Отзывы</p>
              <p className="text-3xl font-bold text-gray-900">{stats.reviews}</p>
              <p className="text-sm text-yellow-600 mt-2">клиентов</p>
            </div>
            <Star className="h-12 w-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Статьи блога</p>
              <p className="text-3xl font-bold text-gray-900">{stats.blogPosts}</p>
              <p className="text-sm text-green-600 mt-2">публикаций</p>
            </div>
            <PenTool className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Последние заявки</h3>
          <button 
            onClick={() => setActiveTab('applications')}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Смотреть все
          </button>
        </div>
        <div className="space-y-4">
          {recentApplications.slice(0, 3).map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-semibold text-gray-900">{app.name}</p>
                    <p className="text-sm text-gray-600">{app.service}</p>
                  </div>
                </div>
              </div>
              <div className="text-right mr-4">
                <p className="font-semibold text-gray-900">{app.budget}</p>
                <p className="text-sm text-gray-600">{app.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                {getStatusText(app.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Аналитика заявок</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">График заявок по месяцам</p>
            <p className="text-sm text-gray-500 mt-1">Данные будут подгружены с бэкенда</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Заявки клиентов</h2>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter className="h-4 w-4" />
            <span>Фильтр</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Download className="h-4 w-4" />
            <span>Экспорт</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, телефону или email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Услуга</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата события</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Бюджет</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApplications.map(app => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{app.phone}</span>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <Mail className="h-3 w-3" />
                        <span>{app.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{app.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Портфолио</h2>
        <button 
          onClick={() => setShowAddProject(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить проект</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <Image className="h-16 w-16 text-white opacity-50" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.category}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{item.date}</span>
                <div className="flex items-center space-x-4">
                  <span>{item.photos} фото</span>
                  <span className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{item.views}</span>
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-purple-100 text-purple-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-200">
                  Редактировать
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal для добавления проекта */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Добавить новый проект</h3>
              <button
                onClick={() => setShowAddProject(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: День рождения принцессы Алисы"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Категория *
                  </label>
                  <select
                    required
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата мероприятия *
                  </label>
                  <input
                    type="date"
                    required
                    value={projectForm.date}
                    onChange={(e) => setProjectForm({...projectForm, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Бюджет проекта
                  </label>
                  <input
                    type="text"
                    value={projectForm.budget}
                    onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: 300,000 ₸"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя клиента
                  </label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Имя клиента"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус
                  </label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Черновик</option>
                    <option value="published">Опубликовано</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание проекта
                </label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Расскажите о проекте: задачи, решения, особенности..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Загрузить фото
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Перетащите фото сюда или нажмите для выбора</p>
                  <p className="text-sm text-gray-500 mt-1">Поддерживаются JPG, PNG до 10MB</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Сохранить проект</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

    useEffect(() => {
      // Добавляем класс при монтировании компонента
      document.body.classList.add('admin-page');
      
      // Удаляем класс при размонтировании
      return () => {
        document.body.classList.remove('admin-page');
      };
    }, []);

  const renderReviews = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Отзывы клиентов</h2>
        <button 
          onClick={() => setShowAddReview(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить отзыв</span>
        </button>
      </div>

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.service}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                  {getStatusText(review.status)}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.text}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{review.date}</span>
              <div className="flex space-x-2">
                <button className="text-green-600 hover:text-green-700 px-3 py-1 text-sm font-medium">
                  Одобрить
                </button>
                <button className="text-blue-600 hover:text-blue-700 px-3 py-1 text-sm font-medium">
                  Редактировать
                </button>
                <button className="text-red-600 hover:text-red-700 px-3 py-1 text-sm font-medium">
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal для добавления отзыва */}
      {showAddReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Добавить отзыв</h3>
              <button
                onClick={() => setShowAddReview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя клиента *
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Имя клиента"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={reviewForm.email}
                    onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={reviewForm.phone}
                    onChange={(e) => setReviewForm({...reviewForm, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+7 (777) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Услуга *
                </label>
                <select
                  required
                  value={reviewForm.service}
                  onChange={(e) => setReviewForm({...reviewForm, service: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Выберите услугу</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Оценка *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewForm({...reviewForm, rating})}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= reviewForm.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {reviewForm.rating} из 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текст отзыва *
                </label>
                <textarea
                  required
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Расскажите о вашем опыте работы с нашей компанией..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Сохранить отзыв</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'applications': return renderApplications();
      case 'portfolio': return renderPortfolio();
      case 'reviews': return renderReviews();
      case 'blog': return renderBlog();
      case 'promotions': return renderPromotions();
      case 'settings': return renderSettings();
      default: return renderDashboard();
    }
  };                      

  const renderBlog = () => (
  <div className="space-y-6">
    {/* Header с поиском и кнопкой добавления */}
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Управление блогом</h2>
      <button 
        onClick={() => setShowAddArticle(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        <Plus className="h-4 w-4" />
        <span>Добавить статью</span>
      </button>
    </div>

    {/* Статистика */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center">
          <FileText className="h-8 w-8 text-purple-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-600">Всего статей</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center">
          <Globe className="h-8 w-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-600">Опубликовано</p>
            <p className="text-2xl font-bold text-gray-900">18</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center">
          <Clock className="h-8 w-8 text-yellow-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-600">Черновики</p>
            <p className="text-2xl font-bold text-gray-900">6</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center">
          <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-600">Просмотры</p>
            <p className="text-2xl font-bold text-gray-900">12.4k</p>
          </div>
        </div>
      </div>
    </div>

    {/* Фильтры и поиск */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск статей..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Все категории</option>
          <option value="советы">Советы</option>
          <option value="кейсы">Кейсы</option>
          <option value="тренды">Тренды</option>
          <option value="сезонное">Сезонное</option>
        </select>
        <select 
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">Все статусы</option>
          <option value="published">Опубликовано</option>
          <option value="draft">Черновик</option>
          <option value="scheduled">Запланировано</option>
        </select>
      </div>
    </div>

    {/* Список статей */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статья</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Просмотры</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogArticles.map(article => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500">{article.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {article.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {article.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    article.status === 'published' ? 'bg-green-100 text-green-800' :
                    article.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status === 'published' ? 'Опубликовано' :
                     article.status === 'draft' ? 'Черновик' : 'Запланировано'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {article.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-purple-600 hover:text-purple-900">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Modal для добавления статьи */}
    {showAddArticle && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Создать новую статью</h3>
            <button
              onClick={() => setShowAddArticle(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заголовок статьи *
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({...articleForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Например: Как выбрать аниматора для детского праздника"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL (slug)
                </label>
                <input
                  type="text"
                  value={articleForm.slug}
                  onChange={(e) => setArticleForm({...articleForm, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="kak-vybrat-animatora"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория *
                </label>
                <select
                  required
                  value={articleForm.category}
                  onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Выберите категорию</option>
                  <option value="советы">Советы</option>
                  <option value="кейсы">Кейсы</option>
                  <option value="тренды">Тренды</option>
                  <option value="сезонное">Сезонное</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Теги
                </label>
                <input
                  type="text"
                  value={articleForm.tags}
                  onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="аниматор, детский праздник, советы"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Краткое описание
              </label>
              <textarea
                value={articleForm.excerpt}
                onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Краткое описание статьи для превью..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Содержание статьи *
              </label>
              <textarea
                required
                value={articleForm.content}
                onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Полный текст статьи..."
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title (SEO)
                </label>
                <input
                  type="text"
                  value={articleForm.metaTitle}
                  onChange={(e) => setArticleForm({...articleForm, metaTitle: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="SEO заголовок"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Статус публикации
                </label>
                <select
                  value={articleForm.status}
                  onChange={(e) => setArticleForm({...articleForm, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликовать</option>
                  <option value="scheduled">Запланировать</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description (SEO)
              </label>
              <textarea
                value={articleForm.metaDescription}
                onChange={(e) => setArticleForm({...articleForm, metaDescription: e.target.value})}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="SEO описание для поисковых систем..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={articleForm.featured}
                onChange={(e) => setArticleForm({...articleForm, featured: e.target.checked})}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">
                Рекомендуемая статья
              </label>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Сохранить статью</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAddArticle(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);

const renderPromotions = () => (
    <div className="space-y-6">
      {/* Header с поиском и кнопкой добавления */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Акции и скидки</h2>
        <button 
          onClick={() => setShowAddPromotion(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="h-4 w-4" />
          <span>Добавить акцию</span>
        </button>
      </div>
  
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Gift className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Всего акций</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Активные</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Запланированные</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Использований</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Фильтры и поиск */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск акций..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="scheduled">Запланированные</option>
            <option value="expired">Завершенные</option>
            <option value="draft">Черновики</option>
          </select>
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Все типы</option>
            <option value="discount">Скидка</option>
            <option value="package">Пакетное предложение</option>
            <option value="seasonal">Сезонная акция</option>
            <option value="loyalty">Программа лояльности</option>
          </select>
        </div>
      </div>
  
      {/* Список акций */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map(promotion => (
          <div key={promotion.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`h-2 ${
              promotion.status === 'active' ? 'bg-green-500' :
              promotion.status === 'scheduled' ? 'bg-yellow-500' :
              promotion.status === 'expired' ? 'bg-red-500' :
              'bg-gray-500'
            }`}></div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{promotion.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                  {getStatusText(promotion.status)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{promotion.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Скидка:</span>
                  <span className="font-semibold text-purple-600">{promotion.discount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Действует:</span>
                  <span className="text-gray-900">{promotion.validPeriod}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Использовано:</span>
                  <span className="text-gray-900">{promotion.usedCount} из {promotion.maxUses}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-purple-100 text-purple-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-200">
                  Редактировать
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="bg-red-100 text-red-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {/* Modal для добавления акции */}
      {showAddPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Создать новую акцию</h3>
              <button
                onClick={() => setShowAddPromotion(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
  
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название акции *
                  </label>
                  <input
                    type="text"
                    required
                    value={promotionForm.title}
                    onChange={(e) => setPromotionForm({...promotionForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Например: Скидка 20% на детские праздники"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип акции *
                  </label>
                  <select
                    required
                    value={promotionForm.type}
                    onChange={(e) => setPromotionForm({...promotionForm, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Выберите тип</option>
                    <option value="discount">Скидка</option>
                    <option value="package">Пакетное предложение</option>
                    <option value="seasonal">Сезонная акция</option>
                    <option value="loyalty">Программа лояльности</option>
                  </select>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Размер скидки *
                  </label>
                  <input
                    type="text"
                    required
                    value={promotionForm.discount}
                    onChange={(e) => setPromotionForm({...promotionForm, discount: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="20% или 10000 ₸"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Промокод
                  </label>
                  <input
                    type="text"
                    value={promotionForm.promoCode}
                    onChange={(e) => setPromotionForm({...promotionForm, promoCode: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="WINTER2025"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата начала *
                  </label>
                  <input
                    type="date"
                    required
                    value={promotionForm.startDate}
                    onChange={(e) => setPromotionForm({...promotionForm, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата окончания *
                  </label>
                  <input
                    type="date"
                    required
                    value={promotionForm.endDate}
                    onChange={(e) => setPromotionForm({...promotionForm, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Лимит использований
                  </label>
                  <input
                    type="number"
                    value={promotionForm.maxUses}
                    onChange={(e) => setPromotionForm({...promotionForm, maxUses: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус
                  </label>
                  <select
                    value={promotionForm.status}
                    onChange={(e) => setPromotionForm({...promotionForm, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Черновик</option>
                    <option value="scheduled">Запланировано</option>
                    <option value="active">Активно</option>
                  </select>
                </div>
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание акции
                </label>
                <textarea
                  value={promotionForm.description}
                  onChange={(e) => setPromotionForm({...promotionForm, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Подробное описание условий акции..."
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Условия использования
                </label>
                <textarea
                  value={promotionForm.conditions}
                  onChange={(e) => setPromotionForm({...promotionForm, conditions: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Минимальная сумма заказа, ограничения и т.д."
                />
              </div>
  
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={promotionForm.featured}
                  onChange={(e) => setPromotionForm({...promotionForm, featured: e.target.checked})}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Показывать на главной странице
                </label>
              </div>
  
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Сохранить акцию</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPromotion(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Настройки системы</h2>
        <button 
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          onClick={() => console.log('Сохранить все настройки')}
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
            {activeSettingsTab === 'company' && (
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
            )}
  
            {activeSettingsTab === 'social' && (
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
            )}
  
            {activeSettingsTab === 'notifications' && (
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
            )}
  
            {activeSettingsTab === 'seo' && (
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
            )}
  
            {activeSettingsTab === 'integration' && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
<header className="bg-white shadow-sm border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
        <h1 className="text-xl font-bold text-gray-900">Королевство Чудес</h1>
        <span className="text-sm text-gray-500">Админ-панель</span>
        <nav className="hidden md:flex items-center space-x-6 ml-8">
          <a 
            href="/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-purple-600 transition-colors flex items-center space-x-1"
          >
            <span>На сайт</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <MessageSquare className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {stats.newApplications}
          </span>
        </div>
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
          <span className="text-sm font-medium text-purple-600">А</span>
        </div>
      </div>
    </div>
  </div>
</header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;