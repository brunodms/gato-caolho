class Cargo {
    constructor(id_cargo, cargo){
        this.id_cargo = id_cargo;
        this.cargo = cargo;
    }

        getId_cargo = function(){
            return this.id_cargo;
        }
        getCargo = function(){
            return this.cargo;
        }
    }