var informes = [];

function agregarInforme() {
  var titulo = prompt('Ingrese el título del informe');
  var fechaActual = new Date();
  fechaActual.setHours(fechaActual.getHours() - 3);
  var fechaAuto = fechaActual.toISOString().slice(0, 16).replace('T', ' ');
  var fecha = prompt('Ingrese la fecha y hora del informe', fechaAuto);
  var sector = prompt('Ingrese el sector del informe');
  var involucrado = prompt('Ingrese el nombre del involucrado');
  var autor = prompt('Ingrese el nombre del autor');
  var informeContenido = prompt('Ingrese el contenido del informe');

  if (!titulo || !sector || !involucrado || !autor || !fecha || !informeContenido) {
    alert('Todos los campos son obligatorios');
    return;
  }

  var informe = {
    titulo: titulo,
    sector: sector,
    involucrado: involucrado,
    autor: autor,
    fecha: fecha,
    informe: informeContenido,
    numeroInforme: informes.length + 1
  };

  informes.push(informe);

  mostrarInformes();

  alert('Informe agregado correctamente');

  console.log(informes);
  console.log("Total de informes: " + informes.length);
}

function mostrarInformes() {
  var contenedor = document.getElementById('contenedor-informes');

  contenedor.innerHTML = '';

  informes.forEach(function (informe) {
    var elementoInforme = document.createElement('div');
    elementoInforme.className = 'informe';

    var numeroInforme = document.createElement('h2');
    numeroInforme.textContent = 'Informe N°: ' + informe.numeroInforme;
    elementoInforme.appendChild(numeroInforme);

    var titulo = document.createElement('p');
    titulo.textContent = 'Título: ' + informe.titulo;
    elementoInforme.appendChild(titulo);

    var sector = document.createElement('p');
    sector.textContent = 'Sector: ' + informe.sector;
    elementoInforme.appendChild(sector);

    var involucrado = document.createElement('p');
    involucrado.textContent = 'Involucrado: ' + informe.involucrado;
    elementoInforme.appendChild(involucrado);

    var autor = document.createElement('p');
    autor.textContent = 'Autor: ' + informe.autor;
    elementoInforme.appendChild(autor);

    var fecha = document.createElement('p');
    fecha.textContent = 'Fecha: ' + informe.fecha;
    elementoInforme.appendChild(fecha);

    var contenidoInforme = document.createElement('p');
    contenidoInforme.textContent = 'Informe: ' + informe.informe;
    elementoInforme.appendChild(contenidoInforme);

    contenedor.appendChild(elementoInforme);
  });
}

function buscarInforme() {
  var titulo = prompt('Ingrese el título del informe que desea buscar');
  var informeEncontrado = informes.find(function (informe) {
    return informe.titulo === titulo;
  });

  if (informeEncontrado) {
    alert('Informe encontrado: ' + informeEncontrado.titulo + ' - ' + informeEncontrado.sector + ' (Informe N°: ' + informeEncontrado.numeroInforme + ')');
  } else {
    alert('No se encontró ningún informe con el título ' + titulo);
  }
}
