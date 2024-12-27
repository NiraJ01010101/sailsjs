const verifyToken = require('./jwtUtils');

module.exports = async function (req, res, next) {
  try {
    // console.log("req.user", req)
    const token = req.cookies.authToken;
    if (!token) {
      return res.redirect('/login');
    }

    const decoded = await verifyToken(token);
    if (decoded.role === 'super_admin' || decoded.role === 'admin') {
      return next();
    } else {
      // Custom forbidden message
      return res.status(403).json({
        message: 'You do not have permission to perform this action.'
      });
      // return res.forbidden('You do not have permission to perform this action.');
    }
  } catch (error) {
    console.error("Error during async operation:", error);
    return res.serverError('An error occurred while checking permissions.');
  }
};