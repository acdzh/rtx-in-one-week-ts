import Pixel from './lib/Pixel';
import RenderTask from './lib/RenderTask';
import color from './demo/color';

const renderPixel = (v: Pixel, width: number, height: number) => {
  // [v.r, v.g, v.b] = color(v.x / width, 1 - v.y / height).map(v => Math.floor(v * 255));
  // v.a = 255;
  const n = 100;
  [v.r, v.g, v.b] = new Array(n)
    .fill(0)
    .map(() => color((v.x + Math.random()) / width, 1 - (v.y + Math.random()) / height))
    .reduce((res, v) => res.map((item, i) => (item += v[i])), [0, 0, 0])
    .map(v => Math.floor((v / n) * 255.99));
  v.a = 255;
};

type AppMessageHandlerType = (task?: RenderTask) => void;
type AppMessageHandlersMapType = {
  render: AppMessageHandlerType;
};

const appMessageHandlersMap: AppMessageHandlersMapType = {
  render: (task: RenderTask) => {
    const { pixels, width, height } = task;
    const len = 400;

    let res = new RenderTask([], width, height);

    const doTask = (i: number) => {
      for (let j = 0; j < len && i + j < pixels.length; j++) {
        renderPixel(pixels[i + j], width, height);
        res.pixels.push(pixels[i + j]);
      }

      (<any>postMessage)({
        method: 'partComplete',
        args: [res],
      });

      res = new RenderTask([], width, height);

      if (i + len < pixels.length) {
        return setTimeout(() => {
          doTask(i + len);
        }, 0);
      } else {
        (<any>postMessage)({
          method: 'allComplete',
          args: [res],
        });
      }
    };

    doTask(0);
  },
};

onmessage = e => {
  const { method, args = [] } = e.data;
  if (appMessageHandlersMap[method]) {
    appMessageHandlersMap[method](...args);
  } else {
    console.log(`taskWorker: can't find method (${method})`);
  }
};
