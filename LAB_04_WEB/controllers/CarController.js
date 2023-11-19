import mongoose from 'mongoose';
import CarModel from '../models/car.js';

export const getAllCars = async(req, res) =>{

    try{
        const sortOption = req.query.sortBy; // Получаем параметр сортировки из запроса

        let cars;

        if (sortOption === 'priceAsc') {
            cars = await CarModel.find().sort({ cost: 1 }).populate('user').exec();
        } else if (sortOption === 'priceDesc') {
            cars = await CarModel.find().sort({ cost: -1 }).populate('user').exec();
        } else {
            cars = await CarModel.find().populate('user').exec();
        }

        res.json(cars);
    }

    catch (err){
        console.log(err)
        res.status(500).json({
            message: 'Error in getting cars',
        })
    }

}

export const removeCar = async(req, res) =>{
    try {
        const carId = req.params.id;

        const deletedCar = await CarModel.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(404).json({
                message: 'Cannot find a car',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error in deleting a car',
        });
    }
}

export const getOneCar = async(req, res) =>{

    try {
        const carId = req.params.id;

        const updatedCar = await CarModel.findOneAndUpdate(
            { _id: carId },
            { $inc: { viewsCount: 1 } },
            { new: true } // чтобы получить обновленный документ
        );

        if (!updatedCar) {
            return res.status(404).json({
                message: 'Cannot find a car',
            });
        }


        res.json(updatedCar);
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: 'Error in getting a car',
        });
    }

}

export const createCar = async (req, res) => {
    try{

        const doc = new CarModel({
            brand: req.body.brand,
            model: req.body.model,
            cost: req.body.cost,
            description: req.body.description,
            yearOfPublication: req.body.yearOfPublication,
            carUrl: req.body.carUrl,
            user: req.userId,
        })

        const car = await doc.save();
        res.json(car);

    }

    catch (err) {
        console.error('Error in adding a car:', err);
    
        res.status(500).json({
          message: 'Error in adding a car',
          error: err.message, 
        });
      }
}

export const updateCar = async (req, res) => {
    try{

        const carId = req.params.id;
        await CarModel.updateOne(
        {
            _id:carId,
        },
        {
            brand: req.body.brand,
            model: req.body.model,
            cost: req.body.cost,
            description: req.body.description,
            yearOfPublication: req.body.yearOfPublication,
            carUrl: req.body.carUrl,
            user: req.userId,
        },
        );

        res.json({
            success:true,
        });
    }

    catch (err) {
        console.error('Error in editing a car:', err);
    
        res.status(500).json({
          message: 'Error in editing a car',
          error: err.message, 
        });
      }
}