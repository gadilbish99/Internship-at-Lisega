const mongoose = require('mongoose');

const Form2Schema = new mongoose.Schema({
    isHazardous: String,
    instRequired: String,
    label: String,
    duration: Number,
    storage_info: String,
    solvent_content: String,
    protMeasureRequired: String,
    protMeasure: String,
    techMeasure: String,
    orgMeasure: String,
    perMeasure: String,
    manual: String,
    num: Number,
    isChanging: String,
    letter: String,
    anyMeasure: String,
    measure: String,
    techMeasure2: String,
    orgMeasure2: String,
    perMeasure2: String,
    isProcured: String,
    reason: String
});

module.exports = mongoose.model('Form2', Form2Schema);