import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';

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
import AdminAuthPage from './pages/AdminAuthPage';



function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<AdminAuthPage />} />
              <Route path="admin" element={<AdminPage />} />
              
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
    </HelmetProvider>
  );
}

export default App;