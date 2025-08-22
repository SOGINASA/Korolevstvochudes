FROM node:22

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем только манифесты для кеша зависимостей
COPY package*.json ./

# Устанавливаем зависимости внутри контейнера
RUN npm install

# Копируем остальной код
COPY . .

# Чиним права на бинарники npm
RUN chmod +x node_modules/.bin/*

# Экспонируем порт
EXPOSE 3000

# Запуск
CMD ["npm", "start"]
