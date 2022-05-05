const { default: mongoose } = require('mongoose')
const mongooose = require('mongoose')

const feedBackSchema = mongooose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text:{
            type:String,
            required:[true, "Please add a text value"]
        },
    },
    {
        timestamps:true,
    }
)

module.exports = mongooose.model('Feedback',feedBackSchema)