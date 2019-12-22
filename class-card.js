import Layer from "./class-layer";
/**
 * @class カードクラス.
 * @extends Layer
 */
class Card extends Layer {
    /**
     * 
     * @param {Object} args 
     * @param {string} layerName 
     */
    constructor(layerName, args) {
        super(layerName, args); // Layerクラスの処理.
        const origin = {
            hideArea: '',
            isSwipeable: true,
        };
        // 合成.
        Object.assign(origin, args);

        // プロパティ初期化.
        /** @type {string} 非表示にした時画面中央に対して隠される場所. */
        this.hideArea = origin.hideArea;
        /** @type {string} スワイプ可能か. */
        this.isSwipeable = origin.isSwipeable;
    }
    /** @type {boolean} */
    get isSwipeable() { return this._isSwipeable; }
    set isSwipeable(arg) {
        this._isSwipeable = arg;
        if (arg) {
            // window.$('').on();
        } else {
            // window.$('').off();
        }
    }
    /**
     * jQuery で '.card-register' を探して登録する.
     */
    static searchCardRegisterFromDOM() {
        const registers = document.querySelectorAll('.card-register');
        const list = [];
        for (let i = 0; i < registers.length; i++) {
            const reg = registers[i];
            reg.classList.remove('card-register');
            reg.classList.add('card-registered');
            const obj = {
                name: reg.dataset.cardName, // data-card-name.
                element: reg
            };

            list.push(new Card(reg.dataset.cardName, obj));
        }
        return list;
    }
    // show() {
    //     // 移動位置.
    //     const pos = window.innerWidth / 2;
    //     const jq = $(this.selector);
    //     switch (pos) {
    //         case 'right':
    //             jq.css({
    //                 'translate': '(0,0)'
    //             });
    //             break;

    //         default:
    //             break;
    //     }
    // }
    // hide(position) {
    //     // 移動位置.
    //     const pos = position || this.hideArea;
    //     const jq = $(this.selector);
    //     switch (pos) {
    //         case 'right':
    //             jq.css({
    //                 'translate': '(0,0)'
    //             });
    //             break;

    //         default:
    //             break;
    //     }
    // }
}
export default Card;