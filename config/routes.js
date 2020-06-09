const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/UsersController')
 

const { authenticateUser } = require('../app/middlewares/authentication')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.delete('/users/logout', authenticateUser, usersController.logout)
router.get('/users/list', authenticateUser, usersController.list)
router.get('/users/show',authenticateUser,usersController.show)
router.put('/users/update/:id',authenticateUser, usersController.update)
 
module.exports = router