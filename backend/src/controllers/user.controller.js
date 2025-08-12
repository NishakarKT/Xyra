import User from '../models/user.model.js';
import Contact from '../models/contact.model.js';
import OTP from '../models/otp.model.js';
import { sendEmailOTP, sendSMSOTP, verifyOTP } from '../services/otp.service.js';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

// Request OTP for login
export const requestOTP = async (req, res) => {
  console.log('requestOTP', req.body);
  try {
    const { contact, type } = req.body;

    if (!contact || !type || !['EMAIL', 'PHONE'].includes(type)) {
      return res.status(400).json({ message: 'Invalid contact or type' });
    }

    // Find user by contact
    const contactRecord = await Contact.findOne({
      where: { value: contact, type },
      include: [{
        model: User,
        where: { isActive: true }
      }]
    });

    if (!contactRecord) {
      return res.status(404).json({ message: 'Contact not registered' });
    }

    // Generate and send OTP
    const otp = await (type === 'EMAIL' ? sendEmailOTP : sendSMSOTP)(contact);
    
    // Store OTP in database
    await OTP.create({
      contact,
      type,
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    });

    res.json({ message: `OTP sent to ${type.toLowerCase()}` });
  } catch (error) {
    console.error('Error requesting OTP:', error);
    res.status(500).json({ message: 'Error requesting OTP' });
  }
};

// Verify OTP and login
export const verifyOTPAndLogin = async (req, res) => {
  try {
    const { contact, type, otp } = req.body;

    if (!contact || !type || !otp || !['EMAIL', 'PHONE'].includes(type)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Find user by contact
    const contactRecord = await Contact.findOne({
      where: { value: contact, type },
      include: [{
        model: User,
        where: { isActive: true }
      }]
    });

    if (!contactRecord) {
      return res.status(404).json({ message: 'Contact not registered' });
    }

    // Find most recent unused OTP
    const otpRecord = await OTP.findOne({
      where: {
        contact,
        type,
        isUsed: false,
        expiresAt: {
          [Op.gt]: new Date()
        }
      },
      order: [['createdAt', 'DESC']]
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Verify OTP
    const isValid = await verifyOTP(otp, otpRecord.code);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark OTP as used
    await otpRecord.update({ isUsed: true });

    // Update last login
    await contactRecord.User.update({ lastLoginAt: new Date() });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: contactRecord.User.id,
        role: contactRecord.User.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: contactRecord.User.id,
        name: contactRecord.User.name,
        role: contactRecord.User.role
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ message: 'Name and at least one contact method required' });
    }

    // Check if contacts already exist
    const existingContacts = await Contact.findAll({
      where: {
        [Op.or]: [
          ...(email ? [{ value: email, type: 'EMAIL' }] : []),
          ...(phone ? [{ value: phone, type: 'PHONE' }] : [])
        ]
      }
    });

    if (existingContacts.length > 0) {
      const existingTypes = existingContacts.map(c => c.type.toLowerCase());
      return res.status(400).json({ 
        message: `Contact already registered: ${existingTypes.join(', ')}`
      });
    }

    // Create user
    const user = await User.create({ name });

    // Create contacts
    const contacts = [];
    if (email) {
      contacts.push({ value: email, type: 'EMAIL', isPrimary: true, UserId: user.id });
    }
    if (phone) {
      contacts.push({ value: phone, type: 'PHONE', isPrimary: !email, UserId: user.id });
    }
    await Contact.bulkCreate(contacts);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Contact already registered' });
    }
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      include: [{
        model: Contact,
        attributes: ['value', 'type', 'isPrimary', 'isVerified']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
      contacts: user.Contacts
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: 'Error getting profile' });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ name });
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Admin: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Contact,
        attributes: ['value', 'type', 'isPrimary', 'isVerified']
      }]
    });

    res.json(users.map(user => ({
      id: user.id,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      contacts: user.Contacts
    })));
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users' });
  }
};

// Admin: Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Contact,
        attributes: ['value', 'type', 'isPrimary', 'isVerified']
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      contacts: user.Contacts
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Error getting user' });
  }
};

// Admin: Update user
export const updateUser = async (req, res) => {
  try {
    const { name, role, isActive } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ name, role, isActive });
    res.json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Admin: Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}; 