const { DataTypes } = require('sequelize')
const sequelize = require('../configs/db')

const OTP = sequelize.define('otp', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    email: {
        type: DataTypes.STRING,
        allowNull:true
    },
    otp: {
        type: DataTypes.STRING,
        allowNull:true
    },
    token: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    timestamps:true
})
module.exports = OTP