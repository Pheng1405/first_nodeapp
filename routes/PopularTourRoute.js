const PopularTourRoute = (app) =>{
    const {findAll, findLimit, findLimitThumbnail, findOne, findRelated} = require("../controller/PopularTourController");

    app.get("/api/popular/", findAll);
    app.get("/api/popular/limit=:limit", findLimit);
    app.get("/api/popular/thumbnail/limit=:limit", findLimitThumbnail);
    app.get("/api/popular/:id", findOne);
    app.get("/api/popular/:zone_name/:id", findRelated);
}
module.exports = PopularTourRoute;