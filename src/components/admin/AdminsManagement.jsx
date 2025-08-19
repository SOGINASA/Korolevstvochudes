// components/admin/AdminsManagement.js - Полная адаптивная версия
import React, { useState } from 'react';
import { Plus, User, Edit, Trash2, Save, X, Shield } from 'lucide-react';
import { formatDate, adminRoles, validateEmail, validatePassword } from '../../utils/helpers';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/api';
import Applications from './Applications';

const AdminsManagement = ({ 
  admin, 
  admins, 
  onLoadAdmins, 
  showNotification,
  // Пропсы для Applications
  recentApplications,
  loadingBookings,
  bookingsPagination,
  onUpdateBookingStatus,
  onDeleteBooking,
  onBulkDeleteBookings,
  onExportBookings,
  onBookingsPageChange,
  onLoadBookings
}) => {
  const { register } = useAuth();
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [activeTab, setActiveTab] = useState('admins');
  
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    role: 'admin',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const resetAdminForm = () => {
    setAdminForm({
      name: '',
      email: '',
      role: 'admin',
      password: '',
      confirmPassword: ''
    });
    setEditingAdmin(null);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (!adminForm.name.trim()) {
      errors.name = 'Имя обязательно';
    }

    if (!adminForm.email.trim()) {
      errors.email = 'Email обязателен';
    } else if (!validateEmail(adminForm.email)) {
      errors.email = 'Некорректный email';
    }

    if (!editingAdmin && !adminForm.password) {
      errors.password = 'Пароль обязателен';
    } else if (adminForm.password && !validatePassword(adminForm.password)) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (adminForm.password && adminForm.password !== adminForm.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editingAdmin) {
        const result = await apiService.updateAdmin(editingAdmin.id, {
          name: adminForm.name,
          email: adminForm.email,
          role: adminForm.role,
          ...(adminForm.password && { password: adminForm.password })
        });
        
        if (result.success) {
          await onLoadAdmins();
          showNotification('Администратор обновлен', 'success');
        } else {
          throw new Error(result.error);
        }
      } else {
        const result = await register(adminForm);
        
        if (result.success) {
          await onLoadAdmins();
          showNotification('Администратор создан', 'success');
        } else {
          throw new Error(result.error || 'Ошибка создания администратора');
        }
      }
      
      setShowAddAdmin(false);
      resetAdminForm();
    } catch (error) {
      showNotification(error.message || 'Ошибка при сохранении данных администратора', 'error');
      console.error('Admin form error:', error);
    }
  };

  const handleEditAdmin = (adminItem) => {
    setEditingAdmin(adminItem);
    setAdminForm({
      name: adminItem.name,
      email: adminItem.email,
      role: adminItem.role,
      password: '',
      confirmPassword: ''
    });
    setShowAddAdmin(true);
  };

  const handleDeleteAdmin = (adminId) => {
    if (adminId === admin.id) {
      showNotification('Нельзя удалить самого себя', 'warning');
      return;
    }
    setConfirmDeleteId(adminId);
  };

  const confirmDeletion = async () => {
    try {
      const result = await apiService.deleteAdmin(confirmDeleteId);
      if (result.success) {
        await onLoadAdmins();
        showNotification('Администратор удален', 'success');
      } else {
        throw new Error('Не удалось удалить администратора');
      }
    } catch (error) {
      console.error('Delete admin error:', error);
      showNotification('Ошибка при удалении администратора', 'error');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const getRoleLabel = (role) => {
    const roleObj = adminRoles.find(r => r.value === role);
    return roleObj ? roleObj.label : role;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'editor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const canManageAdmin = (targetAdmin) => {
    if (admin.role === 'super_admin') return true;
    if (admin.role === 'admin' && targetAdmin.role !== 'super_admin') return true;
    return false;
  };

  const onUpdateBooking = async (bookingId, updateData) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        throw new Error('Ошибка обновления заявки');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Ошибка:', error);
      throw error;
    }
  };
  
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* ТАБЫ ДЛЯ ПЕРЕКЛЮЧЕНИЯ МЕЖДУ АДМИНАМИ И ЗАЯВКАМИ */}
      <div className="flex space-x-2 lg:space-x-4 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('admins')}
          className={`px-3 lg:px-4 py-2 font-medium text-sm lg:text-base whitespace-nowrap ${
            activeTab === 'admins' 
              ? 'text-purple-600 border-b-2 border-purple-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Администраторы
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-3 lg:px-4 py-2 font-medium text-sm lg:text-base whitespace-nowrap ${
            activeTab === 'applications' 
              ? 'text-purple-600 border-b-2 border-purple-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Заявки
        </button>
      </div>

      {/* СОДЕРЖИМОЕ ТАБОВ */}
      {activeTab === 'admins' ? (
        // ТАБ АДМИНИСТРАТОРОВ
        <>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Управление администраторами</h2>
            {(admin?.role === 'super_admin' || admin?.role === 'admin') && (
              <button 
                onClick={() => setShowAddAdmin(true)}
                className="flex items-center justify-center space-x-2 px-3 lg:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm lg:text-base w-full lg:w-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Добавить администратора</span>
              </button>
            )}
          </div>

          {/* Мобильная версия - карточки */}
          <div className="block lg:hidden space-y-4">
            {admins.map(adminItem => (
              <div key={adminItem.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {adminItem.name}
                        {adminItem.id === admin.id && (
                          <span className="ml-1 text-xs text-purple-600">(Вы)</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{adminItem.email}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(adminItem.role)}`}>
                    {getRoleLabel(adminItem.role)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Последний вход:</span>
                    <span className="text-gray-900">
                      {adminItem.last_login ? formatDate(adminItem.last_login) : 'Никогда'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Статус:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      adminItem.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {adminItem.active ? 'Активен' : 'Заблокирован'}
                    </span>
                  </div>
                </div>

                {canManageAdmin(adminItem) && (
                  <div className="flex space-x-2 pt-3 border-t border-gray-100">
                    <button 
                      onClick={() => handleEditAdmin(adminItem)}
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 text-sm"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Редактировать</span>
                    </button>
                    {adminItem.id !== admin.id && (
                      <button 
                        onClick={() => handleDeleteAdmin(adminItem.id)}
                        className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Десктопная версия - таблица */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Администратор
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Роль
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Последний вход
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {admins.map(adminItem => (
                    <tr key={adminItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                            <User className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {adminItem.name}
                              {adminItem.id === admin.id && (
                                <span className="ml-2 text-xs text-purple-600">(Вы)</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{adminItem.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(adminItem.role)}`}>
                          {getRoleLabel(adminItem.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {adminItem.last_login ? formatDate(adminItem.last_login) : 'Никогда'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          adminItem.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {adminItem.active ? 'Активен' : 'Заблокирован'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {canManageAdmin(adminItem) && (
                            <>
                              <button 
                                onClick={() => handleEditAdmin(adminItem)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Редактировать"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              {adminItem.id !== admin.id && (
                                <button 
                                  onClick={() => handleDeleteAdmin(adminItem.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Удалить"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        // ТАБ ЗАЯВОК
        <Applications
          recentApplications={recentApplications}
          loadingBookings={loadingBookings}
          bookingsPagination={bookingsPagination}
          onUpdateBookingStatus={onUpdateBookingStatus}
          onDeleteBooking={onDeleteBooking}
          onBulkDeleteBookings={onBulkDeleteBookings}
          onExportBookings={onExportBookings}
          onBookingsPageChange={onBookingsPageChange}
          onLoadBookings={onLoadBookings}
          onUpdateBooking={onUpdateBooking}
          showNotification={showNotification}
        />
      )}

      {/* Modal для добавления/редактирования администратора */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                {editingAdmin ? 'Редактировать администратора' : 'Добавить администратора'}
              </h3>
              <button
                onClick={() => { setShowAddAdmin(false); resetAdminForm(); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5 lg:h-6 lg:w-6" />
              </button>
            </div>

            <form onSubmit={handleAdminSubmit} className="p-4 lg:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Полное имя *
                </label>
                <input
                  type="text"
                  required
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({...adminForm, name: e.target.value})}
                  className={`w-full px-3 lg:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base ${
                    formErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Имя администратора"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({...adminForm, email: e.target.value})}
                  className={`w-full px-3 lg:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base ${
                    formErrors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="admin@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Роль *
                </label>
                <select
                  required
                  value={adminForm.role}
                  onChange={(e) => setAdminForm({...adminForm, role: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base"
                >
                  {adminRoles.map(role => {
                    if (role.value === 'super_admin' && admin.role !== 'super_admin') {
                      return null;
                    }
                    return (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Пароль {editingAdmin ? '(оставьте пустым для сохранения текущего)' : '*'}
                </label>
                <input
                  type="password"
                  required={!editingAdmin}
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                  className={`w-full px-3 lg:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base ${
                    formErrors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Минимум 6 символов"
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Подтвердите пароль {editingAdmin ? '(если меняете пароль)' : '*'}
                </label>
                <input
                  type="password"
                  required={!editingAdmin && adminForm.password}
                  value={adminForm.confirmPassword}
                  onChange={(e) => setAdminForm({...adminForm, confirmPassword: e.target.value})}
                  className={`w-full px-3 lg:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm lg:text-base ${
                    formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Повторите пароль"
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 px-4 lg:px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2 text-sm lg:text-base"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingAdmin ? 'Обновить' : 'Создать'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddAdmin(false); resetAdminForm(); }}
                  className="px-4 lg:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm lg:text-base"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения удаления */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg lg:rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-4 lg:p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Подтверждение удаления</h3>
              </div>
              <p className="text-sm lg:text-base text-gray-700 mb-6">
                Вы уверены, что хотите удалить этого администратора? Это действие нельзя отменить.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={confirmDeletion}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 text-sm lg:text-base"
                >
                  Удалить
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm lg:text-base"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminsManagement;