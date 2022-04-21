require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const equipmentController = require('./controllers/equipmentController')

const mongoURI = process.env.MONGODB_URI

const db = mongoose.connection;

mongoose
    .connect( process.env.MONGODB_URI , {useNewUrlParser: true})
    .then(()=> console.log('mongo connected: ', process.env.MONGODB_URI))
    .catch((err) => console.log(err));

db.on('disconnected', () => console.log('mongo disconnected'));

app.use(morgan('short'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/equips', equipmentController)


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log('app is running')
})
