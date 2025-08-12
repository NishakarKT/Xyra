import { DataTypes } from 'sequelize';
import sequelize from '../config/database.config.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('CUSTOMER', 'BUSINESS', 'ADMIN'),
    defaultValue: 'CUSTOMER'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

export default User; 