class Usuario {
    constructor(id_usuario, nome, cpf, senha, email, telefone, id_cargo, data_admissao, status, id_comanda){
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.email = email;
        this.telefone = telefone;
        this.id_cargo = id_cargo;
        this.data_admissao = data_admissao;
        this.status = status;
        this.id_comanda = id_comanda;
    }

        getId_usuario = function(){
            return this.id_usuario;
        }
        getNome = function(){
            return this.nome;
        }
        getCpf = function(){
            return this.cpf;
        }
        getSenha = function(){
            return this.senha;
        }
        getEmail = function(){
            return this.email;
        }
        getTelefone = function(){
            return this.telefone;
        }
        getId_cargo = function(){
            return this.id_cargo;
        }
        getData_admissao = function(){
            return this.data_admissao;
        }
        getStatus = function(){
            return this.status;
        }
        getId_comanda = function(){
            return this.id_comanda;
        }
    }