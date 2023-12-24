
const Express = require('express');
const Router = Express.Router();
const User = require('../Controllers/users.js');

Router.post('/register', User.register);
Router.post('/login', User.login);
Router.get('/getuser', User.getUser);
Router.put('/updateuser', User.updateUser); 
Router.delete('/deleteuser', User.deleteUser);

module.exports = Router;