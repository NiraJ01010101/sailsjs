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
        const userId = req.params.id;
        const { status } = req.body;
        if (!userId || status === undefined || status === null) {
            return res.status(400).json({ message: "Invalid user ID or status." });
        }

        try {
            const updatedUser = await User.updateOne({ id: userId })
                .set({ status: status });
            if (updatedUser) {
                return res.status(200).json({ message: "Status updated successfully!", status: 200 });
            }
        } catch (err) {
            console.log("error", err);
            return res.status(500).json({ error: "Internal server error. Please try again later." });
        }
    },
    // deleteUser: async function (req, res) {
    //     const userId = req.param('id');

    //     try {
    //         // Find and delete the user by ID
    //         const deletedUser = await User.destroy({ id: userId }).fetch();

    //         if (deletedUser.length === 0) {
    //             return res.json({ success: false, message: 'User not found' });
    //         }

    //         return res.json({ success: true, message: 'User deleted successfully' });
    //     } catch (err) {
    //         return res.serverError(err);
    //     }
    // }

};
