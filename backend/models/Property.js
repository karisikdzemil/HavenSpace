const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Property = new Schema({
title: {
    type: String,
    required: true,
}
});

module.exports =  mongoose.model('Property', Property);