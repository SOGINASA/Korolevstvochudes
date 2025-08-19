import React, { useState, useEffect } from 'react';
import { Search, Plus, Phone, Mail, Calendar, User, Package, Filter, Edit, Trash2, Eye, TrendingUp, AlertTriangle, CheckCircle2, Clock, Star } from 'lucide-react';
import { apiService } from '../../services/api';

const LeadsManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [perPage] = useState(20);

  // Фильтры и поиск
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [temperatureFilter, setTemperatureFilter] = useState('all');
  const [assignedToFilter, setAssignedToFilter] = useState('all');

  // Модальные окна
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  // Статистика
  const [stats, setStats] = useState({
    total: 0,
    hot: 0,
    warm: 0,
    cold: 0,
    converted: 0,
    avgQualityScore: 0
  });

  // Константы
  const [constants, setConstants] = useState({
    statuses: [],
    sources: [],
    temperatures: [],
    status_labels: {},
    source_labels: {},
    temperature_labels: {}
  });

  // Форма нового лида
  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    email: '',
    source: 'website',
    event_type: '',
    preferred_budget: '',
    guests_count: '',
    location_preference: '',
    preferred_date: '',
    status: 'new',
    temperature: 'cold',
    preferred_contact_method: 'phone',
    notes: '',
    birthday: '',
    age: '',
    gender: '',
    referrer: '',
    interested_services: [],
    tags: []
  });

  // Форма контакта
  const [contactForm, setContactForm] = useState({
    result: '',
    notes: '',
    contact_date: new Date().toISOString().slice(0, 16)
  });

  const statusColors = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    interested: 'bg-green-100 text-green-800 border-green-200',
    qualified: 'bg-purple-100 text-purple-800 border-purple-200',
    converted: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    lost: 'bg-red-100 text-red-800 border-red-200'
  };

  const temperatureColors = {
    hot: 'bg-red-100 text-red-800 border-red-200',
    warm: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    cold: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  // Кастомная иконка тенге
  const TengeIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <path d="M4 6h16" />
      <path d="M4 9h16" />
      <path d="M12 9v10" />
    </svg>
  );

  // Загрузка данных при монтировании
  useEffect(() => {
    loadConstants();
    loadLeads();
    loadStats();
  }, []);

  // Перезагрузка при изменении фильтров или страницы
  useEffect(() => {
    loadLeads();
  }, [currentPage, searchTerm, statusFilter, sourceFilter, temperatureFilter, assignedToFilter]);

  const loadConstants = async () => {
    try {
      const result = await apiService.getLeadConstants();
      if (result.success) {
        setConstants(result.constants);
      }
    } catch (error) {
      console.error('Error loading constants:', error);
    }
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        per_page: perPage,
        search: searchTerm || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        source: sourceFilter !== 'all' ? sourceFilter : undefined,
        temperature: temperatureFilter !== 'all' ? temperatureFilter : undefined,
        assigned_to: assignedToFilter !== 'all' ? assignedToFilter : undefined
      };

      // Удаляем undefined значения
      Object.keys(params).forEach(key => 
        params[key] === undefined && delete params[key]
      );

      const result = await apiService.getLeads(params);
      if (result.success) {
        setLeads(result.leads || []);
        setTotalPages(result.pagination?.pages || 1);
        setTotalLeads(result.pagination?.total || 0);
        setCurrentPage(result.pagination?.page || 1);
      } else {
        setError(result.error || 'Ошибка при загрузке лидов');
      }
    } catch (error) {
      setError('Ошибка при загрузке лидов');
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await apiService.getLeadsStats(30);
      if (result.success && result.stats) {
        const statsData = result.stats;
        setStats({
          total: statsData.total || 0,
          converted: statsData.converted || 0,
          hot: statsData.temperatures?.find(t => t.temperature === 'hot')?.count || 0,
          warm: statsData.temperatures?.find(t => t.temperature === 'warm')?.count || 0,
          cold: statsData.temperatures?.find(t => t.temperature === 'cold')?.count || 0,
          avgQualityScore: Math.round(leads.reduce((sum, lead) => sum + (lead.quality_score || 0), 0) / Math.max(leads.length, 1))
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const addLead = async () => {
    if (!newLead.name.trim() || !newLead.phone.trim()) {
      setError('Имя и телефон обязательны');
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.createLead(newLead);
      if (result.success) {
        setSuccess('Лид успешно создан');
        setShowAddForm(false);
        resetNewLead();
        loadLeads();
        loadStats();
      } else {
        setError(result.error || 'Ошибка при создании лида');
      }
    } catch (error) {
      setError('Ошибка при создании лида');
      console.error('Error creating lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async () => {
    if (!selectedLead || !selectedLead.name.trim() || !selectedLead.phone.trim()) {
      setError('Имя и телефон обязательны');
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.updateLead(selectedLead.id, selectedLead);
      if (result.success) {
        setSuccess('Лид успешно обновлен');
        setShowEditForm(false);
        setSelectedLead(null);
        loadLeads();
        loadStats();
      } else {
        setError(result.error || 'Ошибка при обновлении лида');
      }
    } catch (error) {
      setError('Ошибка при обновлении лида');
      console.error('Error updating lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (leadId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого лида?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.deleteLead(leadId);
      if (result.success) {
        setSuccess('Лид успешно удален');
        loadLeads();
        loadStats();
      } else {
        setError(result.error || 'Ошибка при удалении лида');
      }
    } catch (error) {
      setError('Ошибка при удалении лида');
      console.error('Error deleting lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const addContactRecord = async () => {
    if (!contactForm.result) {
      setError('Выберите результат контакта');
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.addContactRecord(selectedLead.id, contactForm);
      if (result.success) {
        setSuccess('Запись о контакте добавлена');
        setShowContactForm(false);
        setContactForm({ result: '', notes: '', contact_date: new Date().toISOString().slice(0, 16) });
        loadLeads();
      } else {
        setError(result.error || 'Ошибка при добавлении записи о контакте');
      }
    } catch (error) {
      setError('Ошибка при добавлении записи о контакте');
      console.error('Error adding contact record:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertToBooking = async (leadId) => {
    if (!window.confirm('Конвертировать лида в заявку?')) {
      return;
    }

    setLoading(true);
    try {
      const result = await apiService.convertLeadToBooking(leadId);
      if (result.success) {
        setSuccess('Лид успешно конвертирован в заявку');
        loadLeads();
        loadStats();
      } else {
        setError(result.error || 'Ошибка при конверсии лида');
      }
    } catch (error) {
      setError('Ошибка при конверсии лида');
      console.error('Error converting lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetNewLead = () => {
    setNewLead({
      name: '',
      phone: '',
      email: '',
      source: 'website',
      event_type: '',
      preferred_budget: '',
      guests_count: '',
      location_preference: '',
      preferred_date: '',
      status: 'new',
      temperature: 'cold',
      preferred_contact_method: 'phone',
      notes: '',
      birthday: '',
      age: '',
      gender: '',
      referrer: '',
      interested_services: [],
      tags: []
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const getQualityScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-[90rem] mx-auto space-y-4 lg:space-y-8 px-4 lg:px-0">
      {/* Уведомления */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {error}
          </div>
          <button onClick={clearMessages} className="text-red-700 hover:text-red-900">×</button>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            {success}
          </div>
          <button onClick={clearMessages} className="text-green-700 hover:text-green-900">×</button>
        </div>
      )}

      {/* Шапка */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 rounded-2xl lg:rounded-3xl p-4 lg:p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold mb-2">Управление лидами</h1>
            <p className="text-indigo-100 text-sm lg:text-base">Отслеживание и управление потенциальными клиентами</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            className="bg-white text-indigo-700 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-sm lg:text-base w-full lg:w-auto justify-center disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            <span>Добавить лида</span>
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-6">
        <div className="relative overflow-hidden bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 text-gray-900 shadow-md lg:shadow-xl border border-gray-100">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-blue-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-xl lg:text-4xl font-bold">{stats.total}</div>
                <div className="text-xs lg:text-sm text-gray-500">всего</div>
              </div>
            </div>
            <h3 className="text-sm lg:text-lg font-semibold">Всего лидов</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 text-gray-900 shadow-md lg:shadow-xl border border-gray-100">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-red-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-right">
                <div className="text-xl lg:text-4xl font-bold text-red-600">{stats.hot}</div>
                <div className="text-xs lg:text-sm text-gray-500">горячих</div>
              </div>
            </div>
            <h3 className="text-sm lg:text-lg font-semibold">Горячие лиды</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 text-gray-900 shadow-md lg:shadow-xl border border-gray-100">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-yellow-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-right">
                <div className="text-xl lg:text-4xl font-bold text-yellow-600">{stats.warm}</div>
                <div className="text-xs lg:text-sm text-gray-500">теплых</div>
              </div>
            </div>
            <h3 className="text-sm lg:text-lg font-semibold">Теплые лиды</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 text-gray-900 shadow-md lg:shadow-xl border border-gray-100">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-green-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-xl lg:text-4xl font-bold text-green-600">{stats.converted}</div>
                <div className="text-xs lg:text-sm text-gray-500">конвертированы</div>
              </div>
            </div>
            <h3 className="text-sm lg:text-lg font-semibold">Конверсии</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-xl lg:rounded-2xl p-4 lg:p-8 text-gray-900 shadow-md lg:shadow-xl border border-gray-100">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-purple-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-right">
                <div className="text-xl lg:text-4xl font-bold text-purple-600">{stats.avgQualityScore}</div>
                <div className="text-xs lg:text-sm text-gray-500">ср. качество</div>
              </div>
            </div>
            <h3 className="text-sm lg:text-lg font-semibold">Качество лидов</h3>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-md lg:shadow-xl p-4 lg:p-8">
        <div className="flex items-center mb-6">
          <Filter className="h-6 w-6 text-indigo-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Фильтры и поиск</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 lg:gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, телефону, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl lg:rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-sm lg:text-base"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-3 lg:pl-4 pr-8 lg:pr-10 py-3 lg:py-4 border-2 border-gray-200 rounded-xl lg:rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 appearance-none bg-white transition-all duration-300 text-sm lg:text-base"
          >
            <option value="all">Все статусы</option>
            {constants.statuses.map(status => (
              <option key={status} value={status}>
                {constants.status_labels[status] || status}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="pl-3 lg:pl-4 pr-8 lg:pr-10 py-3 lg:py-4 border-2 border-gray-200 rounded-xl lg:rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 appearance-none bg-white transition-all duration-300 text-sm lg:text-base"
          >
            <option value="all">Все источники</option>
            {constants.sources.map(source => (
              <option key={source} value={source}>
                {constants.source_labels[source] || source}
              </option>
            ))}
          </select>

          <select
            value={temperatureFilter}
            onChange={(e) => setTemperatureFilter(e.target.value)}
            className="pl-3 lg:pl-4 pr-8 lg:pr-10 py-3 lg:py-4 border-2 border-gray-200 rounded-xl lg:rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 appearance-none bg-white transition-all duration-300 text-sm lg:text-base"
          >
            <option value="all">Все температуры</option>
            {constants.temperatures.map(temp => (
              <option key={temp} value={temp}>
                {constants.temperature_labels[temp] || temp}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
          >
            <Plus className="h-5 w-5" />
            Добавить лида
          </button>
        </div>
      </div>

      {/* Список лидов */}
      <div className="bg-white rounded-2xl lg:rounded-3xl shadow-md lg:shadow-xl border border-gray-100 overflow-hidden">
        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка лидов...</p>
          </div>
        )}

        {!loading && (
          <div className="overflow-x-auto">
            {/* Мобильная версия - карточки */}
            <div className="block lg:hidden">
              {leads.map((lead) => (
                <div key={lead.id} className="border-b border-gray-100 p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{lead.name}</h3>
                      <p className="text-xs text-gray-600">{lead.phone}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[lead.status]}`}>
                        {constants.status_labels[lead.status] || lead.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold border ${temperatureColors[lead.temperature]}`}>
                        {constants.temperature_labels[lead.temperature] || lead.temperature}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {lead.email && (
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <Mail className="h-3 w-3 text-gray-500" />
                        {lead.email}
                      </div>
                    )}
                    {lead.preferred_budget && (
                      <div className="text-xs text-gray-600">
                        Бюджет: {lead.preferred_budget}
                      </div>
                    )}
                    {lead.quality_score && (
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className={getQualityScoreColor(lead.quality_score)}>
                          {lead.quality_score}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <span>{constants.source_labels[lead.source] || lead.source}</span>
                    <span>{new Date(lead.created_at).toLocaleDateString('ru-RU')}</span>
                  </div>
                  
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowContactForm(true);
                      }}
                      className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowEditForm(true);
                      }}
                      className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    {lead.status !== 'converted' && (
                      <button
                        onClick={() => convertToBooking(lead.id)}
                        className="p-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                        title="Конвертировать в заявку"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {leads.length === 0 && !loading && (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-base font-semibold text-gray-500 mb-2">Лиды не найдены</p>
                  <p className="text-sm text-gray-400">Попробуйте изменить фильтры или добавьте нового лида</p>
                </div>
              )}
            </div>

            {/* Десктопная версия - таблица */}
            <div className="hidden lg:block">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Лид</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Контакты</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Статус</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Температура</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Источник</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Качество</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Дата создания</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Действия</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                      <td className="px-8 py-6">
                        <div>
                          <div className="text-base font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-600">{lead.event_type && `${lead.event_type} • `}{lead.preferred_budget}</div>
                          {lead.guests_count && (
                            <div className="text-xs text-gray-500">Гостей: {lead.guests_count}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="h-4 w-4 text-gray-500 mr-2" />
                            {lead.phone}
                          </div>
                          {lead.email && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 text-gray-500 mr-2" />
                              {lead.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold border ${statusColors[lead.status]}`}>
                          {constants.status_labels[lead.status] || lead.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold border ${temperatureColors[lead.temperature]}`}>
                          {constants.temperature_labels[lead.temperature] || lead.temperature}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center text-sm text-gray-700">
                        {constants.source_labels[lead.source] || lead.source}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex items-center justify-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className={`text-sm font-semibold ${getQualityScoreColor(lead.quality_score || 0)}`}>
                            {lead.quality_score || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center text-sm text-gray-700">
                        {new Date(lead.created_at).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-all duration-200 transform hover:scale-110"
                            title="Просмотр"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowContactForm(true);
                            }}
                            className="p-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-200 transform hover:scale-110"
                            title="Добавить контакт"
                          >
                            <Phone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowEditForm(true);
                            }}
                            className="p-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-200 transform hover:scale-110"
                            title="Редактировать"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          {lead.status !== 'converted' && (
                            <button
                              onClick={() => convertToBooking(lead.id)}
                              className="p-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all duration-200 transform hover:scale-110"
                              title="Конвертировать в заявку"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 transform hover:scale-110"
                            title="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && !loading && (
                    <tr>
                      <td colSpan="8" className="px-8 py-16 text-center">
                        <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-xl font-semibold text-gray-500 mb-2">Лиды не найдены</p>
                        <p className="text-gray-400">Попробуйте изменить фильтры или добавьте нового лида</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="px-8 py-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Показано {leads.length} из {totalLeads} лидов
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Назад
                </button>
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const page = i + Math.max(1, currentPage - 2);
                  if (page > totalPages) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Вперед
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Модальное окно добавления лида */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 lg:p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Добавить нового лида</h2>
                  <p className="text-indigo-100">Заполните информацию для нового контакта</p>
                </div>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetNewLead();
                  }}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-4 lg:p-8 space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
                    <input
                      type="text"
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="Введите имя"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Источник</label>
                    <select
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    >
                      {constants.sources.map(source => (
                        <option key={source} value={source}>
                          {constants.source_labels[source] || source}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                    <select
                      value={newLead.status}
                      onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    >
                      {constants.statuses.map(status => (
                        <option key={status} value={status}>
                          {constants.status_labels[status] || status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Температура</label>
                    <select
                      value={newLead.temperature}
                      onChange={(e) => setNewLead({...newLead, temperature: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    >
                      {constants.temperatures.map(temp => (
                        <option key={temp} value={temp}>
                          {constants.temperature_labels[temp] || temp}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип события</label>
                    <input
                      type="text"
                      value={newLead.event_type}
                      onChange={(e) => setNewLead({...newLead, event_type: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="День рождения, свадьба..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Бюджет</label>
                    <input
                      type="text"
                      value={newLead.preferred_budget}
                      onChange={(e) => setNewLead({...newLead, preferred_budget: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="100,000 ₸"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Количество гостей</label>
                    <input
                      type="number"
                      value={newLead.guests_count}
                      onChange={(e) => setNewLead({...newLead, guests_count: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Предпочитаемая дата</label>
                    <input
                      type="date"
                      value={newLead.preferred_date}
                      onChange={(e) => setNewLead({...newLead, preferred_date: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Место проведения</label>
                  <input
                    type="text"
                    value={newLead.location_preference}
                    onChange={(e) => setNewLead({...newLead, location_preference: e.target.value})}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Дома, в кафе, в парке..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Примечания</label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Дополнительная информация о лиде..."
                  />
                </div>
              </div>

              <div className="p-4 lg:p-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3 lg:gap-4 justify-end">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetNewLead();
                  }}
                  disabled={loading}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold disabled:opacity-50"
                >
                  Отмена
                </button>
                <button
                  onClick={addLead}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? 'Создание...' : 'Добавить лида'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно редактирования лида */}
{showEditForm && selectedLead && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Редактировать лида</h2>
            <p className="text-blue-100">Изменение информации о контакте</p>
          </div>
          <button
            onClick={() => {
              setShowEditForm(false);
              setSelectedLead(null);
            }}
            className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
        <div className="p-4 lg:p-8 space-y-4 lg:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
              <input
                type="text"
                value={selectedLead.name}
                onChange={(e) => setSelectedLead({...selectedLead, name: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="Введите имя"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Телефон *</label>
              <input
                type="tel"
                value={selectedLead.phone}
                onChange={(e) => setSelectedLead({...selectedLead, phone: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={selectedLead.email || ''}
                onChange={(e) => setSelectedLead({...selectedLead, email: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Источник</label>
              <select
                value={selectedLead.source}
                onChange={(e) => setSelectedLead({...selectedLead, source: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              >
                {constants.sources.map(source => (
                  <option key={source} value={source}>
                    {constants.source_labels[source] || source}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select
                value={selectedLead.status}
                onChange={(e) => setSelectedLead({...selectedLead, status: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              >
                {constants.statuses.map(status => (
                  <option key={status} value={status}>
                    {constants.status_labels[status] || status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Температура</label>
              <select
                value={selectedLead.temperature}
                onChange={(e) => setSelectedLead({...selectedLead, temperature: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              >
                {constants.temperatures.map(temp => (
                  <option key={temp} value={temp}>
                    {constants.temperature_labels[temp] || temp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Тип события</label>
              <input
                type="text"
                value={selectedLead.event_type || ''}
                onChange={(e) => setSelectedLead({...selectedLead, event_type: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="День рождения, свадьба..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Бюджет</label>
              <input
                type="text"
                value={selectedLead.preferred_budget || ''}
                onChange={(e) => setSelectedLead({...selectedLead, preferred_budget: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="100,000 ₸"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Количество гостей</label>
              <input
                type="number"
                value={selectedLead.guests_count || ''}
                onChange={(e) => setSelectedLead({...selectedLead, guests_count: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Предпочитаемая дата</label>
              <input
                type="date"
                value={selectedLead.preferred_date || ''}
                onChange={(e) => setSelectedLead({...selectedLead, preferred_date: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Место проведения</label>
            <input
              type="text"
              value={selectedLead.location_preference || ''}
              onChange={(e) => setSelectedLead({...selectedLead, location_preference: e.target.value})}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              placeholder="Дома, в кафе, в парке..."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Возраст</label>
              <input
                type="number"
                value={selectedLead.age || ''}
                onChange={(e) => setSelectedLead({...selectedLead, age: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Пол</label>
              <select
                value={selectedLead.gender || ''}
                onChange={(e) => setSelectedLead({...selectedLead, gender: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Не указан</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">День рождения</label>
              <input
                type="date"
                value={selectedLead.birthday || ''}
                onChange={(e) => setSelectedLead({...selectedLead, birthday: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Предпочитаемый способ связи</label>
              <select
                value={selectedLead.preferred_contact_method || 'phone'}
                onChange={(e) => setSelectedLead({...selectedLead, preferred_contact_method: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              >
                <option value="phone">Телефон</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Кто рекомендовал</label>
              <input
                type="text"
                value={selectedLead.referrer || ''}
                onChange={(e) => setSelectedLead({...selectedLead, referrer: e.target.value})}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                placeholder="Имя или источник рекомендации"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Примечания</label>
            <textarea
              value={selectedLead.notes || ''}
              onChange={(e) => setSelectedLead({...selectedLead, notes: e.target.value})}
              rows={4}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              placeholder="Дополнительная информация о лиде..."
            />
          </div>
        </div>

        <div className="p-4 lg:p-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3 lg:gap-4 justify-end">
          <button
            onClick={() => {
              setShowEditForm(false);
              setSelectedLead(null);
            }}
            disabled={loading}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold disabled:opacity-50"
          >
            Отмена
          </button>
          <button
            onClick={updateLead}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Модальное окно добавления контакта */}
      {showContactForm && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-2xl mx-4">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 lg:p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Добавить контакт</h2>
                  <p className="text-green-100">Лид: {selectedLead.name}</p>
                </div>
                <button
                  onClick={() => {
                    setShowContactForm(false);
                    setContactForm({ result: '', notes: '', contact_date: new Date().toISOString().slice(0, 16) });
                  }}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>
            </div>

            <div className="p-4 lg:p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Результат контакта *</label>
                <select
                  value={contactForm.result}
                  onChange={(e) => setContactForm({...contactForm, result: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                >
                  <option value="">Выберите результат</option>
                  <option value="answered">Ответил</option>
                  <option value="no_answer">Не ответил</option>
                  <option value="interested">Заинтересован</option>
                  <option value="not_interested">Не заинтересован</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Дата и время контакта</label>
                <input
                  type="datetime-local"
                  value={contactForm.contact_date}
                  onChange={(e) => setContactForm({...contactForm, contact_date: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Заметки</label>
                <textarea
                  value={contactForm.notes}
                  onChange={(e) => setContactForm({...contactForm, notes: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                  placeholder="Что обсуждали, какие договоренности..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-end">
                <button
                  onClick={() => {
                    setShowContactForm(false);
                    setContactForm({ result: '', notes: '', contact_date: new Date().toISOString().slice(0, 16) });
                  }}
                  disabled={loading}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold disabled:opacity-50"
                >
                  Отмена
                </button>
                <button
                  onClick={addContactRecord}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? 'Добавление...' : 'Добавить контакт'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно просмотра лида */}
      {selectedLead && !showEditForm && !showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
            <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                  <p className="text-indigo-100">{selectedLead.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold border ${statusColors[selectedLead.status]} bg-white/10`}>
                    {constants.status_labels[selectedLead.status] || selectedLead.status}
                  </span>
                  <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold border ${temperatureColors[selectedLead.temperature]} bg-white/10`}>
                    {constants.temperature_labels[selectedLead.temperature] || selectedLead.temperature}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Контактная информация</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-base text-gray-900">{selectedLead.phone}</span>
                    </div>
                    {selectedLead.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-base text-gray-900">{selectedLead.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-base text-gray-900">
                        Создан: {new Date(selectedLead.created_at).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    {selectedLead.last_contact_date && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-base text-gray-900">
                          Последний контакт: {new Date(selectedLead.last_contact_date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Информация о событии</h3>
                  <div className="space-y-3">
                    {selectedLead.event_type && (
                      <div className="flex justify-between">
                        <span className="text-base text-gray-600">Тип события:</span>
                        <span className="text-base font-semibold text-gray-900">{selectedLead.event_type}</span>
                      </div>
                    )}
                    {selectedLead.preferred_budget && (
                      <div className="flex justify-between">
                        <span className="text-base text-gray-600">Бюджет:</span>
                        <span className="text-base font-semibold text-gray-900">{selectedLead.preferred_budget}</span>
                      </div>
                    )}
                    {selectedLead.guests_count && (
                      <div className="flex justify-between">
                        <span className="text-base text-gray-600">Количество гостей:</span>
                        <span className="text-base font-semibold text-gray-900">{selectedLead.guests_count}</span>
                      </div>
                    )}
                    {selectedLead.preferred_date && (
                      <div className="flex justify-between">
                        <span className="text-base text-gray-600">Предпочитаемая дата:</span>
                        <span className="text-base font-semibold text-gray-900">
                          {new Date(selectedLead.preferred_date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    )}
                    {selectedLead.location_preference && (
                      <div className="flex justify-between">
                        <span className="text-base text-gray-600">Место:</span>
                        <span className="text-base font-semibold text-gray-900">{selectedLead.location_preference}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Дополнительная информация</h3>
                <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Источник: </span>
                      <span className="text-sm text-gray-900">{constants.source_labels[selectedLead.source] || selectedLead.source}</span>
                    </div>
                    {selectedLead.quality_score && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Качество лида: </span>
                        <span className={`text-sm font-semibold ${getQualityScoreColor(selectedLead.quality_score)}`}>
                          {selectedLead.quality_score}%
                        </span>
                      </div>
                    )}
                  </div>
                  {selectedLead.notes && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Примечания: </span>
                      <div className="text-sm text-gray-900 mt-2 whitespace-pre-wrap">{selectedLead.notes}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowContactForm(true);
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Добавить контакт
                </button>
                <button
                  onClick={() => {
                    setShowEditForm(true);
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Редактировать
                </button>
                {selectedLead.status !== 'converted' && (
                  <button
                    onClick={() => convertToBooking(selectedLead.id)}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Конвертировать
                  </button>
                )}
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-8 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsManagement;