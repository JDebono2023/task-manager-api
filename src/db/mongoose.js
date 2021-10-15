
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
    //useFindAndModify: false
})

// // define model
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// // add data
// const me = new User({
//     name: 'Jenn',
//     age: 42
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })

// // define model
// const Tasks = mongoose.model('TaskList', {
//     Description: { type: String },
//     Completed: { type: Boolean }
// })

// // add data
// const task = new Tasks({
//     Description: 'Do dishes',
//     Completed: false
// })

// task
//     .save()
//     .then(() => { console.log(task) })
//     .catch((error) => { console.log(error) })

// ************************************************************
// Validation
// https://www.npmjs.com/package/validator

// // define model, set up validation
// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) { throw new Error(`Email is invalid`) }
//         }
//     },

//     password: {
//         type: String,
//         trim: true,
//         required: true,
//         // minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) { throw new Error(`Password cannot contain "password"`) }
//             if (!validator.isLength(value, { min: 6, max: undefined })) { throw new Error(`Password must contain at least 6 charachters`) }
//         }

//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) { throw new Error(`Age must be a positive number`) }
//         }
//     }
// })

// // add data
// const me = new User({
//     name: 'Darryl   ',
//     age: 22,
//     password: '098!gh2',
//     email: 'JDsmith@myemail.com    '
// })

// me
//     .save()
//     .then(() => { console.log(me) })
//     .catch((error) => { console.log(error) })

// // define model
// const Tasks = mongoose.model('TaskList', {
//     Description: {
//         type: String,
//         trim: true,
//         required: true,
//         // validate(value) {
//         //     if (value.isEmpty) { throw new Error(`Description cannot be empty`) }
//         // },
//     },
//     Completed: { type: Boolean, required: false, default: false }
// })

// // add data
// const task = new Tasks({ Description: 'walk dog' })

// task
//     .save()
//     .then(() => { console.log(task) })
//     .catch((error) => { console.log(error) })