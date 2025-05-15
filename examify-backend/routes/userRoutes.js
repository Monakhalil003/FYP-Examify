const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserDetails,
  updateUserRole,
  toggleUserStatus
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected and require admin access
router.use(protect, admin);

router.route('/')
  .get(getAllUsers);

router.route('/:id')
  .get(getUserDetails);

router.route('/:id/role')
  .put(updateUserRole);

router.route('/:id/toggle-status')
  .put(toggleUserStatus);

module.exports = router; 