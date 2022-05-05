const express = require('express')
const router = express.Router()
const { 
    viewFeedbacks, 
    addFeedbacks,     
    updateVote,
    deleteFeedback 
} = require('../controllers/feedbackController')

const { protected } = require('../middleware/authMiddleware')

router.route('/').get(protected, viewFeedbacks).post(protected,addFeedbacks)

router.route('/:id').put(protected, updateVote).delete(protected, deleteFeedback)



module.exports = router