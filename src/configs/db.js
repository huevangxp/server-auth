const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('auth', 'postgres', 'huevang', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging:false
})

sequelize.authenticate().then(() => {
    console.log('Server connect database successfully');
}).catch((error) => {
    console.log(error);
})

sequelize.sync();
module.exports = sequelize;