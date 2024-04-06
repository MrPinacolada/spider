var T = Object.defineProperty;
var W = (l, a, h) => a in l ? T(l, a, { enumerable: !0, configurable: !0, writable: !0, value: h }) : l[a] = h;
var r = (l, a, h) => (W(l, typeof a != "symbol" ? a + "" : a, h), h);
import { defineComponent as A, onMounted as D, openBlock as H, createElementBlock as R, normalizeStyle as U, onBeforeUnmount as F, pushScopeId as G, popScopeId as J, createElementVNode as N } from "vue";
const V = (l) => (G("data-v-11c8bc56"), l = l(), J(), l), X = /* @__PURE__ */ V(() => /* @__PURE__ */ N("canvas", { id: "amazing__spider" }, null, -1)), Y = [
  X
], $ = /* @__PURE__ */ A({
  __name: "amazing__spider",
  props: {
    tentacle_start: {
      required: !1,
      type: String,
      default: "#ffffff"
    },
    tentacle_end: {
      required: !1,
      type: String,
      default: "#294CBE"
    },
    background_color: {
      required: !1,
      type: String,
      default: "#0c0c0d"
    },
    center_color: {
      required: !1,
      type: String,
      default: "#fff"
    },
    dots_color: {
      required: !1,
      type: String,
      default: "#fff"
    },
    dots_border_color: {
      required: !1,
      type: String,
      default: "#e7e8e6"
    }
  },
  setup(l) {
    const a = l;
    let h = { x: 0, y: 0 }, M = 300, p = 50, z = 20, w = 300, y = [], s = { x: 0, y: 0, errx: 0, erry: 0 }, x = { x: 0, y: 0 }, c = 0, k = 10;
    const C = () => {
      let d = document.getElementById("amazing__spider");
      if (!d)
        return;
      let t = d == null ? void 0 : d.getContext("2d"), f = d.width = window.innerWidth, m = d.height = window.innerHeight;
      const u = (n, e, i, o) => Math.sqrt(Math.pow(i - n, 2) + Math.pow(o - e, 2));
      class q {
        constructor(e, i, o, g) {
          r(this, "first");
          r(this, "pos");
          r(this, "l");
          r(this, "ang");
          r(this, "nextPos");
          this.first = g, g ? this.pos = {
            x: e.x,
            y: e.y
          } : this.pos = {
            x: e.nextPos.x,
            y: e.nextPos.y
          }, this.l = i, this.ang = o, this.nextPos = {
            x: this.pos.x + this.l * Math.cos(this.ang),
            y: this.pos.y + this.l * Math.sin(this.ang)
          };
        }
        update(e) {
          this.ang = Math.atan2(e.y - this.pos.y, e.x - this.pos.x), this.pos.x = e.x + this.l * Math.cos(this.ang - Math.PI), this.pos.y = e.y + this.l * Math.sin(this.ang - Math.PI), this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang), this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
        }
        fallback(e) {
          this.pos.x = e.x, this.pos.y = e.y, this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang), this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
        }
        show() {
          t == null || t.lineTo(this.nextPos.x, this.nextPos.y);
        }
      }
      class B {
        constructor(e, i, o, g, K) {
          r(this, "x");
          r(this, "y");
          r(this, "l");
          r(this, "n");
          r(this, "t");
          r(this, "rand");
          r(this, "segments");
          r(this, "angle");
          r(this, "dt");
          this.x = e, this.y = i, this.l = o, this.n = g, this.t = {}, this.rand = Math.random(), this.segments = [new q(this, this.l / this.n, 0, !0)];
          for (let b = 1; b < this.n; b++)
            this.segments.push(
              new q(this.segments[b - 1], this.l / this.n, 0, !1)
            );
        }
        move(e, i) {
          this.angle = Math.atan2(i.y - this.y, i.x - this.x), this.dt = u(e.x, e.y, i.x, i.y) + 5, this.t = {
            x: i.x - 0.8 * this.dt * Math.cos(this.angle),
            y: i.y - 0.8 * this.dt * Math.sin(this.angle)
          }, this.t.x ? this.segments[this.n - 1].update(this.t) : this.segments[this.n - 1].update(i);
          for (let o = this.n - 2; o >= 0; o--)
            this.segments[o].update(this.segments[o + 1].pos);
          if (u(this.x, this.y, i.x, i.y) <= this.l + u(e.x, e.y, i.x, i.y)) {
            this.segments[0].fallback({ x: this.x, y: this.y });
            for (let o = 1; o < this.n; o++)
              this.segments[o].fallback(this.segments[o - 1].nextPos);
          }
        }
        show(e) {
          if (u(this.x, this.y, e.x, e.y) <= this.l && t) {
            t.globalCompositeOperation = "lighter", t.beginPath(), t.lineTo(this.x, this.y);
            for (let o = 0; o < this.n; o++)
              this.segments[o].show();
            let i = t.createLinearGradient(
              0,
              0,
              d.width,
              d.height
            );
            i.addColorStop(0, a.tentacle_start), i.addColorStop(1, a.tentacle_end), t.strokeStyle = i, t.lineWidth = this.rand * 4, t.lineCap = "round", t.lineJoin = "round", t.stroke(), t.globalCompositeOperation = "source-over";
          }
        }
        show2(e) {
          t && (t.beginPath(), u(this.x, this.y, e.x, e.y) <= this.l ? (t.arc(this.x, this.y, 2 * this.rand + 2, 0, 2 * Math.PI), t.fillStyle = a.dots_border_color) : (t.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI), t.fillStyle = a.dots_color), t.fill());
        }
      }
      for (let n = 0; n < w; n++)
        y.push(
          new B(
            Math.random() * f,
            Math.random() * m,
            Math.random() * (M - p) + p,
            z,
            Math.random() * 2 * Math.PI
          )
        );
      const O = () => {
        if (t) {
          h.x ? (s.errx = h.x - s.x, s.erry = h.y - s.y) : (s.errx = f / 2 + (m / 2 - k) * Math.sqrt(2) * Math.cos(c) / (Math.pow(Math.sin(c), 2) + 1) - s.x, s.erry = m / 2 + (m / 2 - k) * Math.sqrt(2) * Math.cos(c) * Math.sin(c) / (Math.pow(Math.sin(c), 2) + 1) - s.y), s.x += s.errx / 10, s.y += s.erry / 10, c += 0.01, t.beginPath(), t.arc(
            s.x,
            s.y,
            u(x.x, x.y, s.x, s.y) + 5,
            0,
            2 * Math.PI
          ), t.fillStyle = a.center_color, t.fill();
          for (let n = 0; n < w; n++)
            y[n].move(x, s), y[n].show2(s);
          for (let n = 0; n < w; n++)
            y[n].show(s);
          x.x = s.x, x.y = s.y;
        }
      }, _ = (n) => {
        h.x = n.pageX - d.offsetLeft, h.y = n.pageY - d.offsetTop;
      }, v = (n) => {
        h.x = 0, h.y = 0;
      }, P = (n) => {
      }, E = (n) => {
      }, L = () => {
        f = d.width = window.innerWidth, m = d.height = window.innerHeight, I(), document.addEventListener("mousemove", _, !1), document.addEventListener("mouseleave", v), document.addEventListener("mousedown", P, !1), document.addEventListener("mouseup", E, !1), window.addEventListener("resize", L), S();
      };
      document.addEventListener("mousemove", _, !1), document.addEventListener("mouseleave", v), document.addEventListener("mousedown", P, !1), document.addEventListener("mouseup", E, !1), window.addEventListener("resize", L);
      const S = () => {
        t == null || t.clearRect(0, 0, f, m), O(), requestAnimationFrame(S);
      };
      S();
      const I = () => {
        document.removeEventListener("mousemove", _, !1), document.removeEventListener("mouseleave", v), document.removeEventListener("mousedown", P, !1), document.removeEventListener("mouseup", E, !1), window.removeEventListener("resize", L);
      };
      F(() => {
        I();
      });
    };
    return D(() => {
      C();
    }), (d, t) => (H(), R("div", {
      class: "amazing__spider-wrapper",
      style: U({ background: d.$props.background_color })
    }, Y, 4));
  }
}), j = (l, a) => {
  const h = l.__vccOpts || l;
  for (const [M, p] of a)
    h[M] = p;
  return h;
}, tt = /* @__PURE__ */ j($, [["__scopeId", "data-v-11c8bc56"]]);
export {
  tt as default
};
