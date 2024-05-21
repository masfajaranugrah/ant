const mongoose = require('mongoose');
const {Schema} = mongoose;

const antrianSchema = new Schema(
  {
      user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true // Menambahkan required agar setiap antrian memiliki pengguna yang terkait
      },
      nomer_antrian: {
          type: String
      },
      status: {
          type: String
      }
  },
  {
      timestamps: true
  }
);

const Antrian = mongoose.model('Antrian', antrianSchema);
module.exports = Antrian;
