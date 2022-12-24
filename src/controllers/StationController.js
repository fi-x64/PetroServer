import Station from '../models/station.js'
import { validationResult } from 'express-validator'

class StationController {
    // [GET] /station/get-all
    async getAllStation(req, res, next) {
        try {
            const stations = await Station.find()
            return res.status(200).json({ success: true, data: stations })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /station/:station_id
    async getStation(req, res, next) {
        try {
            const station = await Station.findById(req.params.station_id)
            return res.status(200).json({ success: true, data: station })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /station
    async addStation(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ success: false, errors: errors.array() });
            }
            const station = new Station(req.body)
            await station.save()
            return res.json({ success: true, message: 'Station added successfully!' })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /station/:station_id
    async updateStation(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ success: false, errors: errors.array() });
            }
            await Station.findByIdAndUpdate(req.params.station_id, {
                ...req.body
            })
            return res.json({ success: true, message: 'Station updated successfully!' })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /station/:station_id
    async deleteStation(req, res, next) {
        try {
            await Station.findByIdAndDelete(req.params.station_id)
            return res.json({ success: true, message: 'Station deleted successfully!' })
        } catch (error) {
            next(error)
        }
    }
}

export default new StationController()