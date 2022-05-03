const aysncHandler = require('express-async-handler')

const Feedback = require('../model/feedbackModel')


// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const viewFeedbacks = aysncHandler(async (req, res) => {
    const feedbacks = await Feedback.find()
    
    res.status(200).json(feedbacks)
})



// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const addFeedbacks = aysncHandler(async (req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('"Please add title, categories and description "')
    }

    const feedback = await Feedback.create({
        text: req.body.text
    })

    res.status(200).json(feedback)
})




// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const updateVote = aysncHandler( async (req, res ) => {
    const feedback = await Feedback.findById(req.params.id)

    if(!feedback){
        res.status(400)
        throw new Error('Feedback not foound')
    }

    const updatedFeeds = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.status(200).json(updatedFeeds)
})


// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const deleteFeedback = aysncHandler(async (req, res) => {
    const feedback = await Feedback.findById(req.params.id)

    if(!feedback){
        res.status(400)
        throw new Error('Feedback not foound')
    }

    await feedback.remove()


    res.status(200).json({message: `Delete Feedback id ${req.params.id}`})
})

module.exports  = {
    viewFeedbacks,
    addFeedbacks,
    updateVote,
    deleteFeedback
    
}