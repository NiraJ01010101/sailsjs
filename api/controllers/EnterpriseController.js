const moment = require('moment');

module.exports = {
    enterprise: async function (req, res) {
        try {
            const EnterpriseList = await Enterprise.find();
            // console.log("Enterprise", EnterpriseList)
            if (EnterpriseList && EnterpriseList.length > 0) {
                console.log("res>>>>1",res)
                return res.view('pages/enterprisePage', { enterprisePageList: EnterpriseList });
            } else {
                console.log("res>>>>2",res)
                return res.view('pages/enterprisePage', { enterprisePageList: null });
            }

        } catch (error) {
            console.error('Error loading enterprise list:', error);
            console.log("error>>>>1",error)
            return res.status(500).json({ error: 'An error occurred while loading the enterprise list. Please try again later.' });
        }
    },

    createEnterpriseView: function (req, res) {
        return res.view('pages/createEnterprisePage');
    },

    createEnterprise: async function (req, res) {
        const { companyName, displayName, companyContactNumber, companyType, otherCompanyType } = req.body;

        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized. Please log in.' });
        }
        // console.log("req.user", req.user)
        try {
            const selectedCompanyType = companyType !== 'Other' ? companyType : otherCompanyType;

            const newEnterprise = await Enterprise.create({
                companyName: companyName,
                displayName: displayName,
                adminId: req.user.id,
                companyContactNumber: companyContactNumber,
                companyType: selectedCompanyType,
                createdOn: new Date(),
                updatedOn: new Date(),
            }).fetch();

            return res.status(200).redirect('/enterprise');

        } catch (error) {
            console.log('Error in createEnterprise:', error);
            return res.status(500).json({ error: 'An error occurred while creating the enterprise.' });
        }
    },

    viewEnterprise: async function (req, res) {
        try {
            // Get the enterprise ID from the URL
            const enterpriseId = req.param('id');

            // Find the enterprise by ID
            const enterprise = await Enterprise.findOne({ id: enterpriseId });
            const usersList = await User.find({
                id: { '!=': enterprise.adminId }, enterpriseId: ""
            });
            if (!enterprise) {
                return res.notFound('Enterprise not found');
            }

            enterprise.createdOn = moment(enterprise.createdOn).format('DD-MMM-YYYY');
            enterprise.updatedOn = moment(enterprise.updatedOn).format('DD-MMM-YYYY');

            const updatedUsersList = await User.find({ enterpriseId: enterpriseId })
            // Render the page with the enterprise details
            return res.view('pages/enterpriseDetailsPage', { enterprise: enterprise, usersList, updatedUsersList });
        } catch (error) {
            return res.serverError(error);
        }
    },
    addUser: async function (req, res) {
        const { enterPriseId, users } = req.body;

        if (!enterPriseId || !Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ status: 400, message: 'Invalid request data' });
        }

        try {
            const enterprise = await Enterprise.findOne({ id: enterPriseId });

            if (!enterprise) {
                return res.status(404).json({ status: 404, message: 'Enterprise not found' });
            }

            await User.update({ id: users }).set({
                enterpriseId: enterPriseId
            });

            // return res.status(200).redirect(`/enterprise/${enterPriseId}`);
            return res.status(200).redirect("/enterprise");
        } catch (err) {
            console.error(err);
            return res.status(500).json({ status: 500, message: 'Error adding enterprises' });
        }
    },
    deleteUserInEnterprise: async function (req, res) {
        const userId = req.param('id');

        try {
            // Find the user by ID
            const user = await User.findOne({ id: userId });

            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }

            await User.update({ id: userId }).set({ enterpriseId: '' });

            return res.json({ success: true, message: 'User enterpriseId cleared successfully' });
            // return res.status(200).redirect('/enterprise');
            // return res.status(200).json({ success: true, message: 'User enterpriseId cleared successfully' }).redirect(`/enterprise`);
        } catch (err) {
            return res.serverError(err);
        }
    }
};