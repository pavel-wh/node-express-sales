// const uuid = require('uuid/v4')
// const fs = require('fs')
// const path = require('path')

// class Course {
//     constructor(title, price, img) {
//         this.title = title
//         this.price = price
//         this.img = img
//         this.id = uuid()
//     }

//     toJSON() {
//         return {
//             title: this.title,
//             price: this.price,
//             img: this.img,
//             id: this.id
//         }
//     }

//     async save() {
//         const courses = await Course.getAll()

//         courses.push(this.toJSON())
        
//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (error) => {
//                     if (error) {
//                         reject(error)
//                     } else {
//                         resolve()
//                     }
//                 }
//             )
//         })
//     }

//     static getAll() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 'utf-8',
//                 (error, content) => {
//                     if (error) {
//                         reject(error)
//                     } else {
//                         resolve(JSON.parse(content))
//                     }
//                 }
//             )
//         })
//     }
    
//     static async getById(id) {
//         const courses = await Course.getAll()
//         return courses.find(c => c.id === id)
//     }

//     static async update(course) {
//         const courses = await Course.getAll()

//         const idx = courses.findIndex(c => c.id === course.id)
//         courses[idx] = course 

//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (error) => {
//                     if (error) {
//                         reject(error)
//                     } else {
//                         resolve()
//                     }
//                 }
//             )
//         })

//     }
// }

// module.exports = Course
const { Schema, model } = require('mongoose')

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = model('Course', course)