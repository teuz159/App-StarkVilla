const mongoose = require('mongoose');
const Product = require('./app/models/product');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/devioDesafio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.log(err))

const seedProducts = [
    {
        name: 'Stark Quarteirão',
        price: 20,
        image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Stark Duplo Quarteirão',
        price: 25,
        image: 'https://images.unsplash.com/photo-1614891669421-964261109bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'
    },
    {
        name: 'Stark Villa',
        price: 30,
        image: 'https://images.unsplash.com/photo-1614602638662-c7c1f55c33f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Stark Chicken',
        price: 30,
        image: 'https://images.unsplash.com/photo-1615297928064-24977384d0da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80'
    },
    {
        name: 'Stark Molho EDITIONX',
        price: 30,
        image: 'https://images.unsplash.com/photo-1609167921669-4561a5b64e28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Stark Model X',
        price: 30,
        image: 'https://images.unsplash.com/photo-1609167921919-9436787fdecd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Porção de Coxinha',
        price: 25,
        image: 'https://img.freepik.com/fotos-gratis/coxinha-um-petisco-brasileiro-com-bar-no-espaco_306105-705.jpg?t=st=1649245676~exp=1649246276~hmac=c9e303c1c920c2bffbe985d72342fd407508bbeaab71bbd13f4744628b15a7a7&w=900'
    },
    {
        name: 'Feijoada',
        price: 50,
        image: 'https://img.freepik.com/fotos-gratis/prato-tipico-brasileiro-chamado-feijoada-feito-com-feijao-preto-porco-e-linguica_261158-1562.jpg?w=900'
    },
    {
        name: 'Moqueca Capixaba',
        price: 55,
        image: 'https://www.sumerbol.com.br/uploads/images/2018/12/moqueca-capixaba-1544446292.jpg'
    },
    {
        name: 'Prato Strogonoff',
        price: 25,
        image: 'https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/chicken-&-other-poultry-dishes/strogonoff-de-frango/main-header.jpg'
    },
    {
        name: 'Picanha com Batata',
        price: 60,
        image: 'https://570341-1841894-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/10/picanha-com-batata.jpg'
    },
    {
        name: 'Macarronada',
        price: 30,
        image: 'https://img.cybercook.com.br/receitas/634/macarronada-3.jpeg'
    },
    {
        name: 'Pudim',
        price: 15,
        image: 'https://vivareceita-cdn.s3.amazonaws.com/uploads/2021/05/Aprenda-como-fazer-pudim-de-leite-simples.-Fonte-Broma-Bakery-500x500.jpg'
    },
    {
        name: 'Sorvete com Wafer',
        price: 15,
        image: 'https://www.comidaereceitas.com.br/wp-content/uploads/2021/06/sobremesa_sorvete-780x608.jpg'
    },
    {
        name: 'Torta de Limão',
        price: 15,
        image: 'https://conteudo.imguol.com.br/c/entretenimento/da/2021/05/28/torta-de-limao-simples-1622228849556_v2_4x3.jpg'
    },
    {
        name: 'Coca Cola 2L',
        price: 10,
        image: 'https://www.drogariaminasbrasil.com.br/media/product/46e/refrigerante-coca-cola-lata-zero-350ml-904.jpg'
    },
    {
        name: 'Heineken',
        price: 15,
        image: 'https://supernossoemcasa.vteximg.com.br/arquivos/ids/257355-1000-1000/111991_3.jpg?v=637756235531470000'
    },
    {
        name: 'Corona',
        price: 15,
        image: 'https://a-static.mlcdn.com.br/1500x1500/cerveja-corona-long-neck-330ml/imigrantesbebidas/305/479edaf9f06ff6f79da17a368819e121.jpg'
    },
]

const seedDb = async()=>{
    await Product.deleteMany({})
    await Product.insertMany(seedProducts)
};

seedDb().then(()=>{
    mongoose.connection.close();
})