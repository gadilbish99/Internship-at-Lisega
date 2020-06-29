const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    applicant: String,
    date: Date,
    substance_name: String,
    date_needed: String,
    reason_needed: String,
    inHouse: String,
    department: String,
    operation: String,
    master: String,
    duration: Number,
    working_temp: Number,
    stock_qty: Number,
    description: String,
    plant_type: String,
    aerosol_method: String,
    skin_contact: String,
    v_equipment: String,
    material_storage_place: String,
    material_container: String,
    substance_qty: String
});

module.exports = mongoose.model('Form', FormSchema);