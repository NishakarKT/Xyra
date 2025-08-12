import express from 'express';
import userRoutes from './user.routes.js';

const router = express.Router();

// Mount routes
router.use('/users', userRoutes);

// Add more route modules here as they are created
// router.use('/other-route', otherRoutes);

export default router; 