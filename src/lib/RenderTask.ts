import Pixel from './Pixel'

export default class RenderTask {
  pixels: Pixel[];
  position: number;
  width: number;
  height: number;

  constructor(pixels: Pixel[], width: number, height: number) {
    this.pixels = pixels;
    this.height = height;
    this.width = width;
  }
}