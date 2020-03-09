// <reference types="JQuery.d.ts" />
/**
 * 単位iframe.
 */
class View {
  /**
   * @param {Object} event
   */
  constructor(event) {
    /** @type {HTMLIFrameElement} */
    this.iframe;
    /** @type {Array<View>} */
    this.subViews_ = [];
    /** @type {View} 親View. */
    this.parentView;
    /** @type {boolean} */
    this.isInitialViewController = false;
    /** @const @type {string} */
    this.id;
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
    /** @type {DOMRect} DOM生成時初期位置. */
    this.offset = new DOMRect();
    this.transform_ = { x: 0, y: 0 };
  }
  /**
   * 子Viewとして追加. 同時にDOM生成.
   * @param {View} view
   */
  addSubview(view) {
    this.subViews_.push(view);
    view.parentView = this;
    view.loadView();
    // 読込完了を通知.
    this.event_.viewDidLoad();
  }
  /**
   */
  loadView() {
    // DOM生成.
    this.rootElement = this.createHTML({
      tag: 'div',
      class: 'view-root',
      style: {
        width: '100vw',
        height: '100%',
        'background-color': 'rgba(50,50,50,0.5)',
        position: 'absolute',
      },
    }).get(0);

    // 自由移動可能に.
    this.setMovable(this.rootElement);
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
  /**
   * subViewsを配置.
   */
  layoutSubviews() {
    // DOM配置.
    const x = this.subViews_.map(view => {
      view.layoutSubviews();
      return view.rootElement;
    });
    $(this.rootElement)
      .html('') // 空にする.
      .append(
        // 中に再配置.
        ...x
      );

    // 通知.
    this.viewDidLayoutSubviews();
  }
  /**
   * jQueryオブジェクトでHTMLDOMを生成する.
   * @param {Object} obj
   * @return {any}
   */
  createHTML(obj) {
    if (obj == null) return $('');
    const elementTag = obj.tag || 'div';
    const elementClass = obj.class || '';
    const elementId = obj.id || '';
    const elementStyle = obj.style || {};
    const elementAttr = obj.attr || {};
    const elementInner = obj.html || '';
    const elementChildren = obj.children || [];

    const elements = elementChildren.map(element => {
      return this.createHTML(element); // 子要素を再帰的に生成.
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
    if (dom == null) return;
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
}
export default View;
