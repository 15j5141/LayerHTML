import UIView from './class-ui_view.js';
import UIViewController from './class-ui_view_controller.js';
/**
 * １つの画面的なもの. 複数配置可.
 */
class UIWindow extends UIView {
  /**
   * @param {UIViewController} rootViewController
   * @param {UIWindowScene} windowScene
   */
  constructor(rootViewController, windowScene) {
    super();
    /** @type {UIViewController} */
    this.rootViewController = rootViewController;
    /** @type {UIWindowScene} */
    this.windowScene = windowScene;
    this.windowLevel;
    /** @const @type {string} */
    this.id;

    if (this.rootViewController != null) {
      // DOM 生成.
      this.rootViewController.loadView();

      // 読込完了を通知.
      this.rootViewController.viewDidLoad();

      // 配置.
      $('body').append(this._rootElement);
      this.addSubview(this.rootViewController.view);
      this.layoutSubviews();
    }
  }
  /**
   * @override
   */
  init(obj) {
    const obj_ = obj || {
      tag: 'div',
      class: 'view-window',
      style: {
        overflow: 'hidden',
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        margin: 'auto auto',
        width: '100%',
        height: '100%',
        'background-color': 'rgba(22, 22, 22, 0.1)',
        'pointer-events': 'none',
      },
    };
    // DOM生成.
    this._rootElement = UIView._createHTML(obj_).get(0);
  }
}
export default UIWindow;
