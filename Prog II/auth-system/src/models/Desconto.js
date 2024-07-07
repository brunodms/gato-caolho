class Desconto {
    constructor(id_desconto, id_produto, valor_desconto, descricao, data_inicial, data_final, hora_inicial, hora_final){
        this.id_desconto = id_desconto;
        this.id_produto = id_produto;
        this.valor_desconto = valor_desconto;
        this.descricao = descricao;
        this.data_inicial = data_inicial;
        this.data_final = data_final;
        this.hora_inicial = hora_inicial;
        this.hora_final = hora_final;
    }

        getId_desconto = function(){
            return this.id_desconto;
        }
        getId_produto = function(){
            return this.id_produto;
        }
        getValor_desconto = function(){
            return this.valor_desconto;
        }
        getDescricao = function(){
            return this.descricao;
        }
        getData_inicial = function(){
            return this.data_inicial;
        }
        getData_final = function(){
            return this.data_final;
        }
        getHora_inicial = function(){
            return this.hora_inicial;
        }
        getHora_final = function(){
            return this.hora_final;
        }
    }