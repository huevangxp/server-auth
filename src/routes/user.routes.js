const controller = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/register', controller.register);
    app.post('/login', controller.login);
    app.get('/user', controller.viewUser);
    app.put('/change-password', controller.changePassword);
}