import UIView from './class-ui_view.js';

/**
 * @typedef {Object} Request
 * @property {string} url
 */

/**
 */
class UIWebView extends UIView {
  /**
   *
   * @param {any} url
   */
  constructor(url) {
    super();
    this.url_ = url;
    /** @type {HTMLIFrameElement} */
    this.iframe;
    this.load({ url: this.url_ });
  }
  /**
   * @override
   */
  init(obj) {
    console.log(this.url_);

    this.iframe = UIView._createHTML({
      tag: 'iframe',
      class: 'view-web_view view-root',
      attr: {
        src: this.url_,
        frameborder: '1',
      },
      style: {
        width: '100%',
        height: '100%',
      },
    }).get(0);
    this._rootElement = this.iframe;
  }
  /**
   *
   * @param {any} html
   */
  loadHTMLString(html) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    this.load({ url: url });
  }
  /**
   *
   * @param {Request} request
   */
  load(request) {
    this.url_ = request.url;
    // iframeのsrcを書き換える.
    this.iframe.src = this.url_;
  }
}
export default UIWebView;
