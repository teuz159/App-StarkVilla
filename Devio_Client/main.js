const url = "http://localhost:3001/"

class Products {
    constructor(id, name, price, image){
        this.id = id
        this.name = name
        this.price = price
        this.image = image
    }
}

function getProducts () {
    axios.get(url+ "inicio/produtos")
        .then(response=>{
            const data = response.data;
            if(data){
                var id = [];
                var name = [];
                var price = [];
                var image = [];
                data.forEach((element)=>{
                    id.push(element._id)
                    name.push(element.name)
                    price.push(element.price)
                    image.push(element.image)
                });
                var products = new Products(id, name, price, image)
                addProducts(products);  
            } 
        })
    .catch(error => console.log(error))   
}

getProducts()


function addProducts (product) {
        for(var i=0; i < product.image.length; i++){
            var productsList  = document.createElement("div");
            var idProduct = product.id[i]
            var nameProduct = product.name[i];
            var priceProduct = product.price[i];
            var imageProduct = product.image[i];
                
                var imageProducts = imageProduct;
                var imgProduct = document.createElement("img");
                imgProduct.src = imageProducts;
                imgProduct.style = "width: 70%; height: 70%; border-radius: 5px; margin-top: 5px;";
                 productsList.appendChild(imgProduct);

                var nameProducts = document.createElement("p");
                nameProducts.innerText = nameProduct;
                nameProducts.style = "color: black; margin-top: 10px";
                productsList.appendChild(nameProducts);

                var priceProducts = document.createElement("p");
                priceProducts.innerText = 'R$ ' + priceProduct;
                priceProducts.style = "color: #05FF00;";
                productsList.appendChild(priceProducts);

                var button = adicionarBotao();
                button.style = "border: none; padding: 5px; background-color: #5E06A1; cursor: pointer;  color: white; margin-top: 10px; border-radius: 5px"

                productsList.appendChild(button);

                productsList.style = "margin: 20px; margin-top: 30px"

            document.getElementById("ListaDeProdutos").appendChild(productsList);
    }
    
}

function adicionarBotao (){
    let buttonAdd = document.createElement("button")
    buttonAdd.setAttribute("onclick", "adicionarAoPedido()")
    buttonAdd.innerText = "Adicionar ao Pedido"
    return buttonAdd
}

function adicionarAoPedido(){
    let div = event.target.parentNode
    let parentes = div.childNodes;
    let imagemProduto = parentes[0].src;
    let nomeProduto = parentes[1].innerHTML;
    let priceProduto = parentes[2].innerHTML;

    var productsOrder  = document.createElement("div");
    productsOrder.style = "display:grid; grid-template-columns: 1fr 1fr 1fr; justify-content: space-between; align-items: center; margin-top: 20px"



    var productsOrderInfo = document.createElement("div");
    productsOrder.appendChild(productsOrderInfo)
    var productsOrderInfoText = document.createElement("div");
    productsOrder.appendChild(productsOrderInfoText)
    var productsOrderBotao = document.createElement("div");
    productsOrder.appendChild(productsOrderBotao)

    productsOrderInfo.style="display: flex; justify-content: space-around; align-items: center; text-align: start"
    
    var imgProductOrder = document.createElement("img");
    imgProductOrder.src = imagemProduto;
    imgProductOrder.style = "width: 60%; height: 40%; border-radius: 30px; margin-bottom: 15px"
    productsOrderInfo.appendChild(imgProductOrder);

    

    var titleProductOrder = document.createElement("div");
    titleProductOrder.innerText = nomeProduto
    titleProductOrder.style= "color: #5E06A1"
    productsOrderInfoText.appendChild(titleProductOrder);

    var priceProductOrder = document.createElement("div");
    priceProductOrder.innerText = priceProduto;
    priceProductOrder.style= "color: #05FF00;";
    productsOrderInfoText.appendChild(priceProductOrder);

    var button = removerBotao();
        button.style = "border: none; padding: 5px; background-color: #5E06A1; cursor: pointer;  color: white; margin-top: 10px; margin-bottom: 20px"

    productsOrderBotao.appendChild(button);

    var hr = document.createElement("hr");
    hr.style= "grid-column-start: 1; grid-column-end: 4;"
    productsOrder.appendChild(hr);

    document.getElementById("order").appendChild(productsOrder);

    atualizarPreco(priceProduto)
}

function removerBotao (){
    let buttonRemove = document.createElement("button")
    buttonRemove.setAttribute("onclick", "removerPedido()")
    buttonRemove.innerText = "Remover"
    return buttonRemove
}

function removerPedido (){
    let removerPedido = event.target.parentNode.parentNode
    document.getElementById("order").removeChild(removerPedido)
    let price = removerPedido.children[1].children[1].innerText;
    atualizarPreco(price);
}

var valorProdutoNumber = 0;
function atualizarPreco (valorProduto){
    var orders = document.getElementById("order").childNodes;

    var y = event.target.innerText;
    var z = 0; 

        if(valorProduto == "R$ 30"){
            z = 30;
        } else if(valorProduto == "R$ 25"){
            z = 25
        } else if(valorProduto == "R$ 20"){
            z = 20
        } else if (valorProduto == 'R$ 50'){
            z = 50
        } else if (valorProduto == 'R$ 55'){
            z = 55
        } else if (valorProduto == 'R$ 60'){
            z = 60
        } else if (valorProduto == 'R$ 15'){
            z = 15
        } else if (valorProduto == 'R$ 10'){
            z = 10
        }
   
    if(y == 'Adicionar ao Pedido'){
        valorProdutoNumber += z;
    } else if(y == "Remover"){
        valorProdutoNumber -= z;
    }


    
    var valorOrderTotal = 0;
    
    valorOrderTotal = valorOrderTotal + valorProdutoNumber    
    
    var valorOrder = document.getElementById("valorOrder").children;
    valorOrder[1].innerText = 'R$ ' + valorOrderTotal;
}

function getProduct () {
    var idBuscado = buscarProduto()
    if(!idBuscado){
        return;
    }
    axios.get(url+ `inicio/search?query=${idBuscado}`)
      
        .then(response=>{
            const data = response.data;
            if(data.length == 0){
                return;
            } else{
                var id = [];
                var name = [];
                var price = [];
                var image = [];
                data.forEach((element)=>{
                    id.push(element._id)
                    name.push(element.name)
                    price.push(element.price)
                    image.push(element.image)
                });
                var products = new Products(id, name, price, image)
                addProductsSearch(products);
            }
        })    

        .catch(error => console.log(error))
      
}

function buscarProduto(){
    var constatar = document.getElementById('ListaDeProdutos').children;
    if(constatar.length == 18){
        var nomeBusca = document.getElementById("serch").value;
        if(!nomeBusca){
            alert("Procure por um produto");
        } else{
            return nomeBusca
        }
    } else {
        var nomeBuscaDepois = document.getElementById("serch").value;
        if(!nomeBuscaDepois){
            var constatar = document.getElementById('ListaDeProdutos');
            constatar.innerHTML = "";
            getProducts()
        } else{
            var nomeBusca = document.getElementById("serch").value;
            return nomeBusca
        }
    }
    
}

function addProductsSearch(products){
    var qualquer = document.getElementById("ListaDeProdutos");
    qualquer.innerHTML = '';
    var productsSearch = products;
    
    for(var i = 0; i < productsSearch.image.length; i++){
        
        var div = document.createElement("div");

        var imageProductSearch = productsSearch.image[i];
        var nomeProductSearch = productsSearch.name[i];
        var price = productsSearch.price[i];

        
                var imgProduct = document.createElement("img");
                imgProduct.src = imageProductSearch;
                imgProduct.style = "width: 70%; height: 30%; border-radius: 30%; margin-top: 5px;";
                 div.appendChild(imgProduct);

                var nameProducts = document.createElement("p");
                nameProducts.innerText = nomeProductSearch;
                nameProducts.style = "color: #5E06A1; margin-top: 10px";
                div.appendChild(nameProducts);

                var priceProducts = document.createElement("p");
                priceProducts.innerText = 'R$ ' + price;
                priceProducts.style = "color: #05FF00;";
                div.appendChild(priceProducts);

                var button = adicionarBotao();
                button.style = "border: none; padding: 5px; background-color: #5E06A1; cursor: pointer;  color: white; margin-top: 10px"

                div.appendChild(button);

                div.style = "margin: 20px; margin-top: 30px"

            document.getElementById("ListaDeProdutos").appendChild(div);
    }
}

class Order {
    constructor(author, cpf, table, observation, formOfPayment){
        this. author= author
        this.cpf = cpf
        this.table = table
        this.observation = observation
        this.formOfPayment = formOfPayment
    }
}

var idOrder;

function postOrder () {  
    
    var authorOrder = document.getElementById('authorOrder').value;
    var cpfOrder = parseInt(document.getElementById('cpfOrder').value);
    var tableOrder = parseInt(document.getElementById('mesaOrder').value);
    var observationOrder = document.getElementById("observationOrder").value;
    var formOfPaymentOrder = document.querySelector("select[name='opcaoPagamento'] option:checked").text;
    var productsOrderSendX = document.getElementById('order').childNodes; 

    var arrayTeste = [];
    
    if(productsOrderSendX.length == 0){
        alert("Para criar um pedido, adicione algum produto.")
    } else{
        for(var i = 0; i < productsOrderSendX.length; i++){
            var x = productsOrderSendX[i].childNodes[1].childNodes[0].innerHTML;
            if(x == 'Stark Villa'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed1")
            } else if (x == 'Stark Chicken'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed2")
            } else if (x == 'Stark Quarteirão'){
                arrayTeste.push("624da9dd977b9b9e0ce9becf")
            } else if (x == 'Stark Duplo Quarteirão'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed0")
            } else if (x == 'Stark Molho EDITIONX'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed3")
            } else if (x == 'Stark Model X'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed4")
            } else if (x == 'Porção de Coxinha'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed5")
            } else if (x == 'Feijoada'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed6")
            } else if (x == 'Moqueca Capixaba'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed7")
            } else if (x == 'Prato Strogonoff'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed8")
            } else if (x == 'Picanha com Batata'){
                arrayTeste.push("624da9dd977b9b9e0ce9bed9")
            } else if (x == 'Macarronada'){
                arrayTeste.push("624da9dd977b9b9e0ce9beda")
            } else if (x == 'Pudim'){
                arrayTeste.push("624da9dd977b9b9e0ce9bedb")
            } else if (x == 'Sorvete com Wafer'){
                arrayTeste.push("624da9dd977b9b9e0ce9bedc")
            } else if (x == 'Torta de Limão'){
                arrayTeste.push("624da9dd977b9b9e0ce9bedd")
            } else if (x == 'Coca Cola 2L'){
                arrayTeste.push("624da9dd977b9b9e0ce9bede")
            } else if (x == 'Heineken'){
                arrayTeste.push("624da9dd977b9b9e0ce9bedf")
            } else if (x == 'Corona'){
                arrayTeste.push("624da9dd977b9b9e0ce9bee0")
            } 
        }
            
        
    axios.post(url+ "realizarPedido", {
        author: authorOrder,
        cpf: cpfOrder,
        products: arrayTeste,
        table: tableOrder,
        observation: observationOrder,
        formOfPayment: formOfPaymentOrder
    })
    .then(response=>{
            const data = response.data;
            idOrder = data._id;
            sessionStorage.setItem('id', idOrder);
            window.location.href = "http://127.0.0.1:5500/Devio_Client/order.html";
    })        
    .catch(error => console.log(error))
    }
}


