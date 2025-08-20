document.addEventListener('DOMContentLoaded', () => {
    const displayResult = document.getElementById('result');
    const displayHistory = document.getElementById('history');
    const buttons = document.querySelector('.buttons');
    let currentInput = '0';
    let firstValue = null;
    let operator = null;
    let waitForSecondValue = false;

    function updateDisplay() {
        displayResult.textContent = currentInput;
    }

    function handleInput(value) {
        if (waitForSecondValue) {
            currentInput = value;
            waitForSecondValue = false;
        } else {
            if (currentInput === '0' || currentInput === 'Error') {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }
        updateDisplay();
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitForSecondValue) {
            operator = nextOperator;
            return;
        }

        if (firstValue === null) {
            firstValue = inputValue;
        } else if (operator) {
            const result = performCalculation(firstValue, inputValue, operator);
            currentInput = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

        waitForSecondValue = true;
        operator = nextOperator;
        displayHistory.textContent = `${firstValue} ${operator}`;
        updateDisplay();
    }

    function performCalculation(first, second, op) {
        switch (op) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '&times;':
                return first * second;
            case '&divide;':
                if (second === 0) {
                    return 'Error';
                }
                return first / second;
            default:
                return second;
        }
    }

    function handleEquals() {
        if (operator) {
            const secondValue = parseFloat(currentInput);
            const result = performCalculation(firstValue, secondValue, operator);
            currentInput = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
            operator = null;
            waitForSecondValue = true;
            displayHistory.textContent = '';
            updateDisplay();
        }
    }

    function handleClear() {
        currentInput = '0';
        firstValue = null;
        operator = null;
        waitForSecondValue = false;
        displayHistory.textContent = '';
        updateDisplay();
    }

    buttons.addEventListener('click', (event) => {
        const { textContent } = event.target;
        if (textContent >= '0' && textContent <= '9') {
            handleInput(textContent);
        } else if (textContent === '.') {
            handleDecimal();
        } else if (textContent === '=') {
            handleEquals();
        } else if (textContent === 'C') {
            handleClear();
        } else {
            handleOperator(textContent);
        }
    });

    updateDisplay();
});
