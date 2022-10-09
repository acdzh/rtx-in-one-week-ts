import Ray from '../base/Ray'
import HitRecord from '../shape/HitRecord'
import Vec3 from '../base/Vec3';

export type Attenuation = Vec3;
export type ScatterResult = [Ray, Attenuation];

export default interface Material {
  scatter: (rayIn: Ray, hit: HitRecord) => ScatterResult;
}
