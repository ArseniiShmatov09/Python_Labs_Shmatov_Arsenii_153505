import mongoose from 'mongoose';

const CarcassTypeSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true,
        unique: true,
    }

});

export default mongoose.model('CarcassType', CarcassTypeSchema);

