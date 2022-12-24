import TypeController from '../controllers/TypeController.js';
import express from 'express'

const router = express.Router();

router.get('/get-all', TypeController.getAllType)
router.post('/', TypeController.addType)

export default router