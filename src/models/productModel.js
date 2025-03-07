const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let categorias = {
    values: ['Clasicos', 'Ficcion', 'Romance', 'Cuentos'],
    message: '{VALUE} no es una categoría válida'
};

const productSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es necesario']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es necesaria'],
        enum: categorias
    },
    urlImagenes: {
        type: String,
        required: [true, 'La imagen es necesaria']
    }
}, { timestamps: true },
);

// PLUGIN PARA VERIFICAR LOS CAMPOS ÚNICOS
productSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports  = mongoose.model("products", productSchema);