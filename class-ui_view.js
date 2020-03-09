/**
 * 単位iframe.
 */
class UIView {
  /**
   * @param {Object} event
   */
  constructor(event) {
    /** @type {Array<View>} */
    this.subviews = [];
    /** @type {View} 親View. */
    this.superview;
    this.uiWindow;
    /** @type {HTMLElement} */
    this.rootElement;
    /** @type {any} ユーザーの扱える変数. */
    this.publicData = {};
    /** イベント登録. 未使用. */
    this.event_ = {
      viewDidLoad: () => {},
      viewWillUnload: () => {},
      viewDidUnload: () => {},
      viewWillAppear: () => {},
      viewDidAppear: () => {},
      viewWillDisappear: () => {},
      viewDidDisappear: () => {},
      ...event,
    };
    this._transform = { x: 0, y: 0 };
    /** @type {DOMRect} DOM生成時初期位置. */
    this.offset = new DOMRect();
    this._isRedraw = false;
    /** _move()用. */
    this.transform_ = { x: 0, y: 0 };

    this.setNeedsDisplay();
    this.init();
  }
  /**
   * 子Viewとして追加. 同時にDOM生成.
   * @param {UIView} view
   */
  addSubview(view) {
    this.subviews.push(view);
    view.superview = this;
  }
  /**
   * DOM 生成.
   * @param {Object} obj
   */
  init(obj) {
    const obj_ = obj || {
      tag: 'div',
      class: 'view-root',
      style: {
        width: '100%',
        height: '100%',
        'background-color': 'rgba(50,50,50,0.5)',
        'pointer-events': 'auto',
        // position: 'absolute',
      },
    };
    // DOM生成.
    this.rootElement = UIView.createHTML(obj_).get(0);
  }
  /**
   * 再帰的にsubviewsを配置.
   */
  layoutSubviews() {
    // DOM配置.
    $(this.rootElement)
      .html('') // 空にする.
      .append(
        // 中に再配置.
        ...this.subviews.map(view => {
          view.layoutSubviews();
          return view._rootElement;
        })
      );
  }
  /**
   * 描画する.
   */
  draw() {}
  /**
   * 要描画フラグをオンにする.
   */
  setNeedsDisplay() {
    this._isRedraw = true;
  }
  /**
   * jQueryオブジェクトでHTML DOMを生成する.
   * @param {Object} obj
   * @return {any}
   */
  static createHTML(obj) {
    if (obj == null) return $('');
    const elementTag = obj.tag || 'div';
    const elementClass = obj.class || '';
    const elementId = obj.id || '';
    const elementStyle = obj.style || {};
    const elementAttr = obj.attr || {};
    const elementInner = obj.html || '';
    const elementChildren = obj.children || [];

    const elements = elementChildren.map(element => {
      return UIView.createHTML(element); // 子要素を再帰的に生成.
    });

    const jQueryObj = $('<' + elementTag + '>')
      .attr({
        id: elementId,
        ...elementAttr,
      })
      .addClass(elementClass)
      .css(elementStyle)
      .html(elementInner)
      .append(elements);

    return jQueryObj;
  }
  /**
   * 親View内で自由移動可能にする.
   * @param {HTMLElement} dom
   */
  setMovable(dom) {
    if (dom == null) dom = this.rootElement;
    /** @type {MouseEvent} 開始時移動イベント. */
    let startMouseEvent;
    /** @type {MouseEvent} 前回移動イベント. */
    let lastMouseEvent;
    let isMoving = false;
    $(dom).on('mousedown.view touchstart.view', e => {
      lastMouseEvent = startMouseEvent = e;
      isMoving = true;
      console.log('startMouseEvent: ', startMouseEvent);
      return false;
    });
    $(dom).on('mousemove.view touchmove.view', e => {
      if (!isMoving) return true;
      const nextMouseEvent = e;
      /** X移動量. */
      const dx =
        nextMouseEvent.clientX != null
          ? nextMouseEvent.clientX - lastMouseEvent.clientX
          : nextMouseEvent.changedTouches[0].clientX -
            lastMouseEvent.changedTouches[0].clientX;
      /** Y移動量. */
      const dy =
        nextMouseEvent.clientY != null
          ? nextMouseEvent.clientY - lastMouseEvent.clientY
          : nextMouseEvent.changedTouches[0].clientY -
            lastMouseEvent.changedTouches[0].clientY;

      this.move(dx, dy);

      lastMouseEvent = nextMouseEvent;
      return false;
    });
    $(document).on('mouseup.view touchend.view', e => {
      isMoving = false;
      return false;
    });
  }
  /**
   * transform相対値移動.
   * @param {number} dx
   * @param {number} dy
   */
  move(dx, dy) {
    this.transform_.x += dx;
    this.transform_.y += dy;
    this.moveTo(this.transform_.x, this.transform_.y);
  }
  /**
   * transform絶対値移動.
   * @param {number} x
   * @param {number} y
   */
  moveTo(x, y) {
    const dom = this.rootElement;
    this.transform_ = { x: x, y: y };
    $(dom).css({
      transform: 'translate(' + x + 'px,' + y + 'px)',
    });
  }
  // 通知.
  /**
   * @param {UIView} view
   */
  didAddSubview(view) {}
  /**
   * @param {*} view
   */
  willRemoveSubview(view) {}
  /**
   * @param {UIView} view
   */
  willMove(view) {}
  /**
   */
  didMove() {}
}
export default UIView;
