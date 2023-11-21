import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },

    newsUrl: {
        type: String,
        required: true,
    },


});

export default mongoose.model('News', NewsSchema);

