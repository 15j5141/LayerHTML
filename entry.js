// import.
import Card from './class-card.js';
import Layer from './class-layer.js';
// import ModalView from './class-modal_view.js';
import UIView from './class-ui_view.js';
import UIWebView from './class-ui_web_view.js';
import UIViewController from './class-ui_view_controller.js';
import UIWindow from './class-ui_window.js';
import UIWindowScene from './class-ui_window_scene.js';

const CardModule = {
  Card,
  Layer,
  // ModalView,
  UIView,
  UIWebView,
  UIViewController,
  UIWindow,
  UIWindowScene,
};
// add window.
window.CardModule = CardModule;

export default CardModule;
