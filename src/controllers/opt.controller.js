const nodeMailer = require('nodemailer');
const OTP = require('../models/opt.model')
const jwt = require('jsonwebtoken')
// const accountSid = 'AC87cf3a6b7a7195ffdd8d56fbe435101e';
// const authToken = 'b3f9268273a808a1cebac5e99bb26934';
// const client = require('twilio')(accountSid, authToken);

exports.messages = async (req, res) => {
    try {
        const { email } = req.body;
        let transporter = await nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'huevang770@gmail.com',
                pass: 'f y w o q r u y b m i j v r r y',
            },
        });
        const number = 6;
        const otp = await Math.floor(Math.random() * Math.pow(10, number)).toString().padStart(number, "0");
        if (otp.length == 0) {
            return res.status(400).json({message:'not fount otp'})
        }

        const token = await jwt.sign({otp: otp}, 'optSecretKey', {expiresIn:'5m'})

        await OTP.create({
            email,
            otp,
            token,
        })
        let mailOptions = {
            from: 'huevang770@gmail.com',
            to: email,
            subject: `ສະບາຍດີນີ້ແມ່ນລະຫັດຂອງທ່ານ`,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ສົ່ງ OTP</title>
            </head>
            <body>
            <div style="display:flex; justify-content: center">
            <div style="display: flex; justify-content: center">
                <div style="text-align: center;">
                    <h1>ສະບາຍດີ</h1>
                    <p>OTP ສ້າງຂຶ້ນໂດຍ huevang ນັກພັດທະນາຊັອປແວຣ໌ ຂອງບໍລິສັດ <strong>HVXP</strong> </p>
                <h1 style="color:red">${otp}</h1>
                <p>OTP ນີ້ໃຊ້ໄດ້ພາຍໃນ 5 ນາທີເທົ່ານັ້ນ</p>
            </div>
            </div>
        </div>
            </body>
            </html>
            `,
    
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err.message);
                // console.log('error');
            } else {
                console.log(info);
            }
        });
        res.status(200).json({message:'success'})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

exports.check_otp = async (req, res) => {
    try {
        const { otp } = req.body;
        console.log('hue',otp);
        const data = await OTP.findOne({ where: { otp: otp } });
        console.log(data);
        if (!data) {
            return res.status(404).json({message:'otp incorrent!'})
        }
        res.status(200).json({message:"success"})
    } catch (error) {
        return res.status(500).json({ message: error.message })
        
    }
}

exports.get_ptp = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await OTP.findOne({ where: { otp: id } })
        res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}