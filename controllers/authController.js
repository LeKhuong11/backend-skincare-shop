const User = require('../models/authenticationModels')
const bcrypt = require('bcrypt')
const uploadAvatar = require('../middlewares/uploadAvatar')
const cloudinary = require('../utils/cloudinary');


const authController = {

    login: async (req, res) => {
        //CHECK PASSWORD
        try {
            const user = await User.findOne({userName: req.body.userName})
            if(user) {
                const validPassword = await bcrypt.compare(
                    req.body.password, user.password
                )
                if(!validPassword) {
                    res.status(404).json({message: 'Wrong password'})
                }
                if(user && validPassword) {
                    res.status(200).json(user)
                }
            } else {
                res.status(404).json({message: 'Wrong UserName'})
            }
            
        } catch(err) {
            res.status(500).json({message: 'Server Error'})
        }
    },

    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const passwordHashed = await bcrypt.hash(req.body.password, salt)

            //CREATE NEW USER
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                password: passwordHashed,
                displayName: req.body.displayName,
                birthDay: req.body.birthDay,
                avatar: null,
                cart: [],
                isAdmin: false,
            })

            //SAVE USER TO DB
            const user = await User.create(newUser)
            res.status(200).json(user)
        } catch(err) {
            res.status(500).json(err)
        }
    },
    changePassword: async (req, res) => {
        const password = req.body.password;
        const newPassword = req.body.newPassword
        const confirmPassword = req.body.confirmPassword
        const userName = req.body.userName;
        const id = req.params.id;
        const salt = await bcrypt.genSalt(10)
        try {
            //Kiem tra user nguoi dung gui len co hop le hay khong
            const user = await User.findOne({userName: userName})
            if(user) {
                //So sanh pasword nguoi dung gui co giong voi pasword duoc luu tren he thong
                const validPassword = await bcrypt.compare(
                    password, user.password
                )
                if(!validPassword) {
                    res.status(404).json({message: 'Wrong password!'})
                }
                if(user && validPassword) {
                    //So sanh password va confirm pasword, neu giong nhau thi se tien hanh update pasword
                    if(newPassword === confirmPassword) {
                        //Khi update password phải hash no di tranh de bi nhin thay
                        const passwordHashed = await bcrypt.hash(newPassword, salt)
                        const data = {
                            password: passwordHashed
                        }
                        await User.findByIdAndUpdate(id, data)
                        res.status(200).json({message: 'Update password susscessfully!'})
                    } else {
                        //Truong hop password va confirm password khong giong nhau return error 400
                        res.status(404).json({message: 'Password and confirm password are not the same!'})
                    }
                }
            }
            else {
                res.status(404).json({message: 'Wrong UserName!'})
            }
        } catch(err) {
            console.log(err);
        }
    },
    updateUser : async (req, res) => {
        const id = req.params.id
        const data = req.body
        try {
            const updateUser = await User.findByIdAndUpdate(id, data)
            updateUser.email = data.email;
            updateUser.displayName = data.displayName;
            updateUser.birthDay = data.birthDay
            res.status(200).json(updateUser)
        } catch(err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    changeAvatar: async (req, res) => {
        const id = req.params.id
        const data = {}

        try {
            await uploadAvatar(req, res);
            if(req.file) {
                const resultClodinary = cloudinary.uploader.upload(req.file.path);
                data.avatar = (await resultClodinary).secure_url
            }
            await User.findByIdAndUpdate(id, data)
            res.status(200).json(data.avatar)
        } catch(err) {
            console.log(err);
            res.status(500).json(err)
        }
    }
}

module.exports = authController