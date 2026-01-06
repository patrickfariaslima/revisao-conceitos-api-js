import express from "express";
import conectaDatabase from "./config/db-connect.js";
import livro from "./models/Livro.js";

const conexao = await conectaDatabase();
conexao.on("error", (error) => console.error("Erro de conexão: ", error));

conexao.once("open", () =>
  console.log("Conexão com o banco feita com sucesso")
);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});

app.get("/livros", async (req, res) => {
  const listaLivros = await livro.find({});
  res.status(200).json(listaLivros);
});

app.get("/autores", (req, res) => {
  res.status(200).send("Entrei na rota autores");
});

app.get("/livros/:id", (req, res) => {
  const id = req.params.id;

  const livro = buscaLivro(id);

  if (livro) {
    res.status(200).json(livro);
  } else {
    res.status(404).send("Livro não encontrado");
  }
});

app.post("/livros", (req, res) => {
  livros.push(req.body);

  res.status(201).send("Livro cadastrado com sucesso!");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaIndex(req.params.id);
  livros[index].titulo = req.body.titulo;

  res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaIndex(req.params.id);
  livros.splice(index, 1);

  res.status(200).send("Livro removido com sucesso");
});

export default app;
