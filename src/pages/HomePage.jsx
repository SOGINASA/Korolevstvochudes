import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Королевство Чудес - Организация праздников в Петропавловске</title>
        <meta 
          name="description" 
          content="Профессиональная организация детских праздников, свадеб и корпоративов в Петропавловске. Более 1000 счастливых клиентов. Гарантия качества и незабываемые эмоции!" 
        />
        <meta 
          name="keywords" 
          content="организация праздников Петропавловск, детские праздники, свадьбы, корпоративы, аниматоры, праздничное агентство" 
        />
        <link rel="canonical" href="https://prazdnikvdom.kz/" />
      </Helmet>

      <div className="overflow-hidden">
        {/* Главная Hero секция */}
        <HeroSection />

        {/* Наши услуги */}
        <ServicesSection />

        {/* Процесс работы */}
        <ProcessSection />

        {/* Временная секция для остальных компонентов */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom text-center">
            <h2 className="heading-2 text-gray-900 mb-8">
              Остальные секции в разработке
            </h2>
            <p className="text-gray-600 text-lg">
              Портфолио, отзывы, преимущества, акции и форма заказа будут добавлены в следующих версиях
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;