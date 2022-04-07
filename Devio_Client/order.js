const idSession = sessionStorage.getItem('id');
console.log(idSession)

const url = "http://localhost:3001/"


function getProducts () {
    axios.get(url+ idSession)
        .then(response=>{
            const data = response.data;
            console.log(data);
            addInfo(data);
            addCart(data);
        })
    .catch(error => console.log(error))   
}

function addInfo(data){
    var nomeOrder = data.author;
    var formOfPayment = data.formOfPayment;
    var observationOrder = data.observation;
    var tableOrder = data.table;
    var statusOrder = data.status;
    var priceOrder = data.totalPrice;

    document.getElementById('valorOrder').innerHTML = 'R$ ' + priceOrder + ',00';
    document.getElementById('clientOrder').innerHTML = nomeOrder;
    document.getElementById('pagamentoOrder').innerHTML = formOfPayment;
    document.getElementById('observacaoOrder').innerHTML = observationOrder;
    document.getElementById('mesaOrder').innerHTML = tableOrder;

    if(statusOrder == 1){
        document.getElementById('statusPedido').innerHTML = 'Pedido Recebido';
        document.getElementById('statusPedido').style= "font-weight: bold; color: black"
    } else if(statusOrder == 2){
        document.getElementById('statusPedido').innerHTML = 'Preparando seu pedido';
        document.getElementById('statusPedido').style= "font-weight: bold; color: black"
    } else if(statusOrder == 3){
        const music = new Audio('images/audio.mp3');
        music.play();
        music.loop =true
        document.querySelector('body').appendChild(music);
        document.getElementById('statusPedido').innerHTML = 'Pedido pronto para retirada';
        document.getElementById('statusPedido').style= "font-weight: bold; color: black"
    } else if(statusOrder == 4){
        document.getElementById('statusPedido').innerHTML = 'Pedido Finalizado';
        document.getElementById('statusPedido').style= "font-weight: bold; color: #05FF29"
        window.setInterval(()=>{window.location.href = "http://127.0.0.1:5500/Devio_Client/index.html";}, 2000);
    }
}

function addCart(data){
    var productsOrder = data.products;
    console.log(productsOrder)
    
    axios.get(url+ "inicio/produtos")
    .then(response=>{
        const data = response.data;
        var todosProdutos = [];
        if(data){
            productsOrder.forEach((element)=>{
                data.forEach((item)=>{
                    if(item._id == element){
                        todosProdutos.push(item);
                    } 
                })
            })
        }
        for(i=0; i < todosProdutos.length; i++){
            var div = document.createElement('div');
            div.style = "display:grid; grid-template-columns: 1fr 1fr; justify-content: space-between; align-items: center; margin: 0; padding: 0"
            
            var imgProduto = todosProdutos[i].image;
            var nomeProduto = todosProdutos[i].name;
            var priceProduto = todosProdutos[i].price;

            var productsOrderInfo = document.createElement("div");
            div.appendChild(productsOrderInfo)
            var productsOrderInfoText = document.createElement("div");
            div.appendChild(productsOrderInfoText)

            productsOrderInfoText.style="text-align: end; font-size: 20px; grid-column-start: 2; grid-column-end: 3; width: 100%"
            productsOrderInfo.style="text-align: start; grid-column-start: 1; grid-column-end: 2;"
    
    var imgProductOrder = document.createElement("img");
    imgProductOrder.src = imgProduto;
    imgProductOrder.style = "width: 50%; border-radius: 10%"
    productsOrderInfo.appendChild(imgProductOrder);

    var titleProductOrder = document.createElement("div");
    titleProductOrder.innerText = nomeProduto;
    titleProductOrder.style= "color: black; font-weight: bold"
    productsOrderInfoText.appendChild(titleProductOrder);

    var priceProductOrder = document.createElement("div");
    priceProductOrder.innerText = `R$ ${priceProduto}`;
    priceProductOrder.style= "color: black; font-weight: bold";
    productsOrderInfoText.appendChild(priceProductOrder);

    var hr = document.createElement("hr");
    hr.style= "grid-column-start: 1; grid-column-end: 3;"
    div.appendChild(hr);

    document.getElementById("productsOrder").appendChild(div);
        }
    })
    .catch(error => console.log(error))
}
getProducts()