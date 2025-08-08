// components/admin/AdminHeader.js
import React from 'react';
import { MessageSquare, User } from 'lucide-react';

const AdminHeader = ({ admin, stats }) => {
  return (
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
              {stats.newApplications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {stats.newApplications}
                </span>
              )}
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-200 transition-colors">
              <User className="h-4 w-4 text-purple-600" />
            </div>
            {admin && (
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                <div className="text-xs text-gray-500">{admin.role}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;