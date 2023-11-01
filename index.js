const express = require('express');
const AppRoutes = require('./src/routes/hall.js')
const app = express();

app.use(express.json());
app.use('/',AppRoutes)


app.listen(6001, ()=> console.log("Server listening to port 6001"));