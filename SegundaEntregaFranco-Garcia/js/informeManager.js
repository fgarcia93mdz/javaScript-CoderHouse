export class InformeManager {
  constructor() {
    this.informes = JSON.parse(localStorage.getItem('informes')) || [];
  }

  agregarInforme(informe) {
    this.informes.push(informe);
    localStorage.setItem('informes', JSON.stringify(this.informes));
  }

  obtenerInformes() {
    return this.informes;
  }
}