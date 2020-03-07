// <reference types="JQuery.d.ts" />
/**
 * 単位iframe.
 */
class View {
  /**
   * @param {string} src
   * @param {Object} event
   */
  constructor(src = 'txtBlob or url', event) {
    /** @type {HTMLIFrameElement} */
    this.iframe;
    /** @type {Array<View>} */
    this.subViews = [];
    /** @type {View} 親View. */
    this.parentView;
    /** @type {boolean} */
    this.isInitialViewController = false;
    /** @const @type {string} */
    this.id;
    /** @type {string} */
    this.src_ = src;
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
  }
  /**
   * 子Viewとして追加. 同時にDOM生成.
   * @param {View} view
   */
  addSubview(view) {
    this.subViews.push(view);
    view.parentView = this;
    view.loadView(this.dom);
    // 読込完了を通知.
    this.event_.viewDidLoad();
  }
  /**
   * @param {HTMLElement} parentDOM
   */
  loadView(parentDOM) {
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
      children: [
        {
          tag: 'div',
          class: 'view-navigation_bar',
          style: {
            width: '100%',
            height: '10%',
            'background-color': 'green',
          },
          html: 'ナビゲーションバー',
        },
        {
          tag: 'iframe',
          class: 'view-body',
          attr: {
            src: this.src_,
            frameborder: '1',
          },
          style: {
            width: '100%',
            height: '90%',
          },
        },
        {
          // pointer-eventsでの入力制限用.
          tag: 'div',
          class: 'view-overlap',
          style: {
            'pointer-events': 'none',
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: '0',
            top: '0',
          },
        },
      ],
    }).get(0);
    // DOM配置.
    $(parentDOM).append(this.rootElement);

    // DOM初期位置記録.
    this.offset = this.rootElement.getBoundingClientRect();
    console.log(this.offset);

    // 自由移動可能に.
    this.setMovable(this.rootElement);

    this.iframe = $('iframe', this.rootElement).get(0);
    const nav = $('.view-navigation_bar', this.rootElement);
    // 最適サイズ調整.
    $(this.iframe).css({
      // height: $(this.rootElement).innerHeight() - nav.outerHeight() + 'px',
    });
    // 内部windowから参照できるように.
    this.iframe.contentWindow.viewController = this;
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
      /** 指定要素の矩形情報. */
      const rect = dom.getBoundingClientRect();
      /** 指定要素の親要素の矩形情報. */
      const parentRect = dom.parentElement.getBoundingClientRect();
      /** position:absolute指定時の(親要素からの)距離. */
      const offsetWhenAbsolute = {
        left: rect.left - parentRect.left + document.body.scrollLeft,
        top: rect.top - parentRect.top + document.body.scrollTop,
      };
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
      // 移動. translateで移動する場合this.offsetで補正しないとleft:0px以外の時ずれる.
      $(dom).css({
        // left: offsetWhenAbsolute.left + dx + 'px',
        // top: offsetWhenAbsolute.top + dy + 'px',
        transform:
          'translate(' +
          (offsetWhenAbsolute.left + dx - this.offset.left) +
          'px,' +
          (offsetWhenAbsolute.top + dy - this.offset.top) +
          'px)',
      });
      lastMouseEvent = nextMouseEvent;
      return false;
    });
    $(document).on('mouseup.view touchend.view', e => {
      isMoving = false;
      return false;
    });
  }
}
export default View;
