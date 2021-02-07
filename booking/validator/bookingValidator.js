

const Joi           = require('joi');
const response      = require('../../responses/response');
const validate      = require('../../validator/joi-validate');

/**
 * @function<b>validate paramters to fetch nearest petrol pump details for fuel filling</b>
 * @param {access_token,api_key,current_lat,current_lng,fuel_type} req 
 * @param {bookFuelFilling} next 
*/

const bookFuelFilling = (req, res, next) =>
{
    let bookingOpts = {
        access_token       : req.body.access_token,
        api_key            : req.body.api_key,
        current_lat        : req.body.current_lat,
        current_lng        : req.body.current_lng,
        fuel_type          : req.body.fuel_type // array for fuel type
    }
    const schema = {
        access_token    : Joi.string().optional(),
        api_key         : Joi.string().optional(),
        current_lat     : Joi.number().required(),
        current_lng     : Joi.number().required(),
        fuel_type       : Joi.array().required()
    }.or('access_token', 'api_key');
    let valid=validate.joi_validate(res,bookingOpts,schema)
    if(valid){
        next();
    }
}


/**
 * @function<b>validate paramters to fetch user details who did filling</b>
 * @param {api_key,task_id} req 
 * @param {getUserData} next 
*/

const getUserData = (req, res, next) =>
{
    let userOpts = {
        api_key            : req.body.api_key,
        task_id            : req.body.task_id
    }
    const schema = {
        api_key         : Joi.string().required(),
        task_id         : Joi.number().required()
    }
    let valid=validate.joi_validate(res,userOpts,schema)
    if(valid){
        next();
    }
}


/**
 * @function<b>validate paramters to upload file</b>
 * @param {api_key,ref_file,access_token,pump_id} req 
 * apikey,pump_id is used by service station and access_token used by customer
 * @param {fileUpload} next 
*/

const fileUpload = (req, res, next) =>
{
    let fileOpts = {
        api_key            : req.body.api_key,
        access_token       : req.body.access_token,
        pump_id            : req.body.pump_id
    }
    const schema = {
        api_key         : Joi.string().optional(),
        access_token    : Joi.string().optional(),
        pump_id         : Joi.number().optional()
    }
    let valid=validate.joi_validate(res,fileOpts,schema)
    if(valid){
        next();
    }
}



module.exports = {
    bookFuelFilling,
    getUserData,
    fileUpload
}
