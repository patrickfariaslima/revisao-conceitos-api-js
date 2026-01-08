import express from "express";
import db from "./config/db-connect.js";
import routes from "./routes/index.js";
import manipuladorErros from "./middlewares/manipulador-erros.js";
import manipador404 from "./middlewares/manipulador-404.js";

db.on("error", (error) => console.error("Erro de conexão: ", error));

db.once("open", () => console.log("Conexão com o banco feita com sucesso"));

const app = express();
app.use(express.json());
routes(app);
app.use(manipador404);
app.use(manipuladorErros);

export default app;
