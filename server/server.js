

const express = require("express")
const app = express()
require('dotenv').config();
const cors = require("cors")

require("./configs/mongoose.config")


app.use(cors())
app.use( express.json() ); 
app.use( express.urlencoded({ extended: true }) ); 
// require("./routes/jobs.routes")(app)

require("./routes/stores.routes")(app)



app.listen(8000, ()=>console.log(`Listening on port: 8000`))