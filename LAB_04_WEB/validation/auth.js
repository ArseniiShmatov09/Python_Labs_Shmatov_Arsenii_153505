import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'The password must store more than 6 characters ').isLength({ min: 6 }),
    body('fullName', 'Enter name').isLength({ min: 6 }),
    body('avatarUrl', 'Invalid image URL').optional().isURL(),
    
];

export const loginValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'The password must store more than 6 characters ').isLength({ min: 6 }),
  
];