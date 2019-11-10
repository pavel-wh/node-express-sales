const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
    console.log(`Server is running on port ${ PORT }`)
})