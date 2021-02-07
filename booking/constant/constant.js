
exports.responseMessage = {
    "ACTION_COMPLETE"          :  "Successful",
    "ERROR_MESSAGE"            :  "The access_token or api key is invalid.",
    "INVALID_API_KEY"          :  "The api key is invalid.",
    "NO_PUMP_FOUND"            :  "Sorry,No pump found with specified fuel type. ",
    "NO_BOOKING_FOUND"         :  "No booking details found corresponding to the task id provided.",
    "FILE_UPLOAD"              :  "File Uploaded successfully.",
    "INVALID_FORMAT"           :  "Invalid format of the file uploaded",
    "SIZE_EXCEEDS"             :  "File uploaded size exceeds 3MB."
}

exports.responseFlags   = {
"ACTION_COMPLETE"              :  200,
"ERROR_MESSAGE"                :  201
}

exports.FUEL_TYPE   = {
    "PETROL"        :  1,
    "DIESEL"        :  2,
    "GAS"           :  3
    }

exports.FUEL_TYPE_REVERSE   = {
                         1  : "PETROL"   ,
                         2  : "DIESEL"   ,
                         3  : "GAS"             
        }