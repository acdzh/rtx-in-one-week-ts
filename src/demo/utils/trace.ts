import Ray from "../base/Ray";
import Vec3 from "../base/Vec3";
import Hitable from "../shape/Hitable.interface";

const trace = (sence: Hitable, r: Ray, step = 0): Vec3 => {
  if (step > 400) {
    return new Vec3(0, 0, 0);
  }
  const hit = sence.hit(r, 0.000000001, Infinity);
  let res: Vec3;

  if (hit) {
    if (hit[1]) {
      res = trace(sence, hit[1], ++step).mul(hit[2]);
    } else {
      res = hit[2];
    }
  } else {
    // background (light)
    const unitDirection = r.direction.unitVec();
    const t = (unitDirection.e1 + 1) / 2;
    // res = Vec3.add(new Vec3(1, 1, 1).mul(1 - t), new Vec3(0.18, 0.3, 0.6).mul(t));
    res = new Vec3(1, 1, 1).mul(t);
  }
  return res;
};

export default trace;