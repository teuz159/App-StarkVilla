const url = "http://localhost:3001/"


function getOrders () {
    document.getElementById('listaPedidos').innerHTML = '';
    axios.get(url+ "pedidos/allOrders")
        .then(response=>{
            const data = response.data;
            console.log(data);
            if(data.length > 0){
                data.forEach((element)=>{
                   mostrarPedidos(element)
                }); 
            } else{
                var aviso = document.createElement('p')
                aviso.innerHTML = "Você não tem pedidos"
                document.getElementById('listaPedidos').appendChild(aviso)
            }
        })
    .catch(error => console.log(error))   
}

function mostrarPedidos(pedidos){
        var produtos = pedidos.products;
        var author = pedidos.author;
        var observation = pedidos.observation;
        var table = pedidos.table;
        var priceTotal = pedidos.totalPrice;
        var formOfPayment = pedidos.formOfPayment;
        var idOrder = pedidos._id;
        var statusOrder = pedidos.status;
        // essa div é a do pedido
        var div = document.createElement('div');
        div.setAttribute("id", "order")

        div.style = "width: 60%; ; border-radius: 5px; padding: 15px;"


        // essa é a div da lista de produtos do pedido
        var divProdutos = document.createElement('div')
        divProdutos.setAttribute("id", "listaDeProdutos")

        produtos.forEach((item)=>{
            axios.get(url+ "inicio/produtos")
        .then(response=>{
            const data = response.data;
            data.forEach((produto)=>{
                if(item == produto._id){
                    var divProduto = document.createElement('div');
                    divProduto.style = "display:grid; grid-template-columns: 1fr 1fr; align-items: center;"
                    var divImage = document.createElement('div');
                    divImage.style = "text-align: start"
                    var divInfo = document.createElement('div')
                    divInfo.style = "text-align: end"

                    var imgProduto = document.createElement('img');
                    imgProduto.src = produto.image
                    imgProduto.style = "width: 50%; border-radius: 5px;"
                    divImage.appendChild(imgProduto);

                    var nameProduto = document.createElement('p')
                    nameProduto.innerHTML = produto.name
                    divInfo.appendChild(nameProduto);

                    var priceProduto = document.createElement('p')
                    priceProduto.innerHTML = `R$ ${produto.price}`
                    divInfo.appendChild(priceProduto)

                    divProduto.appendChild(divImage)
                    divProduto.appendChild(divInfo)

                    divProdutos.appendChild(divProduto);
                }
            })
        })
    .catch(error => console.log(error))
        })

        div.appendChild(divProdutos)

        var divAuthor = document.createElement('div');
        divAuthor.style = "display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold"
        var nome = document.createElement('p');
        nome.innerHTML = "Nome: "
        divAuthor.appendChild(nome);
        var nomePedido = document.createElement('p')
        nomePedido.innerHTML = author;
        divAuthor.appendChild(nomePedido);
        div.appendChild(divAuthor);

        var divMesa = document.createElement('div')
        divMesa.style = "display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold"
        var mesaTXT = document.createElement('p')
        mesaTXT.innerHTML = 'Mesa:'
        divMesa.appendChild(mesaTXT);
        var mesaOrder = document.createElement('p')
        mesaOrder.innerHTML = table;
        divMesa.appendChild(mesaOrder);
        div.appendChild(divMesa);

        var divPrice = document.createElement('div');
        divPrice.style = "display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold"
        var priceTXT = document.createElement('p');
        priceTXT.innerHTML = 'Preço Total:'
        divPrice.appendChild(priceTXT);
        var pricePedido = document.createElement('p')
        pricePedido.innerHTML = `R$ ${priceTotal}`;
        divPrice.appendChild(pricePedido);
        div.appendChild(divPrice);

        var divObservation = document.createElement('div');
        divObservation.style = "display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold"
        var observationTEXT = document.createElement('p');
        observationTEXT.innerHTML = 'Observação:'
        divObservation.appendChild(observationTEXT);
        var observationOrder = document.createElement('p')
        observationOrder.innerHTML = observation;
        divObservation.appendChild(observationOrder);
        div.appendChild(divObservation);

        var divFormOfPayment = document.createElement('div');
        divFormOfPayment.style = "display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold"
        var TXT = document.createElement('p');
        TXT.innerHTML = 'Forma de Pagamento:'
        divFormOfPayment.appendChild(TXT);
        var formOfPaymentPedido = document.createElement('p')
        formOfPaymentPedido.innerHTML = formOfPayment;
        divFormOfPayment.appendChild(formOfPaymentPedido);
        div.appendChild(divFormOfPayment);

        var divIdOrder = document.createElement('div');
        divIdOrder.style = "display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold; font-size: 15px"
        var idText = document.createElement('p');
        idText.innerHTML = 'Id: '
        divIdOrder.appendChild(idText);
        var idPedido = document.createElement('p')
        idPedido.innerHTML = idOrder;
        divIdOrder.appendChild(idPedido);
        div.appendChild(divIdOrder);

        var divAtualizarOrder = document.createElement('div')
        divAtualizarOrder.style = "display: flex; justify-content: center; margin-bottom: 10px;"

        var selectOrder = adicionarSelect(statusOrder);
        divAtualizarOrder.appendChild(selectOrder)
        selectOrder.style = "margin-right: 10px; color: white; background-color: #5E06A1; border-radius: 5px; border: none; font-weight: bold;"

        var buttonOrder = adicionarBotao()
        divAtualizarOrder.appendChild(buttonOrder)
        buttonOrder.style = "margin-left: 10px; padding: 5px; border-radius: 5px; border: none; background-color: #5E06A1; color: white; font-weight: bold; cursor: pointer"

        div.appendChild(divAtualizarOrder);

        document.getElementById('listaPedidos').appendChild(div);

        console.log('bom dia');

}
function adicionarSelect (status){
    let selectAdd = document.createElement("select")
    
    let status1Option = document.createElement("option")
    status1Option.innerHTML = 'Processando'
    status1Option.setAttribute("value", "Processando")
    selectAdd.appendChild(status1Option)
    
    let status2Option = document.createElement("option")
    status2Option.innerHTML = 'Em Processo'
    status2Option.setAttribute("value", "Producao")
    selectAdd.appendChild(status2Option)

    let status3Option = document.createElement("option")
    status3Option.innerHTML = 'Retirada'
    status3Option.setAttribute("value", "Retirada")
    selectAdd.appendChild(status3Option)

    let status4Option = document.createElement("option")
    status4Option.innerHTML = 'Finalizado'
    status4Option.setAttribute("value", "Finalizado")
    selectAdd.appendChild(status4Option)
    
    if(status == 1){
        status1Option.setAttribute("selected", "selected");
    } else if (status == 2){
        status2Option.setAttribute("selected", "selected");
    } else if (status == 3){
        status3Option.setAttribute("selected", "selected");
    } else if (status == 4){
        status4Option.setAttribute("selected", "selected");
    }

    return selectAdd;
}


function adicionarBotao (){
    let buttonAdd = document.createElement("button")
    buttonAdd.setAttribute("onclick", "alterarStatus()")
    buttonAdd.innerText = "Alterar Pedido"
    return buttonAdd
}
getOrders();


function getOrdersProcessing(){
    document.getElementById('listaPedidos').innerHTML = '';
    axios.get(url+ "pedidos/processando")
        .then(response=>{
            const data = response.data;
            console.log(data);
            if(data.length > 0){
                data.forEach((element)=>{
                   mostrarPedidos(element)
                }); 
            } else{
                var aviso = document.createElement('p')
                aviso.innerHTML = "Você não tem pedidos sendo processados"
                document.getElementById('listaPedidos').appendChild(aviso)
            }
        })
    .catch(error => console.log(error))
}

function getOrdersProduction(){
    document.getElementById('listaPedidos').innerHTML = '';
    axios.get(url+ "pedidos/producao")
        .then(response=>{
            const data = response.data;
            console.log(data);
            if(data.length > 0  ){
                data.forEach((element)=>{
                   mostrarPedidos(element)
                }); 
            } else {
                var aviso = document.createElement('p')
                aviso.innerHTML = "Você não tem pedidos em produção"
                document.getElementById('listaPedidos').appendChild(aviso)
            }
        })
    .catch(error => console.log(error))
}

function getOrdersWithdrawal(){
    document.getElementById('listaPedidos').innerHTML = '';
    axios.get(url+ "pedidos/retirada")
        .then(response=>{
            const data = response.data;
            console.log(data);
            if(data.length > 0  ){
                data.forEach((element)=>{
                   mostrarPedidos(element)
                }); 
            } else {
                var aviso = document.createElement('p')
                aviso.innerHTML = "Você não tem pedidos para retirada"
                document.getElementById('listaPedidos').appendChild(aviso)
            }
        })
    .catch(error => console.log(error))
}                       

function getOrdersFinished(){
    document.getElementById('listaPedidos').innerHTML = '';
    axios.get(url+ "pedidos/finalizado")
        .then(response=>{
            const data = response.data;
            console.log(data);
            if(data.length > 0  ){
                data.forEach((element)=>{
                   mostrarPedidos(element)
                }); 
            } else {
                var aviso = document.createElement('p')
                aviso.innerHTML = "Você não tem pedidos finalizados"
                document.getElementById('listaPedidos').appendChild(aviso)
            }
        })
    .catch(error => console.log(error))
}


function alterarStatus(){
    var evento = event.target.parentNode.childNodes[0].value;
    var eventoId = event.target.parentNode.parentNode.childNodes[6].childNodes[1].innerHTML
    console.log(evento)
    console.log(eventoId)
    if(evento == 'Processando'){
        axios.put(url+ `pedidos/${eventoId}`, {
            status: 1
        })
        .then(response=>{
            const data = response.data;
            console.log(data);
        })
    .catch(error => console.log(error))
    } else if (evento == 'Producao'){
        axios.put(url+ `pedidos/${eventoId}`, {
            status: 2
        })
        .then(response=>{
            const data = response.data;
            console.log(data);
        })
    .catch(error => console.log(error))
    } else if (evento == 'Retirada'){
        axios.put(url+ `pedidos/${eventoId}`, {
            status: 3
        })
        .then(response=>{
            const data = response.data;
            console.log(data);
        })
    .catch(error => console.log(error))
    } else if (evento == 'Finalizado'){
        axios.put(url+ `pedidos/${eventoId}`, {
            status: 4
        })
        .then(response=>{
            const data = response.data;
            console.log(data);
        })
    .catch(error => console.log(error))
    }
}