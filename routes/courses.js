const { Router } = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', async (req, res) => {
    // const courses = await Course.getAll()
    const courses = await Course.find()
        .populate('userId', 'email name')
        .select('price title img')
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }    

    // const course = await Course.getById(req.params.id)
    const course = await Course.findById(req.params.id)

    res.render('course-edit', {
        title: `Редактировать ${ course.title }`,
        isCourses: true,
        course
    })
})

router.post('/edit', async (req, res) => {
    const { id } = req.body
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body)
    // await Course.update(req.body)

    res.redirect('/courses')

})


router.post('/remove', async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id
        })
        res.redirect('/courses')
    } catch (error) {
        console.log(error)
    }

})

router.get('/:id', async (req, res) => {
    // const course = await Course.getById(req.params.id)
    const course = await Course.findById(req.params.id)
    res.render('course', {
        title: `Курс ${ course.title }`,
        isCourses: true,
        course
    })
})

module.exports = router