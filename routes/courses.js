const { Router } = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('course', {
        title: `Курс ${ course.title }`,
        isCourses: true,
        course
    })
})

module.exports = router