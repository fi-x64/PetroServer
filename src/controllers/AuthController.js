import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import User from '../models/user.js'

class AuthController {
    // [POST] /auth/login
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user)
                return res.json({ success: false, message: 'User with that email not found' })
            const isCorrectPassword = await bcrypt.compare(req.body.password, user.password)
            if (!isCorrectPassword)
                return res.json({ success: false, message: 'Password is incorrect' })
            return res.json({ success: true, message: 'Login success' })
            // const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
            // const { password, ...otherDetails } = user._doc;
            // req.user = otherDetails
            // res.cookie("access_token", token).status(200).json({ success: true, details: { ...otherDetails }, token: token });
        }
        catch (err) {
            next(err)
        }
    }

    // [POST] /auth/register
    async register(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ success: false, errors: errors.array() });
        }
        try {
            const isDuplicate = !!(await User.findOne({ email: req.body.email }))
            if (isDuplicate) {
                return res.json({
                    success: false, errors: [{
                        "msg": "Email is taken!",
                        "param": "email",
                    }]
                })
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                email: req.body.email,
                password: hashedPassword,
            });
            await user.save()
            res.json({ success: true, message: 'Register successfully!' })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /auth/logout
    logout(req, res, next) {
        try {
            if (req?.user) req.logout(() => console.log('Log out!'));
            res.clearCookie('access_token')
            res.json({ success: true, message: 'Logged out' })
        } catch (error) {
            res.json({ success: false, message: 'An error has occurred' })
        }
    }


}

export default new AuthController();