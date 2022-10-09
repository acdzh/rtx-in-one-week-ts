import Ray from './base/Ray';
import Vec3 from './base/Vec3';
import Pixel from '../lib/Pixel';
import Camera from './base/Camera';
import Sphere from './shape/Sphere';
import HitList from './shape/HitList';
import Hitable from './shape/Hitable.interface';
import Metal from './material/Metal';
import Lambertian from './material/Lambertian';
import Light from './material/Light';
import Dielectric from './material/Dielectric';
import Plane from './shape/Plane';

import trace from './utils/trace';

const camera = new Camera(new Vec3(0, 1, 1), new Vec3(0, 0, -1), new Vec3(0, 1, 0), 60, 2, 0.5);
// const camera = new Camera(
//   new Vec3(-2,2,1),
//   new Vec3(0,0,-1),
//   new Vec3(0,1,0),
//   90, 2, 0.5
// );

const world = new HitList([
  new Sphere(new Vec3(-0.5, 0, -2), 0.5, new Metal(new Vec3(0, 0.502, 0.502), 0.5)),
  // new Sphere(new Vec3(-0.5, 0, -2), 0.5, new Dielectric(new Vec3(1, 1, 1), 1.8)),
  new Sphere(new Vec3(1, 0.1, -1), 0.6, new Lambertian(new Vec3(0.145, 0.957, 0.933))),
  // new Sphere(new Vec3(-1, 0, -1), 0.5, new Dielectric(new Vec3(0.996, 0.173, 0.333) ,1.5)),
  new Sphere(new Vec3(-1, 0, -1), 0.5, new Dielectric(new Vec3(1, 1, 1), 1.8)),
  new Sphere(new Vec3(0, -100.5, -1), 100, new Metal(0.6)),
  // new Plane(new Vec3(0, -0.5, 0), new Vec3(0, 1, 0), new Metal(0.6))
]);

export default (x: number, y: number) => trace(world, camera.getRay(x, y), 0).toArray();
