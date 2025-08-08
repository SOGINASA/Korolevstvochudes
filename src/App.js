import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Contexts
import { AuthProvider } from './contexts/AuthContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminPanel from './pages/AdminPage';
import AdminAuthPage from './pages/AdminAuthPage';

// Услуги
import ServicesPage from './pages/services/ServicesPage';
import ChildrenPartiesPage from './pages/services/ChildrenPartiesPage';
import WeddingsPage from './pages/services/WeddingsPage';
import CorporateEventsPage from './pages/services/CorporateEventsPage';
import AnniversaryCelebrationsPage from './pages/services/AnniversaryCelebrationsPage';
import ShowProgsPage from './pages/services/ShowProgsPage';
import QuestsPage from './pages/services/QuestsPage';

// Другие страницы
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import ContactsPage from './pages/ContactsPage';
import BlogPage from './pages/BlogPage';
import ReviewsPage from './pages/ReviewsPage';

// 404 страница
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Админ аутентификация */}
              <Route path="/login" element={<AdminAuthPage />} />
              
              {/* Защищенная админ панель */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />

              {/* Публичные страницы с основным макетом */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                
                {/* О компании */}
                <Route path="o-kompanii" element={<AboutPage />} />
                
                {/* Услуги */}
                <Route path="uslugi" element={<ServicesPage />} />
                <Route path="uslugi/detskie-prazdniki" element={<ChildrenPartiesPage />} />
                <Route path="uslugi/svadby" element={<WeddingsPage />} />
                <Route path="uslugi/korporativy" element={<CorporateEventsPage />} />
                <Route path="uslugi/yubilei-torzhestva" element={<AnniversaryCelebrationsPage />} />
                <Route path="uslugi/shou-programmy" element={<ShowProgsPage />} />
                <Route path="uslugi/kvesty-igry" element={<QuestsPage />} />
                
                {/* Портфолио */}
                <Route path="portfolio" element={<PortfolioPage />} />
                
                {/* Цены */}
                <Route path="tseny" element={<PricingPage />} />
                
                {/* Блог */}
                <Route path="blog" element={<BlogPage />} />
                
                {/* Отзывы */}
                <Route path="otzyvy-klientov" element={<ReviewsPage />} />
                
                {/* Контакты */}
                <Route path="kontakty" element={<ContactsPage />} />
                
                {/* 404 страница */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;