import React, { useState, useEffect } from 'react';
import { Code, Palette, Rocket, Heart, Coffee, Zap, Users, Award, ArrowLeft, Github, Mail, Phone } from 'lucide-react';

const AboutITshechka = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { name: 'React & Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'UI/UX Design', level: 90, color: 'from-purple-500 to-pink-500' },
    { name: 'JavaScript/TypeScript', level: 92, color: 'from-yellow-500 to-orange-500' },
    { name: 'Node.js & Backend', level: 88, color: 'from-green-500 to-teal-500' },
  ];

  const achievements = [
    { icon: <Award className="w-6 h-6" />, title: '50+ Проектов', desc: 'Успешно реализовано' },
    { icon: <Users className="w-6 h-6" />, title: '30+ Клиентов', desc: 'Довольных заказчиков' },
    { icon: <Zap className="w-6 h-6" />, title: '3+ Года', desc: 'Опыта в разработке' },
    { icon: <Heart className="w-6 h-6" />, title: '99%', desc: 'Положительных отзывов' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              ITshechka
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Команда талантливых разработчиков, создающая цифровые решения, которые меняют мир к лучшему
            </p>
          </div>

          {/* О нас */}
          <div className={`grid lg:grid-cols-2 gap-12 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Кто мы такие?
              </h2>
              <div className="prose prose-lg text-white/80 space-y-4">
                <p>
                  Мы — команда страстных разработчиков из Казахстана, объединенных общей целью: создавать веб-решения, которые не просто работают, а вдохновляют. Наше имя "ITshechka" отражает наш дружелюбный, но профессиональный подход к каждому проекту.
                </p>
                <p>
                  Специализируемся на современных технологиях: React, Next.js, Node.js, и создаем как простые лендинги, так и сложные веб-приложения. Каждый проект для нас — это возможность показать свое мастерство и помочь клиенту достичь его целей.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 pt-4">
                <Coffee className="w-5 h-5 text-amber-400" />
                <span className="text-white/70">Работаем на кофе и вдохновении</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto text-white">
                        {achievement.icon}
                      </div>
                      <div className="text-2xl font-bold text-white">{achievement.title}</div>
                      <div className="text-sm text-white/60">{achievement.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Наши навыки */}
          <div className={`mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Наши навыки
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-white/60">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 delay-500`}
                      style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Наши принципы */}
          <div className={`mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Наши принципы
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all group">
                <Code className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">Качественный код</h3>
                <p className="text-white/70">Пишем чистый, масштабируемый код, который легко поддерживать и развивать.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group">
                <Palette className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">Красивый дизайн</h3>
                <p className="text-white/70">Создаем интуитивные интерфейсы, которые радуют пользователей и повышают конверсию.</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-pink-500/50 transition-all group">
                <Rocket className="w-10 h-10 text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">Быстрая доставка</h3>
                <p className="text-white/70">Соблюдаем сроки и регулярно информируем о прогрессе разработки проекта.</p>
              </div>
            </div>
          </div>

          {/* Команда разработчиков */}
          <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Команда разработчиков
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Артём Пинигин */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    АП
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Пинигин Артём Александрович</h3>
                    <p className="text-blue-400 text-sm">Frontend разработчик</p>
                  </div>
                </div>
                <p className="text-white/70 mb-4">React, Next.js, Tailwindcss</p>
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:+77056101182"
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm">+7 705 610 1182</span>
                  </a>
                  <a 
                    href="https://t.me/ArtemSogi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span className="text-sm">@ArtemSogi</span>
                  </a>
                </div>
              </div>

              {/* Иван Ефремов */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    ИЕ
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Ефремов Иван Александрович</h3>
                    <p className="text-green-400 text-sm">Backend разработчик</p>
                  </div>
                </div>
                <p className="text-white/70 mb-4">Flask, SQLalchemy</p>
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:+77761229953"
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm">+7 776 122 9953</span>
                  </a>
                  <a 
                    href="https://t.me/Vanek3222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span className="text-sm">@Vanek3222</span>
                  </a>
                </div>
              </div>

              {/* Тимофей Разов */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    ТР
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Разов Тимофей Дмитриевич</h3>
                    <p className="text-purple-400 text-sm">Backend разработчик</p>
                  </div>
                </div>
                <p className="text-white/70 mb-4">Flask, SQLalchemy, Java</p>
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:+77716935079"
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm">+7 771 693 5079</span>
                  </a>
                  <a 
                    href="https://t.me/C3H403"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span className="text-sm">@C3H403</span>
                  </a>
                </div>
              </div>

              {/* Алихан Жумабек */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all group">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    АЖ
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Жумабек Алихан Азаматович</h3>
                    <p className="text-cyan-400 text-sm">Frontend разработчик</p>
                  </div>
                </div>
                <p className="text-white/70 mb-4">React</p>
                <div className="flex items-center space-x-4">
                  <a 
                    href="tel:+77051329557"
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone size={16} />
                    <span className="text-sm">+7 705 132 9557</span>
                  </a>
                  <a 
                    href="https://t.me/Gaklelk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    <span className="text-sm">@Gaklelk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Фоновые элементы */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default AboutITshechka;