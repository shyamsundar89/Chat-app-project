import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import getDetails from '../utils/getDetails.js';

// Register Controller
export const getUsers = async (req, res) => {

  try {
    // Fetch all users from the database
    const userExists = await User.find({}).select('-password');

    if (userExists.length === 0) {
      return res.status(400).json({ message: 'No User Found!!' });
    }

    res.status(201).json({ message: 'User fetched successfully', userExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save user to DB
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Remove password before sending response
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ message: 'Login successful', token, user:userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete User Controller
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Bulk Delete Users Controller
export const bulkDeleteUsers = async (req, res) => {
  try {
    const { userIds } = req.body; // Expecting an array of user IDs

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'User IDs are required' });
    }

    const result = await User.deleteMany({ _id: { $in: userIds } });

    res.status(200).json({
      message: `${result.deletedCount} user(s) deleted successfully`,
    });
  } catch (error) {
    console.error('Bulk delete error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Profile Controller
export const UpdateProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    const user = await getDetails(token);

    const { username, email, timezone, theme } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      { username, email, timezone, theme },
      { new: true }
    );

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
};
