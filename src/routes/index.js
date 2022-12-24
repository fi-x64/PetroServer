import stationRouter from './station.js'

const router = (app) => {
    app.use('/api/station', stationRouter)
}

export default router