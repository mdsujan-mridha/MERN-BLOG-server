const app = require("./app");
const dotenv = require("dotenv");
const database = require("./config/databaseConnect");
const port = process.env.PORT || 8000;


// config 
dotenv.config({ path: "./config/config.env" });
// connect with database 
database()

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})

app.get("/", (req, res) => (
    res.send("Your server is working ")
))