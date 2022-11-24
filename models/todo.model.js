const { Schema, model } = require('mongoose');


const todoSchema = new Schema({

    title: {
        type: String,
        minlength: [3, 'Заголовок должен быть не менее 3 символов.'],
        required: [true, "Пожалуйста, введите название задачи."]
    },

    description: {
        type: String,
        minlength: [10, 'Описание должен быть не менее 10 символов.'],
        required: [true, "Пожалуйста, введите сведения о задаче."]
    },

    deadline: {
        type: Date,
        required: [true, "Пожалуйста, укажите срок выполнения задания."]
    },
    status: {
        type: String,
        enum: ['in_process', 'done', 'expired'],
        default: 'in_process'
    },

    file: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true, versionKey: false });


module.exports = model('todo', todoSchema);