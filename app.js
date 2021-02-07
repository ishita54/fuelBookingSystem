const express    = require('express');
const app        = express();

const bodyparser = require('body-parser')




app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use('/booking', booking_routes);


app.listen(3000);


