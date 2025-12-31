const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    images: String,
    position: {
        type: String,
        required: true
    },
    sellingTypes: [String],
    description: {
        type: String,
        required: true
    },
    soldProperties: {
        type: Number,
        default: 0,
    },
    totalSales: {
        type: Number,
        default: 0,

    },
    yearsExperience: {
        type: Number,
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    myListings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
        }
    ],
    languages: [String],
    password: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', UserSchema);