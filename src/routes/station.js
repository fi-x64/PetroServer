import StationController from '../controllers/StationController.js';
import express from 'express'
import { stationValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.post('/sample', StationController.sampleData)
router.get('/get-all', StationController.getAllStation)
router.get('/notify', StationController.getStationNotify)
router.get('/get-area-station/:area_id', StationController.getAreaStation)
router.get('/:station_id', StationController.getStation)
router.post('/', ...stationValidator, StationController.addStation)
router.put('/:station_id', ...stationValidator, StationController.updateStation)
router.patch('/:station_id', StationController.deleteImage)
router.delete('/:station_id', StationController.deleteStation)

export default router