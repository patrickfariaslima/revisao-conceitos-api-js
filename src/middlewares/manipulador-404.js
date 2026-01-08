import NaoEncontrado from "../erros/nao-encontrado.js";

export default function manipulador404(req, res, next) {
    const erro404 = new NaoEncontrado();
    next(erro404);
}