import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  FileText, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

const ProcessSection = () => {
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();
  const getWhatsappPhone = () => settings?.whatsapp_phone || '+7 (7152) 123-456';
  const getCompanyPhone = () => settings?.company_phone || '+7 (7152) 123-456';
  const steps = [
    {
      id: 1,
      icon: MessageCircle,
      title: 'Консультация',
      description: 'Обсуждаем ваши пожелания, бюджет и детали мероприятия. Подбираем оптимальные варианты.',
      details: ['Бесплатная консультация', 'Подбор программы', 'Расчет стоимости'],
      color: 'primary',
      delay: 0.1
    },
    {
      id: 2,
      icon: FileText,
      title: 'Планирование',
      description: 'Составляем детальный план мероприятия, заключаем договор и готовим все необходимое.',
      details: ['Составление сценария', 'Заключение договора', 'Подготовка реквизита'],
      color: 'secondary',
      delay: 0.2
    },
    {
      id: 3,
      icon: Calendar,
      title: 'Подготовка',
      description: 'За несколько дней до события уточняем детали и готовим всё для идеального праздника.',
      details: ['Финальные уточнения', 'Подготовка команды', 'Проверка оборудования'],
      color: 'accent',
      delay: 0.3
    },
    {
      id: 4,
      icon: Sparkles,
      title: 'Праздник',
      description: 'Проводим ваше мероприятие на высшем уровне, создавая незабываемые моменты.',
      details: ['Профессиональное проведение', 'Контроль качества', 'Незабываемые эмоции'],
      color: 'gradient',
      delay: 0.4
    }
  ];

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      primary: {
        bg: 'bg-primary-500',
        text: 'text-primary-600',
        light: 'bg-primary-50',
        border: 'border-primary-200'
      },
      secondary: {
        bg: 'bg-secondary-500',
        text: 'text-secondary-600',
        light: 'bg-secondary-50',
        border: 'border-secondary-200'
      },
      accent: {
        bg: 'bg-accent-500',
        text: 'text-accent-600',
        light: 'bg-accent-50',
        border: 'border-accent-200'
      },
      gradient: {
        bg: 'bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500',
        text: 'text-transparent bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text',
        light: 'bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50',
        border: 'border-gray-200'
      }
    };
    return colors[color]?.[type] || colors.primary[type];
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
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
            Как мы <span className="gradient-text">работаем</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Простой и понятный процесс организации вашего идеального праздника в 4 шага
          </p>
        </motion.div>

        {/* Шаги процесса */}
        <div className="relative">
          {/* Соединительная линия для десктопа */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: step.delay }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Карточка шага */}
                <div className={`relative ${getColorClasses(step.color, 'light')} ${getColorClasses(step.color, 'border')} border-2 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                  {/* Номер шага */}
                  <div className="absolute -top-4 left-6">
                    <div className={`w-8 h-8 ${getColorClasses(step.color, 'bg')} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {step.id}
                    </div>
                  </div>

                  {/* Иконка */}
                  <div className={`w-16 h-16 ${getColorClasses(step.color, 'bg')} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Заголовок */}
                  <h3 className={`text-xl font-bold mb-3 text-center ${getColorClasses(step.color, 'text')}`}>
                    {step.title}
                  </h3>

                  {/* Описание */}
                  <p className="text-gray-600 text-center mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Детали */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className={`w-1.5 h-1.5 ${getColorClasses(step.color, 'bg')} rounded-full mr-3 flex-shrink-0`}></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Стрелка между шагами (только для десктопа) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: step.delay + 0.2 }}
                    viewport={{ once: true }}
                    className="hidden lg:block absolute top-24 -right-3 z-10"
                  >
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-md">
                      <ArrowRight className="w-3 h-3 text-gray-500" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Готовы начать планирование?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Свяжитесь с нами сегодня, и мы поможем создать праздник вашей мечты. 
              Консультация абсолютно бесплатна!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+77152123456"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Позвонить сейчас
              </a>
              
              <a
                href={`https://wa.me/${getWhatsappPhone().replace(/\D/g, '')}`}
                className="btn-secondary flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Гарантии */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">✓</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Гарантия качества</h4>
            <p className="text-sm text-gray-600">Мы гарантируем высокое качество всех наших услуг</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">24/7</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Поддержка</h4>
            <p className="text-sm text-gray-600">Мы на связи с вами на всех этапах подготовки</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">%</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Без переплат</h4>
            <p className="text-sm text-gray-600">Честные цены без скрытых доплат</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;