
// import Card from "./class-card";
// import LayerManager from "./class-layer_manager";
// import Layer from "./class-layer";

// レイヤー管理用.
let leyerManager = new LayerManager();
// DOM から検索してカードとして登録.
leyerManager.adds(Card.searchCardRegisterFromDOM());
console.log(leyerManager);



let card = new Card('namae', {
    selector: 'body',
    name: 'namae',
    isScrollable: false
});
leyerManager.add(card);
console.log(leyerManager.layers);

// leyerManager.
// card.show()
