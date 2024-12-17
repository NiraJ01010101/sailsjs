const moment = require('moment');

module.exports = {
    enterprise: async function (req, res) {
        try {
            const EnterpriseList = await Enterprise.find();
            // console.log("Enterprise", EnterpriseList)
            if (EnterpriseList && EnterpriseList.length > 0) {
                return res.view('pages/enterprisePage', { enterprisePageList: EnterpriseList });
            } else {
                return res.view('pages/enterprisePage', { enterprisePageList: null });
            }

        } catch (error) {
            console.error('Error loading enterprise list:', error);
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

            if (!enterprise) {
                return res.notFound('Enterprise not found');
            }
            
            enterprise.createdOn = moment(enterprise.createdOn).format('DD-MMM-YYYY');
            enterprise.updatedOn = moment(enterprise.updatedOn).format('DD-MMM-YYYY');

            // Render the page with the enterprise details
            return res.view('pages/enterpriseDetailsPage', { enterprise: enterprise });
        } catch (error) {
            return res.serverError(error);
        }
    }
};