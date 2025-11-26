
import User from '../models/User.js';
import Booking from '../models/Booking.js';

// create a new user 
export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json({ success: true, message: 'Successfully created', data: savedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create. Try again' });
    }
};

// delete user 
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete' });
    }
};


// Update user profile (including photo)
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update' });
  }
};


// get single user 
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password"); // Don't send password!
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'Successfully fetched', data: user });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Failed to fetch user' });
  }
};


// get all users 
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, message: 'Successfull', data: users });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Failed to fetch users' });
    }
};

// get all bookings for a specific user
export const getUserBookings = async (req, res) => {
    const userId = req.params.id;
    try {
        // FIX: Use userId instead of user
        const bookings = await Booking.find({ userId: userId });
        res.status(200).json({ success: true, message: 'Bookings fetched', data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
    }
};