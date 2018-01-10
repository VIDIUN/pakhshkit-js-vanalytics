!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("playkit-js")):"function"==typeof define&&define.amd?define(["playkit-js"],t):"object"==typeof exports?exports.kanalytics=t(require("playkit-js")):(e.playkit=e.playkit||{},e.playkit.kanalytics=t(e.Playkit))}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(t,n){t.exports=e},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NAME=t.VERSION=void 0;var r=n(0),o=n(2),i=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default=i.default,t.VERSION="0.8.0",t.NAME="playkit-js-kanalytics";(0,r.registerPlugin)("kanalytics",i.default)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),l=n(3),c=n(4),f=r(c),d=n(5),p=r(d),y=function(e){function t(e,n,r){o(this,t);var a=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r));return a._lastSeekEvent=0,a._hasSeeked=!1,a._ended=!1,a._ks="",a._timePercentEvent={},a._widgetLoadedEventSent=!1,a._registerListeners(),a}return a(t,e),s(t,null,[{key:"isValid",value:function(){return!0}}]),s(t,[{key:"reset",value:function(){this._hasSeeked=!1,this._ended=!1,this._ks="",this._timePercentEvent={}}},{key:"destroy",value:function(){this.eventManager.destroy()}},{key:"_registerListeners",value:function(){var e=this.player.Event;this.eventManager.listen(this.player,e.SOURCE_SELECTED,this._onSourceSelected.bind(this)),this.eventManager.listen(this.player,e.FIRST_PLAY,this._sendAnalytics.bind(this,f.default.PLAY)),this.eventManager.listen(this.player,e.PLAY,this._onPlay.bind(this)),this.eventManager.listen(this.player,e.ENDED,this._onEnded.bind(this)),this.eventManager.listen(this.player,e.SEEKED,this._sendSeekAnalytic.bind(this)),this.eventManager.listen(this.player,e.TIME_UPDATE,this._sendTimePercentAnalytic.bind(this)),this.eventManager.listen(this.player,e.PLAYER_STATE_CHANGED,this._onPlayerStateChanged.bind(this))}},{key:"_onSourceSelected",value:function(){var e=this;this.player.ready().then(function(){e._widgetLoadedEventSent||(e._sendAnalytics(f.default.WIDGET_LOADED),e._widgetLoadedEventSent=!0),e._sendAnalytics(f.default.MEDIA_LOADED)})}},{key:"_onPlay",value:function(){this._ended&&(this._ended=!1,this._sendAnalytics(f.default.REPLAY))}},{key:"_onEnded",value:function(){this._ended=!0}},{key:"_onPlayerStateChanged",value:function(e){e.payload.newState.type===this.player.State.BUFFERING&&this._sendAnalytics(f.default.BUFFER_START),e.payload.oldState.type===this.player.State.BUFFERING&&this._sendAnalytics(f.default.BUFFER_END)}},{key:"_sendSeekAnalytic",value:function(){var e=(new Date).getTime();this._lastSeekEvent+2e3<e&&("Live"!==this.player.config.type||this.player.config.dvr)&&(this._sendAnalytics(f.default.SEEK),this._hasSeeked=!0),this._lastSeekEvent=e}},{key:"_sendTimePercentAnalytic",value:function(){if("Live"!==this.player.config.type){var e=this.player.currentTime/this.player.duration;!this._timePercentEvent.PLAY_REACHED_25&&e>=.25&&(this._timePercentEvent.PLAY_REACHED_25=!0,this._sendAnalytics(f.default.PLAY_REACHED_25)),!this._timePercentEvent.PLAY_REACHED_50&&e>=.5&&(this._timePercentEvent.PLAY_REACHED_50=!0,this._sendAnalytics(f.default.PLAY_REACHED_50)),!this._timePercentEvent.PLAY_REACHED_75&&e>=.75&&(this._timePercentEvent.PLAY_REACHED_75=!0,this._sendAnalytics(f.default.PLAY_REACHED_75)),!this._timePercentEvent.PLAY_REACHED_100&&e>=.98&&(this._timePercentEvent.PLAY_REACHED_100=!0,this._sendAnalytics(f.default.PLAY_REACHED_100))}}},{key:"_sendAnalytics",value:function(e){var t=this,n=new p.default(e);n.currentPoint=this.player.currentTime,n.duration=this.player.duration,n.seek=this._hasSeeked,n.hasKanalony=this.config.hasKanalony,Object.assign(n,this._playerParams),l.OVPStatsService.collect(this.config.serviceUrl,this._ks,this.config.playerVersion,{event:n}).doHttpRequest().then(function(){t.logger.debug("Analytics event sent ",n)},function(e){t.logger.error("Failed to send analytics event ",n,e)})}},{key:"_playerParams",get:function(){return this._ks=this.config.ks,{clientVer:this.config.playerVersion,entryId:this.config.entryId,sessionId:this.config.sessionId,uiConfId:this.config.uiConfId||0,partnerId:this.config.partnerId,widgetId:this.config.partnerId?"_"+this.config.partnerId:"",referrer:document.referrer||document.URL}}}]),t}(u.BasePlugin);y.defaultConfig={serviceUrl:"//stats.kaltura.com/api_v3/index.php",hasKanalony:!1},t.default=y},function(e,t,n){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=58)}({0:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Map;r(this,e),this.headers=t}return i(e,[{key:"getUrl",value:function(e){return e+"/service/"+this.service+(this.action?"/action/"+this.action:"")}},{key:"doHttpRequest",value:function(){var e=this;if(!this.url)throw new Error("serviceUrl is mandatory for request builder");var t=new XMLHttpRequest;return new Promise(function(n,r){t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){var e=JSON.parse(t.responseText);e&&"object"===(void 0===e?"undefined":o(e))&&e.code&&e.message?r(e):n(e)}else r(t.responseText)},t.open(e.method,e.url),e.headers.forEach(function(e,n){t.setRequestHeader(n,e)}),t.send(e.params)})}}]),e}();t.default=a},1:function(e,t,n){"use strict";function r(e){return e?s.get(e):s}function o(e){return r(e).getLevel()}function i(e,t){r(t).setLevel(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogLevel=t.getLogLevel=t.LogLevel=void 0;var a=n(12),s=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a),u={DEBUG:s.DEBUG,INFO:s.INFO,TIME:s.TIME,WARN:s.WARN,ERROR:s.ERROR,OFF:s.OFF};s.useDefaults({defaultLevel:s.ERROR}),t.default=r,t.LogLevel=u,t.getLogLevel=o,t.setLogLevel=i},11:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function e(t){var n=void 0;return Array.isArray(t)?(n=t.length>0?t.slice(0):[],n.forEach(function(t,o){("object"===(void 0===t?"undefined":r(t))&&t!=={}||Array.isArray(t)&&t.length>0)&&(n[o]=e(t))})):"object"===(void 0===t?"undefined":r(t))?(n=Object.assign({},t),Object.keys(n).forEach(function(t){("object"===r(n[t])&&n[t]!=={}||Array.isArray(n[t])&&n[t].length>0)&&(n[t]=e(n[t]))})):n=t,n};t.clone=o},12:function(e,t,n){var r,o;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
!function(i){"use strict";var a={};a.VERSION="1.4.1";var s,u={},l=function(e,t){return function(){return t.apply(e,arguments)}},c=function(){var e,t,n=arguments,r=n[0];for(t=1;t<n.length;t++)for(e in n[t])e in r||!n[t].hasOwnProperty(e)||(r[e]=n[t][e]);return r},f=function(e,t){return{value:e,name:t}};a.DEBUG=f(1,"DEBUG"),a.INFO=f(2,"INFO"),a.TIME=f(3,"TIME"),a.WARN=f(4,"WARN"),a.ERROR=f(8,"ERROR"),a.OFF=f(99,"OFF");var d=function(e){this.context=e,this.setLevel(e.filterLevel),this.log=this.info};d.prototype={setLevel:function(e){e&&"value"in e&&(this.context.filterLevel=e)},getLevel:function(){return this.context.filterLevel},enabledFor:function(e){var t=this.context.filterLevel;return e.value>=t.value},debug:function(){this.invoke(a.DEBUG,arguments)},info:function(){this.invoke(a.INFO,arguments)},warn:function(){this.invoke(a.WARN,arguments)},error:function(){this.invoke(a.ERROR,arguments)},time:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"start"])},timeEnd:function(e){"string"==typeof e&&e.length>0&&this.invoke(a.TIME,[e,"end"])},invoke:function(e,t){s&&this.enabledFor(e)&&s(t,c({level:e},this.context))}};var p=new d({filterLevel:a.OFF});!function(){var e=a;e.enabledFor=l(p,p.enabledFor),e.debug=l(p,p.debug),e.time=l(p,p.time),e.timeEnd=l(p,p.timeEnd),e.info=l(p,p.info),e.warn=l(p,p.warn),e.error=l(p,p.error),e.log=e.info}(),a.setHandler=function(e){s=e},a.setLevel=function(e){p.setLevel(e);for(var t in u)u.hasOwnProperty(t)&&u[t].setLevel(e)},a.getLevel=function(){return p.getLevel()},a.get=function(e){return u[e]||(u[e]=new d(c({name:e},p.context)))},a.createDefaultHandler=function(e){e=e||{},e.formatter=e.formatter||function(e,t){t.name&&e.unshift("["+t.name+"]")};var t={},n=function(e,t){Function.prototype.apply.call(e,console,t)};return"undefined"==typeof console?function(){}:function(r,o){r=Array.prototype.slice.call(r);var i,s=console.log;o.level===a.TIME?(i=(o.name?"["+o.name+"] ":"")+r[0],"start"===r[1]?console.time?console.time(i):t[i]=(new Date).getTime():console.timeEnd?console.timeEnd(i):n(s,[i+": "+((new Date).getTime()-t[i])+"ms"])):(o.level===a.WARN&&console.warn?s=console.warn:o.level===a.ERROR&&console.error?s=console.error:o.level===a.INFO&&console.info?s=console.info:o.level===a.DEBUG&&console.debug&&(s=console.debug),e.formatter(r,o),n(s,r))}},a.useDefaults=function(e){a.setLevel(e&&e.defaultLevel||a.DEBUG),a.setHandler(a.createDefaultHandler(e))},r=a,void 0!==(o="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=o)}()},13:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(5),s=r(a),u=n(3),l=r(u),c=l.default.get(),f=function(){function e(){o(this,e)}return i(e,null,[{key:"getMultiRequest",value:function(e,t,n){var r=c.serviceParams;Object.assign(r,{ks:t,clientTag:"html5:v"+e}),n&&Object.assign(r,{partnerId:n});var o=new Map;o.set("Content-Type","application/json");var i=new s.default(o);return i.method="POST",i.service="multirequest",i.url=i.getUrl(c.serviceUrl),i.params=r,i}}]),e}();t.default=f},2:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function e(t){r(this,e),this.hasError=!1,"KalturaAPIException"===t.objectType?(this.hasError=!0,this.error=new i(t.code,t.message)):this.data=t};t.default=o;var i=function e(t,n){r(this,e),this.code=t,this.message=n}},3:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.OVPConfiguration=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(11),a={serviceUrl:"//www.kaltura.com/api_v3",cdnUrl:"//cdnapisec.kaltura.com",serviceParams:{apiVersion:"3.3.0",format:1}},s=function(){function e(){r(this,e)}return o(e,null,[{key:"set",value:function(e){e&&Object.assign(a,e)}},{key:"get",value:function(){return(0,i.clone)(a)}}]),e}();t.default=s,t.OVPConfiguration=s},37:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(13),l=r(u),c=n(0),f=r(c),d=n(3),p=r(d),y=n(59),v=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,null,[{key:"collect",value:function(e,t,n,r){var o=p.default.get(),i={};Object.assign(i,o.serviceParams,{ks:t,clientTag:"html5:v"+n},r);var a=new f.default;return a.service="stats",a.action="collect",a.method="GET",a.tag="stats-collect",a.params=i,a.url=e+"?service="+a.service+"&action="+a.action+"&"+(0,y.param)(a.params),a}}]),t}(l.default);t.default=v},5:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.MultiRequestResult=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),c=r(l),f=n(1),d=r(f),p=n(2),y=r(p),v=function(e){function t(){var e,n,r,o;i(this,t);for(var s=arguments.length,u=Array(s),l=0;l<s;l++)u[l]=arguments[l];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.requests=[],o=n,a(r,o)}return s(t,e),u(t,[{key:"add",value:function(e){this.requests.push(e);var t={},n={service:e.service,action:e.action};return Object.assign(t,o({},this.requests.length,Object.assign(n,e.params))),Object.assign(t,this.params),this.params=t,this}},{key:"execute",value:function(){var e=this;try{this.params=JSON.stringify(this.params)}catch(e){t._logger.error(""+e.message)}return new Promise(function(t,n){e.doHttpRequest().then(function(e){t(new h(e))},function(e){n("Error on multiRequest execution, error <"+e+">.")})})}}]),t}(c.default);v._logger=(0,d.default)("MultiRequestBuilder"),t.default=v;var h=t.MultiRequestResult=function e(t){var n=this;i(this,e),this.results=[],this.success=!0,(t.result?t.result:t).forEach(function(t){var r=new y.default(t);if(n.results.push(r),r.hasError)return e._logger.error("Service returned an error with error code: "+r.error.code+" and message: "+r.error.message+"."),void(n.success=!1)})};h._logger=(0,d.default)("MultiRequestResult")},58:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.VERSION=t.NAME=t.RequestBuilder=t.OVPConfiguration=t.OVPStatsService=void 0;var o=n(0),i=r(o),a=n(3),s=r(a),u=n(37),l=r(u);t.OVPStatsService=l.default,t.OVPConfiguration=s.default,t.RequestBuilder=i.default,t.NAME="playkit-js-providers-stats-service",t.VERSION="1.5.0"},59:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(e){var t=[],n=/\[\]$/,o=function(e){return"[object Array]"===Object.prototype.toString.call(e)},i=function(e,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,t[t.length]=encodeURIComponent(e)+"="+encodeURIComponent(n)};return function e(a,s){var u=void 0,l=void 0,c=void 0;if(a)if(o(s))for(u=0,l=s.length;u<l;u++)n.test(a)?i(a,s[u]):e(a+":"+("object"===r(s[u])?u:""),s[u]);else if(s&&"[object Object]"===String(s))for(c in s)e(a+":"+c,s[c]);else i(a,s);else if(o(s))for(u=0,l=s.length;u<l;u++)i(s[u].name,s[u].value);else for(c in s)e(c,s[c]);return t}("",e).join("&").replace(/%20/g,"+")};t.param=o}})})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={WIDGET_LOADED:1,MEDIA_LOADED:2,PLAY:3,PLAY_REACHED_25:4,PLAY_REACHED_50:5,PLAY_REACHED_75:6,PLAY_REACHED_100:7,OPEN_EDIT:8,OPEN_VIRAL:9,OPEN_DOWNLOAD:10,OPEN_REPORT:11,BUFFER_START:12,BUFFER_END:13,OPEN_FULL_SCREEN:14,CLOSE_FULL_SCREEN:15,REPLAY:16,SEEK:17,OPEN_UPLOAD:18,SAVE_PUBLISH:19,CLOSE_EDITOR:20,PRE_BUMPER_PLAYED:21,POST_BUMPER_PLAYED:22,BUMPER_CLICKED:23,PREROLL_STARTED:24,MIDROLL_STARTED:25,POSTROLL_STARTED:26,OVERLAY_STARTED:27,PREROLL_CLICKED:28,MIDROLL_CLICKED:29,POSTROLL_CLICKED:30,OVERLAY_CLICKED:31,PREROLL_25:32,PREROLL_50:33,PREROLL_75:34,MIDROLL_25:35,MIDROLL_50:36,MIDROLL_75:37,POSTROLL_25:38,POSTROLL_50:39,POSTROLL_75:40};t.default=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function e(t){r(this,e),this.eventType=t,this.isFirstInSession=!1,this.eventTimestamp=(new Date).getTime()};t.default=o}])});
//# sourceMappingURL=playkit-kanalytics.js.map