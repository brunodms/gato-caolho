class Item_pedido {
    constructor(id_item_pedido, id_pedido, id_produto, valor, quantidade){
        this.id_item_pedido = id_item_pedido;
        this.id_pedido = id_pedido;
        this.id_produto = id_produto;
        this.valor = valor;
        this.quantidade = quantidade;
    }

        getId_item_pedido = function(){
            return this.id_item_pedido;
        }
        getId_pedido = function(){
            return this.id_pedido;
        }
        getId_produto = function(){
            return this.id_produto;
        }
        getValor = function(){
            return this.valor;
        }
        getQuantidade = function(){
            return this.quantidade;
        }
    }