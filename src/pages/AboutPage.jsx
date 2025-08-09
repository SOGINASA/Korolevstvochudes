import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OlgaImg from './images/Olga-.jpg';
import ElenaImg from './images/Elena_Vays.jpg';
import LenaImg from './images/Lena_Animator--1300x867.jpg';
import GenaImg from './images/Gena_animator-.jpg';
import KatyaImg from './images/Katya_animator-.jpg';
import ArtemImg from './images/Artem_Animator-.jpg';
import BookingModal from '../components/BookingModal';

const AboutUs = () => {
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Функции для работы с модалом бронирования
  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  const teamMembers = [
    {
      name: "Ольга",
      role: "Руководитель агентства",
      image: OlgaImg,
      description: "Основатель и вдохновитель команды"
    },
    {
      name: "Елена", 
      role: "Руководитель и Ведущая",
      image: ElenaImg,
      description: "Координирует все мероприятия"
    },
    {
      name: "Лена",
      role: "Аниматор", 
      image: LenaImg,
      description: "Профессиональный аниматор с большим опытом"
    },
    {
      name: "Гена",
      role: "Аниматор",
      image: GenaImg,
      description: "Мастер детских развлечений"
    },
    {
      name: "Катя",
      role: "Аниматор",
      image: KatyaImg,
      description: "Создает волшебную атмосферу"
    },
    {
      name: "Артем",
      role: "Аниматор",
      image: ArtemImg,
      description: "Отвечает за техническое обеспечение"
    }
  ];

  const principles = [
    {
      icon: "🛡️",
      title: "НАША ОТВЕТСТВЕННОСТЬ",
      description: "Мы берем на себя полную ответственность за качество проведения мероприятия. Каждый праздник проходит по заранее согласованному сценарию с учетом всех пожеланий клиента.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: "🎯", 
      title: "НАШ ПОДХОД",
      description: "Индивидуальный подход к каждому клиенту. Мы внимательно выслушиваем все пожелания и даже конструктивную критику, ведь мы - профессионалы своего дела и стремимся к совершенству.",
      color: "from-pink-500 to-rose-600"  
    },
    {
      icon: "✨",
      title: "НАША МИССИЯ", 
      description: "Делать детей и их родителей счастливыми! Мы создаем незабываемые моменты, которые останутся в памяти на всю жизнь и подарят море положительных эмоций.",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        {/* Hero секция */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
                О нас
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                Праздничное агентство "Королевство Чудес" - ваш надежный партнер в создании незабываемых моментов
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 80L1440 80V0C1440 0 1080 40 720 40C360 40 0 0 0 0V80Z" fill="rgb(249 250 251)"/>
            </svg>
          </div>
        </div>

        {/* Основной контент */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Главный заголовок и описание */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Каждый день мы превращаем в праздник!
              </span>
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6">Немного о нас</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Мы — праздничное агентство, расположенное в центре Петропавловска. 
                Мы растем каждый день, и множество празднеств за нами, в копилке нашего растущего опыта.</strong>
              </p>
            </div>
          </div>

          {/* Фото команды */}
          <div className="mb-20">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Crect width='1200' height='600' fill='%23FFE4E1'/%3E%3Ctext x='600' y='250' text-anchor='middle' font-size='48' fill='%23333'%3EНаша веселая команда%3C/text%3E%3Ctext x='600' y='320' text-anchor='middle' font-size='24' fill='%23666'%3EКоманда профессионалов праздничного агентства%3C/text%3E%3Ctext x='600' y='380' text-anchor='middle' font-size='18' fill='%23888'%3E&quot;Королевство Чудес&quot;%3C/text%3E%3C/svg%3E" 
                alt="Команда Королевство Чудес" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Наша дружная команда</h3>
                <p className="text-lg opacity-90">Профессионалы своего дела с многолетним опытом</p>
              </div>
            </div>
          </div>

          {/* Принципы работы */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-16">
              Наши принципы работы
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${principle.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {principle.icon}
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    {principle.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Команда */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-16">
              Познакомьтесь с нашей командой
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                >
                  <div className="relative mb-6">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-200 shadow-lg"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23E8D5C4'/%3E%3Ccircle cx='100' cy='80' r='30' fill='%23F4C2A1'/%3E%3Cpath d='M60 140 Q100 120 140 140 L140 200 L60 200 Z' fill='%234A5568'/%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h4>
                  
                  <p className="text-purple-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-12">Наши достижения</h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">12 837</div>
                <div className="text-lg opacity-90">Проведенных праздников</div>
              </div>
              
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-lg opacity-90">Лет опыта</div>
              </div>
              
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">Видов программ</div>
              </div>
              
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-lg opacity-90">Гарантия качества</div>
              </div>
            </div>
          </div>

          {/* CTA секция */}
          <div className="text-center mt-20">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Готовы создать незабываемый праздник?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами прямо сейчас, и мы поможем воплотить все ваши праздничные мечты в реальность!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openBookingModal}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Заказать праздник
              </button>
              
              <button 
                onClick={() => navigate('/portfolio')}
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transform hover:scale-105 transition-all duration-300"
              >
                Посмотреть портфолио
              </button>
            </div>
          </div>
        </div>

        {/* Модальное окно бронирования */}
        <BookingModal 
          isOpen={showBookingModal} 
          onClose={closeBookingModal} 
        />
      </div>
    </>
  );
};

export default AboutUs;