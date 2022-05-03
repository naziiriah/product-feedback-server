const express = require('express')
const router = express.Router()
const { 
    viewFeedbacks, 
    addFeedbacks,     
    updateVote,
    deleteFeedback 
} = require('../controllers/feedbackController')

router.get('/', viewFeedbacks).post('/', addFeedbacks)


router.put('/:id', updateVote).delete('/:id', deleteFeedback)



module.exports = router