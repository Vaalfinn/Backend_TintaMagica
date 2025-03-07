const reviewService = require('../services/reviewService');

const getReviews = async() => {
    const reviews = await reviewService.getReviews();
    return reviews;
};

const getReviewById = async(id) => {
    const review = await reviewService.getReviewById(id);
    return review;
};

const createReview = async(userId, productId, nombre, categoria, calificacion, comentario) => {
    const newReview = await reviewService.createReview(userId, productId, nombre, categoria, calificacion, comentario);
    return newReview;
};

const updateReview = async(id, calificacion, comentario) => {
    const updatedReview = await reviewService.updateReview(id, calificacion, comentario);
    return updatedReview;   
};

const deleteReview = async(id) => {
    const deletedReview = await reviewService.deleteReview(id);
    return deletedReview;
};

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};