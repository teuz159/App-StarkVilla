var express = require('express');
var router = express.Router();
var Order = require('../models/order')


router.get('/allOrders', async(req, res) => {
    try {
      let orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({error: 'Você não tem pedidos!'});
    }
  })

  module.exports = router;

router.get("/processando", async(req, res) => {
    try{
    var pedidosProcessando = await Order.find({status: 1});
        res.status(200).json(pedidosProcessando)
    }catch(error){
        res.status(500).json({error: 'Você não tem pedidos!'});
    }
  });

  module.exports = router;

  router.get("/producao", async(req, res) => {
    try{
    var pedidosProducao = await Order.find({status: 2});
        res.status(200).json(pedidosProducao)
    }catch(error){
        res.status(500).json({error: 'Você não tem pedidos!'});
    }
  });

  module.exports = router;

  router.get("/retirada", async(req, res) => {
    try{
    var pedidosRetirada = await Order.find({status: 3});
        res.status(200).json(pedidosRetirada)
    }catch(error){
        res.status(500).json({error: 'Você não tem pedidos!'});
    }
  });

  module.exports = router;

  router.get("/finalizado", async(req, res) => {
    try{
    var pedidosFinalizados = await Order.find({status: 4});
        res.status(200).json(pedidosFinalizados)
    }catch(error){
        res.status(500).json({error: 'Você não tem pedidos!'});
    }
  });

router.put('/:id', async(req, res) => {
    const { status } = req.body;
    const { id } = req.params;
  
    try {
      let order = await Order.findById(id);
      
        order = await Order.findOneAndUpdate(
          {_id: id}, 
          { $set: { status : status}}
        )
        res.json(note);
    } catch (error) {
      res.status(500).json({error: 'Problema ao criar um pedido'});
    }
  })
  
  router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
      let order = await Order.findById(id);
        await order.delete();
        res.json({message: 'OK'}).status(204);
    } catch (error) {
      res.status(500).json({error: 'Problema para Cancelar o Pedido'});
    }
  });
  module.exports = router;
