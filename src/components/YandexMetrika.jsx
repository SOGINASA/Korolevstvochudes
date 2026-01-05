import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const YandexMetrika = () => {
  const location = useLocation();

  // Инициализация Yandex.Metrika при первой загрузке
  useEffect(() => {
    // Проверяем, не инициализирована ли уже метрика
    if (window.ym) {
      return;
    }

    // Добавляем скрипт Yandex.Metrika
    (function(m, e, t, r, i, k, a) {
      m[i] = m[i] || function() {
        (m[i].a = m[i].a || []).push(arguments);
      };
      m[i].l = 1 * new Date();
      
      // Проверяем, не загружен ли уже скрипт
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    // Инициализируем счётчик с расширенными настройками
    window.ym(47299638, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
      ecommerce: "dataLayer"
    });

    console.log('Yandex.Metrika initialized');
  }, []);

  // Отслеживание изменений маршрута (переходов между страницами)
  useEffect(() => {
    if (window.ym) {
      // Отправляем информацию о просмотре страницы при каждом изменении роута
      window.ym(47299638, 'hit', window.location.href, {
        title: document.title,
        referer: document.referrer
      });
      
      console.log('Page view tracked:', window.location.href);
    }
  }, [location]);

  return (
    <noscript>
      <div>
        <img 
          src="https://mc.yandex.ru/watch/47299638" 
          style={{ position: 'absolute', left: '-9999px' }} 
          alt="" 
        />
      </div>
    </noscript>
  );
};

export default YandexMetrika;