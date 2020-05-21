const express = require('express')
var multer = require('multer');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const courseRouter = require('./routers/course')
const subjectRouter = require('./routers/subject')
const videoRouter = require('./routers/video')
const serviceRouter = require('./routers/service')
const enquiryRouter = require('./routers/enquiry')
const notificationRouter = require('./routers/notification')
const pyqRouter = require('./routers/previousYearQuestion')
const Course = require('./models/course')


const app = express()
const port = process.env.PORT



// // for parsing application/json
// app.use(bodyParser.json()) 

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
//app.use(danger.any()); 
 app.use(express.static('public'))
// app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static('public'))
app.use(userRouter)
app.use(taskRouter)
app.use(courseRouter)
app.use(subjectRouter)
app.use(videoRouter)
app.use(serviceRouter)
app.use(enquiryRouter)
app.use(notificationRouter)
app.use(pyqRouter)

app.listen(port, () => {
    console.log('connected succefully')
})

// const main = async () => {
//     // const task = await Task.findById('5c2e505a3253e18a43e612e6')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const course = await Course.findById('5eb30677d062be0b38101939')
//     await course.populate('subjects').execPopulate()
//     console.log(course.subjects)
// }

// main()
