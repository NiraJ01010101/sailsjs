module.exports = {
    // fetchRecordsOnUpdate: true,
    attributes: {
        companyName: {
            type: 'string',
            required: true,
            unique: true,
        },
        displayName: {
            type: 'string',
            required: true,
        },
        adminId: {
            type: 'string',
            required: true,
            //  model: 'User'
        },
        companyContactNumber: {
            type: 'string',
            required: true,
        },
        companyType: {
            type: 'string',
            // isIn: ['IT', 'Finance', 'Retail', 'Manufacturing'],
            required: true,
        },
        createdOn: {
            type: 'ref',
            columnType: 'datetime',
        },
        updatedOn: {
            type: 'ref',
            columnType: 'datetime',
        },
    },
    createdAt: false,
    updatedAt: false,
};
