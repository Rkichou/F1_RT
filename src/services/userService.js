const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = {
    register: async (email, password) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, role: 1 }); // 1 = user
        return await user.save();
      } catch (error) {
        throw new Error('Registration failed: ' + error.message);
      }
    },
  
    login: async (email, password) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token };
      } catch (error) {
        throw new Error('Login failed: ' + error.message);
      }
    }
  };
  

module.exports = userService;
