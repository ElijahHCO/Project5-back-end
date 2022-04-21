const express = require('express');
const router = express();
const Location = require('../models/location')

router.get('/locations', async (req, res)=>{
    try{
        const locations = await Locations.find();
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
router.post('/locations', async (req, res)=>{
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
router.get('/locations/:id', async (req, res)=>{
    try{
        const location = await Location.findById(req.params.id);
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

router.delete('/locations/:id', async (req, res)=>{
    try{
        const location = await Location.findByIdAndDelete(req.params.id);
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

router.put('/locations/:id', async (req, res)=>{
    try{
        const equip = await Equipment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.send({
            success: true,
            data: equip
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

module.exports = router