import Card from './class-card.js';
import Layer from './class-layer.js';

// レイヤー管理用.
const leyerManager = new Layer();
$(function() {
  // DOM から検索してカードとして登録.
  leyerManager.adds(Card.searchCardRegisterFromDOM());
  console.log(leyerManager);

  leyerManager.children.forEach(l => {
    l.hide();
  });

  // let card = new Card('namae', {
  //     selector: 'body',
  //     name: 'namae',
  //     isScrollable: false
  // });
  // leyerManager.add(card);
  console.log(leyerManager.children);
});
$('#A-open').on('click', e => {
  leyerManager.getByName('test1').show();
});
// leyerManager.
// card.show()
