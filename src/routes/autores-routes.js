import express from "express";
import AutorController from "../controllers/autor-controller.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.post("/autores", AutorController.cadastrarAutor);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);
export default routes;
