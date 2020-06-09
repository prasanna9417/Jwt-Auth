const  User  = require('../models/User')
const pick = require('lodash/pick')

// localhost:3000/users/register
module.exports.register = function(req, res){
    const body = req.body 
    const user = new User(body)
    user.save()
        .then(function(user){
            res.send(pick(user, ['_id', 'username', 'email']))
        }) 
        .catch(function(err){
            res.send(err)
        }) 
}
 
module.exports.login = function(req, res){
    const body = req.body 
    User.findByCredentials(body.email, body.password)
        .then(function(user){
           return user.generateToken()
        })
        .then(function(token){
            res.send({"access_token":token})
        })
        .catch(function(err){
            res.send(err)
        })

}

 
module.exports.logout = function(req, res){
    const { user, token } = req 
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token }}})
        .then(function(){
            res.send({notice: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}

 
module.exports.list = function(req,res){
    const {user,token} = req
    User.find({})
        .then(function(users){
            res.json(users)
        })
        .catch(function(err){
            res.send(err)
        }) 
}


module.exports.show = (req, res) => {
    const {user} = req
    User.findById(user._id)
        .then((user) => {
            if(user){
                res.json(user)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports.update = (req, res) => {
    const {id,body}= req
   
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true})
        .then((user) => {
            if(user) {
                res.json(user)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
           res.json(err)
        })
}