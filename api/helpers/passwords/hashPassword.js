
module.exports = {

    friendlyName: 'Hash password',
  
    description: 'Hash the password',
  
    inputs: {
      password: {
        type: 'string',
        required: true,
      },
    },
  
    fn: async function (inputs) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(inputs.password, salt);
      return hashedPassword;
    }
  
  };
  