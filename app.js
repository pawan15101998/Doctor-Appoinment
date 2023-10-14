const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/event');
const myRouter = require('./bin/index.js');
const morgan = require('morgan');
const color = require('colors');
const connectDB = require('./config/db');
const path = require('path')

dotenv.config();

// mongodb connection
connectDB();

const app = express();


const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.json());


//routes
app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/admin', require('./routes/adminRoutes'))
app.use('/api/v1/doctor', require('./routes/doctorRoutes'))
// app.use('/myapp', myRouter);

// static file
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', )

app.listen(port, ()=> {
    console.log(`Server is running on the ${port}`.bgCyan.white);
})

