const mongooose = require('mongoose')

const feedBackSchema = mongooose.Schema(
    {
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