import { UI } from './ui.js';
import { InformeManager } from './informeManager.js';

const ui = new UI();
const informeManager = new InformeManager();

ui.mostrarInformes(informeManager.obtenerInformes());

document.addEventListener('DOMContentLoaded', (event) => {
  let user = JSON.parse(localStorage.getItem('Usuario'));

  document.getElementById('saludo').textContent = `¡Hola, ${user.nombre} ${user.apellido}, datos del usuario en storage!`;

  const fechaActual = new Date();

  function convertirFecha(fecha) {
    const [parteFecha, parteHora] = fecha.split(', ');
    const [dia, mes, ano] = parteFecha.split('/');
    const [hora, minuto, segundo] = parteHora.split(':');
    return new Date(ano, mes - 1, dia, hora, minuto, segundo);
  }

  const informesEsteMes = informeManager.obtenerInformes().filter(informe => {
    const fechaInforme = convertirFecha(informe.fecha);
    return fechaInforme.getMonth() === fechaActual.getMonth() &&
           fechaInforme.getFullYear() === fechaActual.getFullYear();
  });

  const cantidadInformes = informesEsteMes.length;
  document.getElementById('informesGenerados').textContent = `Informes generados este mes: ${cantidadInformes}`;
});


var descargarInformes = document.getElementById('descargarInformes');
if (descargarInformes) {
  descargarInformes.addEventListener('click', function () {
    const informes = informeManager.obtenerInformes();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(informes));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "informes.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });
}