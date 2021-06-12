! function t(e, i, o) {
    function n(r, l) {
        if (!i[r]) {
            if (!e[r]) {
                var a = "function" == typeof require && require;
                if (!l && a) return a(r, !0);
                if (s) return s(r, !0);
                var d = new Error("Cannot find module '" + r + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var p = i[r] = {
                exports: {}
            };
            e[r][0].call(p.exports, function(t) {
                var i = e[r][1][t];
                return n(i ? i : t)
            }, p, p.exports, t, e, i, o)
        }
        return i[r].exports
    }
    for (var s = "function" == typeof require && require, r = 0; r < o.length; r++) n(o[r]);
    return n
}({
    1: [function(t, e, i) {
        "use strict";

        function o() {
            var t = this,
                e = void 0,
                i = void 0,
                a = void 0,
                d = void 0;
            e = "Copyright 2015-2017 Glen Reesor", a = "<div id='" + o.DIALOG_ID + "' class='popup' style='height: " + (r.Sizer.popupHeight + "px'>") + "<p style='text-align: center; font-weight: bold;'>" + (n.App.MY_NAME + "</p>") + "<p style='text-align: center;'>Version: " + (s.m3App.getVersionAsString() + "</p>") + ("<p style='text-align: center;'>" + e + "</p>") + "<p style='font-weight: bold;'>Source Code</p><ul><li><a href='http://github.com/glenreesor/m3' target='_blank'>github.com/glenreesor/m3</a></li></ul><p style='font-weight: bold;'>Libraries</p><ul><li>localForage (Mozilla)</li></ul><p style='font-weight: bold;'>Icons</p><ul><li>User b.gaultier at openclipart.org</li><li>User warszawianka at openclipart.org</li><li>User netalloy at openclipart.org</li></ul><p style='font-weight: bold;'License</p><p style='font-size: 8pt'>Mobile Mind Mapper is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License, version 3, as published by the Free Software Foundation.</p><p style='font-size: 8pt'>Mobile Mind Mapper is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.</p><p style='font-size: 8pt'>You should have received a copy of the GNU General Public License along with Mobile Mind Mapper.  If not, see <a target='_blank' href=http://www.gnu.org/licenses/>http://www.gnu.org/licenses/</a>.</p>" + ("<button id='" + o.OK_ID + "'>Ok</button>") + "</div>", i = new DOMParser, d = i.parseFromString(a, "text/html"), this._aboutDialog = document.importNode(d.getElementById(o.DIALOG_ID), !0), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").appendChild(this._aboutDialog), document.getElementById(o.OK_ID).addEventListener("click", function() {
                return t.close()
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), s.m3App.getGlobalState().setState(l.State.STATE_DIALOG_ABOUT)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.AboutDialog = o;
        var n = t("./App"),
            s = t("./main"),
            r = t("./Sizer"),
            l = t("./State");
        o.DIALOG_ID = n.App.HTML_ID_PREFIX + "-aboutDialog", o.OK_ID = o.DIALOG_ID + "Ok", o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(n.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._aboutDialog), s.m3App.getGlobalState().setState(l.State.STATE_IDLE)
        }
    }, {
        "./App": 2,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    2: [function(t, e, i) {
        "use strict";

        function o() {
            this._diagnostics = new r.Diagnostics, this._globalState = new p.State
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        i.App = o;
        var s = t("./Controller"),
            r = t("./Diagnostics"),
            l = t("./ErrorDialog"),
            a = t("./MapModel"),
            d = t("./Sizer"),
            p = t("./State");
        o.DB_NAME = "m3 - Mobile Mind Mapper", o.HTML_ID_PREFIX = "m3-mobile-mind-mapper", o.KEY_LAST_VERSION_RUN = "lastVersionRun", o.KEY_MAPLIST = "mapList", o.KEY_INVOCATION_COUNT = "invocationCount", o.m3Path = null, o.myDB = null, o.MY_NAME = "m3 - Mobile Mind Mapper", o.MY_VERSION = {
            major: 0,
            minor: 12,
            patch: 0,
            isReleaseCandidate: !1,
            releaseCandidateNum: 1
        }, o.setM3Path = function() {
            var t = void 0,
                e = void 0,
                i = void 0;
            t = document.currentScript.src, i = t.lastIndexOf("/"), e = i === -1 ? "." : t.substring(0, i), o.m3Path = e
        }, o.prototype.getController = function() {
            return this._controller
        }, o.prototype.getDiagnostics = function() {
            return this._diagnostics
        }, o.prototype.getGlobalState = function() {
            return this._globalState
        }, o.prototype.getHeight = function() {
            return this._embeddingOptions.height
        }, o.prototype.getInitialMapName = function() {
            return this._embeddingOptions.initialMapName
        }, o.prototype.getInitialMapUrl = function() {
            return this._embeddingOptions.initialMapUrl
        }, o.prototype.getLoadableMaps = function() {
            return this._embeddingOptions.loadableMaps
        }, o.prototype._getLocalForageDriver = function() {
            var t = void 0;
            return t = localforage.createInstance({
                name: "storagetest"
            }), new Promise(function(e, i) {
                t.setDriver(localforage.INDEXEDDB), t.getItem("test").then(function(t) {
                    e(localforage.INDEXEDDB)
                }).catch(function(i) {
                    t.setDriver(localforage.WEBSQL), t.getItem("test").then(function(t) {
                        e(localforage.WEBSQL)
                    }).catch(function(t) {
                        e(localforage.LOCALSTORAGE)
                    })
                })
            })
        }, o.prototype.getMapFromUrl = function(t, e) {
            var i = void 0,
                o = void 0;
            i = new XMLHttpRequest, i ? (i.onreadystatechange = function() {
                4 === i.readyState && (200 !== i.status ? o = new l.ErrorDialog("Error Loading map from " + t + ": " + (i.status + " " + i.statusText)) : e([i.response]))
            }.bind(this), i.open("get", t), i.send()) : o = new l.ErrorDialog("Well what the heck--your browser can't load maps from URLs!")
        }, o.prototype.getMapModel = function() {
            return this._myMapModel
        }, o.prototype.getVersionAsString = function() {
            var t = void 0;
            return t = o.MY_VERSION.major + "." + (o.MY_VERSION.minor + ".") + ("" + o.MY_VERSION.patch), o.MY_VERSION.isReleaseCandidate && (t += " - Release Candidate " + o.MY_VERSION.releaseCandidateNum), t
        }, o.prototype.getWidth = function() {
            return this._embeddingOptions.width
        }, o.prototype.isFullPage = function() {
            return this._embeddingOptions.fullPage
        }, o.prototype.isReadOnly = function() {
            return this._embeddingOptions.readOnly
        }, o.prototype._isValidOrigin = function() {
            var t = /^([a-zA-Z]+:\/\/)([^\/]+)/,
                e = o.m3Path,
                i = void 0,
                n = void 0,
                s = window.top.location.href,
                r = void 0;
            return r = !1, e.match(/^file:/) ? r = !0 : e.match(/^[a-zA-Z]+:/) ? (i = t.exec(e), n = t.exec(s), i && i[2] && n && n[2] && i[2] === n[2] && (r = !0)) : r = !0, r
        }, o.prototype.showButtons = function() {
            return this._embeddingOptions.showButtons
        }, o.prototype.showMapName = function() {
            return this._embeddingOptions.showMapName
        }, o.prototype.run = function() {
            return this._isValidOrigin() ? (this._setEmbeddingOptions(), this._sizer = new d.Sizer, this.isFullPage() && (document.title = o.MY_NAME + " " + this.getVersionAsString()), this.warnOnNavigateAway() && window.addEventListener("beforeunload", function(t) {
                return t.returnValue = "Are you sure you want to exit?", t
            }), this._controller = new s.Controller, void this._startup()) : void alert("Please host m3 files on your own server. Full information can be found at http://glenreesor.ca/mobile-mind-mapper")
        }, o.prototype._setEmbeddingOptions = function() {
            var t = "m3MobileMindMapper",
                e = {
                    apiVersion: {
                        type: "string",
                        default: "0.12"
                    },
                    fullPage: {
                        type: "boolean",
                        default: !0
                    },
                    height: {
                        type: "string",
                        default: "100%"
                    },
                    initialMapName: {
                        type: "string",
                        default: null
                    },
                    initialMapUrl: {
                        type: "string",
                        default: null
                    },
                    loadableMaps: {
                        type: "array",
                        default: []
                    },
                    readOnly: {
                        type: "boolean",
                        default: !1
                    },
                    showButtons: {
                        type: "boolean",
                        default: !0
                    },
                    showMapName: {
                        type: "boolean",
                        default: !0
                    },
                    warnOnNavigateAway: {
                        type: "boolean",
                        default: !0
                    },
                    width: {
                        type: "string",
                        default: "100%"
                    }
                },
                i = void 0,
                s = void 0,
                r = void 0;
            if (r = window.parent[t]) {
                console.log("Validating window." + t + "...");
                for (i in r) {
                    if (!e[i]) throw i + " is not a valid " + o.MY_NAME + " option";
                    if (s = !1, "array" === e[i].type ? Array.isArray(r[i]) && (s = !0) : e[i].type === n(r[i]) && (s = !0), !s) throw i + " must be of type " + e[i].type
                }
                if ("0.12" !== r.apiVersion) throw "apiVersion must be 0.12";
                if (void 0 !== r.height && !r.height.match(/[0-9]+(%|px)/)) throw "height must be a valid CSS length string";
                if (void 0 !== r.width && !r.width.match(/[0-9]+(%|px)/)) throw "width must be a valid CSS length string";
                console.log("window.m3MobileMindMapper is valid."), this._embeddingOptions = {};
                for (i in e) this._embeddingOptions[i] = void 0 !== r[i] ? r[i] : e[i].default
            } else {
                this._embeddingOptions = {};
                for (i in e) this._embeddingOptions[i] = e[i].default
            }
        }, o.prototype.setMapModel = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0;
            if (null !== this._myMapModel) {
                o = this._myMapModel.getRootNode(), e = o.getChildren(), i = e.length;
                for (var n = 0; n < i; n++) o.deleteChild(e[0]);
                o.getView().deleteMyself()
            }
            this._myMapModel = t
        }, o.prototype.warnOnNavigateAway = function() {
            return this._embeddingOptions.warnOnNavigateAway
        }, o.prototype._upgradeFrom0_0_0_To_0_7_0 = function() {
            var t = "Map list should be empty",
                e = "map-" + Date.now(),
                i = "m3-map1",
                n = "Map 1",
                s = void 0;
            localforage.getItem(i).then(function(t) {
                return s = null !== t ? o.myDB.setItem(e, [t]) : Promise.resolve(null)
            }).then(function(e) {
                return s = null !== e ? localforage.removeItem(i) : Promise.resolve(t)
            }).then(function(i) {
                var s = [];
                return i !== t && s.push({
                    key: e,
                    name: n
                }), o.myDB.setItem(o.KEY_MAPLIST, s)
            }).catch(function(t) {
                new l.ErrorDialog("Error upgrading DB from previous version: " + t)
            })
        }, o.prototype._sendStatsToServer = function(t, e) {
            var i = void 0,
                o = void 0;
            null === t && (t = "0"), i = new XMLHttpRequest, i && (o = window.location.href.replace(/index\.html/, ""), o += "statLogger.php?oldVersion=" + t + ("&currentVersion=" + this.getVersionAsString()) + ("&invocationCount=" + e) + ("&userAgent=" + window.navigator.userAgent), i.onreadystatechange = function() {
                i.readyState
            }, i.open("POST", o), i.send())
        }, o.prototype._startup = function() {
            var t = this,
                e = "maps/prod/welcome.mm",
                i = void 0,
                n = void 0,
                s = void 0;
            !o.MY_VERSION.isReleaseCandidate && window.location.href.match(/\/m3-rc\/$/) && alert("m3 version " + this.getVersionAsString() + " has been released. Please switch to the regular non-release candidate location: http://glenreesor.ca/m3"), this._getLocalForageDriver().then(function(r) {
                var d = void 0;
                r === localforage.LOCALSTORAGE && alert("Warning: Your browser does not support the longterm reliable storage used by m3 for saving maps. Instead, your maps will be saved in 'localstorage', which may result in data loss on iOS."), d = {
                    name: o.DB_NAME,
                    driver: r
                }, o.myDB = localforage.createInstance(d), i = "updating invocation count", o.myDB.getItem(o.KEY_INVOCATION_COUNT).then(function(i) {
                    return null === i && (i = 0, t.getMapFromUrl(e, function(t) {
                        this._controller.newMap(a.MapModel.TYPE_XML, null, "Welcome", t)
                    }.bind(t))), s = i + 1, o.myDB.setItem(o.KEY_INVOCATION_COUNT, s)
                }).then(function() {
                    i = "retrieving last version run", o.myDB.getItem(o.KEY_LAST_VERSION_RUN).then(function(e) {
                        return n = e, null === e && t._upgradeFrom0_0_0_To_0_7_0(), i = "setting last version run", o.myDB.setItem(o.KEY_LAST_VERSION_RUN, t.getVersionAsString())
                    }).then(function() {
                        if (n !== t.getVersionAsString()) {
                            var e = window.location.href;
                            "http://glenreesor.ca/" !== e.substr(0, 21) && "http://127.0.0.1/" !== e.substr(0, 17) || (null !== n && alert("Congratulations! Your m3 has been updated to " + ("version " + t.getVersionAsString() + ".")), t._sendStatsToServer(n, s))
                        }
                    })
                }).catch(function(t) {
                    new l.ErrorDialog("Error " + i + ": " + t)
                })
            })
        }
    }, {
        "./Controller": 9,
        "./Diagnostics": 10,
        "./ErrorDialog": 12,
        "./MapModel": 24,
        "./Sizer": 32,
        "./State": 33
    }],
    3: [function(t, e, i) {
        "use strict";

        function o(t) {
            var e = this,
                i = void 0,
                o = void 0,
                n = void 0,
                r = void 0,
                l = void 0,
                d = void 0,
                p = void 0,
                h = void 0,
                c = void 0;
            h = a.m3App.showButtons() ? "" : "display: none;", p = a.m3App.showButtons() || a.m3App.getLoadableMaps().length > 0 ? "" : "display: none;", c = a.m3App.showButtons() && !a.m3App.isReadOnly() ? "" : "display: none", n = "" === h ? "right" : "" === p ? "left" : "right", this._controller = t, d = s.App.m3Path + "/images", i = "<div id='buttonsHtmlBottom' style='text-align: " + n + ";'>" + ("<span style='" + h + "'>") + "<img id='about'          style='margin-right: 10px' " + ("class='clickableIcon' src='" + d + "/info.svg' ") + "height='32px'></img><img id='importExport'   style='margin-right: 10px' " + ("class='clickableIcon' src='" + d + "/import-export.svg' ") + "height='32px'></img><img id='manage'         style='margin-right: 10px' " + ("class='clickableIcon' src='" + d + "/manage.svg' ") + "height='32px'></img><img id='save'           style='margin-right: 10px' " + ("class='clickableIcon' src='" + d + "/save.svg' ") + "height='32px'></img></span>" + ("<span style='" + p + "'>") + "<img id='load'           style='margin-right: 10px' " + ("class='clickableIcon' src='" + d + "/load.svg' ") + "height='32px'></img></span></div>", o = "<div id='buttonsHtmlRight' style='text-align: right;" + c + "'><img id='delete-node'    style='margin-bottom: 10px' " + ("class='clickableIcon' src='" + d + "/delete.svg' ") + "width='32px'><br><img id='cloud'          style='margin-bottom: 10px' " + ("class='clickableIcon' src='" + d + "/cloud.svg' ") + "width='32px'><br><img id='add-child'      style='margin-bottom: 10px' " + ("class='clickableIcon' src='" + d + "/add-child.svg' ") + "width='32px'><br><img id='add-sibling'    style='margin-bottom: 10px' " + ("class='clickableIcon' src='" + d + "/add-sibling.svg' ") + "width='32px'><br><img id='edit-node'      style='margin-bottom: 10px' " + ("class='clickableIcon' src='" + d + "/edit.svg' ") + "width='32px'></div>", r = new DOMParser, l = r.parseFromString(i, "text/html"), this._buttonsDivBottom = document.importNode(l.getElementById("buttonsHtmlBottom"), !0), document.getElementById(s.App.HTML_ID_PREFIX + "-app").appendChild(this._buttonsDivBottom), l = r.parseFromString(o, "text/html"), this._buttonsDivRight = document.importNode(l.getElementById("buttonsHtmlRight"), !0), document.getElementById(s.App.HTML_ID_PREFIX + "-right").appendChild(this._buttonsDivRight), document.getElementById("about").addEventListener("touchstart", function() {}), document.getElementById("importExport").addEventListener("touchstart", function() {}), document.getElementById("manage").addEventListener("touchstart", function() {}), document.getElementById("load").addEventListener("touchstart", function() {}), document.getElementById("save").addEventListener("touchstart", function() {}), document.getElementById("delete-node").addEventListener("touchstart", function() {}), document.getElementById("cloud").addEventListener("touchstart", function() {}), document.getElementById("add-child").addEventListener("touchstart", function() {}), document.getElementById("add-sibling").addEventListener("touchstart", function() {}), document.getElementById("edit-node").addEventListener("touchstart", function() {}), document.getElementById("about").addEventListener("click", function() {
                return e.about()
            }), document.getElementById("importExport").addEventListener("click", function() {
                return e.importExport()
            }), document.getElementById("manage").addEventListener("click", function() {
                return e.manage()
            }), document.getElementById("load").addEventListener("click", function() {
                return e.load()
            }), document.getElementById("save").addEventListener("click", function() {
                return t.getMapModel().save()
            })
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.AppButtons = o;
        var n = t("./AboutDialog"),
            s = t("./App"),
            r = t("./ImportExportDialog"),
            l = t("./LoadDialog"),
            a = t("./main"),
            d = t("./ManageSavedMapsDialog"),
            p = (t("./Sizer"), t("./State"));
        o.prototype.about = function() {
            var t = void 0;
            a.m3App.getGlobalState().getState() === p.State.STATE_IDLE && (t = new n.AboutDialog)
        }, o.prototype.importExport = function() {
            var t = void 0;
            a.m3App.getGlobalState().getState() === p.State.STATE_IDLE && (t = new r.ImportExportDialog)
        }, o.prototype.manage = function() {
            var t = void 0;
            a.m3App.getGlobalState().getState() === p.State.STATE_IDLE && (t = new d.ManageSavedMapsDialog)
        }, o.prototype.load = function() {
            var t = void 0;
            a.m3App.getGlobalState().getState() === p.State.STATE_IDLE && (t = new l.LoadDialog(this._controller))
        }, o.prototype.remove = function() {
            document.getElementById(s.App.HTML_ID_PREFIX + "-app").removeChild(this._buttonsDivBottom), document.getElementById(s.App.HTML_ID_PREFIX + "-app").removeChild(this._buttonsDivRight)
        }
    }, {
        "./AboutDialog": 1,
        "./App": 2,
        "./ImportExportDialog": 19,
        "./LoadDialog": 22,
        "./ManageSavedMapsDialog": 23,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    4: [function(t, e, i) {
        "use strict";

        function o() {
            this._destinationId = null, this._color = "#000000", this._endArrow = null, this._endInclination = null, this._id = null, this._myView = null, this._startArrow = null, this._startInclination = null, this._unexpectedAttributes = new Map, this._unexpectedTags = [], this._destinationNode = null
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.ArrowLink = o;
        var s = t("./Diagnostics"),
            r = t("./GraphicalLinkView"),
            l = t("./xmlHelpers"),
            a = t("./main"),
            d = new Map([
                ["COLOR", "#000000"],
                ["DESTINATION", ""],
                ["ENDARROW", ""],
                ["ENDINCLINATION", ""],
                ["ID", ""],
                ["STARTARROW", ""],
                ["STARTINCLINATION", ""]
            ]),
            p = [];
        o.prototype.connectToNodeModel = function(t) {
            this._destinationNode = t.getNodeModelById(t.getRoot(), this._destinationId)
        }, o.prototype.getAsXml = function() {
            var t = new Map,
                e = [];
            return t.set("DESTINATION", this._destinationId), t.set("COLOR", this._color), t.set("ENDARROW", this._endArrow), t.set("ENDINCLINATION", this._endInclination), t.set("ID", this._id), t.set("STARTARROW", this._startArrow), t.set("STARTINCLINATION", this._startInclination), e = (0, l.createXml)("arrowlink", d, t, this._unexpectedAttributes, [], this._unexpectedTags)
        }, o.prototype.getColor = function() {
            return this._color
        }, o.prototype.getDestinationId = function() {
            return this._destinationId
        }, o.prototype.getDestinationNode = function() {
            return this._destinationNode
        }, o.prototype.getEndArrow = function() {
            return this._endArrow
        }, o.prototype.getEndInclination = function() {
            return this._endInclination
        }, o.prototype.getId = function() {
            return this._id
        }, o.prototype.getStartArrow = function() {
            return this._startArrow
        }, o.prototype.getStartInclination = function() {
            return this._startInclination
        }, o.prototype.getView = function() {
            return null === this._myView && (this._myView = new r.GraphicalLinkView(this)), this._myView
        }, o.prototype.hasView = function() {
            return null !== this._myView
        }, o.prototype.loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                r = void 0,
                h = (0, l.loadXml)(t, d, p),
                c = n(h, 4);
            e = c[0], o = c[1], i = c[2], r = c[3], this.setColor(e.get("COLOR")), this.setDestinationId(e.get("DESTINATION")), this.setEndArrow(e.get("ENDARROW")), this.setEndInclination(e.get("ENDINCLINATION")), this.setId(e.get("ID")), this.setStartArrow(e.get("STARTARROW")), this.setStartInclination(e.get("STARTINCLINATION")), this._unexpectedAttributes = o, this._unexpectedTags = r, a.m3App.getDiagnostics().log(s.Diagnostics.TASK_IMPORT_XML, "Created arrowlink.")
        }, o.prototype.prepareForDelete = function() {
            null !== this._myView && (this._myView.deleteSvg(), this._myView = null)
        }, o.prototype.setColor = function(t) {
            this._color = t
        }, o.prototype.setDestinationId = function(t) {
            this._destinationId = t
        }, o.prototype.setEndArrow = function(t) {
            this._endArrow = t
        }, o.prototype.setEndInclination = function(t) {
            this._endInclination = t
        }, o.prototype.setId = function(t) {
            this._id = t
        }, o.prototype.setStartArrow = function(t) {
            this._startArrow = t
        }, o.prototype.setStartInclination = function(t) {
            this._startInclination = t
        }
    }, {
        "./Diagnostics": 10,
        "./GraphicalLinkView": 16,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    5: [function(t, e, i) {
        "use strict";

        function o(t, e, i, o) {
            var s = "http://www.w3.org/2000/svg";
            this._mostRecentCloudColor = null, this._myNodeModel = e, this._myNodeView = t, this._isSelected = !1, this._isVisible = !0, this._height = 0, this._width = 0, this._svgBubble = document.createElementNS(s, "rect"), document.getElementById(n.App.HTML_ID_PREFIX + "-svgBubbleLayer").appendChild(this._svgBubble), this._svgBubble.setAttribute("rx", 5), this._svgBubble.setAttribute("ry", 5), this._boundClickListener = this._clickListener.bind(this), this._svgBubble.addEventListener("click", this._boundClickListener), this.update(i, o)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.BubbleView = o;
        var n = t("./App"),
            s = t("./main");
        o.BUBBLE_INNER_PADDING = 5, o.prototype._clickListener = function() {
            s.m3App.getController().getMapViewController().nodeClicked(this._myNodeView)
        }, o.prototype.deleteSvg = function() {
            this._svgBubble.removeEventListener("click", this._boundClickListener), document.getElementById(n.App.HTML_ID_PREFIX + "-svgBubbleLayer").removeChild(this._svgBubble)
        }, o.prototype.getHeight = function() {
            return this._height
        }, o.prototype.getWidth = function() {
            return this._width
        }, o.prototype.setMostRecentCloudColor = function(t) {
            var e = void 0;
            e = this._myNodeModel.getBackgroundColor(), "" === e && (e = null === t ? "#ffffff" : t), this._svgBubble.setAttribute("fill", e)
        }, o.prototype.setPosition = function(t, e) {
            this._svgBubble.setAttribute("x", t), this._svgBubble.setAttribute("y", e - this.getHeight() / 2)
        }, o.prototype.setSelected = function(t) {
            this._isSelected = t, t === !0 ? (this._svgBubble.setAttribute("stroke", "#0000ff"), this._svgBubble.setAttribute("stroke-width", 3)) : (this._svgBubble.setAttribute("stroke", "#000000"), this._svgBubble.setAttribute("stroke-width", 1))
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgBubble.setAttribute("display", "visible") : this._svgBubble.setAttribute("display", "none"))
        }, o.prototype.update = function(t, e) {
            this.setSelected(this._isSelected), this._width = t + 2 * o.BUBBLE_INNER_PADDING, this._height = e + 2 * o.BUBBLE_INNER_PADDING, this._svgBubble.setAttribute("height", this._height), this._svgBubble.setAttribute("width", this._width)
        }
    }, {
        "./App": 2,
        "./main": 35
    }],
    6: [function(t, e, i) {
        "use strict";

        function o() {
            this._color = "#cccccc", this._unexpectedAttributes = new Map, this._unexpectedTags = []
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.CloudModel = o;
        var s = t("./Diagnostics"),
            r = t("./xmlHelpers"),
            l = t("./main"),
            a = new Map([
                ["COLOR", "#cccccc"]
            ]),
            d = [];
        o.prototype.getAsXml = function() {
            var t = new Map,
                e = [];
            return t.set("COLOR", this._color), e = (0, r.createXml)("cloud", a, t, this._unexpectedAttributes, [], this._unexpectedTags)
        }, o.prototype.getColor = function() {
            return this._color
        }, o.prototype.loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                p = void 0,
                h = (0, r.loadXml)(t, a, d),
                c = n(h, 4);
            e = c[0], o = c[1], i = c[2], p = c[3], this.setColor(e.get("COLOR")), this._unexpectedAttributes = o, this._unexpectedTags = p, l.m3App.getDiagnostics().log(s.Diagnostics.TASK_IMPORT_XML, "Created cloudModel.")
        }, o.prototype.setColor = function(t) {
            this._color = t
        }
    }, {
        "./Diagnostics": 10,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    7: [function(t, e, i) {
        "use strict";

        function o(t) {
            var e = "http://www.w3.org/2000/svg";
            this._isVisible = !0, this._svgCloud = document.createElementNS(e, "path"), this._svgCloud.setAttribute("stroke", t.getColor()), this._svgCloud.setAttribute("fill", t.getColor()), this._svgCloud.setAttribute("fill-opacity", "1"), document.getElementById(n.App.HTML_ID_PREFIX + "-svgCloudLayer").appendChild(this._svgCloud)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.CloudView = o;
        var n = t("./App");
        o.PADDING_HORIZONTAL = 5, o.PADDING_VERTICAL = 5, o.prototype.deleteSvg = function() {
            document.getElementById(n.App.HTML_ID_PREFIX + "-svgCloudLayer").removeChild(this._svgCloud)
        }, o.prototype.getHeight = function() {
            return this._height
        }, o.prototype.getWidth = function() {
            return this._width
        }, o.prototype.setAreaToEnclose = function(t, e) {
            this._height = e + 2 * o.PADDING_VERTICAL, this._width = t + 2 * o.PADDING_HORIZONTAL
        }, o.prototype.setPosition = function(t, e) {
            var i = void 0,
                n = void 0,
                s = void 0;
            i = t - o.PADDING_HORIZONTAL, n = e + this._height / 2, s = "M " + i + " " + n + " " + ("v-" + this._height + " h " + this._width + " v " + this._height + " ") + ("h -" + this._width), this._svgCloud.setAttribute("d", s)
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgCloud.setAttribute("display", "visible") : this._svgCloud.setAttribute("display", "none"))
        }
    }, {
        "./App": 2
    }],
    8: [function(t, e, i) {
        "use strict";

        function o(t) {
            var e = "http://www.w3.org/2000/svg";
            this._isVisible = !0, this._svgConnector = document.createElementNS(e, "path"), this._svgConnector.setAttribute("stroke", "#000000"), this._svgConnector.setAttribute("fill-opacity", "0"), document.getElementById(n.App.HTML_ID_PREFIX + "-svgBubbleLayer").appendChild(this._svgConnector)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.ConnectorView = o;
        var n = t("./App");
        o.WIDTH = 30, o.prototype.deleteSvg = function() {
            document.getElementById(n.App.HTML_ID_PREFIX + "-svgBubbleLayer").removeChild(this._svgConnector)
        }, o.prototype.getWidth = function() {
            return o.WIDTH
        }, o.prototype.setPosition = function(t, e, i, o) {
            var n = void 0,
                s = void 0,
                r = void 0;
            e === o ? s = "M " + t + " " + e + " L " + i + " " + o : (t < i ? (n = 1, r = -1) : (n = -1, r = 1), s = "M " + t + " " + e + " C " + (t + 20 * n) + " " + e + " " + ("  " + (i + 20 * r) + " " + o + " " + i + " " + o)), this._svgConnector.setAttribute("d", s)
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgConnector.setAttribute("display", "visible") : this._svgConnector.setAttribute("display", "none"))
        }
    }, {
        "./App": 2
    }],
    9: [function(t, e, i) {
        "use strict";

        function o() {
            var t = void 0;
            this._appButtons = new s.AppButtons(this), this._mapViewController = new d.MapViewController(this), l.m3App.showMapName() || (document.getElementById(n.App.HTML_ID_PREFIX + "-top").style.display = "none"), this.newMap(a.MapModel.TYPE_EMPTY, null, "New Map", null), t = l.m3App.getInitialMapUrl(), t && l.m3App.getMapFromUrl(t, function(t) {
                this.newMap(a.MapModel.TYPE_XML, null, l.m3App.getInitialMapName(), t)
            }.bind(this))
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.Controller = o;
        var n = t("./App"),
            s = t("./AppButtons"),
            r = t("./EditNodeDialog"),
            l = (t("./ErrorDialog"), t("./main")),
            a = t("./MapModel"),
            d = t("./MapViewController");
        t("./NodeView");
        o.prototype.addChild = function(t) {
            var e = void 0,
                i = void 0;
            e = t.addChild(["New Node"]), t.getView().update(), this.redrawMain(), i = new r.EditNodeDialog(this, e, null)
        }, o.prototype.addChildAfter = function(t, e) {
            var i = void 0,
                o = void 0;
            i = t.addChildAfter(e, ["New Node"]), this.redrawMain(), o = new r.EditNodeDialog(this, i, null)
        }, o.prototype.changeNodeText = function(t, e) {
            t.setText(e), t.getView().update(), this.redrawMain()
        }, o.prototype.deleteGraphicalLinks = function(t, e) {
            var i = this;
            e.getArrowLinks().forEach(function(i) {
                t !== e && t !== i.getDestinationNode() || i.hasView() && i.getView().deleteSvg()
            }), e.getChildren().forEach(function(e) {
                i.deleteGraphicalLinks(t, e)
            })
        }, o.prototype.deleteNode = function(t) {
            var e = void 0;
            e = t.getParent(), e.deleteChild(t), e.getView().update(), this.redrawMain()
        }, o.prototype.getMapModel = function() {
            return this._mapModel
        }, o.prototype.getMapViewController = function() {
            return this._mapViewController
        }, o.prototype.moveNodeDown = function(t) {
            var e = void 0;
            e = t.getParent(), null !== e && (e.moveChildDown(t), this.redrawMain())
        }, o.prototype.moveNodeUp = function(t) {
            var e = void 0;
            e = t.getParent(), null !== e && (e.moveChildUp(t), this.redrawMain())
        }, o.prototype.newMap = function(t, e, i, o) {
            var s = void 0;
            if (this._mapModel) {
                for (s = this._mapModel.getRoot(); 0 !== s.getChildren().length;) s.deleteChild(s.getChildren()[0]);
                s.prepareForDelete()
            }
            this._mapModel = new a.MapModel(this, t, e, i, o), this._rootNodeView = this._mapModel.getRoot().getView(), this._mapViewController.reset(), this.redrawMain(), document.getElementById(n.App.HTML_ID_PREFIX + "-svg-element").style.opacity = 0, this.selectRootNode()
        }, o.prototype.selectRootNode = function() {
            var t = this;
            setTimeout(function() {
                t._mapViewController.nodeClicked(t._rootNodeView), t._mapViewController.positionSelectedNodeOptimally(), document.getElementById(n.App.HTML_ID_PREFIX + "-svg-element").style.opacity = 1
            }, 0)
        }, o.prototype.setMapName = function(t) {
            document.getElementById(n.App.HTML_ID_PREFIX + "-mapName").innerHTML = t
        }, o.prototype.setModifiedIndicator = function(t) {
            t && !l.m3App.isReadOnly() ? document.getElementById(n.App.HTML_ID_PREFIX + "-modified").removeAttribute("hidden") : document.getElementById(n.App.HTML_ID_PREFIX + "-modified").setAttribute("hidden", "true")
        }, o.prototype.toggleCloud = function(t) {
            t.toggleCloud(), t.getView().update(), this.redrawMain()
        }, o.prototype.toggleFoldedStatus = function(t) {
            t.toggleFoldedStatus(), t.getView().update(), this.redrawMain()
        }, o.prototype.redrawGraphicalLinks = function(t) {
            var e = this;
            t.getArrowLinks().forEach(function(e) {
                var i = void 0,
                    o = void 0,
                    n = void 0;
                for (o = !1, n = t; !n.hasView() || !n.getView().isVisible();) o = !0, n = n.getParent();
                for (i = e.getDestinationNode(); !i.hasView() || !i.getView().isVisible();) o = !0, i = i.getParent();
                n !== i ? e.getView().draw(n.getView(), i.getView(), o) : e.hasView() && e.getView().setVisible(!1)
            }), t.getChildren().forEach(function(t) {
                e.redrawGraphicalLinks(t)
            })
        }, o.prototype.redrawMain = function() {
            this._rootNodeView.calcDimensions(), this._rootNodeView.drawAt(0, 0, null, null), this.redrawGraphicalLinks(this._mapModel.getRoot())
        }
    }, {
        "./App": 2,
        "./AppButtons": 3,
        "./EditNodeDialog": 11,
        "./ErrorDialog": 12,
        "./MapModel": 24,
        "./MapViewController": 25,
        "./NodeView": 27,
        "./main": 35
    }],
    10: [function(t, e, i) {
        "use strict";

        function o() {
            this._LOG_TYPE = {
                TASK_IMPORT_XML: "none",
                TASK_VIEWS: "none",
                TASK_VIEW_STATE: "none"
            }, this._WARN_TYPE = {
                TASK_IMPORT_XML: "console",
                TASK_VIEWS: "none",
                TASK_VIEW_STATE: "none"
            }, this._ERR_TYPE = {
                TASK_IMPORT_XML: "alert",
                TASK_VIEWS: "alert",
                TASK_VIEW_STATE: "alert"
            }, this._popupWindow = null
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.Diagnostics = o, o.TASK_IMPORT_XML = "TASK_IMPORT_XML", o.TASK_VIEWS = "TASK_VIEWS", o.TASK_VIEW_STATE = "TASK_VIEW_STATE", o.prototype.err = function(t, e) {
            var i = t + ": " + e;
            "console" === this._ERR_TYPE[t] ? console.err(i) : "alert" === this._ERR_TYPE[t] ? alert("ERR : " + i) : "popup" === this._ERR_TYPE[t] && this._popupMsg("ERR : " + i)
        }, o.prototype.log = function(t, e) {
            var i = t + ": " + e;
            "console" === this._LOG_TYPE[t] ? console.log(i) : "alert" === this._LOG_TYPE[t] ? alert("Log : " + i) : "popup" === this._LOG_TYPE[t] && this._popupMsg("Log : " + i)
        }, o.prototype.warn = function(t, e) {
            var i = t + ": " + e;
            "console" === this._WARN_TYPE[t] ? console.warn(i) : "alert" === this._WARN_TYPE[t] ? alert("Warn: " + i) : "popup" === this._WARN_TYPE[t] && this._popupMsg("Warn: " + i)
        }, o.prototype._popupMsg = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0;
            null === this._popupWindow && (this._popupWindow = window.open("", "Diagnostics")), e = this._popupWindow.document, i = e.getElementsByTagName("body")[0], o = e.createElement("code"), o.appendChild(e.createTextNode(t)), i.appendChild(o), i.appendChild(e.createElement("br"))
        }
    }, {}],
    11: [function(t, e, i) {
        "use strict";

        function o(t, e, i) {
            var a = this;
            this._controller = t, this._nodeToEdit = e;
            var p = void 0,
                h = void 0,
                c = void 0,
                u = void 0,
                _ = void 0,
                g = void 0;
            for (p = Math.min(80, .8 * (r.Sizer.svgWidth / r.Sizer.characterWidth)), g = Math.min(d, e.getText().length), c = "<div id='" + o.DIALOG_ID + "' class='popup' " + ("style='height: " + r.Sizer.popupHeight + "px'> <p> Edit Node </p>") + ("<textarea id='" + o.TEXT_ENTRY_FIELD_ID + "' ") + ("rows='" + g + "' cols='" + p + "'>"), e.getText().forEach(function(t, e) {
                    0 !== e && (c += "\n"), c += t
                }), c += "</textarea> <br><br>" + ("<button id='" + o.SAVE_ID + "'>Save</button>") + ("<button id='" + o.CANCEL_ID + "'>Cancel</button>") + ("<button id='" + o.LINE_BREAK + "'>Line Break</button>") + "</div>", h = new DOMParser, u = h.parseFromString(c, "text/html"), this._editNodeDialog = document.importNode(u.getElementById(o.DIALOG_ID), !0), document.getElementById(s.App.HTML_ID_PREFIX + "-popups").appendChild(this._editNodeDialog), this._textEntryField = document.getElementById(o.TEXT_ENTRY_FIELD_ID), document.getElementById(o.SAVE_ID).addEventListener("click", function() {
                    return a.save()
                }), document.getElementById(o.CANCEL_ID).addEventListener("click", function() {
                    return a.close()
                }), document.getElementById(o.LINE_BREAK).addEventListener("click", function() {
                    return a.lineBreakClicked()
                }), this._textEntryField.addEventListener("keypress", function(t) {
                    switch (t.key) {
                        case "Escape":
                            a.close(), t.stopPropagation();
                            break;
                        case "Enter":
                            t.ctrlKey ? a.lineBreakClicked() : a.save(), t.stopPropagation()
                    }
                    a.adjustHeight()
                }), document.getElementById(s.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), n.m3App.getGlobalState().setState(l.State.STATE_DIALOG_EDIT_NODE), this._textEntryField.focus(), null === i ? this._textEntryField.select() : this._textEntryField.value = i, _ = 0; _ < d; _++) this.adjustHeight()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.EditNodeDialog = o;
        var n = t("./main"),
            s = t("./App"),
            r = t("./Sizer"),
            l = t("./State"),
            a = 80,
            d = 5;
        o.DIALOG_ID = s.App.HTML_ID_PREFIX + "-editNodeDialog", o.CANCEL_ID = o.DIALOG_ID + "Cancel", o.LINE_BREAK = o.DIALOG_ID + "LineBreak", o.SAVE_ID = o.DIALOG_ID + "Save", o.TEXT_ENTRY_FIELD_ID = o.DIALOG_ID + "TextEntry", o.prototype.adjustHeight = function() {
            var t = this._textEntryField;
            t.scrollHeight > t.clientHeight && t.clientHeight <= a && t.rows++
        }, o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(s.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._editNodeDialog), n.m3App.getGlobalState().setState(l.State.STATE_IDLE), this._controller.getMapViewController().setSelectedNodeView(this._nodeToEdit.getView())
        }, o.prototype.lineBreakClicked = function() {
            var t = void 0,
                e = void 0;
            t = this._textEntryField.value, e = this._textEntryField.selectionEnd, this._textEntryField.value = t.substring(0, e) + "\n" + t.substring(e), this._textEntryField.focus(), this._textEntryField.selectionEnd = e + 1, this.adjustHeight()
        }, o.prototype.save = function() {
            this._controller.changeNodeText(this._nodeToEdit, this._textEntryField.value.split("\n")), this.close()
        }
    }, {
        "./App": 2,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    12: [function(t, e, i) {
        "use strict";

        function o(t) {
            var e = this,
                i = void 0,
                a = void 0,
                d = void 0;
            a = "<div id='" + o.DIALOG_ID + "' class='popup' style='height: " + (r.Sizer.popupHeight + "px'>") + "<p style='text-align: center; font-weight: bold;'>" + (n.App.MY_NAME + " - Error</p>") + "<p>" + t + "</p>" + ("<button id='" + o.OK_ID + "'>Ok</button>") + "</div>", i = new DOMParser, d = i.parseFromString(a, "text/html"), this._errorDialog = document.importNode(d.getElementById(o.DIALOG_ID), !0), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").appendChild(this._errorDialog), document.getElementById(o.OK_ID).addEventListener("click", function() {
                return e.close()
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), s.m3App.getGlobalState().setState(l.State.STATE_DIALOG_ERROR)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.ErrorDialog = o;
        var n = t("./App"),
            s = t("./main"),
            r = t("./Sizer"),
            l = t("./State");
        o.DIALOG_ID = n.App.HTML_ID_PREFIX + "-errorDialog", o.OK_ID = o.DIALOG_ID + "Ok", o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(n.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._errorDialog), s.m3App.getGlobalState().setState(l.State.STATE_IDLE)
        }
    }, {
        "./App": 2,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    13: [function(t, e, i) {
        "use strict";

        function o() {
            var t = this,
                e = void 0,
                i = void 0,
                a = void 0,
                d = void 0,
                p = void 0,
                h = void 0,
                c = void 0,
                u = void 0,
                _ = void 0;
            _ = n.m3App.getController().getMapModel(), a = new Date(Date.now()), p = "m3-" + _.getMapName() + "-" + a.getFullYear() + "-" + this._padNumber(a.getMonth() + 1) + "-" + this._padNumber(a.getDate()) + "::" + this._padNumber(a.getHours()) + ":" + this._padNumber(a.getMinutes()) + ":" + this._padNumber(a.getSeconds()), u = _.getAsXml(), e = new Blob(u, {
                type: "text/xml"
            }), i = URL.createObjectURL(e), h = "<div id='" + o.DIALOG_ID + "' class='popup' style='height:" + (r.Sizer.popupHeight + "px'>") + "<p>Copy text below, or scroll to bottom for download link.</p>" + ("<textarea id='" + o.TEXT_AREA_ID + "' rows=20 cols=30>"), u.forEach(function(t) {
                t = t.replace(new RegExp("&", "g"), "&amp;"), h += t + "\n"
            }), h += "   </textarea><br><br>" + ("<p>Download: <a href='" + i + "' download='" + p + "' ") + "target='blank'>" + (p + "</a><br>") + ("<button id='" + o.OK_ID + "'>Close</button>") + "</div>", d = new DOMParser, c = d.parseFromString(h, "text/html"), this._exportDialog = document.importNode(c.getElementById(o.DIALOG_ID), !0), document.getElementById(s.App.HTML_ID_PREFIX + "-popups").appendChild(this._exportDialog), document.getElementById(o.OK_ID).addEventListener("click", function() {
                return t.close()
            }), document.getElementById(s.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), n.m3App.getGlobalState().setState(l.State.STATE_EXPORT_POPUP)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.ExportDialog = o;
        var n = t("./main"),
            s = t("./App"),
            r = t("./Sizer"),
            l = t("./State");
        o.DIALOG_ID = s.App.HTML_ID_PREFIX + "-importExportDialog", o.OK_ID = o.DIALOG_ID + "Ok", o.TEXT_AREA_ID = o.DIALOG_ID + "TextArea", o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(s.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._exportDialog), n.m3App.getGlobalState().setState(l.State.STATE_IDLE)
        }, o.prototype._padNumber = function(t) {
            var e = void 0;
            return e = "", t < 10 && (e = "0"), e + t
        }
    }, {
        "./App": 2,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    14: [function(t, e, i) {
        "use strict";

        function o(t, e) {
            var i = "http://www.w3.org/2000/svg";
            this._myNodeModel = e, this._myNodeView = t, this._isVisible = !0, this._svgFoldingIcon = document.createElementNS(i, "circle"), document.getElementById(n.App.HTML_ID_PREFIX + "-svgBubbleLayer").appendChild(this._svgFoldingIcon), this._svgFoldingIcon.setAttribute("r", o.FOLDING_ICON_RADIUS), this._svgFoldingIcon.setAttribute("stroke", "#000000"), this._boundClickListener = this._clickListener.bind(this), this._svgFoldingIcon.addEventListener("click", this._boundClickListener), this.update()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.FoldingIconView = o;
        var n = t("./App"),
            s = t("./main");
        o.FOLDING_ICON_RADIUS = 10, o.prototype._clickListener = function() {
            s.m3App.getController().toggleFoldedStatus(this._myNodeView.getModel())
        }, o.prototype.deleteSvg = function() {
            this._svgFoldingIcon.removeEventListener("click", this._boundClickListener), document.getElementById(n.App.HTML_ID_PREFIX + "-svgBubbleLayer").removeChild(this._svgFoldingIcon)
        }, o.prototype.getHeight = function() {
            return 2 * o.FOLDING_ICON_RADIUS
        }, o.prototype.getWidth = function() {
            return 2 * o.FOLDING_ICON_RADIUS
        }, o.prototype.setPosition = function(t, e) {
            this._svgFoldingIcon.setAttribute("cx", t + o.FOLDING_ICON_RADIUS), this._svgFoldingIcon.setAttribute("cy", e)
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgFoldingIcon.setAttribute("display", "visible") : this._svgFoldingIcon.setAttribute("display", "none"))
        }, o.prototype.update = function() {
            this._myNodeModel.isFolded() ? this._svgFoldingIcon.setAttribute("fill-opacity", "1") : this._svgFoldingIcon.setAttribute("fill-opacity", "0")
        }
    }, {
        "./App": 2,
        "./main": 35
    }],
    15: [function(t, e, i) {
        "use strict";

        function o() {
            this._bold = !1, this._italic = !1, this._size = "12", this._unexpectedAttributes = new Map, this._unexpectedTags = []
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.Font = o;
        var s = t("./Diagnostics"),
            r = t("./xmlHelpers"),
            l = t("./main"),
            a = new Map([
                ["BOLD", "false"],
                ["ITALIC", "size"],
                ["SIZE", "12"]
            ]),
            d = [];
        o.prototype.getAsXml = function() {
            var t = new Map,
                e = [];
            return this._bold === !0 ? t.set("BOLD", "true") : t.set("BOLD", "false"), this._italic === !0 ? t.set("ITALIC", "true") : t.set("ITALIC", "false"), t.set("SIZE", this._size), e = (0, r.createXml)("font", a, t, this._unexpectedAttributes, [], this._unexpectedTags)
        }, o.prototype.getSize = function() {
            return this._size
        }, o.prototype.isBold = function() {
            return this._bold
        }, o.prototype.isItalic = function() {
            return this._italic
        }, o.prototype.loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                p = void 0,
                h = (0, r.loadXml)(t, a, d),
                c = n(h, 4);
            e = c[0], o = c[1], i = c[2], p = c[3], "true" === e.get("BOLD") ? this._bold = !0 : this._bold = !1, "true" === e.get("ITALIC") ? this._italic = !0 : this._italic = !1, this._size = e.get("SIZE"), this._unexpectedAttributes = o, this._unexpectedTags = p, l.m3App.getDiagnostics().log(s.Diagnostics.TASK_IMPORT_XML, "Created font.")
        }, o.prototype.setBold = function(t) {
            this._bold = t
        }, o.prototype.setItalic = function(t) {
            this._italic = t
        }, o.prototype.setSize = function(t) {
            this._size = t
        }
    }, {
        "./Diagnostics": 10,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    16: [function(t, e, i) {
        "use strict";

        function o(t) {
            var e = "http://www.w3.org/2000/svg";
            this._arrowLink = t, this._isVisible = !0, this._svgGraphicalLink = document.createElementNS(e, "path"), document.getElementById(n.App.HTML_ID_PREFIX + "-svgLinksLayer").appendChild(this._svgGraphicalLink), this._svgGraphicalLink.setAttribute("stroke", this._arrowLink.getColor()), this._svgGraphicalLink.setAttribute("fill-opacity", "0")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.GraphicalLinkView = o;
        var n = t("./App"),
            s = (t("./main"), t("./NodeModel"));
        o.ARROW_WIDTH = 20, o.prototype.deleteSvg = function() {
            this._svgGraphicalLink && (document.getElementById(n.App.HTML_ID_PREFIX + "-svgLinksLayer").removeChild(this._svgGraphicalLink), this._svgGraphicalLink = null)
        }, o.prototype.draw = function(t, e, i) {
            var o = void 0,
                r = void 0,
                l = void 0,
                a = void 0,
                d = void 0,
                p = void 0;
            d = t.getGraphicalLinkCoords(), o = e.getGraphicalLinkCoords(), p = t.getModel().getSide() === s.NodeModel.POSITION_LEFT ? -1 : 1, r = e.getModel().getSide() === s.NodeModel.POSITION_LEFT ? -1 : 1, a = "M " + d.x + " " + d.y + " " + ("C " + (d.x + 200 * p) + " " + d.y + " ") + ("  " + (o.x + 200 * r) + " " + o.y + " ") + ("  " + o.x + " " + o.y), this._svgGraphicalLink.setAttribute("d", a), l = i ? "triangle-open" : "triangle-solid", this._svgGraphicalLink.setAttribute("marker-end", "url(#" + n.App.HTML_ID_PREFIX + "-" + l + ")"), this.setVisible(!0)
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgGraphicalLink.setAttribute("display", "visible") : this._svgGraphicalLink.setAttribute("display", "none"))
        }
    }, {
        "./App": 2,
        "./NodeModel": 26,
        "./main": 35
    }],
    17: [function(t, e, i) {
        "use strict";

        function o() {
            this._builtin = "m3", this._unexpectedAttributes = new Map, this._unexpectedTags = []
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.IconModel = o;
        var s = t("./Diagnostics"),
            r = t("./xmlHelpers"),
            l = t("./main"),
            a = new Map([
                ["BUILTIN", "m3"]
            ]),
            d = [];
        o.prototype.getAsXml = function() {
            var t = new Map,
                e = void 0,
                i = [];
            return t.set("BUILTIN", this._builtin), e = [], i = (0, r.createXml)("icon", a, t, this._unexpectedAttributes, e, this._unexpectedTags)
        }, o.prototype.getName = function() {
            return this._builtin
        }, o.prototype.loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                p = void 0,
                h = (0, r.loadXml)(t, a, d),
                c = n(h, 4);
            e = c[0], o = c[1], i = c[2], p = c[3], this._builtin = e.get("BUILTIN"), this._unexpectedAttributes = o, this._unexpectedTags = p, l.m3App.getDiagnostics().log(s.Diagnostics.TASK_IMPORT_XML, "Created IconModel.")
        }, o.prototype.setName = function(t) {
            this._builtin = t
        }
    }, {
        "./Diagnostics": 10,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    18: [function(t, e, i) {
        "use strict";

        function o(t, e) {
            var i = "http://www.w3.org/2000/svg";
            this._iconModel = e, this._myNodeView = t, this._imagesPath = n.App.m3Path + "/images", this._isVisible = !0, this._svgImage = document.createElementNS(i, "image"), this._svgImage.setAttribute("width", l), this._svgImage.setAttribute("height", r), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").appendChild(this._svgImage), this._boundClickListener = this._clickListener.bind(this), this._svgImage.addEventListener("click", this._boundClickListener), this.update()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.IconView = o;
        var n = t("./App"),
            s = t("./main"),
            r = 20,
            l = 20;
        o.prototype._clickListener = function() {
            s.m3App.getController().getMapViewController().nodeClicked(this._myNodeView)
        }, o.prototype.deleteSvg = function() {
            this._svgImage.removeEventListener("click", this._boundClickListener), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").removeChild(this._svgImage)
        }, o.prototype.getHeight = function() {
            return r
        }, o.prototype.getWidth = function() {
            return l
        }, o.prototype.setPosition = function(t, e) {
            this._svgImage.setAttribute("x", t), this._svgImage.setAttribute("y", e - .5 * r)
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgImage.setAttribute("display", "visible") : this._svgImage.setAttribute("display", "none"))
        }, o.prototype.update = function() {
            var t = "http://www.w3.org/1999/xlink",
                e = void 0;
            this.setVisible(!0), e = this._iconModel.getName().replace("%", "percent"), this._svgImage.setAttributeNS(t, "href", this._imagesPath + "/icons/" + e + ".svg")
        }
    }, {
        "./App": 2,
        "./main": 35
    }],
    19: [function(t, e, i) {
        "use strict";

        function o() {
            var t = this,
                e = void 0,
                i = void 0,
                n = void 0;
            i = "<div id='" + o.DIALOG_ID + "' class='popup' " + ("style='height: " + a.Sizer.popupHeight + "px'>") + "<p>Import from .mm file:" + ("<input id='" + o.FILE_INPUT_ID + "' type='file'") + "</p><br><p>Export to .mm file:" + ("<button id='" + o.EXPORT_ID + "'>") + "Export</button></p><br>" + ("<button id='" + o.CANCEL_ID + "'>Cancel</button>") + "</div>", e = new DOMParser, n = e.parseFromString(i, "text/html"), this._importExportDialog = document.importNode(n.getElementById(o.DIALOG_ID), !0), document.getElementById(r.App.HTML_ID_PREFIX + "-popups").appendChild(this._importExportDialog), document.getElementById(o.CANCEL_ID).addEventListener("click", function() {
                return t.close()
            }), document.getElementById(o.EXPORT_ID).addEventListener("click", function() {
                return t.exportMap()
            }), document.getElementById(o.FILE_INPUT_ID).addEventListener("change", function(e) {
                return t.fileInput(e)
            }), document.getElementById(r.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), s.m3App.getGlobalState().setState(d.State.STATE_DIALOG_IMPORT_EXPORT)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.ImportExportDialog = o;
        var n = t("./ExportDialog"),
            s = t("./main"),
            r = t("./App"),
            l = t("./MapModel"),
            a = t("./Sizer"),
            d = t("./State");
        o.DIALOG_ID = r.App.HTML_ID_PREFIX + "-importExportDialog", o.CANCEL_ID = o.DIALOG_ID + "Cancel", o.EXPORT_ID = o.DIALOG_ID + "Export", o.FILE_INPUT_ID = o.DIALOG_ID + "FileInput", o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(r.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._importExportDialog), s.m3App.getGlobalState().setState(d.State.STATE_IDLE)
        }, o.prototype.exportMap = function() {
            this.close();
            new n.ExportDialog
        }, o.prototype.fileInput = function(t) {
            var e = this,
                i = void 0;
            i = new FileReader, i.onloadend = function() {
                s.m3App.getController().newMap(l.MapModel.TYPE_XML, null, "Imported Map", [i.result]), e.close()
            }, i.readAsText(t.target.files[0])
        }
    }, {
        "./App": 2,
        "./ExportDialog": 13,
        "./MapModel": 24,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    20: [function(t, e, i) {
        "use strict";

        function o(t, e) {
            var i = "http://www.w3.org/2000/svg",
                o = "http://www.w3.org/1999/xlink";
            this._linkLocation = "", this._myNodeModel = e, this._myNodeView = t, this._imagesPath = n.App.m3Path + "/images", this._isVisible = !0, this._svgImage = document.createElementNS(i, "image"), this._svgImage.setAttributeNS(o, "href", this._imagesPath + "/link.svg"), this._svgImage.setAttribute("width", r), this._svgImage.setAttribute("height", s), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").appendChild(this._svgImage), this._boundClickListener = this._clickListener.bind(this), this._svgImage.addEventListener("click", this._boundClickListener), this.update()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.LinkIconView = o;
        var n = t("./App"),
            s = (t("./main"), 25),
            r = 25;
        o.prototype._clickListener = function() {
            window.open(this._linkLocation)
        }, o.prototype.deleteSvg = function() {
            this._svgImage.removeEventListener("click", this._boundClickListener), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").removeChild(this._svgImage)
        }, o.prototype.getHeight = function() {
            return s
        }, o.prototype.getWidth = function() {
            return r
        }, o.prototype.setPosition = function(t, e) {
            this._svgImage.setAttribute("x", t), this._svgImage.setAttribute("y", e - .5 * s)
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgImage.setAttribute("display", "visible") : this._svgImage.setAttribute("display", "none"))
        }, o.prototype.update = function() {
            this._linkLocation = this._myNodeModel.getLink(), this.setVisible(!0)
        }
    }, {
        "./App": 2,
        "./main": 35
    }],
    21: [function(t, e, i) {
        "use strict";

        function o() {
            this._color = null, this._destination = null, this._endArrow = null, this._endInclination = null, this._id = null, this._source = null, this._startArrow = null, this._startInclination = null, this._unexpectedAttributes = new Map, this._unexpectedTags = []
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.LinkTarget = o;
        var s = t("./Diagnostics"),
            r = t("./xmlHelpers"),
            l = t("./main"),
            a = new Map([
                ["COLOR", "#000000"],
                ["DESTINATION", ""],
                ["ENDARROW", ""],
                ["ENDINCLINATION", ""],
                ["ID", ""],
                ["SOURCE", ""],
                ["STARTARROW", ""],
                ["STARTINCLINATION", ""]
            ]),
            d = [];
        o.prototype.getAsXml = function() {
            var t = new Map,
                e = [];
            return t.set("COLOR", this._color), t.set("DESTINATION", this._destination), t.set("ENDARROW", this._endArrow), t.set("ENDINCLINATION", this._endInclination), t.set("ID", this._id), t.set("SOURCE", this._source), t.set("STARTARROW", this._startArrow), t.set("STARTINCLINATION", this._startInclination), e = (0, r.createXml)("linktarget", a, t, this._unexpectedAttributes, [], this._unexpectedTags)
        }, o.prototype.getColor = function() {
            return this._color
        }, o.prototype.getDestination = function() {
            return this._destination
        }, o.prototype.getEndArrow = function() {
            return this._endArrow
        }, o.prototype.getEndInclination = function() {
            return this._endInclination
        }, o.prototype.getId = function() {
            return this._id
        }, o.prototype.getSource = function() {
            return this._source
        }, o.prototype.getStartArrow = function() {
            return this._startArrow
        }, o.prototype.getStartInclination = function() {
            return this._startInclination
        }, o.prototype.loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                p = void 0,
                h = (0, r.loadXml)(t, a, d),
                c = n(h, 4);
            e = c[0], o = c[1], i = c[2], p = c[3], this.setColor(e.get("COLOR")), this.setDestination(e.get("DESTINATION")), this.setEndArrow(e.get("ENDARROW")), this.setEndInclination(e.get("ENDINCLINATION")), this.setId(e.get("ID")), this.setSource(e.get("SOURCE")), this.setStartArrow(e.get("STARTARROW")), this.setStartInclination(e.get("STARTINCLINATION")), this._unexpectedAttributes = o, this._unexpectedTags = p, l.m3App.getDiagnostics().log(s.Diagnostics.TASK_IMPORT_XML, "Created linktarget.")
        }, o.prototype.setColor = function(t) {
            this._color = t
        }, o.prototype.setDestination = function(t) {
            this._destination = t
        }, o.prototype.setEndArrow = function(t) {
            this._endArrow = t
        }, o.prototype.setEndInclination = function(t) {
            this._endInclination = t
        }, o.prototype.setId = function(t) {
            this._id = t
        }, o.prototype.setSource = function(t) {
            this._source = t
        }, o.prototype.setStartArrow = function(t) {
            this._startArrow = t
        }, o.prototype.setStartInclination = function(t) {
            this._startInclination = t
        }
    }, {
        "./Diagnostics": 10,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    22: [function(t, e, i) {
        "use strict";

        function o(t) {
            var e = this;
            this._controller = t, n.App.myDB.getItem(n.App.KEY_MAPLIST).then(function(t) {
                return e.createMarkup(t)
            }).catch(function(t) {
                new s.ErrorDialog("Unable to load list of saved maps: " + t)
            })
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.LoadDialog = o;
        var n = t("./App"),
            s = t("./ErrorDialog"),
            r = t("./main"),
            l = t("./MapModel"),
            a = t("./Sizer"),
            d = t("./State");
        o.DIALOG_ID = n.App.HTML_ID_PREFIX + "-loadDialog", o.CANCEL_ID = o.DIALOG_ID + "Cancel", o.NEW_MAP_ID = o.DIALOG_ID + "NewMap", o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(n.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._loadDialog), r.m3App.getGlobalState().setState(d.State.STATE_IDLE)
        }, o.prototype.createMarkup = function(t) {
            var e = this,
                i = "data-map-key",
                s = "data-map-name",
                l = "data-map-url",
                p = void 0,
                h = void 0,
                c = void 0,
                u = void 0,
                _ = void 0,
                g = void 0,
                m = void 0;
            for (g = '\n      <div\n         id="' + o.DIALOG_ID + '"\n         class="popup"\n         style="height:' + a.Sizer.popupHeight + 'px"\n      >\n         <p\n            style="text-align: center; font-weight: bold;"\n         >\n            Load Map\n         </p>\n   ', this._controller.getMapModel().getModifiedStatus() && (g += "<p> Warning: Current map has unsaved changes.</p>"), g += '\n      <span\n         class="clickableText"\n         ' + i + '="' + o.NEW_MAP_ID + '"\n         ' + s + '=""\n         ' + l + '=""\n      >\n         New Map\n      </span>\n      <br>\n   ', g += "<p><b> Saved Maps </b></p>", t.forEach(function(t) {
                    g += '\n         &nbsp; &nbsp; &nbsp;\n         <span\n            class="clickableText"\n            ' + i + '="' + t.key + '"\n            ' + s + '="' + t.name + '"\n            ' + l + '=""\n         >\n            ' + t.name + "\n         </span><br><br>\n      "
                }), u = r.m3App.getLoadableMaps(), u.length > 0 && (g += "<p><b> Pre-Loaded Maps </b></p>"), u.forEach(function(t) {
                    g += t.url ? '\n            &nbsp; &nbsp; &nbsp;\n            <span\n               class="clickableText"\n               ' + i + '=""\n               ' + s + '="' + t.name + '"\n               ' + l + '="' + t.url + '"\n            >\n               ' + t.name + "\n            </span><br><br>\n         " : "\n            &nbsp; &nbsp; &nbsp;\n            <span><b> " + t.name + " </b></span><br><br>\n         "
                }), g += "\n         <button\n            id='" + o.CANCEL_ID + "'\n         >\n            Cancel\n         </button>\n      </div>\n   ", h = new DOMParser, m = h.parseFromString(g, "text/html"), this._loadDialog = document.importNode(m.getElementById(o.DIALOG_ID), !0), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").appendChild(this._loadDialog), document.getElementById(o.CANCEL_ID).addEventListener("click", function() {
                    return e.close()
                }), _ = "#" + o.DIALOG_ID + " span.clickableText", p = document.querySelectorAll(_), c = 0; c < p.length; c++) p[c].addEventListener("click", function(t) {
                return e.loadMap(t.target.attributes["" + i].value, t.target.attributes["" + s].value, t.target.attributes["" + l].value)
            });
            document.getElementById(n.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), r.m3App.getGlobalState().setState(d.State.STATE_DIALOG_LOAD)
        }, o.prototype.loadMap = function(t, e, i) {
            var a = this,
                d = void 0;
            t === o.NEW_MAP_ID ? (this._controller.newMap(l.MapModel.TYPE_EMPTY, null, "New Map", null), this.close()) : "" !== t ? n.App.myDB.getItem(t).then(function(i) {
                a._controller.newMap(l.MapModel.TYPE_XML, t, e, i), a.close()
            }).catch(function(i) {
                a.close(), d = new s.ErrorDialog("Error loading map '" + e + "'" + ("using key '" + t + "'': ") + (i + " " + i.stack))
            }) : "" !== i ? r.m3App.getMapFromUrl(i, function(t) {
                this._controller.newMap(l.MapModel.TYPE_XML, null, e, t), this.close()
            }.bind(this)) : d = new s.ErrorDialog("Error: Unknown error loading map.")
        }
    }, {
        "./App": 2,
        "./ErrorDialog": 12,
        "./MapModel": 24,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    23: [function(t, e, i) {
        "use strict";

        function o() {
            var t = this,
                e = void 0,
                i = void 0,
                l = void 0;
            i = "<div id='" + o.DIALOG_ID + "' class='popup' " + ("style='height: " + a.Sizer.popupHeight + "px'>") + "<p style='text-align: center; font-weight: bold;'>Saved Maps</p>", n.App.myDB.getItem(n.App.KEY_MAPLIST).then(function(s) {
                s.forEach(function(t) {
                    i += "<span>" + t.name + "</span><button id='" + o.RENAME_ID_PREFIX + (t.key + "'>Rename</button>") + ("<button id='" + o.DELETE_ID_PREFIX) + (t.key + "'>Delete</button><br><br>")
                }), i += "<button id='" + o.CANCEL_ID + "'>Cancel</button></div>", e = new DOMParser, l = e.parseFromString(i, "text/html"), t._manageSavedMapsDialog = document.importNode(l.getElementById(o.DIALOG_ID), !0), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").appendChild(t._manageSavedMapsDialog), s.forEach(function(e, i) {
                    document.getElementById("" + o.RENAME_ID_PREFIX + e.key).addEventListener("click", function() {
                        return t.renameMap(s, i)
                    }), document.getElementById("" + o.DELETE_ID_PREFIX + e.key).addEventListener("click", function() {
                        return t.deleteMap(s, i)
                    })
                }), document.getElementById(o.CANCEL_ID).addEventListener("click", function() {
                    return t.close()
                }), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), r.m3App.getGlobalState().setState(d.State.STATE_DIALOG_MANAGE_SAVED_MAPS)
            }).catch(function(t) {
                new s.ErrorDialog("Unable to load list of saved maps: " + t)
            })
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.ManageSavedMapsDialog = o;
        var n = t("./App"),
            s = t("./ErrorDialog"),
            r = t("./main"),
            l = t("./RenameMapDialog"),
            a = t("./Sizer"),
            d = t("./State");
        o.DIALOG_ID = n.App.HTML_ID_PREFIX + "-manageSavedMapsDialog", o.CANCEL_ID = o.DIALOG_ID + "Cancel", o.DELETE_ID_PREFIX = o.DIALOG_ID + "D", o.RENAME_ID_PREFIX = o.DIALOG_ID + "R", o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(n.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._manageSavedMapsDialog), r.m3App.getGlobalState().setState(d.State.STATE_IDLE)
        }, o.prototype.deleteMap = function(t, e) {
            var i = this,
                o = void 0;
            t[e].key === r.m3App.getController().getMapModel().getDbKey() ? (this.close(), o = new s.ErrorDialog("Error: Cannot delete map being edited")) : n.App.myDB.removeItem(t[e].key).then(function() {
                return t.splice(e, 1), n.App.myDB.setItem(n.App.KEY_MAPLIST, t)
            }).then(function() {
                i.close()
            }).catch(function(i) {
                o = new s.ErrorDialog("Error trying to delete map " + ('"' + t[e].name + '" with key ') + (t[e].key + ": " + i))
            })
        }, o.prototype.renameMap = function(t, e) {
            var i = void 0;
            this.close(), i = new l.RenameMapDialog(t, e)
        }
    }, {
        "./App": 2,
        "./ErrorDialog": 12,
        "./RenameMapDialog": 28,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    24: [function(t, e, i) {
        "use strict";

        function o(t, e, i, n, s) {
            this._controller = t, this._mapName = n, this._modifiedStatus = !1, this._version = o._DEFAULT_VERSION, this.setMapName(n), this._unexpectedAttributes = new Map, this._unexpectedTags = [], e === o.TYPE_EMPTY ? (this._dbKey = null, this._rootNode = new p.NodeModel(this._controller, this, p.NodeModel.TYPE_NEW, null, ["New Map"], null), this.setModifiedStatus(!0)) : (this._dbKey = i, this._loadFromXml(s), this.setModifiedStatus(!1))
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.MapModel = o;
        var s = t("./App"),
            r = t("./Diagnostics"),
            l = t("./ErrorDialog"),
            a = t("./xmlHelpers"),
            d = t("./main"),
            p = t("./NodeModel"),
            h = t("./SaveDialog"),
            c = new Map([
                ["version", ""]
            ]),
            u = ["node"];
        o._DEFAULT_VERSION = "1.0.1", o.TYPE_EMPTY = "empty", o.TYPE_XML = "xml", o.prototype._connectArrowLinks = function(t) {
            var e = this;
            t.connectArrowLinks(), t.getChildren().forEach(function(t) {
                e._connectArrowLinks(t)
            })
        }, o.prototype.getAsXml = function() {
            var t = new Map,
                e = void 0,
                i = [];
            return t.set("version", this._version), e = [], e.push(this._rootNode), i = (0, a.createXml)("map", c, t, this._unexpectedAttributes, e, this._unexpectedTags)
        }, o.prototype.getDbKey = function() {
            return this._dbKey
        }, o.prototype.getMapName = function() {
            return this._mapName
        }, o.prototype.getModifiedStatus = function() {
            return this.modifiedStatus
        }, o.prototype.getNodeModelById = function(t, e) {
            var i = void 0,
                o = void 0,
                n = null;
            if (t.getId() === e) n = t;
            else
                for (o = 0; o < t.getChildren().length && null === n; o++) i = t.getChildren()[o], n = this.getNodeModelById(i, e);
            return n
        }, o.prototype.getRoot = function() {
            return this._rootNode
        }, o.prototype.getVersion = function() {
            return this._version
        }, o.prototype._loadFromXml = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                n = void 0;
            if (n = new DOMParser, o = "", t.forEach(function(t) {
                    o += t + "\n"
                }), null !== o) try {
                e = n.parseFromString(o, "text/xml")
            } catch (t) {
                d.m3App.getDiagnostics().err(r.Diagnostics.TASK_IMPORT_XML, "Error parsing XML."), d.m3App.getDiagnostics().err(r.Diagnostics.TASK_IMPORT_XML, t.message)
            }
            return i = e.documentElement, "map" !== i.nodeName.toLowerCase() ? void d.m3App.getDiagnostics().err(r.Diagnostics.TASK_IMPORT_XML, "This doesn't look like a mind map file. Doesn't start with <map>") : (this._version = i.getAttribute("version") || i.getAttribute("VERSION"), "1.0.1" === this._version ? this._loadFromXml1_0_1(i) : (d.m3App.getDiagnostics().warn(r.Diagnostics.TASK_IMPORT_XML, "I'm not familiar with version '" + this._version + "'. I'll pretend it's version '1.0.1'."), this._loadFromXml1_0_1(i)), void this._connectArrowLinks(this._rootNode))
        }, o.prototype._loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                s = void 0,
                l = void 0,
                h = void 0,
                _ = void 0,
                g = void 0,
                m = void 0;
            d.m3App.getDiagnostics().log(r.Diagnostics.TASK_IMPORT_XML, "Loading a version '" + this._version + "' file.");
            var v = (0, a.loadXml)(t, c, u),
                I = n(v, 4);
            for (o = I[0], g = I[1], s = I[2], m = I[3], this._unexpectedAttributes = g, h = s.length, e = 0; e < h; e++) i = s[e], _ = i.tagName, "node" === _ && (d.m3App.getDiagnostics().log(r.Diagnostics.TASK_IMPORT_XML, "Loading <" + _ + "?"), l = new p.NodeModel(this._controller, this, p.NodeModel.TYPE_XML, null, "", i), this._rootNode = l);
            this._unexpectedTags = m
        }, o.prototype.save = function() {
            var t = this,
                e = void 0;
            null === this._dbKey ? e = new h.SaveDialog : s.App.myDB.setItem(this._dbKey, this.getAsXml()).then(function() {
                t.setModifiedStatus(!1)
            }).catch(function(e) {
                new l.ErrorDialog("Error saving map " + (t._mapName + "' using key ") + ("'" + t._dbKey + "': " + e))
            })
        }, o.prototype.setDbKey = function(t) {
            this._dbKey = t
        }, o.prototype.setMapName = function(t) {
            this._mapName = t, this._controller.setMapName(t)
        }, o.prototype.setModifiedStatus = function(t) {
            this.modifiedStatus = t, this._controller.setModifiedIndicator(t)
        }
    }, {
        "./App": 2,
        "./Diagnostics": 10,
        "./ErrorDialog": 12,
        "./NodeModel": 26,
        "./SaveDialog": 31,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    25: [function(t, e, i) {
        "use strict";

        function o(t) {
            var e = this;
            this._controller = t, this._state = {
                oldState: h,
                oldSelectedNodeView: null,
                state: h,
                selectedNodeView: null,
                scroll: {
                    currentTranslationX: 0,
                    currentTranslationY: 0,
                    lastScreenX: 0,
                    lastScreenY: 0
                },
                velocityCalc: {
                    lastScreenX: 0,
                    lastScreenY: 0,
                    previousTime: 0,
                    vx: 0,
                    vy: 0
                }
            }, this._svgGElement = document.getElementById(n.App.HTML_ID_PREFIX + "-svg-g-element"), l.m3App.getDiagnostics().log(s.Diagnostics.TASK_VIEWS, "Creating MapView."), this._svgGElement.setAttribute("transform", "translate(0,0)"), document.getElementById("add-child").addEventListener("click", function() {
                return e.addChildClicked()
            }), document.getElementById("add-sibling").addEventListener("click", function() {
                return e.addSiblingClicked()
            }), document.getElementById("cloud").addEventListener("click", function() {
                return e.toggleCloudClicked()
            }), document.getElementById("delete-node").addEventListener("click", function() {
                return e.deleteNodeClicked()
            }), document.getElementById("edit-node").addEventListener("click", function() {
                return e.editNodeClicked()
            }), document.addEventListener("keypress", function(t) {
                return e._keyboardHandler(t)
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-drawing-area").addEventListener("mousedown", function(t) {
                return e._mouseDown(t)
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-drawing-area").addEventListener("mouseup", function(t) {
                return e._mouseUp(t)
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-drawing-area").addEventListener("mousemove", function(t) {
                return e._mouseMove(t)
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-drawing-area").addEventListener("touchstart", function(t) {
                return e._touchStart(t)
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-drawing-area").addEventListener("touchend", function(t) {
                return e._touchEnd(t)
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-drawing-area").addEventListener("touchmove", function(t) {
                return e._touchMove(t)
            })
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.MapViewController = o;
        var n = t("./App"),
            s = t("./Diagnostics"),
            r = t("./EditNodeDialog"),
            l = t("./main"),
            a = t("./NodeModel"),
            d = t("./Sizer"),
            p = t("./State"),
            h = "Idle",
            c = "Intertia Scroll",
            u = "Mouse Down On Map",
            _ = "Mouse Dragging",
            g = "Node Selected",
            m = "One Touch Dragging",
            v = "One Touch On Map";
        o.prototype.addChildClicked = function() {
            l.m3App.getGlobalState().getState() === p.State.STATE_IDLE && this._state.state === g && this._controller.addChild(this._state.selectedNodeView.getModel())
        }, o.prototype.addSiblingClicked = function() {
            var t = void 0,
                e = void 0;
            l.m3App.getGlobalState().getState() === p.State.STATE_IDLE && this._state.state === g && (e = this._state.selectedNodeView.getModel(), t = e.getParent(), null !== t && this._controller.addChildAfter(t, e))
        }, o.prototype.deleteNodeClicked = function() {
            var t = void 0,
                e = void 0,
                i = void 0,
                o = void 0;
            l.m3App.getGlobalState().getState() === p.State.STATE_IDLE && this._state.state === g && (e = this._state.selectedNodeView.getModel(), i = e.getParent(), null !== i && (o = i.getChildAfter(e), null !== o ? t = o : (o = i.getChildBefore(e), t = null !== o ? o : i), this.nodeClicked(t.getView()), this._ensureSelectedNodeVisible(), this._controller.deleteNode(e)))
        }, o.prototype.editNodeClicked = function() {
            var t = void 0;
            l.m3App.getGlobalState().getState() === p.State.STATE_IDLE && this._state.state === g && (t = new r.EditNodeDialog(this._controller, this._state.selectedNodeView.getModel(), null));
        }, o.prototype.getSelectedNodeView = function() {
            return this._state.selectedNodeView
        }, o.prototype.getCurrentTranslationX = function() {
            return this._state.scroll.currentTranslationX
        }, o.prototype.getCurrentTranslationY = function() {
            return this._state.scroll.currentTranslationY
        }, o.prototype.nodeClicked = function(t) {
            l.m3App.getGlobalState().getState() === p.State.STATE_IDLE && (this._state.state === g && this._state.selectedNodeView === t ? (this._state.selectedNodeView.setSelected(!1), this._state.selectedNodeView = null, this._state.state = h) : this.setSelectedNodeView(t))
        }, o.prototype.reset = function() {
            this._state.scroll.currentTranslationX = 0, this._state.scroll.currentTranslationY = 0, this._svgGElement.setAttribute("transform", "translate(0,0)")
        }, o.prototype.setSelectedNodeView = function(t) {
            this._state.state === g && t !== this._state.selectedNodeView && this._state.selectedNodeView.setSelected(!1), t.setSelected(!0), this._state.selectedNodeView = t, this._state.state = g
        }, o.prototype.toggleCloudClicked = function() {
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE) switch (this._state.state) {
                case g:
                    this._controller.toggleCloud(this._state.selectedNodeView.getModel())
            }
        }, o.prototype.positionSelectedNodeOptimally = function() {
            var t = !1,
                e = !1,
                i = void 0,
                o = void 0,
                n = void 0,
                s = void 0,
                r = void 0,
                l = void 0,
                p = void 0;
            if (null !== this._state.selectedNodeView) {
                var h = this._state.selectedNodeView.getCoordinates();
                l = h.x, p = h.y, i = this._state.selectedNodeView.getBubbleHeight(), r = this._state.selectedNodeView.getBubbleWidth(), o = this._state.selectedNodeView.getModel(), o.getChildren().forEach(function(i) {
                    i.getSide() === a.NodeModel.POSITION_LEFT ? t = !0 : e = !0
                }), s = d.Sizer.svgHeight / 2 - p - i / 2, n = !t && !e || !t && e ? -l + 20 : t && e ? d.Sizer.svgWidth / 2 - l - r / 2 : d.Sizer.svgWidth - l - r - 20, this._state.scroll.currentTranslationX = n, this._state.scroll.currentTranslationY = s, this._svgGElement.setAttribute("transform", "translate(" + n + "," + s + ")")
            }
        }, o.prototype.centerSelectedNode = function() {
            var t = void 0,
                e = void 0,
                i = void 0,
                o = void 0;
            if (null !== this._state.selectedNodeView) {
                var n = this._state.selectedNodeView.getCoordinates();
                i = n.x, o = n.y, t = this._state.selectedNodeView.getBubbleHeight(), e = this._state.selectedNodeView.getBubbleWidth(), this._state.scroll.currentTranslationX = d.Sizer.svgWidth / 2 - i - e / 2, this._state.scroll.currentTranslationY = d.Sizer.svgHeight / 2 - o - t / 2, this._svgGElement.setAttribute("transform", "translate(" + this._state.scroll.currentTranslationX + ("," + this._state.scroll.currentTranslationY + ")"))
            }
        }, o.prototype._ensureSelectedNodeVisible = function() {
            var t = 10,
                e = void 0,
                i = 0,
                o = 0,
                n = void 0,
                s = void 0,
                r = void 0,
                l = void 0;
            if (null !== this._state.selectedNodeView) {
                var a = this._state.selectedNodeView.getCoordinates();
                r = a.x, l = a.y, n = this._state.selectedNodeView.getBubbleHeight(), s = this._state.selectedNodeView.getBubbleWidth(), e = r + this._state.scroll.currentTranslationX, e < t ? i = 100 - e : e + s > d.Sizer.svgWidth - t && (i = d.Sizer.svgWidth - (e + s + t)), e = l + this._state.scroll.currentTranslationY, e < 10 ? o = 100 - e : e + n > d.Sizer.svgHeight - t && (o = d.Sizer.svgHeight - (e + n + t)), this._state.scroll.currentTranslationX += i, this._state.scroll.currentTranslationY += o, this._svgGElement.setAttribute("transform", "translate(" + this._state.scroll.currentTranslationX + ("," + this._state.scroll.currentTranslationY + ")"))
            }
        }, o.prototype._inertiaScroll = function() {
            var t = void 0,
                e = void 0,
                i = void 0,
                o = void 0,
                n = void 0,
                s = void 0;
            this._state.state === c && (o = Date.now(), t = o - this._state.velocityCalc.previousTime, this._state.velocityCalc.previousTime = o, n = this._state.scroll.currentTranslationX, s = this._state.scroll.currentTranslationY, e = this._state.scroll.getInertiaScrollX(), i = this._state.scroll.getInertiaScrollY(), this._state.scroll.currentTranslationX = e, this._state.scroll.currentTranslationY = i, this._svgGElement.setAttribute("transform", "translate(" + e + ", " + i + ")"), Math.abs(n - e) / t > .01 || Math.abs(s - i) / t > .01 ? window.requestAnimationFrame(this._inertiaScroll.bind(this)) : this._restoreState())
        }, o.prototype._interactionMove = function(t, e) {
            var i = void 0,
                o = void 0,
                n = void 0,
                s = void 0;
            o = t - this._state.scroll.lastScreenX, n = e - this._state.scroll.lastScreenY, this._state.scroll.currentTranslationX += o, this._state.scroll.currentTranslationY += n, this._state.scroll.lastScreenX = t, this._state.scroll.lastScreenY = e, this._svgGElement.setAttribute("transform", "translate(" + this._state.scroll.currentTranslationX + ("," + this._state.scroll.currentTranslationY + ")")), s = Date.now(), i = s - this._state.velocityCalc.previousTime, i > 50 && (this._state.velocityCalc.previousTime = s, o = t - this._state.velocityCalc.lastScreenX, n = e - this._state.velocityCalc.lastScreenY, this._state.velocityCalc.lastScreenX = t, this._state.velocityCalc.lastScreenY = e, this._state.velocityCalc.vx = o / i, this._state.velocityCalc.vy = n / i)
        }, o.prototype._interactionStart = function(t, e) {
            this._state.scroll.lastScreenX = t, this._state.scroll.lastScreenY = e, this._state.velocityCalc.lastScreenX = t, this._state.velocityCalc.lastScreenY = e, this._state.velocityCalc.previousTime = Date.now(), this._state.velocityCalc.vx = 0, this._state.velocityCalc.vy = 0
        }, o.prototype._interactionStop = function() {
            if (0 !== this._state.velocityCalc.vx || 0 !== this._state.velocityCalc.vy) {
                var t = .005,
                    e = this._state.scroll.currentTranslationX,
                    i = this._state.scroll.currentTranslationY,
                    o = Date.now(),
                    n = this._state.velocityCalc.vx,
                    s = this._state.velocityCalc.vy;
                this._state.scroll.getInertiaScrollX = function() {
                    var i = void 0,
                        s = void 0;
                    return i = Date.now() - o, s = Math.round(n / t * (-Math.exp(-t * i) + 1) + e)
                }, this._state.scroll.getInertiaScrollY = function() {
                    var e = void 0,
                        n = void 0;
                    return e = Date.now() - o, n = Math.round(s / t * (-Math.exp(-t * e) + 1) + i)
                }, this._saveState(), this._state.state = c, window.requestAnimationFrame(this._inertiaScroll.bind(this))
            }
        }, o.prototype._keyboardHandler = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                n = void 0,
                s = void 0;
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE && this._state.state === g) {
                if (s = this._state.selectedNodeView, o = s.getModel(), n = o.getParent(), !t.ctrlKey && t.charCode >= 33 && t.charCode <= 126 && !l.m3App.isReadOnly()) return void(e = new r.EditNodeDialog(this._controller, this._state.selectedNodeView.getModel(), String.fromCharCode(t.charCode)));
                switch (t.key) {
                    case " ":
                        null !== n && 0 !== o.getChildren().length && this._controller.toggleFoldedStatus(o);
                        break;
                    case "s":
                        t.ctrlKey && (this._controller.getMapModel().save(), t.preventDefault());
                        break;
                    case "ArrowDown":
                        null !== n && (t.ctrlKey ? this._controller.moveNodeDown(o) : (i = n.getChildAfter(o), null === i && (i = n.getFirstChild(o.getSide())), i !== o && (this.nodeClicked(i.getView()), this._ensureSelectedNodeVisible()))), t.preventDefault();
                        break;
                    case "ArrowLeft":
                        i = null, o.getSide() === a.NodeModel.POSITION_NONE ? o.isFolded() || o.getChildren().forEach(function(t) {
                            null === i && t.getSide() === a.NodeModel.POSITION_LEFT && (i = t)
                        }) : o.getSide() === a.NodeModel.POSITION_LEFT ? o.getChildren().length > 0 && !o.isFolded() && (i = o.getChildren()[0]) : i = n, null !== i && (this.nodeClicked(i.getView()), this._ensureSelectedNodeVisible());
                        break;
                    case "ArrowRight":
                        i = null, o.getSide() === a.NodeModel.POSITION_NONE ? o.isFolded() || o.getChildren().forEach(function(t) {
                            null === i && t.getSide() === a.NodeModel.POSITION_RIGHT && (i = t)
                        }) : o.getSide() === a.NodeModel.POSITION_LEFT ? i = n : o.getChildren().length > 0 && !o.isFolded() && (i = o.getChildren()[0]), null !== i && (this.nodeClicked(i.getView()), this._ensureSelectedNodeVisible());
                        break;
                    case "ArrowUp":
                        null !== o.getParent() && (t.ctrlKey && !l.m3App.isReadOnly() ? this._controller.moveNodeUp(o) : (i = n.getChildBefore(o), null === i && (i = n.getLastChild(o.getSide())), i !== o && (this.nodeClicked(i.getView()), this._ensureSelectedNodeVisible()))), t.preventDefault();
                        break;
                    case "Delete":
                        l.m3App.isReadOnly() || this.deleteNodeClicked();
                        break;
                    case "End":
                        l.m3App.isReadOnly() || this.editNodeClicked();
                        break;
                    case "Enter":
                        l.m3App.isReadOnly() || this.addSiblingClicked();
                        break;
                    case "Home":
                        t.ctrlKey ? this.centerSelectedNode() : l.m3App.isReadOnly() || this.editNodeClicked();
                        break;
                    case "Insert":
                        l.m3App.isReadOnly() || this.addChildClicked()
                }
            }
        }, o.prototype._mouseDown = function(t) {
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE) switch (this._state.state) {
                case c:
                    this._state.state = u, this._interactionStart(t.screenX, t.screenY);
                    break;
                case h:
                case g:
                    this._saveState(), this._state.state = u, this._interactionStart(t.screenX, t.screenY)
            }
            t.preventDefault()
        }, o.prototype._mouseMove = function(t) {
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE) switch (this._state.state) {
                case u:
                case _:
                    this._state.state = _, this._interactionMove(t.screenX, t.screenY)
            }
            t.preventDefault()
        }, o.prototype._mouseUp = function(t) {
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE) switch (this._state.state) {
                case u:
                case _:
                    this._restoreState(), this._interactionStop()
            }
            t.preventDefault()
        }, o.prototype._restoreState = function() {
            this._state.state = this._state.oldState, this._state.selectedNodeView = this._state.oldSelectedNodeView
        }, o.prototype._saveState = function() {
            this._state.oldState = this._state.state, this._state.oldSelectedNodeView = this._state.selectedNodeView
        }, o.prototype._touchMove = function(t) {
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE) switch (this._state.state) {
                case v:
                case m:
                    this._interactionMove(t.changedTouches[0].screenX, t.changedTouches[0].screenY), this._state.state = m
            }
            t.preventDefault()
        }, o.prototype._touchEnd = function(t) {
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE) switch (this._state.state) {
                case m:
                case v:
                    this._restoreState(), this._interactionStop()
            }
        }, o.prototype._touchStart = function(t) {
            if (l.m3App.getGlobalState().getState() === p.State.STATE_IDLE) switch (this._state.state) {
                case c:
                    this._state.state = v, this._interactionStart(t.changedTouches[0].screenX, t.changedTouches[0].screenY);
                    break;
                case h:
                case g:
                    this._saveState(), this._state.state = v, this._interactionStart(t.changedTouches[0].screenX, t.changedTouches[0].screenY)
            }
        }
    }, {
        "./App": 2,
        "./Diagnostics": 10,
        "./EditNodeDialog": 11,
        "./NodeModel": 26,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    26: [function(t, e, i) {
        "use strict";

        function o(t, e, i, n, s, r) {
            this._controller = t, this._myMapModel = e, this._myView = null, this._parent = n, this._arrowLinks = [], this._backgroundColor = "", this._children = [], this._cloudModel = null, this._font = null, this._icons = [], this._isFolded = !1, this._link = null, this._linkTargets = [], this._note = null, this._richText = null, this._textColor = "#000000", this._unexpectedAttributes = new Map, this._unexpectedTags = [], null !== n && null === n.getParent() ? this._position = o.POSITION_RIGHT : this._position = null, i === o.TYPE_NEW ? (this._created = Date.now(), this._id = "ID_" + this._created, this._modified = this._created, this._text = s) : (this._text = null, this._loadFromXml1_0_1(r))
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.NodeModel = o;
        var s = t("./ArrowLink"),
            r = t("./CloudModel"),
            l = t("./Diagnostics"),
            a = t("./Font"),
            d = t("./IconModel"),
            p = t("./LinkTarget"),
            h = t("./xmlHelpers"),
            c = t("./NodeView"),
            u = t("./RichContent"),
            _ = t("./main"),
            g = new Map([
                ["BACKGROUND_COLOR", ""],
                ["CREATED", ""],
                ["COLOR", "#000000"],
                ["FOLDED", "false"],
                ["ID", ""],
                ["LINK", ""],
                ["MODIFIED", ""],
                ["POSITION", ""],
                ["TEXT", ""]
            ]),
            m = ["arrowlink", "cloud", "font", "icon", "linktarget", "node", "richcontent"];
        o.escapeSpecialChars = function(t) {
            var e = void 0;
            return e = t.replace(new RegExp("&", "g"), "&amp;"), e = e.replace(new RegExp("<", "g"), "&lt;"), e = e.replace(new RegExp(">", "g"), "&gt;"), e = e.replace(new RegExp('"', "g"), "&quot;"), e = e.replace(new RegExp("'", "g"), "&apos;")
        }, o.POSITION_NONE = "none", o.POSITION_RIGHT = "right", o.POSITION_LEFT = "left", o.TYPE_NEW = "new", o.TYPE_XML = "xml", o.prototype.addChild = function(t) {
            var e = new o(this._controller, this._myMapModel, o.TYPE_NEW, this, t);
            return this._children.push(e), this._myMapModel.setModifiedStatus(!0), e
        }, o.prototype.addChildAfter = function(t, e) {
            var i = new o(this._controller, this._myMapModel, o.TYPE_NEW, this, e);
            return this._children.splice(this._children.indexOf(t) + 1, 0, i), this._myMapModel.setModifiedStatus(!0), i
        }, o.prototype.connectArrowLinks = function() {
            var t = this;
            this._arrowLinks.forEach(function(e) {
                e.connectToNodeModel(t._myMapModel)
            })
        }, o.prototype.deleteChild = function(t) {
            for (; 0 !== t.getChildren().length;) t.deleteChild(t.getChildren()[0]);
            t.prepareForDelete(), this._children.splice(this._children.indexOf(t), 1), this._myMapModel.setModifiedStatus(!0)
        }, o.prototype.getArrowLinks = function() {
            return this._arrowLinks
        }, o.prototype.getAsXml = function() {
            var t = void 0,
                e = void 0,
                i = void 0,
                n = void 0,
                s = void 0,
                r = [];
            for (e = new Map, e.set("BACKGROUND_COLOR", this._backgroundColor), e.set("COLOR", this._textColor), e.set("CREATED", this._created), this._isFolded === !0 ? e.set("FOLDED", "true") : e.set("FOLDED", "false"), e.set("ID", this._id), null !== this._link && e.set("LINK", o.escapeSpecialChars(this._link)), e.set("MODIFIED", this._modified), null !== this._parent && null === this._parent.getParent() ? e.set("POSITION", this._position) : e.set("POSITION", g.get("POSITION")), null !== this._text && (t = "", this._text.forEach(function(e, i) {
                    s = o.escapeSpecialChars(e), 0 !== i ? t += "&#xa;" + s : t = s
                }), e.set("TEXT", t)), i = [], this._arrowLinks.forEach(function(t) {
                    i.push(t)
                }), null !== this._cloudModel && i.push(this._cloudModel), null !== this._font && i.push(this._font), this._icons.forEach(function(t) {
                    i.push(t)
                }), this._linkTargets.forEach(function(t) {
                    i.push(t)
                }), null !== this._richText && i.push(this._richText), null !== this._note && i.push(this._note), n = 0; n < this._children.length; n++) i.push(this._children[n]);
            return r = (0, h.createXml)("node", g, e, this._unexpectedAttributes, i, this._unexpectedTags)
        }, o.prototype.getBackgroundColor = function() {
            return this._backgroundColor
        }, o.prototype.getChildAfter = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0;
            if (i = this._children.indexOf(t) + 1, e = null, null !== this._parent) i < this._children.length && (e = this._children[i]);
            else
                for (o = t.getSide(); null === e && i < this._children.length;) this._children[i].getSide() === o && (e = this._children[i]), i++;
            return e
        }, o.prototype.getChildBefore = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0;
            if (i = this._children.indexOf(t) - 1, e = null, null !== this._parent) i >= 0 && (e = this._children[i]);
            else
                for (o = t.getSide(); null === e && i >= 0;) this._children[i].getSide() === o && (e = this._children[i]), i--;
            return e
        }, o.prototype.getChildren = function() {
            return this._children
        }, o.prototype.getCloudModel = function() {
            return this._cloudModel
        }, o.prototype.getCreatedTimestamp = function() {
            return this._created
        }, o.prototype.getFirstChild = function(t) {
            var e = void 0,
                i = void 0;
            for (i = null, e = 0; null === i && e < this._children.length;) this._children[e].getSide() === t && (i = this._children[e]), e++;
            return i
        }, o.prototype.getDescendants = function() {
            var t = void 0;
            return t = this._children, this._children.forEach(function(e) {
                t = t.concat(e.getDescendants())
            }), t
        }, o.prototype.getFont = function() {
            return this._font
        }, o.prototype.getIcons = function() {
            return this._icons
        }, o.prototype.getId = function() {
            return this._id
        }, o.prototype.getLastChild = function(t) {
            var e = void 0,
                i = void 0;
            for (i = null, e = this._children.length - 1; null === i && e >= 0;) this._children[e].getSide() === t && (i = this._children[e]), e--;
            return i
        }, o.prototype.getLink = function() {
            return this._link
        }, o.prototype.getLinkTargets = function() {
            return this._linkTargets
        }, o.prototype.getModifiedTimestamp = function() {
            return this._modified
        }, o.prototype.getNote = function() {
            var t = void 0;
            return t = null, null !== this._note && (t = this._note.getContent()), t
        }, o.prototype.getParent = function() {
            return this._parent
        }, o.prototype.getRichText = function() {
            var t = void 0;
            return t = null, null !== this._richText && (t = this._richText.getContent()), t
        }, o.prototype.getSide = function() {
            var t = void 0;
            return t = null === this._parent ? o.POSITION_NONE : null === this._parent.getParent() ? this._position : this._parent.getSide()
        }, o.prototype.getText = function() {
            return this._text
        }, o.prototype.getTextColor = function() {
            return this._textColor
        }, o.prototype.getView = function() {
            return null === this._myView && (this._myView = new c.NodeView(this._controller, this)), this._myView
        }, o.prototype.hasCloud = function() {
            return null !== this._cloudModel
        }, o.prototype.hasView = function() {
            return null !== this._myView
        }, o.prototype.isFolded = function() {
            return this._isFolded
        }, o.prototype._loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                c = void 0,
                v = void 0,
                I = void 0,
                y = void 0,
                f = void 0,
                A = void 0,
                E = void 0,
                T = void 0,
                M = void 0,
                b = void 0,
                D = void 0,
                w = void 0,
                S = (0, h.loadXml)(t, g, m),
                L = n(S, 4);
            for (I = L[0], D = L[1], y = L[2], w = L[3], this._backgroundColor = I.get("BACKGROUND_COLOR"), this._created = I.get("CREATED"), this._textColor = I.get("COLOR"), "true" === I.get("FOLDED") ? this._isFolded = !0 : this._isFolded = !1, this._id = I.get("ID"), this._link = I.get("LINK"), "" === this._link && (this._link = null), this._modified = I.get("MODIFIED"), this._position = I.get("POSITION"), this._text = I.get("TEXT").split("\n"), this._unexpectedAttributes = D, _.m3App.getDiagnostics().log(l.Diagnostics.TASK_IMPORT_XML, "Created node: " + this._text), A = y.length, e = 0; e < A; e++) c = y[e], b = c.tagName, "node" === b ? (f = new o(this._controller, this._myMapModel, o.TYPE_XML, this, "", c), this._children.push(f)) : "arrowlink" === b ? (i = new s.ArrowLink, i.loadFromXml1_0_1(c), this._arrowLinks.push(i)) : "cloud" === b ? (this._cloudModel = new r.CloudModel, this._cloudModel.loadFromXml1_0_1(c)) : "font" === b ? (this._font = new a.Font, this._font.loadFromXml1_0_1(c)) : "icon" === b ? (v = new d.IconModel, v.loadFromXml1_0_1(c), this._icons.push(v)) : "linktarget" === b ? (M = new p.LinkTarget, M.loadFromXml1_0_1(c), this._linkTargets.push(M)) : "richcontent" === b && (E = new u.RichContent, E.loadFromXml1_0_1(c), T = E.getType(), "NODE" === T ? this._richText = E : "NOTE" === T ? this._note = E : _.m3App.getDiagnostics().warn(l.Diagnostics.TASK_IMPORT_XML, "<node>: Unexpected type of richcontent: " + E.getType()));
            this._unexpectedTags = w
        }, o.prototype.moveChildDown = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0;
            1 !== this._children.length && (e = this._children.indexOf(t), null !== this._parent ? e !== this._children.length - 1 ? (o = this._children[e + 1], this._children[e] = o, this._children[e + 1] = t) : (this._children.pop(), this._children.unshift(t)) : (o = this.getChildAfter(t), null !== o ? (i = this._children.indexOf(o), this._children[e] = o, this._children[i] = t) : (o = this.getFirstChild(t.getSide()), o !== t && (this._children.splice(e, 1), this._children.unshift(t)))))
        }, o.prototype.moveChildUp = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0;
            1 !== this._children.length && (e = this._children.indexOf(t), null !== this._parent ? 0 !== e ? (o = this._children[e - 1], this._children[e - 1] = t, this._children[e] = o) : (this._children.shift(), this._children.push(t)) : (o = this.getChildBefore(t), null !== o ? (i = this._children.indexOf(o), this._children[e] = o, this._children[i] = t) : (o = this.getLastChild(t.getSide()), o !== t && (this._children.splice(e, 1), this._children.push(t)))))
        }, o.prototype.prepareForDelete = function() {
            var t = this,
                e = this._myMapModel.getRoot();
            null !== this._myView && (this._myView.deleteMyself(), this._myView = null), this._arrowLinks.forEach(function(e) {
                e.getDestinationNode().removeLinkTargetWithSrc(t._id), e.prepareForDelete()
            }), this._linkTargets.forEach(function(i) {
                var o = t._myMapModel.getNodeModelById(e, i.getSource());
                o.removeArrowLinkWithDest(t._id)
            })
        }, o.prototype.removeArrowLinkWithDest = function(t) {
            var e = -1;
            this._arrowLinks.forEach(function(i, o) {
                i.getDestinationId() === t && (i.prepareForDelete(), e = o)
            }), e !== -1 ? this._arrowLinks.splice(e, 1) : console.log("Yikes--can't delete arrowLink with destination " + t + "!")
        }, o.prototype.removeLinkTargetWithSrc = function(t) {
            var e = -1;
            this._linkTargets.forEach(function(i, o) {
                i.getSource() === t && (e = o)
            }), e !== -1 ? this._linkTargets.splice(e, 1) : console.log("Yikes--can't delete linkTarget with src " + t + "!")
        }, o.prototype.setBackgroundColor = function(t) {
            this._backgroundColor = t, this._modified = Date.now(), this._myMapModel.setModifiedStatus(!0)
        }, o.prototype.setText = function(t) {
            this._text = t, this._modified = Date.now(), this._myMapModel.setModifiedStatus(!0)
        }, o.prototype.setTextColor = function(t) {
            this._textColor = t, this._modified = Date.now(), this._myMapModel.setModifiedStatus(!0)
        }, o.prototype.toggleCloud = function() {
            null === this._cloudModel ? this._cloudModel = new r.CloudModel : this._cloudModel = null, this._hasCloud = !this._hasCloud, this._myMapModel.setModifiedStatus(!0)
        }, o.prototype.toggleFoldedStatus = function() {
            this._isFolded = !this._isFolded, this._myMapModel.setModifiedStatus(!0)
        }
    }, {
        "./ArrowLink": 4,
        "./CloudModel": 6,
        "./Diagnostics": 10,
        "./Font": 15,
        "./IconModel": 17,
        "./LinkTarget": 21,
        "./NodeView": 27,
        "./RichContent": 29,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    27: [function(t, e, i) {
        "use strict";

        function o(t, e) {
            var i = this,
                o = void 0;
            this._controller = t, this._myNodeModel = e, this._isRoot = null === this._myNodeModel.getParent(), this._mostRecentCloudColor = null, this._myIconViews = [], this._myLinkIconView = null, this._myConnector = null, this._myFoldingIcon = null, this._mySide = this._myNodeModel.getSide(), this._isVisible = !0, this._isRoot !== !0 && (this._myConnector = new r.ConnectorView(this)), null === e.getRichText() ? this._myText = new u.TextView(this, e) : this._myText = new c.RichTextView(this, e), e.getIcons().forEach(function(t) {
                i._myIconViews.push(new d.IconView(i, t))
            }), o = e.getLink(), null !== o && "#" !== o[0] && (this._myLinkIconView = new p.LinkIconView(this, e)), this._myBubble = new n.BubbleView(this, this._myNodeModel, this._getBubbleContentsWidth(), this._getBubbleContentsHeight()), this._myNodeModel.hasCloud() ? this._myCloud = new s.CloudView(this._myNodeModel.getCloudModel()) : this._myCloud = null, 0 !== this._myNodeModel.getChildren().length && this._isRoot !== !0 && (this._myFoldingIcon = new l.FoldingIconView(this, this._myNodeModel))
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.NodeView = o;
        var n = t("./BubbleView"),
            s = t("./CloudView"),
            r = t("./ConnectorView"),
            l = t("./FoldingIconView"),
            a = t("./GraphicalLinkView"),
            d = t("./IconView"),
            p = t("./LinkIconView"),
            h = t("./NodeModel"),
            c = t("./RichTextView"),
            u = t("./TextView");
        o.VERTICAL_SEPARATION = 15, o.prototype.calcDimensions = function() {
            var t = void 0;
            0 === this._myNodeModel.getChildren().length || this._myNodeModel.isFolded() || this._myNodeModel.getChildren().forEach(function(t) {
                t.getView().calcDimensions()
            }), this._myWidth = this._myBubble.getWidth(), this._myHeight = this._myBubble.getHeight(), this._isRoot ? (this._myTotalWidth = this._myWidth, 0 !== this._myNodeModel.getChildren().length && (t = this.getMaxChildTotalWidth(h.NodeModel.POSITION_LEFT), 0 !== t && (this._myTotalWidth += r.ConnectorView.WIDTH + t), t = this.getMaxChildTotalWidth(h.NodeModel.POSITION_RIGHT), 0 !== t && (this._myTotalWidth += r.ConnectorView.WIDTH + t)), this._myTotalHeight = this._myHeight, this._myTotalHeight = Math.max(this._myTotalHeight, this.getTotalChildrenHeight(h.NodeModel.POSITION_LEFT)), this._myTotalHeight = Math.max(this._myTotalHeight, this.getTotalChildrenHeight(h.NodeModel.POSITION_RIGHT))) : (this._myTotalWidth = this._myWidth, 0 !== this._myNodeModel.getChildren().length && (this._myTotalWidth += this._myFoldingIcon.getWidth(), this._myNodeModel.isFolded() !== !0 && (this._myTotalWidth += r.ConnectorView.WIDTH, this._myTotalWidth += this.getMaxChildTotalWidth(this._mySide))), this._myTotalHeight = this._myBubble.getHeight(), 0 !== this._myNodeModel.getChildren().length && (this._myTotalHeight = Math.max(this._myHeight, this._myFoldingIcon.getHeight()), this._myNodeModel.isFolded() !== !0 && (this._myTotalHeight = Math.max(this._myTotalHeight, this.getTotalChildrenHeight(this._mySide))))), this._myNodeModel.hasCloud() ? (this._myCloud.setAreaToEnclose(this._myTotalWidth, this._myTotalHeight), this._myTotalWidth = this._myCloud.getWidth(), this._myTotalHeight = this._myCloud.getHeight()) : this._myCloud = null
        }, o.prototype.deleteMyself = function() {
            null !== this._myConnector && this._myConnector.deleteSvg(), this._myText.deleteSvg(), this._myBubble.deleteSvg(), null !== this._myCloud && this._myCloud.deleteSvg(), null !== this._myFoldingIcon && this._myFoldingIcon.deleteSvg(), this._myIconViews.forEach(function(t) {
                t.deleteSvg()
            }), null !== this._myLinkIconView && this._myLinkIconView.deleteSvg()
        }, o.prototype.drawAt = function(t, e, i, o) {
            this._x = t, this._y = e;
            var s = void 0,
                l = void 0,
                a = void 0;
            this._isRoot && this.setMostRecentCloudColor(null), this.setVisible(!0, !1), this._isRoot !== !0 && (this._mySide === h.NodeModel.POSITION_LEFT ? this._myConnector.setPosition(t + this.getBubbleWidth(), e, i, o) : this._myConnector.setPosition(t, e, i, o)), a = t + n.BubbleView.BUBBLE_INNER_PADDING, this._myIconViews.forEach(function(t) {
                t.setPosition(a, e), a += t.getWidth() + n.BubbleView.BUBBLE_INNER_PADDING
            }), this._myText.setPosition(a, e), a += this._myText.getWidth() + n.BubbleView.BUBBLE_INNER_PADDING, null !== this._myLinkIconView && this._myLinkIconView.setPosition(a, e), this._myBubble.setPosition(t, e), this._myBubble.setMostRecentCloudColor(this._mostRecentCloudColor), null !== this._myCloud && (this._isRoot ? (s = this.getMaxChildTotalWidth(h.NodeModel.POSITION_LEFT), l = 0 !== s ? t - r.ConnectorView.WIDTH - s : t) : this._mySide === h.NodeModel.POSITION_LEFT ? 0 === this._myNodeModel.getChildren().length ? l = t : (l = t - this._myFoldingIcon.getWidth(), s = this.getMaxChildTotalWidth(h.NodeModel.POSITION_LEFT), 0 !== s && (l = t - this._myFoldingIcon.getWidth() - r.ConnectorView.WIDTH - s)) : l = t, this._myCloud.setPosition(l, e)), 0 !== this._myNodeModel.getChildren().length && (this._isRoot ? this._myNodeModel.isFolded() === !1 && (this._drawChildren(h.NodeModel.POSITION_LEFT), this._drawChildren(h.NodeModel.POSITION_RIGHT)) : (this._mySide === h.NodeModel.POSITION_LEFT ? this._myFoldingIcon.setPosition(t - this._myFoldingIcon.getWidth(), e) : this._myFoldingIcon.setPosition(t + this._myBubble.getWidth(), e), this._myNodeModel.isFolded() ? this._myNodeModel.getChildren().forEach(function(t) {
                t.hasView() && t.getView().setVisible(!1, !0)
            }) : this._drawChildren(this._mySide)))
        }, o.prototype._drawChildren = function(t) {
            var e = this,
                i = void 0,
                n = void 0,
                s = void 0,
                l = void 0,
                a = void 0;
            a = this._isRoot ? 0 : this._myFoldingIcon.getWidth(), t === h.NodeModel.POSITION_LEFT ? (l = this._x - a, i = l - r.ConnectorView.WIDTH) : (l = this._x + this._myBubble.getWidth() + a, i = l + r.ConnectorView.WIDTH), n = this._y - this.getTotalChildrenHeight(t) / 2, this._myNodeModel.getChildren().forEach(function(a) {
                a.getSide() === t && (s = a.getView(), i = t === h.NodeModel.POSITION_LEFT ? l - r.ConnectorView.WIDTH - s.getBubbleWidth() : l + r.ConnectorView.WIDTH, n += s.getTotalHeight() / 2, s.drawAt(i, n, l, e._y), n += s.getTotalHeight() / 2 + o.VERTICAL_SEPARATION)
            })
        }, o.prototype._getBubbleContentsHeight = function() {
            var t = void 0;
            return t = this._myText.getHeight(), 0 !== this._myIconViews.length && (t = Math.max(t, this._myIconViews[0].getHeight())), null !== this._myLinkIconView && (t = Math.max(t, this._myLinkIconView.getHeight())), t
        }, o.prototype._getBubbleContentsWidth = function() {
            var t = void 0;
            return t = 0, 0 !== this._myIconViews.length && (t += (this._myIconViews[0].getWidth() + n.BubbleView.BUBBLE_INNER_PADDING) * this._myIconViews.length), t += this._myText.getWidth(), null !== this._myLinkIconView && (t += n.BubbleView.BUBBLE_INNER_PADDING + this._myLinkIconView.getWidth()), t
        }, o.prototype.getBubbleHeight = function() {
            return this._myBubble.getHeight()
        }, o.prototype.getBubbleWidth = function() {
            return this._myBubble.getWidth()
        }, o.prototype.getCoordinates = function() {
            return {
                x: this._x,
                y: this._y
            }
        }, o.prototype.getGraphicalLinkCoords = function() {
            var t = {
                x: null,
                y: null
            };
            return this.isRoot || this._mySide === h.NodeModel.POSITION_RIGHT ? (t.x = this._x + this._myBubble.getWidth() + a.GraphicalLinkView.ARROW_WIDTH, null !== this._myFoldingIcon && (t.x += this._myFoldingIcon.getWidth()), t.y = this._y) : (t.x = this._x - a.GraphicalLinkView.ARROW_WIDTH, null !== this._myFoldingIcon && (t.x -= this._myFoldingIcon.getWidth()), t.y = this._y), t
        }, o.prototype.getMaxChildTotalWidth = function(t) {
            var e = 0;
            return this._myNodeModel.isFolded() !== !0 && this._myNodeModel.getChildren().forEach(function(i) {
                i.getSide() === t && (e = Math.max(e, i.getView().getTotalWidth()))
            }), e
        }, o.prototype.getModel = function() {
            return this._myNodeModel
        }, o.prototype.getTotalChildrenHeight = function(t) {
            var e = 0,
                i = 0;
            return this._myNodeModel.isFolded() !== !0 && (this._myNodeModel.getChildren().forEach(function(o) {
                o.getSide() === t && (i += o.getView().getTotalHeight(), e += 1)
            }), i += (e - 1) * o.VERTICAL_SEPARATION), i
        }, o.prototype.getTotalHeight = function() {
            return this._myTotalHeight
        }, o.prototype.getTotalWidth = function() {
            return this._myTotalWidth
        }, o.prototype.isVisible = function() {
            return this._isVisible
        }, o.prototype.setMostRecentCloudColor = function(t) {
            var e = this,
                i = void 0;
            this._mostRecentCloudColor = t, i = this._myNodeModel.getCloudModel(), null !== i && (this._mostRecentCloudColor = i.getColor()), this._myNodeModel.getChildren().forEach(function(t) {
                t.hasView() && t.getView().setMostRecentCloudColor(e._mostRecentCloudColor)
            })
        }, o.prototype.setSelected = function(t) {
            this._myBubble.setSelected(t)
        }, o.prototype.setVisible = function(t, e) {
            var i = void 0;
            this._isVisible !== t && (this._isVisible = t, i = this._controller.getMapViewController(), t === !1 && i.getSelectedNodeView() === this && i.nodeClicked(this), null !== this._myConnector && this._myConnector.setVisible(t), this._myIconViews.forEach(function(e) {
                e.setVisible(t)
            }), this._myText.setVisible(t), null !== this._myLinkIconView && this._myLinkIconView.setVisible(t), this._myBubble.setVisible(t), null !== this._myFoldingIcon && this._myFoldingIcon.setVisible(t), null !== this._myCloud && this._myCloud.setVisible(t), e && this._myNodeModel.getChildren().forEach(function(e) {
                t ? e.getView().setVisible(!0, !0) : e.hasView() && e.getView().setVisible(!1, !0)
            }))
        }, o.prototype.update = function() {
            this._myText.update(), this._myBubble.update(this._getBubbleContentsWidth(), this._getBubbleContentsHeight()), null !== this._myNodeModel.getLink() && null === this._myLinkIconView && (this._myLinkIconView = new p.LinkIconView(this, this._myNodeModel)), null === this._myNodeModel.getLink() && null !== this._myLinkIconView && (this._myLinkIconView.deleteSvg(), this._myLinkIconView = null), this._myNodeModel.hasCloud() && null === this._myCloud && (this._myCloud = new s.CloudView(this._myNodeModel.getCloudModel())), this._myNodeModel.hasCloud() !== !0 && null !== this._myCloud && (this._myCloud.deleteSvg(), this._myCloud = null), this._isRoot !== !0 && (this._myNodeModel.getChildren().length > 0 && null === this._myFoldingIcon && (this._myFoldingIcon = new l.FoldingIconView(this, this._myNodeModel)), 0 === this._myNodeModel.getChildren().length && null !== this._myFoldingIcon && (this._myFoldingIcon.deleteSvg(), this._myFoldingIcon = null), null !== this._myFoldingIcon && this._myFoldingIcon.update())
        }
    }, {
        "./BubbleView": 5,
        "./CloudView": 7,
        "./ConnectorView": 8,
        "./FoldingIconView": 14,
        "./GraphicalLinkView": 16,
        "./IconView": 18,
        "./LinkIconView": 20,
        "./NodeModel": 26,
        "./RichTextView": 30,
        "./TextView": 34
    }],
    28: [function(t, e, i) {
        "use strict";

        function o(t, e) {
            var i = this,
                s = void 0,
                d = void 0,
                p = void 0,
                h = void 0;
            h = t[e].name.replace(new RegExp("&", "g"), "&amp;"), h = h.replace(new RegExp("<", "g"), "&lt;"), h = h.replace(new RegExp(">", "g"), "&gt;"), h = h.replace(new RegExp('"', "g"), "&quot;"), h = h.replace(new RegExp("'", "g"), "&apos;"), d = "<div id='" + o.DIALOG_ID + "' class='popup' " + ("style='height: " + l.Sizer.popupHeight + "px'>") + "<p style='text-align: center; font-weight: bold'>Saved Maps</p>", t.forEach(function(t, i) {
                i !== e && (d += "<p>" + t.name + "</p>")
            }), d += "<p>Old name: " + h + "</p>", d += "<p>New name: <input type='text' id='" + (o.INPUT_FIELD_ID + "'") + ("size='30' value='" + h + "'/>"), d += "   <br><br><button id='" + o.OK_ID + "'>Ok</button>" + ("   <button id='" + o.CANCEL_ID + "'>Cancel</button>") + "</div>", s = new DOMParser, p = s.parseFromString(d, "text/html"), this._renameMapDialog = document.importNode(p.getElementById(o.DIALOG_ID), !0), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").appendChild(this._renameMapDialog), document.getElementById(o.OK_ID).addEventListener("click", function() {
                return i.renameMap(t, e)
            }), document.getElementById(o.CANCEL_ID).addEventListener("click", function() {
                return i.close()
            }), document.getElementById(o.INPUT_FIELD_ID).addEventListener("keypress", function(o) {
                return i.keyPress(o, t, e)
            }), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), r.m3App.getGlobalState().setState(a.State.STATE_DIALOG_RENAME_MAP), document.getElementById(o.INPUT_FIELD_ID).select(), document.getElementById(o.INPUT_FIELD_ID).focus()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.RenameMapDialog = o;
        var n = t("./App"),
            s = t("./ErrorDialog"),
            r = t("./main"),
            l = t("./Sizer"),
            a = t("./State");
        o.DIALOG_ID = n.App.HTML_ID_PREFIX + "-renameMapDialog", o.CANCEL_ID = o.DIALOG_ID + "Cancel", o.OK_ID = o.DIALOG_ID + "Ok", o.INPUT_FIELD_ID = o.DIALOG_ID + "InputField", o.MAP_LIST_PREFIX = o.DIALOG_ID, o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(n.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._renameMapDialog), r.m3App.getGlobalState().setState(a.State.STATE_IDLE)
        }, o.prototype.keyPress = function(t, e, i) {
            13 === t.keyCode && this.renameMap(e, i)
        }, o.prototype.renameMap = function(t, e) {
            var i = this,
                l = void 0,
                a = void 0;
            a = document.getElementById(o.INPUT_FIELD_ID).value, a !== t[e].name && (r.m3App.getController().getMapModel().getDbKey() === t[e].key && r.m3App.getController().getMapModel().setMapName(a), l = {
                key: t[e].key,
                name: a
            }, t.splice(e, 1, l), n.App.myDB.setItem(n.App.KEY_MAPLIST, t).then(function() {
                i.close()
            }).catch(function(i) {
                new s.ErrorDialog("Error trying to rename map from " + (t[e].name + " to " + a + ": " + i))
            }))
        }
    }, {
        "./App": 2,
        "./ErrorDialog": 12,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    29: [function(t, e, i) {
        "use strict";

        function o() {
            this._content = null, this._type = null, this._unexpectedAttributes = new Map, this._unexpectedTags = []
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.RichContent = o;
        var s = t("./Diagnostics"),
            r = t("./xmlHelpers"),
            l = t("./main"),
            a = new Map([
                ["TYPE", ""]
            ]),
            d = ["html"];
        o.prototype.getAsXml = function() {
            var t = new Map,
                e = void 0,
                i = void 0,
                o = [];
            return t.set("TYPE", this._type), e = {}, e._content = this._content, e.getAsXml = function() {
                return [this._content]
            }, i = [e], o = (0, r.createXml)("richcontent", a, t, this._unexpectedAttributes, i, this._unexpectedTags)
        }, o.prototype.getContent = function() {
            return this._content
        }, o.prototype.getType = function() {
            return this._type
        }, o.prototype.loadFromXml1_0_1 = function(t) {
            var e = void 0,
                i = void 0,
                o = void 0,
                p = void 0,
                h = void 0,
                c = void 0,
                u = void 0,
                _ = void 0,
                g = void 0;
            c = new XMLSerializer;
            var m = (0, r.loadXml)(t, a, d),
                v = n(m, 4);
            for (o = v[0], _ = v[1], p = v[2], g = v[3], this._type = o.get("TYPE"), this._unexpectedAttributes = _, this._unexpectedTags = g, h = p.length, e = 0; e < h; e++) i = p[e], u = i.tagName, "html" === u && (this._content = c.serializeToString(i));
            null === this._content && l.m3App.getDiagnostics().warn(s.Diagnostics.TASK_IMPORT_XML, "No content in <richcontent>"), l.m3App.getDiagnostics().log(s.Diagnostics.TASK_IMPORT_XML, "Created richcontent.")
        }, o.prototype.setContent = function(t) {
            this._content = t
        }, o.prototype.setType = function(t) {
            this._type = t
        }
    }, {
        "./Diagnostics": 10,
        "./main": 35,
        "./xmlHelpers": 37
    }],
    30: [function(t, e, i) {
        "use strict";

        function o(t, e) {
            var i = "http://www.w3.org/2000/svg";
            this._myNodeModel = e, this._myNodeView = t, this._isVisible = !0, this._container = document.createElementNS(i, "foreignObject"), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").appendChild(this._container), this._boundClickListener = this._clickListener.bind(this), this._container.addEventListener("click", this._boundClickListener), this.update()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.RichTextView = o;
        var n = t("./App"),
            s = t("./main"),
            r = t("./Sizer"),
            l = 400;
        o.prototype._clickListener = function() {
            s.m3App.getController().getMapViewController().nodeClicked(this._myNodeView)
        }, o.prototype.deleteSvg = function() {
            this._container.removeEventListener("click", this._boundClickListener), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").removeChild(this._container)
        }, o.prototype.getHeight = function() {
            return this._height
        }, o.prototype.getWidth = function() {
            return this._width
        }, o.prototype.setPosition = function(t, e) {
            this._container.setAttribute("x", t), this._container.setAttribute("y", e - this._height / 2)
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._container.setAttribute("display", "visible") : this._container.setAttribute("display", "none"))
        }, o.prototype.update = function() {
            for (var t = void 0, e = void 0, i = void 0, o = void 0, n = void 0, s = void 0, a = void 0, d = void 0; this._container.childNodes.length > 0;) this._container.removeChild(this._container.childNodes[0]);
            for (t = new DOMParser, o = t.parseFromString(this._myNodeModel.getRichText(), "text/html"), n = document.importNode(o.documentElement, !0), this._container.appendChild(n), this._container.setAttribute("height", 1e4), a = 10, d = Math.min(l, .8 * r.Sizer.svgWidth), this._container.setAttribute("width", d), i = n.clientHeight; d - a > 10;) s = Math.floor((d - a) / 2) + a, this._container.setAttribute("width", s), n.clientHeight === i ? d = s : a = s;
            e = d < n.scrollWidth ? n.scrollWidth : d, this._container.setAttribute("width", e), this._container.setAttribute("height", n.clientHeight + r.Sizer.characterHeight), this._width = e, this._height = n.clientHeight + r.Sizer.characterHeight
        }
    }, {
        "./App": 2,
        "./Sizer": 32,
        "./main": 35
    }],
    31: [function(t, e, i) {
        "use strict";

        function o() {
            var t = this,
                e = void 0,
                i = void 0,
                s = void 0;
            i = "<div id='" + o.DIALOG_ID + "' class='popup' style='height: " + (l.Sizer.popupHeight + "px'>") + "<p style='text-align: center; font-weight: bold'>Save Map</p>", n.App.myDB.getItem(n.App.KEY_MAPLIST).then(function(l) {
                l.forEach(function(t) {
                    i += "<p>" + t.name + "</p>"
                }), i += "<input type='text' id='" + o.INPUT_FIELD_ID + "'size='20' value='" + (r.m3App.getController().getMapModel().getMapName() + "'/>"), i += "   <br><br><button id='" + o.SAVE_ID + "'>Save</button>" + ("   <button id='" + o.CANCEL_ID + "'>Cancel</button>") + "</div>", e = new DOMParser, s = e.parseFromString(i, "text/html"), t._saveDialog = document.importNode(s.getElementById(o.DIALOG_ID), !0), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").appendChild(t._saveDialog), document.getElementById(o.SAVE_ID).addEventListener("click", function() {
                    return t.saveMap()
                }), document.getElementById(o.CANCEL_ID).addEventListener("click", function() {
                    return t.close()
                }), document.getElementById(o.INPUT_FIELD_ID).addEventListener("keypress", function(e) {
                    return t.keyPress(e)
                }), document.getElementById(n.App.HTML_ID_PREFIX + "-popups").removeAttribute("hidden"), r.m3App.getGlobalState().setState(a.State.STATE_DIALOG_SAVE), document.getElementById(o.INPUT_FIELD_ID).select(), document.getElementById(o.INPUT_FIELD_ID).focus()
            })
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.SaveDialog = o;
        var n = t("./App"),
            s = t("./ErrorDialog"),
            r = t("./main"),
            l = t("./Sizer"),
            a = t("./State");
        o.DIALOG_ID = "m3-saveDialog", o.CANCEL_ID = o.DIALOG_ID + "Cancel", o.SAVE_ID = o.DIALOG_ID + "Save", o.INPUT_FIELD_ID = o.DIALOG_ID + "InputField", o.prototype.close = function() {
            var t = void 0;
            t = document.getElementById(n.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("hidden", "true"), t.removeChild(this._saveDialog), r.m3App.getGlobalState().setState(a.State.STATE_IDLE)
        }, o.prototype.keyPress = function(t) {
            13 === t.keyCode && this.saveMap()
        }, o.prototype.saveMap = function() {
            var t = this,
                e = void 0,
                i = void 0;
            i = document.getElementById(o.INPUT_FIELD_ID).value, r.m3App.getController().getMapModel().setMapName(i), e = r.m3App.getController().getMapModel().getDbKey(), null === e && (e = "map-" + Date.now()), n.App.myDB.setItem(e, r.m3App.getController().getMapModel().getAsXml()).then(function() {
                return r.m3App.getController().getMapModel().setModifiedStatus(!1), n.App.myDB.getItem(n.App.KEY_MAPLIST)
            }).then(function(t) {
                return null === r.m3App.getController().getMapModel().getDbKey() && (r.m3App.getController().getMapModel().setDbKey(e), t.push({
                    key: e,
                    name: i
                })), n.App.myDB.setItem(n.App.KEY_MAPLIST, t)
            }).then(function() {
                t.close()
            }).catch(function(t) {
                new s.ErrorDialog("Error saving map: " + t)
            })
        }
    }, {
        "./App": 2,
        "./ErrorDialog": 12,
        "./Sizer": 32,
        "./State": 33,
        "./main": 35
    }],
    32: [function(t, e, i) {
        "use strict";

        function o() {
            var t = void 0,
                e = void 0,
                i = void 0;
            t = document.getElementById(n.App.HTML_ID_PREFIX + "-app"), e = document.getElementById(n.App.HTML_ID_PREFIX + "-drawing-area"), i = document.getElementById(n.App.HTML_ID_PREFIX + "-svg-element"), t.style.marginTop = o._MARGINS.appMarginTop + "px", t.style.marginBottom = o._MARGINS.appMarginBottom + "px", t.style.marginLeft = o._MARGINS.appMarginLeft + "px", t.style.marginRight = o._MARGINS.appMarginRight + "px", e.setAttribute("style", "border: " + o._DRAWING_AREA_BORDER_WIDTH + "px solid black; " + ("margin-top: " + o._MARGINS.drawingAreaTop + "px; ") + ("margin-bottom: " + o._MARGINS.drawingAreaBottom + "px; ") + ("margin-left: " + o._MARGINS.drawingAreaLeft + "px; ") + ("margin-right: " + o._MARGINS.drawingAreaRight + "px;")), o._SIDE_ICONS_WIDTH = s.m3App.showButtons() && !s.m3App.isReadOnly() ? 40 : 0, o._BOTTOM_ICONS_HEIGHT = s.m3App.showButtons() || s.m3App.getLoadableMaps().length > 0 ? 48 : 8, window.addEventListener("resize", o.setSize), o.setSize()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.Sizer = o;
        var n = t("./App"),
            s = t("./main");
        o._MARGINS = {
            appMarginTop: 1,
            appMarginBottom: 1,
            appMarginLeft: 1,
            appMarginRight: 1,
            drawingAreaTop: 1,
            drawingAreaBottom: 4,
            drawingAreaLeft: 0,
            drawingAreaRight: 0
        }, o._DRAWING_AREA_BORDER_WIDTH = 1, o.setSize = function() {
            var t = void 0,
                e = void 0,
                i = void 0,
                r = void 0,
                l = void 0,
                a = void 0,
                d = void 0,
                p = void 0,
                h = void 0,
                c = void 0,
                u = void 0;
            r = document.getElementById(n.App.HTML_ID_PREFIX + "-container"), s.m3App.isFullPage() ? (r.style.height = window.innerHeight + "px", i = document.getElementsByTagName("body")[0], i.style.overflow = "hidden", i.style.margin = "4px") : (l = s.m3App.getHeight(), "%" === l[l.length - 1] ? r.style.height = window.innerHeight * l.slice(0, -1) / 100 + "px" : r.style.height = l, r.style.width = s.m3App.getWidth()), c = r.clientHeight - o._MARGINS.appMarginTop - o._MARGINS.appMarginBottom, u = r.clientWidth, e = s.m3App.showMapName() ? document.getElementById(n.App.HTML_ID_PREFIX + "-top").clientHeight : 0, a = document.getElementById(n.App.HTML_ID_PREFIX + "-svg-element"), d = c - e - 2 * o._DRAWING_AREA_BORDER_WIDTH - o._MARGINS.drawingAreaTop - o._MARGINS.drawingAreaBottom - o._BOTTOM_ICONS_HEIGHT, p = u - 2 * o._DRAWING_AREA_BORDER_WIDTH - o._SIDE_ICONS_WIDTH, a.setAttribute("height", d + "px"), a.setAttribute("width", p + "px"), o.svgHeight = d, o.svgWidth = p, document.getElementById(n.App.HTML_ID_PREFIX + "-left").style.width = u - o._SIDE_ICONS_WIDTH + "px", document.getElementById(n.App.HTML_ID_PREFIX + "-right").style.marginTop = e + o.svgHeight - 186 + "px", o.popupHeight = c / 3, t = document.getElementById(n.App.HTML_ID_PREFIX + "-popups"), t.setAttribute("style", "width: " + 3 * p / 4 + "px;margin-left: " + 1 * p / 4 / 2 + "px;"), h = document.createElement("span"), h.appendChild(document.createTextNode("X")), document.getElementById(n.App.HTML_ID_PREFIX + "-html-sizing").appendChild(h), o.characterWidth = h.offsetWidth, o.characterHeight = h.offsetHeight, document.getElementById(n.App.HTML_ID_PREFIX + "-html-sizing").removeChild(h)
        }
    }, {
        "./App": 2,
        "./main": 35
    }],
    33: [function(t, e, i) {
        "use strict";

        function o() {
            this._state = o.STATE_IDLE
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.State = o, o.STATE_IDLE = "Idle", o.STATE_DIALOG_ABOUT = "About Dialog", o.STATE_DIALOG_EDIT_NODE = "Edit Node Dialog", o.STATE_DIALOG_ERROR = "Error Dialog", o.STATE_DIALOG_IMPORT_EXPORT = "Import Export Dialog", o.STATE_DIALOG_LOAD = "Load Dialog", o.STATE_DIALOG_MANAGE_SAVED_MAPS = "Manage Saved Maps Dialog", o.STATE_DIALOG_RENAME_MAP = "Rename Map Dialog", o.STATE_DIALOG_SAVE = "Save Dialog", o.STATE_EXPORT_POPUP = "Export Popup", o.prototype.getState = function() {
            return this._state
        }, o.prototype.setState = function(t) {
            this._state = t
        }
    }, {}],
    34: [function(t, e, i) {
        "use strict";

        function o(t, e) {
            this._myNodeModel = e, this._myNodeView = t, this._characterHeight = 0, this._x = 0, this._isVisible = !0, this._svgText = document.createElementNS(a, "text"), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").appendChild(this._svgText), this._boundClickListener = this._clickListener.bind(this), this._svgText.addEventListener("click", this._boundClickListener), this.update()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.TextView = o;
        var n = t("./App"),
            s = t("./main"),
            r = t("./Sizer"),
            l = 400,
            a = "http://www.w3.org/2000/svg";
        o.prototype._clickListener = function() {
            s.m3App.getController().getMapViewController().nodeClicked(this._myNodeView)
        }, o.prototype.deleteSvg = function() {
            this._svgText.removeEventListener("click", this._boundClickListener), document.getElementById(n.App.HTML_ID_PREFIX + "-svgTextLayer").removeChild(this._svgText)
        }, o.prototype.getHeight = function() {
            return this._svgText.getElementsByTagNameNS(a, "tspan").length * this._characterHeight
        }, o.prototype.getWidth = function() {
            return this._svgText.getBBox().width
        }, o.prototype.setPosition = function(t, e) {
            var i = void 0,
                o = void 0,
                n = void 0;
            for (n = this._svgText.getElementsByTagNameNS(a, "tspan"), o = e + this.getHeight() / 2 - (n.length - 1) * this._characterHeight, i = 0; i < n.length; i++) n[i].setAttribute("x", t), n[i].setAttribute("y", o + this._characterHeight * i);
            this._x = t
        }, o.prototype.setVisible = function(t) {
            this._isVisible !== t && (this._isVisible = t, t ? this._svgText.setAttribute("display", "visible") : this._svgText.setAttribute("display", "none"))
        }, o.prototype.update = function() {
            var t = this,
                e = "",
                i = void 0,
                o = void 0,
                n = void 0,
                s = void 0,
                r = void 0;
            for (i = "verdana", o = "12", n = "", s = "", r = this._myNodeModel.getFont(), r && (r.isBold() && (s = "bold"), r.isItalic() && (n = "italic"), o = r.getSize()), this._svgText.setAttribute("font-family", i), this._svgText.setAttribute("font-size", o), "" !== n && this._svgText.setAttribute("font-style", n), "" !== s && this._svgText.setAttribute("font-weight", s), this._svgText.setAttribute("fill", this._myNodeModel.getTextColor()); this._svgText.childNodes.length > 0;) this._svgText.removeChild(this._svgText.childNodes[0]);
            e = "family:" + i + ";" + ("fontSize:" + o + ";") + ("fontStyle:" + n + ";") + ("fontWeight:" + s + ";"), this._characterHeight = this._getCharacterHeight(e), this._myNodeModel.getText().forEach(function(e) {
                t._addTspans(e)
            })
        }, o.prototype._addTspans = function(t) {
            var e = Math.min(l, .8 * r.Sizer.svgWidth),
                i = void 0,
                o = void 0,
                n = void 0,
                s = void 0,
                d = void 0,
                p = void 0;
            if (t = t.replace(/\s*$/, ""), n = document.createElementNS(a, "tspan"), n.appendChild(document.createTextNode(t)), n.setAttribute("x", this._x), this._svgText.appendChild(n), p = this._svgText.getBBox().width, !(p <= e)) {
                for (i = 1, o = t.length - 1, d = Math.floor((o - i) / 2) + i, n.childNodes[0].textContent = t.substr(0, d), p = this._svgText.getBBox().width; o - i > 1;) p === e ? (i = d, o = d + 1) : p < e ? i = d + 1 : o = d - 1, d = Math.floor((o - i) / 2) + i, n.childNodes[0].textContent = t.substr(0, d), p = this._svgText.getBBox().width;
                if (p > e && i > 1 && i--, s = i, " " !== t[i])
                    for (;
                        " " !== t[i - 1] && i > 1;) i--;
                1 === i && (i = s), n.childNodes[0].textContent = t.substr(0, i).replace(/\s*$/, ""), this._addTspans(t.substr(i).trim())
            }
        }, o.prototype._getCharacterHeight = function(t) {
            var e = void 0,
                i = void 0;
            return o._fontSizesCache || (o._fontSizesCache = new Map), e = o._fontSizesCache.get(t), e || (i = document.createElementNS(a, "tspan"), i.appendChild(document.createTextNode("X")), this._svgText.appendChild(i), e = this._svgText.getBBox().height, this._svgText.removeChild(i), o._fontSizesCache.set(t, e)), e
        }
    }, {
        "./App": 2,
        "./Sizer": 32,
        "./main": 35
    }],
    35: [function(t, e, i) {
        "use strict";

        function o() {
            n(), i.m3App = r = new s.App, r.run()
        }

        function n() {
            var t = void 0,
                e = void 0,
                i = void 0,
                o = "<div id='" + s.App.HTML_ID_PREFIX + "-app'>" + ("   <div id='" + s.App.HTML_ID_PREFIX + "-left' style='float: left;'> ") + ("      <div id='" + s.App.HTML_ID_PREFIX + "-top'> ") + ("         <span id='" + s.App.HTML_ID_PREFIX + "-mapName'></span>") + "         <img " + ("            id='" + s.App.HTML_ID_PREFIX + "-modified' ") + "            style='margin-bottom: 3px;'             height='5px' " + ("            src='" + s.App.m3Path + "/images/modified.svg'") + "         />      </div>" + ("      <div id='" + s.App.HTML_ID_PREFIX + "-popups' hidden>") + "      </div>      <div " + ("         id='" + s.App.HTML_ID_PREFIX + "-html-sizing' ") + "         style='word-wrap:break-word;'      >      </div>" + ("      <div id='" + s.App.HTML_ID_PREFIX + "-drawing-area'>") + "         <svg             xmlns='http://www.w3.org/2000/svg' " + ("            id='" + s.App.HTML_ID_PREFIX + "-svg-element'") + "         >            <defs>" + ("               <marker id='" + s.App.HTML_ID_PREFIX + "-triangle-solid'") + "                       viewBox='-2 -2 20 20'                       refX='1' refY='5'                       markerWidth='20'                       markerHeight='20'                       orient='auto'                       stroke='#000000'                       stroke-width='2'               >                   <path d='M 0 0 L 16 5 L 0 10 z' />              </marker>" + ("               <marker id='" + s.App.HTML_ID_PREFIX + "-triangle-open'") + "                       viewBox='-2 -2 20 20'                       refX='1' refY='5'                       markerWidth='20'                       markerHeight='20'                       orient='auto'                       stroke='#000000'                       stroke-width='2'                       fill='#fff'               >                   <path d='M 0 0 L 16 5 L 0 10 z' />              </marker>            </defs>" + ("            <g id='" + s.App.HTML_ID_PREFIX + "-svg-g-element'>") + ("               <g id='" + s.App.HTML_ID_PREFIX + "-svgCloudLayer'> </g>") + ("               <g id='" + s.App.HTML_ID_PREFIX + "-svgLinksLayer'> </g>") + ("               <g id='" + s.App.HTML_ID_PREFIX + "-svgBubbleLayer'> </g>") + ("               <g id='" + s.App.HTML_ID_PREFIX + "-svgTextLayer'> </g>") + "            </g>         </svg>      </div>   </div>" + ("   <div id='" + s.App.HTML_ID_PREFIX + "-right' style='float: right;'> ") + "   </div></div>";
            i = new DOMParser, e = i.parseFromString(o, "text/html"), t = document.importNode(e.getElementById(s.App.HTML_ID_PREFIX + "-app"), !0), document.getElementById(s.App.HTML_ID_PREFIX + "-container").appendChild(t)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.m3App = void 0, i.main = o;
        var s = t("./App"),
            r = i.m3App = void 0
    }, {
        "./App": 2
    }],
    36: [function(t, e, i) {
        "use strict";
        var o = t("./App"),
            n = t("./main");
        o.App.setM3Path(), document.addEventListener("DOMContentLoaded", n.main)
    }, {
        "./App": 2,
        "./main": 35
    }],
    37: [function(t, e, i) {
        "use strict";

        function o(t, e, i, o, n, r) {
            var l = void 0,
                a = void 0;
            return a = [], l = s(e, i, o), a.push("<" + t + " " + l + ">"), "map" === t && r.length > 0 ? (r.forEach(function(t) {
                a.push(t)
            }), n.forEach(function(t) {
                a = a.concat(t.getAsXml())
            })) : (n.forEach(function(t) {
                a = a.concat(t.getAsXml())
            }), r.forEach(function(t) {
                a.push(t)
            })), a.push("</" + t + ">"), a
        }

        function n(t, e, i) {
            var o = void 0,
                n = void 0,
                s = void 0,
                d = void 0,
                p = r(t.tagName, t.attributes, e),
                h = a(p, 2);
            o = h[0], s = h[1];
            var c = l(t.tagName, t.childNodes, i),
                u = a(c, 2);
            return n = u[0], d = u[1], [o, s, n, d]
        }

        function s(t, e, i) {
            var o = "",
                n = !0;
            return e.forEach(function(e, i) {
                e !== t.get(i) && (n ? (o = i + '="' + e + '"', n = !1) : o += " " + i + '="' + e + '"')
            }), i.forEach(function(t, e) {
                n ? (o = e + '="' + t + '"', n = !1) : o += " " + e + '="' + t + '"'
            }), o
        }

        function r(t, e, i) {
            var o = void 0,
                n = void 0,
                s = void 0,
                r = void 0,
                l = void 0;
            for (s = new Map, l = new Map, i.forEach(function(t, e) {
                    s.set(e, t)
                }), r = e.length, n = 0; n < r; n++) o = e[n], s.has(o.name) ? s.set(o.name, o.value) : (l.set(o.name, o.value), p.m3App.getDiagnostics().warn(d.Diagnostics.TASK_IMPORT_XML, "<" + t + ">: Unexpected attribute: " + (o.name + '="' + o.value + '"')));
            return [s, l]
        }

        function l(t, e, i) {
            var o = void 0,
                n = void 0,
                s = void 0,
                r = void 0,
                l = void 0,
                a = void 0,
                h = void 0;
            for (n = [], a = [], l = new XMLSerializer, s = e.length, o = 0; o < s; o++) h = e[o], 1 === h.nodeType && (i.indexOf(h.tagName) >= 0 ? n.push(h) : (r = l.serializeToString(h), a.push(r), p.m3App.getDiagnostics().warn(d.Diagnostics.TASK_IMPORT_XML, "<" + t + ">: Unexpected embedded tag: " + r)));
            return [n, a]
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = function() {
            function t(t, e) {
                var i = [],
                    o = !0,
                    n = !1,
                    s = void 0;
                try {
                    for (var r, l = t[Symbol.iterator](); !(o = (r = l.next()).done) && (i.push(r.value), !e || i.length !== e); o = !0);
                } catch (t) {
                    n = !0, s = t
                } finally {
                    try {
                        !o && l.return && l.return()
                    } finally {
                        if (n) throw s
                    }
                }
                return i
            }
            return function(e, i) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        i.createXml = o, i.loadXml = n;
        var d = t("./Diagnostics"),
            p = t("./main")
    }, {
        "./Diagnostics": 10,
        "./main": 35
    }]
}, {}, [35, 36]);
//# sourceMappingURL=m3.js.map