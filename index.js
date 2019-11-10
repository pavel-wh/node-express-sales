const express = require('express')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const MONGO_URI = `mongodb+srv://pavel:kV3F5186uZhuLpRY@cluster0-pptdb.mongodb.net/test?retryWrites=true&w=majority`
        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            reconnectTries: 5, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        }
        
        await mongoose.connect(MONGO_URI, options)    
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${ PORT }`)
        })
        console.log('MongoDB connected...')
    } catch (error) {
        console.log(error)
    }
}

start()
