module.exports.routes = {
  // '/': { view: 'pages/homepage' },
  'GET /': 'AuthController.dashboard',

  // Route for showing the login form
  'GET /login': 'AuthController.login',

  // Route for showing the register form
  'GET /signup': 'AuthController.signup',

  // Route for handling the login form submission
  'POST /auth/userLogin': 'AuthController.userLogin',

  // Route for handling the Register form submission
  'POST /auth/userRegister': 'AuthController.userRegister',

  // Route for logout
  'GET /logout': 'AuthController.logout',
};
