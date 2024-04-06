<template>
  <div
    class="amazing__spider-wrapper"
    :style="{ background: $props.background_color }"
  >
    <canvas id="amazing__spider"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  tentacle_start: {
    required: false,
    type: String,
    default: "#ffffff",
  },
  tentacle_end: {
    required: false,
    type: String,
    default: "#294CBE",
  },
  background_color: {
    required: false,
    type: String,
    default: "#0c0c0d",
  },
  center_color: {
    required: false,
    type: String,
    default: "#fff",
  },
  dots_color: {
    required: false,
    type: String,
    default: "#fff",
  },
  dots_border_color: {
    required: false,
    type: String,
    default: "#e7e8e6",
  },
});

let mouse = { x: false, y: false },
  last_mouse = {},
  maxl = 300,
  minl = 50,
  n = 20,
  numt = 300,
  tent = [],
  clicked = false,
  target = { x: 0, y: 0 },
  last_target = { x: 0, y: 0 },
  t = 0,
  q = 10;

const initAnimation = () => {
  let canvas = document.getElementById("amazing__spider") as HTMLCanvasElement;
  if (!canvas) return;
  let field = canvas?.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);

  const dist = (p1x: number, p1y: number, p2x: number, p2y: number) => {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
  };

  class segment {
    first: any;
    pos: { x: any; y: any };
    l: any;
    ang: any;
    nextPos: { x: any; y: any };
    constructor(
      parent: { x: any; y: any; nextPos: { x: any; y: any } },
      l: any,
      a: any,
      first: any
    ) {
      this.first = first;
      if (first) {
        this.pos = {
          x: parent.x,
          y: parent.y,
        };
      } else {
        this.pos = {
          x: parent.nextPos.x,
          y: parent.nextPos.y,
        };
      }
      this.l = l;
      this.ang = a;
      this.nextPos = {
        x: this.pos.x + this.l * Math.cos(this.ang),
        y: this.pos.y + this.l * Math.sin(this.ang),
      };
    }
    update(t: { y: number; x: number }) {
      this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
      this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
      this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
      this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
      this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }
    fallback(t: { x: any; y: any }) {
      this.pos.x = t.x;
      this.pos.y = t.y;
      this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
      this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }
    show() {
      field?.lineTo(this.nextPos.x, this.nextPos.y);
    }
  }

  class reculse {
    x: any;
    y: any;
    l: any;
    n: any;
    t: {};
    rand: number;
    segments: segment[];
    angle: number | undefined;
    dt: number | undefined;
    constructor(x: any, y: any, l: any, n: any, a: any) {
      this.x = x;
      this.y = y;
      this.l = l;
      this.n = n;
      this.t = {};
      this.rand = Math.random();
      this.segments = [new segment(this, this.l / this.n, 0, true)];
      for (let i = 1; i < this.n; i++) {
        this.segments.push(
          new segment(this.segments[i - 1], this.l / this.n, 0, false)
        );
      }
    }
    move(last_target: { x: number; y: number }, target: { y: any; x: any }) {
      this.angle = Math.atan2(target.y - this.y, target.x - this.x);
      this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
      this.t = {
        x: target.x - 0.8 * this.dt * Math.cos(this.angle),
        y: target.y - 0.8 * this.dt * Math.sin(this.angle),
      };
      if (this.t.x) {
        this.segments[this.n - 1].update(this.t);
      } else {
        this.segments[this.n - 1].update(target);
      }
      for (let i = this.n - 2; i >= 0; i--) {
        this.segments[i].update(this.segments[i + 1].pos);
      }
      if (
        dist(this.x, this.y, target.x, target.y) <=
        this.l + dist(last_target.x, last_target.y, target.x, target.y)
      ) {
        this.segments[0].fallback({ x: this.x, y: this.y });
        for (let i = 1; i < this.n; i++) {
          this.segments[i].fallback(this.segments[i - 1].nextPos);
        }
      }
    }
    show(target: { x: number; y: number }) {
      if (dist(this.x, this.y, target.x, target.y) <= this.l && field) {
        field.globalCompositeOperation = "lighter";
        field.beginPath();
        field.lineTo(this.x, this.y);
        for (let i = 0; i < this.n; i++) {
          this.segments[i].show();
        }
        let gradient = field.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, props.tentacle_start);
        gradient.addColorStop(1, props.tentacle_end);
        field.strokeStyle = gradient;
        field.lineWidth = this.rand * 4;
        field.lineCap = "round";
        field.lineJoin = "round";
        field.stroke();
        field.globalCompositeOperation = "source-over";
      }
    }

    show2(target: { x: number; y: number }) {
      if (field) {
        field.beginPath();
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          field.arc(this.x, this.y, 2 * this.rand + 2, 0, 2 * Math.PI);
          field.fillStyle = props.dots_border_color;
        } else {
          field.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
          field.fillStyle = props.dots_color;
        }
        field.fill();
      }
    }
  }
  for (let i = 0; i < numt; i++) {
    tent.push(
      new reculse(
        Math.random() * w,
        Math.random() * h,
        Math.random() * (maxl - minl) + minl,
        n,
        Math.random() * 2 * Math.PI
      )
    );
  }

  const draw = () => {
    if (!field) return;
    if (mouse.x) {
      target.errx = mouse.x - target.x;
      target.erry = mouse.y - target.y;
    } else {
      target.errx =
        w / 2 +
        ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
          (Math.pow(Math.sin(t), 2) + 1) -
        target.x;
      target.erry =
        h / 2 +
        ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
          (Math.pow(Math.sin(t), 2) + 1) -
        target.y;
    }

    target.x += target.errx / 10;
    target.y += target.erry / 10;

    t += 0.01;

    field.beginPath();
    field.arc(
      target.x,
      target.y,
      dist(last_target.x, last_target.y, target.x, target.y) + 5,
      0,
      2 * Math.PI
    );
    field.fillStyle = props.center_color;
    field.fill();

    for (let i = 0; i < numt; i++) {
      tent[i].move(last_target, target);
      tent[i].show2(target);
    }
    for (let i = 0; i < numt; i++) {
      tent[i].show(target);
    }
    last_target.x = target.x;
    last_target.y = target.y;
  };

  const handleMouseMove = (e: MouseEvent) => {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
  };

  const handleMouseLeave = (e: MouseEvent) => {
    mouse.x = false;
    mouse.y = false;
  };

  const handleMouseDown = (e: MouseEvent) => {};

  const handleMouseUp = (e: MouseEvent) => {};

  const handleResize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    listenerDestroyer();
    canvas.addEventListener("mousemove", handleMouseMove, false);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mousedown", handleMouseDown, false);
    canvas.addEventListener("mouseup", handleMouseUp, false);
    window.addEventListener("resize", handleResize);
    loop();
  };

  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("mouseleave", handleMouseLeave);
  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);
  window.addEventListener("resize", handleResize);
  const loop = () => {
    field?.clearRect(0, 0, w, h);
    draw();
    requestAnimationFrame(loop);
  };

  loop();
  const listenerDestroyer = () => {
    canvas.removeEventListener("mousemove", handleMouseMove, false);
    canvas.removeEventListener("mouseleave", handleMouseLeave);
    canvas.removeEventListener("mousedown", handleMouseDown, false);
    canvas.removeEventListener("mouseup", handleMouseUp, false);
    window.removeEventListener("resize", handleResize);
  };
  onBeforeUnmount(() => {
    listenerDestroyer();
  });
};
onMounted(() => {
  initAnimation();
});
</script>

<style scoped>
.amazing__spider-wrapper {
  margin: 0px;
  padding: 0px;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  overflow: hidden;
  #amazing__spider {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}
</style>
