import Material, { Attenuation } from './Material.interface';
import Ray from '../base/Ray';
import HitRecord from '../shape/HitRecord';
import Vec3 from '../base/Vec3';

const randomInUnitSphere = () =>
  new Vec3(Math.random(), Math.random(), Math.random()).mul(2.0).sub(new Vec3(1, 1, 1)).unitVec();

export default class Metal implements Material {
  albedo: Vec3;
  fuzz: number;

  constructor(albedo: number | Vec3, fuzz = 1) {
    this.albedo = new Vec3(0, 0, 0).add(albedo);
    this.fuzz = fuzz;
  }

  scatter(rayIn: Ray, hit: HitRecord): [Ray, Attenuation] {
    const ray = rayIn.reflect(hit);
    ray.direction = ray.direction.add(randomInUnitSphere().mul(this.fuzz));
    return [ray, this.albedo];
  }
}
