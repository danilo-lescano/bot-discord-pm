module.exports = function (msg, Comando){
    var prefix = "!";
    var conteudo = msg.content;
    if(conteudo.substr(0, 1) === "!" && conteudo !== "!"){
        conteudo = conteudo.substr(1).toLowerCase().split(" ");

        var comando = conteudo[0];
        var args = [];
        var exists = Comando[comando] ? true : false;
        for(var i = 1; i < conteudo.length; i++){
            args[i-1] = conteudo[i];
        }
        return {
            nome: comando,
            exists: exists,
            args: args
        };
    }
    else{
        return false;
    }
};