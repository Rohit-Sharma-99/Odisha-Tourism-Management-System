// // routes/booking.js
// import express from 'express';
// import { createBooking, getAllBooking, getBooking, deleteBooking  } from '../controllers/bookingController.js';
// import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

// const router = express.Router();

// // POST /api/v1/booking/ => create booking
// router.post("/", verifyToken, verifyUser, createBooking);  // ✅ needs login only

// // GET /api/v1/booking/:id => get single booking
// router.get("/:id", verifyToken, verifyUser, getBooking);   // ✅ needs login only

// // GET /api/v1/booking/ => admin only
// router.get("/", getAllBooking);

// router.delete("/:id", verifyToken, deleteBooking);

// export default router;




import express from 'express';
import {
  createBooking,
  getAllBooking,
  getBooking,
  deleteBooking,
  updateBookingStatus, // <-- NEW
} from '../controllers/bookingController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// POST /api/v1/booking/ => create booking
router.post("/", verifyToken, verifyUser, createBooking);  // ✅ needs login only

// GET /api/v1/booking/:id => get single booking
router.get("/:id", verifyToken, verifyUser, getBooking);   // ✅ needs login only

// GET /api/v1/booking/ => admin only
router.get("/", getAllBooking);

// DELETE /api/v1/booking/:id
router.delete("/:id", verifyToken, deleteBooking);

// PUT /api/v1/booking/:id/status => update booking status (admin only)
router.put("/:id/status", verifyToken, updateBookingStatus);

export default router;
