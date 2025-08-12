import User from './user.model.js';
import Contact from './contact.model.js';

// Set up model associations
User.hasMany(Contact, { foreignKey: 'UserId' });
Contact.belongsTo(User, { foreignKey: 'UserId' });

export { User, Contact }; 