import stationRouter from './station.js'
import authRouter from './auth.js'
import userRouter from './user.js'
import typeRouter from './type.js'
import locationRouter from './location.js'

const router = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/station', stationRouter);
    app.use('/api/user', userRouter);
    app.use('/api/type', typeRouter);
    app.use('/api/location', locationRouter);
}

export default router