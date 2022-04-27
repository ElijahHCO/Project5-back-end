const express = require('express');
const router = express();
const Equipment = require('../models/equipment')

router.get('/', async (req, res)=>{
    try{
        const equips = await Equipment.find().populate("location");
        res.send({
            success: true,
            data: equips
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
        const newEquip = await Equipment.create(req.body);
        res.send({
            success: true,
            data: newEquip
        })
    }catch(err){
        res.send({
            success: true,
            data: err.message
        })
    }
})
router.get('/ski', async (req, res)=>{
    try{
        const ski = await Equipment.find({type: "Ski"}).populate("location")
        res.send({
            success: true,
            data: ski
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})
router.get('/snowboard', async (req, res)=>{
    try{
        const snow = await Equipment.find({type: "Snowboard"}).populate("location")
        res.send({
            success: true,
            data: snow
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})
router.get('/:id', async (req, res)=>{
    try{
        const equip = await Equipment.findById(req.params.id).populate("location");
        if(!equip){
            throw new Error("No equipment with that ID!")
        }
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

router.delete('/:id', async (req, res)=>{
    try{
        const equip = await Equipment.findByIdAndDelete(req.params.id).populate("location");
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

router.put('/:id', async (req, res)=>{
    try{
        const equip = await Equipment.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate("location");
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