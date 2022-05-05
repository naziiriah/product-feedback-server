const mongooose = require('mongoose')

const userSchema = mongooose.Schema({
    name: {
        type:String,
        required: [true, 'Please add a name']
    },
    email: {
        type:String,
        required: [true, 'Please add a name'],
        unique:true,
    },
    password: {
        type:String,
        required: [true, 'Please add a password']
    }
},
{
    timestamps: true

})

module.exports = mongooose.model('User', userSchema)