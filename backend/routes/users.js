import express from 'express';
import { 
  createUser, 
  deleteUser, 
  getAllUser, 
  getSingleUser, 
  updateUser,
  getUserBookings
} from '../controllers/userController.js';

const router = express.Router();

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js"; 

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser); 

// Get a single user by ID
router.get("/:id", getSingleUser); 

// Get all users
router.get("/", getAllUser); 

// Get all bookings for a specific user
router.get("/:id/bookings", getUserBookings);

export default router;


