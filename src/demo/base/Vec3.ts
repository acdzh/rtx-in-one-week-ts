export default class Vec3 {
  e0: number
  e1: number
  e2: number

  constructor(e0 = 0, e1 = 0, e2 = 0) {
    this.e0 = e0
    this.e1 = e1
    this.e2 = e2
  }

  static fill(v: number): Vec3 {
    return new Vec3(v, v, v);
  }

  static add(v1: Vec3, v2: Vec3): Vec3 {
    return new Vec3(v1.e0 + v2.e0, v1.e1 + v2.e1, v1.e2 + v2.e2);
  }

  static sub(v1: Vec3, v2: Vec3): Vec3 {
    return new Vec3(v1.e0 - v2.e0, v1.e1 - v2.e1, v1.e2 - v2.e2);
  }

  static mul(v1: Vec3, v2: Vec3): Vec3 {
    return new Vec3(v1.e0 * v2.e0, v1.e1 * v2.e1, v1.e2 * v2.e2);
  }

  static div(v1: Vec3, v2: Vec3): Vec3 {
    return new Vec3(v1.e0 / v2.e0, v1.e1 / v2.e1, v1.e2 / v2.e2);
  }

  static dot(v1: Vec3, v2: Vec3): number {
    return v1.e0 * v2.e0 + v1.e1 * v2.e1 + v1.e2 * v2.e2
  }

  static cross(v1: Vec3, v2: Vec3): Vec3 {
    return new Vec3(
      (v1.e1 * v2.e2 - v1.e2 * v2.e1),
      (v1.e0 * v2.e2 - v1.e2 * v2.e0) * (-1),
      (v1.e0 * v2.e1 - v1.e1 * v2.e0)
    )
  }

  add(v: Vec3 | number) {
    if (typeof v === 'number') {
      return Vec3.add(this, Vec3.fill(v));
    }
    return Vec3.add(this, v);
  }

  sub(v: Vec3 | number) {
    if (typeof v === 'number') {
      return Vec3.sub(this, Vec3.fill(v));
    }
    return Vec3.sub(this, v);
  }

  mul(v: Vec3 | number) {
    if (typeof v === 'number') {
      return Vec3.mul(this, Vec3.fill(v));
    }
    return Vec3.mul(this, v);
  }

  div(v: Vec3 | number) {
    if (typeof v === 'number') {
      return Vec3.div(this, Vec3.fill(v));
    }
    return Vec3.div(this, v);
  }


  squaredLength() {
    return this.e0 ** 2 + this.e1 ** 2 + this.e2 ** 2;
  }

  length() {
    return this.squaredLength()**(1/2);
  }

  unitVec() {
    return this.div(this.length());
  }

  toArray(): number[] {
    return [this.e0, this.e1, this.e2];
  }
}