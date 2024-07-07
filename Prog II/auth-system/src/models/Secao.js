class Secao {
    constructor(id_secao, nome){
        this.id_secao = id_secao;
        this.nome = nome;
    }

        getId_secao = function(){
            return this.id_secao;
        }
        getNome = function(){
            return this.nome;
        }
    }