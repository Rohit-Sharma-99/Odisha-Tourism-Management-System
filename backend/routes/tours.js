import express from 'express';
import {
  createTour,
  deleteTour,
  getAllTour,
  getSingleTour,
  updateTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from '../controllers/tourController.js';
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Tour Routes
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);
router.get("/:id", getSingleTour);
router.get("/", getAllTour);

export default router;
