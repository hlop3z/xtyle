/*! @License MIT | Copyright (c) 2022 hlop3z */
var xtyle = (() => {
  var I = Object.defineProperty;
  var dt = Object.getOwnPropertyDescriptor;
  var ft = Object.getOwnPropertyNames;
  var ht = Object.prototype.hasOwnProperty;
  var mt = (t, e) => {
      for (var n in e) I(t, n, { get: e[n], enumerable: !0 });
    },
    gt = (t, e, n, s) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let i of ft(e))
          !ht.call(t, i) &&
            i !== n &&
            I(t, i, {
              get: () => e[i],
              enumerable: !(s = dt(e, i)) || s.enumerable,
            });
      return t;
    };
  var yt = (t) => gt(I({}, "__esModule", { value: !0 }), t);
  var Wt = {};
  mt(Wt, {
    PrivateDict: () => y,
    ROUTER_KEY: () => U,
    default: () => Vt,
    randomUUID: () => N,
  });
  function Q(t, e, n) {
    let s = y.directives,
      i = e.slice(2);
    if (i.startsWith("on:")) {
      let c = i.split(":")[1];
      s.on(t, c, n);
    } else {
      let c = s[i];
      c && c(t, n);
    }
  }
  function Z(t) {
    let e = [];
    return (
      Object.entries(t).forEach(([n, s]) => {
        s && e.push(n);
      }),
      e.join(" ")
    );
  }
  function q(t, e, n = null) {
    if (e)
      for (let s in e)
        if (s.startsWith("x-")) Q(n || t, s, e[s]);
        else if (s === "class") {
          let i = e[s];
          if (Array.isArray(i)) {
            let c = i.map((o) => (typeof o == "string" ? o : Z(o))).join(" ");
            t.setAttribute(s, c);
          } else
            typeof i == "object" && i !== null
              ? t.setAttribute(s, Z(i))
              : t.setAttribute(s, i);
        } else t.setAttribute(s, e[s]);
  }
  function k(t, e = null) {
    let [n, s, i] = t,
      c = document.createElement(n);
    return (
      q(c, s),
      i &&
        (Array.isArray(i) || (i = [i]),
        i.forEach((o) => {
          if (typeof o == "function") {
            let a = o(e);
            e &&
              Object.keys(a.$uuid).forEach((u) => {
                e.$uuid[u] = a.$uuid[u];
              }),
              c.appendChild(a.vdom);
          } else
            Array.isArray(o)
              ? typeof o[0] == "string"
                ? c.appendChild(k(o))
                : o.map((u) => c.appendChild(k(u)))
              : typeof o == "string"
              ? c.appendChild(document.createTextNode(o.toString()))
              : c.appendChild(document.createTextNode(JSON.stringify(o)));
        })),
      c
    );
  }
  var z = k;
  function F(t, ...e) {
    return (
      e.forEach((n) => {
        for (let s in n)
          n[s] instanceof Object
            ? (t[s] || Object.assign(t, { [s]: {} }), F(t[s], n[s]))
            : Object.assign(t, { [s]: n[s] });
      }),
      t
    );
  }
  function tt(t, e, n = !1) {
    return F(n ? Object.assign({}, t) : t, e);
  }
  function H(t, e) {
    if (t === e) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    let n = Object.keys(t),
      s = Object.keys(e);
    if (n.length !== s.length) return !1;
    for (let i of n) if (!s.includes(i) || !H(t[i], e[i])) return !1;
    return !0;
  }
  function et(t, e) {
    let n = Object.assign({}, t);
    e(n);
    let s = tt(t, n, !0),
      i = H(t, s);
    return { data: s, update: !i };
  }
  var M = class {
    constructor(e) {
      let n = { ...e };
      (this.$original = n),
        (this.$current = n),
        (this.$render = null),
        (this.$parent = null),
        (this.$methods = {}),
        (this.$vdom = null);
    }
    get state() {
      return this.$current;
    }
    set state(e) {
      this.update(e);
    }
    update(e) {
      let { data: n, update: s } = et(this.$current, e);
      return s && ((this.$current = n), this.$render && this.$render()), s;
    }
    reset() {
      (this.$current = this.$original), this.$render && this.$render();
    }
  };
  function nt(t) {
    return new M(t);
  }
  var R = { produce: et, compare: H, merge: tt };
  var it = "xtyleGlobalsUpdate",
    j = { __keys__: new Set() };
  function st(t) {
    let e = new CustomEvent(it, { detail: { namespace: t } });
    window.dispatchEvent(e);
  }
  window.addEventListener(it, (t) => {
    let { namespace: e } = t.detail;
    Object.keys(A).forEach((n) => {
      let { follows: s, method: i } = A[n];
      s.has(e) && i();
    });
  });
  var P = class {
    constructor(e, n) {
      if (j.hasOwnProperty(e))
        console.error(`${e} | has already been declared`);
      else {
        let s = { ...n };
        (this.$original = s), (this.$current = s), (this.$namespace = e);
        let i = this;
        j.__keys__.add(e), Object.defineProperty(j, e, { get: () => i });
      }
    }
    get key() {
      return this.$namespace;
    }
    get state() {
      return this.$current;
    }
    set state(e) {
      this.update(e);
    }
    update(e) {
      let { data: n, update: s } = R.produce(this.$current, e);
      return s && ((this.$current = n), st(this.$namespace)), s;
    }
    reset() {
      (this.$current = this.$original), st(this.$namespace);
    }
  };
  function vt(t, e) {
    return new P(t, e);
  }
  function $t() {
    let t = null;
    do t = N();
    while (j.hasOwnProperty(t) && t === null);
    return t;
  }
  function ot(t) {
    let e = $t();
    return new P(e, t);
  }
  var Y = vt;
  var A = {};
  function _t(t) {
    let e = null;
    do e = N();
    while (A.hasOwnProperty(e) && e === null);
    return (A[e] = t), e;
  }
  var rt = (t, e, n) => {
      n !== null ? t.classList.toggle(e, n) : t.classList.toggle(e);
    },
    wt = (t, e = null) => {
      e.trim()
        .split(" ")
        .forEach((n) => {
          t.classList.add(n);
        });
    },
    bt = (t, e) => {
      t.style.cssText = e;
    };
  function Et(t, e) {
    let n = t;
    return (
      typeof t == "string" && (n = document.querySelector(t)),
      n.replaceWith(e),
      n
    );
  }
  function xt(t) {
    return nt(t.data || {});
  }
  function Ot(t) {
    let e = t.props || {};
    t.props && delete t.props;
    let n = Object.keys(e),
      s = {};
    n.forEach((o) => {
      typeof e[o] == "function" ? (s[o] = e[o]()) : (s[o] = e[o]);
    });
    let i = { keys: n, form: s };
    function c(o) {
      let a = new Set();
      t.data &&
        Object.keys(t.data).forEach((d) => {
          t.data[d] instanceof P && a.add(t.data[d].key);
        }),
        o &&
          Object.keys(o).forEach((d) => {
            if (o[d] instanceof P) a.add(o[d].key);
            else if (d.startsWith("$"))
              switch (d) {
                case "$sync":
                  t.sync = { ...t.sync, ...o.$sync };
                  break;
                case "$slot":
                  t.slot = { ...t.slot, ...o.$slot };
                  break;
                case "$attrs":
                  t.attrs = { ...t.attrs, ...o.$attrs };
                  break;
                case "$methods":
                  t.methods = { ...t.methods, ...o.$methods };
                  break;
                case "$mounted":
                  t.mounted = o.$mounted;
                  break;
              }
            else i.keys.includes(d) && (i.form[d] = o[d]);
          }),
        (t.data = { ...t.data, ...i.form });
      let u = t.follow || [];
      t.follow = new Set([...u, ...a]);
    }
    return c;
  }
  var T = class {
    constructor(e, n = {}, s = !0) {
      let i = document.createDocumentFragment();
      (this.isFragment = !0),
        e.tag && ((i = document.createElement(e.tag)), (this.isFragment = !1));
      let c = e.slots || [],
        o = e.slot || {},
        a = e.attrs || {},
        u = e.css || {},
        d = e.style || {},
        _ = e.methods || {},
        w = e.sync || {},
        f = xt(e),
        D = e.mounted || function () {},
        S = e.init || function () {},
        C = e.follow,
        p = { vdom: i, keys: [], slot: {}, data: f, sync: w };
      (this.$setup = p),
        (this.parent = n),
        (this.sync = {}),
        (this.init = s),
        (this.$uuid = {}),
        Object.entries(_).forEach(([r, l]) => {
          f.$methods[r] = l.bind(this);
        });
      let O = {};
      this.isFragment ||
        (Object.keys(a).forEach((r) => {
          r.startsWith("x-on:")
            ? (O[r] = (l) => a[r](this, l))
            : r.startsWith("@")
            ? (O["x-on:" + r.slice(1)] = (l) => a[r](this, l))
            : (O[r] = a[r]);
        }),
        q(i, O, this));
      let W = () => {
          Object.keys(this.$uuid).forEach((g) => {
            delete A[g];
          });
          let r = { ...e, data: f.state };
          return x(r)()(n, !1);
        },
        b = () => {
          let r = W();
          this.isFragment
            ? this.parent.vdom &&
              (this.parent.vdom.replaceChildren(r.vdom), (p.vdom = r.vdom))
            : (p.vdom.replaceWith(r.vdom), (p.vdom = r.vdom));
        };
      (f.$vdom = this),
        (f.$render = b),
        (this.render = b),
        (this.$route = ["div", { id: U }, []]);
      let L = this,
        h = this.$setup.sync;
      if (
        (Object.entries(h).forEach(([r, l]) => {
          Object.defineProperty(L.sync, r, {
            get() {
              return L.parent ? L.parent.state[l] : null;
            },
            set(g) {
              L.parent.state = (E) => {
                E[l] = g;
              };
            },
          });
        }),
        c.length === 0)
      ) {
        p.keys.push("default");
        let r = "default";
        if (o[r]) {
          let l = o[r].bind(this)();
          if (typeof l == "string") p.slot[r] = document.createTextNode(l);
          else if (typeof l == "function") {
            let g = l()(this);
            p.slot[r] = g.vdom;
          } else l instanceof T ? (p.slot[r] = l.vdom) : (p.slot[r] = z(l));
        }
      } else
        c.forEach((r) => {
          let l = o[r];
          if (l) {
            p.keys.push(r);
            let g = l.bind(this)();
            if (typeof g == "function") {
              let E = g()(this);
              p.slot[r] = E.vdom;
            } else if (g instanceof T) p.slot[r] = g.vdom;
            else {
              let E = z(g, this);
              p.slot[r] = E;
            }
          }
        });
      p.vdom &&
        p.keys.forEach((r) => {
          let l = p.slot[r],
            g = d[r],
            E = u[r];
          g && bt(l, g), E && wt(l, E), p.vdom.appendChild(l);
        }),
        (p.mount = (r) => {
          let l = Et(r, p.vdom);
        }),
        this.init && S.bind(this)(),
        D.bind(this)();
      let m = _t({ follows: C, method: b });
      (this.$id = m), (this.$uuid[m] = b);
    }
    get $router() {
      return y.router;
    }
    get $ui() {
      return y;
    }
    get keys() {
      return this.$setup.keys;
    }
    get slot() {
      return this.$setup.slot;
    }
    get vdom() {
      return this.$setup.vdom;
    }
    get mount() {
      return this.$setup.mount;
    }
    stateReset() {
      return this.$setup.data.reset();
    }
    set state(e) {
      return this.$setup.data.update(e);
    }
    get state() {
      let e = this.$setup.data.state,
        n = this.$setup.data.$methods;
      return { ...e, ...n, sync: this.sync };
    }
    toggle(e, n, s = null) {
      let i = this.slot[e];
      rt(i, n, s);
    }
    $toggle(e, n = null) {
      rt(this.vdom, e, n);
    }
    $emit(e, n = null) {
      if (this.state[e]) this.state[e](n);
      else if (this.parent)
        if (e.startsWith("update:")) {
          let [s, i] = e.split(":");
          this.parent.state = (c) => {
            c[i] = n;
          };
        } else
          e.startsWith("update")
            ? (this.parent.state = (s) => {
                Object.keys(n).forEach((i) => {
                  s[i] = n[i];
                });
              })
            : this.parent.state[e] && this.parent.state[e](n);
    }
  };
  function x(t) {
    return function (n) {
      let s = Object.assign({}, t);
      return Ot(s)(n), (i, c = !0) => new T(s, i, c);
    };
  }
  var ct = "gui-design";
  function K(t) {
    let e = t.id,
      n = t.code;
    function s(o) {
      let a = window.document.querySelectorAll(`[${ct}="${o}"]`);
      if (a.length > 0) return a[0];
      {
        let u = window.document.createElement("style");
        return u.setAttribute(ct, o), window.document.head.append(u), u;
      }
    }
    function i(o) {
      return o
        .replace(/\s\s+/g, " ")
        .replace(/\r?\n|\r/g, "")
        .trim();
    }
    let c = s(e);
    c.textContent = i(n);
  }
  var v = {
    container: "ripple-effect__container",
    animation: "ripple-effect__animation",
    enter: "ripple-effect__animation--enter",
    visible: "ripple-effect__animation--visible",
    start: "ripple-effect__animation--start",
    end: "ripple-effect__animation--end",
    style:
      ".ripple-effect__animation,.ripple-effect__container{color:inherit;position:absolute;top:0;left:0;pointer-events:none;overflow:hidden}.ripple-effect__container{border-radius:inherit;width:100%;height:100%;z-index:0;contain:strict}.ripple-effect__animation{border-radius:50%;background:currentColor;opacity:0;will-change:transform,opacity}.ripple-effect__animation--enter{transition:none}.ripple-effect__animation--start{transition:transform .25s cubic-bezier(.4, 0, .2, 1),opacity .1s cubic-bezier(.4, 0, .2, 1)}.ripple-effect__animation--end{transition:opacity .3s cubic-bezier(.4, 0, .2, 1)}",
  };
  K({ id: "ripple-effect", code: v.style });
  function at(t, e) {
    (t.style.transform = e), (t.style.webkitTransform = e);
  }
  function B(t, e) {
    t.style.opacity = e.toString();
  }
  function lt(t) {
    return t.constructor.name === "TouchEvent";
  }
  var Lt = (t, e, n = {}) => {
      let s = e.getBoundingClientRect(),
        i = lt(t) ? t.touches[t.touches.length - 1] : t,
        c = i.clientX - s.left,
        o = i.clientY - s.top,
        a = 0,
        u = 0.3;
      e._ripple && e._ripple.circle
        ? ((u = 0.15),
          (a = e.clientWidth / 2),
          (a = n.center ? a : a + Math.sqrt((c - a) ** 2 + (o - a) ** 2) / 4))
        : (a = Math.sqrt(e.clientWidth ** 2 + e.clientHeight ** 2) / 2);
      let d = `${(e.clientWidth - a * 2) / 2}px`,
        _ = `${(e.clientHeight - a * 2) / 2}px`,
        w = n.center ? d : `${c - a}px`,
        f = n.center ? _ : `${o - a}px`;
      return { radius: a, scale: u, x: w, y: f, centerX: d, centerY: _ };
    },
    G = {
      show(t, e, n = {}) {
        if (!e._ripple || !e._ripple.enabled) return;
        let s = document.createElement("span"),
          i = document.createElement("span");
        s.appendChild(i),
          (s.className = v.container),
          n.class && (s.className += ` ${n.class}`);
        let {
            radius: c,
            scale: o,
            x: a,
            y: u,
            centerX: d,
            centerY: _,
          } = Lt(t, e, n),
          w = `${c * 2}px`;
        (i.className = v.animation),
          (i.style.width = w),
          (i.style.height = w),
          e._ripple && e._ripple.color && (i.style.color = e._ripple.color),
          e.appendChild(s);
        let f = window.getComputedStyle(e);
        f &&
          f.position === "static" &&
          ((e.style.position = "relative"),
          (e.dataset.previousPosition = "static")),
          i.classList.add(v.enter),
          i.classList.add(v.visible),
          at(i, `translate(${a}, ${u}) scale3d(${o},${o},${o})`),
          B(i, 0),
          (i.dataset.activated = String(performance.now())),
          setTimeout(() => {
            i.classList.remove(v.enter),
              i.classList.add(v.start),
              at(i, `translate(${d}, ${_}) scale3d(1,1,1)`),
              B(i, 0.25);
          }, 0);
      },
      hide(t) {
        if (!t || !t._ripple || !t._ripple.enabled) return;
        let e = t.getElementsByClassName(v.animation);
        if (e.length === 0) return;
        let n = e[e.length - 1];
        if (n.dataset.isHiding) return;
        n.dataset.isHiding = "true";
        let s = performance.now() - Number(n.dataset.activated),
          i = Math.max(250 - s, 0);
        setTimeout(() => {
          n.classList.remove(v.start),
            n.classList.add(v.end),
            B(n, 0),
            setTimeout(() => {
              t.getElementsByClassName(v.animation).length === 1 &&
                t.dataset.previousPosition &&
                ((t.style.position = t.dataset.previousPosition),
                delete t.dataset.previousPosition),
                n.parentNode && t.removeChild(n.parentNode);
            }, 300);
        }, i);
      },
    };
  function Pt(t) {
    return typeof t > "u" || !!t;
  }
  function X(t) {
    let e = {},
      n = t.currentTarget;
    if (!(!n || !n._ripple || n._ripple.touched)) {
      if (lt(t)) (n._ripple.touched = !0), (n._ripple.isTouch = !0);
      else if (n._ripple.isTouch) return;
      (e.center = n._ripple.centered),
        n._ripple.class && (e.class = n._ripple.class),
        G.show(t, n, e);
    }
  }
  function $(t) {
    let e = t.currentTarget;
    e &&
      (window.setTimeout(() => {
        e._ripple && (e._ripple.touched = !1);
      }),
      G.hide(e));
  }
  function St(t, e, n) {
    let s = Pt(e);
    s || G.hide(t), (t._ripple = t._ripple || {}), (t._ripple.enabled = s);
    let i = e || {};
    i.center && (t._ripple.centered = !0),
      i.class && (t._ripple.class = e.class),
      i.circle && (t._ripple.circle = e.circle),
      i.color && (t._ripple.color = e.color),
      s && !n
        ? (t.addEventListener("touchstart", X, { passive: !0 }),
          t.addEventListener("touchend", $, { passive: !0 }),
          t.addEventListener("touchcancel", $),
          t.addEventListener("mousedown", X),
          t.addEventListener("mouseup", $),
          t.addEventListener("mouseleave", $),
          t.addEventListener("dragstart", $, { passive: !0 }))
        : !s && n && Ct(t);
  }
  function Ct(t) {
    t.removeEventListener("mousedown", X),
      t.removeEventListener("touchstart", $),
      t.removeEventListener("touchend", $),
      t.removeEventListener("touchcancel", $),
      t.removeEventListener("mouseup", $),
      t.removeEventListener("mouseleave", $),
      t.removeEventListener("dragstart", $);
  }
  var pt = (t, e) => St(t, e, !1);
  function ut(t, e) {
    let n = t;
    if ((typeof t == "string" && (n = document.querySelector(t)), n && e)) {
      for (; n.firstChild; ) n.firstChild.remove();
      n.appendChild(e);
    }
    return n;
  }
  var U = "______xtyle-view-display-active-element______",
    jt = [
      "click",
      "dblclick",
      "mousedown",
      "mouseup",
      "contextmenu",
      "mouseout",
      "mousewheel",
      "mouseover",
      "touchstart",
      "touchend",
      "touchmove",
      "touchcancel",
      "keydown",
      "keyup",
      "keypress",
      "focus",
      "blur",
      "change",
      "submit",
      "resize",
      "scroll",
      "hashchange",
    ];
  window.x = function (...e) {
    let [n, s, ...i] = e;
    return [n, s || {}, i];
  };
  var N = () =>
      ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (t) =>
        (
          t ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (t / 4)))
        ).toString(16)
      ),
    y = {
      directives: {
        on(t, e, n) {
          let s = t.vdom ? t.vdom : t;
          jt.includes(e) && s.addEventListener(e, n);
        },
        ripple(t, e) {
          let n = t.vdom ? t.vdom : t;
          pt(n, e);
        },
      },
      components: {},
      methods: {},
      ctx: {},
      val: j,
      router: null,
    };
  function V(t) {
    return (t = "/" + t.replace(/^\/|\/$/g, "") + "/"), t;
  }
  function At(t) {
    let e = new URLSearchParams(t),
      n = {};
    return (
      e.forEach((s, i) => {
        n[i] = s;
      }),
      n
    );
  }
  function Tt(t, e) {
    let n = V(t),
      s = V(e),
      i = new RegExp(n.replace(/{(.*?)}/g, "([^/]+)")),
      c = s.match(i),
      o = {};
    if (c) {
      let a = n.match(/{(.*?)}/g);
      a &&
        a.forEach((u, d) => {
          o[u.slice(1, -1)] = c[d + 1];
        });
    }
    return o;
  }
  function Dt(t, e) {
    let n = V(t),
      s = V(e);
    return new RegExp("^" + n.replace(/{(.*?)}/g, "([^/]+)") + "$").test(s);
  }
  function Nt(t, e) {
    let n = Object.keys(t).filter((s) => Dt(s, e));
    return n.length > 0 ? n[0] : "404";
  }
  var Rt = x({
      props: { title: "Oops" },
      slot: {
        default() {
          let { title: t } = this.state;
          return [
            "div",
            { style: "text-align: center" },
            [
              ["h1", { style: "font-size: 8.5em" }, [t]],
              ["h3", {}, ["404 | Page not Found."]],
            ],
          ];
        },
      },
    }),
    J = class {
      constructor(e) {
        this.$setup = e || {};
      }
      use(e, n = {}) {
        if (e.install) {
          let s = (i) => {
            this.$setup = { ...this.$setup, ...i };
          };
          e.install(s, n);
        }
      }
      mount(e = "#app") {
        let n = this.$setup,
          s = n.history ? n.history : !1,
          i = n.reactive ? n.reactive : !0,
          c = n.routes ? n.routes : {},
          o = n.app ? x(n.app) : null,
          a = n.components ? n.components : [],
          u = n.methods ? n.methods : {},
          d = n.ctx ? n.ctx : {},
          _ = n.val ? n.val : {},
          w = n.directives ? n.directives : {},
          f = null,
          D = null,
          S = null,
          C = null,
          p = {},
          O = {};
        s || window.location.hash || (window.location.hash = "/"),
          Object.entries(c).forEach(([h, m]) => {
            c[h] = x(m);
          });
        let W = (h) => {
          let m = window.event;
          if (m)
            try {
              m.preventDefault && m.preventDefault(),
                m.stopPropagation && m.stopPropagation(),
                m.stopImmediatePropagation && m.stopImmediatePropagation();
            } catch (r) {}
          s ? window.history.pushState({}, "", h) : (window.location.hash = h),
            b(),
            (window.onpopstate = b);
        };
        async function b() {
          (C = s ? window.location.pathname : window.location.hash.slice(1)),
            (S = Nt(c, C));
          let h = C.split("?");
          if (
            ((p = Tt(S, h[0])),
            h.length > 1 && (O = At("?" + h[1])),
            (D = c[S] || c[404] || Rt),
            (y.router = {
              route: S,
              path: C,
              args: p,
              query: O,
              go(m) {
                W(m);
              },
            }),
            i ? ((f = o()()), ut(e, f.vdom)) : f || ((f = o()()), f.mount(e)),
            D)
          ) {
            let m = document.querySelector("#" + U),
              r = D()();
            ut(m, r.vdom);
          }
        }
        let L = {};
        a.map((h) => {
          L[h.name] = x(h);
        }),
          (y.components = L),
          Object.keys(_).forEach((h) => {
            Y(h, _[h]);
          }),
          (y.ctx = Object.freeze(d)),
          (y.directives = { ...w, ...y.directives }),
          (y.methods = Object.freeze(u)),
          b();
      }
    };
  function Ut(t) {
    return new J(t);
  }
  var Vt = { dom: x, ...R, namespace: Y, dict: ot, inject: K, app: Ut };
  return yt(Wt);
})().default;
