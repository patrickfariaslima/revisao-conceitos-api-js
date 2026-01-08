import NaoEncontrado from "../erros/nao-encontrado.js";
import { autores } from "../models/autor-model.js";
import livros from "../models/livro-model.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livros.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livros.findById(id);
      if (!livroEncontrado) next(new NaoEncontrado("Livro não encontrado."));
      res.status(200).json(livroEncontrado);
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
        .json({ message: "Livro cadastrado com sucesso!", livro: livroCriado });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroAtualizado = await livros.findByIdAndUpdate(id, req.body);
      if (!livroAtualizado) next(new NaoEncontrado("Livro não encontrado."));
      res.status(200).json({ message: "Livro atualizado com sucesso!" });
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
      res.status(200).json({ message: "Livro deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livros.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;
