import mongoose from "mongoose";
import ErroBase from "../erros/erro-base.js";
import RequisicaoIncorreta from "../erros/requisicao-incorreta.js";
import ErroValidacao from "../erros/erro-validacao.js";

function manipuladorErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof ErroBase) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorErros;
