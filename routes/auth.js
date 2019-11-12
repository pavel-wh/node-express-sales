const { Router } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = Router()

router.get('/login', async  (req, res) => {
    res.render('auth/login', {
      title: 'Авторизация',
      isLogin: true  
    })
})

router.post('/login', async  (req, res) => {
    try {
        const { email, password } = req.body

        const candidate = await User.findOne( { email })

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(error => {
                    if (error) {
                        throw error
                    }
                    res.redirect('/')
                })
            } else {
                res.redirect('/auth/login#login')
            }
        } else {
            res.redirect('/auth/login#login')
        }

    } catch (error) {
        console.log(error)
    }
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
            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({
                name, email, password: hashPassword, cart: {items: []}
            })
            await user.save()
            res.redirect('/auth/login#login')
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = router