import { body } from 'express-validator'

export const stationValidator = [
    body('name').isLength({ min: 4, max: 100 }).withMessage('Name must be at least 4 characters and less than 100 characters'),
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude value must be between -90 and 90'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longtitude value must be between -180 and 180'),
    body('taxNumber').isLength({ min: 1 }).withMessage('Tax number is required'),
    body('certNumber').isLength({ min: 1 }).withMessage('Cert number is required'),
    body('fuelColumns').isArray({ min: 1 }).withMessage('The station should include at least one fuel column'),
    body('fuelColumns.*.fuelNumber').isLength({ min: 1 }).withMessage('Fuel number must not be empty'),
    body('fuelColumns.*.checkNumber').isLength({ min: 1 }).withMessage('Fuel column\'s check number must not be empty'),
    body('fuelColumns.*.columnType').isLength({ min: 1 }).withMessage('Fuel column\'s type must not be empty'),
    body('fuelColumns.*.inspectionDate').isLength({ min: 1 }).withMessage('Fuel column\'s inspection date must not be empty'),
    body('fuelColumns.*.termDate').isLength({ min: 1 }).withMessage('Fuel column\'s term date must not be empty'),
    body('address').isLength({ min: 1 }).withMessage('Address is required'),
]