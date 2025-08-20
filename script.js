const display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === '0' && number !== '.') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    if (display.value === '') {
        display.value = '0';
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
        if (display.value === 'Infinity' || display.value === '-Infinity') {
            display.value = 'Error';
        }
    } catch (e) {
        display.value = 'Error';
    }
}
