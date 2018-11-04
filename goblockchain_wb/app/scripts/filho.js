var abiFilho = [ { "constant": true, "inputs": [], "name": "nome", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "enderecoCarteira", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "verificarSaldo", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "valor", "type": "uint256" } ], "name": "sacar", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getNome", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_nome", "type": "string" }, { "name": "_endereco", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "adr", "type": "address" }, { "indexed": false, "name": "status", "type": "string" } ], "name": "MesadaSacada", "type": "event" }, { "anonymous": false, "inputs": [], "name": "MesadaRecebida", "type": "event" }, { "anonymous": false, "inputs": [], "name": "MesadaSacada", "type": "event" } ];

var enderecoPA;


function carregarInstanciaFilho() {
    var FilhoContrato = web3.eth.contract(abiFilho);
    var enderecoContrato = $("#enderecoContrato").val();
    var PaiInstance = FilhoContrato.at(enderecoContrato);
    return PaiInstance;
}

function consultarFilho(){
    var FilhoInstance = carregarInstanciaFilho();

    FilhoInstance.nome(function (error, valor) {
        $("#nomeConsulta").val(valor);
    }); 

    web3.eth.getBalance($("#enderecoContrato").val(), function(error, result) {
        if(error) {
            console.error(error);
        } else {
            $("#saldoConsulta").val(web3.fromWei(result, 'ether').toFixed(2));
        }
    });
    var accountAddress = web3.eth.accounts[0];
    web3.eth.getBalance(accountAddress, function(error, result) {
        if(error) {
            console.error(error);
        } else {
            $("#carteiraConsulta").val(web3.fromWei(result, 'ether').toFixed(2));
        }
    });

}

function sacar(){
    var sacarValor = $("#sacarValor").val();
    if(sacarValor==null||sacarValor==""){
        sacarValor = "0";
    }
    var FilhoInstance = carregarInstanciaFilho();
    FilhoInstance.sacar(web3.toWei(sacarValor), {from: web3.eth.accounts[0], gas:4700000}, function(error,result){
        if(error){
            console.error(error);
        }else{
            console.log("saque efetuado:"+result);
        }
    });
    startEvents();
}

function startEvents() {
    var instance = carregarInstanciaFilho();
    var evento  = instance.MesadaSacada();
    evento.watch(function(error, result){
        console.info(result);
        if(result)
            $("#evento").text("Evento " + result.args.adr + " - " + result.args.status);
    });
}