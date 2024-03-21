import { UI } from './ui.js';
import { InformeManager } from './informeManager.js';

const ui = new UI();
const informeManager = new InformeManager();

ui.mostrarInformes(informeManager.obtenerInformes());

document.addEventListener('DOMContentLoaded', (event) => {
  let user = JSON.parse(localStorage.getItem('Usuario'));

  document.getElementById('saludo').textContent = `¡Hola, ${user.nombre} ${user.apellido}, datos del usuario en storage!`;

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