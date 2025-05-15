const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user details
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!['examiner', 'examinee', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent changing role of the last admin
    if (user.userType === 'admin' && role !== 'admin') {
      const adminCount = await User.countDocuments({ userType: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: 'Cannot change role of the last admin' });
      }
    }

    user.userType = role;
    await user.save();

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle user status (activate/deactivate)
// @route   PUT /api/users/:id/toggle-status
// @access  Private/Admin
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deactivating admin accounts
    if (user.userType === 'admin') {
      return res.status(400).json({ message: 'Cannot deactivate admin accounts' });
    }

    user.isVerified = !user.isVerified;
    await user.save();

    res.json({ message: 'User status updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserDetails,
  updateUserRole,
  toggleUserStatus
}; 