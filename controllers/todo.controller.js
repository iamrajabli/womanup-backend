const catchAsyncErrors = require('../errors/async.error');

const ResponseService = require('../services/response.service');

const TodoModel = require('../models/todo.model');

const HttpError = require('../errors/http.error');

const cloudinary = require('cloudinary').v2;


class TodoController {

    // Создать тудушку
    create = catchAsyncErrors(async (req, res, next) => {
        try {

            const { title, description, deadline } = req.body;

            const todoObj = {
                title,
                description,
                deadline,
                user: req.user.userData.id,
            }

            // если есть файл то добавляем его в объект
            if (req.body.file) {
                const result = await cloudinary.uploader.upload(req.body.file, {
                    folder: 'woman',
                })

                todoObj.file = {
                    public_id: result.secure_url,
                    url: result.secure_url,
                }

            }
            const todo = await TodoModel.create(todoObj);

            ResponseService.createResponse(res, { todo })

        } catch (e) {
            next(e)
        }
    })

    // Получить все тудушки
    tasks = catchAsyncErrors(async (req, res, next) => {
        try {

            const todos = await TodoModel.find({ user: req.user.userData.id });

            // console.log(todos, req.user);
            ResponseService.createResponse(res, { todos })

        } catch (e) {
            next(e)
        }
    })

    // Удалить определенную тудушку
    remove = catchAsyncErrors(async (req, res, next) => {
        try {

            const { id } = req.params;

            const todo = await TodoModel.findById(id);

            if (!todo) {
                return next(new HttpError('Задание не найдено', 404))
            }



            if (todo.user.toString() !== req.user.userData.id) {
                return next(new HttpError('У вас нет прав на удаление этой задачи', 401))
            }

            await todo.remove();

            ResponseService.createResponse(res, { message: 'Задание успешно удалено' })


        } catch (e) {
            next(e);
        }
    })


    // обновить тудушку
    update = catchAsyncErrors(async (req, res, next) => {

        try {

            const { id } = req.params;

            const todo = await TodoModel.findById(id);

            if (!todo) {
                return next(new HttpError('Задание не найдено', 404))
            }

            if (todo.user.toString() !== req.user.userData.id) {
                return next(new HttpError('У вас нет прав на изменение этой задачи', 401))
            }

            const { title, description, deadline, status } = req.body;

            todo.title = title;
            todo.description = description;
            todo.deadline = deadline;
            todo.status = status;


            // если есть файл то добавляем его в объект
            if (req.body.file) {

                const result = await cloudinary.uploader.upload(req.body.file, {
                    folder: 'woman',
                })

                todo.file = {
                    public_id: result.secure_url,
                    url: result.secure_url,
                }

            }

            await todo.save();

            ResponseService.createResponse(res, { todo })

        } catch (e) {
            next(e);
        }

    })

    // просрочить тудушку
    expire = catchAsyncErrors(async (req, res, next) => {

        try {

            const { id } = req.params;

            const todo = await TodoModel.findById(id);

            if (!todo) {
                return next(new HttpError('Задание не найдено', 404))
            }

            if (todo.user.toString() !== req.user.userData.id) {
                return next(new HttpError('У вас нет прав на изменение этой задачи', 401))
            }

            todo.status = 'expired';
            await todo.save();

            ResponseService.createResponse(res, { todo })

        } catch (e) {
            next(e);
        }
    })

}


module.exports = new TodoController();