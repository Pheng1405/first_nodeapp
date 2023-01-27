const TourAttraction = (app) =>{
    const {findOne, create, findAll, destroy, update} = require('../controller/TourAttractionController');

    app.get("/api/tour/:id", findOne);
    app.get("/api/tour/", findAll);
    app.post("/api/tour/", create);
    app.put("/api/tour/:id", update);
    app.delete("/api/tour/:id", destroy)
    
}
module.exports = TourAttraction;