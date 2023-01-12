import AreaController from '../controllers/AreaController.js';
import express from 'express'

const router = express.Router();

router.get('/area', AreaController.getAllAreas)
router.post('/area', AreaController.createArea)
router.post('/city', AreaController.createCity)
// router.post('/', AreaController.addType)
// router.delete('/', AreaController.deleteType)

export default router