const express= require('express');
const app = express();
const bodyParser = require('body-parser');
require("./connections/db")

app.use(express.json())
app.use("/",require("./routes/Index"))
app.listen(8080,()=>{
    console.log('Listening on port 8080');
});