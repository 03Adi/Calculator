// Get the display element
const display = document.getElementById("display");

// Append a number to the display
function appendNumber(number) {
    if (display.value === "0" || display.value === "Error") {
        display.value = number;
    } else {
        display.value += number;
    }
}

// Append an operator to the display
function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator; // Replace the last operator
    } else {
        display.value += operator;
    }
}

// Clear the display
function clearDisplay() {
    display.value = "0";
}

// Toggle the sign of the current number
function toggleSign() {
    if (display.value && display.value !== "Error") {
        display.value = String(-parseFloat(display.value));
    }
}

// Calculate the result of the expression
function calculateResult() {
    try {
        let expression = display.value;

        // Replace custom operators with JavaScript operators
        expression = expression.replace("÷", "/").replace("×", "*");

        // Handle percentage calculations
        if (expression.includes("%")) {
            expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, number) => {
                return String(parseFloat(number) / 100); // Convert to percentage
            });

            // Ensure it calculates percentages correctly within full expressions
            const regex = /(\d+(\.\d+)?)(%)/g;
            expression = expression.replace(regex, (match, number) => {
                return String(parseFloat(number) / 100); // Convert 10% to 0.1
            });
        }

        display.value = eval(expression); // Evaluate the final expression
    } catch {
        display.value = "Error"; // Handle invalid expressions
    }
}

// Add event listeners for buttons
document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.innerText;

        if (action === "number") {
            appendNumber(value);
        } else if (action === "operator") {
            appendOperator(value);
        } else if (action === "clear") {
            clearDisplay();
        } else if (action === "toggle-sign") {
            toggleSign();
        } else if (action === "equals") {
            calculateResult();
        }
    });
});

