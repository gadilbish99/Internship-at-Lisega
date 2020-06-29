const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const DocSchema = new mongoose.Schema({
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormModel',
        required: true
    },
    form2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormModel2'
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    isFilled: {
        type: Boolean,
        default: false
    },
    isGenerated: {
        type: Boolean,
        default: false
    },
    applicant: String,
    substance_name: String
});
DocSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Doc', DocSchema);