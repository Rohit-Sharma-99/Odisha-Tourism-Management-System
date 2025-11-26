import Tour from '../models/Tour.js';


//create a new tour 
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save()
        res.status(200).json({success:true, message:'Successfully created', data:savedTour});
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to create. Try again'});
    }
}


// update tour 
export const updateTour = async (req, res) => {
    const  id = req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json({success:true, message:'Successfully updated', data:updatedTour});
    } catch (err) {
        res.status(500).json({success:false, message:'Failed to update'});
    }
};

// delete tour 
export const deleteTour = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete' });
    }
};


// getSingle tour 
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate("reviews")
        res.status(200).json({ success: true, message: 'Successfully fetched', data: tour });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Failed to fetch tour' });
    }
};


// getAll tour 
export const getAllTour = async (req, res) => {

    const page = parseInt(req.query.page);

    try {
        const tours = await Tour.find({}).populate("reviews")
        .skip(page * 8 ).limit(8);
        res.status(200).json({ success: true, count: tours.length, message: 'All Tours fetched successfully', data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Failed to fetch tours' });
    }
};



// get tour by  search 

export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i');  // here i means case sensituve
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    try {
        // gte means greater than equal 
        const tours = await Tour.find ({ city, distance:{$gte:distance}, maxGroupSize:{$gte:maxGroupSize} }).populate("reviews");

        res.status(200).json({ success: true, message: 'Successful', data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Not found' });
    }
}




// get featured tour 
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate("reviews").limit(8);
        res.status(200).json({ success: true, message: 'Here is some featured tours', data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Failed to fetch featured tours' });
    }
};

// get tour count 
export const getTourCount = async (req, res) => {
    try {
      const count = await Tour.estimatedDocumentCount();
      res.status(200).json({
        success: true,
        message: 'Tour counts fetched successfully',
        data: count,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Failed to fetch tour counts',
      });
    }
  };
  