import Station from '../models/station.js'
import { validationResult } from 'express-validator'
import cloudinary from 'cloudinary'
import moment from 'moment'


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
            const { imagePublicId } = req.body
            const station = await Station.findById(req.params.station_id)
            if (!station) return res.status(400).json({ success: false, message: 'Station not found' })
            station.images = station.images.filter(x => x.public_id !== imagePublicId)
            await station.save()
            cloudinary.v2.uploader.destroy(imagePublicId, function (error, result) {
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

    // [GET] /station/notify
    async getStationNotify(req, res, next) {
        try {
            const late = await Station.find({}).elemMatch('fuelColumns', {
                inspectionDate: { $lte: moment() }
            })

            const upcoming = await Station.find({}).elemMatch('fuelColumns', {
                $and: [{ inspectionDate: { $gte: moment() } }, { inspectionDate: { $lte: moment().add(3, 'd') } }]
            })

            return res.json({ success: true, data: { late, upcoming } })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /station/samples
    async sampleData(req, res, next) {
        try {
            for (let i = 1; i <= 500; i++) {
                const lat = 10.2 + Math.random()
                const lng = 104.8 + Math.random()
                await Station.create(
                    {
                        name: "my perto",
                        longitude: lng,
                        latitude: lat,
                        company: {
                            name: "Company name",
                        },
                        taxNumber: "asfdsaf",
                        certNumber: "fasdfaf",
                        fuelColumns: [
                            {
                                fuelNumber: "fsadfa",
                                checkNumber: "fasdfaf",
                                columnType: "TOKICO-ATKC",
                                inspectionDate: moment().subtract(2, 'd'),
                                termDate: moment().subtract(30, 'd'),
                            }
                        ],
                        images: [
                            {
                                url: "http://res.cloudinary.com/dantocthang/image/upload/v1672804811/petro/wy8aad6lsa9bafyvvxqy.jpg",
                                public_id: "petro/wy8aad6lsa9bafyvvxqy",
                            },
                        ],
                        address: "safasdfasdf",
                        areaId: "63be2cc8b6085e3ae0ac578d"
                    }
                )
            }
            return res.json({ success: true })
        } catch (error) {
            next(error)
        }
    }
}

export default new StationController()