import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
        unique: true,
    },
    cost:{
        type: Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique: true,
    },
    yearOfPublication:{
        type:Number,
        required:true,
    },
    carUrl:{
        type:String,
        required:true,
    },
    viewsCount:{
        type:Number,
        default: 0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true,
    },
    carcassType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CarcassType', 
    },
},
    {
        timestamps: true,
    },
);

export default mongoose.model('Car', CarSchema);

