import { UI } from './ui.js';
import { InformeManager } from './informeManager.js';

async function obtenerSectores() {
  const response = await fetch('https://steady-hammerhead-fibre.glitch.me/api/sectors/curso-js-sector/sectores');
  const data = await response.json();
  return data;
}

const ui = new UI();
const informeManager = new InformeManager();

window.onload = async function () {
  const sectorSelect = document.getElementById('sector');
  const involucradoSelect = document.getElementById('involucrado');

  const sectores = await obtenerSectores();

  const responseInvolucrados = await fetch('../json/involucrados.json');
  const involucrados = await responseInvolucrados.json();

  for (const sector of sectores) {
    const option = document.createElement('option');
    option.value = sector.sector;
    option.text = sector.sector;
    sectorSelect.add(option);
  }

  for (const involucrado of involucrados) {
    const option = document.createElement('option');
    option.value = involucrado;
    option.text = involucrado;
    involucradoSelect.add(option);
  }
  
  var fecha = document.getElementById('fecha');
  if (fecha) {
    var fechaActual = new Date();
    var dia = ("0" + fechaActual.getDate()).slice(-2);
    var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
    var año = fechaActual.getFullYear();
    var horas = ("0" + fechaActual.getHours()).slice(-2);
    var minutos = ("0" + fechaActual.getMinutes()).slice(-2);
    var fechaFormateada = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos;

    fecha.value = fechaFormateada;
  }

  var formInforme = document.getElementById('formInforme');
  if (formInforme) {
    formInforme.addEventListener('submit', (event) => {
      event.preventDefault();

      const titulo = document.getElementById('titulo').value;
      const sector = document.getElementById('sector').value;
      const involucrado = document.getElementById('involucrado').value;
      const autor = document.getElementById('autor').value;
      const fechaInput = document.getElementById('fecha');
      const informeContenido = document.getElementById('informeContenido').value;

      const fecha = new Date(fechaInput.value);
      const fechaYHora = fecha.toLocaleString();

      if (!titulo || !sector || !involucrado || !autor || !fechaInput.value || !informeContenido) {
        ui.mostrarMensaje('Todos los campos son obligatorios');
        return;
      }

      const informe = {
        numeroInforme: informeManager.obtenerInformes().length + 1,
        titulo: titulo,
        sector: sector,
        involucrado: involucrado,
        autor: autor,
        fecha: fechaYHora,
        informe: informeContenido,
      };

      informeManager.agregarInforme(informe);
      
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Informe agregado con éxito',
      }).then(() => {
        location.reload();
      });
    });
  }

  var borrarStorage = document.getElementById('borrarStorage');
  if (borrarStorage) {
    borrarStorage.addEventListener('click', function () {
      localStorage.clear();
      location.reload();
    });
  }
};

document.addEventListener('DOMContentLoaded', (event) => {
  let user = JSON.parse(localStorage.getItem('Usuario'));

  document.getElementById('saludo').textContent = `¡Hola, ${user.nombre} ${user.apellido}, datos del usuario en storage!`;

   const autorElement = document.getElementById('autor');
   if (autorElement) {
     autorElement.value = `${user.usuario}`;
   } else {
    console.error('El elemento con el ID "autor" no existe en la página.');
   }

});
