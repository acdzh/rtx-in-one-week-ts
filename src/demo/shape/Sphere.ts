import Ray from '../base/Ray';
import HitRecord from './HitRecord';
import Vec3 from '../base/Vec3';
import Hitable, { HitResult } from './Hitable.interface';
import Material from '../material/Material.interface';

export default class Sphere implements Hitable {
  center: Vec3;
  radius: number;
  material: Material;

  constructor(center: Vec3, r: number, material: Material) {
    this.center = center;
    this.radius = r;
    this.material = material;
  }

  hit(ray: Ray, t_min: number, t_max: number): HitResult {
    const oc = Vec3.sub(ray.origin, this.center);
    const a = Vec3.dot(ray.direction, ray.direction);
    const b = Vec3.dot(oc, ray.direction) * 2;
    const c = Vec3.dot(oc, oc) - this.radius ** 2;

    const Δ = b ** 2 - 4 * a * c;

    if (Δ >= 0) {
      const sqrtΔ = Math.sqrt(Δ);
      let t = (-b - sqrtΔ) / (2 * a);

      if (t > t_min && t < t_max) {
        const p = ray.getPoint(t);
        const hit = new HitRecord(t, p, p.sub(this.center).div(this.radius));
        const [rayOut, attenuation] = this.material.scatter(ray, hit);
        return [hit, rayOut, attenuation];
      }

      t = (-b + sqrtΔ) / (2 * a);
      if (t > t_min && t < t_max) {
        const p = ray.getPoint(t);
        const hit = new HitRecord(t, p, p.sub(this.center).div(this.radius));
        const [rayOut, attenuation] = this.material.scatter(ray, hit);
        return [hit, rayOut, attenuation];
      }
    }

    return null;
  }
}
