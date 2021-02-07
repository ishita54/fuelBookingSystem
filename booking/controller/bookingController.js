

const Promise            = require('bluebird');
const lodash             = require('lodash')
const response           = require('../../responses/response');
const constants          = require('../constant/constant');


const bookingService     = require('../service/bookingService');

/**
 * @function<b>to fetch the details for nearest petrol pump according to current location</b>
 * @param {access_token,api_key,current_lat,current_lng,fuel_type} req 
 * @param {status,message,data} res
 */
const bookFuelFilling = (req,res)=>{
    Promise.coroutine(function* (){

        let pumpDetails = yield bookingService.getPumpDetails({
           fuel_type   : req.body.fuel_type,
           current_lat : req.body.current_lat,
           current_lng : req.body.current_lng
        })
        if(lodash.isEmpty(pumpDetails)){ 
            return response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.NO_PUMP_FOUND);
        }
      
        return response.successResponse(res,constants.responseFlags.ACTION_COMPLETE,constants.responseMessage.ACTION_COMPLETE,pumpDetails);


    })().then((data) => {
       
      }, (error) => {
       
        response.errorResponse(res);
      });


}

/**
 * @function<b>to fetch the details for user who did filling</b>
 * @param {api_key,task_id} req 
 * @param {status,message,data} res
 */
const getUserData = (req,res)=>{
    Promise.coroutine(function* (){

        let userData = yield bookingService.getUserData({
          task_id : req.body.task_id,
          columns : "tb.*,tu.user_name,tu.email.tu.phone_no"
        })
        if(lodash.isEmpty(userData)){ 
            return response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.NO_BOOKING_FOUND);
        }
      
        return response.successResponse(res,constants.responseFlags.ACTION_COMPLETE,constants.responseMessage.ACTION_COMPLETE,userData);


    })().then((data) => {
       
      }, (error) => {
       
        response.errorResponse(res);
      });


}

/**
 * @function<b>to generate url and storing file in aws and store url in database</b>
 *@param {api_key,ref_file,access_token,pump_id} req 
 * @param {status,message,data} res
 */
const fileUpload = (req,res)=>{
    Promise.coroutine(function* (){
        let file     = req.files;
        if(_.isEmpty(file) ||_.isEmpty(req.files.ref_file)){
            return response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.INVALID_FORMAT);
        }

        if ( req.files.ref_file.size > 3*1000*1024 ) {
            return response.errorResponse(res,constants.responseFlags.ERROR_MESSAGE,constants.responseMessage.SIZE_EXCEEDS);
        }

        let fileUrl = yield bookingService.uploadFile(req.files);

        if(fileUrl && req.body.hasOwnProperty('pump_id') && req.body.pump_id){
            yield bookingService.updatePumpFileUrl({
                fileUrl : fileUrl,
                pump_id : req.body.pump_id
            })
        }
        else if(fileUrl && req.body.hasOwnProperty('authData')){
            yield bookingService.updateUserFileUrl({
                fileUrl : fileUrl,
                user_id : authData.user_id
            })

        }

        return response.successResponse(res,constants.responseFlags.ACTION_COMPLETE,constants.responseMessage.FILE_UPLOAD);
        

    })().then((data) => {
       
      }, (error) => {
        response.errorResponse(res);
      });


}





module.exports = {
    bookFuelFilling,
    getUserData,
    fileUpload
}