import Pixel from './lib/Pixel';
import RenderTask from './lib/RenderTask';
const canvas = document.getElementById('cv') as HTMLCanvasElement;
const startButton = document.getElementById('start-button') as HTMLButtonElement;

const height = canvas.clientHeight;
const width = canvas.clientWidth;

let complete: number;
const area = width * height;

let startTime: number;
const bar = document.getElementById('processbar') as HTMLDivElement;
const barValue = document.getElementById('processvalue') as HTMLDivElement;
const timeEle = document.getElementById('time') as HTMLDivElement;

canvas.height = height;
canvas.width = width;

const ctx = canvas.getContext('2d');
const image = ctx.createImageData(width, height);

const setBar = (_n: number): void => {
  const n = _n > 1 ? 1 : _n;
  bar.style.width = `${n * 100}%`;
  barValue.innerText = `${(n * 100).toFixed(2)}%`;
};

type WorkerMessageHandlerType = (work: Worker, task?: RenderTask) => void;
type WorkerMessageHandlersMapType = {
  partComplete: WorkerMessageHandlerType;
  allComplete: WorkerMessageHandlerType;
};

const workerMessageHandlersMap: WorkerMessageHandlersMapType = {
  partComplete: (_, task) => {
    task.pixels.forEach((v, i) => {
      const position = (v.x + v.y * task.width) * 4;
      image.data[position] = v.r;
      image.data[position + 1] = v.g;
      image.data[position + 2] = v.b;
      image.data[position + 3] = v.a;
    });

    complete += task.pixels.length;
    setBar(complete / area);
    ctx.putImageData(image, 0, 0);
  },

  allComplete: (worker, task) => {
    if (task) {
      task.pixels.forEach(v => {
        const position = (v.x + v.y * task.width) * 4;
        image.data[position] = v.r;
        image.data[position + 1] = v.g;
        image.data[position + 2] = v.b;
        image.data[position + 3] = v.a;
      });

      complete += task.pixels.length;
      setBar(complete / area);
      ctx.putImageData(image, 0, 0);
    }

    worker.terminate();
  },
};

const performTask = (task: RenderTask) => {
  const worker = new Worker('./dist/task.worker.js');
  worker.postMessage({
    method: 'render',
    args: [task],
  });

  worker.onmessage = (res: { data: { method: string; args: any[] } }) => {
    const { method, args } = res.data;

    if (workerMessageHandlersMap[method]) {
      workerMessageHandlersMap[method](worker, ...args);
    } else {
      alert(`app : can't find method (${method})`);
    }
  };
};

const initTasks = (ctx: CanvasRenderingContext2D, width: number, height: number, workersCount: number) => {
  const tasks: RenderTask[] = new Array(workersCount).fill(new RenderTask([], width, height));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tasks[Math.floor(Math.random() * workersCount)].pixels.push(new Pixel(x, y));
    }
  }
  tasks.forEach(task => {
    performTask(task);
  });
};

const initTasks2 = (ctx: CanvasRenderingContext2D, width: number, height: number, workersCount: number) => {
  const len = Math.ceil(area / workersCount);

  const pixels: Pixel[][] = [];
  for (let y = 0; y < height; y++) {
    pixels.push([]);
    for (let x = 0; x < width; x++) {
      pixels[y].push(new Pixel(x, y));
    }
  }

  let task = new RenderTask([], width, height);
  while (pixels.length) {
    const y = Math.floor(Math.random() * (pixels.length - 0.0001));
    const pxs = pixels[y];
    const x = Math.floor(Math.random() * (pxs.length - 0.0001));
    const px = pxs.splice(x, 1)[0];

    task.pixels.push(px);
    if (pxs.length == 0) {
      pixels.splice(y, 1);
    }

    if (task.pixels.length >= len || pixels.length == 0) {
      performTask(task);
      task = new RenderTask([], width, height);
    }
  }
};

const start = () => {
  complete = 0;
  startTime = performance.now();
  const requireTimeTask = setInterval(() => {
    const _n = complete / area;
    if (_n >= 1) {
      clearInterval(requireTimeTask);
      return;
    }
    const n = _n > 1 ? 1 : _n;
    const t = performance.now() - startTime;
    const v = n / t;
    const ms = (1 - n) / v;
    timeEle.innerText = `${(t / 1000).toFixed(0)}s / ${(ms / 1000).toFixed(2)}s`;
  }, 1000);
  initTasks2(ctx, width, height, 6);
};

start();
