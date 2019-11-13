const { body } = require('express-validator')
const User = require('../models/user')

exports.registrationValidators = [
    body('email').isEmail().withMessage('Введите корректный Email').custom(async (value, { req }) => {
        try {
            const user = await User.findOne({
                email: value
            })
            if (user) {
                return Promise.reject('Такой Email занят')
            } 
        } catch (error) {
            console.log(error)
        }
    }),
    body('password', 'Пароль должен быть минимум 6ть символов').isLength({ min: 6, max: 56 }).isAlphanumeric(),
    body('confirm').custom((value, { req } ) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совпадать')
        }
        return true
    }),
    body('name').isLength({ min: 3, max: 128 }).withMessage('Имя должно содержать минимум 3 символа'),
]