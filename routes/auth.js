const { Router } = require('express')
const User = require('../models/user')
const router = Router()

router.get('/login', async  (req, res) => {
    res.render('auth/login', {
      title: 'Авторизация',
      isLogin: true  
    })
})

router.post('/login', async  (req, res) => {
    const user = await User.findById('5dc81235617a63284f984ce8')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(error => {
        if (error) {
            throw error
        }
        res.redirect('/')
    })
})

router.get('/logout', async  (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/registration', async  (req, res) => {
    try {
        const { name, email, password, confirm } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            res.redirect('/auth/login#registration')
        } else {
            const user = new User({
                name, email, password, cart: {items: []}
            })
            await user.save()
            res.redirect('/auth/login#login')
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = router