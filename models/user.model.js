const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Пожалуйста, введите валидный адрес.']
    },
    password: {
        type: String,
        required: [true, 'Пожалуйста, введите пароль.'],
        minlength: [6, 'Пароль должен быть не менее 6 символов.'],
        select: false
    },
}, { timestamps: true });

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hashPass) => {
        if (!err) {
            this.password = hashPass;
            next();
        }
    })
})


module.exports = model('User', userSchema);