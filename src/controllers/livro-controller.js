import NaoEncontrado from "../erros/nao-encontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id).exec();
      if (!livroEncontrado) next(new NaoEncontrado("Livro não encontrado."));
      res.status(200).send(livroEncontrado);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autores.findById(novoLivro.autor);
      if (!autorEncontrado)
        next(new NaoEncontrado("Autor do livro não encontrado."));
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const livroCriado = await livros.create(livroCompleto);
      res
        .status(201)
        .send({ message: "Livro cadastrado com sucesso!", livro: livroCriado });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroAtualizado = await livros.findByIdAndUpdate(id, req.body);
      if (!livroAtualizado) next(new NaoEncontrado("Livro não encontrado."));
      res.status(200).send({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroDeletado = await livros.findByIdAndDelete(id);
      if (!livroDeletado)
        next(new NaoEncontrado("Livro não encontrado para deletar."));
      res.status(200).send({ message: "Livro deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca);
        req.resultado = livrosResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
