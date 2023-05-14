const controller = require('../controllers/opt.controller')

module.exports = (app) => {
    app.post('/message', controller.messages);
    app.post('/check-otp', controller.check_otp);
    app.get('/get-otp/:id', controller.get_ptp);
}