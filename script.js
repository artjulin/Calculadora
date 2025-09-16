const tela = document.getElementById('tela');
let expressao = '';

function adicionarNumero(numero) {
    expressao += numero;
    tela.value = expressao;
}

function adicionarOperador(operador) {
 
    if (expressao === '' && operador !== '-') {
        return;
    }
    const ultimoChar = expressao.slice(-1);
    const operadores = ['+', '-', '*', '/'];

    if (operadores.includes(ultimoChar)) {
       
        expressao = expressao.slice(0, -1) + operador;
    } else {
        expressao += operador;
    }
    tela.value = expressao;
}

function limparTela() {
    expressao = '';
    tela.value = '';
}

function apagarUltimo() {
    expressao = expressao.slice(0, -1);
    tela.value = expressao;
}

function calcular() {
    try {
       
        const resultado = eval(expressao);
        tela.value = resultado;
        expressao = String(resultado); 
    } catch (error) {
        tela.value = 'Erro';
        expressao = '';
    }
}
