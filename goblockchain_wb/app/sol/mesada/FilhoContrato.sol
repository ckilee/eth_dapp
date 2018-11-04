pragma solidity ^0.4.24;

import "./InterfaceFilhoContrato.sol";

contract FilhoContrato is InterfaceFilhoContrato {
    string public nome;
    address public enderecoCarteira;

    event MesadaSacada(address adr,string status);

    constructor(string _nome, address _endereco) public {
        nome = _nome;
        enderecoCarteira = _endereco;
    }
    
    function() public payable{
        emit MesadaRecebida();    
    }
    
    function getNome() view external returns(string) {
        return nome;
    }
    
    function sacar(uint valor) public returns(bool){
        require (enderecoCarteira == msg.sender);
        if(valor<=0){
            address(enderecoCarteira).transfer(address(this).balance);
        }else if(valor<=address(this).balance){
            address(enderecoCarteira).transfer(valor);
        }else{
            emit MesadaSacada(msg.sender,"Falha");
            return false;
        }
        emit MesadaSacada(msg.sender,"sucesso");
        return true;
    }
    
    function verificarSaldo() public view returns(uint256) {
        return address(this).balance;
    }
    
}