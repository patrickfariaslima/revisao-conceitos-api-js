import ErroBase from "./erro-base.js";

export default class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "Um ou mais dados fornecidos são inválidos.") {
    super(mensagem, 400);
  }
}
