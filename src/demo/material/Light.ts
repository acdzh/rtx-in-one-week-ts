import Material, { Attenuation } from './Material.interface';
import Ray from '../base/Ray';
import HitRecord from '../shape/HitRecord';
import Vec3 from '../base/Vec3';

const randomInUnitSphere = () =>
  new Vec3(Math.random(), Math.random(), Math.random()).mul(2.0).sub(new Vec3(1, 1, 1)).unitVec();

export default class Light implements Material {
  light: Vec3;

  constructor(light: number | Vec3) {
    this.light = new Vec3(0, 0, 0).add(light);
  }

  scatter(rayIn: Ray, hit: HitRecord): [Ray, Attenuation] {
    return [null, this.light];
  }
}
