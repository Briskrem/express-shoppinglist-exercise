const express = require("express")
const ExpressError = require('./expressError')
const itemRoutes = require('./shoppingItems')

const app = express()

app.use(express.json())

// app.get('/', (req, res) => {
//     console.log('VOCKCHREWTU')
//     res.send('hello')
// })

app.use('/items', itemRoutes )



app.use(( req, res, next) => {
    let e = new ExpressError('NOT FOUND', 404)
    next(e)
})

app.use((err, req, res, next)=>{
    console.log('ERRRRRRRRRRRRR')
    let status = err.status || 500
    let message = err.message
    res.status(status)
    return res.json({
        error:{
            message,
            status
        }

    })
})


module.exports = app
