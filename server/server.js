const express = require("express");
const { default: mongoose } = require("mongoose");
const dbConnect = require("./config/mongoDB_connection");
const userRoute = require ("./routes/userRoute")
require ("dotenv").config();
const cors = require("cors");
const app = express();


const PORT = process.env.PORT || 4000;
 app.use(cors());
app.use(express.json());

// mount
app.use("/api/v1",userRoute);

dbConnect();



app.listen(PORT,()=>{
    console.log(`Server is successfully running at port number ${PORT} `);
})