const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

const { Op } = require('sequelize');


exports.register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const existingUser = await User.findOne({
            where: { 
              [Op.or]: [
                { email: email },
                { phone: phone }
              ]
            }
        });
        
          if (existingUser) {
            return res.status(400).send('Email or phone already exists');
          }
          
        
         await User.create({
            username,
            email,
            phone,
            password,
          });
        
        res.status(200).json({ message: 'register successfully!' })
        
    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(404).json({message: 'Not Found'});
      }
      
      if (user.password !== password) {
        return res.status(404).json({message: 'password not match'})
      }

        const token = await jwt.sign({ id: user.id, email: user.email, phone: user.phone }, 'huevangKey', { expiresIn: '120d' })
        res.status(200).json(token)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.viewUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json({ user: user})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
