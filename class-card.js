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

        /** @type {Object} */
        this.touch = null;
        this.basePosition = {
            x: $(this.element).offset().left,
            y: $(this.element).offset().top
        };
        this.deltaPosition = { x: 0, y: 0 };
    }
    /** @type {boolean} */
    get isSwipeable() { return this._isSwipeable; }
    set isSwipeable(arg) {
        this._isSwipeable = arg;
        const $ = window.$;
        if (arg) {
            $(this.element).on({
                'touchstart.card': e => {
                    const t = e.changedTouches[0];
                    this.touch = {
                        identiﬁer: t.identiﬁer,
                        pageX: t.pageX,
                        pageY: t.pageY,
                        startLeft: $(e.target).offset().left,
                        startTop: $(e.target).offset().top,
                    };
                    console.log('touchstart', e);
                    // this.startPos.x = e.touches[0].pageX;
                    // this.startPos.y = e.touches[0].pageY;
                },
                'touchmove.card': e => {
                    // console.log('touchmove', e, this.touch);
                    // 移動したタッチイベントを取得.
                    let changed;
                    e.changedTouches.forEach(t => {
                        if (t.identiﬁer === this.touch.identiﬁer) {
                            changed = t;
                            return;
                        }
                    });
                    // const x=changed.pageX-$(changed.target).offset().left;
                    const vx = changed.pageX - this.touch.pageX;
                    console.log(changed.pageX, this.touch.pageX, vx);
                    this.move(this.touch.startLeft + vx, null);

                    e.preventDefault();
                },
                'touchend.card': e => {
                    console.log('touchend', e);
                    const pos = this.deltaPosition;
                    if (pos.x < window.innerWidth / 2) {
                        this.move(0, null, true);
                        // this.show();
                    } else {
                        // this.move(window.innerWidth - 10, null, true);
                        this.hide();
                    }
                }
            });

        } else {
            $(this.element).off('touchstart.card');
            $(this.element).off('touchmove.card');
            $(this.element).off('touchend.card');
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
                hideArea: reg.dataset.cardHideArea,
                element: reg
            };

            list.push(new Card(reg.dataset.cardName, obj));
        }
        return list;
    }
    show() {
        // 移動位置.
    }
    hide(hideArea) {
        // 移動位置.
        const pos = hideArea || this.hideArea;
        const jq = $(this.element);
        const margin = 50;
        switch (pos) {
            case 'right':
                this.move(window.innerWidth - margin, 0, true);
                break;
            case 'down':
                this.move(0, window.innerHeight - margin, true);
                break;
            default:
                break;
        }
    }
    /**
     * ドキュメント左上から絶対値を指定.
     * @param {Number} x 
     * @param {Number} y 
     */
    move(x, y, isSmoose) {
        const jq = $(this.element);
        const vx = (x != null ? x : jq.offset().left) - this.basePosition.x;
        const vy = (y != null ? y : jq.offset().top) - this.basePosition.y;
        const css = {};
        console.log('move:' + vx + ',' + vy);

        if (isSmoose) {
            jq.css('transition', "all 100ms 100ms ease");
        } else {
            jq.css('transition', '');
        }
        this.deltaPosition = { x: vx, y: vy };
        jq.css(
            'transform',
            'translate(' + parseInt(vx) + 'px,' + parseInt(vy) + 'px)'
        );
        jq.on('transitionend', e => {
            jq.css('transition', '');
        });

    }
}
export default Card;