const mongoose = require("mongoose");

let status = {
    values: ['Pendiente', 'Enviado', 'Entregado', 'Cancelado'],
    message: '{VALUE} no es un estado válido'
};

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true }, // Precio unitario
        subtotal: { type: Number, required: true } // Precio * cantidad
      },
    ],
    precioTotal: { type: Number, required: true },
    status: {
      type: String,
      enum: status,
      default: "Pendiente",
    },
    metodoPago: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", OrderSchema);