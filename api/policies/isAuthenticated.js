// api/policies/isAuthenticated.js
const jwt = require('jsonwebtoken');
const secretKey = '1524W2Rfa@10';
module.exports = function (req, res, next) {
  try {
    // Get token from the cookies
    const token = req.cookies.authToken;

    if (!token) {
      return res.redirect('/login');
    }

    // Verify token using the secret key
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.redirect('/login');
      }
      console.log("decoded",decoded)
      req.user = decoded;
      return next(); // Proceed to the next action
    });

  } catch (error) {
    console.error('Error in token verification middleware:', error);
    return res.redirect('/login');
  }
};
