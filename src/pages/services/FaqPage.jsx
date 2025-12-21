import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  MapPin,
  HelpCircle,
  Calendar,
  CreditCard,
  Sparkles,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'general', name: 'Общие вопросы', icon: HelpCircle },
    { id: 'booking', name: 'Бронирование', icon: Calendar },
    { id: 'pricing', name: 'Цены и оплата', icon: CreditCard },
    { id: 'services', name: 'Услуги', icon: Sparkles },
    { id: 'technical', name: 'Технические вопросы', icon: Settings }
  ];

  const faqData = {
    general: [
      {
        question: 'С какого возраста подходят аниматоры?',
        answer: 'Наши аниматоры работают с детьми от 1 года и старше. Для малышей 1-3 лет мы предлагаем специальные программы с упором на интерактивность и безопасность. Для детей 4-6 лет - активные игры и развлечения, а для школьников готовим квесты и тематические приключения.'
      },
      {
        question: 'Сколько длится программа?',
        answer: 'Стандартная программа с аниматором длится от 1 до 3 часов в зависимости от возраста детей и типа праздника. Для малышей рекомендуем 1-1,5 часа, для детей постарше оптимально 2-3 часа. Возможно продление программы за дополнительную плату.'
      },
      {
        question: 'Можно ли выбрать персонажа?',
        answer: 'Конечно! У нас большая коллекция костюмов популярных персонажей: супергерои (Человек-паук, Бэтмен), принцессы (Эльза, Белоснежка, Моана), мультяшные герои (Свинка Пеппа, Щенячий патруль), а также сказочные персонажи. Вы можете выбрать любимого героя вашего ребенка при бронировании.'
      },
      {
        question: 'Работаете ли вы в детских садах?',
        answer: 'Да, мы регулярно проводим мероприятия в детских садах Петропавловска. Наши программы адаптированы для групповых праздников, утренников и тематических мероприятий. Имеем все необходимые документы для работы в дошкольных учреждениях.'
      }
    ],
  };

  const filteredFaqs = faqData[activeCategory]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>FAQ - Часто задаваемые вопросы | Королевство Чудес</title>
        <meta name="description" content="Ответы на часто задаваемые вопросы о наших услугах, ценах, бронировании и организации праздников в Петропавловске." />
        <meta name="keywords" content="FAQ, вопросы, ответы, праздники, Петропавловск, организация мероприятий" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Часто задаваемые вопросы
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-purple-100 mb-8"
            >
              Найдите ответы на самые популярные вопросы о наших услугах
            </motion.p>
            
            {/* Search */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-lg mx-auto"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по вопросам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-xl focus:ring-4 focus:ring-purple-200 focus:outline-none"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Категории</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                          activeCategory === category.id
                            ? 'bg-purple-100 text-purple-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      {searchQuery ? 'Ничего не найдено' : 'Вопросы не найдены'}
                    </h3>
                    <p className="text-gray-500">
                      {searchQuery 
                        ? 'Попробуйте изменить поисковый запрос' 
                        : 'В этой категории пока нет вопросов'}
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {openQuestion === index ? (
                          <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {openQuestion === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0">
                              <div className="text-gray-600 leading-relaxed">
                                {faq.answer}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом, и мы ответим на все ваши вопросы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Телефон</h3>
              <p className="text-gray-600 text-sm mb-3">Звоните в любое время</p>
              <a href="tel:+77152123456" className="text-purple-600 font-medium hover:text-purple-700">
                +7 (7152) 123-456
              </a>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">Ответим в течение часа</p>
              <a href="mailto:info@prazdnikvdom.kz" className="text-blue-600 font-medium hover:text-blue-700">
                info@prazdnikvdom.kz
              </a>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-3">Онлайн консультация</p>
              <a href="https://wa.me/77779876543" className="text-green-600 font-medium hover:text-green-700">
                +7 (777) 987-65-43
              </a>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">График работы</h3>
              <p className="text-gray-600 text-sm mb-3">Ежедневно</p>
              <p className="text-orange-600 font-medium">9:00 - 21:00</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="/kontakty" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Посетить наш офис
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;