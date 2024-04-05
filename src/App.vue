<template>
  <canvas id="recluse-spider"></canvas>
</template>

<script setup lang="ts">
window.onload = function initAnimation() {
  let canvas = document.getElementById("recluse-spider") as HTMLCanvasElement,
    c = canvas?.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);

  function handleMouseMove(e: MouseEvent) {}

  function handleMouseLeave(e: MouseEvent) {}

  function handleMouseDown(e: MouseEvent) {}

  function handleMouseUp(e: MouseEvent) {}

  function handleResize() {}

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
