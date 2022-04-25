const express = require('express');
const router = express();
const Location = require('../models/location')

router.get('/', async (req, res)=>{
    try{
        const locations = await Location.find().populate();
        res.send({
            success: true,
            data: locations
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})
router.post('/', async (req, res)=>{
    try{
        const newLocation = await Location.create(req.body);
        res.send({
            success: true,
            data: newLocation
        })
    }catch(err){
        res.send({
            success: true,
            data: err.message
        })
    }
})
router.get('/:id', async (req, res)=>{
    try{
        const location = await Location.findById(req.params.id).populate();
        if(!location){
            throw new Error("No location with that ID!")
        }
        res.send({
            success: true,
            data: location
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const location = await Location.findByIdAndDelete(req.params.id).populate();
        res.send({
            success: true,
            data: location
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate();
        res.send({
            success: true,
            data: location
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

module.exports = router