function esPrimo() {
  let numeroVerificar = document.getElementById('numeroPrimo').value; 
  let esPrimo = true;
  let divisor = 0; 
  for (let i = 2; i < numeroVerificar; i++) {
    if (numeroVerificar % i === 0) {
      esPrimo = false;
      divisor = i; 
      break;
    }
  }
  if (esPrimo) {
    alert(numeroVerificar + " es un número primo porque solo tiene dos divisores: 1 y " + numeroVerificar + ".");
  } else {
    alert(numeroVerificar + " no es un número primo. Es divisible por " + divisor + ".");
  }
}