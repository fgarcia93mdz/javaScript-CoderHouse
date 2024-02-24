function esPar() {
  let numeroVerificar = document.getElementById('numeroVerificar').value;
  if (numeroVerificar % 2 === 0) {
    alert(numeroVerificar + " es un número par.");
  } else {
    alert(numeroVerificar + " es un número impar.");
  }
}