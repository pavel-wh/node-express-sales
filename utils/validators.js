const { body } = require('express-validator')

exports.registrationValidators = [
    body('email').isEmail().withMessage('Введите корректный Email'),
    body('password', 'Пароль должен быть минимум 6ть символов').isLength({ min: 6, max: 56 }).isAlphanumeric(),
    body('confirm').custom((value, { req } ) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совпадать')
        }
        return true
    }),
    body('name').isLength({ min: 3, max: 128 }).withMessage('Имя должно содержать минимум 3 символа'),
]