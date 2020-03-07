import View from './class-view.js';

// <reference types="JQuery.d.ts" />
/**
 * 単位iframe.
 */
class ModalView extends View {
  /**
   * @param {string} src
   * @param {Object} event
   */
  constructor(src = '', event) {
    super(src, event);
  }
  /**
   * @param {HTMLElement} parentDOM
   */
  loadView(parentDOM) {
    super.loadView(parentDOM);
    $(parentDOM).append('<div>xxxxx</div>');
  }
  /**
   */
  dismiss() {
    $(this.rootElement).remove();
  }
  /**
   */
  present() {}
}
export default ModalView;
