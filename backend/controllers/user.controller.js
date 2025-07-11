import User from '../models/user.model.js'

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId }
        }).select("-password")

        res.status(200).json({ users: filteredUsers })
    } catch (error) {
        console.error("Error in getUsersForSidebar controller:", error.message);
        res.status(501).json({ error: "Internal Server Error" })
    }
}


