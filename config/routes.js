module.exports.routes = {
  // '/': { view: 'pages/homepage' },
  'GET /': 'AuthController.dashboard',
  'GET /login': 'AuthController.login', // Route for showing the login form
  'POST /auth/userLogin': 'AuthController.userLogin', // Route for handling the login form submission
  'GET /signup': 'AuthController.signup', // Route for showing the register form
  'POST /auth/userRegister': 'AuthController.userRegister', // Route for handling the Register form submission
  'GET /logout': 'AuthController.logout',// Route for logout

  // profile
  '/profile': 'UserController.profile',  // Route to the profile page

  // Enterprise
  'GET /enterprise': 'EnterpriseController.enterprise',
  'GET /enterprise/createEnterprise': 'EnterpriseController.createEnterpriseView',
  'GET /enterprise/:id': 'EnterpriseController.viewEnterprise',
  'POST /enterprise/create-enterprise': 'EnterpriseController.createEnterprise',

  // Users
  'GET /users': 'UserController.users',
  'GET /users/update-status/:id': 'UserController.updateStatus',// updateStatus a user
};
