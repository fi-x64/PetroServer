import wkx from 'wkx'
import Area from '../models/area.js'
import City from '../models/city.js'

class AreaController {
    // [POST] /location/city
    async createCity(req, res, next) {
        try {
            const { name } = req.body;
            const city = await City.create({ name })
            return res.json({ success: true, data: city })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /location/area
    async createArea(req, res, next) {
        try {
            const { name, wkt, city_id } = req.body;
            const area = await Area.create({ name, wkt, city_id })
            return res.json({ success: true, data: area })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /location/area
    async getAllAreas(req, res, next) {
        try {
            const areas = await Area.find()
            const data = areas.map(x => ({
                _id: x._id,
                name: x.name,
                city_id: x.city_id,
                geojson: wkx.Geometry.parse(x.wkt).toGeoJSON()
            }))
            return res.json({ success: true, data })
        } catch (error) {
            next(error)
        }
    }
}

export default new AreaController();