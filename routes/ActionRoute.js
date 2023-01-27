const ActionRoute = (app) =>{
   const {create, findAll, findOne, destroy, update} = require("../controller/ActionController"); 

    app.get("/api/action/:id", findOne);
    app.get("/api/action/", findAll);
    app.delete("/api/action/:id", destroy);
    app.put("/api/action/:id", update);
    app.post("/api/action/", create);
}
module.exports = ActionRoute;

