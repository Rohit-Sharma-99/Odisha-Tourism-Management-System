
import express from 'express';
import { createReview, getUserReviews } from './../controllers/reviewController.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:tourId', verifyToken, verifyUser, createReview);
router.get('/:id/reviews', verifyUser, getUserReviews);

export default router;