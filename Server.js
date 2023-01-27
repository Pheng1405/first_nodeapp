const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 7777;

app.listen(port, ()=>{
    console.log("App is running on port"+port);
});

app.get('/', (req, res)=>{
    res.send("Get success");
});

require("./routes/ZoneRoute")(app);
require("./routes/TourAttractionRoute")(app);
require("./routes/ActionRoute")(app);
require("./routes/PopularTourRoute")(app);
require("./routes/AboutUsRoute")(app);
require("./routes/HelpRoute")(app);
require("./routes/UserRoute")(app);