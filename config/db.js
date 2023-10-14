const mongoose = require("mongoose");
const color = require("colors");


const connectDB = async() =>{ 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', ()=> {
    console.log("Connected to mongodb".bgGreen.white);
})

mongoose.connection.on('error', (err)=>{
    console.error(`Mongodb Connection error ${err}`.bgRed.white);
});
}

module.exports = connectDB;