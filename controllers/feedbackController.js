const aysncHandler = require('express-async-handler')
const { globalAgent } = require('http')

const Feedback = require('../model/feedbackModel')
const User = require('../model/userModel')


// @desc  Get current Feedback
// @route GET /api/feedback
// @access Private 
const viewFeedbacks = aysncHandler(async (req, res) => {
    const feedbacks = await Feedback.find({ user: req.user.id})
    
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
        text: req.body.text,
         user: req.user.id,
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
    const user = await User.findById(req.user.id)

    // check for user
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    if(feedback.user.toString() !== user.id){
        res.status(402)
        throw new Error('User not authorised')
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

    const user = await User.findById(req.user.id)

    // check for user 

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    if(feedback.user.toString() !== user.id){
        res.status(402)
        throw new Error('User not authorised')
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