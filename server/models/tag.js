const mongoose = require('mongoose');
const Joi = require('joi');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 64
    }
}, { versionKay: false });

const Tag = mongoose.model('Tag', tagSchema);

function validate(tag) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(64).required()
    });

    return schema.validate(tag);
}

module.exports.tagSchema = tagSchema;
module.exports.validate = validate;