const express = require('express');
const router = express.Router();
const reviewController = require ('../controllers/reviewController');
const authenticateUser  = require('../middlewares/authMiddleware');


router
    .get('/', reviewController.getReviews)
    .get('/:id', reviewController.getReviewById)
    .post('/', authenticateUser, reviewController.createReview)
    .patch('/:id', authenticateUser, reviewController.updateReview)
    .delete('/:id', authenticateUser, reviewController.deleteReview);

module.exports = router;