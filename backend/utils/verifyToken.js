

// ✅ verifyToken.js - FINAL WORKING VERSION

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided. Access denied!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }

    req.user = user;
    next();
  });
};

// ✅ REWRITTEN verifyUser — handles both POST & GET Booking
const verifyUser = (req, res, next) => {
  // Just check if user is authenticated
  if (req.user) {
    return next(); // allow
  }

  return res.status(403).json({
    success: false,
    message: 'Permission denied. You are not authorized to access this resource.'
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Permission denied. Admin access required.'
  });
};


export { verifyToken, verifyUser, verifyAdmin };
