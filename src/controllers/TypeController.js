import Type from '../models/type.js'
import { validationResult } from 'express-validator'

class TypeController {
    // [GET] /type/get-all
    async getAllType(req, res, next) {
        try {
            const types = await Type.find()
            return res.status(200).json({ success: true, data: types })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /type
    async addType(req, res, next) {
        try {
            if (req.body.name !== "") {
                await Type.create({ name: req.body.name })
                return res.status(200).json({ success: true, message: 'New type added!' })
            }
            return res.status(400).json({ success: false, errors: [{ param: name, msg: 'Type name must not be empty' }] })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /type/:typeId
    async deleteType(req, res, next) {
        try {
            const type = await Type.findById(req.params.typeId)
            if (!type) return res.status(400).json({ success: false, message: 'Type not found' })
            await type.delete()
            return res.json({ success: true, message: 'Type deleted' })
        } catch (error) {
            next(error)
        }
    }

}

export default new TypeController()