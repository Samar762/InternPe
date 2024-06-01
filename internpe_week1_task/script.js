document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                handleNumber(button.innerText);
            } else if (button.classList.contains('operator')) {
                handleOperator(button.id);
            } else if (button.id === 'clear') {
                clear();
            } else if (button.id === 'equals') {
                calculate();
            } else if (button.id === 'sqrt') {
                handleSqrt();
            } else if (button.id === 'square') {
                handleSquare();
            } else if (button.id === 'reciprocal') {
                handleReciprocal();
            } else if (button.id === 'decimal') {
                handleDecimal();
            }
        });
    });

    function handleNumber(number) {
        if (shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (operator !== null) {
            calculate();
        }
        previousInput = currentInput;
        operator = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (operator === null || shouldResetDisplay) return;
        const previous = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        switch (operator) {
            case 'add':
                currentInput = previous + current;
                break;
            case 'subtract':
                currentInput = previous - current;
                break;
            case 'multiply':
                currentInput = previous * current;
                break;
            case 'divide':
                currentInput = previous / current;
                break;
        }
        operator = null;
        previousInput = null;
        shouldResetDisplay = true;
        updateDisplay();
    }

    function handleSqrt() {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay();
    }

    function handleSquare() {
        currentInput = (parseFloat(currentInput) ** 2).toString();
        updateDisplay();
    }

    function handleReciprocal() {
        currentInput = (1 / parseFloat(currentInput)).toString();
        updateDisplay();
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateDisplay();
    }

    function clear() {
        currentInput = '0';
        operator = null;
        previousInput = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    function updateDisplay() {
        display.innerText = currentInput;
    }
});
