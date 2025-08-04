import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Страница не найдена - Королевство Чудес</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Страница не найдена
            </h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              К сожалению, запрашиваемая страница не существует или была перемещена.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary flex items-center gap-2"
            >
              <Home size={20} />
              На главную
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="btn-outline flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Назад
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;