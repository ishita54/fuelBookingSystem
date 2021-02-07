
const fs                 = require('fs');
const AWS                = require('aws-sdk');
const Promise            = require('bluebird');
const lodash             = require('lodash')
const {runQuery}         = require('../../database/db_connection');
const response           = require('../../responses/response');
const constant           = require('../constant/constant')


const s3                 = new AWS.S3({
    secretAccessKey      : "EEQ5JKRiDU/cG5ACes+2QYL1cXfB31hTb43xllTT",
    accessKeyId          : "AKIAI73GWY654ECQVNMAYUHHTT"
});


/**
 * @function<b>function to generate url for the file</b>
 * @param {files} req 
 * @param {uploadFile} next 
*/
async function uploadFile(opts) {
    const fileName = opts.ref_file.name;
    fs.readFile(opts.ref_file.path, async (err, data) => {
        if (err) throw err;
        const params = {
            Bucket                : 'ishita-bucket',
            Key                   : fileName,
            Body                  : JSON.stringify(data, null, 2),
            ACL                   : 'public-read'
        };
        try {
            let result = await s3.upload(params).promise()
            return resolve(result.Location);

        }
        catch (error) {
            return reject(error.message);
        }
    });
};

  /**
 * @function<b>update service station details</b>
 * @param {fileUrl,pump_id} req 
 * @param {affectedRows} res
 */

function updatePumpFileUrl(opts) {
    return new Promise((resolve, reject) => {
      var values = [opts.fileUrl,opts.pump_id]; 

      var sql = `UPDATE tb_service_stations SET file_url = ? where pump_id = ? `;
     
      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }

/**
 * @function<b>update user details</b>
 * @param {fileUrl,user_id} req 
 * @param {affectedRows} res
 */

function updateUserFileUrl(opts) {
    return new Promise((resolve, reject) => {
      var values = [opts.fileUrl,opts.user_id]; 

      var sql = `UPDATE tb_users SET profile_pic = ? where user_id = ? `;
     
      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }


  /**
 * @function<b>get job data corresponding to customer</b>
 * @param {opts} req 
 * @param {jobData} res
 */
function getUserData(opts) {
    return new Promise((resolve, reject) => {
      var values = [];
      opts.columns = opts.columns || '*';
      var sql = `SELECT ${opts.columns} FROM tb_booking tb
                 INNER JOIN tb_users tu ON tu.user_id = tb.user_id AND tu.is_deleted = 0 AND tu.is_blocked = 0
                 WHERE 1=1 `;
      if(opts.hasOwnProperty(user_id)){
        sql += " AND user_id = ? ";
        values.push(opts.user_id);
      }

      if(opts.hasOwnProperty(task_id)){
        sql += " AND task_id = ? ";
        values.push(opts.task_id);
      }

      if(opts.hasOwnProperty(limit)){
        sql += " LIMIT ? OFFSET ? ";
        values.push(opts.limit,opts.skip);
      }
      else{
        sql += " LIMIT 1";
      }
      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }

    /**
 * @function<b>get pump station nearest to the customer</b>
 * @param {opts} req 
 * @param {pump details} res
 */
function getPumpDetails(opts) {
    return new Promise((resolve, reject) => {
      var values = [];
      opts.columns = opts.columns || '*';
      let fuelArray = opts.fuel_type;
        var sql = `SELECT 
      (
      6371 * ACOS(
      COS(RADIANS(ta.latitude)) * COS(RADIANS(${opts.current_lat} )) * COS( 
      RADIANS(${opts.current_lng} ) - RADIANS(ta.longitude) 
      ) SIN(RADIANS(ta.latitude)) * SIN(RADIANS( ${opts.current_lat})) 
      ) 
      ) AS DISTANCE,
      ta.latitude, ta.longitude,ta.address, tpa.* 
      FROM 
      tb_service_station ta
      WHERE 
      ta.is_deleted = 0 `

      if(fuelArray && fuelArray.length){
          for(let i=0;i<fuelArray.length;i++){
              if(fuelArray[i] == constant.FUEL_TYPE.PETROL){
                sql += ` AND JSON_EXTRACT(fuel_type, $.petrol) = 1`
              }
              else if(fuelArray[i] == constant.FUEL_TYPE.GAS){
                sql += ` AND JSON_EXTRACT(fuel_type, $.gas) = 1`
                  
              }
              else if(fuelArray[i] == constant.FUEL_TYPE.DIESEL){
                sql += ` AND JSON_EXTRACT(fuel_type, $.diesel) = 1`
              }
           

          }
      }

      sql += ` ORDER BY DISTANCE ASC LIMIT 1`;

    
      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }

    /**
 * @function<b>get customer data</b>
 * @param {opts} req 
 * @param {customerData} res
 */
function getUserDetails(opts) {
    return new Promise((resolve, reject) => {
      var values = [];
      opts.columns = opts.columns || '*';
      var sql = `SELECT ${opts.columns} FROM tb_users tu
                 WHERE tu.is_deleted = 0 AND tu.is_blocked = 0
                 WHERE 1=1 `;
      if(opts.hasOwnProperty(access_token)){
        sql += " AND access_token = ? ";
        values.push(opts.access_token);
      }

      runQuery(sql, values).then((result) => {
        return resolve(result);
      }, (error) => {
        return reject(error);
      });
    });
  }


module.exports = {
    uploadFile,
    updatePumpFileUrl,
    updateUserFileUrl,
    getUserData,
    getPumpDetails,
    getUserDetails
}