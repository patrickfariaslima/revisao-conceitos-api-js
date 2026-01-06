import express from "express";
import conectaDatabase from "./config/db-connect.js";
import routes from "./routes/index.js";

const conexao = await conectaDatabase();
conexao.on("error", (error) => console.error("Erro de conexão: ", error));

conexao.once("open", () =>
  console.log("Conexão com o banco feita com sucesso")
);

const app = express();
routes(app);

app.delete("/livros/:id", (req, res) => {
  const index = buscaIndex(req.params.id);
  livros.splice(index, 1);

  res.status(200).send("Livro removido com sucesso");
});

export default app;
