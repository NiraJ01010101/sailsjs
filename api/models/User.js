module.exports = {
    // tableName: 'user',
    // identity: 'user',
    // createdAt: false,
    // updatedAt: false,
    // createdOn: true,
    // updatedOn: true,
    // autoIncrement: false,
    // fetchRecordsOnUpdate: true,
    // fetchRecordsOnCreate: true,
    // fetchRecordsOnCreateEach: true,
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
        enterpriseId: {
            type: 'string',
        },
        created_on: {
            type: 'ref',
            columnType: 'datetime',
        },
        updated_on: {
            type: 'ref',
            columnType: 'datetime',
        },
        status: {
            type: 'number',
            defaultsTo: 1, //1:active,0:deactive,99:forgot
        },

    },

    // Add lifecycle callback for password hashing before saving
    // beforeCreate: async function (values, proceed) {
    //     values.password = await sails.helpers.encryptPassword(values.password);
    //     return proceed();
    // }
};
