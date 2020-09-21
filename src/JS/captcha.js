function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let a = getRandomInt(0, 5), b = getRandomInt(0, 5);

let operators = ["+", "-", "*"];
let operator = operators[Math.floor(Math.random()*operators.length)];
let expr;
switch (operator) {
    case "+":
    expr = a + b;
    break;
    case "-":
    expr = a - b;
    break;
    case "*":
    expr = a * b;
    break;
}

let answer = prompt(`${a} ${operator} ${b}`);
if (answer != expr) {
    document.getElementById("gallery").remove();
}
