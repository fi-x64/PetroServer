import StationController from '../controllers/StationController.js';
import express from 'express'
import { stationValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.get('/get-all', StationController.getAllStation)
router.get('/:station_id', StationController.getStation)
router.post('/', ...stationValidator, StationController.addStation)
router.put('/:station_id', ...stationValidator, StationController.updateStation)
router.delete('/:station_id', StationController.deleteStation)

export default router