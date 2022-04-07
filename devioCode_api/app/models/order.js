var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    table: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    observation: {
        type: String,
    },
    formOfPayment: {
        type: String,
        required: true,
    },
    //são Quatro Estados:
    /*
    1 - Processando Pedido
    2 - Em produção
    3 - Retirada
    4 - Pedido Finalizado
    */
    status: {
        type: Number,
        min: 1,
        max: 4,
        default: 1,
    }
})

module.exports = mongoose.model('Order', orderSchema);