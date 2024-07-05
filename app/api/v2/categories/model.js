const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Panjang Kategori Minimal 3 Karakter"],
      maxLength: [20, "Panjang Kategori Maksimal 20 Karakter"],
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
