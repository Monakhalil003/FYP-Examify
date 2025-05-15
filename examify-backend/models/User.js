const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true,
    enum: ['examiner', 'examinee', 'admin']
  },
  contact: {
    type: String,
    required: true
  },
  // Social auth fields
  googleId: String,
  facebookId: String,
  
  // Examiner specific fields
  examinerType: String,
  credentials: String,
  
  // Examinee specific fields
  examineeType: String,
  educationLevel: String,
  instituteName: String,
  rollNumber: String,
  major: String,
  yearSemester: String,
  qualification: String,
  experience: String,
  company: String,
  industry: String,
  skills: [String],
  
  // Password reset fields
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetAttempts: {
    type: Number,
    default: 0
  },
  lastResetAttempt: Date,

  // Account status
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpires: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const User = mongoose.model('User', userSchema);
module.exports = User;