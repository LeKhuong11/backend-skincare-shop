const User = require('../models/authenticationModels')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')

const sendMailForgotPasswordController = {
    
    sendMail: async (req, res) => {
        const { email } = req.body;
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const passwordLength = 8;
        let randomPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length);
            randomPassword += chars.substring(rnum,rnum+1);
        }

        try {
            const user = await User.findOne({email: email})
            if(user) {
                const id = user._id
                //If the user is valid, update the new password before sending an email to the user
                const salt = await bcrypt.genSalt(10)
                const passwordHashed = await bcrypt.hash(randomPassword, salt)
                const newPassword = {
                    password: passwordHashed
                }
                await User.findByIdAndUpdate(id, newPassword);

                 // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    secure: false,
                    auth: {
                        user: process.env.USER_EMAIL, 
                        pass: process.env.USER_PASSWORD, 
                    },
                });

                const detailsInfo = {
                    from: process.env.USER_EMAIL, // sender address  
                    to: `${email}`, // list of receivers
                    subject: "Forgot Password on Skincare store!", // Subject line
                    text: `Hello guy! This is new password: ${randomPassword}`, // plain text body
                }
                // send mail with defined transport object
                transporter.sendMail(detailsInfo, (err) => {
                    if(err) {
                        return res.send({message: err})
                    }
                    return res.status(200).json({message: 'Check email, check in the inbox and in spam!'})
                })
            }
           else {
            res.status(404).json({message: 'Email notfound!'})
           }

        } catch(err) {
            console.log(err);
            res.status(404).json({message: "Can't send password!"})
        }  
    }
}

module.exports = sendMailForgotPasswordController