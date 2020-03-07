/**
 * @class Layer
 * @typedef {Object} Layer
 */
class Layer {
  /**
   * @param {string} layerName
   * @param {Object} args
   */
  constructor(layerName, args) {
    // 初期値.
    const origin = {
      layerName: 'noname',
      html: true,
      selector: '',
      parent: null,
      element: null,
      zIndex: 0,
    };
    // 引数と合成.
    Object.assign(origin, args);

    // 引数が指定されたときの初期化処理.
    if (origin.element == null && origin.selector) {
      origin.element = document.querySelector(origin.selector);
    }

    // プロパティ初期化.
    /** @type {string} */
    this.layerName = layerName || origin.layerName;
    /** @type {string} */
    this.html = origin.html;
    /** @type {string} */
    this.selector = origin.selector;
    /** @type {Layer} 親のレイヤ. */
    this.parent = origin.parent;
    /** @type {Object} DOMエレメント. */
    this.element = origin.element;
    /** @type {number} 奥行. 手前ほど大きな値. */
    this.zIndex = origin.zIndex;
    /** @type {Layer[]} 子レイヤ. */
    this.children = [];
  }
  /**
   * @return {Layer}
   */
  getParent() {
    return this.parent;
  }
  /**
   * @return {Array<Layer>}
   */
  getChildren() {
    return this.children;
  }

  /* -------------------- レイヤ管理系. -------------------- */

  /**
   * @param {Layer} layer
   */
  add(layer) {
    layer.parent = this;
    this.children.push(layer);
  }
  /**
   * @param {Layer[]} layers
   */
  adds(layers) {
    layers.forEach(l => this.add(l));
  }
  /**
   * @param {string} selector
   * @return {Layer}
   */
  getBySelector(selector) {
    return this.children.find(c => c.selector === selector);
  }
  /**
   * @param {string} layerName
   * @return {Layer}
   */
  getByName(layerName) {
    return this.children.find(c => c.layerName === layerName);
  }
}
export default Layer;
