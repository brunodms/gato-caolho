class Forma_pagamento {
    constructor(id_forma_pagamento, nome){
        this.id_forma_pagamento = id_forma_pagamento;
        this.nome = nome;
    }

        getId_forma_pagamento = function(){
            return this.id_forma_pagamento;
        }
        getNome = function(){
            return this.nome;
        }
    }