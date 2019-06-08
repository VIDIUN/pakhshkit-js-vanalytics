!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("pakhshkit-js")):"function"==typeof define&&define.amd?define(["pakhshkit-js"],t):"object"==typeof exports?exports.vanalytics=t(require("pakhshkit-js")):(e.pakhshkit=e.pakhshkit||{},e.pakhshkit.vanalytics=t(e.pakhshkit.core))}(this,function(e){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(t,n){t.exports=e},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NAME=t.VERSION=void 0;var r=n(0),i=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=o.default,t.VERSION="0.9.1",t.NAME="pakhshkit-js-vanalytics";(0,r.registerPlugin)("vanalytics",o.default)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=n(3),l=n(4),f=r(l),d=n(5),p=r(d),h=function(e){function t(e,n,r){i(this,t);var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n,r));return s._lastSeekEvent=0,s._hasSeeked=!1,s._ended=!1,s._vs="",s._timePercentEvent={},s._widgetLoadedEventSent=!1,s._registerListeners(),s}return s(t,e),a(t,null,[{key:"isValid",value:function(){return!0}}]),a(t,[{key:"reset",value:function(){this._hasSeeked=!1,this._ended=!1,this._vs="",this._timePercentEvent={}}},{key:"destroy",value:function(){this.eventManager.destroy()}},{key:"_registerListeners",value:function(){var e=this.player.Event;this.eventManager.listen(this.player,e.SOURCE_SELECTED,this._onSourceSelected.bind(this)),this.eventManager.listen(this.player,e.FIRST_PLAY,this._sendAnalytics.bind(this,f.default.PLAY)),this.eventManager.listen(this.player,e.PLAY,this._onPlay.bind(this)),this.eventManager.listen(this.player,e.ENDED,this._onEnded.bind(this)),this.eventManager.listen(this.player,e.SEEKED,this._sendSeekAnalytic.bind(this)),this.eventManager.listen(this.player,e.TIME_UPDATE,this._sendTimePercentAnalytic.bind(this)),this.eventManager.listen(this.player,e.PLAYER_STATE_CHANGED,this._onPlayerStateChanged.bind(this))}},{key:"_onSourceSelected",value:function(){var e=this;this._widgetLoadedEventSent||(this._sendAnalytics(f.default.WIDGET_LOADED),this._widgetLoadedEventSent=!0),this.player.ready().then(function(){e._sendAnalytics(f.default.MEDIA_LOADED)})}},{key:"_onPlay",value:function(){this._ended&&(this._ended=!1,this._sendAnalytics(f.default.REPLAY))}},{key:"_onEnded",value:function(){this._ended=!0}},{key:"_onPlayerStateChanged",value:function(e){e.payload.newState.type===this.player.State.BUFFERING&&this._sendAnalytics(f.default.BUFFER_START),e.payload.oldState.type===this.player.State.BUFFERING&&this._sendAnalytics(f.default.BUFFER_END)}},{key:"_sendSeekAnalytic",value:function(){var e=(new Date).getTime();this._lastSeekEvent+2e3<e&&("Live"!==this.player.config.type||this.player.config.dvr)&&(this._sendAnalytics(f.default.SEEK),this._hasSeeked=!0),this._lastSeekEvent=e}},{key:"_sendTimePercentAnalytic",value:function(){if("Live"!==this.player.config.type){var e=this.player.currentTime/this.player.duration;!this._timePercentEvent.PLAY_REACHED_25&&e>=.25&&(this._timePercentEvent.PLAY_REACHED_25=!0,this._sendAnalytics(f.default.PLAY_REACHED_25)),!this._timePercentEvent.PLAY_REACHED_50&&e>=.5&&(this._timePercentEvent.PLAY_REACHED_50=!0,this._sendAnalytics(f.default.PLAY_REACHED_50)),!this._timePercentEvent.PLAY_REACHED_75&&e>=.75&&(this._timePercentEvent.PLAY_REACHED_75=!0,this._sendAnalytics(f.default.PLAY_REACHED_75)),!this._timePercentEvent.PLAY_REACHED_100&&e>=1&&(this._timePercentEvent.PLAY_REACHED_100=!0,this._sendAnalytics(f.default.PLAY_REACHED_100))}}},{key:"_sendAnalytics",value:function(e){var t=this;if(this._validate()){var n=new p.default(e);n.currentPoint=this.player.currentTime,n.duration=this.player.duration,n.seek=this._hasSeeked,Object.assign(n,this._playerParams);var r={event:n,hasKanalony:this.config.hasKanalony};c.OVPStatsService.collect(this.config.serviceUrl,this._vs,this.config.playerVersion,r).doHttpRequest().then(function(){t.logger.debug("Analytics event sent ",n)},function(e){t.logger.error("Failed to send analytics event ",n,e)})}}},{key:"_validate",value:function(){return this.config.partnerId?!!this.config.entryId||(this._logMissingParam("entryId"),!1):(this._logMissingParam("partnerId"),!1)}},{key:"_logMissingParam",value:function(e){this.logger.warn("block report because of missing param "+e)}},{key:"_playerParams",get:function(){return this._vs=this.config.vs,{clientVer:this.config.playerVersion,entryId:this.config.entryId,sessionId:this.config.sessionId,uiConfId:this.config.uiConfId||0,partnerId:this.config.partnerId,widgetId:this.config.partnerId?"_"+this.config.partnerId:"",referrer:this.config.referrer}}}]),t}(u.BasePlugin);h.defaultConfig={serviceUrl:"//stats.vidiun.com/api_v3/index.php",hasKanalony:!1},t.default=h},function(e,t,n){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=16)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Map;r(this,e),this.headers=t}return o(e,[{key:"getUrl",value:function(e){return e+"/service/"+this.service+(this.action?"/action/"+this.action:"")}},{key:"doHttpRequest",value:function(){var e=this;if(!this.url)throw new Error("serviceUrl is mandatory for request builder");var t=new XMLHttpRequest;return new Promise(function(n,r){t.onreadystatechange=function(){if(4===t.readyState)if(200===t.status){var e=void 0;try{e=JSON.parse(t.responseText)}catch(e){return r(e.message+", "+t.responseText)}e&&"object"===(void 0===e?"undefined":i(e))&&e.code&&e.message?r(e):n(e)}else r(t.responseText)},t.open(e.method,e.url),e.headers.forEach(function(e,n){t.setRequestHeader(n,e)}),t.send(e.params)})}}]),e}();t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.OVPConfiguration=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(2),s={serviceUrl:"https://cdnapisec.vidiun.com/api_v3",cdnUrl:"//cdnapisec.vidiun.com",serviceParams:{apiVersion:"3.3.0",format:1}},a=function(){function e(){r(this,e)}return i(e,null,[{key:"set",value:function(e){e&&Object.assign(s,e)}},{key:"get",value:function(){return(0,o.clone)(s)}}]),e}();t.default=a,t.OVPConfiguration=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function e(t){var n=void 0;return Array.isArray(t)?(n=t.length>0?t.slice(0):[],n.forEach(function(t,i){("object"===(void 0===t?"undefined":r(t))&&t!=={}||Array.isArray(t)&&t.length>0)&&(n[i]=e(t))})):"object"===(void 0===t?"undefined":r(t))?(n=Object.assign({},t),Object.keys(n).forEach(function(t){("object"===r(n[t])&&n[t]!=={}||Array.isArray(n[t])&&n[t].length>0)&&(n[t]=e(n[t]))})):n=t,n};t.clone=i},function(e,t,n){"use strict";function r(e){return e?a.get(e):a}function i(e){return r(e).getLevel()}function o(e,t){r(t).setLevel(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogLevel=t.getLogLevel=t.LogLevel=void 0;var s=n(6),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(s),u={DEBUG:a.DEBUG,INFO:a.INFO,TIME:a.TIME,WARN:a.WARN,ERROR:a.ERROR,OFF:a.OFF};a.useDefaults({defaultLevel:a.ERROR}),t.default=r,t.LogLevel=u,t.getLogLevel=i,t.setLogLevel=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t){r(this,e),this.hasError=!1,"VidiunAPIException"===t.objectType?(this.hasError=!0,this.error=new o(t.code,t.message)):t.error&&"VidiunAPIException"===t.error.objectType?(this.hasError=!0,this.error=new o(t.error.code,t.error.message)):this.data=t};t.default=i;var o=function e(t,n){r(this,e),this.code=t,this.message=n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.MultiRequestResult=void 0;var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=n(3),d=r(f),p=n(4),h=r(p),v=function(e){function t(){var e,n,r,i;o(this,t);for(var a=arguments.length,u=Array(a),c=0;c<a;c++)u[c]=arguments[c];return n=r=s(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.requests=[],i=n,s(r,i)}return a(t,e),u(t,[{key:"add",value:function(e){this.requests.push(e);var t={},n={service:e.service,action:e.action};return Object.assign(t,i({},this.requests.length,Object.assign(n,e.params))),Object.assign(t,this.params),this.params=t,this}},{key:"execute",value:function(){var e=this;try{this.params=JSON.stringify(this.params)}catch(e){t._logger.error(""+e.message)}return new Promise(function(t,n){e.doHttpRequest().then(function(e){t(new y(e))},function(e){n("Error on multiRequest execution, error <"+e+">.")})})}}]),t}(l.default);v._logger=(0,d.default)("MultiRequestBuilder"),t.default=v;var y=t.MultiRequestResult=function e(t){var n=this;o(this,e),this.results=[],this.success=!0,(t.result?t.result:t).forEach(function(t){var r=new h.default(t);if(n.results.push(r),r.hasError)return e._logger.error("Service returned an error with error code: "+r.error.code+" and message: "+r.error.message+"."),void(n.success=!1)})};y._logger=(0,d.default)("MultiRequestResult")},function(e,t,n){var r,i;/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
!function(o){"use strict";var s={};s.VERSION="1.4.1";var a,u={},c=function(e,t){return function(){return t.apply(e,arguments)}},l=function(){var e,t,n=arguments,r=n[0];for(t=1;t<n.length;t++)for(e in n[t])e in r||!n[t].hasOwnProperty(e)||(r[e]=n[t][e]);return r},f=function(e,t){return{value:e,name:t}};s.DEBUG=f(1,"DEBUG"),s.INFO=f(2,"INFO"),s.TIME=f(3,"TIME"),s.WARN=f(4,"WARN"),s.ERROR=f(8,"ERROR"),s.OFF=f(99,"OFF");var d=function(e){this.context=e,this.setLevel(e.filterLevel),this.log=this.info};d.prototype={setLevel:function(e){e&&"value"in e&&(this.context.filterLevel=e)},getLevel:function(){return this.context.filterLevel},enabledFor:function(e){var t=this.context.filterLevel;return e.value>=t.value},debug:function(){this.invoke(s.DEBUG,arguments)},info:function(){this.invoke(s.INFO,arguments)},warn:function(){this.invoke(s.WARN,arguments)},error:function(){this.invoke(s.ERROR,arguments)},time:function(e){"string"==typeof e&&e.length>0&&this.invoke(s.TIME,[e,"start"])},timeEnd:function(e){"string"==typeof e&&e.length>0&&this.invoke(s.TIME,[e,"end"])},invoke:function(e,t){a&&this.enabledFor(e)&&a(t,l({level:e},this.context))}};var p=new d({filterLevel:s.OFF});!function(){var e=s;e.enabledFor=c(p,p.enabledFor),e.debug=c(p,p.debug),e.time=c(p,p.time),e.timeEnd=c(p,p.timeEnd),e.info=c(p,p.info),e.warn=c(p,p.warn),e.error=c(p,p.error),e.log=e.info}(),s.setHandler=function(e){a=e},s.setLevel=function(e){p.setLevel(e);for(var t in u)u.hasOwnProperty(t)&&u[t].setLevel(e)},s.getLevel=function(){return p.getLevel()},s.get=function(e){return u[e]||(u[e]=new d(l({name:e},p.context)))},s.createDefaultHandler=function(e){e=e||{},e.formatter=e.formatter||function(e,t){t.name&&e.unshift("["+t.name+"]")};var t={},n=function(e,t){Function.prototype.apply.call(e,console,t)};return"undefined"==typeof console?function(){}:function(r,i){r=Array.prototype.slice.call(r);var o,a=console.log;i.level===s.TIME?(o=(i.name?"["+i.name+"] ":"")+r[0],"start"===r[1]?console.time?console.time(o):t[o]=(new Date).getTime():console.timeEnd?console.timeEnd(o):n(a,[o+": "+((new Date).getTime()-t[o])+"ms"])):(i.level===s.WARN&&console.warn?a=console.warn:i.level===s.ERROR&&console.error?a=console.error:i.level===s.INFO&&console.info?a=console.info:i.level===s.DEBUG&&console.debug&&(a=console.debug),e.formatter(r,i),n(a,r))}},s.useDefaults=function(e){s.setLevel(e&&e.defaultLevel||s.DEBUG),s.setHandler(s.createDefaultHandler(e))},r=s,void 0!==(i="function"==typeof r?r.call(t,n,t,e):r)&&(e.exports=i)}()},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(e){var t=[],n=/\[\]$/,i=function(e){return"[object Array]"===Object.prototype.toString.call(e)},o=function(e,n){n="function"==typeof n?n():null===n?"":void 0===n?"":n,t[t.length]=encodeURIComponent(e)+"="+encodeURIComponent(n)};return function e(s,a){var u=void 0,c=void 0,l=void 0;if(s)if(i(a))for(u=0,c=a.length;u<c;u++)n.test(s)?o(s,a[u]):e(s+":"+("object"===r(a[u])?u:""),a[u]);else if(a&&"[object Object]"===String(a))for(l in a)e(s+":"+l,a[l]);else o(s,a);else if(i(a))for(u=0,c=a.length;u<c;u++)o(a[u].name,a[u].value);else for(l in a)e(l,a[l]);return t}("",e).join("&").replace(/%20/g,"+")};t.param=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(5),a=r(s),u=n(1),c=r(u),l=function(){function e(){i(this,e)}return o(e,null,[{key:"getMultiRequest",value:function(e,t,n){var r=c.default.get(),i=r.serviceParams;Object.assign(i,{vs:t,clientTag:"html5:v"+e}),n&&Object.assign(i,{partnerId:n});var o=new Map;o.set("Content-Type","application/json");var s=new a.default(o);return s.method="POST",s.service="multirequest",s.url=s.getUrl(r.serviceUrl),s.params=i,s}}]),e}();t.default=l},,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(9),c=r(u),l=n(0),f=r(l),d=n(1),p=r(d),h=n(8),v=function(e){function t(){return i(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),a(t,null,[{key:"collect",value:function(e,t,n,r){var i=p.default.get(),o={};Object.assign(o,i.serviceParams,{vs:t,clientTag:"html5:v"+n},r);var s=new f.default;return s.service="stats",s.action="collect",s.method="GET",s.tag="stats-collect",s.params=o,s.url=e+"?service="+s.service+"&action="+s.action+"&"+(0,h.param)(s.params),s}}]),t}(c.default);t.default=v},,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.VERSION=t.NAME=t.RequestBuilder=t.OVPConfiguration=t.OVPStatsService=void 0;var i=n(0),o=r(i),s=n(1),a=r(s),u=n(12),c=r(u);t.OVPStatsService=c.default,t.OVPConfiguration=a.default,t.RequestBuilder=o.default,t.NAME="pakhshkit-js-providers-stats-service",t.VERSION="2.5.0"}])})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={WIDGET_LOADED:1,MEDIA_LOADED:2,PLAY:3,PLAY_REACHED_25:4,PLAY_REACHED_50:5,PLAY_REACHED_75:6,PLAY_REACHED_100:7,OPEN_EDIT:8,OPEN_VIRAL:9,OPEN_DOWNLOAD:10,OPEN_REPORT:11,BUFFER_START:12,BUFFER_END:13,OPEN_FULL_SCREEN:14,CLOSE_FULL_SCREEN:15,REPLAY:16,SEEK:17,OPEN_UPLOAD:18,SAVE_PUBLISH:19,CLOSE_EDITOR:20,PRE_BUMPER_PLAYED:21,POST_BUMPER_PLAYED:22,BUMPER_CLICKED:23,PREROLL_STARTED:24,MIDROLL_STARTED:25,POSTROLL_STARTED:26,OVERLAY_STARTED:27,PREROLL_CLICKED:28,MIDROLL_CLICKED:29,POSTROLL_CLICKED:30,OVERLAY_CLICKED:31,PREROLL_25:32,PREROLL_50:33,PREROLL_75:34,MIDROLL_25:35,MIDROLL_50:36,MIDROLL_75:37,POSTROLL_25:38,POSTROLL_50:39,POSTROLL_75:40};t.default=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function e(t){r(this,e),this.eventType=t,this.isFirstInSession=!1,this.eventTimestamp=(new Date).getTime()};t.default=i}])});
//# sourceMappingURL=pakhshkit-vanalytics.js.map