function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, op) {
    switch (op) {
        case "+":
            return add(+a, +b);
        case "-":
            return subtract(+a, +b);
        case "*":
            return multiply(+a, +b);
        case "/":
            return divide(+a, +b);
        default:
            console.log("Invalid operator!");
            return NaN;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let hasOperator = false;

    // Initialize the current input variable to an empty string
    let currentInput = '';

    // Function to update the calculator display
    function updateDisplay(value) {
        document.getElementById('calculator-display').value = value;
    }

    // Function to evaluate the expression
    function evaluateExpression(input) {
        // Split the input into components
        const components = input.split(/(\+|\-|\*|\/)/g);
        if (components.length != 3) {
            console.log("Invalid input!");
            return 'Error';
        }
        const a = components[0];
        const op = components[1];
        const b = components[2];

        // Perform the operation
        const result = operate(a, b, op);
        if (isNaN(result)) {
            console.log("Operation resulted in an error!");
            return 'Error';
        }
        return result;
    }

    // Function to handle operator buttons
    function handleOperator(operator) {
        if (operator == '=') {
            return;
        }
        if (!hasOperator || currentInput === '') {
            // Append the clicked operator to the current input
            currentInput += operator;
            // Update the display with the current input
            updateDisplay(currentInput);
        }
        hasOperator = true;
    }

    // Get all number buttons
    const numberButtons = document.querySelectorAll('.numbers button[type="button"]');
    numberButtons.forEach((button) => {
        button.addEventListener('click', function () {
            // Append the clicked number to the current input
            currentInput += button.textContent.trim();
            // Update the display with the current input
            updateDisplay(currentInput);
        });
    });

    // Get all operator buttons
    const operatorButtons = document.querySelectorAll('.calculator-button:not(.numbers button)');
    operatorButtons.forEach((button) => {
        button.addEventListener('click', function () {
            handleOperator(button.textContent.trim());
        });
    });

    // Clear button
    document.getElementById('clear-button').addEventListener('click', function () {
        // Clear the current input and update the display
        currentInput = '';
        updateDisplay(currentInput);
        hasOperator = false;
    });

    // Submit (equals) button
    document.getElementById('submit-button').addEventListener('click', function () {
        // Evaluate the current input as an expression and update the display with the result
        const result = evaluateExpression(currentInput);
        updateDisplay(result);
        // Reset the current input to the result for further calculations
        currentInput = result.toString();
        hasOperator = false;
    });
});
