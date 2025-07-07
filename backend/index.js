

const express = require('express');
const cors = require('cors');
const {connectDb} = require('./dataBase/mongo')
require('dotenv').config();

const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());

const indexRoutes = require('./routes/index.routes');

app.use('/' , indexRoutes)

connectDb().then(()=> {
    app.listen(port , '0.0.0.0' , ()=> console.log("Server is running " , port))
})
.catch((error)=> console.error("Faild to connect server" , error));

