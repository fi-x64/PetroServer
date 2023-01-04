import stationRouter from './station.js'
import authRouter from './auth.js'

const router = (app) => {
    app.use('/api/station', stationRouter),
        app.use('/auth', authRouter)
}

export default router