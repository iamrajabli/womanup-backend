require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('./services/logger.service');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

// Назначить app и порт
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://womanup.netlify.app',
}

app.use(cors(corsOptions))

// Настройка облачной конфигурации
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Маршруты
const authRouter = require('./routers/auth.router');
const todoRouter = require('./routers/todo.router');

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

// Исключение ошибки
const errorHandler = require('./errors/exception.filter');
app.use(errorHandler);

// Подключение к базе данных
require('./db');


app.listen(port || 8000, () => {
    logger.log('Server is working on port: ' + port)
})
