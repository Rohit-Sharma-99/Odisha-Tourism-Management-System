import Booking from '../models/Booking.js';

// ==========================
// Create a new booking
// ==========================
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();
    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: savedBooking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: err.message,
    });
  }
};

// ==========================
// Get a single booking by ID
// ==========================
export const getBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully fetched booking',
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: err.message,
    });
  }
};

// ==========================
// Get all bookings
// ==========================
export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      success: true,
      message: 'Successfully fetched all bookings',
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
};

// ==========================
// Delete a booking by ID
// ==========================
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
      data: deletedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: err.message,
    });
  }
};

// ==========================
// Update booking status
// ==========================
export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const allowedStatuses = ["Pending", "Ongoing", "Completed", "Cancelled"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value.",
    });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking status",
      error: err.message,
    });
  }
};
