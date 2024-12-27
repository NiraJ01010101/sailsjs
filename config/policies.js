/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  // Protect the dashboard route with token authentication
  AuthController: {
    'dashboard': 'isAuthenticated',
  },
  UserController: {
    'profile': 'isAuthenticated',
    'users': 'isAuthenticated',
  },
  EnterpriseController: {
    'enterprise/*': 'isAuthenticated',
    'enterprise': 'isAdmin',
    'createEnterprise': 'isAuthenticated',
  }

};
