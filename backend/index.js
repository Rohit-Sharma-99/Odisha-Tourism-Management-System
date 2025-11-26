import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes
import bookingRoute from './routes/bookings.js';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS options
const corsOptions = {
  origin: true,
  credentials: true,
};

// Middleware setup
app.use(express.json()); // For parsing JSON request bodies
app.use(cookieParser()); // For parsing cookies
app.use(cors(corsOptions)); // Enable CORS
app.use(cors({ origin: 'http://localhost:3000' })); // allow frontend origin


// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);


// Database connection
mongoose.set('strictQuery', false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect to MongoDB:", err);
  }
};

// Start the server
app.listen(port, () => {
  connect();
  console.log(`Server is running on http://localhost:${port}`);
});

// To run the server in development mode
// use `npm run start-dev`

// To run the server in production mode
// use `npm run start`
