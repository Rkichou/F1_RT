const User = require('../src/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('../src/utils/validator');

if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET environment variable');
  }
  
exports.registerUser = async (email, password, role) => {
  // Validate input
  const { valid, errors } = validator.validateRegisterInput(email, password, role);
  if (!valid) {
    throw { status: 400, message: errors };
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: 'Email already in use' };
  }

  // Create new user
  const user = new User({ email, password, role });
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
};

exports.loginUser = async (email, password) => {
  console.log('Login attempt:', { email, password });
  
  // Validate input
  const { valid, errors } = validator.validateLoginInput(email, password);
  if (!valid) {
    console.log('Validation error:', errors);
    throw { status: 400, message: errors };
  }

  // Check for user existence
  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found for email:', email);
    throw { status: 400, message: 'Invalid credentials' };
  }

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Password mismatch for user:', email);
    throw { status: 400, message: 'Invalid credentials' };
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log('User logged in successfully:', { email, token });

  return { user, token };
};

