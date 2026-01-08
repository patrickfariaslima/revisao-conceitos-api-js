import NaoEncontrado from "../erros/nao-encontrado.js";
import { autores } from "../models/autor-model.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const autoresResultado = await autores.find({});
      res.status(200).json(autoresResultado);
    } catch (error) {
      next(error);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);
      if (!autorResultado ) next(new NaoEncontrado("Autor não encontrado."));
      
      res.status(200).json(autorResultado);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();

      res.status(201).json({
        message: "Autor cadastrado com sucesso!",
        autor: autorResultado,
      });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorAtualizado = await autores.findByIdAndUpdate(id, req.body);
      if (!autorAtualizado) next(new NaoEncontrado("Autor não encontrado."));
      res.status(200).json({ message: "Autor atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorDeletado = await autores.findByIdAndDelete(id);
      if (!autorDeletado) next(new NaoEncontrado("Autor não encontrado para deletar."));
      res.status(200).json({ message: "Autor deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;
