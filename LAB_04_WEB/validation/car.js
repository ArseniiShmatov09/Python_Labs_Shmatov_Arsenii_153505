import { body } from "express-validator";

export const carCreateValidation = [
    body('brand', 'Enter car brand').isLength({ min: 1 }).isString(),
    body('model', 'Enter car model').isLength({ min: 1 }).isString(),
    body('cost', 'Invalid cost').isInt({ min: 1 }), 
    body('description', 'Enter car description').isLength({ min: 1 }).isString(),
    body('yearOfPublication', 'Enter valid year of car publication').isInt({ min: 1900, max: new Date().getFullYear() }), 
    body('carUrl', 'Enter a valid image URL').isURL(),

];

export const carEditValidation = [
    body('brand', 'Enter car brand').isLength({ min: 1 }).isString(),
    body('model', 'Enter car model').isLength({ min: 1 }).isString(),
    body('cost', 'Invalid cost').isInt({ min: 1 }), 
    body('description', 'Enter car description').isLength({ min: 1 }).isString(),
    body('yearOfPublication', 'Enter valid year of car publication').isInt({ min: 1900, max: new Date().getFullYear() }), 
    body('carUrl', 'Enter a valid image URL').isURL(),
];
