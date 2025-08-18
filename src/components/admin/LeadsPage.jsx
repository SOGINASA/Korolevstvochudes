import React, { useState, useEffect } from 'react';
import { Search, Plus, Phone, Mail, Calendar, User, Package, Filter, Edit, Trash2, Eye, TrendingUp } from 'lucide-react';

const LeadsManagement = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'Алексей Петров',
      company: 'ООО "Технолоджи"',
      phone: '+7 (495) 123-45-67',
      email: 'petrov@technology.ru',
      status: 'hot',
      source: 'Сайт',
      lastContact: '2025-08-17',
      totalOrders: 3,
      totalValue: 450000,
      lastOrder: '2025-08-15',
      lastOrderValue: 150000,
      notes: 'Заинтересован в комплексном решении'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      company: 'ИП Иванова М.С.',
      phone: '+7 (495) 987-65-43',
      email: 'maria@example.com',
      status: 'warm',
      source: 'Реклама',
      lastContact: '2025-08-16',
      totalOrders: 1,
      totalValue: 75000,
      lastOrder: '2025-08-10',
      lastOrderValue: 75000,
      notes: 'Рассматривает несколько вариантов'
    },
    {
      id: 3,
      name: 'Дмитрий Козлов',
      company: 'Строй Мастер',
      phone: '+7 (495) 456-78-90',
      email: 'kozlov@stroymaster.ru',
      status: 'cold',
      source: 'Рекомендация',
      lastContact: '2025-08-12',
      totalOrders: 0,
      totalValue: 0,
      lastOrder: null,
      lastOrderValue: 0,
      notes: 'Первичный контакт'
    }
  ]);

  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    status: 'cold',
    source: '',
    notes: ''
  });

  const statusColors = {
    hot: 'bg-red-100 text-red-800 border-red-200',
    warm: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    cold: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const statusLabels = {
    hot: 'Горячий',
    warm: 'Тёплый',
    cold: 'Холодный'
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const addLead = () => {
    const id = Math.max(...leads.map(l => l.id)) + 1;
    setLeads([...leads, {
      ...newLead,
      id,
      totalOrders: 0,
      totalValue: 0,
      lastOrder: null,
      lastOrderValue: 0,
      lastContact: new Date().toISOString().split('T')[0]
    }]);
    setNewLead({
      name: '',
      company: '',
      phone: '',
      email: '',
      status: 'cold',
      source: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.status === 'hot').length;
  const totalRevenue = leads.reduce((sum, lead) => sum + lead.totalValue, 0);
  const avgOrderValue = totalRevenue / Math.max(leads.reduce((sum, lead) => sum + lead.totalOrders, 0), 1);

  // Кастомная иконка тенге в стиле Lucide
const TengeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    {/* Две верхние горизонтальные черты */}
    <path d="M4 6h16" />
    <path d="M4 9h16" />
    {/* Вертикальная ножка */}
    <path d="M12 9v10" />
  </svg>
);

  return (
    <div className="max-w-[90rem] mx-auto space-y-8">
      {/* Шапка / заголовок в стиле Blog */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 rounded-3xl p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 rounded-full bg-white/10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Управление лидами</h1>
            <p className="text-indigo-100">Поиск, фильтрация, просмотр и добавление лидов</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Добавить лида</span>
          </button>
        </div>
      </div>

      {/* Статистика — увеличенные карточки как в Blog */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative overflow-hidden bg-white rounded-2xl p-8 text-gray-900 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-blue-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{totalLeads}</div>
                <div className="text-sm text-gray-500">всего</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Всего лидов</h3>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white rounded-2xl p-8 text-gray-900 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-red-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-xl">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-red-600">{hotLeads}</div>
                <div className="text-sm text-gray-500">горячих</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Горячие лиды</h3>
          </div>
        </div>

        {/* Общая выручка */}
        <div className="relative overflow-hidden bg-white rounded-2xl p-8 text-gray-900 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <TengeIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600">
                {new Intl.NumberFormat('ru-RU').format(totalRevenue)} ₸
              </div>
              <div className="text-sm text-gray-500">общая выручка</div>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Выручка</h3>
        </div>

        <div className="relative overflow-hidden bg-white rounded-2xl p-8 text-gray-900 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 rounded-full bg-purple-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Package className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-purple-600">{Math.round(avgOrderValue).toLocaleString('ru-RU')} ₸</div>
                <div className="text-sm text-gray-500">средний заказ</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold">Средний чек</h3>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск — крупные поля как в Blog */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <Filter className="h-6 w-6 text-indigo-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Фильтры и поиск</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по имени, компании, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 appearance-none bg-white transition-all duration-300"
            >
              <option value="all">Все статусы</option>
              <option value="hot">Горячие</option>
              <option value="warm">Тёплые</option>
              <option value="cold">Холодные</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="h-5 w-5" />
            Добавить лида
          </button>
        </div>
      </div>

      {/* Список лидов — увеличенные ячейки таблицы как в Blog */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Лид</th>
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Контакты</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Статус</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Источник</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Заказы</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Выручка</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Последний контакт</th>
                <th className="px-8 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                  <td className="px-8 py-6">
                    <div>
                      <div className="text-base font-semibold text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-600">{lead.company}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="h-5 w-5 text-gray-500" />
                        {lead.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="h-5 w-5 text-gray-500" />
                        {lead.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold border ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center text-sm text-gray-700">
                    {lead.source}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="text-sm font-semibold text-gray-900">{lead.totalOrders}</div>
                    {lead.lastOrder && (
                      <div className="text-xs text-gray-500">
                        Последний: {new Date(lead.lastOrder).toLocaleDateString('ru-RU')}
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {lead.totalValue.toLocaleString('ru-RU')} ₸
                    </div>
                    {lead.lastOrderValue > 0 && (
                      <div className="text-xs text-gray-500">
                        Последний: {lead.lastOrderValue.toLocaleString('ru-RU')} ₸
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-center text-sm text-gray-700">
                    {new Date(lead.lastContact).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-all duration-200 transform hover:scale-110"
                        title="Просмотр"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {/* <button
                        className="p-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-200 transform hover:scale-110"
                        title="Редактировать"
                      >
                        <Edit className="h-5 w-5" />
                      </button> */}
                      <button
                        className="p-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-200 transform hover:scale-110"
                        title="Удалить"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
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

      {/* Модальное окно добавления лида — крупный размер как в Blog */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Добавить нового лида</h2>
                  <p className="text-indigo-100">Заполните информацию для нового контакта</p>
                </div>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                >
                  <Trash2 className="hidden" />
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Имя *</label>
                    <input
                      type="text"
                      value={newLead.name}
                      onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="Введите имя"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Компания</label>
                    <input
                      type="text"
                      value={newLead.company}
                      onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="Название компании"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Телефон *</label>
                    <input
                      type="tel"
                      value={newLead.phone}
                      onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email *</label>
                    <input
                      type="email"
                      value={newLead.email}
                      onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Статус</label>
                    <select
                      value={newLead.status}
                      onChange={(e) => setNewLead({...newLead, status: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    >
                      <option value="cold">Холодный</option>
                      <option value="warm">Тёплый</option>
                      <option value="hot">Горячий</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Источник</label>
                    <input
                      type="text"
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                      placeholder="Сайт, реклама, рекомендация..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Примечания</label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({...newLead, notes: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300"
                    placeholder="Дополнительная информация о лиде..."
                  />
                </div>
              </div>

              <div className="p-8 border-t border-gray-200 flex gap-4 justify-end">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
                >
                  Отмена
                </button>
                <button
                  onClick={addLead}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  Добавить лида
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно просмотра лида — крупный размер как в Blog */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                  <p className="text-indigo-100">{selectedLead.company}</p>
                </div>
                <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold border bg-white/10 ${statusColors[selectedLead.status]}`}>
                  {statusLabels[selectedLead.status]}
                </span>
              </div>
            </div>

            <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-160px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Контактная информация</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{selectedLead.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{selectedLead.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">
                        Последний контакт: {new Date(selectedLead.lastContact).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900">Статистика заказов</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Всего заказов:</span>
                      <span className="font-semibold text-gray-900">{selectedLead.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Общая сумма:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedLead.totalValue.toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                    {selectedLead.lastOrder && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Последний заказ:</span>
                          <span className="text-gray-900">
                            {new Date(selectedLead.lastOrder).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Сумма последнего:</span>
                          <span className="font-semibold text-gray-900">
                            {selectedLead.lastOrderValue.toLocaleString('ru-RU')} ₸
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Дополнительная информация</h3>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-600">Источник: </span>
                    <span className="text-sm text-gray-900">{selectedLead.source}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Примечания: </span>
                    <span className="text-sm text-gray-900">{selectedLead.notes || 'Нет примечаний'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-8 py-4 bg-gray-700 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 font-semibold"
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
