import Ray from '../base/Ray';
import HitRecord from './HitRecord';
import Vec3 from '../base/Vec3';
import Hitable, { HitResult } from './Hitable.interface';
import Material from '../material/Material.interface';

export default class Sphere implements Hitable {
  origin: Vec3;
  normal: Vec3;
  material: Material;

  constructor(origin: Vec3, normal: Vec3, material: Material) {
    this.origin = origin;
    this.normal = normal.unitVec();
    this.material = material;
  }

  hit(ray: Ray, t_min: number, t_max: number): HitResult {
    const nd = Vec3.dot(this.normal, ray.direction);
    if (nd === 0) {
      return null;
    }
    const t = -1 * Vec3.dot(this.normal, ray.origin.sub(this.origin)) / nd;

    if (t < t_min || t > t_max) {
      return null;
    }

    const p = ray.getPoint(t);
    const hit = new HitRecord(t, p, Vec3.dot(ray.direction, this.normal) < 0 ? this.normal : this.normal.mul(-1));
    const [rayOut, attenuation] = this.material.scatter(ray, hit);
    return [hit, rayOut, attenuation];
  }
}
