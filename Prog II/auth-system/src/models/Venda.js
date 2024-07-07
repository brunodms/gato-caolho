class Venda {
    constructor(id_venda, id_comanda, id_forma_pagamento, valor_total, valor_pago, data_venda, hora_venda){
        this.id_venda = id_venda;
        this.id_comanda = id_comanda;
        this.id_forma_pagamento = id_forma_pagamento;
        this.valor_total = valor_total;
        this.valor_pago = valor_pago;
        this.data_venda = data_venda;
        this.hora_venda = hora_venda;
    }

        getId_venda = function(){
            return this.id_venda;
        }
        getId_comanda = function(){
            return this.id_comanda;
        }
        getId_forma_pagamento = function(){
            return this.id_forma_pagamento;
        }
        getValor_total = function(){
            return this.valor_total;
        }
        getValor_pago = function(){
            return this.valor_pago;
        }
        getData_venda = function(){
            return this.data_venda;
        }
        getHora_venda = function(){
            return this.hora_venda;
        }
    }