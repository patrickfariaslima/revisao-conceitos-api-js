import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
  editora: {
    type: String,
    required: [true, "A editora do livro é obrigatória"],
    enum: {
      values: ["Clássicos", "Casa do Código", "Alura"],
      message: "A editora fornecida não é um valor permitido",
    }
  },
  preco: { type: Number },
  paginas: { type: Number, min: [10, "O número mínimo de páginas é 10"], max : [5000, "O número máximo de páginas é 5000"] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) do livro é obrigatório"],
  },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
