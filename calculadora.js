const prompt = require("prompt-sync")();

class Calculadora {
  sumar(a, b) {
    return a + b;
  }

  restar(a, b) {
    return a - b;
  }

  multiplicar(a, b) {
    return a * b;
  }

  dividir(a, b) {
    if (b === 0) {
      return "Error: No es posible dividir por cero.";
    }
    return a / b;
  }
}

const calc = new Calculadora();

const num1 = parseFloat(prompt("Ingresa el primer numero:"));
const operador = prompt("Ingresa la operacion (+, -, *, /): ");
const num2 = parseFloat(prompt("Ingresa el segundo numero: "));

if (isNaN(num1) || isNaN(num2)) {
  console.log("Error: debes ingresar numero validos.");
} else {
  let resultado;

  switch (operador) {
    case "+":
      resultado = calc.sumar(num1, num2);
      break;
    case "-":
      resultado = calc.restar(num1, num2);
      break;
    case "*":
      resultado = calc.multiplicar(num1, num2);
      break;
    case "/":
      resultado = calc.dividir(num1, num2);
      break;
    default:
      resultado = "Error: Operador no valido.";
  }

  console.log("Resultado:", resultado);
}