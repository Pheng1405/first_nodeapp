const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 10001;

app.listen(port, ()=>{
    console.log("App is running on port"+port);
});

app.get('/', (req, res)=>{
    res.send("Get success");
});

// const io = new WebSocket.Server({ noServer: true });
// global.io = new WebSocket.Server({ noServer: true });


require("./routes/ZoneRoute")(app);
require("./routes/TourAttractionRoute")(app);
require("./routes/ActionRoute")(app);
require("./routes/PopularTourRoute")(app);
require("./routes/AboutUsRoute")(app);
require("./routes/HelpRoute")(app);
require("./routes/UserRoute")(app);