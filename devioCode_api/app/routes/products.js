var express = require('express');
var router = express.Router();
var Prod = require('../models/product');

//realizar busca de um produto

router.get('/produtos', async(req, res) => {
  try {
    let products = await Prod.find();
    console.log(products)
    res.json(products);
  } catch (error) {
    res.status(500).json({error: 'Você não tem produtos'});
  }
})

module.exports = router;

router.get('/search', async(req, res) => {
  const { query } = req.query;
  try {
    let products = await Prod.find({ $text: {$search: query }});
    res.json(products);
  } catch (error) {
    res.json({error: error}).status(500);
  }
});

module.exports = router;