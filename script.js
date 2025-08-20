const tela = document.getElementById('tela');
let expressao = '';

function adicionarNumero(numero) {
    expressao += numero;
    tela.value = expressao;
}

function adicionarOperador(operador) {
    // Evita adicionar operador se a expressão estiver vazia ou já terminar com um
    if (expressao === '' && operador !== '-') {
        return;
    }
    const ultimoChar = expressao.slice(-1);
    const operadores = ['+', '-', '*', '/'];

    if (operadores.includes(ultimoChar)) {
        // Substitui o último operador se um novo for pressionado
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
        // Usa a função eval() para avaliar a expressão.
        // CUIDADO: eval() pode ser perigoso se a entrada não for controlada. 
        // Para este caso simples, é aceitável.
        const resultado = eval(expressao);
        tela.value = resultado;
        expressao = String(resultado); // Armazena o resultado para continuar o cálculo
    } catch (error) {
        tela.value = 'Erro';
        expressao = '';
    }
}
