function juegoAdivinador() {
  let min = 1;
  let max = 100; 
  let intentos = 0;
  let numeroAdivinado = Math.floor((min + max) / 2);
  let respuesta = prompt(`Adivinador dice: "Tu número ${numeroAdivinado}. ¿Es mucho mayor, mayor, caliente, si, frio, menor o mucho menor?"`);

  while (respuesta !== "igual" && intentos < 4) {
    switch (respuesta) {
      case "mucho mayor":
        min = numeroAdivinado + 20;
        break;
      case "mayor":
        min = numeroAdivinado + 10;
        break;
      case "mucho menor":
        max = numeroAdivinado - 20;
        break;
      case "menor":
        max = numeroAdivinado - 10;
        break;
      case "casi mas":
        min = numeroAdivinado + 1;
        break;
      case "casi menos":
        max = numeroAdivinado - 1;
        break;
      default:
        alert("Por favor, ingrese una respuesta válida");
        break;
    }

    numeroAdivinado = Math.floor((min + max) / 2);
    respuesta = prompt(`Adivinador dice: "Tu número ${numeroAdivinado}. ¿Es mucho mayor, mayor, caliente, si, frio, menor o mucho menor?"`);
    intentos++;
  }

  let numeroUsuario = document.getElementById('numeroUsuario').value;
  if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
    alert("Por favor, ingrese un número válido entre 1 y 100");
    return;
  }

  if (respuesta === "igual") {
    alert(`Adivinador dice: "¡Felicidades! He adivinado tu número en ${intentos + 1} intentos. El número era ${numeroAdivinado}. El número que ingresaste fue ${numeroUsuario}"`);
  } else {
    alert(`Adivinador dice: "¡He perdido! No pude adivinar tu número en 5 intentos. El número que ingresaste fue ${numeroUsuario}"`);
  }
}