import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        defaultValue: 'user'
    }
}, { timestamps: true })

export default mongoose.model('User', UserSchema);