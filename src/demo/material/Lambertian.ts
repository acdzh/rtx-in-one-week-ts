import Material, { Attenuation } from './Material.interface';
import Ray from '../base/Ray';
import HitRecord from '../shape/HitRecord';
import Vec3 from '../base/Vec3';

const randomInUnitSphere = () =>
  new Vec3(Math.random(), Math.random(), Math.random()).mul(2.0).sub(new Vec3(1, 1, 1)).unitVec();

export default class Lambertian implements Material {
  albedo: Vec3;

  constructor(albedo: number | Vec3) {
    this.albedo = new Vec3(0, 0, 0).add(albedo);
  }

  scatter(_: Ray, hit: HitRecord): [Ray, Attenuation] {
    const ray = new Ray(hit.p, hit.normal.add(randomInUnitSphere()));
    return [ray, this.albedo];
  }
}
