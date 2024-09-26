const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  headers: true,
  handler: (req, res, next, options) => {
    console.log(`Rate limit hit by IP: ${req.ip}`);
    res.status(429).send(options.message);
  }
});

module.exports = limiter;
