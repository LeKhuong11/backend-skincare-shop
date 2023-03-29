const User = require('../models/authenticationModels')
const bcrypt = require('bcrypt')
const uploadAvatar = require('../middlewares/uploadAvatar')
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
            })

            //SAVE USER TO DB
            const user = await User.create(newUser)
            res.status(200).json(user)
        } catch(err) {
            res.status(500).json(err)
        }
    },

    updateUser: async (req, res) => {
        const id = req.params.id;
        const data = req.body
        try {
            console.log(data);
            await uploadAvatar(req, res);
            if(req.file) {
                console.log(req.file, data);
              }
            // const userUpdate = await User.findByIdAndUpdate(id, data)
            res.status(200).json(req.file)
        } catch(err) {
            console.log(err);
            res.status(500).json(err)
        }
       
    }
}

module.exports = authController