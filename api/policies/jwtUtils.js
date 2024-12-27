const jwt = require('jsonwebtoken');
const secretKey = '1524W2Rfa@10';

// Utility function to verify JWT token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);  // Reject on error
      } else {
        resolve(decoded);  // Resolve with the decoded data
      }
    });
  });
}

module.exports = verifyToken;
