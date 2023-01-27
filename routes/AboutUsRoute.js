const AboutUsRoute = (app) =>{
    const {getOne} = require('../controller/AboutUsController');

    app.get("/api/about-us", getOne);
}

module.exports = AboutUsRoute;