// api/controllers/AuthController.js
const jwt = require('jsonwebtoken');
const secretKey = '1524W2Rfa@10';

module.exports = {

  dashboard: async function (req, res) {
    try {
      // Render the dashboard page with user data
      if (req.user.username) {
        return res.view('pages/homepage', { userName: req.user.username, userRole: req.user?.role, });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to load dashboard. Please try again.' });
    }
  },

  login: function (req, res) {
    const token = req.cookies.authToken;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (decoded) {
        return res.redirect('/');
      }
    });
    return res.view('pages/login', { message: req.flash('message'), error: true, layout: './layouts/loginLayout' });

  },

  logout: async function (req, res) {
    try {
      res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'Strict'
      });

      return res.status(200).redirect('/login');

    } catch (error) {
      // Handle any errors that may occur during the logout process
      return res.status(500).json({ error: 'Server error. Please try again.' });
    }
  },

  signup: function (req, res) {
    const token = req.cookies.authToken;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (decoded) {
        return res.redirect('/');
      }
    });
    // return res.view('pages/registerForm');

    return res.view('pages/registerForm', { message: "", error: true, layout: './layouts/loginLayout' });
  },

  // Handle the login logic
  userLogin: async function (req, res) {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email: email });

      if (!user || user.password !== password) {
        // If the user doesn't exist or the password is incorrect, return an error
        req.flash('message', "Invalid credentials");
        res.status(401).redirect('/login');
      }

      delete user.password
      // Create a JWT token
      const token = jwt.sign({ ...user }, secretKey, { expiresIn: '1d' });

      // Set the token in an HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
        sameSite: 'Strict'
      });

      // Redirect to the homepage/dashboard
      return res.status(200).redirect('/');

    } catch (error) {
      // Handle errors
      console.log("err:userLogin", error)
      return res.status(500).json({ error: 'Server error. Please try again.' });
    }
  },

  // Register a new user
  userRegister: async function (req, res) {
    const { username, email, password, confirmPassword } = req.body;

    // Check if password and confirm password match
    const matchEmail = await User.findOne({ email: email });

    if (matchEmail) {
      return res.send({
        message: 'This email is already registered.',
        error: true
      });
    }

    try {
      // Create a new user
      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
        created_on: new Date(),
        updated_on: new Date()
      }).fetch();

      // Redirect to login after successful registration
      return res.redirect('/login');

    } catch (error) {
      // Handle any errors during user creation
      // return res.redirect(500, '/signup');
      return res.status(500).redirect('/signup');
    }
  },
};
