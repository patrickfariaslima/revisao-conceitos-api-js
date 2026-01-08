import ErroBase from "./erro-base.js";

export default class NaoEncontrado extends ErroBase {
    constructor(message = "Página não encontrada") {
        super(message, 404);
    }

}