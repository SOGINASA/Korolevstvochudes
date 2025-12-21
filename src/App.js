import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import SEOHead from './components/SEOHead';

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
import AnimatorsPage from './pages/services/AnimatorsPage';
import AnimatorBirthdayPage from './pages/services/AnimatorBirthdayPage';
import AnimatorAtHomePage from './pages/services/AnimatorAtHomePage';
import AnimatorInCafePage from './pages/services/AnimatorInCafePage';
import AnimatorsKindergartenPage from './pages/services/AnimatorsKindergartenPage';
import AnimatorsSchoolPage from './pages/services/AnimatorsSchoolPage';
import AllAnimatorsPage from './pages/services/AllAnimatorsPage';
import SpidermanAnimatorPage from './pages/services/SpidermanAnimatorPage';

import SitemapPage from './pages/services/SiteMap';

// Другие страницы
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import ContactsPage from './pages/ContactsPage';
import BlogPage from './pages/BlogPage';
import ReviewsPage from './pages/ReviewsPage';
import FaqPage from './pages/services/FaqPage';
import AboutITshechka from './pages/AboutITshechka';

// 404 страница
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <SettingsProvider>
          <Router>
            <ScrollToTop />
            <div className="App">
              {/* SEOHead должен быть внутри Router но вне Routes */}
              <SEOHead />
              
              <Routes>
                {/* Админ аутентификация - БЕЗ основного макета */}
                <Route path="/login" element={<AdminAuthPage />} />
                
                {/* Защищенная админ панель - БЕЗ основного макета */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />

                {/* Публичные страницы с основным макетом */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  
                  {/* ========== ОСНОВНЫЕ СТРАНИЦЫ ========== */}
                  <Route path="ceny" element={<PricingPage />} />
                  <Route path="otzyvy" element={<ReviewsPage />} />
                  <Route path="kejsy" element={<PortfolioPage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="blog/:slug" element={<BlogPage />} />
                  <Route path="kontakty" element={<ContactsPage />} />
                  
                  {/* ========== АНИМАТОРЫ В ПЕТРОПАВЛОВСКЕ ========== */}
                  <Route path="animatory-petropavlovsk" element={<AnimatorsPage />} />
                  <Route path="animatory-na-den-rozhdeniya" element={<AnimatorBirthdayPage />} />
                  <Route path="animatory-dlya-detej" element={<AllAnimatorsPage />} />
                  <Route path="animatory-v-detskij-sad" element={<AnimatorsKindergartenPage />} />
                  <Route path="animatory-v-shkolu" element={<AnimatorsSchoolPage />} />
                  <Route path="animator-na-dom" element={<AnimatorAtHomePage />} />
                  <Route path="animator-v-kafe" element={<AnimatorInCafePage />} />
                  <Route path="spiderman-animator" element={<SpidermanAnimatorPage />} />
                  
                  {/* ========== ПЕРСОНАЖИ ========== */}
                  <Route path="personazhi" element={<ServicesPage />} />
                  <Route path="spajder-men-animator" element={<ChildrenPartiesPage />} />
                  <Route path="elsa-anna-holodnoe-serdce" element={<ChildrenPartiesPage />} />
                  <Route path="barboskiny-animatory" element={<ChildrenPartiesPage />} />
                  <Route path="transformery-animator" element={<ChildrenPartiesPage />} />
                  <Route path="princessy-disnej" element={<ChildrenPartiesPage />} />
                  <Route path="edinorog-animator" element={<ChildrenPartiesPage />} />
                  
                  {/* ========== ШОУ-ПРОГРАММЫ ========== */}
                  <Route path="shou-programmy" element={<ShowProgsPage />} />
                  <Route path="bumazhnoe-shou" element={<ShowProgsPage />} />
                  <Route path="shou-mylnyh-puzyrej" element={<ShowProgsPage />} />
                  <Route path="nauchnoe-shou" element={<ShowProgsPage />} />
                  <Route path="shou-slaymov" element={<ShowProgsPage />} />
                  <Route path="krioshou" element={<ShowProgsPage />} />
                  
                  {/* ========== ПРАЗДНИКИ И ПОВОДЫ ========== */}
                  <Route path="prazdniki" element={<ServicesPage />} />
                  <Route path="den-rozhdeniya-rebenka" element={<ChildrenPartiesPage />} />
                  <Route path="vypusknoj-detskij-sad" element={<ChildrenPartiesPage />} />
                  <Route path="vypusknoj-4-klass" element={<ChildrenPartiesPage />} />
                  <Route path="novyj-god-dlya-detej" element={<ChildrenPartiesPage />} />
                  <Route path="utrenniki" element={<ChildrenPartiesPage />} />
                  <Route path="prazdnik-pod-klyuch" element={<ChildrenPartiesPage />} />
                  
                  {/* ========== ИНФОРМАЦИЯ ========== */}
                  <Route path="o-nas" element={<AboutPage />} />
                  <Route path="faq" element={<FaqPage />} />
                  <Route path="politika-konfidencialnosti" element={<FaqPage />} />
                  <Route path="sitemap" element={<SitemapPage />} />
                  
                  {/* ========== СТАРЫЕ РОУТЫ (для обратной совместимости и редиректов) ========== */}
                  <Route path="o-kompanii" element={<AboutPage />} />
                  <Route path="portfolio" element={<PortfolioPage />} />
                  <Route path="tseny" element={<PricingPage />} />
                  <Route path="otzyvy-klientov" element={<ReviewsPage />} />
                  <Route path="uslugi" element={<ServicesPage />} />
                  <Route path="uslugi/detskie-prazdniki" element={<ChildrenPartiesPage />} />
                  <Route path="uslugi/svadby" element={<WeddingsPage />} />
                  <Route path="uslugi/korporativy" element={<CorporateEventsPage />} />
                  <Route path="uslugi/yubilei-torzhestva" element={<AnniversaryCelebrationsPage />} />
                  <Route path="uslugi/shou-programmy" element={<ShowProgsPage />} />
                  <Route path="uslugi/kvesty-igry" element={<QuestsPage />} />

                  {/* ========== ТЕХНИЧЕСКИЕ СТРАНИЦЫ ========== */}
                  <Route path="about-itshechka" element={<AboutITshechka />} />
                  
                  {/* 404 страница должна быть последней */}
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </SettingsProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;