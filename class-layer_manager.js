import Layer from './class-layer.js';
/**
 * 未使用.
 */
class LayerManager {
  /**
   * @param {Layer[]} layers
   */
  constructor(layers) {
    this.layers = layers || [];
    console.log(this.layers);
  }
}
export default LayerManager;
