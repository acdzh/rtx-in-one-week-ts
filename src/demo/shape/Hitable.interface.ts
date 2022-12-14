import Ray from '../base/Ray';
import HitRecord from './HitRecord';
import Vec3 from '../base/Vec3';
import Material, { Attenuation } from '../material/Material.interface';

export type HitResult = [HitRecord, Ray, Attenuation];

export default interface Hitable {
  material?: Material;
  hit: (ray: Ray, t_min: number, t_max: number) => HitResult;
}
