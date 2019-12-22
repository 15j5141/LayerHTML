import LayerManager from "./class-layer_manager";
/**
 * @class Layer
 * @typedef {Object} Layer
 */
class Layer {
    /**
     * @param {string} layerName 
     */
    constructor(layerName, args) {
        // 初期値.
        const origin = {
            layerName: 'noname',
            html: true,
            selector: '',
            parent: null,
            element: null,
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
        /** @type {LayerManager | Layer} */
        this.parent = origin.parent;
        /** @type {Object} */
        this.element = origin.element;


    }
}
export default Layer;
