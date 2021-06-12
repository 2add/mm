/*!
    localForage -- Offline Storage, Improved
    Version 1.4.2
    https://mozilla.github.io/localForage
    (c) 2013-2015 Mozilla, Apache License 2.0
*/
! function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.localforage = a()
    }
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(a, b, c) {
            (function(a) {
                "use strict";

                function c() {
                    k = !0;
                    for (var a, b, c = l.length; c;) {
                        for (b = l, l = [], a = -1; ++a < c;) b[a]();
                        c = l.length
                    }
                    k = !1
                }

                function d(a) {
                    1 !== l.push(a) || k || e()
                }
                var e, f = a.MutationObserver || a.WebKitMutationObserver;
                if (f) {
                    var g = 0,
                        h = new f(c),
                        i = a.document.createTextNode("");
                    h.observe(i, {
                        characterData: !0
                    }), e = function() {
                        i.data = g = ++g % 2
                    }
                } else if (a.setImmediate || "undefined" == typeof a.MessageChannel) e = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function() {
                    var b = a.document.createElement("script");
                    b.onreadystatechange = function() {
                        c(), b.onreadystatechange = null, b.parentNode.removeChild(b), b = null
                    }, a.document.documentElement.appendChild(b)
                } : function() {
                    setTimeout(c, 0)
                };
                else {
                    var j = new a.MessageChannel;
                    j.port1.onmessage = c, e = function() {
                        j.port2.postMessage(0)
                    }
                }
                var k, l = [];
                b.exports = d
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        2: [function(a, b, c) {
            "use strict";

            function d() {}

            function e(a) {
                if ("function" != typeof a) throw new TypeError("resolver must be a function");
                this.state = s, this.queue = [], this.outcome = void 0, a !== d && i(this, a)
            }

            function f(a, b, c) {
                this.promise = a, "function" == typeof b && (this.onFulfilled = b, this.callFulfilled = this.otherCallFulfilled), "function" == typeof c && (this.onRejected = c, this.callRejected = this.otherCallRejected)
            }

            function g(a, b, c) {
                o(function() {
                    var d;
                    try {
                        d = b(c)
                    } catch (e) {
                        return p.reject(a, e)
                    }
                    d === a ? p.reject(a, new TypeError("Cannot resolve promise with itself")) : p.resolve(a, d)
                })
            }

            function h(a) {
                var b = a && a.then;
                return a && "object" == typeof a && "function" == typeof b ? function() {
                    b.apply(a, arguments)
                } : void 0
            }

            function i(a, b) {
                function c(b) {
                    f || (f = !0, p.reject(a, b))
                }

                function d(b) {
                    f || (f = !0, p.resolve(a, b))
                }

                function e() {
                    b(d, c)
                }
                var f = !1,
                    g = j(e);
                "error" === g.status && c(g.value)
            }

            function j(a, b) {
                var c = {};
                try {
                    c.value = a(b), c.status = "success"
                } catch (d) {
                    c.status = "error", c.value = d
                }
                return c
            }

            function k(a) {
                return a instanceof this ? a : p.resolve(new this(d), a)
            }

            function l(a) {
                var b = new this(d);
                return p.reject(b, a)
            }

            function m(a) {
                function b(a, b) {
                    function d(a) {
                        g[b] = a, ++h !== e || f || (f = !0, p.resolve(j, g))
                    }
                    c.resolve(a).then(d, function(a) {
                        f || (f = !0, p.reject(j, a))
                    })
                }
                var c = this;
                if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array"));
                var e = a.length,
                    f = !1;
                if (!e) return this.resolve([]);
                for (var g = new Array(e), h = 0, i = -1, j = new this(d); ++i < e;) b(a[i], i);
                return j
            }

            function n(a) {
                function b(a) {
                    c.resolve(a).then(function(a) {
                        f || (f = !0, p.resolve(h, a))
                    }, function(a) {
                        f || (f = !0, p.reject(h, a))
                    })
                }
                var c = this;
                if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array"));
                var e = a.length,
                    f = !1;
                if (!e) return this.resolve([]);
                for (var g = -1, h = new this(d); ++g < e;) b(a[g]);
                return h
            }
            var o = a(1),
                p = {},
                q = ["REJECTED"],
                r = ["FULFILLED"],
                s = ["PENDING"];
            b.exports = c = e, e.prototype["catch"] = function(a) {
                return this.then(null, a)
            }, e.prototype.then = function(a, b) {
                if ("function" != typeof a && this.state === r || "function" != typeof b && this.state === q) return this;
                var c = new this.constructor(d);
                if (this.state !== s) {
                    var e = this.state === r ? a : b;
                    g(c, e, this.outcome)
                } else this.queue.push(new f(c, a, b));
                return c
            }, f.prototype.callFulfilled = function(a) {
                p.resolve(this.promise, a)
            }, f.prototype.otherCallFulfilled = function(a) {
                g(this.promise, this.onFulfilled, a)
            }, f.prototype.callRejected = function(a) {
                p.reject(this.promise, a)
            }, f.prototype.otherCallRejected = function(a) {
                g(this.promise, this.onRejected, a)
            }, p.resolve = function(a, b) {
                var c = j(h, b);
                if ("error" === c.status) return p.reject(a, c.value);
                var d = c.value;
                if (d) i(a, d);
                else {
                    a.state = r, a.outcome = b;
                    for (var e = -1, f = a.queue.length; ++e < f;) a.queue[e].callFulfilled(b)
                }
                return a
            }, p.reject = function(a, b) {
                a.state = q, a.outcome = b;
                for (var c = -1, d = a.queue.length; ++c < d;) a.queue[c].callRejected(b);
                return a
            }, c.resolve = k, c.reject = l, c.all = m, c.race = n
        }, {
            1: 1
        }],
        3: [function(a, b, c) {
            (function(b) {
                "use strict";
                "function" != typeof b.Promise && (b.Promise = a(2))
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            2: 2
        }],
        4: [function(a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function e() {
                return "undefined" != typeof indexedDB ? indexedDB : "undefined" != typeof webkitIndexedDB ? webkitIndexedDB : "undefined" != typeof mozIndexedDB ? mozIndexedDB : "undefined" != typeof OIndexedDB ? OIndexedDB : "undefined" != typeof msIndexedDB ? msIndexedDB : void 0
            }

            function f() {
                try {
                    return fa ? "undefined" != typeof openDatabase && "undefined" != typeof navigator && navigator.userAgent && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) ? !1 : fa && "function" == typeof fa.open && "undefined" != typeof IDBKeyRange : !1
                } catch (a) {
                    return !1
                }
            }

            function g() {
                return "function" == typeof openDatabase
            }

            function h() {
                try {
                    return "undefined" != typeof localStorage && "setItem" in localStorage && localStorage.setItem
                } catch (a) {
                    return !1
                }
            }

            function i(a, b) {
                a = a || [], b = b || {};
                try {
                    return new Blob(a, b)
                } catch (c) {
                    if ("TypeError" !== c.name) throw c;
                    for (var d = "undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder, e = new d, f = 0; f < a.length; f += 1) e.append(a[f]);
                    return e.getBlob(b.type)
                }
            }

            function j(a, b) {
                b && a.then(function(a) {
                    b(null, a)
                }, function(a) {
                    b(a)
                })
            }

            function k(a) {
                for (var b = a.length, c = new ArrayBuffer(b), d = new Uint8Array(c), e = 0; b > e; e++) d[e] = a.charCodeAt(e);
                return c
            }

            function l(a) {
                return new ia(function(b) {
                    var c = i([""]);
                    a.objectStore(ja).put(c, "key"), a.onabort = function(a) {
                        a.preventDefault(), a.stopPropagation(), b(!1)
                    }, a.oncomplete = function() {
                        var a = navigator.userAgent.match(/Chrome\/(\d+)/),
                            c = navigator.userAgent.match(/Edge\//);
                        b(c || !a || parseInt(a[1], 10) >= 43)
                    }
                })["catch"](function() {
                    return !1
                })
            }

            function m(a) {
                return "boolean" == typeof ga ? ia.resolve(ga) : l(a).then(function(a) {
                    return ga = a
                })
            }

            function n(a) {
                var b = ha[a.name],
                    c = {};
                c.promise = new ia(function(a) {
                    c.resolve = a
                }), b.deferredOperations.push(c), b.dbReady ? b.dbReady = b.dbReady.then(function() {
                    return c.promise
                }) : b.dbReady = c.promise
            }

            function o(a) {
                var b = ha[a.name],
                    c = b.deferredOperations.pop();
                c && c.resolve()
            }

            function p(a, b) {
                return new ia(function(c, d) {
                    if (a.db) {
                        if (!b) return c(a.db);
                        n(a), a.db.close()
                    }
                    var e = [a.name];
                    b && e.push(a.version);
                    var f = fa.open.apply(fa, e);
                    b && (f.onupgradeneeded = function(b) {
                        var c = f.result;
                        try {
                            c.createObjectStore(a.storeName), b.oldVersion <= 1 && c.createObjectStore(ja)
                        } catch (d) {
                            if ("ConstraintError" !== d.name) throw d;
                            console.warn('The database "' + a.name + '" has been upgraded from version ' + b.oldVersion + " to version " + b.newVersion + ', but the storage "' + a.storeName + '" already exists.')
                        }
                    }), f.onerror = function() {
                        d(f.error)
                    }, f.onsuccess = function() {
                        c(f.result), o(a)
                    }
                })
            }

            function q(a) {
                return p(a, !1)
            }

            function r(a) {
                return p(a, !0)
            }

            function s(a, b) {
                if (!a.db) return !0;
                var c = !a.db.objectStoreNames.contains(a.storeName),
                    d = a.version < a.db.version,
                    e = a.version > a.db.version;
                if (d && (a.version !== b && console.warn('The database "' + a.name + "\" can't be downgraded from version " + a.db.version + " to version " + a.version + "."), a.version = a.db.version), e || c) {
                    if (c) {
                        var f = a.db.version + 1;
                        f > a.version && (a.version = f)
                    }
                    return !0
                }
                return !1
            }

            function t(a) {
                return new ia(function(b, c) {
                    var d = new FileReader;
                    d.onerror = c, d.onloadend = function(c) {
                        var d = btoa(c.target.result || "");
                        b({
                            __local_forage_encoded_blob: !0,
                            data: d,
                            type: a.type
                        })
                    }, d.readAsBinaryString(a)
                })
            }

            function u(a) {
                var b = k(atob(a.data));
                return i([b], {
                    type: a.type
                })
            }

            function v(a) {
                return a && a.__local_forage_encoded_blob
            }

            function w(a) {
                var b = this,
                    c = b._initReady().then(function() {
                        var a = ha[b._dbInfo.name];
                        return a && a.dbReady ? a.dbReady : void 0
                    });
                return c.then(a, a), c
            }

            function x(a) {
                function b() {
                    return ia.resolve()
                }
                var c = this,
                    d = {
                        db: null
                    };
                if (a)
                    for (var e in a) d[e] = a[e];
                ha || (ha = {});
                var f = ha[d.name];
                f || (f = {
                    forages: [],
                    db: null,
                    dbReady: null,
                    deferredOperations: []
                }, ha[d.name] = f), f.forages.push(c), c._initReady || (c._initReady = c.ready, c.ready = w);
                for (var g = [], h = 0; h < f.forages.length; h++) {
                    var i = f.forages[h];
                    i !== c && g.push(i._initReady()["catch"](b))
                }
                var j = f.forages.slice(0);
                return ia.all(g).then(function() {
                    return d.db = f.db, q(d)
                }).then(function(a) {
                    return d.db = a, s(d, c._defaultConfig.version) ? r(d) : a
                }).then(function(a) {
                    d.db = f.db = a, c._dbInfo = d;
                    for (var b = 0; b < j.length; b++) {
                        var e = j[b];
                        e !== c && (e._dbInfo.db = d.db, e._dbInfo.version = d.version)
                    }
                })
            }

            function y(a, b) {
                var c = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var d = new ia(function(b, d) {
                    c.ready().then(function() {
                        var e = c._dbInfo,
                            f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                            g = f.get(a);
                        g.onsuccess = function() {
                            var a = g.result;
                            void 0 === a && (a = null), v(a) && (a = u(a)), b(a)
                        }, g.onerror = function() {
                            d(g.error)
                        }
                    })["catch"](d)
                });
                return j(d, b), d
            }

            function z(a, b) {
                var c = this,
                    d = new ia(function(b, d) {
                        c.ready().then(function() {
                            var e = c._dbInfo,
                                f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                                g = f.openCursor(),
                                h = 1;
                            g.onsuccess = function() {
                                var c = g.result;
                                if (c) {
                                    var d = c.value;
                                    v(d) && (d = u(d));
                                    var e = a(d, c.key, h++);
                                    void 0 !== e ? b(e) : c["continue"]()
                                } else b()
                            }, g.onerror = function() {
                                d(g.error)
                            }
                        })["catch"](d)
                    });
                return j(d, b), d
            }

            function A(a, b, c) {
                var d = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var e = new ia(function(c, e) {
                    var f;
                    d.ready().then(function() {
                        return f = d._dbInfo, b instanceof Blob ? m(f.db).then(function(a) {
                            return a ? b : t(b)
                        }) : b
                    }).then(function(b) {
                        var d = f.db.transaction(f.storeName, "readwrite"),
                            g = d.objectStore(f.storeName);
                        null === b && (b = void 0), d.oncomplete = function() {
                            void 0 === b && (b = null), c(b)
                        }, d.onabort = d.onerror = function() {
                            var a = h.error ? h.error : h.transaction.error;
                            e(a)
                        };
                        var h = g.put(b, a)
                    })["catch"](e)
                });
                return j(e, c), e
            }

            function B(a, b) {
                var c = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var d = new ia(function(b, d) {
                    c.ready().then(function() {
                        var e = c._dbInfo,
                            f = e.db.transaction(e.storeName, "readwrite"),
                            g = f.objectStore(e.storeName),
                            h = g["delete"](a);
                        f.oncomplete = function() {
                            b()
                        }, f.onerror = function() {
                            d(h.error)
                        }, f.onabort = function() {
                            var a = h.error ? h.error : h.transaction.error;
                            d(a)
                        }
                    })["catch"](d)
                });
                return j(d, b), d
            }

            function C(a) {
                var b = this,
                    c = new ia(function(a, c) {
                        b.ready().then(function() {
                            var d = b._dbInfo,
                                e = d.db.transaction(d.storeName, "readwrite"),
                                f = e.objectStore(d.storeName),
                                g = f.clear();
                            e.oncomplete = function() {
                                a()
                            }, e.onabort = e.onerror = function() {
                                var a = g.error ? g.error : g.transaction.error;
                                c(a)
                            }
                        })["catch"](c)
                    });
                return j(c, a), c
            }

            function D(a) {
                var b = this,
                    c = new ia(function(a, c) {
                        b.ready().then(function() {
                            var d = b._dbInfo,
                                e = d.db.transaction(d.storeName, "readonly").objectStore(d.storeName),
                                f = e.count();
                            f.onsuccess = function() {
                                a(f.result)
                            }, f.onerror = function() {
                                c(f.error)
                            }
                        })["catch"](c)
                    });
                return j(c, a), c
            }

            function E(a, b) {
                var c = this,
                    d = new ia(function(b, d) {
                        return 0 > a ? void b(null) : void c.ready().then(function() {
                            var e = c._dbInfo,
                                f = e.db.transaction(e.storeName, "readonly").objectStore(e.storeName),
                                g = !1,
                                h = f.openCursor();
                            h.onsuccess = function() {
                                var c = h.result;
                                return c ? void(0 === a ? b(c.key) : g ? b(c.key) : (g = !0, c.advance(a))) : void b(null)
                            }, h.onerror = function() {
                                d(h.error)
                            }
                        })["catch"](d)
                    });
                return j(d, b), d
            }

            function F(a) {
                var b = this,
                    c = new ia(function(a, c) {
                        b.ready().then(function() {
                            var d = b._dbInfo,
                                e = d.db.transaction(d.storeName, "readonly").objectStore(d.storeName),
                                f = e.openCursor(),
                                g = [];
                            f.onsuccess = function() {
                                var b = f.result;
                                return b ? (g.push(b.key), void b["continue"]()) : void a(g)
                            }, f.onerror = function() {
                                c(f.error)
                            }
                        })["catch"](c)
                    });
                return j(c, a), c
            }

            function G(a) {
                var b, c, d, e, f, g = .75 * a.length,
                    h = a.length,
                    i = 0;
                "=" === a[a.length - 1] && (g--, "=" === a[a.length - 2] && g--);
                var j = new ArrayBuffer(g),
                    k = new Uint8Array(j);
                for (b = 0; h > b; b += 4) c = la.indexOf(a[b]), d = la.indexOf(a[b + 1]), e = la.indexOf(a[b + 2]), f = la.indexOf(a[b + 3]), k[i++] = c << 2 | d >> 4, k[i++] = (15 & d) << 4 | e >> 2, k[i++] = (3 & e) << 6 | 63 & f;
                return j
            }

            function H(a) {
                var b, c = new Uint8Array(a),
                    d = "";
                for (b = 0; b < c.length; b += 3) d += la[c[b] >> 2], d += la[(3 & c[b]) << 4 | c[b + 1] >> 4], d += la[(15 & c[b + 1]) << 2 | c[b + 2] >> 6], d += la[63 & c[b + 2]];
                return c.length % 3 === 2 ? d = d.substring(0, d.length - 1) + "=" : c.length % 3 === 1 && (d = d.substring(0, d.length - 2) + "=="), d
            }

            function I(a, b) {
                var c = "";
                if (a && (c = a.toString()), a && ("[object ArrayBuffer]" === a.toString() || a.buffer && "[object ArrayBuffer]" === a.buffer.toString())) {
                    var d, e = oa;
                    a instanceof ArrayBuffer ? (d = a, e += qa) : (d = a.buffer, "[object Int8Array]" === c ? e += sa : "[object Uint8Array]" === c ? e += ta : "[object Uint8ClampedArray]" === c ? e += ua : "[object Int16Array]" === c ? e += va : "[object Uint16Array]" === c ? e += xa : "[object Int32Array]" === c ? e += wa : "[object Uint32Array]" === c ? e += ya : "[object Float32Array]" === c ? e += za : "[object Float64Array]" === c ? e += Aa : b(new Error("Failed to get type for BinaryArray"))), b(e + H(d))
                } else if ("[object Blob]" === c) {
                    var f = new FileReader;
                    f.onload = function() {
                        var c = ma + a.type + "~" + H(this.result);
                        b(oa + ra + c)
                    }, f.readAsArrayBuffer(a)
                } else try {
                    b(JSON.stringify(a))
                } catch (g) {
                    console.error("Couldn't convert value into a JSON string: ", a), b(null, g)
                }
            }

            function J(a) {
                if (a.substring(0, pa) !== oa) return JSON.parse(a);
                var b, c = a.substring(Ba),
                    d = a.substring(pa, Ba);
                if (d === ra && na.test(c)) {
                    var e = c.match(na);
                    b = e[1], c = c.substring(e[0].length)
                }
                var f = G(c);
                switch (d) {
                    case qa:
                        return f;
                    case ra:
                        return i([f], {
                            type: b
                        });
                    case sa:
                        return new Int8Array(f);
                    case ta:
                        return new Uint8Array(f);
                    case ua:
                        return new Uint8ClampedArray(f);
                    case va:
                        return new Int16Array(f);
                    case xa:
                        return new Uint16Array(f);
                    case wa:
                        return new Int32Array(f);
                    case ya:
                        return new Uint32Array(f);
                    case za:
                        return new Float32Array(f);
                    case Aa:
                        return new Float64Array(f);
                    default:
                        throw new Error("Unkown type: " + d)
                }
            }

            function K(a) {
                var b = this,
                    c = {
                        db: null
                    };
                if (a)
                    for (var d in a) c[d] = "string" != typeof a[d] ? a[d].toString() : a[d];
                var e = new ia(function(a, d) {
                    try {
                        c.db = openDatabase(c.name, String(c.version), c.description, c.size)
                    } catch (e) {
                        return d(e)
                    }
                    c.db.transaction(function(e) {
                        e.executeSql("CREATE TABLE IF NOT EXISTS " + c.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], function() {
                            b._dbInfo = c, a()
                        }, function(a, b) {
                            d(b)
                        })
                    })
                });
                return c.serializer = Ca, e
            }

            function L(a, b) {
                var c = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var d = new ia(function(b, d) {
                    c.ready().then(function() {
                        var e = c._dbInfo;
                        e.db.transaction(function(c) {
                            c.executeSql("SELECT * FROM " + e.storeName + " WHERE key = ? LIMIT 1", [a], function(a, c) {
                                var d = c.rows.length ? c.rows.item(0).value : null;
                                d && (d = e.serializer.deserialize(d)), b(d)
                            }, function(a, b) {
                                d(b)
                            })
                        })
                    })["catch"](d)
                });
                return j(d, b), d
            }

            function M(a, b) {
                var c = this,
                    d = new ia(function(b, d) {
                        c.ready().then(function() {
                            var e = c._dbInfo;
                            e.db.transaction(function(c) {
                                c.executeSql("SELECT * FROM " + e.storeName, [], function(c, d) {
                                    for (var f = d.rows, g = f.length, h = 0; g > h; h++) {
                                        var i = f.item(h),
                                            j = i.value;
                                        if (j && (j = e.serializer.deserialize(j)), j = a(j, i.key, h + 1), void 0 !== j) return void b(j)
                                    }
                                    b()
                                }, function(a, b) {
                                    d(b)
                                })
                            })
                        })["catch"](d)
                    });
                return j(d, b), d
            }

            function N(a, b, c) {
                var d = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var e = new ia(function(c, e) {
                    d.ready().then(function() {
                        void 0 === b && (b = null);
                        var f = b,
                            g = d._dbInfo;
                        g.serializer.serialize(b, function(b, d) {
                            d ? e(d) : g.db.transaction(function(d) {
                                d.executeSql("INSERT OR REPLACE INTO " + g.storeName + " (key, value) VALUES (?, ?)", [a, b], function() {
                                    c(f)
                                }, function(a, b) {
                                    e(b)
                                })
                            }, function(a) {
                                a.code === a.QUOTA_ERR && e(a)
                            })
                        })
                    })["catch"](e)
                });
                return j(e, c), e
            }

            function O(a, b) {
                var c = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var d = new ia(function(b, d) {
                    c.ready().then(function() {
                        var e = c._dbInfo;
                        e.db.transaction(function(c) {
                            c.executeSql("DELETE FROM " + e.storeName + " WHERE key = ?", [a], function() {
                                b()
                            }, function(a, b) {
                                d(b)
                            })
                        })
                    })["catch"](d)
                });
                return j(d, b), d
            }

            function P(a) {
                var b = this,
                    c = new ia(function(a, c) {
                        b.ready().then(function() {
                            var d = b._dbInfo;
                            d.db.transaction(function(b) {
                                b.executeSql("DELETE FROM " + d.storeName, [], function() {
                                    a()
                                }, function(a, b) {
                                    c(b)
                                })
                            })
                        })["catch"](c)
                    });
                return j(c, a), c
            }

            function Q(a) {
                var b = this,
                    c = new ia(function(a, c) {
                        b.ready().then(function() {
                            var d = b._dbInfo;
                            d.db.transaction(function(b) {
                                b.executeSql("SELECT COUNT(key) as c FROM " + d.storeName, [], function(b, c) {
                                    var d = c.rows.item(0).c;
                                    a(d)
                                }, function(a, b) {
                                    c(b)
                                })
                            })
                        })["catch"](c)
                    });
                return j(c, a), c
            }

            function R(a, b) {
                var c = this,
                    d = new ia(function(b, d) {
                        c.ready().then(function() {
                            var e = c._dbInfo;
                            e.db.transaction(function(c) {
                                c.executeSql("SELECT key FROM " + e.storeName + " WHERE id = ? LIMIT 1", [a + 1], function(a, c) {
                                    var d = c.rows.length ? c.rows.item(0).key : null;
                                    b(d)
                                }, function(a, b) {
                                    d(b)
                                })
                            })
                        })["catch"](d)
                    });
                return j(d, b), d
            }

            function S(a) {
                var b = this,
                    c = new ia(function(a, c) {
                        b.ready().then(function() {
                            var d = b._dbInfo;
                            d.db.transaction(function(b) {
                                b.executeSql("SELECT key FROM " + d.storeName, [], function(b, c) {
                                    for (var d = [], e = 0; e < c.rows.length; e++) d.push(c.rows.item(e).key);
                                    a(d)
                                }, function(a, b) {
                                    c(b)
                                })
                            })
                        })["catch"](c)
                    });
                return j(c, a), c
            }

            function T(a) {
                var b = this,
                    c = {};
                if (a)
                    for (var d in a) c[d] = a[d];
                return c.keyPrefix = c.name + "/", c.storeName !== b._defaultConfig.storeName && (c.keyPrefix += c.storeName + "/"), b._dbInfo = c, c.serializer = Ca, ia.resolve()
            }

            function U(a) {
                var b = this,
                    c = b.ready().then(function() {
                        for (var a = b._dbInfo.keyPrefix, c = localStorage.length - 1; c >= 0; c--) {
                            var d = localStorage.key(c);
                            0 === d.indexOf(a) && localStorage.removeItem(d)
                        }
                    });
                return j(c, a), c
            }

            function V(a, b) {
                var c = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var d = c.ready().then(function() {
                    var b = c._dbInfo,
                        d = localStorage.getItem(b.keyPrefix + a);
                    return d && (d = b.serializer.deserialize(d)), d
                });
                return j(d, b), d
            }

            function W(a, b) {
                var c = this,
                    d = c.ready().then(function() {
                        for (var b = c._dbInfo, d = b.keyPrefix, e = d.length, f = localStorage.length, g = 1, h = 0; f > h; h++) {
                            var i = localStorage.key(h);
                            if (0 === i.indexOf(d)) {
                                var j = localStorage.getItem(i);
                                if (j && (j = b.serializer.deserialize(j)), j = a(j, i.substring(e), g++), void 0 !== j) return j
                            }
                        }
                    });
                return j(d, b), d
            }

            function X(a, b) {
                var c = this,
                    d = c.ready().then(function() {
                        var b, d = c._dbInfo;
                        try {
                            b = localStorage.key(a)
                        } catch (e) {
                            b = null
                        }
                        return b && (b = b.substring(d.keyPrefix.length)), b
                    });
                return j(d, b), d
            }

            function Y(a) {
                var b = this,
                    c = b.ready().then(function() {
                        for (var a = b._dbInfo, c = localStorage.length, d = [], e = 0; c > e; e++) 0 === localStorage.key(e).indexOf(a.keyPrefix) && d.push(localStorage.key(e).substring(a.keyPrefix.length));
                        return d
                    });
                return j(c, a), c
            }

            function Z(a) {
                var b = this,
                    c = b.keys().then(function(a) {
                        return a.length
                    });
                return j(c, a), c
            }

            function $(a, b) {
                var c = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var d = c.ready().then(function() {
                    var b = c._dbInfo;
                    localStorage.removeItem(b.keyPrefix + a)
                });
                return j(d, b), d
            }

            function _(a, b, c) {
                var d = this;
                "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), a = String(a));
                var e = d.ready().then(function() {
                    void 0 === b && (b = null);
                    var c = b;
                    return new ia(function(e, f) {
                        var g = d._dbInfo;
                        g.serializer.serialize(b, function(b, d) {
                            if (d) f(d);
                            else try {
                                localStorage.setItem(g.keyPrefix + a, b), e(c)
                            } catch (h) {
                                "QuotaExceededError" !== h.name && "NS_ERROR_DOM_QUOTA_REACHED" !== h.name || f(h), f(h)
                            }
                        })
                    })
                });
                return j(e, c), e
            }

            function aa(a, b, c) {
                "function" == typeof b && a.then(b), "function" == typeof c && a["catch"](c)
            }

            function ba(a, b) {
                a[b] = function() {
                    var c = arguments;
                    return a.ready().then(function() {
                        return a[b].apply(a, c)
                    })
                }
            }

            function ca() {
                for (var a = 1; a < arguments.length; a++) {
                    var b = arguments[a];
                    if (b)
                        for (var c in b) b.hasOwnProperty(c) && (La(b[c]) ? arguments[0][c] = b[c].slice() : arguments[0][c] = b[c])
                }
                return arguments[0]
            }

            function da(a) {
                for (var b in Ga)
                    if (Ga.hasOwnProperty(b) && Ga[b] === a) return !0;
                return !1
            }
            var ea = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
                    return typeof a
                } : function(a) {
                    return a && "function" == typeof Symbol && a.constructor === Symbol ? "symbol" : typeof a
                },
                fa = e();
            "undefined" == typeof Promise && "undefined" != typeof a && a(3);
            var ga, ha, ia = Promise,
                ja = "local-forage-detect-blob-support",
                ka = {
                    _driver: "asyncStorage",
                    _initStorage: x,
                    iterate: z,
                    getItem: y,
                    setItem: A,
                    removeItem: B,
                    clear: C,
                    length: D,
                    key: E,
                    keys: F
                },
                la = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                ma = "~~local_forage_type~",
                na = /^~~local_forage_type~([^~]+)~/,
                oa = "__lfsc__:",
                pa = oa.length,
                qa = "arbf",
                ra = "blob",
                sa = "si08",
                ta = "ui08",
                ua = "uic8",
                va = "si16",
                wa = "si32",
                xa = "ur16",
                ya = "ui32",
                za = "fl32",
                Aa = "fl64",
                Ba = pa + qa.length,
                Ca = {
                    serialize: I,
                    deserialize: J,
                    stringToBuffer: G,
                    bufferToString: H
                },
                Da = {
                    _driver: "webSQLStorage",
                    _initStorage: K,
                    iterate: M,
                    getItem: L,
                    setItem: N,
                    removeItem: O,
                    clear: P,
                    length: Q,
                    key: R,
                    keys: S
                },
                Ea = {
                    _driver: "localStorageWrapper",
                    _initStorage: T,
                    iterate: W,
                    getItem: V,
                    setItem: _,
                    removeItem: $,
                    clear: U,
                    length: Z,
                    key: X,
                    keys: Y
                },
                Fa = {},
                Ga = {
                    INDEXEDDB: "asyncStorage",
                    LOCALSTORAGE: "localStorageWrapper",
                    WEBSQL: "webSQLStorage"
                },
                Ha = [Ga.INDEXEDDB, Ga.WEBSQL, Ga.LOCALSTORAGE],
                Ia = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"],
                Ja = {
                    description: "",
                    driver: Ha.slice(),
                    name: "localforage",
                    size: 4980736,
                    storeName: "keyvaluepairs",
                    version: 1
                },
                Ka = {};
            Ka[Ga.INDEXEDDB] = f(), Ka[Ga.WEBSQL] = g(), Ka[Ga.LOCALSTORAGE] = h();
            var La = Array.isArray || function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                },
                Ma = function() {
                    function a(b) {
                        d(this, a), this.INDEXEDDB = Ga.INDEXEDDB, this.LOCALSTORAGE = Ga.LOCALSTORAGE, this.WEBSQL = Ga.WEBSQL, this._defaultConfig = ca({}, Ja), this._config = ca({}, this._defaultConfig, b), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver)
                    }
                    return a.prototype.config = function(a) {
                        if ("object" === ("undefined" == typeof a ? "undefined" : ea(a))) {
                            if (this._ready) return new Error("Can't call config() after localforage has been used.");
                            for (var b in a) "storeName" === b && (a[b] = a[b].replace(/\W/g, "_")), this._config[b] = a[b];
                            return "driver" in a && a.driver && this.setDriver(this._config.driver), !0
                        }
                        return "string" == typeof a ? this._config[a] : this._config
                    }, a.prototype.defineDriver = function(a, b, c) {
                        var d = new ia(function(b, c) {
                            try {
                                var d = a._driver,
                                    e = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),
                                    f = new Error("Custom driver name already in use: " + a._driver);
                                if (!a._driver) return void c(e);
                                if (da(a._driver)) return void c(f);
                                for (var g = Ia.concat("_initStorage"), h = 0; h < g.length; h++) {
                                    var i = g[h];
                                    if (!i || !a[i] || "function" != typeof a[i]) return void c(e)
                                }
                                var j = ia.resolve(!0);
                                "_support" in a && (j = a._support && "function" == typeof a._support ? a._support() : ia.resolve(!!a._support)), j.then(function(c) {
                                    Ka[d] = c, Fa[d] = a, b()
                                }, c)
                            } catch (k) {
                                c(k)
                            }
                        });
                        return aa(d, b, c), d
                    }, a.prototype.driver = function() {
                        return this._driver || null
                    }, a.prototype.getDriver = function(a, b, c) {
                        var d = this,
                            e = ia.resolve().then(function() {
                                if (!da(a)) {
                                    if (Fa[a]) return Fa[a];
                                    throw new Error("Driver not found.")
                                }
                                switch (a) {
                                    case d.INDEXEDDB:
                                        return ka;
                                    case d.LOCALSTORAGE:
                                        return Ea;
                                    case d.WEBSQL:
                                        return Da
                                }
                            });
                        return aa(e, b, c), e
                    }, a.prototype.getSerializer = function(a) {
                        var b = ia.resolve(Ca);
                        return aa(b, a), b
                    }, a.prototype.ready = function(a) {
                        var b = this,
                            c = b._driverSet.then(function() {
                                return null === b._ready && (b._ready = b._initDriver()), b._ready
                            });
                        return aa(c, a, a), c
                    }, a.prototype.setDriver = function(a, b, c) {
                        function d() {
                            f._config.driver = f.driver()
                        }

                        function e(a) {
                            return function() {
                                function b() {
                                    for (; c < a.length;) {
                                        var e = a[c];
                                        return c++, f._dbInfo = null, f._ready = null, f.getDriver(e).then(function(a) {
                                            return f._extend(a), d(), f._ready = f._initStorage(f._config), f._ready
                                        })["catch"](b)
                                    }
                                    d();
                                    var g = new Error("No available storage method found.");
                                    return f._driverSet = ia.reject(g), f._driverSet
                                }
                                var c = 0;
                                return b()
                            }
                        }
                        var f = this;
                        La(a) || (a = [a]);
                        var g = this._getSupportedDrivers(a),
                            h = null !== this._driverSet ? this._driverSet["catch"](function() {
                                return ia.resolve()
                            }) : ia.resolve();
                        return this._driverSet = h.then(function() {
                            var a = g[0];
                            return f._dbInfo = null, f._ready = null, f.getDriver(a).then(function(a) {
                                f._driver = a._driver, d(), f._wrapLibraryMethodsWithReady(), f._initDriver = e(g)
                            })
                        })["catch"](function() {
                            d();
                            var a = new Error("No available storage method found.");
                            return f._driverSet = ia.reject(a), f._driverSet
                        }), aa(this._driverSet, b, c), this._driverSet
                    }, a.prototype.supports = function(a) {
                        return !!Ka[a]
                    }, a.prototype._extend = function(a) {
                        ca(this, a)
                    }, a.prototype._getSupportedDrivers = function(a) {
                        for (var b = [], c = 0, d = a.length; d > c; c++) {
                            var e = a[c];
                            this.supports(e) && b.push(e)
                        }
                        return b
                    }, a.prototype._wrapLibraryMethodsWithReady = function() {
                        for (var a = 0; a < Ia.length; a++) ba(this, Ia[a])
                    }, a.prototype.createInstance = function(b) {
                        return new a(b)
                    }, a
                }(),
                Na = new Ma;
            b.exports = Na
        }, {
            3: 3
        }]
    }, {}, [4])(4)
});