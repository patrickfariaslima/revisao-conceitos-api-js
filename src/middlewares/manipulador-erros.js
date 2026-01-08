import mongoose from "mongoose";
import ErroBase from "../erros/erro-base.js";
import RequisicaoIncorreta from "../erros/requisicao-incorreta.js";
import ErroValidacao from "../erros/erro-validacao.js";
import NaoEncontrado from "../erros/nao-encontrado.js";

function manipuladorErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorErros;
