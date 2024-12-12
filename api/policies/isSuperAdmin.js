module.exports = async function (req, res, proceed) {
    if (req.user && req.user.role === 'super_admin') {
      return proceed(); // Allow the request to proceed
    }
    return res.forbidden('You do not have permission to perform this action.');
  };
  