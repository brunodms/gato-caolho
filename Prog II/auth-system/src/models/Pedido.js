class Pedido {
    constructor(id_pedido, id_comanda, mesa, status, valor_total, data_pedido, hora_pedido){
        this.id_pedido = id_pedido;
        this.id_comanda = id_comanda;
        this.mesa = mesa;
        this.status = status;
        this.valor_total = valor_total;
        this.data_pedido = data_pedido;
        this.hora_pedido = hora_pedido;
    }

        getId_pedido = function(){
            return this.id_pedido;
        }
        getId_comanda = function(){
            return this.id_comanda;
        }
        getMesa = function(){
            return this.mesa;
        }
        getStatus = function(){
            return this.status;
        }
        getValor_total = function(){
            return this.valor_total;
        }
        getData_pedido = function(){
            return this.data_pedido;
        }
        getHora_pedido = function(){
            return this.hora_pedido;
        }
    }