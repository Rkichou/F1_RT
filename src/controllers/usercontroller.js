const authService = require('../../services/authService');

// @desc    Register a new user
// @route   POST /register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const { user, token } = await authService.registerUser(email, password, role);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Register Error:', error.message);  // Log for debugging
    res.status(error.status || 500).json({ message: error.message || 'Server error during registration' });
  }
};

// @desc    Login a user
// @route   POST /login
// @access  Public
exports.login = async (req, res) => {
  try {
    
    const { email, password } = req.body;
    console.log(email);
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login Error:', error.message);  // Log for debugging
    res.status(error.status || 500).json({ message: error.message || 'Server error during login' });
  }
};
