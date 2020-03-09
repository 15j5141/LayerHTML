import View from './class-view.js';
/**
 * １つの画面的なもの. 複数配置可.
 */
class Scene extends View {
  /**
   * @param {Object} param
   */
  constructor(param) {
    super();
    const _param = {
      withIdentifier: '', // scene_name
      id: '',
      ...param,
    };
    /** @type {Array<View>} 動的な実体. */
    this.instance;
    /** @type {Array<View>} 定義一覧. */
    this.views = [];
    /** @type {View} */
    this.rootViewController;
    /**
     * 実際に存在するDOM.
     * @type {HTMLDivElement}
     */
    this.dom;
    /** @const @type {string} */
    this.id;

    if (_param.withIdentifier == null) {
      _param.id = _param.withIdentifier;
      // DOMから検索してあれば.
    }
    this.rootElement = $('<div>')
      .addClass('view-scene')
      .css({
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
      })
      .get(0);
    $('body')
      .append(this.rootElement)
      .css({});

    this.id = _param.id;
  }
  /**
   * @param {Object} param
   */
  instantiateViewController(param) {
    const param_ = {
      withIdentifier: 'SecondVC',
      ...param,
    };
  }
  /**
   */
  instantiateInitialViewController() {
    const initView = this.instance.find(i => i.isInitialViewController);
    if (initView == null) {
      //
    } else {
      this.instantiateViewController(initView);
    }
  }
  /**
   * @param {View} view
   */
  add(view) {
    this.addSubview(view);
    $(view.rootElement).css({
      'pointer-events': 'auto',
    });
  }
  /**
   */
  init() {
    this.layoutSubviews();
  }
}
export default Scene;
