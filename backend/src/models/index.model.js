import User from './user.model.js';
import Email from './email.model.js';
import Phone from './phone.model.js';
import OTP from './otp.model.js';

// User - Email Association
User.hasMany(Email, {
  foreignKey: 'userId',
  as: 'emails'
});
Email.belongsTo(User, {
  foreignKey: 'userId'
});

// User - Phone Association
User.hasMany(Phone, {
  foreignKey: 'userId',
  as: 'phones'
});
Phone.belongsTo(User, {
  foreignKey: 'userId'
});

export {
  User,
  Email,
  Phone,
  OTP
}; 