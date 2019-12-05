const routerUser = require('express').Router();
const { getUsers, createUser, getUsersId } = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/:userId', getUsersId);
routerUser.post('/', createUser);


module.exports = routerUser;
