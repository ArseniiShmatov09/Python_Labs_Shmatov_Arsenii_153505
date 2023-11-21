import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true,
    },
    answer: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model('FAQ', FAQSchema);

