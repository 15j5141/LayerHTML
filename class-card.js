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
            canSwipe: true,
        };
        // 合成.
        Object.assign(origin, args);

        // プロパティ初期化.
        /** @type {string} 非表示にした時画面中央に対して隠される場所. */
        this.hideArea = origin.hideArea;
        /** @type {Object} translateの値. */
        this._deltaPosition = { x: 0, y: 0 };
        /** @type {boolean} カード内でスクロール可能か. */
        this._isScrollable = false;
        /** @type {Object} 初期タッチを識別するためのオブジェクト. */
        this._touch = null;
        /** 画面左上からの初期位置. */
        this._basePosition = {
            x: $(this.element).offset().left,
            y: $(this.element).offset().top
        };

        // 初期値セット.
        this.canSwipe = origin.canSwipe;
    }
    /** @type {boolean} スワイプ可能か. */
    get canSwipe() { return this._canSwipe; }
    set canSwipe(arg) {
        this._canSwipe = arg;
        const $ = window.$;
        if (arg) {
            $(this.element).on({
                'touchstart.card': e => {
                    const t = e.changedTouches[0];
                    this._touch = {
                        identiﬁer: t.identiﬁer,
                        pageX: t.pageX,
                        pageY: t.pageY,
                        startLeft: $(e.target).offset().left,
                        startTop: $(e.target).offset().top,
                    };
                    console.log('touchstart', e);
                    // 展開済みなら基本スクロール出来る.
                    if (this.isOpened) {
                        this._isScrollable = true;
                    } else {
                        this._isScrollable = false;
                    }
                    // 展開されていて上までスクロールされてればスワイプ可能に.
                    // if (this.isOpened && ) {
                    //     this._isScrollable = true;
                    // }

                    // this.startPos.x = e.touches[0].pageX;
                    // this.startPos.y = e.touches[0].pageY;
                },
                'touchmove.card': e => {
                    console.log('touchmove');
                    // 移動したタッチイベントを取得.
                    let changed;
                    e.changedTouches.forEach(t => {
                        if (t.identiﬁer === this._touch.identiﬁer) {
                            changed = t;
                            return;
                        }
                    });
                    // const x=changed.pageX-$(changed.target).offset().left;
                    const vx = changed.pageX - this._touch.pageX;
                    const vy = changed.pageY - this._touch.pageY;
                    // console.log(changed.pageY, this._touch.pageY, vx);
                    // スクロール不可なら.
                    if (!this._isScrollable) {
                        e.preventDefault(); // スクロールキャンセル.
                        // スワイプさせる.
                    }
                    if (this.element.scrollTop <= 0) {
                        this.move(this._touch.startLeft + vx, this._touch.startTop + vy);
                    }
                    // return false;
                },
                'touchend.card': e => {
                    console.log('touchend', e);
                    const pos = this._deltaPosition;
                    if (this.hideArea === 'right' && pos.x < window.innerWidth / 2) {
                        this.show();
                    } else if (this.hideArea === 'down' && pos.y < window.innerHeight / 2) {
                        this.show();
                    } else {
                        // this.move(window.innerWidth - 10, null, true);
                        this.hide();
                    }
                },
                'transitionend': e => {
                    $(this.element).css('transition', '');
                },
                'scroll': e => {
                    // e.preventDefault(); // スクロールキャンセル.
                    if (!this.isOpened && !this._isScrollable) {
                        // this.move(this._touch.startLeft + vx, this._touch.startTop + vy);
                    }
                }
            });
            // this.element.addEventListener('scroll', Card.scrollCancel, { passive: false });

        } else {
            $(this.element).off('touchstart.card');
            $(this.element).off('touchmove.card');
            $(this.element).off('touchend.card');
        }
        // $('body').on('touchmove.card', e => {
        //     e.preventDefault();
        // });

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
                hideArea: reg.dataset.cardHideArea || 'down',
                zIndex: reg.dataset.cardZ || 0, // 指定が無ければ0.
                element: reg
            };

            list.push(new Card(reg.dataset.cardName, obj));
        }
        return list;
    }
    // カードを完全に展開する.
    show(hideArea) {
        // 移動位置.
        const pos = hideArea || this.hideArea;
        // this.isOpened = true;
        switch (pos) {
            case 'right':
                this.move(0, null, true);
                break;
            case 'down':
                this.move(null, 0, true);
                break;
            default:
                break;
        }
    }
    hide(hideArea) {
        // 移動位置.
        const pos = hideArea || this.hideArea;
        // this.isOpened = false;
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
        const vx = (x != null ? x : jq.offset().left) - this._basePosition.x;
        const vy = (y != null ? y : jq.offset().top) - this._basePosition.y;
        const pos = this.hideArea;
        console.log('move:' + vx + ',' + vy);

        if (isSmoose) {
            jq.css('transition', "all 500ms 0ms ease");
        } else {
            jq.css('transition', '');
        }
        switch (pos) {
            case 'right':
                this._deltaPosition.x = vx > 0 ? vx : 0; // 0より小さければ0.
                jq.css(
                    'transform',
                    'translate(' + parseInt(this._deltaPosition.x) + 'px,' + parseInt(this._deltaPosition.y) + 'px)'
                );
                break;
            case 'down':
                this._deltaPosition.y = vy > 0 ? vy : 0; // 0より小さければ0.
                jq.css(
                    'transform',
                    'translate(' + parseInt(this._deltaPosition.x) + 'px,' + parseInt(this._deltaPosition.y) + 'px)'
                );
                break;
            default:
                console.log('error', pos);

                break;
        }

    }
    static scrollCancel(e) {
        e.preventDefault();
    }
    get isOpened() {
        return this._deltaPosition.y === 0 && this._deltaPosition.x === 0;
        // translateを読み取る.
    }
    set _isOpened(param) {
        if (param) {
            this.show();
        }
    }
}
export default Card;