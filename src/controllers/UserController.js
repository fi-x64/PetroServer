import Station from '../models/station.js'

class UserController {
    allAccess = (req, res) => {
        res.status(200).send("Public Content.");
    };

    userBoard = (req, res) => {
        res.status(200).send("User Content.");
    };

    adminBoard = (req, res) => {
        res.status(200).send("Admin Content.");
    };

    async search(req, res, next) {
        try {
            const values = req.body.data;
            const areaId = req.body.areaId;

            if (!values) return res.json({ success: false, message: 'Values not found' });
            let data;
            if (areaId) {
                data = await Station.find({
                    $and: [{ areaId: areaId },
                    {
                        $or: [
                            { "name": { $regex: '.*' + values + '.*', $options: 'i' } },
                            { "address": { $regex: '.*' + values + '.*', $options: 'i' } }
                        ]
                    }
                    ]
                }
                ).limit(10)
            }
            else {
                data = await Station.find({
                    $or: [
                        { "name": { $regex: '.*' + values + '.*', $options: 'i' } },
                        { "address": { $regex: '.*' + values + '.*', $options: 'i' } }
                    ]
                }
                ).limit(10)
            }
            if (data) {
                return res.status(200).json({ success: true, data })
            }
            return res.json({ success: false, message: 'Values not found' })
        } catch (error) {
            next(error)
        }
    }
}

export default new UserController();