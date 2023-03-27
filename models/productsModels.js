const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [ true, 'Please enter product name']
        },
        price: {
            type: Number,
            require: [ true, 'Please enter product price'],
            require: true
        },
        description: {
            type: String,
            require: [ true, 'Please enter product description'],
        },
        img: {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        },
        discouter: {
            type: Number,   
            require: true
        },
        star: {
            type: Number,
            require: true
        },
        categories: {
            type: String,
            require: [ true, 'Please enter product categories'],
        },
        amount: {
            type: String,
            require: true
        },
        color: {
            type: String,
            default: '#FFC123'
        },
        bgColor: {
            type: String,
            default: '#FFC123'
        },
        oldPrice: {
            type: Number,
            require: true,
            default: 0
        }
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product