const express = require('express')
const router = express.Router()
const user = require('../models/users')
const bcrypt = require('bcrypt')

router.post('/signup', async (req, res) => {
    const signedUpUser = new user({
        firstName: req.body.firstName,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
    })
    signedUpUser.save()
    .then(data => {
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/login', (req, res)=>{

})
module.exports = router

// app.post('/users', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10)
//         console.log(hashedPassword)
//         const user = { name: req.body.name, password: hashedPassword }
//         users.push(user)
//         res.status(200).send()
//     } catch (err) {
//         res.status(500).send()
//         console.log(err)
//     }
// })