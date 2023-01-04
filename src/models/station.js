import mongoose from 'mongoose'

const StationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    company: {
        type: {
            name: {
                type: String
            }
        }
    },
    taxNumber: {
        type: String,
        required: true
    },
    certNumber: {
        type: String,
        required: true
    },
    fuelColumns: [
        {
            fuelNumber: String, // So cot do
            checkNumber: String, // So tem kiem dinh
            columnType: String,
            inspectionDate: String, // Ngay kiem dinh
            termDate: String // Han kiem dinh
        }
    ],
    images: [{
        url: {
            type: String
        },
        public_id: {
            type: String
        }
    }],
    address: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Station', StationSchema)