const ZoneRoute = (app) =>{
    const {findOne, create, findAll, destroy, update} = require('../controller/ZoneController');

    app.get("/api/zone/:id", findOne);
    app.get("/api/zone/", findAll);
    app.post("/api/zone/", create);
    app.put("/api/zone/:id", update);
    app.delete("/api/zone/:id", destroy)
}
module.exports = ZoneRoute;