const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const app = express()

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200)
    res.render('index', {
        title: 'Главная страница',
        isHome: true
    })
})

app.get('/courses', (req, res) => {
    res.status(200)
    res.render('courses', {
        title: 'Курсы',
        isCourses: true
    })
})

app.get('/add', (req, res) => {
    res.status(200)
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log(`Server is running on port ${ PORT }`)
})