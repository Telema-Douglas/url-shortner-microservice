const mongoose = require('mongoose');
const { Schema } = mongoose;

const shortUrlSchema = new Schema(
    {
        url: { type: String },
        shortId: { type: String, unique: true },
    },
    {
        timestamps: true
    },
)

const ShortUrlModel = mongoose.model('ShortUrlModel', shortUrlSchema);

module.exports = ShortUrlModel;