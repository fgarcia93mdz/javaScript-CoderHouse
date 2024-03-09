export class UI {
  constructor() {
    this.modalElement = null;
    this.modal = null;
    this.initModal();
  }

  initModal() {
    this.modalElement = document.querySelector('#informeModal');
    if (this.modalElement) {
      this.modal = new bootstrap.Modal(this.modalElement);

      const closeButton = this.modalElement.querySelector('.btn-secondary');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          this.modal.hide();
        });
      }
    }
  }

  mostrarMensaje(mensaje, exito = false) {
    const elementoMensaje = document.getElementById('mensaje');
    elementoMensaje.textContent = mensaje;
    elementoMensaje.className = exito ? 'éxito' : '';
  }

  mostrarInformes(informes) {
    const contenedorInformes = document.getElementById('contenedor-informes');

    if (contenedorInformes) {
      contenedorInformes.innerHTML = '';

      const tabla = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      const cabeceras = ['Nº Informe', 'Fecha', 'Título', 'Acciones'];
      const tr = document.createElement('tr');
      cabeceras.forEach(function (cabecera) {
        const th = document.createElement('th');
        th.textContent = cabecera;
        tr.appendChild(th);
      });
      thead.appendChild(tr);

      informes.forEach(function (informe) {
        const tr = document.createElement('tr');

        const tdNumeroInforme = document.createElement('td');
        tdNumeroInforme.textContent = informe.numeroInforme;
        tr.appendChild(tdNumeroInforme);

        const tdFecha = document.createElement('td');
        tdFecha.textContent = informe.fecha;
        tr.appendChild(tdFecha);

        const tdTitulo = document.createElement('td');
        tdTitulo.textContent = informe.titulo;
        tr.appendChild(tdTitulo);

        const tdAcciones = document.createElement('td');
        const botonMas = document.createElement('button');
        botonMas.textContent = '+';

        botonMas.addEventListener('click', function () {
          const informeModalBody = document.getElementById('informeModalBody');
          informeModalBody.innerHTML =
            'Nº Informe: ' + informe.numeroInforme + '<br>' +
            'Fecha: ' + informe.fecha + '<br>' +
            'Título: ' + informe.titulo + '<br>' +
            'Sector: ' + informe.sector + '<br>' +
            'Involucrado: ' + informe.involucrado + '<br>' +
            'Autor: ' + informe.autor + '<br>' +
            'Contenido: ' + informe.informe;

          if (!this.modal) {
            this.initModal();
          }
          this.modal.show();
        }.bind(this));

        tdAcciones.appendChild(botonMas);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
      }.bind(this));

      tabla.appendChild(thead);
      tabla.appendChild(tbody);
      contenedorInformes.appendChild(tabla);
    }
  }
}