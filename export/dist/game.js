(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // http-import:https://esm.sh/v135/kaboom@3000.1.17/denonext/kaboom.mjs
  var Pn = Object.defineProperty;
  var n = /* @__PURE__ */ __name((r, t) => Pn(r, "name", { value: t, configurable: true }), "n");
  var Bn = (() => {
    for (var r = new Uint8Array(128), t = 0; t < 64; t++)
      r[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
    return (h) => {
      for (var c = h.length, f = new Uint8Array((c - (h[c - 1] == "=") - (h[c - 2] == "=")) * 3 / 4 | 0), v = 0, B = 0; v < c; ) {
        var C = r[h.charCodeAt(v++)], Y = r[h.charCodeAt(v++)], A = r[h.charCodeAt(v++)], te = r[h.charCodeAt(v++)];
        f[B++] = C << 2 | Y >> 4, f[B++] = Y << 4 | A >> 2, f[B++] = A << 6 | te;
      }
      return f;
    };
  })();
  function Ne(r) {
    return r * Math.PI / 180;
  }
  __name(Ne, "Ne");
  n(Ne, "deg2rad");
  function Et(r) {
    return r * 180 / Math.PI;
  }
  __name(Et, "Et");
  n(Et, "rad2deg");
  function He(r, t, h) {
    return t > h ? He(r, h, t) : Math.min(Math.max(r, t), h);
  }
  __name(He, "He");
  n(He, "clamp");
  function Ye(r, t, h) {
    if (typeof r == "number" && typeof t == "number")
      return r + (t - r) * h;
    if (r instanceof E && t instanceof E || r instanceof $ && t instanceof $)
      return r.lerp(t, h);
    throw new Error(`Bad value for lerp(): ${r}, ${t}. Only number, Vec2 and Color is supported.`);
  }
  __name(Ye, "Ye");
  n(Ye, "lerp");
  function We(r, t, h, c, f) {
    return c + (r - t) / (h - t) * (f - c);
  }
  __name(We, "We");
  n(We, "map");
  function Ds(r, t, h, c, f) {
    return He(We(r, t, h, c, f), c, f);
  }
  __name(Ds, "Ds");
  n(Ds, "mapc");
  var _a;
  var E = (/* @__PURE__ */ __name(_a = class {
    constructor(t = 0, h = t) {
      __publicField(this, "x", 0);
      __publicField(this, "y", 0);
      this.x = t, this.y = h;
    }
    static fromAngle(t) {
      let h = Ne(t);
      return new _a(Math.cos(h), Math.sin(h));
    }
    clone() {
      return new _a(this.x, this.y);
    }
    add(...t) {
      let h = M(...t);
      return new _a(this.x + h.x, this.y + h.y);
    }
    sub(...t) {
      let h = M(...t);
      return new _a(this.x - h.x, this.y - h.y);
    }
    scale(...t) {
      let h = M(...t);
      return new _a(this.x * h.x, this.y * h.y);
    }
    dist(...t) {
      let h = M(...t);
      return this.sub(h).len();
    }
    sdist(...t) {
      let h = M(...t);
      return this.sub(h).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let t = this.len();
      return t === 0 ? new _a(0) : this.scale(1 / t);
    }
    normal() {
      return new _a(this.y, -this.x);
    }
    reflect(t) {
      return this.sub(t.scale(2 * this.dot(t)));
    }
    project(t) {
      return t.scale(t.dot(this) / t.len());
    }
    reject(t) {
      return this.sub(this.project(t));
    }
    dot(t) {
      return this.x * t.x + this.y * t.y;
    }
    cross(t) {
      return this.x * t.y - this.y * t.x;
    }
    angle(...t) {
      let h = M(...t);
      return Et(Math.atan2(this.y - h.y, this.x - h.x));
    }
    angleBetween(...t) {
      let h = M(...t);
      return Et(Math.atan2(this.cross(h), this.dot(h)));
    }
    lerp(t, h) {
      return new _a(Ye(this.x, t.x, h), Ye(this.y, t.y, h));
    }
    slerp(t, h) {
      let c = this.dot(t), f = this.cross(t), v = Math.atan2(f, c);
      return this.scale(Math.sin((1 - h) * v)).add(t.scale(Math.sin(h * v))).scale(1 / f);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(t) {
      return new _a(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
    }
    transform(t) {
      return t.multVec2(this);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y;
    }
    bbox() {
      return new Ve(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
  }, "ye"), (() => {
    n(_a, "Vec2");
  })(), __publicField(_a, "LEFT", new _a(-1, 0)), __publicField(_a, "RIGHT", new _a(1, 0)), __publicField(_a, "UP", new _a(0, -1)), __publicField(_a, "DOWN", new _a(0, 1)), _a);
  function M(...r) {
    if (r.length === 1) {
      if (r[0] instanceof E)
        return new E(r[0].x, r[0].y);
      if (Array.isArray(r[0]) && r[0].length === 2)
        return new E(...r[0]);
    }
    return new E(...r);
  }
  __name(M, "M");
  n(M, "vec2");
  var _a2;
  var $ = (/* @__PURE__ */ __name(_a2 = class {
    constructor(t, h, c) {
      __publicField(this, "r", 255);
      __publicField(this, "g", 255);
      __publicField(this, "b", 255);
      this.r = He(t, 0, 255), this.g = He(h, 0, 255), this.b = He(c, 0, 255);
    }
    static fromArray(t) {
      return new _a2(t[0], t[1], t[2]);
    }
    static fromHex(t) {
      if (typeof t == "number")
        return new _a2(t >> 16 & 255, t >> 8 & 255, t >> 0 & 255);
      if (typeof t == "string") {
        let h = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return new _a2(parseInt(h[1], 16), parseInt(h[2], 16), parseInt(h[3], 16));
      } else
        throw new Error("Invalid hex color format");
    }
    static fromHSL(t, h, c) {
      if (h == 0)
        return new _a2(255 * c, 255 * c, 255 * c);
      let f = n((te, S, K) => (K < 0 && (K += 1), K > 1 && (K -= 1), K < 1 / 6 ? te + (S - te) * 6 * K : K < 1 / 2 ? S : K < 2 / 3 ? te + (S - te) * (2 / 3 - K) * 6 : te), "hue2rgb"), v = c < 0.5 ? c * (1 + h) : c + h - c * h, B = 2 * c - v, C = f(B, v, t + 1 / 3), Y = f(B, v, t), A = f(B, v, t - 1 / 3);
      return new _a2(Math.round(C * 255), Math.round(Y * 255), Math.round(A * 255));
    }
    clone() {
      return new _a2(this.r, this.g, this.b);
    }
    lighten(t) {
      return new _a2(this.r + t, this.g + t, this.b + t);
    }
    darken(t) {
      return this.lighten(-t);
    }
    invert() {
      return new _a2(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(t) {
      return new _a2(this.r * t.r / 255, this.g * t.g / 255, this.b * t.b / 255);
    }
    lerp(t, h) {
      return new _a2(Ye(this.r, t.r, h), Ye(this.g, t.g, h), Ye(this.b, t.b, h));
    }
    toHSL() {
      let t = this.r / 255, h = this.g / 255, c = this.b / 255, f = Math.max(t, h, c), v = Math.min(t, h, c), B = (f + v) / 2, C = B, Y = B;
      if (f == v)
        B = C = 0;
      else {
        let A = f - v;
        switch (C = Y > 0.5 ? A / (2 - f - v) : A / (f + v), f) {
          case t:
            B = (h - c) / A + (h < c ? 6 : 0);
            break;
          case h:
            B = (c - t) / A + 2;
            break;
          case c:
            B = (t - h) / A + 4;
            break;
        }
        B /= 6;
      }
      return [B, C, Y];
    }
    eq(t) {
      return this.r === t.r && this.g === t.g && this.b === t.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
  }, "he"), (() => {
    n(_a2, "Color");
  })(), __publicField(_a2, "RED", new _a2(255, 0, 0)), __publicField(_a2, "GREEN", new _a2(0, 255, 0)), __publicField(_a2, "BLUE", new _a2(0, 0, 255)), __publicField(_a2, "YELLOW", new _a2(255, 255, 0)), __publicField(_a2, "MAGENTA", new _a2(255, 0, 255)), __publicField(_a2, "CYAN", new _a2(0, 255, 255)), __publicField(_a2, "WHITE", new _a2(255, 255, 255)), __publicField(_a2, "BLACK", new _a2(0, 0, 0)), _a2);
  function W(...r) {
    if (r.length === 0)
      return new $(255, 255, 255);
    if (r.length === 1) {
      if (r[0] instanceof $)
        return r[0].clone();
      if (typeof r[0] == "string")
        return $.fromHex(r[0]);
      if (Array.isArray(r[0]) && r[0].length === 3)
        return $.fromArray(r[0]);
    }
    return new $(...r);
  }
  __name(W, "W");
  n(W, "rgb");
  var Tn = n((r, t, h) => $.fromHSL(r, t, h), "hsl2rgb");
  var _a3;
  var pe = (/* @__PURE__ */ __name(_a3 = class {
    constructor(t, h, c, f) {
      __publicField(this, "x", 0);
      __publicField(this, "y", 0);
      __publicField(this, "w", 1);
      __publicField(this, "h", 1);
      this.x = t, this.y = h, this.w = c, this.h = f;
    }
    scale(t) {
      return new _a3(this.x + this.w * t.x, this.y + this.h * t.y, this.w * t.w, this.h * t.h);
    }
    pos() {
      return new E(this.x, this.y);
    }
    clone() {
      return new _a3(this.x, this.y, this.w, this.h);
    }
    eq(t) {
      return this.x === t.x && this.y === t.y && this.w === t.w && this.h === t.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  }, "zr"), (() => {
    n(_a3, "Quad");
  })(), _a3);
  function oe(r, t, h, c) {
    return new pe(r, t, h, c);
  }
  __name(oe, "oe");
  n(oe, "quad");
  var _a4;
  var ke = (/* @__PURE__ */ __name(_a4 = class {
    constructor(t) {
      __publicField(this, "m", [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      t && (this.m = t);
    }
    static translate(t) {
      return new _a4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
    }
    static scale(t) {
      return new _a4([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(t) {
      t = Ne(-t);
      let h = Math.cos(t), c = Math.sin(t);
      return new _a4([1, 0, 0, 0, 0, h, -c, 0, 0, c, h, 0, 0, 0, 0, 1]);
    }
    static rotateY(t) {
      t = Ne(-t);
      let h = Math.cos(t), c = Math.sin(t);
      return new _a4([h, 0, c, 0, 0, 1, 0, 0, -c, 0, h, 0, 0, 0, 0, 1]);
    }
    static rotateZ(t) {
      t = Ne(-t);
      let h = Math.cos(t), c = Math.sin(t);
      return new _a4([h, -c, 0, 0, c, h, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(t) {
      return this.m[12] += this.m[0] * t.x + this.m[4] * t.y, this.m[13] += this.m[1] * t.x + this.m[5] * t.y, this.m[14] += this.m[2] * t.x + this.m[6] * t.y, this.m[15] += this.m[3] * t.x + this.m[7] * t.y, this;
    }
    scale(t) {
      return this.m[0] *= t.x, this.m[4] *= t.y, this.m[1] *= t.x, this.m[5] *= t.y, this.m[2] *= t.x, this.m[6] *= t.y, this.m[3] *= t.x, this.m[7] *= t.y, this;
    }
    rotate(t) {
      t = Ne(-t);
      let h = Math.cos(t), c = Math.sin(t), f = this.m[0], v = this.m[1], B = this.m[4], C = this.m[5];
      return this.m[0] = f * h + v * c, this.m[1] = -f * c + v * h, this.m[4] = B * h + C * c, this.m[5] = -B * c + C * h, this;
    }
    mult(t) {
      let h = [];
      for (let c = 0; c < 4; c++)
        for (let f = 0; f < 4; f++)
          h[c * 4 + f] = this.m[0 * 4 + f] * t.m[c * 4 + 0] + this.m[1 * 4 + f] * t.m[c * 4 + 1] + this.m[2 * 4 + f] * t.m[c * 4 + 2] + this.m[3 * 4 + f] * t.m[c * 4 + 3];
      return new _a4(h);
    }
    multVec2(t) {
      return new E(t.x * this.m[0] + t.y * this.m[4] + this.m[12], t.x * this.m[1] + t.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new E(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4], h = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(h, t / h);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = this.m[0] * this.m[5] - this.m[1] * this.m[4], h = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(t / h, h);
      } else
        return new E(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return Et(this.m[1] > 0 ? Math.acos(this.m[0] / t) : -Math.acos(this.m[0] / t));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return Et(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / t) : -Math.acos(this.m[4] / t)));
      } else
        return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new E(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new E(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (t * t));
      } else
        return new E(0, 0);
    }
    invert() {
      let t = [], h = this.m[10] * this.m[15] - this.m[14] * this.m[11], c = this.m[9] * this.m[15] - this.m[13] * this.m[11], f = this.m[9] * this.m[14] - this.m[13] * this.m[10], v = this.m[8] * this.m[15] - this.m[12] * this.m[11], B = this.m[8] * this.m[14] - this.m[12] * this.m[10], C = this.m[8] * this.m[13] - this.m[12] * this.m[9], Y = this.m[6] * this.m[15] - this.m[14] * this.m[7], A = this.m[5] * this.m[15] - this.m[13] * this.m[7], te = this.m[5] * this.m[14] - this.m[13] * this.m[6], S = this.m[4] * this.m[15] - this.m[12] * this.m[7], K = this.m[4] * this.m[14] - this.m[12] * this.m[6], y = this.m[5] * this.m[15] - this.m[13] * this.m[7], X = this.m[4] * this.m[13] - this.m[12] * this.m[5], le = this.m[6] * this.m[11] - this.m[10] * this.m[7], ee = this.m[5] * this.m[11] - this.m[9] * this.m[7], U = this.m[5] * this.m[10] - this.m[9] * this.m[6], de = this.m[4] * this.m[11] - this.m[8] * this.m[7], b = this.m[4] * this.m[10] - this.m[8] * this.m[6], Me = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      t[0] = this.m[5] * h - this.m[6] * c + this.m[7] * f, t[4] = -(this.m[4] * h - this.m[6] * v + this.m[7] * B), t[8] = this.m[4] * c - this.m[5] * v + this.m[7] * C, t[12] = -(this.m[4] * f - this.m[5] * B + this.m[6] * C), t[1] = -(this.m[1] * h - this.m[2] * c + this.m[3] * f), t[5] = this.m[0] * h - this.m[2] * v + this.m[3] * B, t[9] = -(this.m[0] * c - this.m[1] * v + this.m[3] * C), t[13] = this.m[0] * f - this.m[1] * B + this.m[2] * C, t[2] = this.m[1] * Y - this.m[2] * A + this.m[3] * te, t[6] = -(this.m[0] * Y - this.m[2] * S + this.m[3] * K), t[10] = this.m[0] * y - this.m[1] * S + this.m[3] * X, t[14] = -(this.m[0] * te - this.m[1] * K + this.m[2] * X), t[3] = -(this.m[1] * le - this.m[2] * ee + this.m[3] * U), t[7] = this.m[0] * le - this.m[2] * de + this.m[3] * b, t[11] = -(this.m[0] * ee - this.m[1] * de + this.m[3] * Me), t[15] = this.m[0] * U - this.m[1] * b + this.m[2] * Me;
      let H = this.m[0] * t[0] + this.m[1] * t[4] + this.m[2] * t[8] + this.m[3] * t[12];
      for (let xe = 0; xe < 4; xe++)
        for (let ge = 0; ge < 4; ge++)
          t[xe * 4 + ge] *= 1 / H;
      return new _a4(t);
    }
    clone() {
      return new _a4([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  }, "qe"), (() => {
    n(_a4, "Mat4");
  })(), _a4);
  function Jr(r, t, h, c = (f) => -Math.cos(f)) {
    return r + (c(h) + 1) / 2 * (t - r);
  }
  __name(Jr, "Jr");
  n(Jr, "wave");
  var Fn = 1103515245;
  var In = 12345;
  var Vs = 2147483648;
  var _a5;
  var Cs = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a5 = class {
    constructor(r) {
      __publicField(this, "seed");
      this.seed = r;
    }
    gen() {
      return this.seed = (Fn * this.seed + In) % Vs, this.seed / Vs;
    }
    genNumber(r, t) {
      return r + this.gen() * (t - r);
    }
    genVec2(r, t) {
      return new E(this.genNumber(r.x, t.x), this.genNumber(r.y, t.y));
    }
    genColor(r, t) {
      return new $(this.genNumber(r.r, t.r), this.genNumber(r.g, t.g), this.genNumber(r.b, t.b));
    }
    genAny(...r) {
      if (r.length === 0)
        return this.gen();
      if (r.length === 1) {
        if (typeof r[0] == "number")
          return this.genNumber(0, r[0]);
        if (r[0] instanceof E)
          return this.genVec2(M(0, 0), r[0]);
        if (r[0] instanceof $)
          return this.genColor(W(0, 0, 0), r[0]);
      } else if (r.length === 2) {
        if (typeof r[0] == "number" && typeof r[1] == "number")
          return this.genNumber(r[0], r[1]);
        if (r[0] instanceof E && r[1] instanceof E)
          return this.genVec2(r[0], r[1]);
        if (r[0] instanceof $ && r[1] instanceof $)
          return this.genColor(r[0], r[1]);
      }
    }
  }, "_this"), (() => {
    n(_a5, "RNG");
  })(), _a5), "Cs");
  var Xr = new Cs(Date.now());
  function ks(r) {
    return r != null && (Xr.seed = r), Xr.seed;
  }
  __name(ks, "ks");
  n(ks, "randSeed");
  function Zt(...r) {
    return Xr.genAny(...r);
  }
  __name(Zt, "Zt");
  n(Zt, "rand");
  function ii(...r) {
    return Math.floor(Zt(...r));
  }
  __name(ii, "ii");
  n(ii, "randi");
  function Ns(r) {
    return Zt() <= r;
  }
  __name(Ns, "Ns");
  n(Ns, "chance");
  function Us(r) {
    return r[ii(r.length)];
  }
  __name(Us, "Us");
  n(Us, "choose");
  function Ls(r, t) {
    return r.pos.x + r.width > t.pos.x && r.pos.x < t.pos.x + t.width && r.pos.y + r.height > t.pos.y && r.pos.y < t.pos.y + t.height;
  }
  __name(Ls, "Ls");
  n(Ls, "testRectRect");
  function Gs(r, t) {
    if (r.p1.x === r.p2.x && r.p1.y === r.p2.y || t.p1.x === t.p2.x && t.p1.y === t.p2.y)
      return null;
    let h = (t.p2.y - t.p1.y) * (r.p2.x - r.p1.x) - (t.p2.x - t.p1.x) * (r.p2.y - r.p1.y);
    if (h === 0)
      return null;
    let c = ((t.p2.x - t.p1.x) * (r.p1.y - t.p1.y) - (t.p2.y - t.p1.y) * (r.p1.x - t.p1.x)) / h, f = ((r.p2.x - r.p1.x) * (r.p1.y - t.p1.y) - (r.p2.y - r.p1.y) * (r.p1.x - t.p1.x)) / h;
    return c < 0 || c > 1 || f < 0 || f > 1 ? null : c;
  }
  __name(Gs, "Gs");
  n(Gs, "testLineLineT");
  function yt(r, t) {
    let h = Gs(r, t);
    return h ? M(r.p1.x + h * (r.p2.x - r.p1.x), r.p1.y + h * (r.p2.y - r.p1.y)) : null;
  }
  __name(yt, "yt");
  n(yt, "testLineLine");
  function Os(r, t) {
    if (_t(r, t.p1) || _t(r, t.p2))
      return true;
    let h = r.points();
    return !!yt(t, new xt(h[0], h[1])) || !!yt(t, new xt(h[1], h[2])) || !!yt(t, new xt(h[2], h[3])) || !!yt(t, new xt(h[3], h[0]));
  }
  __name(Os, "Os");
  n(Os, "testRectLine");
  function _t(r, t) {
    return t.x > r.pos.x && t.x < r.pos.x + r.width && t.y > r.pos.y && t.y < r.pos.y + r.height;
  }
  __name(_t, "_t");
  n(_t, "testRectPoint");
  function qs(r, t) {
    let h = t.sub(r.p1), c = r.p2.sub(r.p1);
    if (Math.abs(h.cross(c)) > Number.EPSILON)
      return false;
    let f = h.dot(c) / c.dot(c);
    return f >= 0 && f <= 1;
  }
  __name(qs, "qs");
  n(qs, "testLinePoint");
  function si(r, t) {
    let h = r.p2.sub(r.p1), c = h.dot(h), f = r.p1.sub(t.center), v = 2 * h.dot(f), B = f.dot(f) - t.radius * t.radius, C = v * v - 4 * c * B;
    if (c <= Number.EPSILON || C < 0)
      return false;
    if (C == 0) {
      let Y = -v / (2 * c);
      if (Y >= 0 && Y <= 1)
        return true;
    } else {
      let Y = (-v + Math.sqrt(C)) / (2 * c), A = (-v - Math.sqrt(C)) / (2 * c);
      if (Y >= 0 && Y <= 1 || A >= 0 && A <= 1)
        return true;
    }
    return ni(t, r.p1);
  }
  __name(si, "si");
  n(si, "testLineCircle");
  function ni(r, t) {
    return r.center.sdist(t) < r.radius * r.radius;
  }
  __name(ni, "ni");
  n(ni, "testCirclePoint");
  function Hs(r, t) {
    let h = t.pts[t.pts.length - 1];
    for (let c of t.pts) {
      if (si(new xt(h, c), r))
        return true;
      h = c;
    }
    return ni(r, t.pts[0]) ? true : oi(t, r.center);
  }
  __name(Hs, "Hs");
  n(Hs, "testCirclePolygon");
  function oi(r, t) {
    let h = false, c = r.pts;
    for (let f = 0, v = c.length - 1; f < c.length; v = f++)
      c[f].y > t.y != c[v].y > t.y && t.x < (c[v].x - c[f].x) * (t.y - c[f].y) / (c[v].y - c[f].y) + c[f].x && (h = !h);
    return h;
  }
  __name(oi, "oi");
  n(oi, "testPolygonPoint");
  var _a6;
  var xt = (/* @__PURE__ */ __name(_a6 = class {
    constructor(t, h) {
      __publicField(this, "p1");
      __publicField(this, "p2");
      this.p1 = t.clone(), this.p2 = h.clone();
    }
    transform(t) {
      return new _a6(t.multVec2(this.p1), t.multVec2(this.p2));
    }
    bbox() {
      return Ve.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new _a6(this.p1, this.p2);
    }
  }, "Wr"), (() => {
    n(_a6, "Line");
  })(), _a6);
  var _a7;
  var Ve = (/* @__PURE__ */ __name(_a7 = class {
    constructor(t, h, c) {
      __publicField(this, "pos");
      __publicField(this, "width");
      __publicField(this, "height");
      this.pos = t.clone(), this.width = h, this.height = c;
    }
    static fromPoints(t, h) {
      return new _a7(t.clone(), h.x - t.x, h.y - t.y);
    }
    center() {
      return new E(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(t) {
      return new zt(this.points().map((h) => t.multVec2(h)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new _a7(this.pos.clone(), this.width, this.height);
    }
    distToPoint(t) {
      return Math.sqrt(this.sdistToPoint(t));
    }
    sdistToPoint(t) {
      let h = this.pos, c = this.pos.add(this.width, this.height), f = Math.max(h.x - t.x, 0, t.x - c.x), v = Math.max(h.y - t.y, 0, t.y - c.y);
      return f * f + v * v;
    }
  }, "Zr"), (() => {
    n(_a7, "Rect");
  })(), _a7);
  var _a8;
  var vs = (/* @__PURE__ */ __name(_a8 = class {
    constructor(t, h) {
      __publicField(this, "center");
      __publicField(this, "radius");
      this.center = t.clone(), this.radius = h;
    }
    transform(t) {
      return new Dn(this.center, this.radius, this.radius).transform(t);
    }
    bbox() {
      return Ve.fromPoints(this.center.sub(M(this.radius)), this.center.add(M(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new _a8(this.center, this.radius);
    }
  }, "Ys"), (() => {
    n(_a8, "Circle");
  })(), _a8);
  var _a9;
  var Dn = (/* @__PURE__ */ __name(_a9 = class {
    constructor(t, h, c) {
      __publicField(this, "center");
      __publicField(this, "radiusX");
      __publicField(this, "radiusY");
      this.center = t.clone(), this.radiusX = h, this.radiusY = c;
    }
    transform(t) {
      return new _a9(t.multVec2(this.center), t.m[0] * this.radiusX, t.m[5] * this.radiusY);
    }
    bbox() {
      return Ve.fromPoints(this.center.sub(M(this.radiusX, this.radiusY)), this.center.add(M(this.radiusX, this.radiusY)));
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new _a9(this.center, this.radiusX, this.radiusY);
    }
  }, "_r"), (() => {
    n(_a9, "Ellipse");
  })(), _a9);
  var _a10;
  var zt = (/* @__PURE__ */ __name(_a10 = class {
    constructor(t) {
      __publicField(this, "pts");
      if (t.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = t;
    }
    transform(t) {
      return new _a10(this.pts.map((h) => t.multVec2(h)));
    }
    bbox() {
      let t = M(Number.MAX_VALUE), h = M(-Number.MAX_VALUE);
      for (let c of this.pts)
        t.x = Math.min(t.x, c.x), h.x = Math.max(h.x, c.x), t.y = Math.min(t.y, c.y), h.y = Math.max(h.y, c.y);
      return Ve.fromPoints(t, h);
    }
    area() {
      let t = 0, h = this.pts.length;
      for (let c = 0; c < h; c++) {
        let f = this.pts[c], v = this.pts[(c + 1) % h];
        t += f.x * v.y * 0.5, t -= v.x * f.y * 0.5;
      }
      return Math.abs(t);
    }
    clone() {
      return new _a10(this.pts.map((t) => t.clone()));
    }
  }, "$r"), (() => {
    n(_a10, "Polygon");
  })(), _a10);
  function Ks(r, t) {
    let h = Number.MAX_VALUE, c = M(0);
    for (let f of [r, t])
      for (let v = 0; v < f.pts.length; v++) {
        let B = f.pts[v], C = f.pts[(v + 1) % f.pts.length].sub(B).normal().unit(), Y = Number.MAX_VALUE, A = -Number.MAX_VALUE;
        for (let y = 0; y < r.pts.length; y++) {
          let X = r.pts[y].dot(C);
          Y = Math.min(Y, X), A = Math.max(A, X);
        }
        let te = Number.MAX_VALUE, S = -Number.MAX_VALUE;
        for (let y = 0; y < t.pts.length; y++) {
          let X = t.pts[y].dot(C);
          te = Math.min(te, X), S = Math.max(S, X);
        }
        let K = Math.min(A, S) - Math.max(Y, te);
        if (K < 0)
          return null;
        if (K < Math.abs(h)) {
          let y = S - Y, X = te - A;
          h = Math.abs(y) < Math.abs(X) ? y : X, c = C.scale(h);
        }
      }
    return c;
  }
  __name(Ks, "Ks");
  n(Ks, "sat");
  var _a11;
  var js = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a11 = class extends Map {
    constructor(...r) {
      super(...r);
      __publicField(this, "lastID");
      this.lastID = 0;
    }
    push(r) {
      let t = this.lastID;
      return this.set(t, r), this.lastID++, t;
    }
    pushd(r) {
      let t = this.push(r);
      return () => this.delete(t);
    }
  }, "_this"), (() => {
    n(_a11, "Registry");
  })(), _a11), "js");
  var _a12;
  var vt = (/* @__PURE__ */ __name(_a12 = class {
    constructor(t) {
      __publicField(this, "paused", false);
      __publicField(this, "cancel");
      this.cancel = t;
    }
    static join(t) {
      let h = new _a12(() => t.forEach((c) => c.cancel()));
      return Object.defineProperty(h, "paused", { get: () => t[0].paused, set: (c) => t.forEach((f) => f.paused = c) }), h.paused = false, h;
    }
  }, "Qs"), (() => {
    n(_a12, "EventController");
  })(), _a12);
  var _a13;
  var Ie = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a13 = class {
    constructor() {
      __publicField(this, "handlers", new js());
    }
    add(r) {
      let t = this.handlers.pushd((...c) => {
        h.paused || r(...c);
      }), h = new vt(t);
      return h;
    }
    addOnce(r) {
      let t = this.add((...h) => {
        t.cancel(), r(...h);
      });
      return t;
    }
    next() {
      return new Promise((r) => this.addOnce(r));
    }
    trigger(...r) {
      this.handlers.forEach((t) => t(...r));
    }
    numListeners() {
      return this.handlers.size;
    }
    clear() {
      this.handlers.clear();
    }
  }, "_this"), (() => {
    n(_a13, "Event");
  })(), _a13), "Ie");
  var _a14;
  var Jt = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a14 = class {
    constructor() {
      __publicField(this, "handlers", {});
    }
    on(r, t) {
      return this.handlers[r] || (this.handlers[r] = new Ie()), this.handlers[r].add(t);
    }
    onOnce(r, t) {
      let h = this.on(r, (...c) => {
        h.cancel(), t(...c);
      });
      return h;
    }
    next(r) {
      return new Promise((t) => {
        this.onOnce(r, (...h) => t(h[0]));
      });
    }
    trigger(r, ...t) {
      this.handlers[r] && this.handlers[r].trigger(...t);
    }
    remove(r) {
      delete this.handlers[r];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(r) {
      var _a26, _b;
      return (_b = (_a26 = this.handlers[r]) == null ? void 0 : _a26.numListeners()) != null ? _b : 0;
    }
  }, "_this"), (() => {
    n(_a14, "EventHandler");
  })(), _a14), "Jt");
  function Vr(r, t) {
    if (r === t)
      return true;
    let h = typeof r, c = typeof t;
    if (h !== c)
      return false;
    if (h === "object" && c === "object" && r !== null && t !== null) {
      if (Array.isArray(r) !== Array.isArray(t))
        return false;
      let f = Object.keys(r), v = Object.keys(t);
      if (f.length !== v.length)
        return false;
      for (let B of f) {
        let C = r[B], Y = t[B];
        if (!Vr(C, Y))
          return false;
      }
      return true;
    }
    return false;
  }
  __name(Vr, "Vr");
  n(Vr, "deepEq");
  function zs(r) {
    let t = window.atob(r), h = t.length, c = new Uint8Array(h);
    for (let f = 0; f < h; f++)
      c[f] = t.charCodeAt(f);
    return c.buffer;
  }
  __name(zs, "zs");
  n(zs, "base64ToArrayBuffer");
  function Js(r) {
    return zs(r.split(",")[1]);
  }
  __name(Js, "Js");
  n(Js, "dataURLToArrayBuffer");
  function vr(r, t) {
    let h = document.createElement("a");
    h.href = t, h.download = r, h.click();
  }
  __name(vr, "vr");
  n(vr, "download");
  function ai(r, t) {
    vr(r, "data:text/plain;charset=utf-8," + t);
  }
  __name(ai, "ai");
  n(ai, "downloadText");
  function Xs(r, t) {
    ai(r, JSON.stringify(t));
  }
  __name(Xs, "Xs");
  n(Xs, "downloadJSON");
  function ei(r, t) {
    let h = URL.createObjectURL(t);
    vr(r, h), URL.revokeObjectURL(h);
  }
  __name(ei, "ei");
  n(ei, "downloadBlob");
  var ys = n((r) => r.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var Cn = n((r) => r.split(".").slice(0, -1).join("."), "getFileName");
  function Re(r, t) {
    return (...h) => {
      let c = h.length;
      if (c === r.length)
        return r(...h);
      if (c === t.length)
        return t(...h);
    };
  }
  __name(Re, "Re");
  n(Re, "overload2");
  var kn = (() => {
    let r = 0;
    return () => r++;
  })();
  var Nn = n((r) => r instanceof Error ? r.message : String(r), "getErrorMessage");
  var _a15;
  var Un = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a15 = class {
    constructor(r = (t, h) => t < h) {
      __publicField(this, "_items");
      __publicField(this, "_compareFn");
      this._compareFn = r, this._items = [];
    }
    insert(r) {
      this._items.push(r), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0)
        return null;
      let r = this._items[0], t = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = t, this.moveDown(0)), r;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(r) {
      for (; r > 0; ) {
        let t = Math.floor((r - 1) / 2);
        if (!this._compareFn(this._items[r], this._items[t]) && this._items[r] >= this._items[t])
          break;
        this.swap(r, t), r = t;
      }
    }
    moveDown(r) {
      for (; r < Math.floor(this._items.length / 2); ) {
        let t = 2 * r + 1;
        if (t < this._items.length - 1 && !this._compareFn(this._items[t], this._items[t + 1]) && ++t, this._compareFn(this._items[r], this._items[t]))
          break;
        this.swap(r, t), r = t;
      }
    }
    swap(r, t) {
      [this._items[r], this._items[t]] = [this._items[t], this._items[r]];
    }
    get length() {
      return this._items.length;
    }
  }, "_this"), (() => {
    n(_a15, "BinaryHeap");
  })(), _a15), "Un");
  var Ln = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
  function Ws(r) {
    if (typeof r != "string")
      throw new TypeError("string cannot be undefined or null");
    let t = [], h = 0, c = 0;
    for (; h < r.length; ) {
      if (c += Zs(h + c, r), nn(r[h + c]) && c++, tn(r[h + c]) && c++, rn(r[h + c]) && c++, on(r[h + c])) {
        c++;
        continue;
      }
      t.push(r.substring(h, h + c)), h += c, c = 0;
    }
    return t;
  }
  __name(Ws, "Ws");
  n(Ws, "runes");
  function Zs(r, t) {
    let h = t[r];
    if (!_s(h) || r === t.length - 1)
      return 1;
    let c = h + t[r + 1], f = t.substring(r + 2, r + 5);
    return ti(c) && ti(f) ? 4 : $s(c) && sn(f) ? t.slice(r).indexOf(String.fromCodePoint(917631)) + 2 : en(f) ? 4 : 2;
  }
  __name(Zs, "Zs");
  n(Zs, "nextUnits");
  function _s(r) {
    return r && Ze(r[0].charCodeAt(0), 55296, 56319);
  }
  __name(_s, "_s");
  n(_s, "isFirstOfSurrogatePair");
  function ti(r) {
    return Ze(yr(r), 127462, 127487);
  }
  __name(ti, "ti");
  n(ti, "isRegionalIndicator");
  function $s(r) {
    return Ze(yr(r), 127988, 127988);
  }
  __name($s, "$s");
  n($s, "isSubdivisionFlag");
  function en(r) {
    return Ze(yr(r), 127995, 127999);
  }
  __name(en, "en");
  n(en, "isFitzpatrickModifier");
  function tn(r) {
    return typeof r == "string" && Ze(r.charCodeAt(0), 65024, 65039);
  }
  __name(tn, "tn");
  n(tn, "isVariationSelector");
  function rn(r) {
    return typeof r == "string" && Ze(r.charCodeAt(0), 8400, 8447);
  }
  __name(rn, "rn");
  n(rn, "isDiacriticalMark");
  function sn(r) {
    let t = r.codePointAt(0);
    return typeof r == "string" && typeof t == "number" && Ze(t, 917504, 917631);
  }
  __name(sn, "sn");
  n(sn, "isSupplementarySpecialpurposePlane");
  function nn(r) {
    return typeof r == "string" && Ln.includes(r.charCodeAt(0));
  }
  __name(nn, "nn");
  n(nn, "isGrapheme");
  function on(r) {
    return typeof r == "string" && r.charCodeAt(0) === 8205;
  }
  __name(on, "on");
  n(on, "isZeroWidthJoiner");
  function yr(r) {
    let t = r.charCodeAt(0) - 55296, h = r.charCodeAt(1) - 56320;
    return (t << 10) + h + 65536;
  }
  __name(yr, "yr");
  n(yr, "codePointFromSurrogatePair");
  function Ze(r, t, h) {
    return r >= t && r <= h;
  }
  __name(Ze, "Ze");
  n(Ze, "betweenInclusive");
  var xs = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home", 17: "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 9: "select", 10: "lstick", 16: "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 9: "start", 10: "lstick", 16: "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home", 17: "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { 0: "south", 1: "east", 2: "west", 3: "north", 4: "lshoulder", 5: "rshoulder", 6: "ltrigger", 7: "rtrigger", 8: "select", 9: "start", 10: "lstick", 11: "rstick", 12: "dpad-up", 13: "dpad-down", 14: "dpad-left", 15: "dpad-right", 16: "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var _a16;
  var wr = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a16 = class {
    constructor() {
      __publicField(this, "pressed", /* @__PURE__ */ new Set([]));
      __publicField(this, "pressedRepeat", /* @__PURE__ */ new Set([]));
      __publicField(this, "released", /* @__PURE__ */ new Set([]));
      __publicField(this, "down", /* @__PURE__ */ new Set([]));
    }
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(r) {
      this.pressed.add(r), this.pressedRepeat.add(r), this.down.add(r);
    }
    pressRepeat(r) {
      this.pressedRepeat.add(r);
    }
    release(r) {
      this.down.delete(r), this.pressed.delete(r), this.released.add(r);
    }
  }, "_this"), (() => {
    n(_a16, "ButtonState");
  })(), _a16), "wr");
  var _a17;
  var Gn = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a17 = class {
    constructor() {
      __publicField(this, "buttonState", new wr());
      __publicField(this, "stickState", /* @__PURE__ */ new Map());
    }
  }, "_this"), (() => {
    n(_a17, "GamepadState");
  })(), _a17), "Gn");
  var _a18;
  var On = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a18 = class {
    constructor() {
      __publicField(this, "dts", []);
      __publicField(this, "timer", 0);
      __publicField(this, "fps", 0);
    }
    tick(r) {
      this.dts.push(r), this.timer += r, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((t, h) => t + h) / this.dts.length)), this.dts = []);
    }
  }, "_this"), (() => {
    n(_a18, "FPSCounter");
  })(), _a18), "On");
  var qn = n((r) => {
    if (!r.canvas)
      throw new Error("Please provide a canvas");
    let t = { canvas: r.canvas, loopID: null, stopped: false, dt: 0, time: 0, realTime: 0, fpsCounter: new On(), timeScale: 1, skipTime: false, numFrames: 0, mousePos: new E(0), mouseDeltaPos: new E(0), keyState: new wr(), mouseState: new wr(), mergedGamepadState: new Gn(), gamepadStates: /* @__PURE__ */ new Map(), gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: r.canvas.offsetWidth, lastHeight: r.canvas.offsetHeight, events: new Jt() };
    function h() {
      return t.dt * t.timeScale;
    }
    __name(h, "h");
    n(h, "dt");
    function c() {
      return t.time;
    }
    __name(c, "c");
    n(c, "time");
    function f() {
      return t.fpsCounter.fps;
    }
    __name(f, "f");
    n(f, "fps");
    function v() {
      return t.numFrames;
    }
    __name(v, "v");
    n(v, "numFrames");
    function B() {
      return t.canvas.toDataURL();
    }
    __name(B, "B");
    n(B, "screenshot");
    function C(d) {
      t.canvas.style.cursor = d;
    }
    __name(C, "C");
    n(C, "setCursor");
    function Y() {
      return t.canvas.style.cursor;
    }
    __name(Y, "Y");
    n(Y, "getCursor");
    function A(d) {
      if (d)
        try {
          let V = t.canvas.requestPointerLock();
          V.catch && V.catch((R) => console.error(R));
        } catch (V) {
          console.error(V);
        }
      else
        document.exitPointerLock();
    }
    __name(A, "A");
    n(A, "setCursorLocked");
    function te() {
      return !!document.pointerLockElement;
    }
    __name(te, "te");
    n(te, "isCursorLocked");
    function S(d) {
      d.requestFullscreen ? d.requestFullscreen() : d.webkitRequestFullscreen && d.webkitRequestFullscreen();
    }
    __name(S, "S");
    n(S, "enterFullscreen");
    function K() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    __name(K, "K");
    n(K, "exitFullscreen");
    function y() {
      return document.fullscreenElement || document.webkitFullscreenElement;
    }
    __name(y, "y");
    n(y, "getFullscreenElement");
    function X(d = true) {
      d ? S(t.canvas) : K();
    }
    __name(X, "X");
    n(X, "setFullscreen");
    function le() {
      return !!y();
    }
    __name(le, "le");
    n(le, "isFullscreen");
    function ee() {
      t.stopped = true;
      for (let d in re)
        t.canvas.removeEventListener(d, re[d]);
      for (let d in ae)
        document.removeEventListener(d, ae[d]);
      for (let d in se)
        window.removeEventListener(d, se[d]);
      me.disconnect();
    }
    __name(ee, "ee");
    n(ee, "quit");
    function U(d) {
      t.loopID !== null && cancelAnimationFrame(t.loopID);
      let V = 0, R = n((q) => {
        if (t.stopped)
          return;
        if (document.visibilityState !== "visible") {
          t.loopID = requestAnimationFrame(R);
          return;
        }
        let j = q / 1e3, ue = j - t.realTime, Ee = r.maxFPS ? 1 / r.maxFPS : 0;
        t.realTime = j, V += ue, V > Ee && (t.skipTime || (t.dt = V, t.time += h(), t.fpsCounter.tick(t.dt)), V = 0, t.skipTime = false, t.numFrames++, rt(), d(), Nt()), t.loopID = requestAnimationFrame(R);
      }, "frame");
      R(0);
    }
    __name(U, "U");
    n(U, "run");
    function de() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    __name(de, "de");
    n(de, "isTouchscreen");
    function b() {
      return t.mousePos.clone();
    }
    __name(b, "b");
    n(b, "mousePos");
    function Me() {
      return t.mouseDeltaPos.clone();
    }
    __name(Me, "Me");
    n(Me, "mouseDeltaPos");
    function H(d = "left") {
      return t.mouseState.pressed.has(d);
    }
    __name(H, "H");
    n(H, "isMousePressed");
    function xe(d = "left") {
      return t.mouseState.down.has(d);
    }
    __name(xe, "xe");
    n(xe, "isMouseDown");
    function ge(d = "left") {
      return t.mouseState.released.has(d);
    }
    __name(ge, "ge");
    n(ge, "isMouseReleased");
    function ve() {
      return t.isMouseMoved;
    }
    __name(ve, "ve");
    n(ve, "isMouseMoved");
    function Ke(d) {
      return d === void 0 ? t.keyState.pressed.size > 0 : t.keyState.pressed.has(d);
    }
    __name(Ke, "Ke");
    n(Ke, "isKeyPressed");
    function St(d) {
      return d === void 0 ? t.keyState.pressedRepeat.size > 0 : t.keyState.pressedRepeat.has(d);
    }
    __name(St, "St");
    n(St, "isKeyPressedRepeat");
    function at(d) {
      return d === void 0 ? t.keyState.down.size > 0 : t.keyState.down.has(d);
    }
    __name(at, "at");
    n(at, "isKeyDown");
    function ht(d) {
      return d === void 0 ? t.keyState.released.size > 0 : t.keyState.released.has(d);
    }
    __name(ht, "ht");
    n(ht, "isKeyReleased");
    function lt(d) {
      return d === void 0 ? t.mergedGamepadState.buttonState.pressed.size > 0 : t.mergedGamepadState.buttonState.pressed.has(d);
    }
    __name(lt, "lt");
    n(lt, "isGamepadButtonPressed");
    function Ue(d) {
      return d === void 0 ? t.mergedGamepadState.buttonState.down.size > 0 : t.mergedGamepadState.buttonState.down.has(d);
    }
    __name(Ue, "Ue");
    n(Ue, "isGamepadButtonDown");
    function bt(d) {
      return d === void 0 ? t.mergedGamepadState.buttonState.released.size > 0 : t.mergedGamepadState.buttonState.released.has(d);
    }
    __name(bt, "bt");
    n(bt, "isGamepadButtonReleased");
    function Rt(d) {
      return t.events.on("resize", d);
    }
    __name(Rt, "Rt");
    n(Rt, "onResize");
    let $t = Re((d) => t.events.on("keyDown", d), (d, V) => t.events.on("keyDown", (R) => R === d && V(d))), er = Re((d) => t.events.on("keyPress", d), (d, V) => t.events.on("keyPress", (R) => R === d && V(d))), tr = Re((d) => t.events.on("keyPressRepeat", d), (d, V) => t.events.on("keyPressRepeat", (R) => R === d && V(d))), rr = Re((d) => t.events.on("keyRelease", d), (d, V) => t.events.on("keyRelease", (R) => R === d && V(d))), Mt = Re((d) => t.events.on("mouseDown", (V) => d(V)), (d, V) => t.events.on("mouseDown", (R) => R === d && V(R))), Pt = Re((d) => t.events.on("mousePress", (V) => d(V)), (d, V) => t.events.on("mousePress", (R) => R === d && V(R))), Bt = Re((d) => t.events.on("mouseRelease", (V) => d(V)), (d, V) => t.events.on("mouseRelease", (R) => R === d && V(R)));
    function ut(d) {
      return t.events.on("mouseMove", () => d(b(), Me()));
    }
    __name(ut, "ut");
    n(ut, "onMouseMove");
    function dt2(d) {
      return t.events.on("charInput", d);
    }
    __name(dt2, "dt");
    n(dt2, "onCharInput");
    function Tt(d) {
      return t.events.on("touchStart", d);
    }
    __name(Tt, "Tt");
    n(Tt, "onTouchStart");
    function _e(d) {
      return t.events.on("touchMove", d);
    }
    __name(_e, "_e");
    n(_e, "onTouchMove");
    function Ft(d) {
      return t.events.on("touchEnd", d);
    }
    __name(Ft, "Ft");
    n(Ft, "onTouchEnd");
    function It(d) {
      return t.events.on("scroll", d);
    }
    __name(It, "It");
    n(It, "onScroll");
    function ct(d) {
      return t.events.on("hide", d);
    }
    __name(ct, "ct");
    n(ct, "onHide");
    function Dt(d) {
      return t.events.on("show", d);
    }
    __name(Dt, "Dt");
    n(Dt, "onShow");
    function ft(d, V) {
      if (typeof d == "function")
        return t.events.on("gamepadButtonDown", d);
      if (typeof d == "string" && typeof V == "function")
        return t.events.on("gamepadButtonDown", (R) => R === d && V(d));
    }
    __name(ft, "ft");
    n(ft, "onGamepadButtonDown");
    function pt(d, V) {
      if (typeof d == "function")
        return t.events.on("gamepadButtonPress", d);
      if (typeof d == "string" && typeof V == "function")
        return t.events.on("gamepadButtonPress", (R) => R === d && V(d));
    }
    __name(pt, "pt");
    n(pt, "onGamepadButtonPress");
    function Ct(d, V) {
      if (typeof d == "function")
        return t.events.on("gamepadButtonRelease", d);
      if (typeof d == "string" && typeof V == "function")
        return t.events.on("gamepadButtonRelease", (R) => R === d && V(d));
    }
    __name(Ct, "Ct");
    n(Ct, "onGamepadButtonRelease");
    function $e(d, V) {
      return t.events.on("gamepadStick", (R, q) => R === d && V(q));
    }
    __name($e, "$e");
    n($e, "onGamepadStick");
    function kt(d) {
      t.events.on("gamepadConnect", d);
    }
    __name(kt, "kt");
    n(kt, "onGamepadConnect");
    function et(d) {
      t.events.on("gamepadDisconnect", d);
    }
    __name(et, "et");
    n(et, "onGamepadDisconnect");
    function Pe(d) {
      return t.mergedGamepadState.stickState.get(d) || new E(0);
    }
    __name(Pe, "Pe");
    n(Pe, "getGamepadStick");
    function tt() {
      return [...t.charInputted];
    }
    __name(tt, "tt");
    n(tt, "charInputted");
    function gt() {
      return [...t.gamepads];
    }
    __name(gt, "gt");
    n(gt, "getGamepads");
    function rt() {
      t.events.trigger("input"), t.keyState.down.forEach((d) => t.events.trigger("keyDown", d)), t.mouseState.down.forEach((d) => t.events.trigger("mouseDown", d)), De();
    }
    __name(rt, "rt");
    n(rt, "processInput");
    function Nt() {
      t.keyState.update(), t.mouseState.update(), t.mergedGamepadState.buttonState.update(), t.mergedGamepadState.stickState.forEach((d, V) => {
        t.mergedGamepadState.stickState.set(V, new E(0));
      }), t.charInputted = [], t.isMouseMoved = false, t.gamepadStates.forEach((d) => {
        d.buttonState.update(), d.stickState.forEach((V, R) => {
          d.stickState.set(R, new E(0));
        });
      });
    }
    __name(Nt, "Nt");
    n(Nt, "resetInput");
    function mt(d) {
      let V = { index: d.index, isPressed: (R) => t.gamepadStates.get(d.index).buttonState.pressed.has(R), isDown: (R) => t.gamepadStates.get(d.index).buttonState.down.has(R), isReleased: (R) => t.gamepadStates.get(d.index).buttonState.released.has(R), getStick: (R) => t.gamepadStates.get(d.index).stickState.get(R) };
      return t.gamepads.push(V), t.gamepadStates.set(d.index, { buttonState: new wr(), stickState: /* @__PURE__ */ new Map([["left", new E(0)], ["right", new E(0)]]) }), V;
    }
    __name(mt, "mt");
    n(mt, "registerGamepad");
    function _(d) {
      t.gamepads = t.gamepads.filter((V) => V.index !== d.index), t.gamepadStates.delete(d.index);
    }
    __name(_, "_");
    n(_, "removeGamepad");
    function De() {
      var _a26, _b, _c;
      for (let d of navigator.getGamepads())
        d && !t.gamepadStates.has(d.index) && mt(d);
      for (let d of t.gamepads) {
        let V = navigator.getGamepads()[d.index], R = (_c = (_b = ((_a26 = r.gamepads) != null ? _a26 : {})[V.id]) != null ? _b : xs[V.id]) != null ? _c : xs.default, q = t.gamepadStates.get(d.index);
        for (let j = 0; j < V.buttons.length; j++)
          V.buttons[j].pressed ? (q.buttonState.down.has(R.buttons[j]) || (t.mergedGamepadState.buttonState.press(R.buttons[j]), q.buttonState.press(R.buttons[j]), t.events.trigger("gamepadButtonPress", R.buttons[j])), t.events.trigger("gamepadButtonDown", R.buttons[j])) : q.buttonState.down.has(R.buttons[j]) && (t.mergedGamepadState.buttonState.release(R.buttons[j]), q.buttonState.release(R.buttons[j]), t.events.trigger("gamepadButtonRelease", R.buttons[j]));
        for (let j in R.sticks) {
          let ue = R.sticks[j], Ee = new E(V.axes[ue.x], V.axes[ue.y]);
          q.stickState.set(j, Ee), t.mergedGamepadState.stickState.set(j, Ee), t.events.trigger("gamepadStick", j, Ee);
        }
      }
    }
    __name(De, "De");
    n(De, "processGamepad");
    let re = {}, ae = {}, se = {}, Ce = r.pixelDensity || window.devicePixelRatio || 1;
    re.mousemove = (d) => {
      let V = new E(d.offsetX, d.offsetY), R = new E(d.movementX, d.movementY);
      if (le()) {
        let q = t.canvas.width / Ce, j = t.canvas.height / Ce, ue = window.innerWidth, Ee = window.innerHeight, Ut = ue / Ee, Lt = q / j;
        if (Ut > Lt) {
          let Te = Ee / j, Se = (ue - q * Te) / 2;
          V.x = We(d.offsetX - Se, 0, q * Te, 0, q), V.y = We(d.offsetY, 0, j * Te, 0, j);
        } else {
          let Te = ue / q, Se = (Ee - j * Te) / 2;
          V.x = We(d.offsetX, 0, q * Te, 0, q), V.y = We(d.offsetY - Se, 0, j * Te, 0, j);
        }
      }
      t.events.onOnce("input", () => {
        t.isMouseMoved = true, t.mousePos = V, t.mouseDeltaPos = R, t.events.trigger("mouseMove");
      });
    };
    let je = ["left", "middle", "right", "back", "forward"];
    re.mousedown = (d) => {
      t.events.onOnce("input", () => {
        let V = je[d.button];
        V && (t.mouseState.press(V), t.events.trigger("mousePress", V));
      });
    }, re.mouseup = (d) => {
      t.events.onOnce("input", () => {
        let V = je[d.button];
        V && (t.mouseState.release(V), t.events.trigger("mouseRelease", V));
      });
    };
    let ir = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), Le = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
    re.keydown = (d) => {
      ir.has(d.key) && d.preventDefault(), t.events.onOnce("input", () => {
        let V = Le[d.key] || d.key.toLowerCase();
        V.length === 1 ? (t.events.trigger("charInput", V), t.charInputted.push(V)) : V === "space" && (t.events.trigger("charInput", " "), t.charInputted.push(" ")), d.repeat ? (t.keyState.pressRepeat(V), t.events.trigger("keyPressRepeat", V)) : (t.keyState.press(V), t.events.trigger("keyPressRepeat", V), t.events.trigger("keyPress", V));
      });
    }, re.keyup = (d) => {
      t.events.onOnce("input", () => {
        let V = Le[d.key] || d.key.toLowerCase();
        t.keyState.release(V), t.events.trigger("keyRelease", V);
      });
    }, re.touchstart = (d) => {
      d.preventDefault(), t.events.onOnce("input", () => {
        let V = [...d.changedTouches], R = t.canvas.getBoundingClientRect();
        r.touchToMouse !== false && (t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y), t.mouseState.press("left"), t.events.trigger("mousePress", "left")), V.forEach((q) => {
          t.events.trigger("touchStart", new E(q.clientX - R.x, q.clientY - R.y), q);
        });
      });
    }, re.touchmove = (d) => {
      d.preventDefault(), t.events.onOnce("input", () => {
        let V = [...d.changedTouches], R = t.canvas.getBoundingClientRect();
        r.touchToMouse !== false && (t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y), t.events.trigger("mouseMove")), V.forEach((q) => {
          t.events.trigger("touchMove", new E(q.clientX - R.x, q.clientY - R.y), q);
        });
      });
    }, re.touchend = (d) => {
      t.events.onOnce("input", () => {
        let V = [...d.changedTouches], R = t.canvas.getBoundingClientRect();
        r.touchToMouse !== false && (t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y), t.mouseState.release("left"), t.events.trigger("mouseRelease", "left")), V.forEach((q) => {
          t.events.trigger("touchEnd", new E(q.clientX - R.x, q.clientY - R.y), q);
        });
      });
    }, re.touchcancel = (d) => {
      t.events.onOnce("input", () => {
        let V = [...d.changedTouches], R = t.canvas.getBoundingClientRect();
        r.touchToMouse !== false && (t.mousePos = new E(V[0].clientX - R.x, V[0].clientY - R.y), t.mouseState.release("left"), t.events.trigger("mouseRelease", "left")), V.forEach((q) => {
          t.events.trigger("touchEnd", new E(q.clientX - R.x, q.clientY - R.y), q);
        });
      });
    }, re.wheel = (d) => {
      d.preventDefault(), t.events.onOnce("input", () => {
        t.events.trigger("scroll", new E(d.deltaX, d.deltaY));
      });
    }, re.contextmenu = (d) => d.preventDefault(), ae.visibilitychange = () => {
      document.visibilityState === "visible" ? (t.skipTime = true, t.events.trigger("show")) : t.events.trigger("hide");
    }, se.gamepadconnected = (d) => {
      let V = mt(d.gamepad);
      t.events.onOnce("input", () => {
        t.events.trigger("gamepadConnect", V);
      });
    }, se.gamepaddisconnected = (d) => {
      let V = gt().filter((R) => R.index === d.gamepad.index)[0];
      _(d.gamepad), t.events.onOnce("input", () => {
        t.events.trigger("gamepadDisconnect", V);
      });
    };
    for (let d in re)
      t.canvas.addEventListener(d, re[d]);
    for (let d in ae)
      document.addEventListener(d, ae[d]);
    for (let d in se)
      window.addEventListener(d, se[d]);
    let me = new ResizeObserver((d) => {
      for (let V of d)
        if (V.target === t.canvas) {
          if (t.lastWidth === t.canvas.offsetWidth && t.lastHeight === t.canvas.offsetHeight)
            return;
          t.lastWidth = t.canvas.offsetWidth, t.lastHeight = t.canvas.offsetHeight, t.events.onOnce("input", () => {
            t.events.trigger("resize");
          });
        }
    });
    return me.observe(t.canvas), { dt: h, time: c, run: U, canvas: t.canvas, fps: f, numFrames: v, quit: ee, setFullscreen: X, isFullscreen: le, setCursor: C, screenshot: B, getGamepads: gt, getCursor: Y, setCursorLocked: A, isCursorLocked: te, isTouchscreen: de, mousePos: b, mouseDeltaPos: Me, isKeyDown: at, isKeyPressed: Ke, isKeyPressedRepeat: St, isKeyReleased: ht, isMouseDown: xe, isMousePressed: H, isMouseReleased: ge, isMouseMoved: ve, isGamepadButtonPressed: lt, isGamepadButtonDown: Ue, isGamepadButtonReleased: bt, getGamepadStick: Pe, charInputted: tt, onResize: Rt, onKeyDown: $t, onKeyPress: er, onKeyPressRepeat: tr, onKeyRelease: rr, onMouseDown: Mt, onMousePress: Pt, onMouseRelease: Bt, onMouseMove: ut, onCharInput: dt2, onTouchStart: Tt, onTouchMove: _e, onTouchEnd: Ft, onScroll: It, onHide: ct, onShow: Dt, onGamepadButtonDown: ft, onGamepadButtonPress: pt, onGamepadButtonRelease: Ct, onGamepadStick: $e, onGamepadConnect: kt, onGamepadDisconnect: et, events: t.events };
  }, "default");
  var _a19;
  var ot = (/* @__PURE__ */ __name(_a19 = class {
    constructor(t, h, c, f = {}) {
      __publicField(this, "ctx");
      __publicField(this, "src", null);
      __publicField(this, "glTex");
      __publicField(this, "width");
      __publicField(this, "height");
      var _a26, _b, _c;
      this.ctx = t;
      let v = t.gl;
      this.glTex = t.gl.createTexture(), t.onDestroy(() => this.free()), this.width = h, this.height = c;
      let B = (_b = { linear: v.LINEAR, nearest: v.NEAREST }[(_a26 = f.filter) != null ? _a26 : t.opts.texFilter]) != null ? _b : v.NEAREST, C = (_c = { repeat: v.REPEAT, clampToEadge: v.CLAMP_TO_EDGE }[f.wrap]) != null ? _c : v.CLAMP_TO_EDGE;
      this.bind(), h && c && v.texImage2D(v.TEXTURE_2D, 0, v.RGBA, h, c, 0, v.RGBA, v.UNSIGNED_BYTE, null), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, B), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, B), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_S, C), v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_T, C), this.unbind();
    }
    static fromImage(t, h, c = {}) {
      let f = new _a19(t, h.width, h.height, c);
      return f.update(h), f.src = h, f;
    }
    update(t, h = 0, c = 0) {
      let f = this.ctx.gl;
      this.bind(), f.texSubImage2D(f.TEXTURE_2D, 0, h, c, f.RGBA, f.UNSIGNED_BYTE, t), this.unbind();
    }
    bind() {
      this.ctx.pushTexture2D(this.glTex);
    }
    unbind() {
      this.ctx.popTexture2D();
    }
    free() {
      this.ctx.gl.deleteTexture(this.glTex);
    }
  }, "an"), (() => {
    n(_a19, "Texture");
  })(), _a19);
  var _a20;
  var ur = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a20 = class {
    constructor(r, t, h, c = {}) {
      __publicField(this, "ctx");
      __publicField(this, "tex");
      __publicField(this, "glFramebuffer");
      __publicField(this, "glRenderbuffer");
      this.ctx = r;
      let f = r.gl;
      r.onDestroy(() => this.free()), this.tex = new ot(r, t, h, c), this.glFramebuffer = f.createFramebuffer(), this.glRenderbuffer = f.createRenderbuffer(), this.bind(), f.renderbufferStorage(f.RENDERBUFFER, f.DEPTH_STENCIL, t, h), f.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_2D, this.tex.glTex, 0), f.framebufferRenderbuffer(f.FRAMEBUFFER, f.DEPTH_STENCIL_ATTACHMENT, f.RENDERBUFFER, this.glRenderbuffer), this.unbind();
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    toImageData() {
      let r = this.ctx.gl, t = new Uint8ClampedArray(this.width * this.height * 4);
      this.bind(), r.readPixels(0, 0, this.width, this.height, r.RGBA, r.UNSIGNED_BYTE, t), this.unbind();
      let h = this.width * 4, c = new Uint8Array(h);
      for (let f = 0; f < (this.height / 2 | 0); f++) {
        let v = f * h, B = (this.height - f - 1) * h;
        c.set(t.subarray(v, v + h)), t.copyWithin(v, B, B + h), t.set(c, B);
      }
      return new ImageData(t, this.width, this.height);
    }
    toDataURL() {
      let r = document.createElement("canvas"), t = r.getContext("2d");
      return r.width = this.width, r.height = this.height, t.putImageData(this.toImageData(), 0, 0), r.toDataURL();
    }
    draw(r) {
      this.bind(), r(), this.unbind();
    }
    bind() {
      this.ctx.pushFramebuffer(this.glFramebuffer), this.ctx.pushRenderbuffer(this.glRenderbuffer), this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
    }
    unbind() {
      this.ctx.popFramebuffer(), this.ctx.popRenderbuffer(), this.ctx.popViewport();
    }
    free() {
      let r = this.ctx.gl;
      r.deleteFramebuffer(this.glFramebuffer), r.deleteRenderbuffer(this.glRenderbuffer), this.tex.free();
    }
  }, "_this"), (() => {
    n(_a20, "FrameBuffer");
  })(), _a20), "ur");
  var _a21;
  var Hn = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a21 = class {
    constructor(r, t, h, c) {
      __publicField(this, "ctx");
      __publicField(this, "glProgram");
      this.ctx = r, r.onDestroy(() => this.free());
      let f = r.gl, v = f.createShader(f.VERTEX_SHADER), B = f.createShader(f.FRAGMENT_SHADER);
      f.shaderSource(v, t), f.shaderSource(B, h), f.compileShader(v), f.compileShader(B);
      let C = f.createProgram();
      if (this.glProgram = C, f.attachShader(C, v), f.attachShader(C, B), c.forEach((Y, A) => f.bindAttribLocation(C, A, Y)), f.linkProgram(C), !f.getProgramParameter(C, f.LINK_STATUS)) {
        let Y = f.getShaderInfoLog(v);
        if (Y)
          throw new Error("VERTEX SHADER " + Y);
        let A = f.getShaderInfoLog(B);
        if (A)
          throw new Error("FRAGMENT SHADER " + A);
      }
      f.deleteShader(v), f.deleteShader(B);
    }
    bind() {
      this.ctx.pushProgram(this.glProgram);
    }
    unbind() {
      this.ctx.popProgram();
    }
    send(r) {
      let t = this.ctx.gl;
      for (let h in r) {
        let c = r[h], f = t.getUniformLocation(this.glProgram, h);
        typeof c == "number" ? t.uniform1f(f, c) : c instanceof ke ? t.uniformMatrix4fv(f, false, new Float32Array(c.m)) : c instanceof $ ? t.uniform3f(f, c.r, c.g, c.b) : c instanceof E && t.uniform2f(f, c.x, c.y);
      }
    }
    free() {
      this.ctx.gl.deleteProgram(this.glProgram);
    }
  }, "_this"), (() => {
    n(_a21, "Shader");
  })(), _a21), "Hn");
  var _a22;
  var Yn = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a22 = class {
    constructor(r, t, h, c) {
      __publicField(this, "ctx");
      __publicField(this, "glVBuf");
      __publicField(this, "glIBuf");
      __publicField(this, "vqueue", []);
      __publicField(this, "iqueue", []);
      __publicField(this, "stride");
      __publicField(this, "maxVertices");
      __publicField(this, "maxIndices");
      __publicField(this, "vertexFormat");
      __publicField(this, "numDraws", 0);
      __publicField(this, "curPrimitive", null);
      __publicField(this, "curTex", null);
      __publicField(this, "curShader", null);
      __publicField(this, "curUniform", {});
      let f = r.gl;
      this.vertexFormat = t, this.ctx = r, this.stride = t.reduce((v, B) => v + B.size, 0), this.maxVertices = h, this.maxIndices = c, this.glVBuf = f.createBuffer(), r.pushArrayBuffer(this.glVBuf), f.bufferData(f.ARRAY_BUFFER, h * 4, f.DYNAMIC_DRAW), r.popArrayBuffer(), this.glIBuf = f.createBuffer(), r.pushElementArrayBuffer(this.glIBuf), f.bufferData(f.ELEMENT_ARRAY_BUFFER, c * 4, f.DYNAMIC_DRAW), r.popElementArrayBuffer();
    }
    push(r, t, h, c, f = null, v = {}) {
      (r !== this.curPrimitive || f !== this.curTex || c !== this.curShader || !Vr(this.curUniform, v) || this.vqueue.length + t.length * this.stride > this.maxVertices || this.iqueue.length + h.length > this.maxIndices) && this.flush();
      let B = this.vqueue.length / this.stride;
      for (let C of t)
        this.vqueue.push(C);
      for (let C of h)
        this.iqueue.push(C + B);
      this.curPrimitive = r, this.curShader = c, this.curTex = f, this.curUniform = v;
    }
    flush() {
      var _a26, _b;
      if (!this.curPrimitive || !this.curShader || this.vqueue.length === 0 || this.iqueue.length === 0)
        return;
      let r = this.ctx.gl;
      this.ctx.pushArrayBuffer(this.glVBuf), r.bufferSubData(r.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)), this.ctx.pushElementArrayBuffer(this.glIBuf), r.bufferSubData(r.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(this.iqueue)), this.ctx.setVertexFormat(this.vertexFormat), this.curShader.bind(), this.curShader.send(this.curUniform), (_a26 = this.curTex) == null ? void 0 : _a26.bind(), r.drawElements(this.curPrimitive, this.iqueue.length, r.UNSIGNED_SHORT, 0), (_b = this.curTex) == null ? void 0 : _b.unbind(), this.curShader.unbind(), this.ctx.popArrayBuffer(), this.ctx.popElementArrayBuffer(), this.vqueue = [], this.iqueue = [], this.numDraws++;
    }
    free() {
      let r = this.ctx.gl;
      r.deleteBuffer(this.glVBuf), r.deleteBuffer(this.glIBuf);
    }
  }, "_this"), (() => {
    n(_a22, "BatchRenderer");
  })(), _a22), "Yn");
  function Xe(r) {
    let t = [], h = n((v) => {
      t.push(v), r(v);
    }, "push"), c = n(() => {
      var _a26;
      t.pop(), r((_a26 = f()) != null ? _a26 : null);
    }, "pop"), f = n(() => t[t.length - 1], "cur");
    return [h, c, f];
  }
  __name(Xe, "Xe");
  n(Xe, "genStack");
  function hn(r, t = {}) {
    let h = [];
    function c(H) {
      h.push(H);
    }
    __name(c, "c");
    n(c, "onDestroy");
    function f() {
      h.forEach((H) => H()), r.getExtension("WEBGL_lose_context").loseContext();
    }
    __name(f, "f");
    n(f, "destroy");
    let v = null;
    function B(H) {
      if (Vr(H, v))
        return;
      v = H;
      let xe = H.reduce((ge, ve) => ge + ve.size, 0);
      H.reduce((ge, ve, Ke) => (r.vertexAttribPointer(Ke, ve.size, r.FLOAT, false, xe * 4, ge), r.enableVertexAttribArray(Ke), ge + ve.size * 4), 0);
    }
    __name(B, "B");
    n(B, "setVertexFormat");
    let [C, Y] = Xe((H) => r.bindTexture(r.TEXTURE_2D, H)), [A, te] = Xe((H) => r.bindBuffer(r.ARRAY_BUFFER, H)), [S, K] = Xe((H) => r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, H)), [y, X] = Xe((H) => r.bindFramebuffer(r.FRAMEBUFFER, H)), [le, ee] = Xe((H) => r.bindRenderbuffer(r.RENDERBUFFER, H)), [U, de] = Xe(({ x: H, y: xe, w: ge, h: ve }) => {
      r.viewport(H, xe, ge, ve);
    }), [b, Me] = Xe((H) => r.useProgram(H));
    return U({ x: 0, y: 0, w: r.drawingBufferWidth, h: r.drawingBufferHeight }), { gl: r, opts: t, onDestroy: c, destroy: f, pushTexture2D: C, popTexture2D: Y, pushArrayBuffer: A, popArrayBuffer: te, pushElementArrayBuffer: S, popElementArrayBuffer: K, pushFramebuffer: y, popFramebuffer: X, pushRenderbuffer: le, popRenderbuffer: ee, pushViewport: U, popViewport: de, pushProgram: b, popProgram: Me, setVertexFormat: B };
  }
  __name(hn, "hn");
  n(hn, "initGfx");
  var _a23;
  var Be = (/* @__PURE__ */ __name(_a23 = class {
    constructor(t) {
      __publicField(this, "loaded", false);
      __publicField(this, "data", null);
      __publicField(this, "error", null);
      __publicField(this, "onLoadEvents", new Ie());
      __publicField(this, "onErrorEvents", new Ie());
      __publicField(this, "onFinishEvents", new Ie());
      t.then((h) => {
        this.data = h, this.onLoadEvents.trigger(h);
      }).catch((h) => {
        if (this.error = h, this.onErrorEvents.numListeners() > 0)
          this.onErrorEvents.trigger(h);
        else
          throw h;
      }).finally(() => {
        this.onFinishEvents.trigger(), this.loaded = true;
      });
    }
    static loaded(t) {
      let h = new _a23(Promise.resolve(t));
      return h.data = t, h.loaded = true, h;
    }
    onLoad(t) {
      return this.loaded && this.data ? t(this.data) : this.onLoadEvents.add(t), this;
    }
    onError(t) {
      return this.loaded && this.error ? t(this.error) : this.onErrorEvents.add(t), this;
    }
    onFinish(t) {
      return this.loaded ? t() : this.onFinishEvents.add(t), this;
    }
    then(t) {
      return this.onLoad(t);
    }
    catch(t) {
      return this.onError(t);
    }
    finally(t) {
      return this.onFinish(t);
    }
  }, "ln"), (() => {
    n(_a23, "Asset");
  })(), _a23);
  var _a24;
  var Vt = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a24 = class {
    constructor() {
      __publicField(this, "assets", /* @__PURE__ */ new Map());
      __publicField(this, "lastUID", 0);
    }
    add(r, t) {
      let h = r != null ? r : this.lastUID++ + "", c = new Be(t);
      return this.assets.set(h, c), c;
    }
    addLoaded(r, t) {
      let h = r != null ? r : this.lastUID++ + "", c = Be.loaded(t);
      return this.assets.set(h, c), c;
    }
    get(r) {
      return this.assets.get(r);
    }
    progress() {
      if (this.assets.size === 0)
        return 1;
      let r = 0;
      return this.assets.forEach((t) => {
        t.loaded && r++;
      }), r / this.assets.size;
    }
  }, "_this"), (() => {
    n(_a24, "AssetBucket");
  })(), _a24), "Vt");
  function xr(r) {
    return fetch(r).then((t) => {
      if (!t.ok)
        throw new Error(`Failed to fetch "${r}"`);
      return t;
    });
  }
  __name(xr, "xr");
  n(xr, "fetchURL");
  function Xt(r) {
    return xr(r).then((t) => t.json());
  }
  __name(Xt, "Xt");
  n(Xt, "fetchJSON");
  function un(r) {
    return xr(r).then((t) => t.text());
  }
  __name(un, "un");
  n(un, "fetchText");
  function dn(r) {
    return xr(r).then((t) => t.arrayBuffer());
  }
  __name(dn, "dn");
  n(dn, "fetchArrayBuffer");
  function Wt(r) {
    let t = new Image();
    return t.crossOrigin = "anonymous", t.src = r, new Promise((h, c) => {
      t.onload = () => h(t), t.onerror = () => c(new Error(`Failed to load image from "${r}"`));
    });
  }
  __name(Wt, "Wt");
  n(Wt, "loadImg");
  var dr = 2.5949095;
  var Es = 1.70158 + 1;
  var Ss = 2 * Math.PI / 3;
  var bs = 2 * Math.PI / 4.5;
  var Ar = { linear: (r) => r, easeInSine: (r) => 1 - Math.cos(r * Math.PI / 2), easeOutSine: (r) => Math.sin(r * Math.PI / 2), easeInOutSine: (r) => -(Math.cos(Math.PI * r) - 1) / 2, easeInQuad: (r) => r * r, easeOutQuad: (r) => 1 - (1 - r) * (1 - r), easeInOutQuad: (r) => r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2, easeInCubic: (r) => r * r * r, easeOutCubic: (r) => 1 - Math.pow(1 - r, 3), easeInOutCubic: (r) => r < 0.5 ? 4 * r * r * r : 1 - Math.pow(-2 * r + 2, 3) / 2, easeInQuart: (r) => r * r * r * r, easeOutQuart: (r) => 1 - Math.pow(1 - r, 4), easeInOutQuart: (r) => r < 0.5 ? 8 * r * r * r * r : 1 - Math.pow(-2 * r + 2, 4) / 2, easeInQuint: (r) => r * r * r * r * r, easeOutQuint: (r) => 1 - Math.pow(1 - r, 5), easeInOutQuint: (r) => r < 0.5 ? 16 * r * r * r * r * r : 1 - Math.pow(-2 * r + 2, 5) / 2, easeInExpo: (r) => r === 0 ? 0 : Math.pow(2, 10 * r - 10), easeOutExpo: (r) => r === 1 ? 1 : 1 - Math.pow(2, -10 * r), easeInOutExpo: (r) => r === 0 ? 0 : r === 1 ? 1 : r < 0.5 ? Math.pow(2, 20 * r - 10) / 2 : (2 - Math.pow(2, -20 * r + 10)) / 2, easeInCirc: (r) => 1 - Math.sqrt(1 - Math.pow(r, 2)), easeOutCirc: (r) => Math.sqrt(1 - Math.pow(r - 1, 2)), easeInOutCirc: (r) => r < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * r, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * r + 2, 2)) + 1) / 2, easeInBack: (r) => Es * r * r * r - 1.70158 * r * r, easeOutBack: (r) => 1 + Es * Math.pow(r - 1, 3) + 1.70158 * Math.pow(r - 1, 2), easeInOutBack: (r) => r < 0.5 ? Math.pow(2 * r, 2) * ((dr + 1) * 2 * r - dr) / 2 : (Math.pow(2 * r - 2, 2) * ((dr + 1) * (r * 2 - 2) + dr) + 2) / 2, easeInElastic: (r) => r === 0 ? 0 : r === 1 ? 1 : -Math.pow(2, 10 * r - 10) * Math.sin((r * 10 - 10.75) * Ss), easeOutElastic: (r) => r === 0 ? 0 : r === 1 ? 1 : Math.pow(2, -10 * r) * Math.sin((r * 10 - 0.75) * Ss) + 1, easeInOutElastic: (r) => r === 0 ? 0 : r === 1 ? 1 : r < 0.5 ? -(Math.pow(2, 20 * r - 10) * Math.sin((20 * r - 11.125) * bs)) / 2 : Math.pow(2, -20 * r + 10) * Math.sin((20 * r - 11.125) * bs) / 2 + 1, easeInBounce: (r) => 1 - Ar.easeOutBounce(1 - r), easeOutBounce: (r) => r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375, easeInOutBounce: (r) => r < 0.5 ? (1 - Ar.easeOutBounce(1 - 2 * r)) / 2 : (1 + Ar.easeOutBounce(2 * r - 1)) / 2 };
  var cr = Ar;
  var _a25;
  var Kn = /* @__PURE__ */ __name((/* @__PURE__ */ __name(_a25 = class {
    constructor(r, t, h) {
      __publicField(this, "textures", []);
      __publicField(this, "canvas");
      __publicField(this, "c2d");
      __publicField(this, "x", 0);
      __publicField(this, "y", 0);
      __publicField(this, "curHeight", 0);
      __publicField(this, "gfx");
      this.gfx = r, this.canvas = document.createElement("canvas"), this.canvas.width = t, this.canvas.height = h, this.textures = [ot.fromImage(r, this.canvas)], this.c2d = this.canvas.getContext("2d");
    }
    add(r) {
      if (r.width > this.canvas.width || r.height > this.canvas.height)
        throw new Error(`Texture size (${r.width} x ${r.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`);
      this.x + r.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + r.height > this.canvas.height && (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height), this.textures.push(ot.fromImage(this.gfx, this.canvas)), this.x = 0, this.y = 0, this.curHeight = 0);
      let t = this.textures[this.textures.length - 1], h = new E(this.x, this.y);
      return this.x += r.width, r.height > this.curHeight && (this.curHeight = r.height), r instanceof ImageData ? this.c2d.putImageData(r, h.x, h.y) : this.c2d.drawImage(r, h.x, h.y), t.update(this.canvas), [t, new pe(h.x / this.canvas.width, h.y / this.canvas.height, r.width / this.canvas.width, r.height / this.canvas.height)];
    }
    free() {
      for (let r of this.textures)
        r.free();
    }
  }, "_this"), (() => {
    n(_a25, "TexPacker");
  })(), _a25), "Kn");
  var jn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var Qn = Bn("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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var zn = "data:image/png;base64,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";
  var Jn = "data:image/png;base64,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";
  var Xn = "3000.1.17";
  var Rs = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var fr = "topleft";
  var Ms = 64;
  var Wn = "monospace";
  var pr = "monospace";
  var Zn = 36;
  var gr = 64;
  var mr = 256;
  var Ps = 2048;
  var Bs = 2048;
  var Ts = 2048;
  var Fs = 2048;
  var Is = 0.1;
  var _n = 64;
  var Kr = "linear";
  var $n = 8;
  var eo = 4;
  var ri = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var to = ri.reduce((r, t) => r + t.size, 0);
  var cn = 2048;
  var ro = cn * 4 * to;
  var io = cn * 6;
  var so = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var no = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var jr = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var Qr = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var oo = /* @__PURE__ */ new Set(["id", "require"]);
  var ao = /* @__PURE__ */ new Set(["add", "update", "draw", "destroy", "inspect", "drawInspect"]);
  function nt(r) {
    switch (r) {
      case "topleft":
        return new E(-1, -1);
      case "top":
        return new E(0, -1);
      case "topright":
        return new E(1, -1);
      case "left":
        return new E(-1, 0);
      case "center":
        return new E(0, 0);
      case "right":
        return new E(1, 0);
      case "botleft":
        return new E(-1, 1);
      case "bot":
        return new E(0, 1);
      case "botright":
        return new E(1, 1);
      default:
        return r;
    }
  }
  __name(nt, "nt");
  n(nt, "anchorPt");
  function fn(r) {
    switch (r) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  __name(fn, "fn");
  n(fn, "alignPt");
  function pn(r) {
    return r.createBuffer(1, 1, 44100);
  }
  __name(pn, "pn");
  n(pn, "createEmptyAudioBuffer");
  var ho = n((r = {}) => {
    var _a26, _b, _c;
    let t = (_a26 = r.root) != null ? _a26 : document.body;
    t === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
    let h = (_b = r.canvas) != null ? _b : (() => {
      let e = document.createElement("canvas");
      return t.appendChild(e), e;
    })(), c = (_c = r.scale) != null ? _c : 1, f = r.width && r.height && !r.stretch && !r.letterbox;
    f ? (h.width = r.width * c, h.height = r.height * c) : (h.width = h.parentElement.offsetWidth, h.height = h.parentElement.offsetHeight);
    let v = ["outline: none", "cursor: default"];
    if (f) {
      let e = h.width, i = h.height;
      v.push(`width: ${e}px`), v.push(`height: ${i}px`);
    } else
      v.push("width: 100%"), v.push("height: 100%");
    r.crisp && (v.push("image-rendering: pixelated"), v.push("image-rendering: crisp-edges")), h.style.cssText = v.join(";");
    let B = r.pixelDensity || window.devicePixelRatio;
    h.width *= B, h.height *= B, h.tabIndex = 0;
    let C = document.createElement("canvas");
    C.width = mr, C.height = mr;
    let Y = C.getContext("2d", { willReadFrequently: true }), A = qn({ canvas: h, touchToMouse: r.touchToMouse, gamepads: r.gamepads, pixelDensity: r.pixelDensity, maxFPS: r.maxFPS }), te = [], S = A.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true }), K = hn(S, { texFilter: r.texFilter }), y = (() => {
      var _a27, _b2;
      let e = $e(jr, Qr), i = ot.fromImage(K, new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), s = r.width && r.height ? new ur(K, r.width * B * c, r.height * B * c) : new ur(K, S.drawingBufferWidth, S.drawingBufferHeight), a = null, o = 1;
      r.background && (a = W(r.background), o = Array.isArray(r.background) ? r.background[3] : 1, S.clearColor(a.r / 255, a.g / 255, a.b / 255, o != null ? o : 1)), S.enable(S.BLEND), S.blendFuncSeparate(S.SRC_ALPHA, S.ONE_MINUS_SRC_ALPHA, S.ONE, S.ONE_MINUS_SRC_ALPHA);
      let l = new Yn(K, ri, ro, io), p = ot.fromImage(K, new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
      return { lastDrawCalls: 0, defShader: e, defTex: i, frameBuffer: s, postShader: null, postShaderUniform: null, renderer: l, transform: new ke(), transformStack: [], bgTex: p, bgColor: a, bgAlpha: o, width: (_a27 = r.width) != null ? _a27 : S.drawingBufferWidth / B / c, height: (_b2 = r.height) != null ? _b2 : S.drawingBufferHeight / B / c, viewport: { x: 0, y: 0, width: S.drawingBufferWidth, height: S.drawingBufferHeight }, fixed: false };
    })();
    const _X = class {
      constructor(i, s, a = {}, o = null) {
        __publicField(this, "tex");
        __publicField(this, "frames", [new pe(0, 0, 1, 1)]);
        __publicField(this, "anims", {});
        __publicField(this, "slice9", null);
        this.tex = i, s && (this.frames = s), this.anims = a, this.slice9 = o;
      }
      get width() {
        return this.tex.width * this.frames[0].w;
      }
      get height() {
        return this.tex.height * this.frames[0].h;
      }
      static from(i, s = {}) {
        return typeof i == "string" ? _X.fromURL(i, s) : Promise.resolve(_X.fromImage(i, s));
      }
      static fromImage(i, s = {}) {
        let [a, o] = U.packer.add(i), l = s.frames ? s.frames.map((p) => new pe(o.x + p.x * o.w, o.y + p.y * o.h, p.w * o.w, p.h * o.h)) : at(s.sliceX || 1, s.sliceY || 1, o.x, o.y, o.w, o.h);
        return new _X(a, l, s.anims, s.slice9);
      }
      static fromURL(i, s = {}) {
        return Wt(i).then((a) => _X.fromImage(a, s));
      }
    };
    let X = _X;
    __name(X, "X");
    (() => {
      n(_X, "SpriteData");
    })();
    const _le = class {
      constructor(i) {
        __publicField(this, "buf");
        this.buf = i;
      }
      static fromArrayBuffer(i) {
        return new Promise((s, a) => ee.ctx.decodeAudioData(i, s, a)).then((s) => new _le(s));
      }
      static fromURL(i) {
        return ys(i) ? _le.fromArrayBuffer(Js(i)) : dn(i).then((s) => _le.fromArrayBuffer(s));
      }
    };
    let le = _le;
    __name(le, "le");
    (() => {
      n(_le, "SoundData");
    })();
    let ee = (() => {
      let e = new (window.AudioContext || window.webkitAudioContext)(), i = e.createGain();
      i.connect(e.destination);
      let s = new le(pn(e));
      return e.decodeAudioData(Qn.buffer.slice(0)).then((a) => {
        s.buf = a;
      }).catch((a) => {
        console.error("Failed to load burp: ", a);
      }), { ctx: e, masterNode: i, burpSnd: s };
    })(), U = { urlPrefix: "", sprites: new Vt(), fonts: new Vt(), bitmapFonts: new Vt(), sounds: new Vt(), shaders: new Vt(), custom: new Vt(), packer: new Kn(K, Ts, Fs), loaded: false };
    function de(e) {
      return typeof e != "string" || ys(e) ? e : U.urlPrefix + e;
    }
    __name(de, "de");
    n(de, "fixURL");
    let b = { events: new Jt(), objEvents: new Jt(), root: sr([]), gravity: 0, scenes: {}, logs: [], cam: { pos: null, scale: new E(1), angle: 0, shake: 0, transform: new ke() } };
    b.root.use(ar());
    function Me(e) {
      return U.custom.add(null, e);
    }
    __name(Me, "Me");
    n(Me, "load");
    function H() {
      let e = [U.sprites, U.sounds, U.shaders, U.fonts, U.bitmapFonts, U.custom];
      return e.reduce((i, s) => i + s.progress(), 0) / e.length;
    }
    __name(H, "H");
    n(H, "loadProgress");
    function xe(e) {
      return e !== void 0 && (U.urlPrefix = e), U.urlPrefix;
    }
    __name(xe, "xe");
    n(xe, "loadRoot");
    function ge(e, i) {
      return U.custom.add(e, Xt(i));
    }
    __name(ge, "ge");
    n(ge, "loadJSON");
    const _ve = class {
      constructor(i, s = {}) {
        __publicField(this, "fontface");
        __publicField(this, "filter", Kr);
        __publicField(this, "outline", null);
        __publicField(this, "size", gr);
        var _a27, _b2;
        if (this.fontface = i, this.filter = (_a27 = s.filter) != null ? _a27 : Kr, this.size = (_b2 = s.size) != null ? _b2 : gr, this.size > mr)
          throw new Error(`Max font size: ${mr}`);
        s.outline && (this.outline = { width: 1, color: W(0, 0, 0) }, typeof s.outline == "number" ? this.outline.width = s.outline : typeof s.outline == "object" && (s.outline.width && (this.outline.width = s.outline.width), s.outline.color && (this.outline.color = s.outline.color)));
      }
    };
    let ve = _ve;
    __name(ve, "ve");
    (() => {
      n(_ve, "FontData");
    })();
    function Ke(e, i, s = {}) {
      let a = new FontFace(e, typeof i == "string" ? `url(${i})` : i);
      return document.fonts.add(a), U.fonts.add(e, a.load().catch((o) => {
        throw new Error(`Failed to load font from "${i}": ${o}`);
      }).then((o) => new ve(o, s)));
    }
    __name(Ke, "Ke");
    n(Ke, "loadFont");
    function St(e, i, s, a, o = {}) {
      return U.bitmapFonts.add(e, Wt(i).then((l) => {
        var _a27;
        return kt(ot.fromImage(K, l, o), s, a, (_a27 = o.chars) != null ? _a27 : Rs);
      }));
    }
    __name(St, "St");
    n(St, "loadBitmapFont");
    function at(e = 1, i = 1, s = 0, a = 0, o = 1, l = 1) {
      let p = [], w = o / e, g = l / i;
      for (let u = 0; u < i; u++)
        for (let m = 0; m < e; m++)
          p.push(new pe(s + m * w, a + u * g, w, g));
      return p;
    }
    __name(at, "at");
    n(at, "slice");
    function ht(e, i) {
      return e = de(e), Me(typeof i == "string" ? new Promise((s, a) => {
        Xt(i).then((o) => {
          ht(e, o).then(s).catch(a);
        });
      }) : X.from(e).then((s) => {
        let a = {};
        for (let o in i) {
          let l = i[o], p = s.frames[0], w = Ts * p.w, g = Fs * p.h, u = l.frames ? l.frames.map((P) => new pe(p.x + (l.x + P.x) / w * p.w, p.y + (l.y + P.y) / g * p.h, P.w / w * p.w, P.h / g * p.h)) : at(l.sliceX || 1, l.sliceY || 1, p.x + l.x / w * p.w, p.y + l.y / g * p.h, l.width / w * p.w, l.height / g * p.h), m = new X(s.tex, u, l.anims);
          U.sprites.addLoaded(o, m), a[o] = m;
        }
        return a;
      }));
    }
    __name(ht, "ht");
    n(ht, "loadSpriteAtlas");
    function lt(e, i = {}) {
      let s = document.createElement("canvas"), a = e[0].width, o = e[0].height;
      s.width = a * e.length, s.height = o;
      let l = s.getContext("2d");
      e.forEach((w, g) => {
        w instanceof ImageData ? l.putImageData(w, g * a, 0) : l.drawImage(w, g * a, 0);
      });
      let p = l.getImageData(0, 0, e.length * a, o);
      return X.fromImage(p, __spreadProps(__spreadValues({}, i), { sliceX: e.length, sliceY: 1 }));
    }
    __name(lt, "lt");
    n(lt, "createSpriteSheet");
    function Ue(e, i, s = { sliceX: 1, sliceY: 1, anims: {} }) {
      return i = de(i), Array.isArray(i) ? i.some((a) => typeof a == "string") ? U.sprites.add(e, Promise.all(i.map((a) => typeof a == "string" ? Wt(a) : Promise.resolve(a))).then((a) => lt(a, s))) : U.sprites.addLoaded(e, lt(i, s)) : typeof i == "string" ? U.sprites.add(e, X.from(i, s)) : U.sprites.addLoaded(e, X.fromImage(i, s));
    }
    __name(Ue, "Ue");
    n(Ue, "loadSprite");
    function bt(e, i) {
      return i = de(i), U.sprites.add(e, new Promise((s) => __async(this, null, function* () {
        let a = typeof i == "string" ? yield Xt(i) : i, o = yield Promise.all(a.frames.map(Wt)), l = document.createElement("canvas");
        l.width = a.width, l.height = a.height * a.frames.length;
        let p = l.getContext("2d");
        o.forEach((g, u) => {
          p.drawImage(g, 0, u * a.height);
        });
        let w = yield Ue(null, l, { sliceY: a.frames.length, anims: a.anims });
        s(w);
      })));
    }
    __name(bt, "bt");
    n(bt, "loadPedit");
    function Rt(e, i, s) {
      i = de(i), s = de(s), typeof i == "string" && !s && (s = Cn(i) + ".json");
      let a = typeof s == "string" ? Xt(s) : Promise.resolve(s);
      return U.sprites.add(e, a.then((o) => {
        let l = o.meta.size, p = o.frames.map((g) => new pe(g.frame.x / l.w, g.frame.y / l.h, g.frame.w / l.w, g.frame.h / l.h)), w = {};
        for (let g of o.meta.frameTags)
          g.from === g.to ? w[g.name] = g.from : w[g.name] = { from: g.from, to: g.to, speed: 10, loop: true, pingpong: g.direction === "pingpong" };
        return X.from(i, { frames: p, anims: w });
      }));
    }
    __name(Rt, "Rt");
    n(Rt, "loadAseprite");
    function $t(e, i, s) {
      return U.shaders.addLoaded(e, $e(i, s));
    }
    __name($t, "$t");
    n($t, "loadShader");
    function er(e, i, s) {
      i = de(i), s = de(s);
      let a = n((l) => l ? un(l) : Promise.resolve(null), "resolveUrl"), o = Promise.all([a(i), a(s)]).then(([l, p]) => $e(l, p));
      return U.shaders.add(e, o);
    }
    __name(er, "er");
    n(er, "loadShaderURL");
    function tr(e, i) {
      return i = de(i), U.sounds.add(e, typeof i == "string" ? le.fromURL(i) : le.fromArrayBuffer(i));
    }
    __name(tr, "tr");
    n(tr, "loadSound");
    function rr(e = "bean") {
      return Ue(e, jn);
    }
    __name(rr, "rr");
    n(rr, "loadBean");
    function Mt(e) {
      return U.sprites.get(e);
    }
    __name(Mt, "Mt");
    n(Mt, "getSprite");
    function Pt(e) {
      return U.sounds.get(e);
    }
    __name(Pt, "Pt");
    n(Pt, "getSound");
    function Bt(e) {
      return U.fonts.get(e);
    }
    __name(Bt, "Bt");
    n(Bt, "getFont");
    function ut(e) {
      return U.bitmapFonts.get(e);
    }
    __name(ut, "ut");
    n(ut, "getBitmapFont");
    function dt2(e) {
      return U.shaders.get(e);
    }
    __name(dt2, "dt");
    n(dt2, "getShader");
    function Tt(e) {
      return U.custom.get(e);
    }
    __name(Tt, "Tt");
    n(Tt, "getAsset");
    function _e(e) {
      if (typeof e == "string") {
        let i = Mt(e);
        if (i)
          return i;
        if (H() < 1)
          return null;
        throw new Error(`Sprite not found: ${e}`);
      } else {
        if (e instanceof X)
          return Be.loaded(e);
        if (e instanceof Be)
          return e;
        throw new Error(`Invalid sprite: ${e}`);
      }
    }
    __name(_e, "_e");
    n(_e, "resolveSprite");
    function Ft(e) {
      if (typeof e == "string") {
        let i = Pt(e);
        if (i)
          return i;
        if (H() < 1)
          return null;
        throw new Error(`Sound not found: ${e}`);
      } else {
        if (e instanceof le)
          return Be.loaded(e);
        if (e instanceof Be)
          return e;
        throw new Error(`Invalid sound: ${e}`);
      }
    }
    __name(Ft, "Ft");
    n(Ft, "resolveSound");
    function It(e) {
      var _a27;
      if (!e)
        return y.defShader;
      if (typeof e == "string") {
        let i = dt2(e);
        if (i)
          return (_a27 = i.data) != null ? _a27 : i;
        if (H() < 1)
          return null;
        throw new Error(`Shader not found: ${e}`);
      } else if (e instanceof Be)
        return e.data ? e.data : e;
      return e;
    }
    __name(It, "It");
    n(It, "resolveShader");
    function ct(e) {
      var _a27, _b2, _c2;
      if (!e)
        return ct((_a27 = r.font) != null ? _a27 : Wn);
      if (typeof e == "string") {
        let i = ut(e), s = Bt(e);
        if (i)
          return (_b2 = i.data) != null ? _b2 : i;
        if (s)
          return (_c2 = s.data) != null ? _c2 : s;
        if (document.fonts.check(`${gr}px ${e}`))
          return e;
        if (H() < 1)
          return null;
        throw new Error(`Font not found: ${e}`);
      } else if (e instanceof Be)
        return e.data ? e.data : e;
      return e;
    }
    __name(ct, "ct");
    n(ct, "resolveFont");
    function Dt(e) {
      return e !== void 0 && (ee.masterNode.gain.value = e), ee.masterNode.gain.value;
    }
    __name(Dt, "Dt");
    n(Dt, "volume");
    function ft(e, i = {}) {
      var _a27, _b2, _c2, _d, _e2;
      let s = ee.ctx, a = (_a27 = i.paused) != null ? _a27 : false, o = s.createBufferSource(), l = new Ie(), p = s.createGain(), w = (_b2 = i.seek) != null ? _b2 : 0, g = 0, u = 0, m = false;
      o.loop = !!i.loop, o.detune.value = (_c2 = i.detune) != null ? _c2 : 0, o.playbackRate.value = (_d = i.speed) != null ? _d : 1, o.connect(p), o.onended = () => {
        var _a28;
        L() >= ((_a28 = o.buffer) == null ? void 0 : _a28.duration) && l.trigger();
      }, p.connect(ee.masterNode), p.gain.value = (_e2 = i.volume) != null ? _e2 : 1;
      let P = n((D) => {
        o.buffer = D.buf, a || (g = s.currentTime, o.start(0, w), m = true);
      }, "start"), T = Ft(e);
      T instanceof Be && T.onLoad(P);
      let L = n(() => {
        if (!o.buffer)
          return 0;
        let D = a ? u - g : s.currentTime - g, N = o.buffer.duration;
        return o.loop ? D % N : Math.min(D, N);
      }, "getTime"), G = n((D) => {
        let N = s.createBufferSource();
        return N.buffer = D.buffer, N.loop = D.loop, N.playbackRate.value = D.playbackRate.value, N.detune.value = D.detune.value, N.onended = D.onended, N.connect(p), N;
      }, "cloneNode");
      return { stop() {
        this.paused = true, this.seek(0);
      }, set paused(D) {
        if (a !== D)
          if (a = D, D)
            m && (o.stop(), m = false), u = s.currentTime;
          else {
            o = G(o);
            let N = u - g;
            o.start(0, N), m = true, g = s.currentTime - N, u = 0;
          }
      }, get paused() {
        return a;
      }, play(D = 0) {
        this.seek(D), this.paused = false;
      }, seek(D) {
        var _a28;
        ((_a28 = o.buffer) == null ? void 0 : _a28.duration) && (D > o.buffer.duration || (a ? (o = G(o), g = u - D) : (o.stop(), o = G(o), g = s.currentTime - D, o.start(0, D), m = true, u = 0)));
      }, set speed(D) {
        o.playbackRate.value = D;
      }, get speed() {
        return o.playbackRate.value;
      }, set detune(D) {
        o.detune.value = D;
      }, get detune() {
        return o.detune.value;
      }, set volume(D) {
        p.gain.value = Math.max(D, 0);
      }, get volume() {
        return p.gain.value;
      }, set loop(D) {
        o.loop = D;
      }, get loop() {
        return o.loop;
      }, duration() {
        var _a28, _b3;
        return (_b3 = (_a28 = o.buffer) == null ? void 0 : _a28.duration) != null ? _b3 : 0;
      }, time() {
        return L() % this.duration();
      }, onEnd(D) {
        return l.add(D);
      }, then(D) {
        return this.onEnd(D);
      } };
    }
    __name(ft, "ft");
    n(ft, "play");
    function pt(e) {
      return ft(ee.burpSnd, e);
    }
    __name(pt, "pt");
    n(pt, "burp");
    function Ct(e, i) {
      return new ur(K, e, i);
    }
    __name(Ct, "Ct");
    n(Ct, "makeCanvas");
    function $e(e = jr, i = Qr) {
      let s = so.replace("{{user}}", e != null ? e : jr), a = no.replace("{{user}}", i != null ? i : Qr);
      try {
        return new Hn(K, s, a, ri.map((o) => o.name));
      } catch (o) {
        let l = new RegExp("(?<type>^\\w+) SHADER ERROR: 0:(?<line>\\d+): (?<msg>.+)"), p = Nn(o).match(l), w = Number(p.groups.line) - 14, g = p.groups.msg.trim(), u = p.groups.type.toLowerCase();
        throw new Error(`${u} shader line ${w}: ${g}`);
      }
    }
    __name($e, "$e");
    n($e, "makeShader");
    function kt(e, i, s, a) {
      let o = e.width / i, l = {}, p = a.split("").entries();
      for (let [w, g] of p)
        l[g] = new pe(w % o * i, Math.floor(w / o) * s, i, s);
      return { tex: e, map: l, size: s };
    }
    __name(kt, "kt");
    n(kt, "makeFont");
    function et(e, i, s, a = y.defTex, o = y.defShader, l = {}) {
      let p = It(o);
      if (!p || p instanceof Be)
        return;
      let w = y.fixed || s ? y.transform : b.cam.transform.mult(y.transform), g = [];
      for (let u of e) {
        let m = Nt(w.multVec2(u.pos));
        g.push(m.x, m.y, u.uv.x, u.uv.y, u.color.r / 255, u.color.g / 255, u.color.b / 255, u.opacity);
      }
      y.renderer.push(S.TRIANGLES, g, i, p, a, l);
    }
    __name(et, "et");
    n(et, "drawRaw");
    function Pe() {
      y.renderer.flush();
    }
    __name(Pe, "Pe");
    n(Pe, "flush");
    function tt() {
      S.clear(S.COLOR_BUFFER_BIT), y.frameBuffer.bind(), S.clear(S.COLOR_BUFFER_BIT), y.bgColor || Se(() => {
        Ce({ width: we(), height: Ae(), quad: new pe(0, 0, we() / Ms, Ae() / Ms), tex: y.bgTex, fixed: true });
      }), y.renderer.numDraws = 0, y.fixed = false, y.transformStack.length = 0, y.transform = new ke();
    }
    __name(tt, "tt");
    n(tt, "frameStart");
    function gt(e, i) {
      y.postShader = e, y.postShaderUniform = i != null ? i : null;
    }
    __name(gt, "gt");
    n(gt, "usePostEffect");
    function rt() {
      Pe(), y.lastDrawCalls = y.renderer.numDraws, y.frameBuffer.unbind(), S.viewport(0, 0, S.drawingBufferWidth, S.drawingBufferHeight);
      let e = y.width, i = y.height;
      y.width = S.drawingBufferWidth / B, y.height = S.drawingBufferHeight / B, je({ flipY: true, tex: y.frameBuffer.tex, pos: new E(y.viewport.x, y.viewport.y), width: y.viewport.width, height: y.viewport.height, shader: y.postShader, uniform: typeof y.postShaderUniform == "function" ? y.postShaderUniform() : y.postShaderUniform, fixed: true }), Pe(), y.width = e, y.height = i;
    }
    __name(rt, "rt");
    n(rt, "frameEnd");
    function Nt(e) {
      return new E(e.x / we() * 2 - 1, -e.y / Ae() * 2 + 1);
    }
    __name(Nt, "Nt");
    n(Nt, "screen2ndc");
    function mt(e) {
      y.transform = e.clone();
    }
    __name(mt, "mt");
    n(mt, "pushMatrix");
    function _(...e) {
      if (e[0] === void 0)
        return;
      let i = M(...e);
      i.x === 0 && i.y === 0 || y.transform.translate(i);
    }
    __name(_, "_");
    n(_, "pushTranslate");
    function De(...e) {
      if (e[0] === void 0)
        return;
      let i = M(...e);
      i.x === 1 && i.y === 1 || y.transform.scale(i);
    }
    __name(De, "De");
    n(De, "pushScale");
    function re(e) {
      e && y.transform.rotate(e);
    }
    __name(re, "re");
    n(re, "pushRotate");
    function ae() {
      y.transformStack.push(y.transform.clone());
    }
    __name(ae, "ae");
    n(ae, "pushTransform");
    function se() {
      y.transformStack.length > 0 && (y.transform = y.transformStack.pop());
    }
    __name(se, "se");
    n(se, "popTransform");
    function Ce(e) {
      var _a27;
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawUVQuad() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let i = e.width, s = e.height, a = nt(e.anchor || fr).scale(new E(i, s).scale(-0.5)), o = e.quad || new pe(0, 0, 1, 1), l = e.color || W(255, 255, 255), p = (_a27 = e.opacity) != null ? _a27 : 1, w = e.tex ? Is / e.tex.width : 0, g = e.tex ? Is / e.tex.height : 0, u = o.x + w, m = o.y + g, P = o.w - w * 2, T = o.h - g * 2;
      ae(), _(e.pos), re(e.angle), De(e.scale), _(a), et([{ pos: new E(-i / 2, s / 2), uv: new E(e.flipX ? u + P : u, e.flipY ? m : m + T), color: l, opacity: p }, { pos: new E(-i / 2, -s / 2), uv: new E(e.flipX ? u + P : u, e.flipY ? m + T : m), color: l, opacity: p }, { pos: new E(i / 2, -s / 2), uv: new E(e.flipX ? u : u + P, e.flipY ? m + T : m), color: l, opacity: p }, { pos: new E(i / 2, s / 2), uv: new E(e.flipX ? u : u + P, e.flipY ? m : m + T), color: l, opacity: p }], [0, 1, 3, 1, 2, 3], e.fixed, e.tex, e.shader, e.uniform), se();
    }
    __name(Ce, "Ce");
    n(Ce, "drawUVQuad");
    function je(e) {
      var _a27;
      if (!e.tex)
        throw new Error('drawTexture() requires property "tex".');
      let i = (_a27 = e.quad) != null ? _a27 : new pe(0, 0, 1, 1), s = e.tex.width * i.w, a = e.tex.height * i.h, o = new E(1);
      if (e.tiled) {
        let l = Math.ceil((e.width || s) / s), p = Math.ceil((e.height || a) / a), w = nt(e.anchor || fr).add(new E(1, 1)).scale(0.5).scale(l * s, p * a);
        for (let g = 0; g < l; g++)
          for (let u = 0; u < p; u++)
            Ce(Object.assign({}, e, { pos: (e.pos || new E(0)).add(new E(s * g, a * u)).sub(w), scale: o.scale(e.scale || new E(1)), tex: e.tex, quad: i, width: s, height: a, anchor: "topleft" }));
      } else
        e.width && e.height ? (o.x = e.width / s, o.y = e.height / a) : e.width ? (o.x = e.width / s, o.y = o.x) : e.height && (o.y = e.height / a, o.x = o.y), Ce(Object.assign({}, e, { scale: o.scale(e.scale || new E(1)), tex: e.tex, quad: i, width: s, height: a }));
    }
    __name(je, "je");
    n(je, "drawTexture");
    function ir(e) {
      var _a27, _b2, _c2;
      if (!e.sprite)
        throw new Error('drawSprite() requires property "sprite"');
      let i = _e(e.sprite);
      if (!i || !i.data)
        return;
      let s = i.data.frames[(_a27 = e.frame) != null ? _a27 : 0];
      if (!s)
        throw new Error(`Frame not found: ${(_b2 = e.frame) != null ? _b2 : 0}`);
      je(Object.assign({}, e, { tex: i.data.tex, quad: s.scale((_c2 = e.quad) != null ? _c2 : new pe(0, 0, 1, 1)) }));
    }
    __name(ir, "ir");
    n(ir, "drawSprite");
    function Le(e, i, s, a, o, l = 1) {
      a = Ne(a % 360), o = Ne(o % 360), o <= a && (o += Math.PI * 2);
      let p = [], w = Math.ceil((o - a) / Ne(8) * l), g = (o - a) / w;
      for (let u = a; u < o; u += g)
        p.push(e.add(i * Math.cos(u), s * Math.sin(u)));
      return p.push(e.add(i * Math.cos(o), s * Math.sin(o))), p;
    }
    __name(Le, "Le");
    n(Le, "getArcPts");
    function me(e) {
      if (e.width === void 0 || e.height === void 0)
        throw new Error('drawRect() requires property "width" and "height".');
      if (e.width <= 0 || e.height <= 0)
        return;
      let i = e.width, s = e.height, a = nt(e.anchor || fr).add(1, 1).scale(new E(i, s).scale(-0.5)), o = [new E(0, 0), new E(i, 0), new E(i, s), new E(0, s)];
      if (e.radius) {
        let l = Math.min(Math.min(i, s) / 2, e.radius);
        o = [new E(l, 0), new E(i - l, 0), ...Le(new E(i - l, l), l, l, 270, 360), new E(i, l), new E(i, s - l), ...Le(new E(i - l, s - l), l, l, 0, 90), new E(i - l, s), new E(l, s), ...Le(new E(l, s - l), l, l, 90, 180), new E(0, s - l), new E(0, l), ...Le(new E(l, l), l, l, 180, 270)];
      }
      ue(Object.assign({}, e, __spreadValues({ offset: a, pts: o }, e.gradient ? { colors: e.horizontal ? [e.gradient[0], e.gradient[1], e.gradient[1], e.gradient[0]] : [e.gradient[0], e.gradient[0], e.gradient[1], e.gradient[1]] } : {})));
    }
    __name(me, "me");
    n(me, "drawRect");
    function d(e) {
      let { p1: i, p2: s } = e;
      if (!i || !s)
        throw new Error('drawLine() requires properties "p1" and "p2".');
      let a = e.width || 1, o = s.sub(i).unit().normal().scale(a * 0.5), l = [i.sub(o), i.add(o), s.add(o), s.sub(o)].map((p) => {
        var _a27, _b2;
        return { pos: new E(p.x, p.y), uv: new E(0), color: (_a27 = e.color) != null ? _a27 : $.WHITE, opacity: (_b2 = e.opacity) != null ? _b2 : 1 };
      });
      et(l, [0, 1, 3, 1, 2, 3], e.fixed, y.defTex, e.shader, e.uniform);
    }
    __name(d, "d");
    n(d, "drawLine");
    function V(e) {
      let i = e.pts;
      if (!i)
        throw new Error('drawLines() requires property "pts".');
      if (!(i.length < 2))
        if (e.radius && i.length >= 3) {
          let s = i[0].sdist(i[1]);
          for (let o = 1; o < i.length - 1; o++)
            s = Math.min(i[o].sdist(i[o + 1]), s);
          let a = Math.min(e.radius, Math.sqrt(s) / 2);
          d(Object.assign({}, e, { p1: i[0], p2: i[1] }));
          for (let o = 1; o < i.length - 2; o++) {
            let l = i[o], p = i[o + 1];
            d(Object.assign({}, e, { p1: l, p2: p }));
          }
          d(Object.assign({}, e, { p1: i[i.length - 2], p2: i[i.length - 1] }));
        } else
          for (let s = 0; s < i.length - 1; s++)
            d(Object.assign({}, e, { p1: i[s], p2: i[s + 1] })), e.join !== "none" && q(Object.assign({}, e, { pos: i[s], radius: e.width / 2 }));
    }
    __name(V, "V");
    n(V, "drawLines");
    function R(e) {
      if (!e.p1 || !e.p2 || !e.p3)
        throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
      return ue(Object.assign({}, e, { pts: [e.p1, e.p2, e.p3] }));
    }
    __name(R, "R");
    n(R, "drawTriangle");
    function q(e) {
      if (typeof e.radius != "number")
        throw new Error('drawCircle() requires property "radius".');
      e.radius !== 0 && j(Object.assign({}, e, { radiusX: e.radius, radiusY: e.radius, angle: 0 }));
    }
    __name(q, "q");
    n(q, "drawCircle");
    function j(e) {
      var _a27, _b2, _c2;
      if (e.radiusX === void 0 || e.radiusY === void 0)
        throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
      if (e.radiusX === 0 || e.radiusY === 0)
        return;
      let i = (_a27 = e.start) != null ? _a27 : 0, s = (_b2 = e.end) != null ? _b2 : 360, a = nt((_c2 = e.anchor) != null ? _c2 : "center").scale(new E(-e.radiusX, -e.radiusY)), o = Le(a, e.radiusX, e.radiusY, i, s, e.resolution);
      o.unshift(a);
      let l = Object.assign({}, e, __spreadValues({ pts: o, radius: 0 }, e.gradient ? { colors: [e.gradient[0], ...Array(o.length - 1).fill(e.gradient[1])] } : {}));
      if (s - i >= 360 && e.outline) {
        e.fill !== false && ue(Object.assign(l, { outline: null })), ue(Object.assign(l, { pts: o.slice(1), fill: false }));
        return;
      }
      ue(l);
    }
    __name(j, "j");
    n(j, "drawEllipse");
    function ue(e) {
      var _a27, _b2;
      if (!e.pts)
        throw new Error('drawPolygon() requires property "pts".');
      let i = e.pts.length;
      if (!(i < 3)) {
        if (ae(), _(e.pos), De(e.scale), re(e.angle), _(e.offset), e.fill !== false) {
          let s = (_a27 = e.color) != null ? _a27 : $.WHITE, a = e.pts.map((l, p) => {
            var _a28;
            return { pos: new E(l.x, l.y), uv: new E(0, 0), color: e.colors && e.colors[p] ? e.colors[p].mult(s) : s, opacity: (_a28 = e.opacity) != null ? _a28 : 1 };
          }), o = [...Array(i - 2).keys()].map((l) => [0, l + 1, l + 2]).flat();
          et(a, (_b2 = e.indices) != null ? _b2 : o, e.fixed, y.defTex, e.shader, e.uniform);
        }
        e.outline && V({ pts: [...e.pts, e.pts[0]], radius: e.radius, width: e.outline.width, color: e.outline.color, join: e.outline.join, uniform: e.uniform, fixed: e.fixed, opacity: e.opacity }), se();
      }
    }
    __name(ue, "ue");
    n(ue, "drawPolygon");
    function Ee(e, i, s) {
      Pe(), S.clear(S.STENCIL_BUFFER_BIT), S.enable(S.STENCIL_TEST), S.stencilFunc(S.NEVER, 1, 255), S.stencilOp(S.REPLACE, S.REPLACE, S.REPLACE), i(), Pe(), S.stencilFunc(s, 1, 255), S.stencilOp(S.KEEP, S.KEEP, S.KEEP), e(), Pe(), S.disable(S.STENCIL_TEST);
    }
    __name(Ee, "Ee");
    n(Ee, "drawStenciled");
    function Ut(e, i) {
      Ee(e, i, S.EQUAL);
    }
    __name(Ut, "Ut");
    n(Ut, "drawMasked");
    function Lt(e, i) {
      Ee(e, i, S.NOTEQUAL);
    }
    __name(Lt, "Lt");
    n(Lt, "drawSubtracted");
    function Te() {
      return (y.viewport.width + y.viewport.height) / (y.width + y.height);
    }
    __name(Te, "Te");
    n(Te, "getViewportScale");
    function Se(e) {
      Pe();
      let i = y.width, s = y.height;
      y.width = y.viewport.width, y.height = y.viewport.height, e(), Pe(), y.width = i, y.height = s;
    }
    __name(Se, "Se");
    n(Se, "drawUnscaled");
    function Er(e, i) {
      i.pos && (e.pos = e.pos.add(i.pos)), i.scale && (e.scale = e.scale.scale(M(i.scale))), i.angle && (e.angle += i.angle), i.color && e.ch.length === 1 && (e.color = e.color.mult(i.color)), i.opacity && (e.opacity *= i.opacity);
    }
    __name(Er, "Er");
    n(Er, "applyCharTransform");
    let hi = new RegExp("\\[(?<style>\\w+)\\](?<text>.*?)\\[\\/\\k<style>\\]", "g");
    function li(e) {
      let i = {}, s = e.replace(hi, "$2"), a = 0;
      for (let o of e.matchAll(hi)) {
        let l = o.index - a;
        for (let p = 0; p < o.groups.text.length; p++)
          i[p + l] = [o.groups.style];
        a += o[0].length - o.groups.text.length;
      }
      return { charStyleMap: i, text: s };
    }
    __name(li, "li");
    n(li, "compileStyledText");
    let Sr = {};
    function Qe(e) {
      var _a27, _b2, _c2, _d, _e2, _f, _g, _h, _i2, _j, _k;
      if (e.text === void 0)
        throw new Error('formatText() requires property "text".');
      let i = ct(e.font);
      if (e.text === "" || i instanceof Be || !i)
        return { width: 0, height: 0, chars: [], opt: e };
      let { charStyleMap: s, text: a } = li(e.text + ""), o = Ws(a);
      if (i instanceof ve || typeof i == "string") {
        let Q = i instanceof ve ? i.fontface.family : i, z2 = i instanceof ve ? { outline: i.outline, filter: i.filter } : { outline: null, filter: Kr }, O = (_a27 = Sr[Q]) != null ? _a27 : { font: { tex: new ot(K, Ps, Bs, { filter: z2.filter }), map: {}, size: gr }, cursor: new E(0), outline: z2.outline };
        Sr[Q] || (Sr[Q] = O), i = O.font;
        for (let ce of o)
          if (!O.font.map[ce]) {
            let x = Y;
            x.clearRect(0, 0, C.width, C.height), x.font = `${i.size}px ${Q}`, x.textBaseline = "top", x.textAlign = "left", x.fillStyle = "#ffffff";
            let F = x.measureText(ce), I = Math.ceil(F.width), k2 = i.size;
            O.outline && (x.lineJoin = "round", x.lineWidth = O.outline.width * 2, x.strokeStyle = O.outline.color.toHex(), x.strokeText(ce, O.outline.width, O.outline.width), I += O.outline.width * 2, k2 += O.outline.width * 3), x.fillText(ce, (_c2 = (_b2 = O.outline) == null ? void 0 : _b2.width) != null ? _c2 : 0, (_e2 = (_d = O.outline) == null ? void 0 : _d.width) != null ? _e2 : 0);
            let J = x.getImageData(0, 0, I, k2);
            if (O.cursor.x + I > Ps && (O.cursor.x = 0, O.cursor.y += k2, O.cursor.y > Bs))
              throw new Error("Font atlas exceeds character limit");
            i.tex.update(J, O.cursor.x, O.cursor.y), i.map[ce] = new pe(O.cursor.x, O.cursor.y, I, k2), O.cursor.x += I;
          }
      }
      let l = e.size || i.size, p = M((_f = e.scale) != null ? _f : 1).scale(l / i.size), w = (_g = e.lineSpacing) != null ? _g : 0, g = (_h = e.letterSpacing) != null ? _h : 0, u = 0, m = 0, P = 0, T = [], L = [], G = 0, D = null, N = null;
      for (; G < o.length; ) {
        let Q = o[G];
        if (Q === `
`)
          P += l + w, T.push({ width: u - g, chars: L }), D = null, N = null, u = 0, L = [];
        else {
          let z2 = i.map[Q];
          if (z2) {
            let O = z2.w * p.x;
            e.width && u + O > e.width && (P += l + w, D != null && (G -= L.length - D, Q = o[G], z2 = i.map[Q], O = z2.w * p.x, L = L.slice(0, D - 1), u = N), D = null, N = null, T.push({ width: u - g, chars: L }), u = 0, L = []), L.push({ tex: i.tex, width: z2.w, height: z2.h, quad: new pe(z2.x / i.tex.width, z2.y / i.tex.height, z2.w / i.tex.width, z2.h / i.tex.height), ch: Q, pos: new E(u, P), opacity: (_i2 = e.opacity) != null ? _i2 : 1, color: (_j = e.color) != null ? _j : $.WHITE, scale: M(p), angle: 0 }), Q === " " && (D = L.length, N = u), u += O, m = Math.max(m, u), u += g;
          }
        }
        G++;
      }
      T.push({ width: u - g, chars: L }), P += l, e.width && (m = e.width);
      let be = [];
      for (let Q of T) {
        let z2 = (m - Q.width) * fn((_k = e.align) != null ? _k : "left");
        for (let O of Q.chars) {
          let ce = i.map[O.ch], x = be.length;
          if (O.pos = O.pos.add(z2, 0).add(ce.w * p.x * 0.5, ce.h * p.y * 0.5), e.transform) {
            let F = typeof e.transform == "function" ? e.transform(x, O.ch) : e.transform;
            F && Er(O, F);
          }
          if (s[x]) {
            let F = s[x];
            for (let I of F) {
              let k2 = e.styles[I], J = typeof k2 == "function" ? k2(x, O.ch) : k2;
              J && Er(O, J);
            }
          }
          be.push(O);
        }
      }
      return { width: m, height: P, chars: be, opt: e };
    }
    __name(Qe, "Qe");
    n(Qe, "formatText");
    function br(e) {
      ze(Qe(e));
    }
    __name(br, "br");
    n(br, "drawText");
    function ze(e) {
      var _a27;
      ae(), _(e.opt.pos), re(e.opt.angle), _(nt((_a27 = e.opt.anchor) != null ? _a27 : "topleft").add(1, 1).scale(e.width, e.height).scale(-0.5)), e.chars.forEach((i) => {
        Ce({ tex: i.tex, width: i.width, height: i.height, pos: i.pos, scale: i.scale, angle: i.angle, color: i.color, opacity: i.opacity, quad: i.quad, anchor: "center", uniform: e.opt.uniform, shader: e.opt.shader, fixed: e.opt.fixed });
      }), se();
    }
    __name(ze, "ze");
    n(ze, "drawFormattedText");
    function we() {
      return y.width;
    }
    __name(we, "we");
    n(we, "width");
    function Ae() {
      return y.height;
    }
    __name(Ae, "Ae");
    n(Ae, "height");
    function ui(e) {
      return new E((e.x - y.viewport.x) * we() / y.viewport.width, (e.y - y.viewport.y) * Ae() / y.viewport.height);
    }
    __name(ui, "ui");
    n(ui, "windowToContent");
    function di(e) {
      return new E(e.x * y.viewport.width / y.width, e.y * y.viewport.height / y.height);
    }
    __name(di, "di");
    n(di, "contentToView");
    function Gt() {
      return ui(A.mousePos());
    }
    __name(Gt, "Gt");
    n(Gt, "mousePos");
    let ci = false, ie = { inspect: false, timeScale: 1, showLog: true, fps: () => A.fps(), numFrames: () => A.numFrames(), stepFrame: Nr, drawCalls: () => y.lastDrawCalls, clearLog: () => b.logs = [], log: (e) => {
      var _a27;
      let i = (_a27 = r.logMax) != null ? _a27 : $n;
      b.logs.unshift({ msg: e, time: A.time() }), b.logs.length > i && (b.logs = b.logs.slice(0, i));
    }, error: (e) => ie.log(new Error(e.toString ? e.toString() : e)), curRecording: null, numObjects: () => Dr("*", { recursive: true }).length, get paused() {
      return ci;
    }, set paused(e) {
      ci = e, e ? ee.ctx.suspend() : ee.ctx.resume();
    } };
    function Fe() {
      return A.dt() * ie.timeScale;
    }
    __name(Fe, "Fe");
    n(Fe, "dt");
    function fi(...e) {
      return e.length > 0 && (b.cam.pos = M(...e)), b.cam.pos ? b.cam.pos.clone() : Kt();
    }
    __name(fi, "fi");
    n(fi, "camPos");
    function pi(...e) {
      return e.length > 0 && (b.cam.scale = M(...e)), b.cam.scale.clone();
    }
    __name(pi, "pi");
    n(pi, "camScale");
    function gi(e) {
      return e !== void 0 && (b.cam.angle = e), b.cam.angle;
    }
    __name(gi, "gi");
    n(gi, "camRot");
    function mi(e = 12) {
      b.cam.shake += e;
    }
    __name(mi, "mi");
    n(mi, "shake");
    function Rr(e) {
      return b.cam.transform.multVec2(e);
    }
    __name(Rr, "Rr");
    n(Rr, "toScreen");
    function Mr(e) {
      return b.cam.transform.invert().multVec2(e);
    }
    __name(Mr, "Mr");
    n(Mr, "toWorld");
    function Ot(e) {
      let i = new ke();
      return e.pos && i.translate(e.pos), e.scale && i.scale(e.scale), e.angle && i.rotate(e.angle), e.parent ? i.mult(e.parent.transform) : i;
    }
    __name(Ot, "Ot");
    n(Ot, "calcTransform");
    function sr(e = []) {
      let i = /* @__PURE__ */ new Map(), s = {}, a = new Jt(), o = [], l = null, p = false, w = { id: kn(), hidden: false, transform: new ke(), children: [], parent: null, set paused(u) {
        if (u !== p) {
          p = u;
          for (let m of o)
            m.paused = u;
        }
      }, get paused() {
        return p;
      }, add(u = []) {
        let m = Array.isArray(u) ? sr(u) : u;
        if (m.parent)
          throw new Error("Cannot add a game obj that already has a parent.");
        return m.parent = this, m.transform = Ot(m), this.children.push(m), m.trigger("add", m), b.events.trigger("add", m), m;
      }, readd(u) {
        let m = this.children.indexOf(u);
        return m !== -1 && (this.children.splice(m, 1), this.children.push(u)), u;
      }, remove(u) {
        let m = this.children.indexOf(u);
        if (m !== -1) {
          u.parent = null, this.children.splice(m, 1);
          let P = n((T) => {
            T.trigger("destroy"), b.events.trigger("destroy", T), T.children.forEach((L) => P(L));
          }, "trigger");
          P(u);
        }
      }, removeAll(u) {
        if (u)
          this.get(u).forEach((m) => this.remove(m));
        else
          for (let m of [...this.children])
            this.remove(m);
      }, update() {
        this.paused || (this.children.sort((u, m) => {
          var _a27, _b2;
          return ((_a27 = u.z) != null ? _a27 : 0) - ((_b2 = m.z) != null ? _b2 : 0);
        }).forEach((u) => u.update()), this.trigger("update"));
      }, draw() {
        if (this.hidden)
          return;
        this.canvas && this.canvas.bind();
        let u = y.fixed;
        this.fixed && (y.fixed = true), ae(), _(this.pos), De(this.scale), re(this.angle);
        let m = this.children.sort((P, T) => {
          var _a27, _b2;
          return ((_a27 = P.z) != null ? _a27 : 0) - ((_b2 = T.z) != null ? _b2 : 0);
        });
        if (this.mask) {
          let P = { intersect: Ut, subtract: Lt }[this.mask];
          if (!P)
            throw new Error(`Invalid mask func: "${this.mask}"`);
          P(() => {
            m.forEach((T) => T.draw());
          }, () => {
            this.trigger("draw");
          });
        } else
          this.trigger("draw"), m.forEach((P) => P.draw());
        se(), y.fixed = u, this.canvas && this.canvas.unbind();
      }, drawInspect() {
        this.hidden || (ae(), _(this.pos), De(this.scale), re(this.angle), this.children.sort((u, m) => {
          var _a27, _b2;
          return ((_a27 = u.z) != null ? _a27 : 0) - ((_b2 = m.z) != null ? _b2 : 0);
        }).forEach((u) => u.drawInspect()), this.trigger("drawInspect"), se());
      }, use(u) {
        if (!u)
          return;
        if (typeof u == "string")
          return this.use({ id: u });
        let m = [];
        u.id && (this.unuse(u.id), s[u.id] = [], m = s[u.id], i.set(u.id, u));
        for (let T in u) {
          if (oo.has(T))
            continue;
          let L = Object.getOwnPropertyDescriptor(u, T);
          if (typeof L.value == "function" && (u[T] = u[T].bind(this)), L.set && Object.defineProperty(u, T, { set: L.set.bind(this) }), L.get && Object.defineProperty(u, T, { get: L.get.bind(this) }), ao.has(T)) {
            let G = T === "add" ? () => {
              l = n((D) => m.push(D), "onCurCompCleanup"), u[T](), l = null;
            } : u[T];
            m.push(this.on(T, G).cancel);
          } else if (this[T] === void 0)
            Object.defineProperty(this, T, { get: () => u[T], set: (G) => u[T] = G, configurable: true, enumerable: true }), m.push(() => delete this[T]);
          else
            throw new Error(`Duplicate component property: "${T}"`);
        }
        let P = n(() => {
          if (u.require) {
            for (let T of u.require)
              if (!this.c(T))
                throw new Error(`Component "${u.id}" requires component "${T}"`);
          }
        }, "checkDeps");
        u.destroy && m.push(u.destroy.bind(this)), this.exists() ? (P(), u.add && (l = n((T) => m.push(T), "onCurCompCleanup"), u.add.call(this), l = null)) : u.require && m.push(this.on("add", P).cancel);
      }, unuse(u) {
        s[u] && (s[u].forEach((m) => m()), delete s[u]), i.has(u) && i.delete(u);
      }, c(u) {
        return i.get(u);
      }, get(u, m = {}) {
        let P = m.recursive ? this.children.flatMap(n(/* @__PURE__ */ __name(function T(L) {
          return [L, ...L.children.flatMap(T)];
        }, "T"), "recurse")) : this.children;
        if (P = P.filter((T) => u ? T.is(u) : true), m.liveUpdate) {
          let T = n((G) => m.recursive ? this.isAncestorOf(G) : G.parent === this, "isChild"), L = [];
          L.push(Pr((G) => {
            T(G) && G.is(u) && P.push(G);
          })), L.push(wi((G) => {
            if (T(G) && G.is(u)) {
              let D = P.findIndex((N) => N.id === G.id);
              D !== -1 && P.splice(D, 1);
            }
          })), this.onDestroy(() => {
            for (let G of L)
              G.cancel();
          });
        }
        return P;
      }, isAncestorOf(u) {
        return u.parent ? u.parent === this || this.isAncestorOf(u.parent) : false;
      }, exists() {
        return b.root.isAncestorOf(this);
      }, is(u) {
        if (u === "*")
          return true;
        if (Array.isArray(u)) {
          for (let m of u)
            if (!this.c(m))
              return false;
          return true;
        } else
          return this.c(u) != null;
      }, on(u, m) {
        let P = a.on(u, m.bind(this));
        return l && l(() => P.cancel()), P;
      }, trigger(u, ...m) {
        a.trigger(u, ...m), b.objEvents.trigger(u, this, ...m);
      }, destroy() {
        this.parent && this.parent.remove(this);
      }, inspect() {
        let u = {};
        for (let [m, P] of i)
          u[m] = P.inspect ? P.inspect() : null;
        return u;
      }, onAdd(u) {
        return this.on("add", u);
      }, onUpdate(u) {
        return this.on("update", u);
      }, onDraw(u) {
        return this.on("draw", u);
      }, onDestroy(u) {
        return this.on("destroy", u);
      }, clearEvents() {
        a.clear();
      } }, g = ["onKeyPress", "onKeyPressRepeat", "onKeyDown", "onKeyRelease", "onMousePress", "onMouseDown", "onMouseRelease", "onMouseMove", "onCharInput", "onMouseMove", "onTouchStart", "onTouchMove", "onTouchEnd", "onScroll", "onGamepadButtonPress", "onGamepadButtonDown", "onGamepadButtonRelease", "onGamepadStick"];
      for (let u of g)
        w[u] = (...m) => {
          let P = A[u](...m);
          return o.push(P), w.onDestroy(() => P.cancel()), P;
        };
      for (let u of e)
        w.use(u);
      return w;
    }
    __name(sr, "sr");
    n(sr, "make");
    function Ge(e, i, s) {
      return b.objEvents[e] || (b.objEvents[e] = new js()), b.objEvents.on(e, (a, ...o) => {
        a.is(i) && s(a, ...o);
      });
    }
    __name(Ge, "Ge");
    n(Ge, "on");
    let gn = Re((e) => {
      let i = jt([{ update: e }]);
      return { get paused() {
        return i.paused;
      }, set paused(s) {
        i.paused = s;
      }, cancel: () => i.destroy() };
    }, (e, i) => Ge("update", e, i)), mn = Re((e) => {
      let i = jt([{ draw: e }]);
      return { get paused() {
        return i.hidden;
      }, set paused(s) {
        i.hidden = s;
      }, cancel: () => i.destroy() };
    }, (e, i) => Ge("draw", e, i)), Pr = Re((e) => b.events.on("add", e), (e, i) => Ge("add", e, i)), wi = Re((e) => b.events.on("destroy", e), (e, i) => Ge("destroy", e, i));
    function Ai(e, i, s) {
      return Ge("collide", e, (a, o, l) => o.is(i) && s(a, o, l));
    }
    __name(Ai, "Ai");
    n(Ai, "onCollide");
    function Vi(e, i, s) {
      return Ge("collideUpdate", e, (a, o, l) => o.is(i) && s(a, o, l));
    }
    __name(Vi, "Vi");
    n(Vi, "onCollideUpdate");
    function vi(e, i, s) {
      return Ge("collideEnd", e, (a, o, l) => o.is(i) && s(a, o, l));
    }
    __name(vi, "vi");
    n(vi, "onCollideEnd");
    function qt(e, i) {
      Dr(e, { recursive: true }).forEach(i), Pr(e, i);
    }
    __name(qt, "qt");
    n(qt, "forAllCurrentAndFuture");
    let wn = Re((e) => A.onMousePress(e), (e, i) => {
      let s = [];
      return qt(e, (a) => {
        if (!a.area)
          throw new Error("onClick() requires the object to have area() component");
        s.push(a.onClick(() => i(a)));
      }), vt.join(s);
    });
    function yi(e, i) {
      let s = [];
      return qt(e, (a) => {
        if (!a.area)
          throw new Error("onHover() requires the object to have area() component");
        s.push(a.onHover(() => i(a)));
      }), vt.join(s);
    }
    __name(yi, "yi");
    n(yi, "onHover");
    function xi(e, i) {
      let s = [];
      return qt(e, (a) => {
        if (!a.area)
          throw new Error("onHoverUpdate() requires the object to have area() component");
        s.push(a.onHoverUpdate(() => i(a)));
      }), vt.join(s);
    }
    __name(xi, "xi");
    n(xi, "onHoverUpdate");
    function Ei(e, i) {
      let s = [];
      return qt(e, (a) => {
        if (!a.area)
          throw new Error("onHoverEnd() requires the object to have area() component");
        s.push(a.onHoverEnd(() => i(a)));
      }), vt.join(s);
    }
    __name(Ei, "Ei");
    n(Ei, "onHoverEnd");
    function Si(e) {
      b.gravity = e;
    }
    __name(Si, "Si");
    n(Si, "setGravity");
    function bi() {
      return b.gravity;
    }
    __name(bi, "bi");
    n(bi, "getGravity");
    function Ri(...e) {
      e.length === 1 || e.length === 2 ? (y.bgColor = W(e[0]), e[1] && (y.bgAlpha = e[1])) : (e.length === 3 || e.length === 4) && (y.bgColor = W(e[0], e[1], e[2]), e[3] && (y.bgAlpha = e[3])), S.clearColor(y.bgColor.r / 255, y.bgColor.g / 255, y.bgColor.b / 255, y.bgAlpha);
    }
    __name(Ri, "Ri");
    n(Ri, "setBackground");
    function Mi() {
      return y.bgColor.clone();
    }
    __name(Mi, "Mi");
    n(Mi, "getBackground");
    function Ht(...e) {
      return { id: "pos", pos: M(...e), moveBy(...i) {
        this.pos = this.pos.add(M(...i));
      }, move(...i) {
        this.moveBy(M(...i).scale(Fe()));
      }, moveTo(...i) {
        if (typeof i[0] == "number" && typeof i[1] == "number")
          return this.moveTo(M(i[0], i[1]), i[2]);
        let s = i[0], a = i[1];
        if (a === void 0) {
          this.pos = M(s);
          return;
        }
        let o = s.sub(this.pos);
        if (o.len() <= a * Fe()) {
          this.pos = M(s);
          return;
        }
        this.move(o.unit().scale(a));
      }, worldPos() {
        return this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
      }, screenPos() {
        let i = this.worldPos();
        return At(this) ? i : Rr(i);
      }, inspect() {
        return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
      }, drawInspect() {
        q({ color: W(255, 0, 0), radius: 4 / Te() });
      } };
    }
    __name(Ht, "Ht");
    n(Ht, "pos");
    function Yt(...e) {
      return e.length === 0 ? Yt(1) : { id: "scale", scale: M(...e), scaleTo(...i) {
        this.scale = M(...i);
      }, scaleBy(...i) {
        this.scale.scale(M(...i));
      }, inspect() {
        return `(${wt(this.scale.x, 2)}, ${wt(this.scale.y, 2)})`;
      } };
    }
    __name(Yt, "Yt");
    n(Yt, "scale");
    function Pi(e) {
      return { id: "rotate", angle: e != null ? e : 0, rotateBy(i) {
        this.angle += i;
      }, rotateTo(i) {
        this.angle = i;
      }, inspect() {
        return `${Math.round(this.angle)}`;
      } };
    }
    __name(Pi, "Pi");
    n(Pi, "rotate");
    function Bi(...e) {
      return { id: "color", color: W(...e), inspect() {
        return this.color.toString();
      } };
    }
    __name(Bi, "Bi");
    n(Bi, "color");
    function wt(e, i) {
      return Number(e.toFixed(i));
    }
    __name(wt, "wt");
    n(wt, "toFixed");
    function Ti(e) {
      return { id: "opacity", opacity: e != null ? e : 1, inspect() {
        return `${wt(this.opacity, 1)}`;
      }, fadeOut(i = 1, s = cr.linear) {
        return Cr(this.opacity, 0, i, (a) => this.opacity = a, s);
      } };
    }
    __name(Ti, "Ti");
    n(Ti, "opacity");
    function nr(e) {
      if (!e)
        throw new Error("Please define an anchor");
      return { id: "anchor", anchor: e, inspect() {
        return typeof this.anchor == "string" ? this.anchor : this.anchor.toString();
      } };
    }
    __name(nr, "nr");
    n(nr, "anchor");
    function Fi(e) {
      return { id: "z", z: e, inspect() {
        return `${this.z}`;
      } };
    }
    __name(Fi, "Fi");
    n(Fi, "z");
    function Ii(e, i) {
      return { id: "follow", require: ["pos"], follow: { obj: e, offset: i != null ? i : M(0) }, add() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      }, update() {
        e.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
      } };
    }
    __name(Ii, "Ii");
    n(Ii, "follow");
    function Di(e, i) {
      let s = typeof e == "number" ? E.fromAngle(e) : e.unit();
      return { id: "move", require: ["pos"], update() {
        this.move(s.scale(i));
      } };
    }
    __name(Di, "Di");
    n(Di, "move");
    let An = 200;
    function Ci(e = {}) {
      var _a27;
      let i = (_a27 = e.distance) != null ? _a27 : An, s = false;
      return { id: "offscreen", require: ["pos"], isOffScreen() {
        let a = this.screenPos(), o = new Ve(M(0), we(), Ae());
        return !_t(o, a) && o.sdistToPoint(a) > i * i;
      }, onExitScreen(a) {
        return this.on("exitView", a);
      }, onEnterScreen(a) {
        return this.on("enterView", a);
      }, update() {
        this.isOffScreen() ? (s || (this.trigger("exitView"), s = true), e.hide && (this.hidden = true), e.pause && (this.paused = true), e.destroy && this.destroy()) : (s && (this.trigger("enterView"), s = false), e.hide && (this.hidden = false), e.pause && (this.paused = false));
      } };
    }
    __name(Ci, "Ci");
    n(Ci, "offscreen");
    function At(e) {
      return e.fixed ? true : e.parent ? At(e.parent) : false;
    }
    __name(At, "At");
    n(At, "isFixed");
    function ki(e = {}) {
      var _a27, _b2, _c2, _d;
      let i = {}, s = /* @__PURE__ */ new Set();
      return { id: "area", collisionIgnore: (_a27 = e.collisionIgnore) != null ? _a27 : [], add() {
        this.area.cursor && this.onHover(() => A.setCursor(this.area.cursor)), this.onCollideUpdate((a, o) => {
          i[a.id] || this.trigger("collide", a, o), i[a.id] = o, s.add(a.id);
        });
      }, update() {
        for (let a in i)
          s.has(Number(a)) || (this.trigger("collideEnd", i[a].target), delete i[a]);
        s.clear();
      }, drawInspect() {
        let a = this.localArea();
        ae(), De(this.area.scale), _(this.area.offset);
        let o = { outline: { width: 4 / Te(), color: W(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: At(this) };
        a instanceof Ve ? me(__spreadProps(__spreadValues({}, o), { pos: a.pos, width: a.width, height: a.height })) : a instanceof zt ? ue(__spreadProps(__spreadValues({}, o), { pts: a.pts })) : a instanceof vs && q(__spreadProps(__spreadValues({}, o), { pos: a.center, radius: a.radius })), se();
      }, area: { shape: (_b2 = e.shape) != null ? _b2 : null, scale: e.scale ? M(e.scale) : M(1), offset: (_c2 = e.offset) != null ? _c2 : M(0), cursor: (_d = e.cursor) != null ? _d : null }, isClicked() {
        return A.isMousePressed() && this.isHovering();
      }, isHovering() {
        let a = At(this) ? Gt() : Mr(Gt());
        return this.hasPoint(a);
      }, checkCollision(a) {
        var _a28;
        return (_a28 = i[a.id]) != null ? _a28 : null;
      }, getCollisions() {
        return Object.values(i);
      }, isColliding(a) {
        return !!i[a.id];
      }, isOverlapping(a) {
        let o = i[a.id];
        return o && o.hasOverlap();
      }, onClick(a) {
        let o = A.onMousePress("left", () => {
          this.isHovering() && a();
        });
        return this.onDestroy(() => o.cancel()), o;
      }, onHover(a) {
        let o = false;
        return this.onUpdate(() => {
          o ? o = this.isHovering() : this.isHovering() && (o = true, a());
        });
      }, onHoverUpdate(a) {
        return this.onUpdate(() => {
          this.isHovering() && a();
        });
      }, onHoverEnd(a) {
        let o = false;
        return this.onUpdate(() => {
          o ? this.isHovering() || (o = false, a()) : o = this.isHovering();
        });
      }, onCollide(a, o) {
        if (typeof a == "function" && o === void 0)
          return this.on("collide", a);
        if (typeof a == "string")
          return this.onCollide((l, p) => {
            l.is(a) && o(l, p);
          });
      }, onCollideUpdate(a, o) {
        if (typeof a == "function" && o === void 0)
          return this.on("collideUpdate", a);
        if (typeof a == "string")
          return this.on("collideUpdate", (l, p) => l.is(a) && o(l, p));
      }, onCollideEnd(a, o) {
        if (typeof a == "function" && o === void 0)
          return this.on("collideEnd", a);
        if (typeof a == "string")
          return this.on("collideEnd", (l) => l.is(a) && o(l));
      }, hasPoint(a) {
        return oi(this.worldArea(), a);
      }, resolveCollision(a) {
        let o = this.checkCollision(a);
        o && !o.resolved && (this.pos = this.pos.add(o.displacement), o.resolved = true);
      }, localArea() {
        return this.area.shape ? this.area.shape : this.renderArea();
      }, worldArea() {
        var _a28;
        let a = this.localArea();
        if (!(a instanceof zt || a instanceof Ve))
          throw new Error("Only support polygon and rect shapes for now");
        let o = this.transform.clone().scale(M((_a28 = this.area.scale) != null ? _a28 : 1)).translate(this.area.offset);
        if (a instanceof Ve) {
          let l = nt(this.anchor || fr).add(1, 1).scale(-0.5).scale(a.width, a.height);
          o.translate(l);
        }
        return a.transform(o);
      }, screenArea() {
        let a = this.worldArea();
        return At(this) ? a : a.transform(b.cam.transform);
      } };
    }
    __name(ki, "ki");
    n(ki, "area");
    function Je(e) {
      return { color: e.color, opacity: e.opacity, anchor: e.anchor, outline: e.outline, shader: e.shader, uniform: e.uniform };
    }
    __name(Je, "Je");
    n(Je, "getRenderProps");
    function or(e, i = {}) {
      var _a27, _b2, _c2;
      let s = null, a = null, o = null, l = new Ie();
      if (!e)
        throw new Error("Please pass the resource name or data to sprite()");
      let p = n((w, g, u, m) => {
        let P = M(1, 1);
        return u && m ? (P.x = u / (w.width * g.w), P.y = m / (w.height * g.h)) : u ? (P.x = u / (w.width * g.w), P.y = P.x) : m && (P.y = m / (w.height * g.h), P.x = P.y), P;
      }, "calcTexScale");
      return { id: "sprite", width: 0, height: 0, frame: i.frame || 0, quad: i.quad || new pe(0, 0, 1, 1), animSpeed: (_a27 = i.animSpeed) != null ? _a27 : 1, flipX: (_b2 = i.flipX) != null ? _b2 : false, flipY: (_c2 = i.flipY) != null ? _c2 : false, draw() {
        var _a28, _b3, _c3;
        if (!s)
          return;
        let w = s.frames[(_a28 = this.frame) != null ? _a28 : 0];
        if (!w)
          throw new Error(`Frame not found: ${(_b3 = this.frame) != null ? _b3 : 0}`);
        if (s.slice9) {
          let { left: g, right: u, top: m, bottom: P } = s.slice9, T = s.tex.width * w.w, L = s.tex.height * w.h, G = this.width - g - u, D = this.height - m - P, N = g / T, be = u / T, Q = 1 - N - be, z2 = m / L, O = P / L, ce = 1 - z2 - O, x = [oe(0, 0, N, z2), oe(N, 0, Q, z2), oe(N + Q, 0, be, z2), oe(0, z2, N, ce), oe(N, z2, Q, ce), oe(N + Q, z2, be, ce), oe(0, z2 + ce, N, O), oe(N, z2 + ce, Q, O), oe(N + Q, z2 + ce, be, O), oe(0, 0, g, m), oe(g, 0, G, m), oe(g + G, 0, u, m), oe(0, m, g, D), oe(g, m, G, D), oe(g + G, m, u, D), oe(0, m + D, g, P), oe(g, m + D, G, P), oe(g + G, m + D, u, P)];
          for (let F = 0; F < 9; F++) {
            let I = x[F], k2 = x[F + 9];
            je(Object.assign(Je(this), { pos: k2.pos(), tex: s.tex, quad: w.scale(I), flipX: this.flipX, flipY: this.flipY, tiled: i.tiled, width: k2.w, height: k2.h }));
          }
        } else
          je(Object.assign(Je(this), { tex: s.tex, quad: w.scale((_c3 = this.quad) != null ? _c3 : new pe(0, 0, 1, 1)), flipX: this.flipX, flipY: this.flipY, tiled: i.tiled, width: this.width, height: this.height }));
      }, add() {
        let w = n((u) => {
          let m = u.frames[0].clone();
          i.quad && (m = m.scale(i.quad));
          let P = p(u.tex, m, i.width, i.height);
          this.width = u.tex.width * m.w * P.x, this.height = u.tex.height * m.h * P.y, i.anim && this.play(i.anim), s = u, l.trigger(s);
        }, "setSpriteData"), g = _e(e);
        g ? g.onLoad(w) : hr(() => w(_e(e).data));
      }, update() {
        if (!a)
          return;
        let w = s.anims[a.name];
        if (typeof w == "number") {
          this.frame = w;
          return;
        }
        if (w.speed === 0)
          throw new Error("Sprite anim speed cannot be 0");
        a.timer += Fe() * this.animSpeed, a.timer >= 1 / a.speed && (a.timer = 0, this.frame += o, (this.frame < Math.min(w.from, w.to) || this.frame > Math.max(w.from, w.to)) && (a.loop ? a.pingpong ? (this.frame -= o, o *= -1, this.frame += o) : this.frame = w.from : (this.frame = w.to, a.onEnd(), this.stop())));
      }, play(w, g = {}) {
        var _a28, _b3, _c3, _d, _e2, _f, _g;
        if (!s) {
          l.add(() => this.play(w, g));
          return;
        }
        let u = s.anims[w];
        if (u === void 0)
          throw new Error(`Anim not found: ${w}`);
        a && this.stop(), a = typeof u == "number" ? { name: w, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: () => {
        } } : { name: w, timer: 0, loop: (_b3 = (_a28 = g.loop) != null ? _a28 : u.loop) != null ? _b3 : false, pingpong: (_d = (_c3 = g.pingpong) != null ? _c3 : u.pingpong) != null ? _d : false, speed: (_f = (_e2 = g.speed) != null ? _e2 : u.speed) != null ? _f : 10, onEnd: (_g = g.onEnd) != null ? _g : () => {
        } }, o = typeof u == "number" ? null : u.from < u.to ? 1 : -1, this.frame = typeof u == "number" ? u : u.from, this.trigger("animStart", w);
      }, stop() {
        if (!a)
          return;
        let w = a.name;
        a = null, this.trigger("animEnd", w);
      }, numFrames() {
        var _a28;
        return (_a28 = s == null ? void 0 : s.frames.length) != null ? _a28 : 0;
      }, curAnim() {
        return a == null ? void 0 : a.name;
      }, onAnimEnd(w) {
        return this.on("animEnd", w);
      }, onAnimStart(w) {
        return this.on("animStart", w);
      }, renderArea() {
        return new Ve(M(0), this.width, this.height);
      }, inspect() {
        if (typeof e == "string")
          return `"${e}"`;
      } };
    }
    __name(or, "or");
    n(or, "sprite");
    function Ni(e, i = {}) {
      var _a27, _b2;
      function s(o) {
        var _a28, _b3;
        let l = Qe(Object.assign(Je(o), { text: o.text + "", size: o.textSize, font: o.font, width: i.width && o.width, align: o.align, letterSpacing: o.letterSpacing, lineSpacing: o.lineSpacing, transform: o.textTransform, styles: o.textStyles }));
        return i.width || (o.width = l.width / (((_a28 = o.scale) == null ? void 0 : _a28.x) || 1)), o.height = l.height / (((_b3 = o.scale) == null ? void 0 : _b3.y) || 1), l;
      }
      __name(s, "s");
      n(s, "update");
      let a = { id: "text", set text(o) {
        e = o, s(this);
      }, get text() {
        return e;
      }, textSize: (_a27 = i.size) != null ? _a27 : Zn, font: i.font, width: (_b2 = i.width) != null ? _b2 : 0, height: 0, align: i.align, lineSpacing: i.lineSpacing, letterSpacing: i.letterSpacing, textTransform: i.transform, textStyles: i.styles, add() {
        hr(() => s(this));
      }, draw() {
        ze(s(this));
      }, renderArea() {
        return new Ve(M(0), this.width, this.height);
      } };
      return s(a), a;
    }
    __name(Ni, "Ni");
    n(Ni, "text");
    function Ui(e, i = {}) {
      if (e.length < 3)
        throw new Error(`Polygon's need more than two points, ${e.length} points provided`);
      return { id: "polygon", pts: e, colors: i.colors, radius: i.radius, draw() {
        ue(Object.assign(Je(this), { pts: this.pts, colors: this.colors, radius: this.radius, fill: i.fill }));
      }, renderArea() {
        return new zt(this.pts);
      }, inspect() {
        return this.pts.map((s) => `[${s.x},${s.y}]`).join(",");
      } };
    }
    __name(Ui, "Ui");
    n(Ui, "polygon");
    function Li(e, i, s = {}) {
      return { id: "rect", width: e, height: i, radius: s.radius || 0, draw() {
        me(Object.assign(Je(this), { width: this.width, height: this.height, radius: this.radius, fill: s.fill }));
      }, renderArea() {
        return new Ve(M(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    __name(Li, "Li");
    n(Li, "rect");
    function Gi(e, i) {
      return { id: "rect", width: e, height: i, draw() {
        Ce(Object.assign(Je(this), { width: this.width, height: this.height }));
      }, renderArea() {
        return new Ve(M(0), this.width, this.height);
      }, inspect() {
        return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
      } };
    }
    __name(Gi, "Gi");
    n(Gi, "uvquad");
    function Oi(e, i = {}) {
      return { id: "circle", radius: e, draw() {
        q(Object.assign(Je(this), { radius: this.radius, fill: i.fill }));
      }, renderArea() {
        return new Ve(new E(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
      }, inspect() {
        return `${Math.ceil(this.radius)}`;
      } };
    }
    __name(Oi, "Oi");
    n(Oi, "circle");
    function qi(e = 1, i = W(0, 0, 0)) {
      return { id: "outline", outline: { width: e, color: i } };
    }
    __name(qi, "qi");
    n(qi, "outline");
    function ar() {
      return { id: "timer", wait(e, i) {
        let s = [];
        i && s.push(i);
        let a = 0, o = this.onUpdate(() => {
          a += Fe(), a >= e && (s.forEach((l) => l()), o.cancel());
        });
        return { get paused() {
          return o.paused;
        }, set paused(l) {
          o.paused = l;
        }, cancel: o.cancel, onEnd(l) {
          s.push(l);
        }, then(l) {
          return this.onEnd(l), this;
        } };
      }, loop(e, i) {
        let s = null, a = n(() => {
          s = this.wait(e, a), i();
        }, "newAction");
        return s = this.wait(0, a), { get paused() {
          return s.paused;
        }, set paused(o) {
          s.paused = o;
        }, cancel: () => s.cancel() };
      }, tween(e, i, s, a, o = cr.linear) {
        let l = 0, p = [], w = this.onUpdate(() => {
          l += Fe();
          let g = Math.min(l / s, 1);
          a(Ye(e, i, o(g))), g === 1 && (w.cancel(), a(i), p.forEach((u) => u()));
        });
        return { get paused() {
          return w.paused;
        }, set paused(g) {
          w.paused = g;
        }, onEnd(g) {
          p.push(g);
        }, then(g) {
          return this.onEnd(g), this;
        }, cancel() {
          w.cancel();
        }, finish() {
          w.cancel(), a(i), p.forEach((g) => g());
        } };
      } };
    }
    __name(ar, "ar");
    n(ar, "timer");
    let Vn = 640, vn = 65536;
    function Hi(e = {}) {
      var _a27, _b2, _c2, _d;
      let i = null, s = null, a = false;
      return { id: "body", require: ["pos", "area"], vel: new E(0), jumpForce: (_a27 = e.jumpForce) != null ? _a27 : Vn, gravityScale: (_b2 = e.gravityScale) != null ? _b2 : 1, isStatic: (_c2 = e.isStatic) != null ? _c2 : false, mass: (_d = e.mass) != null ? _d : 1, add() {
        if (this.mass === 0)
          throw new Error("Can't set body mass to 0");
        this.onCollideUpdate((o, l) => {
          if (o.is("body") && !l.resolved && (this.trigger("beforePhysicsResolve", l), o.trigger("beforePhysicsResolve", l.reverse()), !l.resolved && !(this.isStatic && o.isStatic))) {
            if (!this.isStatic && !o.isStatic) {
              let p = this.mass + o.mass;
              this.pos = this.pos.add(l.displacement.scale(o.mass / p)), o.pos = o.pos.add(l.displacement.scale(-this.mass / p)), this.transform = Ot(this), o.transform = Ot(o);
            } else {
              let p = !this.isStatic && o.isStatic ? l : l.reverse();
              p.source.pos = p.source.pos.add(p.displacement), p.source.transform = Ot(p.source);
            }
            l.resolved = true, this.trigger("physicsResolve", l), o.trigger("physicsResolve", l.reverse());
          }
        }), this.onPhysicsResolve((o) => {
          b.gravity && (o.isBottom() && this.isFalling() ? (this.vel.y = 0, i = o.target, s = o.target.pos, a ? a = false : this.trigger("ground", i)) : o.isTop() && this.isJumping() && (this.vel.y = 0, this.trigger("headbutt", o.target)));
        });
      }, update() {
        var _a28;
        if (!b.gravity || this.isStatic)
          return;
        if (a && (i = null, s = null, this.trigger("fallOff"), a = false), i)
          if (!this.isColliding(i) || !i.exists() || !i.is("body"))
            a = true;
          else {
            !i.pos.eq(s) && e.stickToPlatform !== false && this.moveBy(i.pos.sub(s)), s = i.pos;
            return;
          }
        let o = this.vel.y;
        this.vel.y += b.gravity * this.gravityScale * Fe(), this.vel.y = Math.min(this.vel.y, (_a28 = e.maxVelocity) != null ? _a28 : vn), o < 0 && this.vel.y >= 0 && this.trigger("fall"), this.move(this.vel);
      }, onPhysicsResolve(o) {
        return this.on("physicsResolve", o);
      }, onBeforePhysicsResolve(o) {
        return this.on("beforePhysicsResolve", o);
      }, curPlatform() {
        return i;
      }, isGrounded() {
        return i !== null;
      }, isFalling() {
        return this.vel.y > 0;
      }, isJumping() {
        return this.vel.y < 0;
      }, jump(o) {
        i = null, s = null, this.vel.y = -o || -this.jumpForce;
      }, onGround(o) {
        return this.on("ground", o);
      }, onFall(o) {
        return this.on("fall", o);
      }, onFallOff(o) {
        return this.on("fallOff", o);
      }, onHeadbutt(o) {
        return this.on("headbutt", o);
      } };
    }
    __name(Hi, "Hi");
    n(Hi, "body");
    function Yi(e = 2) {
      let i = e;
      return { id: "doubleJump", require: ["body"], numJumps: e, add() {
        this.onGround(() => {
          i = this.numJumps;
        });
      }, doubleJump(s) {
        i <= 0 || (i < this.numJumps && this.trigger("doubleJump"), i--, this.jump(s));
      }, onDoubleJump(s) {
        return this.on("doubleJump", s);
      }, inspect() {
        return `${i}`;
      } };
    }
    __name(Yi, "Yi");
    n(Yi, "doubleJump");
    function Ki(e, i) {
      return __spreadValues({ id: "shader", shader: e }, typeof i == "function" ? { uniform: i(), update() {
        this.uniform = i();
      } } : { uniform: i });
    }
    __name(Ki, "Ki");
    n(Ki, "shader");
    function ji() {
      return { id: "fixed", fixed: true };
    }
    __name(ji, "ji");
    n(ji, "fixed");
    function Br(e) {
      return { id: "stay", stay: true, scenesToStay: e };
    }
    __name(Br, "Br");
    n(Br, "stay");
    function Qi(e, i) {
      if (e == null)
        throw new Error("health() requires the initial amount of hp");
      return { id: "health", hurt(s = 1) {
        this.setHP(e - s), this.trigger("hurt", s);
      }, heal(s = 1) {
        let a = e;
        this.setHP(e + s), this.trigger("heal", e - a);
      }, hp() {
        return e;
      }, maxHP() {
        return i != null ? i : null;
      }, setMaxHP(s) {
        i = s;
      }, setHP(s) {
        e = i ? Math.min(i, s) : s, e <= 0 && this.trigger("death");
      }, onHurt(s) {
        return this.on("hurt", s);
      }, onHeal(s) {
        return this.on("heal", s);
      }, onDeath(s) {
        return this.on("death", s);
      }, inspect() {
        return `${e}`;
      } };
    }
    __name(Qi, "Qi");
    n(Qi, "health");
    function zi(e, i = {}) {
      var _a27;
      if (e == null)
        throw new Error("lifespan() requires time");
      let s = (_a27 = i.fade) != null ? _a27 : 0;
      return { id: "lifespan", add() {
        return __async(this, null, function* () {
          yield as(e), s > 0 && this.opacity && (yield Cr(this.opacity, 0, s, (a) => this.opacity = a, cr.linear)), this.destroy();
        });
      } };
    }
    __name(zi, "zi");
    n(zi, "lifespan");
    function Ji(e, i, s) {
      if (!e)
        throw new Error("state() requires an initial state");
      let a = {};
      function o(g) {
        a[g] || (a[g] = { enter: new Ie(), end: new Ie(), update: new Ie(), draw: new Ie() });
      }
      __name(o, "o");
      n(o, "initStateEvents");
      function l(g, u, m) {
        return o(u), a[u][g].add(m);
      }
      __name(l, "l");
      n(l, "on");
      function p(g, u, ...m) {
        o(u), a[u][g].trigger(...m);
      }
      __name(p, "p");
      n(p, "trigger");
      let w = false;
      return { id: "state", state: e, enterState(g, ...u) {
        if (w = true, i && !i.includes(g))
          throw new Error(`State not found: ${g}`);
        let m = this.state;
        if (s) {
          if (!(s == null ? void 0 : s[m]))
            return;
          let P = typeof s[m] == "string" ? [s[m]] : s[m];
          if (!P.includes(g))
            throw new Error(`Cannot transition state from "${m}" to "${g}". Available transitions: ${P.map((T) => `"${T}"`).join(", ")}`);
        }
        p("end", m, ...u), this.state = g, p("enter", g, ...u), p("enter", `${m} -> ${g}`, ...u);
      }, onStateTransition(g, u, m) {
        return l("enter", `${g} -> ${u}`, m);
      }, onStateEnter(g, u) {
        return l("enter", g, u);
      }, onStateUpdate(g, u) {
        return l("update", g, u);
      }, onStateDraw(g, u) {
        return l("draw", g, u);
      }, onStateEnd(g, u) {
        return l("end", g, u);
      }, update() {
        w || (p("enter", e), w = true), p("update", this.state);
      }, draw() {
        p("draw", this.state);
      }, inspect() {
        return this.state;
      } };
    }
    __name(Ji, "Ji");
    n(Ji, "state");
    function Xi(e = 1) {
      let i = 0, s = false;
      return { require: ["opacity"], add() {
        this.opacity = 0;
      }, update() {
        s || (i += Fe(), this.opacity = We(i, 0, e, 0, 1), i >= e && (this.opacity = 1, s = true));
      } };
    }
    __name(Xi, "Xi");
    n(Xi, "fadeIn");
    function Wi(e = "intersect") {
      return { id: "mask", mask: e };
    }
    __name(Wi, "Wi");
    n(Wi, "mask");
    function Zi(e) {
      return { add() {
        this.canvas = e;
      } };
    }
    __name(Zi, "Zi");
    n(Zi, "drawon");
    function hr(e) {
      U.loaded ? e() : b.events.on("load", e);
    }
    __name(hr, "hr");
    n(hr, "onLoad");
    function _i(e, i) {
      b.scenes[e] = i;
    }
    __name(_i, "_i");
    n(_i, "scene");
    function $i(e, ...i) {
      if (!b.scenes[e])
        throw new Error(`Scene not found: ${e}`);
      b.events.onOnce("frameEnd", () => {
        b.events.trigger("sceneLeave", e), A.events.clear(), b.events.clear(), b.objEvents.clear(), [...b.root.children].forEach((s) => {
          (!s.stay || s.scenesToStay && !s.scenesToStay.includes(e)) && b.root.remove(s);
        }), b.root.clearEvents(), Or(), b.cam = { pos: null, scale: M(1), angle: 0, shake: 0, transform: new ke() }, b.scenes[e](...i);
      });
    }
    __name($i, "$i");
    n($i, "go");
    function es(e) {
      return b.events.on("sceneLeave", e);
    }
    __name(es, "es");
    n(es, "onSceneLeave");
    function ts(e, i) {
      try {
        return JSON.parse(window.localStorage[e]);
      } catch (e2) {
        return i ? (Tr(e, i), i) : null;
      }
    }
    __name(ts, "ts");
    n(ts, "getData");
    function Tr(e, i) {
      window.localStorage[e] = JSON.stringify(i);
    }
    __name(Tr, "Tr");
    n(Tr, "setData");
    function Fr(e, ...i) {
      let s = e(it), a;
      typeof s == "function" ? a = s(...i)(it) : a = s;
      for (let o in a)
        it[o] = a[o], r.global !== false && (window[o] = a[o]);
      return it;
    }
    __name(Fr, "Fr");
    n(Fr, "plug");
    function Kt() {
      return M(we() / 2, Ae() / 2);
    }
    __name(Kt, "Kt");
    n(Kt, "center");
    let yn;
    ((e) => (e[e.None = 0] = "None", e[e.Left = 1] = "Left", e[e.Top = 2] = "Top", e[e.LeftTop = 3] = "LeftTop", e[e.Right = 4] = "Right", e[e.Horizontal = 5] = "Horizontal", e[e.RightTop = 6] = "RightTop", e[e.HorizontalTop = 7] = "HorizontalTop", e[e.Bottom = 8] = "Bottom", e[e.LeftBottom = 9] = "LeftBottom", e[e.Vertical = 10] = "Vertical", e[e.LeftVertical = 11] = "LeftVertical", e[e.RightBottom = 12] = "RightBottom", e[e.HorizontalBottom = 13] = "HorizontalBottom", e[e.RightVertical = 14] = "RightVertical", e[e.All = 15] = "All"))(yn || (yn = {}));
    function Ir(e = {}) {
      var _a27, _b2, _c2, _d;
      let i = M(0), s = (_a27 = e.isObstacle) != null ? _a27 : false, a = (_b2 = e.cost) != null ? _b2 : 0, o = (_c2 = e.edges) != null ? _c2 : [], l = n(() => {
        let w = { left: 1, top: 2, right: 4, bottom: 8 };
        return o.map((g) => w[g] || 0).reduce((g, u) => g | u, 0);
      }, "getEdgeMask"), p = l();
      return { id: "tile", tilePosOffset: (_d = e.offset) != null ? _d : M(0), set tilePos(w) {
        let g = this.getLevel();
        i = w.clone(), this.pos = M(this.tilePos.x * g.tileWidth(), this.tilePos.y * g.tileHeight()).add(this.tilePosOffset);
      }, get tilePos() {
        return i;
      }, set isObstacle(w) {
        s !== w && (s = w, this.getLevel().invalidateNavigationMap());
      }, get isObstacle() {
        return s;
      }, set cost(w) {
        a !== w && (a = w, this.getLevel().invalidateNavigationMap());
      }, get cost() {
        return a;
      }, set edges(w) {
        o = w, p = l(), this.getLevel().invalidateNavigationMap();
      }, get edges() {
        return o;
      }, get edgeMask() {
        return p;
      }, getLevel() {
        return this.parent;
      }, moveLeft() {
        this.tilePos = this.tilePos.add(M(-1, 0));
      }, moveRight() {
        this.tilePos = this.tilePos.add(M(1, 0));
      }, moveUp() {
        this.tilePos = this.tilePos.add(M(0, -1));
      }, moveDown() {
        this.tilePos = this.tilePos.add(M(0, 1));
      } };
    }
    __name(Ir, "Ir");
    n(Ir, "tile");
    function rs(e, i) {
      var _a27;
      if (!i.tileWidth || !i.tileHeight)
        throw new Error("Must provide tileWidth and tileHeight.");
      let s = jt([Ht((_a27 = i.pos) != null ? _a27 : M(0))]), a = e.length, o = 0, l = null, p = null, w = null, g = null, u = n((x) => x.x + x.y * o, "tile2Hash"), m = n((x) => M(Math.floor(x % o), Math.floor(x / o)), "hash2Tile"), P = n(() => {
        l = [];
        for (let x of s.children)
          T(x);
      }, "createSpatialMap"), T = n((x) => {
        let F = u(x.tilePos);
        l[F] ? l[F].push(x) : l[F] = [x];
      }, "insertIntoSpatialMap"), L = n((x) => {
        let F = u(x.tilePos);
        if (l[F]) {
          let I = l[F].indexOf(x);
          I >= 0 && l[F].splice(I, 1);
        }
      }, "removeFromSpatialMap"), G = n(() => {
        let x = false;
        for (let F of s.children) {
          let I = s.pos2Tile(F.pos);
          (F.tilePos.x != I.x || F.tilePos.y != I.y) && (x = true, L(F), F.tilePos.x = I.x, F.tilePos.y = I.y, T(F));
        }
        x && s.trigger("spatial_map_changed");
      }, "updateSpatialMap"), D = n(() => {
        let x = s.getSpatialMap(), F = s.numRows() * s.numColumns();
        p ? p.length = F : p = new Array(F), p.fill(1, 0, F);
        for (let I = 0; I < x.length; I++) {
          let k2 = x[I];
          if (k2) {
            let J = 0;
            for (let Z of k2)
              if (Z.isObstacle) {
                J = 1 / 0;
                break;
              } else
                J += Z.cost;
            p[I] = J || 1;
          }
        }
      }, "createCostMap"), N = n(() => {
        let x = s.getSpatialMap(), F = s.numRows() * s.numColumns();
        w ? w.length = F : w = new Array(F), w.fill(15, 0, F);
        for (let I = 0; I < x.length; I++) {
          let k2 = x[I];
          if (k2) {
            let J = k2.length, Z = 15;
            for (let ne = 0; ne < J; ne++)
              Z |= k2[ne].edgeMask;
            w[I] = Z;
          }
        }
      }, "createEdgeMap"), be = n(() => {
        let x = s.numRows() * s.numColumns(), F = n((k2, J) => {
          let Z = [];
          for (Z.push(k2); Z.length > 0; ) {
            let ne = Z.pop();
            O(ne).forEach((fe) => {
              g[fe] < 0 && (g[fe] = J, Z.push(fe));
            });
          }
        }, "traverse");
        g ? g.length = x : g = new Array(x), g.fill(-1, 0, x);
        let I = 0;
        for (let k2 = 0; k2 < p.length; k2++) {
          if (g[k2] >= 0) {
            I++;
            continue;
          }
          F(k2, I), I++;
        }
      }, "createConnectivityMap"), Q = n((x, F) => p[F], "getCost"), z2 = n((x, F) => {
        let I = m(x), k2 = m(F);
        return I.dist(k2);
      }, "getHeuristic"), O = n((x, F) => {
        let I = [], k2 = Math.floor(x % o), J = k2 > 0 && w[x] & 1 && p[x - 1] !== 1 / 0, Z = x >= o && w[x] & 2 && p[x - o] !== 1 / 0, ne = k2 < o - 1 && w[x] & 4 && p[x + 1] !== 1 / 0, fe = x < o * a - o - 1 && w[x] & 8 && p[x + o] !== 1 / 0;
        return F ? (J && (Z && I.push(x - o - 1), I.push(x - 1), fe && I.push(x + o - 1)), Z && I.push(x - o), ne && (Z && I.push(x - o + 1), I.push(x + 1), fe && I.push(x + o + 1)), fe && I.push(x + o)) : (J && I.push(x - 1), Z && I.push(x - o), ne && I.push(x + 1), fe && I.push(x + o)), I;
      }, "getNeighbours"), ce = { id: "level", tileWidth() {
        return i.tileWidth;
      }, tileHeight() {
        return i.tileHeight;
      }, spawn(x, ...F) {
        let I = M(...F), k2 = (() => {
          if (typeof x == "string") {
            if (i.tiles[x]) {
              if (typeof i.tiles[x] != "function")
                throw new Error("Level symbol def must be a function returning a component list");
              return i.tiles[x](I);
            } else if (i.wildcardTile)
              return i.wildcardTile(x, I);
          } else {
            if (Array.isArray(x))
              return x;
            throw new Error("Expected a symbol or a component list");
          }
        })();
        if (!k2)
          return null;
        let J = false, Z = false;
        for (let fe of k2)
          fe.id === "tile" && (Z = true), fe.id === "pos" && (J = true);
        J || k2.push(Ht()), Z || k2.push(Ir());
        let ne = s.add(k2);
        return J && (ne.tilePosOffset = ne.pos.clone()), ne.tilePos = I, l && (T(ne), this.trigger("spatial_map_changed"), this.trigger("navigation_map_invalid")), ne;
      }, numColumns() {
        return o;
      }, numRows() {
        return a;
      }, levelWidth() {
        return o * this.tileWidth();
      }, levelHeight() {
        return a * this.tileHeight();
      }, tile2Pos(...x) {
        return M(...x).scale(this.tileWidth(), this.tileHeight());
      }, pos2Tile(...x) {
        let F = M(...x);
        return M(Math.floor(F.x / this.tileWidth()), Math.floor(F.y / this.tileHeight()));
      }, getSpatialMap() {
        return l || P(), l;
      }, onSpatialMapChanged(x) {
        return this.on("spatial_map_changed", x);
      }, onNavigationMapInvalid(x) {
        return this.on("navigation_map_invalid", x);
      }, getAt(x) {
        l || P();
        let F = u(x);
        return l[F] || [];
      }, update() {
        l && G();
      }, invalidateNavigationMap() {
        p = null, w = null, g = null;
      }, onNavigationMapChanged(x) {
        return this.on("navigation_map_changed", x);
      }, getTilePath(x, F, I = {}) {
        var _a28;
        if (p || D(), w || N(), g || be(), x.x < 0 || x.x >= o || x.y < 0 || x.y >= a || F.x < 0 || F.x >= o || F.y < 0 || F.y >= a)
          return null;
        let k2 = u(x), J = u(F);
        if (p[J] === 1 / 0)
          return null;
        if (k2 === J)
          return [];
        if (g[k2] != -1 && g[k2] !== g[J])
          return null;
        let Z = new Un((Oe, Hr) => Oe.cost < Hr.cost);
        Z.insert({ cost: 0, node: k2 });
        let ne = /* @__PURE__ */ new Map();
        ne.set(k2, k2);
        let fe = /* @__PURE__ */ new Map();
        for (fe.set(k2, 0); Z.length !== 0; ) {
          let Oe = (_a28 = Z.remove()) == null ? void 0 : _a28.node;
          if (Oe === J)
            break;
          let Hr = O(Oe, I.allowDiagonals);
          for (let st of Hr) {
            let Yr = (fe.get(Oe) || 0) + Q(Oe, st) + z2(st, J);
            (!fe.has(st) || Yr < fe.get(st)) && (fe.set(st, Yr), Z.insert({ cost: Yr, node: st }), ne.set(st, Oe));
          }
        }
        let qr = [], Qt = J, Mn = m(Qt);
        for (qr.push(Mn); Qt !== k2; ) {
          Qt = ne.get(Qt);
          let Oe = m(Qt);
          qr.push(Oe);
        }
        return qr.reverse();
      }, getPath(x, F, I = {}) {
        let k2 = this.tileWidth(), J = this.tileHeight(), Z = this.getTilePath(this.pos2Tile(x), this.pos2Tile(F), I);
        return Z ? [x, ...Z.slice(1, -1).map((ne) => ne.scale(k2, J).add(k2 / 2, J / 2)), F] : null;
      } };
      return s.use(ce), s.onNavigationMapInvalid(() => {
        s.invalidateNavigationMap(), s.trigger("navigation_map_changed");
      }), e.forEach((x, F) => {
        let I = x.split("");
        o = Math.max(I.length, o), I.forEach((k2, J) => {
          s.spawn(k2, M(J, F));
        });
      }), s;
    }
    __name(rs, "rs");
    n(rs, "addLevel");
    function is(e = {}) {
      var _a27, _b2;
      let i = null, s = null, a = null, o = null;
      return { id: "agent", require: ["pos", "tile"], agentSpeed: (_a27 = e.speed) != null ? _a27 : 100, allowDiagonals: (_b2 = e.allowDiagonals) != null ? _b2 : true, getDistanceToTarget() {
        return i ? this.pos.dist(i) : 0;
      }, getNextLocation() {
        return s && a ? s[a] : null;
      }, getPath() {
        return s ? s.slice() : null;
      }, getTarget() {
        return i;
      }, isNavigationFinished() {
        return s ? a === null : true;
      }, isTargetReachable() {
        return s !== null;
      }, isTargetReached() {
        return i ? this.pos.eq(i) : true;
      }, setTarget(l) {
        i = l, s = this.getLevel().getPath(this.pos, i, { allowDiagonals: this.allowDiagonals }), a = s ? 0 : null, s ? (o || (o = this.getLevel().onNavigationMapChanged(() => {
          s && a !== null && (s = this.getLevel().getPath(this.pos, i, { allowDiagonals: this.allowDiagonals }), a = s ? 0 : null, s ? this.trigger("navigation-next", this, s[a]) : this.trigger("navigation-ended", this));
        }), this.onDestroy(() => o.cancel())), this.trigger("navigation-started", this), this.trigger("navigation-next", this, s[a])) : this.trigger("navigation-ended", this);
      }, update() {
        if (s && a !== null) {
          if (this.pos.sdist(s[a]) < 2)
            if (a === s.length - 1) {
              this.pos = i.clone(), a = null, this.trigger("navigation-ended", this), this.trigger("target-reached", this);
              return;
            } else
              a++, this.trigger("navigation-next", this, s[a]);
          this.moveTo(s[a], this.agentSpeed);
        }
      }, onNavigationStarted(l) {
        return this.on("navigation-started", l);
      }, onNavigationNext(l) {
        return this.on("navigation-next", l);
      }, onNavigationEnded(l) {
        return this.on("navigation-ended", l);
      }, onTargetReached(l) {
        return this.on("target-reached", l);
      }, inspect() {
        return JSON.stringify({ target: JSON.stringify(i), path: JSON.stringify(s) });
      } };
    }
    __name(is, "is");
    n(is, "agent");
    function ss(e) {
      let i = A.canvas.captureStream(e), s = ee.ctx.createMediaStreamDestination();
      ee.masterNode.connect(s);
      let a = new MediaRecorder(i), o = [];
      return a.ondataavailable = (l) => {
        l.data.size > 0 && o.push(l.data);
      }, a.onerror = () => {
        ee.masterNode.disconnect(s), i.getTracks().forEach((l) => l.stop());
      }, a.start(), { resume() {
        a.resume();
      }, pause() {
        a.pause();
      }, stop() {
        return a.stop(), ee.masterNode.disconnect(s), i.getTracks().forEach((l) => l.stop()), new Promise((l) => {
          a.onstop = () => {
            l(new Blob(o, { type: "video/mp4" }));
          };
        });
      }, download(l = "kaboom.mp4") {
        this.stop().then((p) => ei(l, p));
      } };
    }
    __name(ss, "ss");
    n(ss, "record");
    function ns() {
      return document.activeElement === A.canvas;
    }
    __name(ns, "ns");
    n(ns, "isFocused");
    function os(e) {
      e.destroy();
    }
    __name(os, "os");
    n(os, "destroy");
    let jt = b.root.add.bind(b.root), xn = b.root.readd.bind(b.root), En = b.root.removeAll.bind(b.root), Dr = b.root.get.bind(b.root), as = b.root.wait.bind(b.root), Sn = b.root.loop.bind(b.root), Cr = b.root.tween.bind(b.root);
    function kr(e = 2, i = 1) {
      let s = 0;
      return { require: ["scale"], update() {
        let a = Math.sin(s * e) * i;
        a < 0 && this.destroy(), this.scale = M(a), s += Fe();
      } };
    }
    __name(kr, "kr");
    n(kr, "boom");
    let bn = Ue(null, zn), Rn = Ue(null, Jn);
    function hs(e, i = {}) {
      var _a27, _b2;
      let s = jt([Ht(e), Br()]), a = (i.speed || 1) * 5, o = i.scale || 1;
      s.add([or(Rn), Yt(0), nr("center"), kr(a, o), ...(_a27 = i.comps) != null ? _a27 : []]);
      let l = s.add([or(bn), Yt(0), nr("center"), ar(), ...(_b2 = i.comps) != null ? _b2 : []]);
      return l.wait(0.4 / a, () => l.use(kr(a, o))), l.onDestroy(() => s.destroy()), s;
    }
    __name(hs, "hs");
    n(hs, "addKaboom");
    function Nr() {
      b.root.update();
    }
    __name(Nr, "Nr");
    n(Nr, "updateFrame");
    const _Ur = class {
      constructor(i, s, a, o = false) {
        __publicField(this, "source");
        __publicField(this, "target");
        __publicField(this, "displacement");
        __publicField(this, "resolved", false);
        this.source = i, this.target = s, this.displacement = a, this.resolved = o;
      }
      reverse() {
        return new _Ur(this.target, this.source, this.displacement.scale(-1), this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.x > 0;
      }
      isRight() {
        return this.displacement.x < 0;
      }
      isTop() {
        return this.displacement.y > 0;
      }
      isBottom() {
        return this.displacement.y < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    };
    let Ur = _Ur;
    __name(Ur, "Ur");
    (() => {
      n(_Ur, "Collision");
    })();
    function ls() {
      let e = {}, i = r.hashGridSize || _n, s = new ke(), a = [];
      function o(l) {
        if (a.push(s.clone()), l.pos && s.translate(l.pos), l.scale && s.scale(l.scale), l.angle && s.rotate(l.angle), l.transform = s.clone(), l.c("area") && !l.paused) {
          let p = l, w = p.worldArea().bbox(), g = Math.floor(w.pos.x / i), u = Math.floor(w.pos.y / i), m = Math.ceil((w.pos.x + w.width) / i), P = Math.ceil((w.pos.y + w.height) / i), T = /* @__PURE__ */ new Set();
          for (let L = g; L <= m; L++)
            for (let G = u; G <= P; G++)
              if (!e[L])
                e[L] = {}, e[L][G] = [p];
              else if (!e[L][G])
                e[L][G] = [p];
              else {
                let D = e[L][G];
                e:
                  for (let N of D) {
                    if (N.paused || !N.exists() || T.has(N.id))
                      continue;
                    for (let Q of p.collisionIgnore)
                      if (N.is(Q))
                        continue e;
                    for (let Q of N.collisionIgnore)
                      if (p.is(Q))
                        continue e;
                    let be = Ks(p.worldArea(), N.worldArea());
                    if (be) {
                      let Q = new Ur(p, N, be);
                      p.trigger("collideUpdate", N, Q);
                      let z2 = Q.reverse();
                      z2.resolved = Q.resolved, N.trigger("collideUpdate", p, z2);
                    }
                    T.add(N.id);
                  }
                D.push(p);
              }
        }
        l.children.forEach(o), s = a.pop();
      }
      __name(o, "o");
      n(o, "checkObj"), o(b.root);
    }
    __name(ls, "ls");
    n(ls, "checkFrame");
    function us() {
      var _a27;
      let e = b.cam, i = E.fromAngle(Zt(0, 360)).scale(e.shake);
      e.shake = Ye(e.shake, 0, 5 * Fe()), e.transform = new ke().translate(Kt()).scale(e.scale).rotate(e.angle).translate(((_a27 = e.pos) != null ? _a27 : Kt()).scale(-1).add(i)), b.root.draw(), Pe();
    }
    __name(us, "us");
    n(us, "drawFrame");
    function ds() {
      let e = H();
      b.events.numListeners("loading") > 0 ? b.events.trigger("loading", e) : Se(() => {
        let i = we() / 2, s = 24, a = M(we() / 2, Ae() / 2).sub(M(i / 2, s / 2));
        me({ pos: M(0), width: we(), height: Ae(), color: W(0, 0, 0) }), me({ pos: a, width: i, height: s, fill: false, outline: { width: 4 } }), me({ pos: a, width: i * e, height: s });
      });
    }
    __name(ds, "ds");
    n(ds, "drawLoadScreen");
    function Lr(e, i) {
      Se(() => {
        let s = M(8);
        ae(), _(e);
        let a = Qe({ text: i, font: pr, size: 16, pos: s, color: W(255, 255, 255), fixed: true }), o = a.width + s.x * 2, l = a.height + s.x * 2;
        e.x + o >= we() && _(M(-o, 0)), e.y + l >= Ae() && _(M(0, -l)), me({ width: o, height: l, color: W(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), ze(a), se();
      });
    }
    __name(Lr, "Lr");
    n(Lr, "drawInspectText");
    function cs() {
      if (ie.inspect) {
        let e = null;
        for (let i of b.root.get("*", { recursive: true }))
          if (i.c("area") && i.isHovering()) {
            e = i;
            break;
          }
        if (b.root.drawInspect(), e) {
          let i = [], s = e.inspect();
          for (let a in s)
            s[a] ? i.push(`${a}: ${s[a]}`) : i.push(`${a}`);
          Lr(di(Gt()), i.join(`
`));
        }
        Lr(M(8), `FPS: ${ie.fps()}`);
      }
      ie.paused && Se(() => {
        ae(), _(we(), 0), _(-8, 8);
        let e = 32;
        me({ width: e, height: e, anchor: "topright", color: W(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let i = 1; i <= 2; i++)
          me({ width: 4, height: e * 0.6, anchor: "center", pos: M(-e / 3 * i, e * 0.5), color: W(255, 255, 255), radius: 2, fixed: true });
        se();
      }), ie.timeScale !== 1 && Se(() => {
        ae(), _(we(), Ae()), _(-8, -8);
        let e = 8, i = Qe({ text: ie.timeScale.toFixed(1), font: pr, size: 16, color: W(255, 255, 255), pos: M(-e), anchor: "botright", fixed: true });
        me({ width: i.width + e * 2 + e * 4, height: i.height + e * 2, anchor: "botright", color: W(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
        for (let s = 0; s < 2; s++) {
          let a = ie.timeScale < 1;
          R({ p1: M(-i.width - e * (a ? 2 : 3.5), -e), p2: M(-i.width - e * (a ? 2 : 3.5), -e - i.height), p3: M(-i.width - e * (a ? 3.5 : 2), -e - i.height / 2), pos: M(-s * e * 1 + (a ? -e * 0.5 : 0), 0), color: W(255, 255, 255), fixed: true });
        }
        ze(i), se();
      }), ie.curRecording && Se(() => {
        ae(), _(0, Ae()), _(24, -24), q({ radius: 12, color: W(255, 0, 0), opacity: Jr(0, 1, A.time() * 4), fixed: true }), se();
      }), ie.showLog && b.logs.length > 0 && Se(() => {
        var _a27;
        ae(), _(0, Ae()), _(8, -8);
        let e = 8, i = [];
        for (let a of b.logs) {
          let o = "", l = a.msg instanceof Error ? "error" : "info";
          o += `[time]${a.time.toFixed(2)}[/time]`, o += " ", o += `[${l}]${((_a27 = a.msg) == null ? void 0 : _a27.toString) ? a.msg.toString() : a.msg}[/${l}]`, i.push(o);
        }
        b.logs = b.logs.filter((a) => A.time() - a.time < (r.logTime || eo));
        let s = Qe({ text: i.join(`
`), font: pr, pos: M(e, -e), anchor: "botleft", size: 16, width: we() * 0.6, lineSpacing: e / 2, fixed: true, styles: { time: { color: W(127, 127, 127) }, info: { color: W(255, 255, 255) }, error: { color: W(255, 0, 127) } } });
        me({ width: s.width + e * 2, height: s.height + e * 2, anchor: "botleft", color: W(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), ze(s), se();
      });
    }
    __name(cs, "cs");
    n(cs, "drawDebug");
    function fs(e) {
      b.events.on("loading", e);
    }
    __name(fs, "fs");
    n(fs, "onLoading");
    function ps(e) {
      A.onResize(e);
    }
    __name(ps, "ps");
    n(ps, "onResize");
    function gs(e) {
      b.events.on("error", e);
    }
    __name(gs, "gs");
    n(gs, "onError");
    function ms(e) {
      console.error(e), ee.ctx.suspend(), A.run(() => {
        tt(), Se(() => {
          let i = we(), s = Ae(), a = { size: 36, width: i - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: pr, fixed: true };
          me({ width: i, height: s, color: W(0, 0, 255), fixed: true });
          let o = Qe(__spreadProps(__spreadValues({}, a), { text: "Error", pos: M(32), color: W(255, 128, 0), fixed: true }));
          ze(o), br(__spreadProps(__spreadValues({}, a), { text: e.message, pos: M(32, 32 + o.height + 16), fixed: true })), se(), b.events.trigger("error", e);
        }), rt();
      });
    }
    __name(ms, "ms");
    n(ms, "handleErr");
    function ws(e) {
      te.push(e);
    }
    __name(ws, "ws");
    n(ws, "onCleanup");
    function As() {
      b.events.onOnce("frameEnd", () => {
        A.quit(), S.clear(S.COLOR_BUFFER_BIT | S.DEPTH_BUFFER_BIT | S.STENCIL_BUFFER_BIT);
        let e = S.getParameter(S.MAX_TEXTURE_IMAGE_UNITS);
        for (let i = 0; i < e; i++)
          S.activeTexture(S.TEXTURE0 + i), S.bindTexture(S.TEXTURE_2D, null), S.bindTexture(S.TEXTURE_CUBE_MAP, null);
        S.bindBuffer(S.ARRAY_BUFFER, null), S.bindBuffer(S.ELEMENT_ARRAY_BUFFER, null), S.bindRenderbuffer(S.RENDERBUFFER, null), S.bindFramebuffer(S.FRAMEBUFFER, null), K.destroy(), te.forEach((i) => i());
      });
    }
    __name(As, "As");
    n(As, "quit");
    let lr = true;
    A.run(() => {
      try {
        U.loaded || H() === 1 && !lr && (U.loaded = true, b.events.trigger("load")), !U.loaded && r.loadingScreen !== false || lr ? (tt(), ds(), rt()) : (ie.paused || Nr(), ls(), tt(), us(), r.debug !== false && cs(), rt()), lr && (lr = false), b.events.trigger("frameEnd");
      } catch (e) {
        ms(e);
      }
    });
    function Gr() {
      let e = B, i = S.drawingBufferWidth / e, s = S.drawingBufferHeight / e;
      if (r.letterbox) {
        if (!r.width || !r.height)
          throw new Error("Letterboxing requires width and height defined.");
        let a = i / s, o = r.width / r.height;
        if (a > o) {
          let l = s * o, p = (i - l) / 2;
          y.viewport = { x: p, y: 0, width: l, height: s };
        } else {
          let l = i / o, p = (s - l) / 2;
          y.viewport = { x: 0, y: p, width: i, height: l };
        }
        return;
      }
      if (r.stretch && (!r.width || !r.height))
        throw new Error("Stretching requires width and height defined.");
      y.viewport = { x: 0, y: 0, width: i, height: s };
    }
    __name(Gr, "Gr");
    n(Gr, "updateViewport");
    function Or() {
      A.onHide(() => {
        r.backgroundAudio || ee.ctx.suspend();
      }), A.onShow(() => {
        !r.backgroundAudio && !ie.paused && ee.ctx.resume();
      }), A.onResize(() => {
        if (A.isFullscreen())
          return;
        let e = r.width && r.height;
        e && !r.stretch && !r.letterbox || (h.width = h.offsetWidth * B, h.height = h.offsetHeight * B, Gr(), e || (y.frameBuffer.free(), y.frameBuffer = new ur(K, S.drawingBufferWidth, S.drawingBufferHeight), y.width = S.drawingBufferWidth / B, y.height = S.drawingBufferHeight / B));
      }), r.debug !== false && (A.onKeyPress("f1", () => ie.inspect = !ie.inspect), A.onKeyPress("f2", () => ie.clearLog()), A.onKeyPress("f8", () => ie.paused = !ie.paused), A.onKeyPress("f7", () => {
        ie.timeScale = wt(He(ie.timeScale - 0.2, 0, 2), 1);
      }), A.onKeyPress("f9", () => {
        ie.timeScale = wt(He(ie.timeScale + 0.2, 0, 2), 1);
      }), A.onKeyPress("f10", () => ie.stepFrame())), r.burp && A.onKeyPress("b", () => pt());
    }
    __name(Or, "Or");
    n(Or, "initEvents"), Gr(), Or();
    let it = { VERSION: Xn, loadRoot: xe, loadProgress: H, loadSprite: Ue, loadSpriteAtlas: ht, loadSound: tr, loadBitmapFont: St, loadFont: Ke, loadShader: $t, loadShaderURL: er, loadAseprite: Rt, loadPedit: bt, loadBean: rr, loadJSON: ge, load: Me, getSprite: Mt, getSound: Pt, getFont: Bt, getBitmapFont: ut, getShader: dt2, getAsset: Tt, Asset: Be, SpriteData: X, SoundData: le, width: we, height: Ae, center: Kt, dt: Fe, time: A.time, screenshot: A.screenshot, record: ss, isFocused: ns, setCursor: A.setCursor, getCursor: A.getCursor, setCursorLocked: A.setCursorLocked, isCursorLocked: A.isCursorLocked, setFullscreen: A.setFullscreen, isFullscreen: A.isFullscreen, isTouchscreen: A.isTouchscreen, onLoad: hr, onLoading: fs, onResize: ps, onGamepadConnect: A.onGamepadConnect, onGamepadDisconnect: A.onGamepadDisconnect, onError: gs, onCleanup: ws, camPos: fi, camScale: pi, camRot: gi, shake: mi, toScreen: Rr, toWorld: Mr, setGravity: Si, getGravity: bi, setBackground: Ri, getBackground: Mi, getGamepads: A.getGamepads, add: jt, make: sr, destroy: os, destroyAll: En, get: Dr, readd: xn, pos: Ht, scale: Yt, rotate: Pi, color: Bi, opacity: Ti, anchor: nr, area: ki, sprite: or, text: Ni, polygon: Ui, rect: Li, circle: Oi, uvquad: Gi, outline: qi, body: Hi, doubleJump: Yi, shader: Ki, timer: ar, fixed: ji, stay: Br, health: Qi, lifespan: zi, z: Fi, move: Di, offscreen: Ci, follow: Ii, state: Ji, fadeIn: Xi, mask: Wi, drawon: Zi, tile: Ir, agent: is, on: Ge, onUpdate: gn, onDraw: mn, onAdd: Pr, onDestroy: wi, onClick: wn, onCollide: Ai, onCollideUpdate: Vi, onCollideEnd: vi, onHover: yi, onHoverUpdate: xi, onHoverEnd: Ei, onKeyDown: A.onKeyDown, onKeyPress: A.onKeyPress, onKeyPressRepeat: A.onKeyPressRepeat, onKeyRelease: A.onKeyRelease, onMouseDown: A.onMouseDown, onMousePress: A.onMousePress, onMouseRelease: A.onMouseRelease, onMouseMove: A.onMouseMove, onCharInput: A.onCharInput, onTouchStart: A.onTouchStart, onTouchMove: A.onTouchMove, onTouchEnd: A.onTouchEnd, onScroll: A.onScroll, onHide: A.onHide, onShow: A.onShow, onGamepadButtonDown: A.onGamepadButtonDown, onGamepadButtonPress: A.onGamepadButtonPress, onGamepadButtonRelease: A.onGamepadButtonRelease, onGamepadStick: A.onGamepadStick, mousePos: Gt, mouseDeltaPos: A.mouseDeltaPos, isKeyDown: A.isKeyDown, isKeyPressed: A.isKeyPressed, isKeyPressedRepeat: A.isKeyPressedRepeat, isKeyReleased: A.isKeyReleased, isMouseDown: A.isMouseDown, isMousePressed: A.isMousePressed, isMouseReleased: A.isMouseReleased, isMouseMoved: A.isMouseMoved, isGamepadButtonPressed: A.isGamepadButtonPressed, isGamepadButtonDown: A.isGamepadButtonDown, isGamepadButtonReleased: A.isGamepadButtonReleased, getGamepadStick: A.getGamepadStick, charInputted: A.charInputted, loop: Sn, wait: as, play: ft, volume: Dt, burp: pt, audioCtx: ee.ctx, Line: xt, Rect: Ve, Circle: vs, Polygon: zt, Vec2: E, Color: $, Mat4: ke, Quad: pe, RNG: Cs, rand: Zt, randi: ii, randSeed: ks, vec2: M, rgb: W, hsl2rgb: Tn, quad: oe, choose: Us, chance: Ns, lerp: Ye, tween: Cr, easings: cr, map: We, mapc: Ds, wave: Jr, deg2rad: Ne, rad2deg: Et, clamp: He, testLineLine: yt, testRectRect: Ls, testRectLine: Os, testRectPoint: _t, testCirclePolygon: Hs, testLinePoint: qs, testLineCircle: si, drawSprite: ir, drawText: br, formatText: Qe, drawRect: me, drawLine: d, drawLines: V, drawTriangle: R, drawCircle: q, drawEllipse: j, drawUVQuad: Ce, drawPolygon: ue, drawFormattedText: ze, drawMasked: Ut, drawSubtracted: Lt, pushTransform: ae, popTransform: se, pushTranslate: _, pushScale: De, pushRotate: re, pushMatrix: mt, usePostEffect: gt, makeCanvas: Ct, debug: ie, scene: _i, go: $i, onSceneLeave: es, addLevel: rs, getData: ts, setData: Tr, download: vr, downloadJSON: Xs, downloadText: ai, downloadBlob: ei, plug: Fr, ASCII_CHARS: Rs, canvas: A.canvas, addKaboom: hs, LEFT: E.LEFT, RIGHT: E.RIGHT, UP: E.UP, DOWN: E.DOWN, RED: $.RED, GREEN: $.GREEN, BLUE: $.BLUE, YELLOW: $.YELLOW, MAGENTA: $.MAGENTA, CYAN: $.CYAN, WHITE: $.WHITE, BLACK: $.BLACK, quit: As, Event: Ie, EventHandler: Jt, EventController: vt };
    if (r.plugins && r.plugins.forEach(Fr), r.global !== false)
      for (let e in it)
        window[e] = it[e];
    return r.focus !== false && A.canvas.focus(), it;
  }, "default");

  // code/volumebar.js
  function volumeManager() {
    let barXPosition = -110;
    let seconds = 0;
    let tune2 = 0;
    let bg = add([
      rect(width() / 6, 80),
      pos(width() / 2, 0),
      anchor("top"),
      color(BLACK),
      opacity(0),
      z(999999999)
    ]);
    let volumeText = bg.add([
      text("VOLUME"),
      pos(0, bg.height - 12),
      anchor("center"),
      scale(0.6),
      opacity(0),
      z(9999999999),
      ,
    ]);
    let bars;
    for (let i = 0; i < 10; i++) {
      barXPosition += 20;
      volumeText.add([
        pos(barXPosition, -65),
        rect(10, bg.height - 10),
        opacity(0),
        anchor("center"),
        z(99999999999)
      ]);
    }
    bars = volumeText.get("*", { recursive: true });
    let gameManager = add([stay()]);
    gameManager.onKeyPress("-", () => {
      if (GameState.volumeIndex > 0) {
        bars[GameState.volumeIndex - 1].opacity = 0.1;
        GameState.volumeIndex--;
        volume(GameState.volumeIndex / 10);
        tune2 -= 25;
      }
      play("volumeChange", { detune: tune2 });
      seconds = 0;
      bg.opacity = 0.5;
      volumeText.opacity = 1;
      for (let i = 0; i < 10; i++) {
        bars[i].opacity = 0.1;
      }
      for (let i = 0; i < GameState.volumeIndex; i++) {
        bars[i].opacity = 1;
      }
    });
    gameManager.onKeyPress("+", () => {
      if (GameState.volumeIndex <= 9) {
        bars[GameState.volumeIndex].opacity = 1;
        GameState.volumeIndex++;
        volume(GameState.volumeIndex / 10);
        tune2 += 25;
      }
      play("volumeChange", { detune: tune2 });
      seconds = 0;
      bg.opacity = 0.5;
      volumeText.opacity = 1;
      for (let i = 0; i < 10; i++) {
        bars[i].opacity = 0.1;
      }
      for (let i = 0; i < GameState.volumeIndex; i++) {
        bars[i].opacity = 1;
      }
    });
    gameManager.onUpdate(() => {
      seconds += dt();
      if (seconds > 0.8) {
        bg.opacity = 0;
        volumeText.opacity = 0;
        bars.forEach((element) => {
          element.opacity = 0;
        });
      }
    });
    return gameManager;
  }
  __name(volumeManager, "volumeManager");

  // code/dataManaging.js
  function savingData(dataToSave2) {
    setData("hexagon_save", dataToSave2);
    let disket = add([
      sprite("disket"),
      pos(width() + 50, 50),
      scale(1.25),
      rotate(0),
      opacity(1),
      anchor("center")
    ]);
    tween(disket.pos.x, width() - 50, 1, (p) => disket.pos.x = p, easings.easeOutElastic);
    wait(1, () => {
      tween(disket.pos.y, 70, 0.25, (p) => disket.pos.y = p, easings.easeInSine);
      wait(0.24, () => {
        tween(disket.pos.y, 42, 0.35, (p) => disket.pos.y = p, easings.easeOutExpo);
        tween(disket.angle, -5, 0.35, (p) => disket.angle = p, easings.easeOutExpo);
        tween(disket.opacity, 0, 0.35, (p) => disket.opacity = p, easings.easeOutExpo);
        let blackbar = add([
          rect(width() + 100, height() / 4),
          pos(center()),
          color(BLACK),
          opacity(0),
          anchor("center"),
          area()
        ]);
        let gameSaved = add([
          text("Game Saved"),
          pos(center()),
          color(WHITE),
          anchor("center"),
          scale(1.5),
          opacity(0)
        ]);
        tween(blackbar.opacity, 0.5, 0.25, (p) => blackbar.opacity = p, easings.easeOutExpo);
        tween(gameSaved.opacity, 1, 0.25, (p) => gameSaved.opacity = p, easings.easeOutExpo);
        wait(1, () => {
          tween(blackbar.opacity, 0, 1, (p) => blackbar.opacity = p, easings.easeOutExpo);
          tween(gameSaved.opacity, 0, 1, (p) => gameSaved.opacity = p, easings.easeOutExpo);
          wait(1, () => {
            destroy(disket);
            destroy(blackbar);
            destroy(gameSaved);
          });
        });
      });
    });
  }
  __name(savingData, "savingData");

  // code/scenes/FormattingFunctions.js
  function formatScore(valor) {
    let partes = valor.toString().split(".");
    let parteEntera = partes[0];
    let parteDecimal = partes.length > 1 ? "," + partes[1] : "";
    let resultado = "";
    if (parteEntera.length > 3) {
      let miles = parteEntera.slice(-3);
      let resto = parteEntera.slice(0, -3);
      parteEntera = resto.replace(/\B(?=(\d{3})+(?!\d))/g, "'") + "." + miles;
    }
    resultado = parteEntera + parteDecimal;
    return resultado;
  }
  __name(formatScore, "formatScore");
  function formatPrice(num) {
    if (num < 1e3) {
      return num;
    } else if (num < 1e6) {
      let price = num / 1e3;
      if (price % 1 === 0) {
        return price.toFixed(0) + "K";
      } else {
        return price.toFixed(2) + "K";
      }
    } else if (num < 1e9) {
      let price = num / 1e6;
      if (price % 1 === 0) {
        return price.toFixed(0) + "M";
      } else {
        return price.toFixed(3) + "M";
      }
    } else {
      let price = num / 1e9;
      if (price % 1 === 0) {
        return price.toFixed(0) + "B";
      } else {
        return price.toFixed(4) + "B";
      }
    }
  }
  __name(formatPrice, "formatPrice");

  // code/scenes/powerups.js
  function shuffleArray(array) {
    array = array.sort(() => Math.random() - 0.5);
    return array;
  }
  __name(shuffleArray, "shuffleArray");
  var badPowerUp;
  var MultiplyScoreMultiplier;
  var AddPercentage;
  var OtherPowerUp;
  var powerups = [badPowerUp, MultiplyScoreMultiplier, AddPercentage, OtherPowerUp];
  function definePowerups() {
    badPowerUp = make([
      sprite("hexagon"),
      pos(10, 10),
      color(RED),
      area(),
      anchor("center"),
      scale(0.04),
      "powerup",
      {
        execute() {
          let bg = get("bg")[0];
          bg.color = rgb(64, 22, 22);
          debug.log("bad power up :(");
          wait(10, () => {
            bg.color = rgb(50, 50, 50);
          });
        }
      }
    ]);
    MultiplyScoreMultiplier = make([
      sprite("hexagon"),
      pos(10, 10),
      color(BLUE),
      area(),
      anchor("center"),
      scale(0.04),
      "powerup",
      {
        execute() {
          let bg = get("bg")[0];
          bg.color = rgb(22, 33, 64);
          debug.log("Multiplies score multiplier by 2 :)");
          GameState.scoreMultiplier = GameState.scoreMultiplier * 2;
          wait(10, () => {
            bg.color = rgb(50, 50, 50);
            GameState.scoreMultiplier = GameState.scoreMultiplier / 2;
          });
        }
      }
    ]);
    AddPercentage = make([
      sprite("hexagon"),
      pos(10, 10),
      color(GREEN),
      area(),
      anchor("center"),
      scale(0.04),
      "powerup",
      {
        execute() {
          let bg = get("bg")[0];
          bg.color = rgb(22, 64, 25);
          debug.log("Adds a percentage of your score to it :)");
          wait(10, () => {
            bg.color = rgb(50, 50, 50);
          });
        }
      }
    ]);
    OtherPowerUp = make([
      sprite("hexagon"),
      pos(10, 10),
      color(YELLOW),
      area(),
      anchor("center"),
      scale(0.04),
      "powerup",
      {
        execute() {
          let bg = get("bg")[0];
          bg.color = rgb(64, 63, 22);
          debug.log("other power up :)");
          wait(10, () => {
            bg.color = rgb(50, 50, 50);
          });
        }
      }
    ]);
    powerups = [badPowerUp, MultiplyScoreMultiplier, AddPercentage, OtherPowerUp];
    return powerups;
  }
  __name(definePowerups, "definePowerups");
  function spawnPowerUp(powerup, posToAdd) {
    let theObj = add(powerup);
    powerup.pos = posToAdd;
    return theObj;
  }
  __name(spawnPowerUp, "spawnPowerUp");

  // code/scenes/gamescene.js
  var sps = 0;
  var cps = 0;
  var cpSecond = 0;
  var scorePerClick = 1;
  var hasStartedGame = false;
  var ominus;
  var storeOpen = false;
  var canClickHexagon = false;
  var hasClicked = false;
  var storePitchSeconds = 0;
  var tune = 0;
  var buyMultiplier = 1;
  var markiplier = "";
  var scoreToAscend = 1e6;
  var dataToSave;
  function settingData() {
    dataToSave = {
      _score: GameState.score,
      _maxScore: GameState.maxScore,
      _scoreMultiplier: GameState.scoreMultiplier,
      _scorePerClick: scorePerClick,
      _cursors: GameState.cursors,
      _hasUnlockedPowerUps: GameState.hasUnlockedPowerups,
      _volumeIndex: GameState.volumeIndex
    };
  }
  __name(settingData, "settingData");
  var powerups2;
  var canBuyPowerup = false;
  var canClickStuff = true;
  var hexagonObj;
  var scoreText;
  var maxScoreText;
  var spsText;
  var multiplierText;
  var autoScoreText;
  function gamescene() {
    return scene("gamescene", () => {
      volumeManager();
      powerups2 = definePowerups();
      let gottenData = getData("hexagon_save");
      if (gottenData) {
        GameState.score = gottenData._score;
        GameState.maxScore = gottenData._maxScore;
        GameState.scoreMultiplier = gottenData._scoreMultiplier;
        scorePerClick = gottenData._scorePerClick;
        GameState.cursors = gottenData._cursors;
        GameState.hasUnlockedPowerups = gottenData._hasUnlockedPowerUps, GameState.volumeIndex = gottenData._volumeIndex;
        console.log(gottenData);
      }
      if (GameState.score > 0)
        hasStartedGame = true;
      if (GameState.hasUnlockedPowerups)
        canBuyPowerup = true;
      let bg = add([
        rect(width() * 2, height() * 2),
        pos(center()),
        color(50, 50, 50),
        stay(),
        anchor("center"),
        "bg"
      ]);
      setCursor("none");
      let mouse = add([
        sprite("cursor"),
        pos(mousePos()),
        area({ scale: vec2(0.5), offset: vec2(-5, 5) }),
        anchor("center"),
        scale(0.2),
        z(9999999999),
        opacity(1),
        {
          update() {
            this.pos = toScreen(mousePos());
          }
        }
      ]);
      hexagonObj = add([
        sprite("hexagon"),
        pos(width() / 2, height() / 2 + 40),
        anchor("center"),
        scale(0.22),
        area({ shape: new Polygon([vec2(406, 118), vec2(613, 116), vec2(711, 292), vec2(615, 463), vec2(411, 466), vec2(315, 293)]), scale: vec2(4.62), offset: vec2(-512, -289) }),
        rotate(),
        "hexagon",
        {
          rotSpeed: 0.01,
          levitSpeed: 5,
          click(auto) {
            if (auto == true) {
              autoCursor.pos.x = rand(hexagonObj.pos.x - 50, hexagonObj.pos.x + 50);
              autoCursor.pos.y = rand(hexagonObj.pos.y - 50, hexagonObj.pos.y + 50);
              if (autoCursor.pos.x > hexagonObj.pos.x - 50 && autoCursor.pos.x < hexagonObj.pos.x) {
                autoCursor.angle = 90;
              } else if (autoCursor.pos.x > hexagonObj.pos.x && autoCursor.pos.x < hexagonObj.pos.x + 50) {
                autoCursor.angle = 270;
              }
              if (autoCursor.pos.y > hexagonObj.pos.y - 50 && autoCursor.pos.y < hexagonObj.pos.y) {
                autoCursor.angle += 45;
              } else if (autoCursor.pos.y > hexagonObj.pos.y && autoCursor.pos.y < hexagonObj.pos.y + 50) {
                autoCursor.angle -= 45;
              }
              if (autoCursor.pos.x > hexagonObj.pos.x - 50 && autoCursor.pos.x < hexagonObj.pos.x) {
                autoPlusScoreText.pos.x = autoCursor.pos.x - rand(50, 65);
              } else if (autoCursor.pos.x > hexagonObj.pos.x && autoCursor.pos.x < hexagonObj.pos.x + 50) {
                autoPlusScoreText.pos.x = autoCursor.pos.x + rand(50, 65);
              }
              autoPlusScoreText.pos.y = autoCursor.pos.y + rand(-20, 20);
              tween(autoCursor.opacity, 1, 0.25, (p) => autoCursor.opacity = p);
              tween(autoPlusScoreText.opacity, 1, 0.25, (p) => autoPlusScoreText.opacity = p);
              tween(autoPlusScoreText.pos.y, autoPlusScoreText.pos.y - 20, 0.25, (p) => autoPlusScoreText.pos.y = p);
              tween(autoPlusScoreText.angle, rand(-10, 10), 0.25, (p) => autoPlusScoreText.angle = p);
              manageScore(GameState.score + GameState.scoreMultiplier * GameState.cursors);
              GameState.maxScore += GameState.scoreMultiplier * GameState.cursors;
              tween(vec2(0.22), vec2(0.212121), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
              play("clickPress", {
                detune: rand(-50, 50)
              });
              wait(0.2, () => {
                tween(autoCursor.opacity, 0, 0.25, (p) => autoCursor.opacity = p);
                tween(autoPlusScoreText.opacity, 0, 0.25, (p) => autoPlusScoreText.opacity = p);
                play("clickRelease", {
                  detune: rand(-200, 200)
                });
                tween(0, rand(-10, 10), 0.08, (p) => scoreText.angle = p, easings.easeOutBounce);
                tween(50, 55, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce);
                wait(0.25, () => {
                  tween(scoreText.angle, 0, 0.25, (p) => scoreText.angle = p, easings.easeOutCubic);
                  tween(55, 50, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce);
                });
                tween(vec2(0.212121), vec2(0.22), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
              });
            } else {
              if (hasStartedGame == false && GameState.score < 1) {
                ominus.stop();
              }
              if (hasStartedGame == false && GameState.score == 1) {
                hasStartedGame = true;
                bg.color = rgb(50, 50, 50);
              }
              if (GameState.maxScore == 0)
                scoreText.opacity = 1;
              if (GameState.maxScore == 4)
                tween(multiplierText.opacity, 1, 0.5, (p) => multiplierText.opacity = p);
              if (GameState.maxScore == 9)
                tween(spsText.opacity, 1, 0.5, (p) => spsText.opacity = p);
              if (GameState.maxScore == 24) {
                tween(store.opacity, 1, 0.5, (p) => store.opacity = p);
                store.use(area({ scale: vec2(1.5) }));
              }
              if (!storeOpen) {
                manageScore(GameState.score += scorePerClick);
                GameState.maxScore += scorePerClick;
                play("clickRelease", {
                  detune: rand(-200, 200)
                });
                let plusScoreText = add([
                  text(`+${scorePerClick}`),
                  pos(rand(mousePos().x - 12, mousePos().x + 12), rand(mousePos().y - 12, mousePos().y + 12)),
                  anchor("center"),
                  rotate(0),
                  opacity(1),
                  rotate(rand(-10, 10)),
                  {
                    update() {
                      this.text = `+${scorePerClick}`;
                    }
                  }
                ]);
                tween(plusScoreText.pos.y, plusScoreText.pos.y - 20, 0.25, (p) => plusScoreText.pos.y = p);
                tween(plusScoreText.opacity, 0, 0.25, (p) => plusScoreText.opacity = p);
                tween(plusScoreText.angle, rand(-10, 10), 0.25, (p) => plusScoreText.angle = p);
                wait(0.25, () => {
                  destroy(plusScoreText);
                });
                tween(0, rand(-10, 10), 0.08, (p) => scoreText.angle = p, easings.easeOutBounce);
                tween(50, 55, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce);
                wait(0.25, () => {
                  tween(scoreText.angle, 0, 0.25, (p) => scoreText.angle = p, easings.easeOutCubic);
                  tween(55, 50, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce);
                });
                tween(vec2(0.212121), vec2(0.22), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
              }
            }
          }
        }
      ]);
      hexagonObj.onMousePress("left", () => {
        if (canClickHexagon == true && !storeOpen && canClickStuff == true) {
          cps += GameState.scoreMultiplier;
          tween(vec2(0.22), vec2(0.212121), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
          play("clickPress", {
            detune: rand(-50, 50)
          });
        }
      });
      hexagonObj.onMouseRelease("left", () => {
        if (canClickHexagon == true && !storeOpen && canClickStuff)
          hexagonObj.click();
      });
      mouse.onCollide("hexagon", () => {
        if (!storeOpen && canClickStuff) {
          tween(hexagonObj.pos.y, height() / 2 + 32 - 10, 0.35, (p) => hexagonObj.pos.y = p, easings.easeOutCubic);
          tween(hexagonObj.scale, vec2(0.222), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
          canClickHexagon = true;
        }
      });
      mouse.onCollideEnd("hexagon", () => {
        if (!storeOpen && canClickStuff) {
          tween(hexagonObj.pos.y, height() / 2 + 32, 0.35, (p) => hexagonObj.pos.y = p, easings.easeOutCubic);
          tween(hexagonObj.scale, vec2(0.22), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
          canClickHexagon = false;
        }
      });
      scoreText = add([
        text(formatScore(GameState.score), {
          letterSpacing: 0.01
        }),
        pos(hexagonObj.pos.x, 50),
        anchor("center"),
        rotate(0),
        area({ scale: vec2(2) }),
        scale(2),
        {
          update() {
            this.text = formatScore(GameState.score);
          }
        }
      ]);
      maxScoreText = add([
        text("Max:" + formatScore(GameState.maxScore)),
        pos(scoreText.pos.x + 60, scoreText.pos.y - 30),
        anchor("center"),
        rotate(0),
        opacity(0),
        scale(0.6),
        {
          update() {
            this.text = "Max: " + formatScore(GameState.maxScore);
          }
        }
      ]);
      spsText = add([
        text(sps + "/s"),
        pos(scoreText.pos.x, scoreText.pos.y + 50),
        anchor("center"),
        rotate(0),
        scale(0.8)
      ]);
      multiplierText = add([
        text(formatScore(GameState.scoreMultiplier) + "x"),
        pos(20, height() - 40),
        anchor("left"),
        {
          update() {
            this.text = formatScore(GameState.scoreMultiplier) + "x";
          }
        }
      ]);
      autoScoreText = add([
        text(formatScore(GameState.cursors) + "<"),
        pos(20, height() - 90),
        anchor("left"),
        {
          update() {
            this.text = formatScore(GameState.cursors) + "<";
          }
        }
      ]);
      let store = add([
        rect(50, 50),
        pos(width() - 50, height() - 50),
        anchor("center"),
        area(hasStartedGame == true ? { scale: vec2(1.5) } : { scale: vec2(0) }),
        z(100),
        "store",
        {
          manage() {
            storeOpen = !storeOpen;
            if (storeOpen) {
              markiplier = chance(0.05) ? "Markiplier" : "Multiplier";
              if (markiplier == "Markiplier")
                debug.log("HELLO EVERYONE MY NAME IS MARKIPLIER");
              tween(0, 0.5, 0.25, (p) => opaque.opacity = p);
              tween(height() - 50, height() - 40, 0.25, (p) => store.pos.y = p);
              tween(width(), width() - storeUI.width, 0.25, (p) => storeUI.pos.x = p, easings.easeOutElastic);
            } else {
              tween(0.5, 0, 0.25, (p) => opaque.opacity = p);
              tween(height() - 40, height() - 50, 0.25, (p) => store.pos.y = p, easings.easeOutCubic);
              tween(storeUI.pos.x, width(), 0.25, (p) => storeUI.pos.x = p, easings.easeOutElastic);
            }
          }
        }
      ]);
      onKeyPress("o", () => {
        levitatingSpeed--;
        debug.log(levitatingSpeed);
      });
      onKeyPress("p", () => {
        levitatingSpeed++;
        debug.log(levitatingSpeed);
      });
      wait(60, () => {
        if (GameState.maxScore > 10) {
          loop(60, () => {
            settingData();
            savingData(dataToSave);
          });
        }
      });
      function manageScore(newScore) {
        GameState.score = newScore;
      }
      __name(manageScore, "manageScore");
      loop(3, () => {
        tween(536, 541, 1.5, (p) => multiplierText.pos.y = p, easings.easeOutSine);
        wait(1.5, () => {
          tween(541, 536, 1.5, (p) => multiplierText.pos.y = p, easings.easeOutSine);
        });
      });
      scoreText.onHover(() => {
        if (!storeOpen && GameState.maxScore > 10)
          tween(0, 1, 0.15, (p) => maxScoreText.opacity = p);
      });
      scoreText.onHoverEnd(() => {
        if (!storeOpen && GameState.maxScore > 10)
          tween(1, 0, 0.15, (p) => maxScoreText.opacity = p);
      });
      mouse.onCollide("store", () => {
        tween(vec2(1), vec2(0.9), 0.35, (p) => store.scale = p, easings.easeOutQuart);
      });
      mouse.onCollideEnd("store", () => {
        tween(vec2(0.9), vec2(1), 0.35, (p) => store.scale = p, easings.easeOutQuart);
      });
      let changeOfRotSpeedPerScore = 0;
      onUpdate(() => {
        if (GameState.score == 0)
          hexagonObj.rotSpeed = 0.01;
        else {
          if (hexagonObj.rotSpeed < 15) {
            changeOfRotSpeedPerScore = (15 - 0.01) / scoreToAscend;
            hexagonObj.rotSpeed = 0.01 + changeOfRotSpeedPerScore * GameState.score;
          }
        }
        hexagonObj.angle += hexagonObj.rotSpeed;
        if (hexagonObj.angle >= 3600) {
          hexagonObj.angle = 0;
        }
        scorePerClick = GameState.scoreMultiplier;
        cpSecond += dt();
        if (cpSecond > 1) {
          cpSecond = 0;
          spsText.text = sps + "/s";
          cps = 0;
        }
        sps = GameState.cursors * GameState.scoreMultiplier / 10 + cps;
        sps = sps.toFixed(1);
        storePitchSeconds += dt();
        if (storePitchSeconds > 0.5) {
          hasClicked = false;
          tune = 0;
        }
      });
      let cheat = true;
      onKeyDown("q", () => {
        hexagonObj.click();
      });
      onKeyPress("w", () => {
        hexagonObj.click(true);
      });
      onKeyDown("left", () => {
        camScale(0.5);
      });
      onKeyDown("d", () => {
        hexagonObj.rotSpeed--;
      });
      onKeyDown("f", () => {
        hexagonObj.rotSpeed++;
      });
      onKeyPress("c", () => {
        settingData();
        savingData(dataToSave);
        console.log(getData("hexagon_save"));
      });
      onKeyPress("v", () => {
        GameState.score = 0;
        GameState.maxScore = 0;
        sps = 0;
        GameState.scoreMultiplier = 1;
        scorePerClick = 1;
        GameState.cursors = 0;
        GameState.hasUnlockedPowerups = false;
        settingData();
        savingData(dataToSave);
      });
      onKeyDown("right", () => {
        camScale(1);
      });
      if (hasStartedGame == false && GameState.score < 1) {
        ominus = play("ominus");
        ominus.play();
        bg.color = BLACK;
        scoreText.opacity = 0;
        multiplierText.opacity = 0;
        spsText.opacity = 0;
        autoScoreText.opacity = 0;
        store.opacity = 0;
      } else {
        hasStartedGame = true;
        bg.color = rgb(50, 50, 50);
      }
      let autoCursor = add([
        sprite("auto_cursor"),
        scale(0.9),
        pos(width(), height()),
        opacity(0),
        rotate(0)
      ]);
      let autoPlusScoreText = add([
        text(`+${GameState.scoreMultiplier * GameState.cursors}`),
        pos(rand(autoCursor.pos.x - 12, autoCursor.pos.x + 12), rand(autoCursor.pos.y - 12, autoCursor.pos.y + 12)),
        anchor("center"),
        rotate(0),
        scale(0.8),
        opacity(0),
        rotate(rand(-10, 10)),
        {
          update() {
            this.text = `+${GameState.scoreMultiplier * GameState.cursors}`;
          }
        }
      ]);
      let autoLoop = loop(10, () => {
        hexagonObj.click(true);
      });
      autoLoop.paused = true;
      if (GameState.cursors >= 1) {
        wait(10, () => {
          if (GameState.cursors >= 1) {
            autoLoop.paused = false;
          } else {
            autoLoop.paused = true;
          }
        });
      }
      let children;
      let opaque = add([
        rect(width(), height()),
        opacity(0),
        color(BLACK)
      ]);
      let storeUI = add([
        rect(width() / 2 - width() / 8, height()),
        pos(width(), 0),
        color(34, 50, 97)
      ]);
      storeUI.add([
        pos(10, 50),
        text(`Cursor (${GameState.cursors})
$${formatPrice(15)}`),
        scale(0.9),
        anchor("left"),
        color(),
        area(),
        "cursorElement",
        {
          canBuyCursors: true,
          verPosition: 50,
          price: 15,
          working() {
            this.price += Math.floor(this.price * GameState.cursors / 10);
            if (GameState.cursors < 1) {
              GameState.cursors++;
              this.canBuyCursors = false;
              wait(5, () => {
                this.canBuyCursors = true;
              });
              tween(autoCursor.opacity, 1, 0.25, (p) => autoCursor.opacity = p);
              tween(autoCursor.pos, center(), 2, (p) => autoCursor.pos = p);
              wait(2, () => {
                manageScore(GameState.score + GameState.scoreMultiplier * GameState.cursors);
                GameState.maxScore += GameState.scoreMultiplier * GameState.cursors;
                tween(autoPlusScoreText.opacity, 1, 0.25, (p) => autoPlusScoreText.opacity = p);
                tween(vec2(0.22), vec2(0.212121), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
                play("clickPress", {
                  detune: rand(-50, 50)
                });
                wait(0.2, () => {
                  tween(autoCursor.opacity, 0, 0.25, (p) => autoCursor.opacity = p);
                  tween(autoPlusScoreText.opacity, 0, 0.25, (p) => autoPlusScoreText.opacity = p);
                  play("clickRelease", {
                    detune: rand(-200, 200)
                  });
                  autoPlusScoreText.pos.x = autoCursor.pos.x + rand(-20, 20);
                  autoPlusScoreText.pos.y = autoCursor.pos.y + rand(-20, 20);
                  tween(autoPlusScoreText.pos.y, autoPlusScoreText.pos.y - 20, 0.25, (p) => autoPlusScoreText.pos.y = p);
                  tween(autoPlusScoreText.angle, rand(-10, 10), 0.25, (p) => autoPlusScoreText.angle = p);
                  tween(0, rand(-10, 10), 0.08, (p) => scoreText.angle = p, easings.easeOutBounce);
                  tween(50, 55, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce);
                  wait(0.25, () => {
                    tween(scoreText.angle, 0, 0.25, (p) => scoreText.angle = p, easings.easeOutCubic);
                    tween(55, 50, 0.08, (p) => scoreText.pos.y = p, easings.easeOutBounce);
                  });
                  tween(vec2(0.212121), vec2(0.22), 0.35, (p) => hexagonObj.scale = p, easings.easeOutBounce);
                  wait(10, () => {
                    autoLoop.paused = false;
                  });
                });
              });
            } else {
              GameState.cursors++;
            }
          },
          update() {
            this.text = `Cursor (${GameState.cursors})
$${formatPrice(this.price)}`;
          }
        }
      ]);
      storeUI.add([
        pos(10, 150),
        text(`Multiplier
(${formatPrice(GameState.scoreMultiplier + 1)}x)
$25`),
        scale(0.89),
        anchor("left"),
        color(),
        area(),
        "element",
        {
          verPosition: 150,
          basePrice: 25,
          price: 25,
          working() {
            GameState.scoreMultiplier += buyMultiplier;
            this.price = Math.floor(GameState.scoreMultiplier * this.basePrice * 0.5);
          },
          update() {
            if (GameState.scoreMultiplier > 1)
              this.price = Math.floor(GameState.scoreMultiplier * this.basePrice * 0.5);
            this.text = `${markiplier} (${formatPrice(GameState.scoreMultiplier + 1)}x)
$${formatPrice(this.price)}`;
          }
        }
      ]);
      storeUI.add([
        pos(10, 250),
        text(GameState.hasUnlockedPowerups == false ? `Unlock power-ups
1K` : `Buy random power up
1M`),
        scale(0.89),
        anchor("left"),
        color(),
        area(),
        "powerupElement",
        {
          verPosition: 250,
          basePrice: 1e3,
          price: 1e3,
          working() {
            if (!GameState.hasUnlockedPowerups) {
              GameState.hasUnlockedPowerups = true;
            } else {
              powerups2 = shuffleArray(powerups2);
              canBuyPowerup = false;
              wait(10, () => {
                canBuyPowerup = true;
              });
              let timesItSwitched = 0;
              let whatPowerUpWillYouGet = add([
                sprite("hexagon"),
                color(WHITE),
                pos(center()),
                area(),
                scale(0.04)
              ]);
              let timeUntilSwitch = 0.1;
              let timesSwitched = 0;
              let powerUpIndex = 0;
              let loopy = loop(timeUntilSwitch, () => {
                timesSwitched++;
                if (timesSwitched < 50) {
                  powerUpIndex++;
                  if (powerUpIndex > 3)
                    powerUpIndex = 0;
                  whatPowerUpWillYouGet.color = powerups2[powerUpIndex].color;
                }
                if (timesSwitched == 30)
                  timeUntilSwitch = 3;
                if (timesSwitched == 20) {
                  loopy.cancel();
                  let powerUpYouGot = spawnPowerUp(powerups2[powerUpIndex], whatPowerUpWillYouGet.pos);
                  destroy(whatPowerUpWillYouGet);
                  wait(0.8, () => {
                    powerUpYouGot.onUpdate(() => {
                      canClickStuff = !powerUpYouGot.isHovering();
                    });
                    loop(6.5, () => {
                      tween(powerUpYouGot.pos, vec2(rand(0, width()), rand(0, height())), 6.5, (p) => powerUpYouGot.pos = p);
                    });
                    powerUpYouGot.onMousePress("left", () => {
                      tween(powerUpYouGot.scale, vec2(0.1), 0.35, (p) => powerUpYouGot.scale = p, easings.easeOutBounce);
                    });
                    powerUpYouGot.onMouseRelease("left", () => {
                      powerUpYouGot.execute();
                      destroy(powerUpYouGot);
                      canClickStuff = true;
                    });
                  });
                }
              });
            }
          },
          update() {
            this.text = !GameState.hasUnlockedPowerups ? `Unlock power-ups
1K` : `Buy random power up
1M`;
          }
        }
      ]);
      children = storeUI.get("*", { recursive: true });
      children[0].price = GameState.scoreMultiplier == 1 ? 25 : Math.floor(children[0].price + children[0].price * GameState.scoreMultiplier / 10);
      children.forEach((element) => {
        element.onHover(() => {
          tween(element.color, BLUE, 1, (p) => element.color = p);
          tween(element.pos.y, element.verPosition - 10, 0.35, (p) => element.pos.y = p, easings.easeOutCubic);
          tween(element.scale, vec2(0.95), 0.35, (p) => element.scale = p, easings.easeOutBounce);
        });
        element.onHoverEnd(() => {
          tween(element.color, WHITE, 1, (p) => element.color = p);
          tween(element.verPosition - 10, element.verPosition, 0.35, (p) => element.pos.y = p, easings.easeOutCubic);
          tween(element.scale, vec2(0.9), 0.35, (p) => element.scale = p, easings.easeOutBounce);
        });
        element.onMousePress("left", () => {
          if (element.isHovering() && canClickStuff == true)
            tween(element.scale, vec2(0.8), 0.35, (p) => element.scale = p, easings.easeOutBounce);
        });
        element.onMouseRelease("left", () => {
          if (element.isHovering() && canClickStuff == true) {
            if (element.is("powerupElement") && canBuyPowerup == true) {
              debug.log("you can't do that yet");
            } else if (element.is("cursorElement") && element.canBuyCursors == false) {
              debug.log("you can't do that yet");
            } else {
              tween(element.scale, vec2(0.95), 0.35, (p) => element.scale = p, easings.easeOutBounce);
              if (GameState.score >= element.price) {
                manageScore(GameState.score -= element.price);
                element.working();
                hasClicked = true;
                storePitchSeconds = 0;
                if (hasClicked == true)
                  tune += 25;
                play("kaching", { detune: tune });
                tween(element.pos.y, element.pos.y - 5, 0.1, (p) => element.pos.y = p);
                wait(0.1, () => {
                  tween(element.pos.y, element.pos.y + 5, 0.1, (p) => element.pos.y = p);
                });
                shake(0.1);
              } else {
                shake(1);
                play("wrong", { detune: rand(-10, 10) });
                tween(element.color, RED, 0.1, (p) => element.color = p);
                wait(0.1, () => {
                  tween(element.color, rgb(59, 169, 209), 0.1, (p) => element.color = p);
                });
              }
            }
          }
        });
      });
      onCharInput((ch) => {
        if (ch == "1" || ch == "2" || ch == "3")
          children[parseInt(ch) - 1].working();
      });
      onKeyPress("space", () => {
        if (GameState.maxScore >= 25) {
          store.manage();
          play("store");
        }
      });
      store.onClick(() => {
        if (GameState.maxScore >= 25) {
          store.manage();
          play("store");
        }
      });
    });
  }
  __name(gamescene, "gamescene");

  // code/scenes/menuscene.js
  function menuscene() {
    return scene("menuscene", () => {
      volumeManager();
      let bg = add([
        rect(width(), height()),
        color(50, 50, 50),
        stay()
      ]);
      let title = add([
        text("clickeryHexagon"),
        pos(center())
      ]);
      go("gamescene");
      wait(1, () => {
        onKeyPress("space", () => {
          tween(title.pos.y, -50, 0.5, (p) => title.pos.y = p);
          bruh.stop();
          wait(0.65, () => {
            go("gamescene");
          });
        });
      });
    });
  }
  __name(menuscene, "menuscene");

  // code/loader.js
  function loadAssets() {
    loadRoot("./assets/");
    loadBean();
    loadSprite("osaka", "sprites/osaka.png");
    loadSound("score", "sounds/score.mp3");
    loadSound("volumeChange", "sounds/volumeChange.wav");
    loadSound("clickPress", "sounds/clickPress.mp3");
    loadSound("clickRelease", "sounds/clickRelease.mp3");
    loadSound("kaching", "sounds/kaching.mp3");
    loadSound("wrong", "sounds/wrong.mp3");
    loadSound("store", "sounds/store.mp3");
    loadSound("ominus", "sounds/ominus.mp3");
    loadSound("game_music", "sounds/game_music.mp3");
    loadSprite("hexagon", "sprites/hexagon.png");
    loadSprite("cursor", "sprites/cursor.png");
    loadSprite("auto_cursor", "sprites/auto_cursor.png");
    loadSprite("disket", "sprites/disket.png");
    loadFont("apl386", "https://kaboomjs.com/examples/fonts/apl386.ttf", { outline: 4, filter: "linear" });
    gamescene();
    menuscene();
  }
  __name(loadAssets, "loadAssets");

  // code/main.js
  var k = ho({
    width: 1024,
    height: 576,
    font: "apl386"
  });
  var GameState = {
    score: 0,
    maxScore: 0,
    scoreMultiplier: 1,
    cursors: 0,
    hasUnlockedPowerups: false,
    ascendLevel: 1,
    volumeIndex: 10
  };
  loadAssets();
  go("menuscene");
})();
//# sourceMappingURL=game.js.map
