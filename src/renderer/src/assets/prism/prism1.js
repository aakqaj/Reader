export default function () {
  /* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+css-extras+diff+json+json5&plugins=line-numbers+custom-class+remove-initial-line-feed+inline-color+unescaped-markup+normalize-whitespace+data-uri-highlight+match-braces+diff-highlight+filter-highlight-all */
  var _self =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope
        ? self
        : {},
    Prism = (function (e) {
      var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
        t = 0,
        r = {},
        a = {
          manual: e.Prism && e.Prism.manual,
          disableWorkerMessageHandler:
            e.Prism && e.Prism.disableWorkerMessageHandler,
          util: {
            encode: function e(n) {
              return n instanceof i
                ? new i(n.type, e(n.content), n.alias)
                : Array.isArray(n)
                ? n.map(e)
                : n
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/\u00a0/g, " ");
            },
            type: function (e) {
              return Object.prototype.toString.call(e).slice(8, -1);
            },
            objId: function (e) {
              return (
                e.__id || Object.defineProperty(e, "__id", { value: ++t }),
                e.__id
              );
            },
            clone: function e(n, t) {
              var r, i;
              switch (((t = t || {}), a.util.type(n))) {
                case "Object":
                  if (((i = a.util.objId(n)), t[i])) return t[i];
                  for (var l in ((r = {}), (t[i] = r), n))
                    n.hasOwnProperty(l) && (r[l] = e(n[l], t));
                  return r;
                case "Array":
                  return (
                    (i = a.util.objId(n)),
                    t[i]
                      ? t[i]
                      : ((r = []),
                        (t[i] = r),
                        n.forEach(function (n, a) {
                          r[a] = e(n, t);
                        }),
                        r)
                  );
                default:
                  return n;
              }
            },
            getLanguage: function (e) {
              for (; e; ) {
                var t = n.exec(e.className);
                if (t) return t[1].toLowerCase();
                e = e.parentElement;
              }
              return "none";
            },
            setLanguage: function (e, t) {
              (e.className = e.className.replace(RegExp(n, "gi"), "")),
                e.classList.add("language-" + t);
            },
            currentScript: function () {
              if ("undefined" == typeof document) return null;
              if ("currentScript" in document) return document.currentScript;
              try {
                throw new Error();
              } catch (r) {
                var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) ||
                  [])[1];
                if (e) {
                  var n = document.getElementsByTagName("script");
                  for (var t in n) if (n[t].src == e) return n[t];
                }
                return null;
              }
            },
            isActive: function (e, n, t) {
              for (var r = "no-" + n; e; ) {
                var a = e.classList;
                if (a.contains(n)) return !0;
                if (a.contains(r)) return !1;
                e = e.parentElement;
              }
              return !!t;
            },
          },
          languages: {
            plain: r,
            plaintext: r,
            text: r,
            txt: r,
            extend: function (e, n) {
              var t = a.util.clone(a.languages[e]);
              for (var r in n) t[r] = n[r];
              return t;
            },
            insertBefore: function (e, n, t, r) {
              var i = (r = r || a.languages)[e],
                l = {};
              for (var o in i)
                if (i.hasOwnProperty(o)) {
                  if (o == n)
                    for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
                  t.hasOwnProperty(o) || (l[o] = i[o]);
                }
              var u = r[e];
              return (
                (r[e] = l),
                a.languages.DFS(a.languages, function (n, t) {
                  t === u && n != e && (this[n] = l);
                }),
                l
              );
            },
            DFS: function e(n, t, r, i) {
              i = i || {};
              var l = a.util.objId;
              for (var o in n)
                if (n.hasOwnProperty(o)) {
                  t.call(n, o, n[o], r || o);
                  var s = n[o],
                    u = a.util.type(s);
                  "Object" !== u || i[l(s)]
                    ? "Array" !== u ||
                      i[l(s)] ||
                      ((i[l(s)] = !0), e(s, t, o, i))
                    : ((i[l(s)] = !0), e(s, t, null, i));
                }
            },
          },
          plugins: {},
          highlightAll: function (e, n) {
            a.highlightAllUnder(document, e, n);
          },
          highlightAllUnder: function (e, n, t) {
            var r = {
              callback: t,
              container: e,
              selector:
                'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
            };
            a.hooks.run("before-highlightall", r),
              (r.elements = Array.prototype.slice.apply(
                r.container.querySelectorAll(r.selector)
              )),
              a.hooks.run("before-all-elements-highlight", r);
            for (var i, l = 0; (i = r.elements[l++]); )
              a.highlightElement(i, !0 === n, r.callback);
          },
          highlightElement: function (n, t, r) {
            var i = a.util.getLanguage(n),
              l = a.languages[i];
            a.util.setLanguage(n, i);
            var o = n.parentElement;
            o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
            var s = {
              element: n,
              language: i,
              grammar: l,
              code: n.textContent,
            };
            function u(e) {
              (s.highlightedCode = e),
                a.hooks.run("before-insert", s),
                (s.element.innerHTML = s.highlightedCode),
                a.hooks.run("after-highlight", s),
                a.hooks.run("complete", s),
                r && r.call(s.element);
            }
            if (
              (a.hooks.run("before-sanity-check", s),
              (o = s.element.parentElement) &&
                "pre" === o.nodeName.toLowerCase() &&
                !o.hasAttribute("tabindex") &&
                o.setAttribute("tabindex", "0"),
              !s.code)
            )
              return a.hooks.run("complete", s), void (r && r.call(s.element));
            if ((a.hooks.run("before-highlight", s), s.grammar))
              if (t && e.Worker) {
                var c = new Worker(a.filename);
                (c.onmessage = function (e) {
                  u(e.data);
                }),
                  c.postMessage(
                    JSON.stringify({
                      language: s.language,
                      code: s.code,
                      immediateClose: !0,
                    })
                  );
              } else u(a.highlight(s.code, s.grammar, s.language));
            else u(a.util.encode(s.code));
          },
          highlight: function (e, n, t) {
            var r = { code: e, grammar: n, language: t };
            if ((a.hooks.run("before-tokenize", r), !r.grammar))
              throw new Error(
                'The language "' + r.language + '" has no grammar.'
              );
            return (
              (r.tokens = a.tokenize(r.code, r.grammar)),
              a.hooks.run("after-tokenize", r),
              i.stringify(a.util.encode(r.tokens), r.language)
            );
          },
          tokenize: function (e, n) {
            var t = n.rest;
            if (t) {
              for (var r in t) n[r] = t[r];
              delete n.rest;
            }
            var a = new s();
            return (
              u(a, a.head, e),
              o(e, a, n, a.head, 0),
              (function (e) {
                for (var n = [], t = e.head.next; t !== e.tail; )
                  n.push(t.value), (t = t.next);
                return n;
              })(a)
            );
          },
          hooks: {
            all: {},
            add: function (e, n) {
              var t = a.hooks.all;
              (t[e] = t[e] || []), t[e].push(n);
            },
            run: function (e, n) {
              var t = a.hooks.all[e];
              if (t && t.length) for (var r, i = 0; (r = t[i++]); ) r(n);
            },
          },
          Token: i,
        };
      function i(e, n, t, r) {
        (this.type = e),
          (this.content = n),
          (this.alias = t),
          (this.length = 0 | (r || "").length);
      }
      function l(e, n, t, r) {
        e.lastIndex = n;
        var a = e.exec(t);
        if (a && r && a[1]) {
          var i = a[1].length;
          (a.index += i), (a[0] = a[0].slice(i));
        }
        return a;
      }
      function o(e, n, t, r, s, g) {
        for (var f in t)
          if (t.hasOwnProperty(f) && t[f]) {
            var h = t[f];
            h = Array.isArray(h) ? h : [h];
            for (var d = 0; d < h.length; ++d) {
              if (g && g.cause == f + "," + d) return;
              var v = h[d],
                p = v.inside,
                m = !!v.lookbehind,
                y = !!v.greedy,
                k = v.alias;
              if (y && !v.pattern.global) {
                var x = v.pattern.toString().match(/[imsuy]*$/)[0];
                v.pattern = RegExp(v.pattern.source, x + "g");
              }
              for (
                var b = v.pattern || v, w = r.next, A = s;
                w !== n.tail && !(g && A >= g.reach);
                A += w.value.length, w = w.next
              ) {
                var E = w.value;
                if (n.length > e.length) return;
                if (!(E instanceof i)) {
                  var P,
                    L = 1;
                  if (y) {
                    if (!(P = l(b, A, e, m)) || P.index >= e.length) break;
                    var S = P.index,
                      O = P.index + P[0].length,
                      j = A;
                    for (j += w.value.length; S >= j; )
                      j += (w = w.next).value.length;
                    if (((A = j -= w.value.length), w.value instanceof i))
                      continue;
                    for (
                      var C = w;
                      C !== n.tail && (j < O || "string" == typeof C.value);
                      C = C.next
                    )
                      L++, (j += C.value.length);
                    L--, (E = e.slice(A, j)), (P.index -= A);
                  } else if (!(P = l(b, 0, E, m))) continue;
                  S = P.index;
                  var N = P[0],
                    _ = E.slice(0, S),
                    M = E.slice(S + N.length),
                    W = A + E.length;
                  g && W > g.reach && (g.reach = W);
                  var z = w.prev;
                  if (
                    (_ && ((z = u(n, z, _)), (A += _.length)),
                    c(n, z, L),
                    (w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N))),
                    M && u(n, w, M),
                    L > 1)
                  ) {
                    var I = { cause: f + "," + d, reach: W };
                    o(e, n, t, w.prev, A, I),
                      g && I.reach > g.reach && (g.reach = I.reach);
                  }
                }
              }
            }
          }
      }
      function s() {
        var e = { value: null, prev: null, next: null },
          n = { value: null, prev: e, next: null };
        (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
      }
      function u(e, n, t) {
        var r = n.next,
          a = { value: t, prev: n, next: r };
        return (n.next = a), (r.prev = a), e.length++, a;
      }
      function c(e, n, t) {
        for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
        (n.next = r), (r.prev = n), (e.length -= a);
      }
      if (
        ((e.Prism = a),
        (i.stringify = function e(n, t) {
          if ("string" == typeof n) return n;
          if (Array.isArray(n)) {
            var r = "";
            return (
              n.forEach(function (n) {
                r += e(n, t);
              }),
              r
            );
          }
          var i = {
              type: n.type,
              content: e(n.content, t),
              tag: "span",
              classes: ["token", n.type],
              attributes: {},
              language: t,
            },
            l = n.alias;
          l &&
            (Array.isArray(l)
              ? Array.prototype.push.apply(i.classes, l)
              : i.classes.push(l)),
            a.hooks.run("wrap", i);
          var o = "";
          for (var s in i.attributes)
            o +=
              " " +
              s +
              '="' +
              (i.attributes[s] || "").replace(/"/g, "&quot;") +
              '"';
          return (
            "<" +
            i.tag +
            ' class="' +
            i.classes.join(" ") +
            '"' +
            o +
            ">" +
            i.content +
            "</" +
            i.tag +
            ">"
          );
        }),
        !e.document)
      )
        return e.addEventListener
          ? (a.disableWorkerMessageHandler ||
              e.addEventListener(
                "message",
                function (n) {
                  var t = JSON.parse(n.data),
                    r = t.language,
                    i = t.code,
                    l = t.immediateClose;
                  e.postMessage(a.highlight(i, a.languages[r], r)),
                    l && e.close();
                },
                !1
              ),
            a)
          : a;
      var g = a.util.currentScript();
      function f() {
        a.manual || a.highlightAll();
      }
      if (
        (g &&
          ((a.filename = g.src),
          g.hasAttribute("data-manual") && (a.manual = !0)),
        !a.manual)
      ) {
        var h = document.readyState;
        "loading" === h || ("interactive" === h && g && g.defer)
          ? document.addEventListener("DOMContentLoaded", f)
          : window.requestAnimationFrame
          ? window.requestAnimationFrame(f)
          : window.setTimeout(f, 16);
      }
      return a;
    })(_self);
  "undefined" != typeof module && module.exports && (module.exports = Prism),
    "undefined" != typeof global && (global.Prism = Prism);
  (Prism.languages.markup = {
    comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
    prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
    doctype: {
      pattern:
        /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: !0,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: !0,
          greedy: !0,
          inside: null,
        },
        string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /[^\s<>'"]+/,
      },
    },
    cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
    tag: {
      pattern:
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              { pattern: /^=/, alias: "attr-equals" },
              { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
            ],
          },
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ },
        },
      },
    },
    entity: [
      { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
      /&#x?[\da-f]{1,8};/i,
    ],
  }),
    (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
      Prism.languages.markup.entity),
    (Prism.languages.markup.doctype.inside["internal-subset"].inside =
      Prism.languages.markup),
    Prism.hooks.add("wrap", function (a) {
      "entity" === a.type &&
        (a.attributes.title = a.content.replace(/&amp;/, "&"));
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
      value: function (a, e) {
        var s = {};
        (s["language-" + e] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: Prism.languages[e],
        }),
          (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
        var t = {
          "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
        };
        t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
        var n = {};
        (n[a] = {
          pattern: RegExp(
            "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
              /__/g,
              function () {
                return a;
              }
            ),
            "i"
          ),
          lookbehind: !0,
          greedy: !0,
          inside: t,
        }),
          Prism.languages.insertBefore("markup", "cdata", n);
      },
    }),
    Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
      value: function (a, e) {
        Prism.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            "(^|[\"'\\s])(?:" +
              a +
              ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
            "i"
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [e, "language-" + e],
                  inside: Prism.languages[e],
                },
                punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
              },
            },
          },
        });
      },
    }),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup),
    (Prism.languages.xml = Prism.languages.extend("markup", {})),
    (Prism.languages.ssml = Prism.languages.xml),
    (Prism.languages.atom = Prism.languages.xml),
    (Prism.languages.rss = Prism.languages.xml);
  !(function (s) {
    var e =
      /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    (s.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: RegExp(
          "@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" +
            e.source +
            ")*?(?:;|(?=\\s*\\{))"
        ),
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": {
            pattern:
              /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: !0,
            alias: "selector",
          },
          keyword: {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: !0,
          },
        },
      },
      url: {
        pattern: RegExp(
          "\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
          "i"
        ),
        greedy: !0,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: { pattern: RegExp("^" + e.source + "$"), alias: "url" },
        },
      },
      selector: {
        pattern: RegExp(
          "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
            e.source +
            ")*(?=\\s*\\{)"
        ),
        lookbehind: !0,
      },
      string: { pattern: e, greedy: !0 },
      property: {
        pattern:
          /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: !0,
      },
      important: /!important\b/i,
      function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
      punctuation: /[(){};:,]/,
    }),
      (s.languages.css.atrule.inside.rest = s.languages.css);
    var t = s.languages.markup;
    t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
  })(Prism);
  Prism.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0,
      },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
    },
    "class-name": {
      pattern:
        /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword:
      /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
  };
  (Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [
      Prism.languages.clike["class-name"],
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0,
      },
    ],
    keyword: [
      { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
      {
        pattern:
          /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0,
      },
    ],
    function:
      /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
      pattern: RegExp(
        "(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"
      ),
      lookbehind: !0,
    },
    operator:
      /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
  })),
    (Prism.languages.javascript["class-name"][0].pattern =
      /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore("javascript", "keyword", {
      regex: {
        pattern: RegExp(
          "((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: Prism.languages.regex,
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/,
        },
      },
      "function-variable": {
        pattern:
          /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function",
      },
      parameter: [
        {
          pattern:
            /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: !0,
          inside: Prism.languages.javascript,
        },
        {
          pattern:
            /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: Prism.languages.javascript,
        },
        {
          pattern:
            /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: Prism.languages.javascript,
        },
        {
          pattern:
            /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: Prism.languages.javascript,
        },
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
    }),
    Prism.languages.insertBefore("javascript", "string", {
      hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
      "template-string": {
        pattern:
          /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": { pattern: /^`|`$/, alias: "string" },
          interpolation: {
            pattern:
              /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation",
              },
              rest: Prism.languages.javascript,
            },
          },
          string: /[\s\S]+/,
        },
      },
      "string-property": {
        pattern:
          /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property",
      },
    }),
    Prism.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern:
          /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property",
      },
    }),
    Prism.languages.markup &&
      (Prism.languages.markup.tag.addInlined("script", "javascript"),
      Prism.languages.markup.tag.addAttribute(
        "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
        "javascript"
      )),
    (Prism.languages.js = Prism.languages.javascript);
  !(function (e) {
    var a,
      n = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    (e.languages.css.selector = {
      pattern: e.languages.css.selector.pattern,
      lookbehind: !0,
      inside: (a = {
        "pseudo-element":
          /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+/,
        class: /\.[-\w]+/,
        id: /#[-\w]+/,
        attribute: {
          pattern: RegExp("\\[(?:[^[\\]\"']|" + n.source + ")*\\]"),
          greedy: !0,
          inside: {
            punctuation: /^\[|\]$/,
            "case-sensitivity": {
              pattern: /(\s)[si]$/i,
              lookbehind: !0,
              alias: "keyword",
            },
            namespace: {
              pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
              lookbehind: !0,
              inside: { punctuation: /\|$/ },
            },
            "attr-name": {
              pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
              lookbehind: !0,
            },
            "attr-value": [
              n,
              {
                pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
                lookbehind: !0,
              },
            ],
            operator: /[|~*^$]?=/,
          },
        },
        "n-th": [
          {
            pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
            lookbehind: !0,
            inside: { number: /[\dn]+/, operator: /[+-]/ },
          },
          { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
        ],
        combinator: />|\+|~|\|\|/,
        punctuation: /[(),]/,
      }),
    }),
      (e.languages.css.atrule.inside["selector-function-argument"].inside = a),
      e.languages.insertBefore("css", "property", {
        variable: {
          pattern:
            /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
          lookbehind: !0,
        },
      });
    var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 },
      i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
    e.languages.insertBefore("css", "function", {
      operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
      hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" },
      color: [
        {
          pattern:
            /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
          lookbehind: !0,
        },
        {
          pattern:
            /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
          inside: {
            unit: r,
            number: i,
            function: /[\w-]+(?=\()/,
            punctuation: /[(),]/,
          },
        },
      ],
      entity: /\\[\da-f]{1,8}/i,
      unit: r,
      number: i,
    });
  })(Prism);
  !(function (e) {
    e.languages.diff = {
      coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m],
    };
    var n = {
      "deleted-sign": "-",
      "deleted-arrow": "<",
      "inserted-sign": "+",
      "inserted-arrow": ">",
      unchanged: " ",
      diff: "!",
    };
    Object.keys(n).forEach(function (a) {
      var i = n[a],
        r = [];
      /^\w+$/.test(a) || r.push(/\w+/.exec(a)[0]),
        "diff" === a && r.push("bold"),
        (e.languages.diff[a] = {
          pattern: RegExp("^(?:[" + i + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
          alias: r,
          inside: {
            line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
            prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(a)[0] },
          },
        });
    }),
      Object.defineProperty(e.languages.diff, "PREFIXES", { value: n });
  })(Prism);
  (Prism.languages.json = {
    property: {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
      lookbehind: !0,
      greedy: !0,
    },
    string: {
      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      lookbehind: !0,
      greedy: !0,
    },
    comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:false|true)\b/,
    null: { pattern: /\bnull\b/, alias: "keyword" },
  }),
    (Prism.languages.webmanifest = Prism.languages.json);
  !(function (n) {
    var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
    n.languages.json5 = n.languages.extend("json", {
      property: [
        { pattern: RegExp(e.source + "(?=\\s*:)"), greedy: !0 },
        {
          pattern:
            /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
          alias: "unquoted",
        },
      ],
      string: { pattern: e, greedy: !0 },
      number:
        /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
    });
  })(Prism);
  !(function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
      var e = "line-numbers",
        n = /\n(?!$)/g,
        t = (Prism.plugins.lineNumbers = {
          getLine: function (n, t) {
            if ("PRE" === n.tagName && n.classList.contains(e)) {
              var i = n.querySelector(".line-numbers-rows");
              if (i) {
                var r = parseInt(n.getAttribute("data-start"), 10) || 1,
                  s = r + (i.children.length - 1);
                t < r && (t = r), t > s && (t = s);
                var l = t - r;
                return i.children[l];
              }
            }
          },
          resize: function (e) {
            r([e]);
          },
          assumeViewportIndependence: !0,
        }),
        i = void 0;
      window.addEventListener("resize", function () {
        (t.assumeViewportIndependence && i === window.innerWidth) ||
          ((i = window.innerWidth),
          r(
            Array.prototype.slice.call(
              document.querySelectorAll("pre.line-numbers")
            )
          ));
      }),
        Prism.hooks.add("complete", function (t) {
          if (t.code) {
            var i = t.element,
              s = i.parentNode;
            if (
              s &&
              /pre/i.test(s.nodeName) &&
              !i.querySelector(".line-numbers-rows") &&
              Prism.util.isActive(i, e)
            ) {
              i.classList.remove(e), s.classList.add(e);
              var l,
                o = t.code.match(n),
                a = o ? o.length + 1 : 1,
                u = new Array(a + 1).join("<span></span>");
              (l = document.createElement("span")).setAttribute(
                "aria-hidden",
                "true"
              ),
                (l.className = "line-numbers-rows"),
                (l.innerHTML = u),
                s.hasAttribute("data-start") &&
                  (s.style.counterReset =
                    "linenumber " +
                    (parseInt(s.getAttribute("data-start"), 10) - 1)),
                t.element.appendChild(l),
                r([s]),
                Prism.hooks.run("line-numbers", t);
            }
          }
        }),
        Prism.hooks.add("line-numbers", function (e) {
          (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
        });
    }
    function r(e) {
      if (
        0 !=
        (e = e.filter(function (e) {
          var n,
            t = ((n = e),
            n
              ? window.getComputedStyle
                ? getComputedStyle(n)
                : n.currentStyle || null
              : null)["white-space"];
          return "pre-wrap" === t || "pre-line" === t;
        })).length
      ) {
        var t = e
          .map(function (e) {
            var t = e.querySelector("code"),
              i = e.querySelector(".line-numbers-rows");
            if (t && i) {
              var r = e.querySelector(".line-numbers-sizer"),
                s = t.textContent.split(n);
              r ||
                (((r = document.createElement("span")).className =
                  "line-numbers-sizer"),
                t.appendChild(r)),
                (r.innerHTML = "0"),
                (r.style.display = "block");
              var l = r.getBoundingClientRect().height;
              return (
                (r.innerHTML = ""),
                {
                  element: e,
                  lines: s,
                  lineHeights: [],
                  oneLinerHeight: l,
                  sizer: r,
                }
              );
            }
          })
          .filter(Boolean);
        t.forEach(function (e) {
          var n = e.sizer,
            t = e.lines,
            i = e.lineHeights,
            r = e.oneLinerHeight;
          (i[t.length - 1] = void 0),
            t.forEach(function (e, t) {
              if (e && e.length > 1) {
                var s = n.appendChild(document.createElement("span"));
                (s.style.display = "block"), (s.textContent = e);
              } else i[t] = r;
            });
        }),
          t.forEach(function (e) {
            for (
              var n = e.sizer, t = e.lineHeights, i = 0, r = 0;
              r < t.length;
              r++
            )
              void 0 === t[r] &&
                (t[r] = n.children[i++].getBoundingClientRect().height);
          }),
          t.forEach(function (e) {
            var n = e.sizer,
              t = e.element.querySelector(".line-numbers-rows");
            (n.style.display = "none"),
              (n.innerHTML = ""),
              e.lineHeights.forEach(function (e, n) {
                t.children[n].style.height = e + "px";
              });
          });
      }
    }
  })();
  !(function () {
    if ("undefined" != typeof Prism) {
      var n,
        s,
        a = "";
      (Prism.plugins.customClass = {
        add: function (s) {
          n = s;
        },
        map: function (n) {
          s =
            "function" == typeof n
              ? n
              : function (s) {
                  return n[s] || s;
                };
        },
        prefix: function (n) {
          a = n || "";
        },
        apply: t,
      }),
        Prism.hooks.add("wrap", function (e) {
          if (n) {
            var u = n({
              content: e.content,
              type: e.type,
              language: e.language,
            });
            Array.isArray(u)
              ? e.classes.push.apply(e.classes, u)
              : u && e.classes.push(u);
          }
          (s || a) &&
            (e.classes = e.classes.map(function (n) {
              return t(n, e.language);
            }));
        });
    }
    function t(n, t) {
      return a + (s ? s(n, t) : n);
    }
  })();
  "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    Prism.hooks.add("before-sanity-check", function (e) {
      if (e.code) {
        var n = e.element.parentNode,
          o = /(?:^|\s)keep-initial-line-feed(?:\s|$)/;
        !n ||
          "pre" !== n.nodeName.toLowerCase() ||
          o.test(n.className) ||
          o.test(e.element.className) ||
          (e.code = e.code.replace(/^(?:\r?\n|\r)/, ""));
      }
    });
  !(function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
      var n =
          /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
        r = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i,
        o = [
          function (n) {
            var o = r.exec(n);
            if (o) {
              for (
                var s = (n = o[1]).length >= 6 ? 2 : 1,
                  e = n.length / s,
                  t = 1 == s ? 1 / 15 : 1 / 255,
                  i = [],
                  a = 0;
                a < e;
                a++
              ) {
                var c = parseInt(n.substr(a * s, s), 16);
                i.push(c * t);
              }
              return (
                3 == e && i.push(1),
                "rgba(" +
                  i
                    .slice(0, 3)
                    .map(function (n) {
                      return String(Math.round(255 * n));
                    })
                    .join(",") +
                  "," +
                  String(Number(i[3].toFixed(3))) +
                  ")"
              );
            }
          },
          function (n) {
            var r = new Option().style;
            return (r.color = n), r.color ? n : void 0;
          },
        ];
      Prism.hooks.add("wrap", function (r) {
        if ("color" === r.type || r.classes.indexOf("color") >= 0) {
          for (
            var s, e = r.content, t = e.split(n).join(""), i = 0, a = o.length;
            i < a && !s;
            i++
          )
            s = o[i](t);
          if (!s) return;
          var c =
            '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' +
            s +
            ';"></span></span>';
          r.content = c + e;
        }
      });
    }
  })();
  "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    (Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector),
    (Prism.plugins.UnescapedMarkup = !0),
    Prism.hooks.add("before-highlightall", function (e) {
      e.selector +=
        ', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]';
    }),
    Prism.hooks.add("before-sanity-check", function (e) {
      var t = e.element;
      if (t.matches('script[type="text/plain"]')) {
        var a = document.createElement("code"),
          c = document.createElement("pre");
        c.className = a.className = t.className;
        var n = t.dataset;
        return (
          Object.keys(n || {}).forEach(function (e) {
            Object.prototype.hasOwnProperty.call(n, e) && (c.dataset[e] = n[e]);
          }),
          (a.textContent = e.code =
            e.code.replace(/&lt;\/script(?:>|&gt;)/gi, "</script>")),
          c.appendChild(a),
          t.parentNode.replaceChild(c, t),
          void (e.element = a)
        );
      }
      if (!e.code) {
        var o = t.childNodes;
        1 === o.length &&
          "#comment" == o[0].nodeName &&
          (t.textContent = e.code = o[0].textContent);
      }
    }));
  !(function () {
    if ("undefined" != typeof Prism) {
      var e =
          Object.assign ||
          function (e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            return e;
          },
        t = {
          "remove-trailing": "boolean",
          "remove-indent": "boolean",
          "left-trim": "boolean",
          "right-trim": "boolean",
          "break-lines": "number",
          indent: "number",
          "remove-initial-line-feed": "boolean",
          "tabs-to-spaces": "number",
          "spaces-to-tabs": "number",
        };
      (n.prototype = {
        setDefaults: function (t) {
          this.defaults = e(this.defaults, t);
        },
        normalize: function (t, n) {
          for (var r in (n = e(this.defaults, n))) {
            var i = r.replace(/-(\w)/g, function (e, t) {
              return t.toUpperCase();
            });
            "normalize" !== r &&
              "setDefaults" !== i &&
              n[r] &&
              this[i] &&
              (t = this[i].call(this, t, n[r]));
          }
          return t;
        },
        leftTrim: function (e) {
          return e.replace(/^\s+/, "");
        },
        rightTrim: function (e) {
          return e.replace(/\s+$/, "");
        },
        tabsToSpaces: function (e, t) {
          return (t = 0 | t || 4), e.replace(/\t/g, new Array(++t).join(" "));
        },
        spacesToTabs: function (e, t) {
          return (t = 0 | t || 4), e.replace(RegExp(" {" + t + "}", "g"), "\t");
        },
        removeTrailing: function (e) {
          return e.replace(/\s*?$/gm, "");
        },
        removeInitialLineFeed: function (e) {
          return e.replace(/^(?:\r?\n|\r)/, "");
        },
        removeIndent: function (e) {
          var t = e.match(/^[^\S\n\r]*(?=\S)/gm);
          return t && t[0].length
            ? (t.sort(function (e, t) {
                return e.length - t.length;
              }),
              t[0].length ? e.replace(RegExp("^" + t[0], "gm"), "") : e)
            : e;
        },
        indent: function (e, t) {
          return e.replace(
            /^[^\S\n\r]*(?=\S)/gm,
            new Array(++t).join("\t") + "$&"
          );
        },
        breakLines: function (e, t) {
          t = !0 === t ? 80 : 0 | t || 80;
          for (var n = e.split("\n"), i = 0; i < n.length; ++i)
            if (!(r(n[i]) <= t)) {
              for (
                var o = n[i].split(/(\s+)/g), a = 0, l = 0;
                l < o.length;
                ++l
              ) {
                var s = r(o[l]);
                (a += s) > t && ((o[l] = "\n" + o[l]), (a = s));
              }
              n[i] = o.join("");
            }
          return n.join("\n");
        },
      }),
        "undefined" != typeof module && module.exports && (module.exports = n),
        (Prism.plugins.NormalizeWhitespace = new n({
          "remove-trailing": !0,
          "remove-indent": !0,
          "left-trim": !0,
          "right-trim": !0,
        })),
        Prism.hooks.add("before-sanity-check", function (e) {
          var n = Prism.plugins.NormalizeWhitespace;
          if (
            (!e.settings || !1 !== e.settings["whitespace-normalization"]) &&
            Prism.util.isActive(e.element, "whitespace-normalization", !0)
          )
            if ((e.element && e.element.parentNode) || !e.code) {
              var r = e.element.parentNode;
              if (e.code && r && "pre" === r.nodeName.toLowerCase()) {
                for (var i in (null == e.settings && (e.settings = {}), t))
                  if (Object.hasOwnProperty.call(t, i)) {
                    var o = t[i];
                    if (r.hasAttribute("data-" + i))
                      try {
                        var a = JSON.parse(
                          r.getAttribute("data-" + i) || "true"
                        );
                        typeof a === o && (e.settings[i] = a);
                      } catch (e) {}
                  }
                for (
                  var l = r.childNodes, s = "", c = "", u = !1, m = 0;
                  m < l.length;
                  ++m
                ) {
                  var f = l[m];
                  f == e.element
                    ? (u = !0)
                    : "#text" === f.nodeName &&
                      (u ? (c += f.nodeValue) : (s += f.nodeValue),
                      r.removeChild(f),
                      --m);
                }
                if (e.element.children.length && Prism.plugins.KeepMarkup) {
                  var d = s + e.element.innerHTML + c;
                  (e.element.innerHTML = n.normalize(d, e.settings)),
                    (e.code = e.element.textContent);
                } else
                  (e.code = s + e.code + c),
                    (e.code = n.normalize(e.code, e.settings));
              }
            } else e.code = n.normalize(e.code, e.settings);
        });
    }
    function n(t) {
      this.defaults = e({}, t);
    }
    function r(e) {
      for (var t = 0, n = 0; n < e.length; ++n)
        e.charCodeAt(n) == "\t".charCodeAt(0) && (t += 3);
      return e.length + t;
    }
  })();
  !(function () {
    if ("undefined" != typeof Prism) {
      var i = {
          pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/,
          lookbehind: !0,
          inside: {
            "language-css": {
              pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/,
              lookbehind: !0,
            },
            "language-javascript": {
              pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/,
              lookbehind: !0,
            },
            "language-json": {
              pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/,
              lookbehind: !0,
            },
            "language-markup": {
              pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/,
              lookbehind: !0,
            },
          },
        },
        a = ["url", "attr-value", "string"];
      (Prism.plugins.dataURIHighlight = {
        processGrammar: function (n) {
          n &&
            !n["data-uri"] &&
            (Prism.languages.DFS(n, function (n, r, e) {
              a.indexOf(e) > -1 &&
                !Array.isArray(r) &&
                (r.pattern || (r = this[n] = { pattern: r }),
                (r.inside = r.inside || {}),
                "attr-value" == e
                  ? Prism.languages.insertBefore(
                      "inside",
                      r.inside["url-link"] ? "url-link" : "punctuation",
                      { "data-uri": i },
                      r
                    )
                  : r.inside["url-link"]
                  ? Prism.languages.insertBefore(
                      "inside",
                      "url-link",
                      { "data-uri": i },
                      r
                    )
                  : (r.inside["data-uri"] = i));
            }),
            (n["data-uri"] = i));
        },
      }),
        Prism.hooks.add("before-highlight", function (a) {
          if (i.pattern.test(a.code))
            for (var n in i.inside)
              if (
                i.inside.hasOwnProperty(n) &&
                !i.inside[n].inside &&
                i.inside[n].pattern.test(a.code)
              ) {
                var r = n.match(/^language-(.+)/)[1];
                Prism.languages[r] &&
                  (i.inside[n].inside = {
                    rest:
                      ((e = Prism.languages[r]),
                      Prism.plugins.autolinker &&
                        Prism.plugins.autolinker.processGrammar(e),
                      e),
                  });
              }
          var e;
          Prism.plugins.dataURIHighlight.processGrammar(a.grammar);
        });
    }
  })();
  !(function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
      var e = { "(": ")", "[": "]", "{": "}" },
        t = { "(": "brace-round", "[": "brace-square", "{": "brace-curly" },
        n = { "${": "{" },
        r = 0,
        c = /^(pair-\d+-)(close|open)$/;
      Prism.hooks.add("complete", function (c) {
        var i = c.element,
          d = i.parentElement;
        if (d && "PRE" == d.tagName) {
          var u = [];
          if (
            (Prism.util.isActive(i, "match-braces") && u.push("(", "[", "{"),
            0 != u.length)
          ) {
            d.__listenerAdded ||
              (d.addEventListener("mousedown", function () {
                var e = d.querySelector("code"),
                  t = s("brace-selected");
                Array.prototype.slice
                  .call(e.querySelectorAll("." + t))
                  .forEach(function (e) {
                    e.classList.remove(t);
                  });
              }),
              Object.defineProperty(d, "__listenerAdded", { value: !0 }));
            var f = Array.prototype.slice.call(
                i.querySelectorAll(
                  "span." + s("token") + "." + s("punctuation")
                )
              ),
              h = [];
            u.forEach(function (c) {
              for (
                var i = e[c], d = s(t[c]), u = [], p = [], v = 0;
                v < f.length;
                v++
              ) {
                var m = f[v];
                if (0 == m.childElementCount) {
                  var b = m.textContent;
                  (b = n[b] || b) === c
                    ? (h.push({ index: v, open: !0, element: m }),
                      m.classList.add(d),
                      m.classList.add(s("brace-open")),
                      p.push(v))
                    : b === i &&
                      (h.push({ index: v, open: !1, element: m }),
                      m.classList.add(d),
                      m.classList.add(s("brace-close")),
                      p.length && u.push([v, p.pop()]));
                }
              }
              u.forEach(function (e) {
                var t = "pair-" + r++ + "-",
                  n = f[e[0]],
                  c = f[e[1]];
                (n.id = t + "open"),
                  (c.id = t + "close"),
                  [n, c].forEach(function (e) {
                    e.addEventListener("mouseenter", a),
                      e.addEventListener("mouseleave", o),
                      e.addEventListener("click", l);
                  });
              });
            });
            var p = 0;
            h.sort(function (e, t) {
              return e.index - t.index;
            }),
              h.forEach(function (e) {
                e.open
                  ? (e.element.classList.add(
                      s("brace-level-" + ((p % 12) + 1))
                    ),
                    p++)
                  : ((p = Math.max(0, p - 1)),
                    e.element.classList.add(
                      s("brace-level-" + ((p % 12) + 1))
                    ));
              });
          }
        }
      });
    }
    function s(e) {
      var t = Prism.plugins.customClass;
      return t ? t.apply(e, "none") : e;
    }
    function i(e) {
      var t = c.exec(e.id);
      return document.querySelector(
        "#" + t[1] + ("open" == t[2] ? "close" : "open")
      );
    }
    function a() {
      Prism.util.isActive(this, "brace-hover", !0) &&
        [this, i(this)].forEach(function (e) {
          e.classList.add(s("brace-hover"));
        });
    }
    function o() {
      [this, i(this)].forEach(function (e) {
        e.classList.remove(s("brace-hover"));
      });
    }
    function l() {
      Prism.util.isActive(this, "brace-select", !0) &&
        [this, i(this)].forEach(function (e) {
          e.classList.add(s("brace-selected"));
        });
    }
  })();
  !(function () {
    if ("undefined" != typeof Prism) {
      var e = /^diff-([\w-]+)/i,
        i =
          /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
        a = RegExp(
          "(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))".replace(
            /__/g,
            function () {
              return i.source;
            }
          ),
          "gi"
        ),
        s = !1;
      Prism.hooks.add("before-sanity-check", function (i) {
        var a = i.language;
        e.test(a) &&
          !i.grammar &&
          (i.grammar = Prism.languages[a] = Prism.languages.diff);
      }),
        Prism.hooks.add("before-tokenize", function (i) {
          s ||
            Prism.languages.diff ||
            Prism.plugins.autoloader ||
            ((s = !0),
            console.warn(
              "Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js).Make sure the language definition is loaded or use Prism's Autoloader plugin."
            ));
          var a = i.language;
          e.test(a) &&
            !Prism.languages[a] &&
            (Prism.languages[a] = Prism.languages.diff);
        }),
        Prism.hooks.add("wrap", function (s) {
          var r, n;
          if ("diff" !== s.language) {
            var g = e.exec(s.language);
            if (!g) return;
            (r = g[1]), (n = Prism.languages[r]);
          }
          var f = Prism.languages.diff && Prism.languages.diff.PREFIXES;
          if (f && s.type in f) {
            var u,
              l = s.content
                .replace(i, "")
                .replace(/&lt;/g, "<")
                .replace(/&amp;/g, "&"),
              t = l.replace(/(^|[\r\n])./g, "$1");
            u = n ? Prism.highlight(t, n, r) : Prism.util.encode(t);
            var o,
              m = new Prism.Token("prefix", f[s.type], [/\w+/.exec(s.type)[0]]),
              d = Prism.Token.stringify(m, s.language),
              c = [];
            for (a.lastIndex = 0; (o = a.exec(u)); ) c.push(d + o[0]);
            /(?:^|[\r\n]).$/.test(l) && c.push(d),
              (s.content = c.join("")),
              n && s.classes.push("language-" + r);
          }
        });
    }
  })();
  !(function () {
    if ("undefined" != typeof Prism && "undefined" != typeof document) {
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector);
      var e,
        t = Prism.util.currentScript(),
        n = [],
        r = (Prism.plugins.filterHighlightAll = {
          add: function (e) {
            n.push(function (t) {
              return e({ element: t, language: Prism.util.getLanguage(t) });
            });
          },
          addSelector: function (e) {
            n.push(function (t) {
              return t.matches(e);
            });
          },
          reject: {
            add: function (e) {
              n.push(function (t) {
                return !e({ element: t, language: Prism.util.getLanguage(t) });
              });
            },
            addSelector: function (e) {
              n.push(function (t) {
                return !t.matches(e);
              });
            },
          },
          filterKnown: !!t && t.hasAttribute("data-filter-known"),
        });
      r.add(function (e) {
        return !r.filterKnown || "object" == typeof Prism.languages[e.language];
      }),
        t &&
          ((e = t.getAttribute("data-filter-selector")) && r.addSelector(e),
          (e = t.getAttribute("data-reject-selector")) &&
            r.reject.addSelector(e)),
        Prism.hooks.add("before-all-elements-highlight", function (e) {
          e.elements = e.elements.filter(i);
        });
    }
    function i(e) {
      for (var t = 0, r = n.length; t < r; t++) if (!n[t](e)) return !1;
      return !0;
    }
  })();
}