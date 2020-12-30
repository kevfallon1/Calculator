//Button declarations
const numButtons = document.querySelectorAll('.numbers');
const textArea = document.querySelector('#textArea');
const clearButton = document.querySelector('#clear');
const singleOperations = document.querySelectorAll('.singleOperations');
const equalsButton = document.querySelector('#equals');
const operatorButtons = document.querySelectorAll(".operations");
const deleteButton = document.querySelector("#dlt");

//Storage var declarations
var currentOperator = ""; 
var currentDisplay = "0";
var storedNum = "";


//Adding event listeners
clearButton.addEventListener("click", clear);
singleOperations.forEach(operation => operation.addEventListener('click', singleOperationListener))
numButtons.forEach(button => button.addEventListener('click', numButtonListener))
equalsButton.addEventListener('click', equalsListener);
operatorButtons.forEach(button => button.addEventListener('click', operatorListener))
deleteButton.addEventListener('click', deleteListener);

//Function for handling basic operaters
function operate(operator, num1, num2) {
    switch(operator) {
        case "*":
            return num1*num2;
        case "/":
            return num1/num2;
        case "+":
            return num1+num2;
        case "-":
            return num1-num2;
    }
}

//Function for handling the single number operations, negating and taking percentage.
function singleOperate(operator, num) {
    switch(operator) {
        case "percent":
            return num/100;
        case "negate":
            return num * -1; 
    }
}

//Takes input from number buttons and determines where to store them and how to display them.
function numButtonListener() {
    if(currentDisplay == 0) {
        currentDisplay = "";
        }
    if(currentOperator != "" && storedNum == "") {
        storedNum = currentDisplay;
        currentDisplay = "";
        }
    if(this.id == "." && currentDisplay.includes(".")) {
        return;
    }
    if(currentDisplay.length < 9) {
        currentDisplay = currentDisplay += this.id;
        textArea.textContent = currentDisplay;
        }
    }

//Calls the single operation function when the single operation buttons are pressed.
function singleOperationListener() {
    currentDisplay = singleOperate(this.id, currentDisplay).toString();
    if(currentDisplay.length > 8) {
        currentDisplay = currentDisplay.substring(0, 8);
    }
    textArea.textContent = currentDisplay;
}

//Clears displayed and stored data when the Clr button is pressed.
function clear() {
    currentDisplay = "0";
    storedNum = "";
    textArea.textContent = currentDisplay; 
}

//Executes basic operation function when the calculator has been provided with valid inputs and the equals button is pressed.
function equalsListener() {
    if(currentOperator != "" && storedNum != "") {
        currentDisplay = operate(currentOperator, parseFloat(storedNum), parseFloat(currentDisplay)).toString();
        if(currentDisplay.length > 8) {
            currentDisplay = currentDisplay.substring(0, 8);
        }
        textArea.textContent = currentDisplay;
        currentOperator = "";
        storedNum = "";
    }
}

//Determines which operator the user has selected. 
function operatorListener() {
    currentOperator = this.id;
}

//Deletes one displayed character from the displayed content.
function deleteListener() {
    if(currentDisplay.length == 1) {
        currentDisplay = "0"
    }
    else if(currentDisplay.length > 0) {
        currentDisplay = currentDisplay.substring(0, currentDisplay.length-1); 
    }
    textArea.textContent = currentDisplay;
}
