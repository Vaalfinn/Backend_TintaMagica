const reviewModel = require('../models/reviewModel')

// OBTENER TODAS LAS REVIEWS
const getReviews = async () => {
  return await reviewModel.find()
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')
}

// OBTENER UNA REVIEW POR ID
const getReviewById = async (id) => {
  return await reviewModel.findById(id)
    .populate('userId', 'nombre')
    .populate('items.productId', 'nombre categoria')
}

// CREAR UNA REVIEW
const createReview = async (userId, productId, nombre, categoria, calificacion, comentario) => {
  let review = await reviewModel.findOne({ userId })

  if (!review) {
    review = new reviewModel({
      userId,
      items: [{ productId, nombre, categoria, calificacion, comentario }]
    })
  } else {
    const existingItem = review.items.find(
      (item) => item.productId.toString() === productId
    )

    if (existingItem) {
      existingItem.calificacion = calificacion
      existingItem.comentario = comentario
    } else {
      review.items.push({ productId, nombre, categoria, calificacion, comentario })
    }
  }

  await review.save()
  return review
}

// ACTUALIZAR UNA REVIEW (actualiza calificación y comentario de un producto en una review)
const updateReview = async (reviewId, productId, calificacion, comentario) => {
  const review = await reviewModel.findById(reviewId)
  if (!review) return null

  const item = review.items.find(item => item.productId.toString() === productId)
  if (!item) return null

  item.calificacion = calificacion
  item.comentario = comentario

  await review.save()
  return review
}

// ELIMINAR UNA REVIEW
const deleteReview = async (id) => {
  return await reviewModel.findByIdAndDelete(id)
}

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
}