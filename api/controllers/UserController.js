const moment = require('moment');

module.exports = {
    profile: function (req, res) {
        // Example user data (you can replace this with real data from a database)
        const user = {
            name: req.user?.username,
            email: req.user?.email,
            joinDate: moment(req.user?.created_on).format('DD-MMM-YYYY'),
            aboutMe: 'I am a web developer with a passion for creating amazing experiences.',
            phone: '123-456-7890',
            location: 'New York, NY',
            avatar: 'https://via.placeholder.com/150'
        };
        return res.view('pages/profile', { user });
    },
    users: async function (req, res) {
        const usersList = await User.find();

        const users = usersList.map(user =>
            user.id === req.user.id ? { ...user, username: user.username + " ( you )" } : user
        );

        return res.view('pages/userListPage', { users });
    },
    updateStatus: async function (req, res) {
        const userId = req.params.userId;
        const { status } = req.body;
        console.log("userId", userId)
        console.log("status", status)
        try {
            // const user = await User.findOne({ id: userId });
            const updatedUser = await User.updateOne({ id: userId })
                .set({ status: status });
            console.log("updatedUser", updatedUser)
            return res.status(200).redirect('/users');
        } catch (err) {
            console.log("error", err)
            return res.status(500).json({ error: err });
            // return res.serverError(err);
        }
    },

};
