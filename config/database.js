const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://Prasanna:Jobs_2030@cluster0-wf6tt.mongodb.net/auth-db?retryWrites=true&w=majority', { useNewUrlParser: true})
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(){
        console.log('error connecting to db')
    })

module.exports = {
    mongoose 
}