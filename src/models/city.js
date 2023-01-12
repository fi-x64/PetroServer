import mongoose from 'mongoose';

const CitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('City', CitySchema);