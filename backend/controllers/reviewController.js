import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId; // Extract tourId from route params
  const newReview = new Review({ ...req.body, tourId }); // Add tourId from the params to the review object

  try {
    // Save the new review
    const savedReview = await newReview.save();

    // Update the corresponding tour's reviews array
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Review submitted successfully!",
      data: savedReview
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to submit review. Please try again later.",
    });
  }
};



export const getUserReviews = async (req, res) => {
  try {
    const userId = req.params.id;

    const reviews = await Review.find({ user: userId });

    res.status(200).json({
      success: true,
      message: "User reviews fetched successfully",
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch reviews", error: err.message });
  }
};
