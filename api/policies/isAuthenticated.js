const verifyToken = require('./jwtUtils'); // Import the utility function

module.exports = async function (req, res, next) {
  try {
    // Get token from the cookies
    const token = req.cookies.authToken;

    if (!token) {
      return res.redirect('/login');
    }

    const decoded = await verifyToken(token);

    req.user = decoded;
    return next(); 

  } catch (error) {
    console.error('Error in token verification middleware:', error);
    return res.redirect('/login');
  }
};
