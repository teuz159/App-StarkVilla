var express = require('express');
var router = express.Router();
var Prod = require('../models/product');
var Order = require('../models/order')

// criar pedido
router.post('/realizarPedido', async (req, res) => {
    const { author, cpf, products, table, observation, formOfPayment, status } = req.body; 
    let items = products
    var valorItems = 0;
    for(i=0; i < items.length; i++){
      var produto = await Prod.find({_id: items[i]});
      var productValue = await produto[0].price
      valorItems += productValue;
    }
    try {
      let order = Order({ author: author, cpf: cpf,  products: products, table: table, totalPrice: valorItems, observation: observation, formOfPayment: formOfPayment, status: status});
      await order.save();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({error: 'Erro ao criar pedido'});
    }
  })


// Acompanhar Pedido em Específico - Tela Cliente
router.get('/:id', async(req, res) =>{
  try {
    const { id } = req.params;
    let order = await Order.findById(id);
    res.json(order);
  } catch (error) {
    res.status(500).json({error: 'Seu pedido não foi realizado'});
  }
})


module.exports = router;