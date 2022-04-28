require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const equipmentController = require('./controllers/equipmentController')
const locationController = require('./controllers/locationController')
const mongoURI = process.env.MONGODB_URI
const users = []


const db = mongoose.connection;

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log('mongo connected: ', process.env.MONGODB_URI))
    .catch((err) => console.log(err));

db.on('disconnected', () => console.log('mongo disconnected'));



app.use(morgan('short'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/equips', equipmentController)
app.use('/locations', locationController)

app.get('/users', async (req, res) => {
    res.json(users)
});


app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(200).send()
    } catch (err) {
        res.status(500).send()
        console.log(err)
    }
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send("Cannot find user")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success")
        } else {
            res.send("Not Allowed")
        }
    } catch (err) {
        console.log(err)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('app is running')
})
