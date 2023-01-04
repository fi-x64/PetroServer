import stationRouter from './station.js'
import typeRouter from './type.js'

const router = (app) => {
    app.use('/api/station', stationRouter)
}

export default router