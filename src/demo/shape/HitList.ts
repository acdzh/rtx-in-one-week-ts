import Ray from '../base/Ray';
import HitRecord from './HitRecord';
import Hitable, { HitResult } from './Hitable.interface';

export default class HitList {
  list: Hitable[];

  constructor(hitables: Hitable[]) {
    this.list = hitables;
  }

  hit(ray: Ray, t_min: number, t_max: number): HitResult {
    let closestT = t_max;
    let res: HitResult= null;

    this.list.forEach(v => {
      const resTemp = v.hit(ray, t_min, t_max);
      if (resTemp && resTemp[0].t < closestT) {
        res = resTemp;
        closestT = resTemp[0].t;
      }
    });

    return res;
  }
}
