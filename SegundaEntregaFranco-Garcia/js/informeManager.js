export class InformeManager {
  constructor() {
    this.informes = JSON.parse(localStorage.getItem('informes')) || [];
  }
  agregarInforme(informe) {
    const informes = this.obtenerInformes();
    informes.push(informe);
    localStorage.setItem('informes', JSON.stringify(informes));
  }

  obtenerInformes() {
    const informes = localStorage.getItem('informes');
    if (informes) {
      return JSON.parse(informes);
    } else {
      return [];
    }
  }
}