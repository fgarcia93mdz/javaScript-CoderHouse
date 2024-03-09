import { UI } from './ui.js';
import { InformeManager } from './informeManager.js';

const ui = new UI();
const informeManager = new InformeManager();

ui.mostrarInformes(informeManager.obtenerInformes());