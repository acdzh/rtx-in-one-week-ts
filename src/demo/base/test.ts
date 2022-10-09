import Camera from './Camera';
import Vec3 from './Vec3';

const camera1 = new Camera(
  new Vec3(-2,2,1),
  new Vec3(0,0,-1),
  new Vec3(0,1,0),
  90, 2, 0, 10
);

const camera2 = new Camera(
  new Vec3(-2,2,1),
  new Vec3(0,0,-1),
  new Vec3(0,1,0),
  90, 2, 0, 100
);

const ray1 = camera1.getRay(0, 0);
const ray2 = camera2.getRay(0, 0);

console.log(ray1, ray2);
