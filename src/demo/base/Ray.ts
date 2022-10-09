import Vec3 from './Vec3';
import HitRecord from '../shape/HitRecord';

export const reflect = (v: Vec3, n: Vec3): Vec3 => v.sub(n.mul(Vec3.dot(v, n) * 2));

const refract = (v: Vec3, n: Vec3, refractivity: number) => {
  const vDotN = Vec3.dot(v, n);
  const cos2γ = 1.0 - (1 - vDotN ** 2) * refractivity ** 2;

  if (cos2γ < 0) {
    return null;
  } else {
    return v
      .sub(n.mul(vDotN))
      .mul(refractivity)
      .sub(n.mul(Math.sqrt(cos2γ)));
  }
};

const schlick = (cosine: number, refractivity: number): number => {
  const r0 = ((1 - refractivity) / (1 + refractivity)) ** 2;
  return r0 + (1 + r0) * (1 - cosine) ** 5;
};

export default class Ray {
  origin: Vec3;
  direction: Vec3;

  constructor(origin: Vec3, direction: Vec3) {
    this.origin = origin;
    this.direction = direction.unitVec();
  }

  getPoint(t: number) {
    return this.origin.add(this.direction.mul(t));
  }

  reflect(hit: HitRecord): Ray {
    return new Ray(hit.p, reflect(this.direction, hit.normal));
  }

  refract(hit: HitRecord, refractivity: number) {
    const { normal } = hit;

    const isRayGoOut = Vec3.dot(this.direction, normal) > 0;
    const consine = isRayGoOut ?
      refractivity * Vec3.dot(this.direction, hit.normal) :
      -1 * Vec3.dot(this.direction, hit.normal);

    const res = refract(
      this.direction,
      isRayGoOut ? normal.mul(-1) : normal,
      isRayGoOut ? refractivity : 1 / refractivity
    );

    if (res && Math.random() > schlick(consine, refractivity)) {
      return new Ray(hit.p, res);
    } else {
      return this.reflect(hit);
    }
  }
}
