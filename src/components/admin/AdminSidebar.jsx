import React from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  Image, 
  Star, 
  PenTool, 
  Gift, 
  Settings, 
  Users,
  Sparkles,
  Package // Добавить импорт
} from 'lucide-react';

const AdminSidebar = ({ admin, activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Дашборд' },
    { id: 'applications', icon: MessageSquare, label: 'Заявки' },
    { id: 'warehouse', icon: Package, label: 'Склад' }, // Добавить эту строку
    { id: 'portfolio', icon: Image, label: 'Портфолио' },
    { id: 'reviews', icon: Star, label: 'Отзывы' },
    { id: 'blog', icon: PenTool, label: 'Блог' },
    { id: 'services', icon: Sparkles, label: 'Услуги' },
    ...(admin?.role === 'super_admin' || admin?.role === 'admin' 
      ? [{ id: 'admins', icon: Users, label: 'Администраторы' }] 
      : []),
    { id: 'settings', icon: Settings, label: 'Настройки' }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm h-[calc(100vh)] sticky top-16">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
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
  );
};

export default AdminSidebar;