const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const equipmentSchema = new Schema({
    type: {type:String, required: true},
    productBrand: {type:String, required: true},
    productModel: {type:String, unique: true, required: true},
    quantity: {type:Number, default: 0, required: true},
    rented: {type:Number, default: 0,}
}, {timestamps: true})

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;