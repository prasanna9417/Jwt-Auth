const User = require('../models/User')

const authenticateUser = function(req, res, next){
    const token = req.header('Authorization')
    const body = req.body
    console.log(body)
    const { id } = req.params
    User.findByToken(token)
        .then(function (user) {
            if(user) {
                req.user = user
                req.token = token
                req.id = id
                req.body = body
                next()
            } else {
                res.status('401').send({ notice: 'token not available'})
            }
            
        })
        .catch(function (err) {
            res.status('401').send(err)
        })
}

module.exports = {
    authenticateUser
}