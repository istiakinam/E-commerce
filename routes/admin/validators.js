import { check } from 'express-validator'
import usersRepo from '../../repositories/users.js'

export const requireEmail = check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be valid email')
    .custom(async (email) => {
        const existingUser = await usersRepo.getOneBy({ email })
        if(existingUser) {
            throw new Error('Email in use')
        }
    })

export const requirePassword = check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters')
        
export const requirePasswordConfirmation = check('passwordConfirmation')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters')
    .custom((passwordConfirmation, { req }) => {
        if(passwordConfirmation !== req.body.password) {
            throw new Error('Passwords do not match')
        }
    })
