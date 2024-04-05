<template>
  <canvas id="recluse-spider"></canvas>
</template>

<script setup lang="ts">
window.onload = function initAnimation() {
  let canvas = document.getElementById("recluse-spider") as HTMLCanvasElement,
    c = canvas?.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight),
    mouse = { x: false, y: false },
    last_mouse = {};

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
      c?.lineTo(this.nextPos.x, this.nextPos.y);
    }
  }

  const handleMouseMove = (e: MouseEvent) => {};

  const handleMouseLeave = (e: MouseEvent) => {};

  const handleMouseDown = (e: MouseEvent) => {};

  const handleMouseUp = (e: MouseEvent) => {};

  const handleResize = () => {};

  canvas.addEventListener("mousemove", handleMouseMove, false);
  canvas.addEventListener("mouseleave", handleMouseLeave);
  canvas.addEventListener("mousedown", handleMouseDown, false);
  canvas.addEventListener("mouseup", handleMouseUp, false);
  window.addEventListener("resize", handleResize);
};
</script>

<style>
body,
html {
  margin: 0px;
  padding: 0px;
  position: fixed;
  background: rgb(30, 30, 30);
}
</style>
