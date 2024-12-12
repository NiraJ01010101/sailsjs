module.exports = {
    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true,
        },
        password: {
            type: 'string',
            required: true,
        },
        email: {
            type: 'string',
            isEmail: true,
            required: true,
        },
        role: {
            type: 'string',
            isIn: ['super_admin', 'admin', 'user'],
            defaultsTo: 'user',
        },
    },

    // Add lifecycle callback for password hashing before saving
    // beforeCreate: async function (values, proceed) {
    //     values.password = await sails.helpers.encryptPassword(values.password);
    //     return proceed();
    // }
};
