const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    first_name: { 
        type: String,
        required: true
    },
    last_name: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
          return validator.isEmail(value)
        }
    },
    password: { 
        type: String, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    refresh_token: {
        type: String
    },
    isFasi: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);