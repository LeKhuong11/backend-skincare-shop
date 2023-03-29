const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            require: true,
            min: 6,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        displayName: {
            type: String,
            require: true,
        },
        birthDay: {
            type: String,
        },
        cart: {
            type: Array,
            default: []
        },
        avatar: {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User