

const _              =  require('lodash')
const response       =  require('../responses/response');
const bookingService =  require('../booking/service/bookingService');
const constant       =  require('../booking/constant/constant');







async function authenticateUser(req, res, next) {

   if((req.body.hasOwnProperty('access_token')) && req.body.access_token != ''){
       let userData = await bookingService.getUserDetails({
           access_token : req.body.access_token,
           columns      : "tu.*"
       })
       if(_.isEmpty(userData)){
        response.errorResponse(res,constant.responseFlags.ERROR_MESSAGE,constant.responseMessage.ERROR_MESSAGE);
       }
       req.body.authData = userData[0];
    }
   else if(req.body.hasOwnProperty('api_key') && req.body.api_key != ''){
    let apiKey = req.body.api_key;
    if(apiKey.localeCompare(process.env.API_KEY)){
     response.errorResponse(res,constant.responseFlags.ERROR_MESSAGE,constant.responseMessage.INVALID_API_KEY);
    }
   }
   else if(!req.body.hasOwnProperty('api_key') && !req.body.hasOwnProperty('access_token')){
       response.errorResponse(res,constant.responseFlags.ERROR_MESSAGE,constant.responseMessage.ERROR_MESSAGE);

   }
   return next();
  
}

















module.exports = {
    authenticateUser
}