import UserController from '../controllers/UserController.js';
import express from 'express'
import authJwt from '../middleware/authJwt.js';

const router = express.Router();

router.get('/all', UserController.allAccess)
router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], UserController.adminBoard)

export default router