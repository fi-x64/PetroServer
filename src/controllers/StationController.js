import Station from '../models/station.js'
import { validationResult } from 'express-validator'
import cloudinary from 'cloudinary'

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

    async getAreaStation(req, res, next) {
        try {
            const stations = await Station.find({ areaId: req.params.area_id })
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
            const { _id, ...otherInfo } = req.body
            await Station.findByIdAndUpdate(req.params.station_id, {
                ...otherInfo
            })
            return res.json({ success: true, message: 'Station updated successfully!' })
        } catch (error) {
            next(error)
        }
    }

    // [PATCH] /station/station_id
    async deleteImage(req, res, next) {
        try {
            const station = await Station.findById(req.params.station_id)
            if (!station) return res.status(400).json({ success: false, message: 'Station not found' })
            station.images = station.images.filter(x => x.public_id !== req.body.imagePublicId)
            await station.save()
            console.log(req.body.imagePublicId)
            cloudinary.v2.uploader.destroy(req.body.imagePublicId, function (error, result) {
                // if (error) return res.json({ success: false, message: 'Something went wrong!' })
            });
            return res.status(200).json({ success: true, message: 'Image deleted' })
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