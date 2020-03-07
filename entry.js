// import.
import Card from './class-card.js';
import Layer from './class-layer.js';
import View from './class-view.js';
import Scene from './class-scene.js';
import ModalView from './class-modal_view.js';

const CardModule = { Card, Layer, View, Scene, ModalView };
// add window.
window.CardModule = CardModule;

export default CardModule;
