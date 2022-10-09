import Vec3 from './Vec3';
import Ray from './Ray';

// get a Vec(a, b, 0) that: a ∈ (-1, 1) && b ∈ (-1, 1) & a^2 + b^2 < 1
function randomInUnitDist(): Vec3 {
  while (true) {
    let p = (new Vec3(Math.random(), Math.random(), 0)).mul(2).sub(new Vec3(1, 1, 0))
    if (Vec3.dot(p, p) < 1) return p;
  }
};


export default class Camera {
  origin: Vec3;
  vertical: Vec3;
  horizontal: Vec3;
  leftBottom: Vec3;

  lensRadius:number
  focusDist:number

  front: Vec3; // w
  right: Vec3; // u
  up: Vec3; // v

  // constructor(origin: Vec3, leftBottom: Vec3, horizontal: Vec3, vertical: Vec3) {
  //   this.origin = origin;
  //   this.vertical = vertical;
  //   this.leftBottom = leftBottom;
  //   this.horizontal = horizontal;
  // }
  constructor(origin: Vec3, lookto: Vec3, vup: Vec3, vfov: number, aspect = 2, aperture:number, focuDist?: number) {
    const θ = (vfov * Math.PI) / 180;
    const harfHeight = Math.tan(θ / 2);
    const harfWidth = harfHeight * aspect;

    this.front = lookto.sub(origin).unitVec();
    this.right = Vec3.cross(this.front, vup).unitVec();
    this.up = Vec3.cross(this.right, this.front).unitVec();

    this.origin = origin;
    this.lensRadius = aperture / 2;
    this.focusDist = focuDist ? focuDist : origin.sub(lookto).length();
    this.vertical = this.up.mul((harfHeight * 2) * this.focusDist);
    this.horizontal = this.right.mul((harfWidth * 2) * this.focusDist);
    this.leftBottom = origin
    .sub(this.vertical.mul(0.5))
    .sub(this.horizontal.mul(0.5))
    .add(this.front.mul(this.focusDist));
  }

  getRay(x: number, y: number): Ray {
    const rd  = randomInUnitDist().mul(this.lensRadius)
    const offset = this.right.mul(rd.e0).add(this.up.mul(rd.e1))

    return new Ray(
      this.origin.add(offset),
      this.leftBottom
        .add(this.horizontal.mul(x))
        .add(this.vertical.mul(y))
        .sub(this.origin)
        .sub(offset)
    );
  }
}
