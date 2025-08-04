import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Baby, 
  Heart, 
  Building2, 
  Gift, 
  Sparkles, 
  Gamepad2,
  ArrowRight,
  Users
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: Baby,
      title: 'Детские праздники',
      description: 'Яркие дни рождения, выпускные и школьные мероприятия с любимыми персонажами',
      features: ['Аниматоры в костюмах', 'Интерактивные программы', 'Шоу мыльных пузырей'],
      price: 'от 15 000 ₸',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/uslugi/detskie-prazdniki',
      color: 'primary',
      popular: true
    },
    {
      id: 2,
      icon: Heart,
      title: 'Свадьбы',
      description: 'Свадьбы мечты с идеальной организацией каждой детали вашего особенного дня',
      features: ['Ведущий и музыка', 'Декор и флористика', 'Фото и видеосъёмка'],
      price: 'от 150 000 ₸',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/uslugi/svadby',
      color: 'secondary'
    },
    {
      id: 3,
      icon: Building2,
      title: 'Корпоративы',
      description: 'Профессиональные корпоративные мероприятия для укрепления команды',
      features: ['Тимбилдинг программы', 'Новогодние корпоративы', 'Презентации и награждения'],
      price: 'от 50 000 ₸',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/uslugi/korporativy',
      color: 'accent'
    },
    {
      id: 4,
      icon: Gift,
      title: 'Юбилеи и торжества',
      description: 'Незабываемые юбилеи и семейные торжества в кругу близких людей',
      features: ['Живая музыка', 'Банкетное обслуживание', 'Торжественная программа'],
      price: 'от 80 000 ₸',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/uslugi/yubilei-torzhestva',
      color: 'primary'
    },
    {
      id: 5,
      icon: Sparkles,
      title: 'Шоу-программы',
      description: 'Захватывающие шоу: огненные, световые, акробатические номера',
      features: ['Огненное шоу', 'Световое шоу', 'Акробатические номера'],
      price: 'от 25 000 ₸',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/uslugi/shou-programmy',
      color: 'secondary'
    },
    {
      id: 6,
      icon: Gamepad2,
      title: 'Квесты и игры',
      description: 'Увлекательные квесты и командные игры для детей и взрослых',
      features: ['Детективные квесты', 'Командные игры', 'Интеллектуальные викторины'],
      price: 'от 20 000 ₸',
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '/uslugi/kvesty-igry',
      color: 'accent'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: 'bg-primary-500',
        text: 'text-primary-600',
        border: 'border-primary-200',
        hover: 'hover:border-primary-300',
        gradient: 'from-primary-500 to-primary-600'
      },
      secondary: {
        bg: 'bg-secondary-500',
        text: 'text-secondary-600',
        border: 'border-secondary-200',
        hover: 'hover:border-secondary-300',
        gradient: 'from-secondary-500 to-secondary-600'
      },
      accent: {
        bg: 'bg-accent-500',
        text: 'text-accent-600',
        border: 'border-accent-200',
        hover: 'hover:border-accent-300',
        gradient: 'from-accent-500 to-accent-600'
      }
    };
    return colors[color] || colors.primary;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-gray-900 mb-4">
            Наши <span className="gradient-text">услуги</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаем праздники для любого повода и возраста. 
            Каждое мероприятие уникально и продумано до мелочей.
          </p>
        </motion.div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`card overflow-hidden border-2 ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 group-hover:shadow-2xl`}>
                  {/* Популярная метка */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ПОПУЛЯРНОЕ
                      </div>
                    </div>
                  )}

                  {/* Изображение */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${colorClasses.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    
                    {/* Иконка */}
                    <div className={`absolute top-4 left-4 w-12 h-12 ${colorClasses.bg} rounded-xl flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <span className={`text-lg font-bold ${colorClasses.text}`}>
                        {service.price}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Особенности */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className={`w-1.5 h-1.5 ${colorClasses.bg} rounded-full mr-3 flex-shrink-0`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA кнопка */}
                    <Link
                      to={service.link}
                      className={`w-full btn-outline ${colorClasses.border} ${colorClasses.text} hover:${colorClasses.bg} hover:text-white group-hover:shadow-lg flex items-center justify-center gap-2`}
                    >
                      Подробнее
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Проведённых праздников</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-600 mb-2">7+</div>
              <div className="text-gray-600">Лет опыта</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">50+</div>
              <div className="text-gray-600">Профессиональных аниматоров</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">4.9</div>
              <div className="text-gray-600">Средний рейтинг</div>
            </div>
          </div>
        </motion.div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/uslugi"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Посмотреть все услуги
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;