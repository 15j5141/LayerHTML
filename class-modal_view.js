import View from './class-view.js';

// <reference types="JQuery.d.ts" />
/**
 * 単位iframe.
 */
class ModalView extends View {
  /**
   * @param {string} src
   * @param {Object} event
   */
  constructor(src = '', event) {
    super(src, event);
    /** @type {string} */
    this.src_ = src;
  }
  /**
   */
  loadView() {
    // DOM生成.
    super.loadView();
    $(this.rootElement).css({
      margin: '0px 0px',
    });

    const views = [
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
    ];

    for (let i = 0; i < views.length; i++) {
      const view = views[i];
      this.addSubview(
        new (class extends View {
          /** */
          loadView() {
            this.rootElement = this.createHTML(view).get(0);
          }
        })()
      );
    }

    // views
    //   .map(view => {
    //     return class extends View {
    //       /** */
    //       loadView() {
    //         this.rootElement = this.createHTML(view);
    //       }
    //     };
    //   })
    //   .forEach(viewClass => {
    //     this.addSubview(viewClass);
    //   });

    this.moveTo(0, 1000);
    setTimeout(() => {}, 0);
    $(this.rootElement).css({
      transition: 'all 100ms ease',
    });
    setTimeout(() => {
      this.moveTo(0, 0);
      $(this.rootElement).on('transitionend', e => {
        $(this.rootElement).css({
          transition: '',
        });
        return false;
      });
    }, 1000);
  }
  /**
   * @override
   */
  layoutSubviews() {
    super.layoutSubviews();

    const iframe = $('iframe', this.rootElement).get(0);
    if (iframe != null) {
      this.iframe = iframe;
      const nav = $('.view-navigation_bar', this.rootElement);
      // 最適サイズ調整.
      $(this.iframe).css({
        // height: $(this.rootElement).innerHeight() - nav.outerHeight() + 'px',
      });
      // console.log(this.iframe);

      // 内部windowから参照できるように.
      // this.iframe.contentWindow.viewController = this;
    }
  }
  /**
   */
  dismiss() {
    $(this.rootElement).remove();
  }
  /**
   */
  present() {}
}
export default ModalView;
