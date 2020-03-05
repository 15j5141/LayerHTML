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
    this.subViews;
    this.parentViews;
    /** @type {boolean} */
    this.isInitialViewController = false;
    /** @const @type {string} */
    this.id;
    /** @type {string} */
    this.src_ = src;
    this.rootElement;

    const event_ = {
      viewDidLoad: () => {},
      dismiss: () => {},
      ...event,
    };
  }
  /**
   * @param {View} view
   */
  addSubview(view) {
    this.subViews.push(view);
  }
  /**
   * @param {HTMLElement} parentDOM
   */
  loadView(parentDOM) {
    this.rootElement = this.createHTML({
      tag: 'div',
      class: 'view-root',
      children: [
        {
          tag: 'iframe',
          class: 'view-body',
          attr: {
            src: this.src_,
            frameborder: '1',
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
    });
    // this.rootElement.append(body, top);
    $(parentDOM).append(this.rootElement);

    this.iframe = $('iframe', this.rootElement).get(0);
    console.log(this.iframe.contentWindow);

    this.iframe.contentWindow.viewController = this;
  }
  /**
   */
  dismiss() {
    // this.parentViews.viewWillUnload();
    window.$(this.rootElement).remove();
  }
  /**
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
}
export default View;
