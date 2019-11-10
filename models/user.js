const { Schema, model } = require('mongoose')

const userSchema = new Schema ({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course', // Должно совпадать с Model Course
                    required: true
                }
            }
        ]
    }
})

module.exports = model('User', userSchema)