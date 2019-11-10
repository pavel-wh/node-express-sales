const { Router } = require('express')
const router = Router()
const Course = require('../models/course')
const Cart = require('../models/cart')

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id)
    await Cart.add(course)
    res.redirect('/cart')
})

router.get('/cart', async (req, res) => {
    const cart = await Cart.fetch()
    res.render('cart', {
        title: 'Корзина',
        isCart: true,
        cart
    })
})

module.exports = router