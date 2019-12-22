import Layer from "./class-layer";
class LayerManager {
    /**
     * @param {Layer[]} layers 
     */
    constructor(layers) {
        this.layers = layers || [];
        console.log(this.layers);
    }
    /**
     * @param {Layer} layer 
     */
    add(layer) {
        layer.parent = this;
        this.layers.push(layer);
    }
    /**
     * 
     * @param {*} layers 
     */
    adds(layers) {
        console.log("adds;", layers);
        layers.forEach(l => this.add(l));
    }
    /**
     * @param {string} selector 
     * @returns {Layer}
     */
    getBySelector(selector) {
        return this.layers.find(l => l.selector === selector);
    }
    /**
     * @param {string} layerName 
     * @returns {Layer}
     */
    getByName(layerName) {
        return this.layers.find(l => l.layerName === layerName);
    }
}
export default LayerManager;