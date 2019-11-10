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

userSchema.methods.addToCart = function (course) {
    // Используем function т.к будем обращаться к this
    const items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })

    if (idx >= 0) {
        items[idx].count = this.cart.items[idx].count + 1
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    // const newCart = { items: items }
    // this.cart = newCart

    // this.cart = { items: items}
    this.cart = { items: items}
    return this.save()
}

module.exports = model('User', userSchema)