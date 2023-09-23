const express = require("express");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/error");
const  post  = require("./routes/postRouter");


// apply middleware

app.use(cors())
app.use(express.json())



app.use("/api/v1", post)




// use custom middleware
app.use(errorMiddleware);
module.exports = app;