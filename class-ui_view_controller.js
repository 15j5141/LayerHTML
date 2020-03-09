import UIView from './class-ui_view.js';
/**
 */
class UIViewController {
  /**
   */
  constructor() {
    /** @type {UIView} */
    this.view;
    /** @type {any} */
    this.navigationController;
    /** @type {UIViewController} */
    this.presentingViewController;
    /** @type {UIViewController} */
    this.presentedViewController;
    this.modalPresentationStyle;

    // 通知.
    // this.viewDidLayoutSubviews();
  }
  /**
   */
  loadView() {
    // DOM生成.
    this.view = new UIView();

    // 自由移動可能に.
    // this.setMovable(this.rootElement);
  }
  /**
   * DOMを破棄.
   */
  unloadView() {
    const $ = window.top.$;
    this.event_.viewWillUnload();
    // this.parentViews.viewWillUnload();
    $(this.rootElement).remove();
    this.event_.viewDidUnload();
  }
  // 通知.
  /**
   *
   */
  viewDidLoad() {}
  /**
   * layoutSubviews完了時呼ばれる.
   */
  viewDidLayoutSubviews() {
    for (let i = 0; i < this.subViews_.length; i++) {
      const view = this.subViews_[i];
      // DOM初期位置記録.
      view.offset = view.rootElement.getBoundingClientRect();
      console.log(view.offset);
    }
  }
  /**
   */
  viewWillLayoutSubviews() {}
}
export default UIViewController;
