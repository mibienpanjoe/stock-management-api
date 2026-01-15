const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
        },
    stockQuantity: {
        type: Number,
        default: 0,
        min: 0
    },
    profileImage: {
        type: String
    },
    image: {
        type: String
    }
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('Product', productSchema);