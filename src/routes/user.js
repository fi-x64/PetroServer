import UserController from '../controllers/UserController.js';
import express from 'express'
import authJwt from '../middleware/authJwt.js';

const router = express.Router();

router.get('/', UserController.search)
router.get('/all', UserController.allAccess)
router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], UserController.adminBoard)
router.post('/search', UserController.search)

export default router