import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

// Услуги
import ServicesPage from './pages/services/ServicesPage';
import ChildrenPartiesPage from './pages/services/ChildrenPartiesPage';
import WeddingsPage from './pages/services/WeddingsPage';
import CorporateEventsPage from './pages/services/CorporateEventsPage';

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
      <Router>
        <div className="App">
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              
              {/* О компании */}
              <Route path="o-kompanii" element={<AboutPage />} />
              
              {/* Услуги */}
              <Route path="uslugi" element={<ServicesPage />} />
              <Route path="uslugi/detskie-prazdniki" element={<ChildrenPartiesPage />} />
              <Route path="uslugi/svadby" element={<WeddingsPage />} />
              <Route path="uslugi/korporativy" element={<CorporateEventsPage />} />
              
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