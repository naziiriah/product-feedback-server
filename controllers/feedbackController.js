const aysncHandler = require('express-async-handler')

// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const viewFeedbacks = aysncHandler(async (req, res) => {
    res.status(200).json({message: "Get Goals"})
})



// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const addFeedbacks = aysncHandler(async (req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('"Please add title, categories and description "')
    }
    res.status(200).json({Message: "Add feedbacks to products"})
})




// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const updateVote = aysncHandler( async (req, res ) => {
    res.status(200).json({Status: true})
})


// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const deleteFeedback = aysncHandler(async (req, res) => {
    res.status(200).json({message: `Delete Feedback id ${req.params.id}`})
})

module.exports  = {
    viewFeedbacks,
    addFeedbacks,
    updateVote,
    deleteFeedback
    
}