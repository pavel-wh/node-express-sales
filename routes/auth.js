const { Router } = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const User = require('../models/user')
const keys = require('../keys')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')
const router = Router()

const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: keys.SENDGRID_API_KEY
    }
}))

router.get('/login', async  (req, res) => {
    res.render('auth/login', {
      title: 'Авторизация',
      isLogin: true ,
      loginError: req.flash('loginError'),
      registrationError: req.flash('registrationError') 
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
                req.flash('loginError', 'Неверный пароль')
                res.redirect('/auth/login#login')
            }
        } else {
            req.flash('loginError', 'Такого пользователя не существует')
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
            req.flash('registrationError', 'Такой email занят')
            res.redirect('/auth/login#registration')
        } else {
            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({
                name, email, password: hashPassword, cart: {items: []}
            })
            await user.save()
            res.redirect('/auth/login#login')
            await transporter.sendMail(regEmail(email))
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title: 'Забыли пароль?',
        error: req.flash('error')
    })
})

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (error, buffer) => {
            if (error) {
                req.flash('error', 'Что-то пошло не так, повторите попытку позже')
                res.redirect('/auth/reset')
            }
            const token = buffer.toString('hex')
            const candidate = User.findOne({
                email: req.body.email
            })

            if (candidate) {
                candidate.resetToken = token,
                candidate.resetTokenExp = Date.now() + 60 * 60 * 1000
                await candidate.save()
                await transporter.sendMail(resetEmail(candidate.email, token))
                res.redirect('/auth/login')
            } else {
                req.flash('error', 'Такого email нет')
            }
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router