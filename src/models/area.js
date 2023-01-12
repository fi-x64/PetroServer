import mongoose from 'mongoose';

const AreaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wkt: {
        type: String,
        required: true
    },
    city_id: {
        type: mongoose.SchemaTypes.ObjectId,
    }
}, { timestamps: true })

export default mongoose.model('Area', AreaSchema);