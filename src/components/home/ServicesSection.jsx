import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Baby, 
  Sparkles, 
  Star, 
  Gift,
  ArrowRight,
  Users
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: Baby,
      title: 'Аниматоры для детских праздников',
      description: 'Профессиональные аниматоры с опытом работы более 5 лет для незабываемого праздника',
      link: '/animatory-dlya-detej',
      color: 'primary',
      popular: true
    },
    {
      id: 2,
      icon: Sparkles,
      title: 'Персонажи для дней рождения',
      description: 'Более 20 популярных персонажей любимых мультфильмов вашего ребенка',
      link: '/personazhi',
      color: 'secondary'
    },
    {
      id: 3,
      icon: Star,
      title: 'Шоу-программы',
      description: 'Бумажное шоу, мыльные пузыри, научное шоу и другие захватывающие программы',
      link: '/shou-programmy',
      color: 'accent'
    },
    {
      id: 4,
      icon: Gift,
      title: 'Праздники под ключ',
      description: 'Полная организация праздника от идеи до реализации - всё в одних руках',
      link: '/prazdnik-pod-klyuch',
      color: 'primary'
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
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаем незабываемые детские праздники в Петропавловске
          </p>
        </motion.div>

        {/* Сетка услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <Link to={service.link} className={`card overflow-hidden border-2 ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 group-hover:shadow-2xl block h-full`}>
                  {/* Популярная метка */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ПОПУЛЯРНОЕ
                      </div>
                    </div>
                  )}

                  {/* Иконка */}
                  <div className="p-6 pb-0">
                    <div className={`w-16 h-16 ${colorClasses.bg} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6 pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className={`inline-flex items-center gap-2 ${colorClasses.text} font-semibold`}>
                      Подробнее
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/animatory-petropavlovsk"
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