const display = document.querySelector("#display");
const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"))
const clear = document.querySelector("#clear")
const equals = document.querySelector("#equals")
let pressedEquals;
let cur_operator;
let num1 = "";
let num2 = "";

function add(a, b) {
    
    return +a + +b
}

function subtract(a, b) {
    return +a - +b
}

function multiply(a, b) {
    return +a * +b
}

function divide(a, b) {
    return +a / +b
}


numbers.forEach(number => {
    number.addEventListener("click", chooseNum)
})


operators.forEach(operator => {
    operator.addEventListener("click", chooseOperator)
})


function operate(a, b, operator) {
    if (operator === "add") {
        return add(a, b).toString()
    } else if (operator === "subtract") {
        return subtract(a, b).toString()
    } else if (operator === "multiply") {
        return multiply(a, b).toString()
    } else if (operator === "divide") {
        return divide(a, b).toString()
    }
}

function chooseNum(e) {
    if (pressedEquals) {
        display.textContent = e.target.textContent;
        num1 = "";
        pressedEquals = false
    } else if (e.target.textContent == "." && display.textContent.includes(".")) {
        return
    } 
    else if (display.textContent.length < 11) {
        display.textContent += e.target.textContent
        
        if(num1 && cur_operator && !num2) {
            num2 += e.target.textContent
            display.textContent = num2
        } else if (num1 && cur_operator) {
            num2 += e.target.textContent
        } else {
            num1 += e.target.textContent
        }
        console.log(num1)
        console.log(num2)
    }
}

function chooseOperator(e) {
        if (num1 && num2 && cur_operator) {
            num1 = operate(num1, num2, cur_operator)
            if (num1.length > 11) {
                num1 = num1.substring(0, 11)
            }
            num2 = "";
            cur_operator = null;
            display.textContent = num1
        } else if (!num1) {
            return
        }
        cur_operator = e.target.id
        pressedEquals = false
        console.log(cur_operator)
}

clear.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    cur_operator = null;
    display.textContent = ""
})

equals.addEventListener("click", () => {
    if (num1 && num2 && operators) {
        num1 = operate(num1, num2, cur_operator)
        if (num1.length > 11) {
            num1 = num1.substring(0, 11)
        }
        num2 = "";
        cur_operator = null;
        display.textContent = num1
        pressedEquals = true
    }
})
