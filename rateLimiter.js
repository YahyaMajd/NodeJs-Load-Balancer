const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  headers: true,
  skip: (req) => {
    // Skip rate limiting for the reset route
    return req.path === '/reset-rate-limit';
  },
  handler: (req, res, next, options) => {
    console.log(`Rate limit hit by IP: ${req.ip}`);
    res.status(429).send(options.message);
  }
});

module.exports = limiter;
