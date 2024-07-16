const express = require("express");

// importando a controller
const ongController = require("./controllers/ongController");
const profileController = require("./controllers/profileController");
const sessionController = require("./controllers/sessionController");
const incidentsController = require("./controllers/incidentsController");

const connection = require("./database/connection");

// Criando a configurações das rotas de acesso
const routes = express.Router();

//Criando as rotas de acesso do projeto
routes.get("/ongs", ongController.index);
routes.post("/ongs", ongController.create);
routes.delete("/ongs/:id", ongController.delete);

routes.get("/incidents", incidentsController.index);
routes.post("/incidents", incidentsController.create);
routes.delete("/incidents/:id", incidentsController.delete);

routes.get("/profile", profileController.index);

routes.post("/sessions", sessionController.create)

module.exports = routes;