import UIView from '../class-ui_view.js';
import UIWindow from '../class-ui_window.js';
import UIViewController from '../class-ui_view_controller.js';
import UIWebView from '../class-ui_web_view.js';

const url = '../index.html';

const vc = new (class extends UIViewController {
  /**
   * @override
   */
  loadView() {
    const view = new UIView(null);
    const view2 = new UIView(null);
    $(view2._rootElement).css({
      height: '10%',
    });
    const web = new UIWebView(url);
    $(web._rootElement).css({
      height: '90%',
    });

    // 自由移動可能に.
    view.setMovable();

    view.addSubview(view2);
    view2.setMovable();
    view.addSubview(web);
    this.view = view;
    web._moveTo(0, 1000);

    setTimeout(() => {
      $(web._rootElement).css({
        // 'transform-origin': '50% 100%',
        transition: 'all 200ms 0s ease-out',
        // transform: 'scale3d(0.9,0.9, 0.9) translate3d(0px, 50px, 0px)',
      });
      web._moveTo(0, 0);
    }, 1000);
  }
})();
const win = new UIWindow(vc);
