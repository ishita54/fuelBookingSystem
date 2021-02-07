
## Prerequisites
1. A barebones Node.js app using Express .
2. Need mysql database with
   database name - fuel_booking
   user and password can be changed on db_connection.js file
3. A table name `tb_service_stations` which will have all the service station details corresponding to a pump_id      (PRIMARY  KEY)
the table consist of fuel_type json object which contains fuel type (diesel,gas,petrol) and value 1 or 0
1 if it provides service otherwise 0
4. A table name `tb_users` which contains data regarding users which book for filling and contains columns is_deleted and is_blocked to check whether user is blocked or deleted or not..
5. A table name `tb_booking` which contains data regarding each booking.
6. Also change bucket name and secretAccessKey and accessKeyId accordingly.
7. The code have routes for uploading file less than 3MB.
8. the route for getting data corresponding to task id
9. the route for getting nearest pump details corresponding to current location


## Steps for running locally
1. Download code
2. npm install




