let currentValue = "";
let operation = "";

const resultDisplay = document.getElementById("result");
const operationDisplay = document.getElementById("operation");

function addValue(value) {

    if (value === "π") {
        currentValue += Math.PI;
    } else if (value === "%") {
        currentValue += "/100";
    } else {
        currentValue += value;
    }

    updateDisplay();
}

function updateDisplay() {
    resultDisplay.textContent = currentValue || "0";
}

function clearCalculator() {
    currentValue = "";
    operation = "";

    resultDisplay.textContent = "0";
    operationDisplay.textContent = "";
}

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    updateDisplay();
}

function calculate() {

    try {

        if (!currentValue) return;

        operationDisplay.textContent = currentValue;

        let expression = currentValue;

        let answer = eval(expression);

        if (!Number.isFinite(answer)) {
            throw new Error();
        }

        currentValue = answer.toString();

        resultDisplay.textContent = currentValue;

    } catch (error) {

        resultDisplay.textContent = "Error";
        currentValue = "";

    }
}

function calculateFunction(type) {

    try {

        let number = parseFloat(currentValue);

        if (isNaN(number)) {
            return;
        }

        let answer;

        switch (type) {

            case "sin":
                answer = Math.sin(number * Math.PI / 180);
                break;

            case "cos":
                answer = Math.cos(number * Math.PI / 180);
                break;

            case "tan":
                answer = Math.tan(number * Math.PI / 180);
                break;

            case "sqrt":
                answer = Math.sqrt(number);
                break;

            case "log":
                answer = Math.log10(number);
                break;

            case "ln":
                answer = Math.log(number);
                break;

            case "square":
                answer = Math.pow(number, 2);
                break;

            case "power":
                currentValue += "**";
                updateDisplay();
                return;
        }

        operationDisplay.textContent = `${type}(${number})`;

        currentValue = answer.toString();

        resultDisplay.textContent = currentValue;

    } catch (error) {

        resultDisplay.textContent = "Error";
        currentValue = "";

    }
}

/* También permite usar el teclado */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        !isNaN(key) ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "(" ||
        key === ")"
    ) {
        addValue(key);
    }

    if (key === "Enter" || key === "=") {
        calculate();
    }

    if (key === "Backspace") {
        deleteLast();
    }

    if (key === "Escape") {
        clearCalculator();
    }

});