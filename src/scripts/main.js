document.addEventListener('DOMContentLoaded', function() { //adiciona um evento de carregamento da página
    document.getElementById('form-sorteador').addEventListener('submit', function(e) { //adiciona um evento de submit ao formulário
        e.preventDefault(); //previne o envio do formulário
        let numeroMaximo = document.getElementById('numero-maximo').value; //pega o valor do input
        numeroMaximo = parseInt(numeroMaximo); //converte para número

        let numeroAleatorio = Math.random() * numeroMaximo; //gera um número aleatório
        numeroAleatorio = Math.floor(numeroAleatorio + 1); //arredonda o número para baixo

        document.getElementById('resultado-valor').innerHTML = numeroAleatorio;//exibe o número
    });
    ;}
);