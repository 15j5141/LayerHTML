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
    this.dom = $('<div>').addClass('view-scene');
    $('body').append(this.dom);

    this.id = _param.id;
  }
  /**
   * @param {Object} param
   */
  instantiateViewController(param) {
    const _param = {
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
   * @param {View}
   */
  add(view) {
    this.views.push(view);
    view.loadView(this.dom);
  }
}
export default Scene;
