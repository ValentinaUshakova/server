!function(){function t(e,n,o){function a(i,r){if(!n[i]){if(!e[i]){var l="function"==typeof require&&require;if(!r&&l)return l(i,!0);if(s)return s(i,!0);var u=new Error("Cannot find module '"+i+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[i]={exports:{}};e[i][0].call(c.exports,function(t){return a(e[i][1][t]||t)},c,c.exports,t,e,n,o)}return n[i].exports}for(var s="function"==typeof require&&require,i=0;i<o.length;i++)a(o[i]);return a}return t}()({1:[function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),s=function(){function t(e){o(this,t),this.Vue=Euronews.Tools.Vue,this._=Euronews.Tools._,this.$=Euronews.Tools.$;this.$;return this.element=e,this.componentTagsName={},this.componentTagName="",this.componentTemplate="",this.components,this.partials=[],this}return a(t,[{key:"getDataContextAndClearStaticDom",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"items",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return this.getDataContext(t,e,o),n&&this.clearStaticDom(),this}},{key:"getDataContext",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"items",n=arguments[2],o=$(this.element).data("content")||$(this.element).parent().data("content");return o&&(n&&n(o),t.$set(e,o)),this}},{key:"clearStaticDom",value:function(){return $(this.element).find("[data-component]").length||console.warn("No data-component found, it's maybe an error because your components might be removed from the DOM"),$(this.element).children().not("[data-component]").remove(),this}},{key:"setComponentConfig",value:function(t){if(this._.has(t,"components")&&(this.components=t.components),!(this._.has(t,"components")||this._.has(t,"tagName")&&this._.has(t,"template")))return console.warn("config args must have tagName and template or templateEl keys"),this;var e=t.tagName,n=t.template||t.templateEl,o=this._.keys(this.componentTagsName);if(-1!==this._.indexOf(o,e)&&this._.isObject(this.componentTagsName[e]))throw new Error("tagName "+e+' already exists, you can retreive instance with getInstance("'+e+'")');return this.componentTagsName[e]="",this.componentTagName=e,this.componentTemplate=n,this}},{key:"build",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=this.componentTagName?this.componentTagName:0;if(this.componentTagsName[n])return this.componentTagsName[n];var o=this.element,a={el:o};if(e&&!n)throw new Error("To be used as a component, you must add a tagName");if(e){var s={template:this.componentTemplate};this._.assign(s,this.config);var i=this.Vue.extend(s);this.Vue.component(n,i)}else this._.assign(a,this.config);return this.components&&(a.components=this.components),this.partials.length&&this._.forEach(this.partials,function(e){t.Vue.partial(e.name,e.template)}),this.componentTagsName[n]=new this.Vue(a),this.componentTagsName[n]}},{key:"getVueInstance",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(t){if(this._.has(this.componentTagsName,t)&&this._.isObject(this.componentTagsName[t]))return this.componentTagsName[t]}else if(1===this._.size(this.componentTagsName))return this.componentTagsName[this._.keys(this.componentTagsName)[0]];throw new Error("Unknown instance")}},{key:"buildComponent",value:function(){return this.build(!0)}},{key:"getComponentTagName",value:function(){return this.componentTagName}}]),t}();e.exports=s},{}],2:[function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i=t("./component-abstract"),r=function(t){return t&&t.__esModule?t:{default:t}}(i),l=function(t){function e(t){var n;o(this,e);var s=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));s.storage=Euronews.Tools.storage,s.$=Euronews.Tools.$;var i=Euronews.Tools.Vue,r=s;return s.elementsArr=[],s.setComponentConfig({tagName:"football-detailed-ranking",template:'<div class="enw-widget__sport">\n          <h2 class="enw-widget__sport__title">League Standing</h2>\n          <div class="enw-block-scrollable js-scrollable--xy">\n            <table width="100%">\n                <thead>\n                    <tr class="enw-table__row enw-widget__sport__thead">\n                      <th class="enw-table__cell">{{ ranking.labels.position }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.team }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.played }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.won }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.drawn }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.lost }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.for }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.against }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.diff }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.points }}</th>\n                      <th class="enw-table__cell">{{ ranking.labels.form }}</th>\n                    </tr>\n                </thead>\n                <tbody class="enw-table__tbody">\n                        <tr class="enw-table__row" v-for="team in ranking.teams">\n                            <td class="enw-table__cell--b">{{ team.position }} <i class="icon icon_26-market-up"></i></td>\n                            <td class="enw-table__cell--b">{{ team.name }}</td>\n                            <td class="enw-table__cell">{{ team.played }}</td>\n                            <td class="enw-table__cell">{{ team.won }}</td>\n                            <td class="enw-table__cell">{{ team.drawn }}</td>\n                            <td class="enw-table__cell">{{ team.lost }}</td>\n                            <td class="enw-table__cell">{{ team.for }}</td>\n                            <td class="enw-table__cell">{{ team.against }}</td>\n                            <td class="enw-table__cell">{{ team.diff }}</td>\n                            <td class="enw-table__cell--b">{{ team.points }}</td>\n                            <td class="enw-table__cell">{{{ team.form | pointify }}}</td>\n                        </tr>\n                </tbody>\n            </table>\n          </div>\n        </div>\n        <a href="{{ more.more_ranking_url }}" class="c-button--negative float-center">{{ more.more_ranking_label }}</a>'}),s.init=function(t){s.getDataContextAndClearStaticDom(t,"ranking",!0);var e=JSON.parse(document.querySelector(".js-sport").getAttribute("data-more"));t.$set("more",e),window.addEventListener("update-league-ranking",function(e){t.$set("ranking",e.detail.ranking)},!1)},s.config={data:function(){return{ranking:[],more:[]}},created:function(){r.init(this),i.filter("pointify",function(t){return t=t.replace(/W/g,'<div class="enw-circle enw-circle--w"></div>'),t=t.replace(/D/g,'<div class="enw-circle enw-circle--d"></div>'),t=t.replace(/L/g,'<div class="enw-circle enw-circle--l"></div>')})}},n=s,a(s,n)}return s(e,t),e}(r.default);e.exports=l},{"./component-abstract":1}],3:[function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i=t("./component-abstract"),r=function(t){return t&&t.__esModule?t:{default:t}}(i),l=function(t){function e(t){var n;o(this,e);var s=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));s.storage=Euronews.Tools.storage,s.$=Euronews.Tools.$;var i=JSON.parse(document.querySelector(".js-sport").getAttribute("data-more")),r=JSON.parse(document.querySelector(".js-sport").getAttribute("data-league")),l=r.id,u=Euronews.Tools.Vue,c=s;return s.elementsArr=[],s.setComponentConfig({tagName:"football-fixtures",template:"#football-fixtures-template"}),s.init=function(t){s.getDataContextAndClearStaticDom(t,"fixturesList",!0),c.initDatas(t),t.$set("more",i),t.$set("league",r),window.addEventListener("update-league-fixtures",function(e){t.$set("fixturesList",e.detail.fixtures),t.$set("league",e.detail.league),l=e.detail.leagueId,c.initDatas(t)},!1)},s.initDatas=function(t){var e=t.$get("fixturesList"),n=e[0],o=[];$.each(e,function(){o.push(this.round)}),t.$set("fixture",n),t.$set("loadedRounds",o),t.$set("currentResultRound",0)},s.config={data:function(){return{fixturesList:[],fixture:[],loadedRounds:[],endRound:!1,isLoading:!1,currentResultRound:0,more:[],league:[]}},created:function(){c.init(this),u.filter("toLocalizedTime",function(t){var e=new Date(t),n=6e4*e.getTimezoneOffset();e=e.getTime()-n;var o=new Date(e);return o.getHours().toString()+":"+(o.getMinutes()<10?"0"+o.getMinutes().toString():o.getMinutes().toString())})},methods:{previousResult:function(){this.currentResultRound-1>=0&&(this.fixture=this.fixturesList[this.currentResultRound-1],this.currentResultRound--)},nextResult:function(){if(!this.isLoading){if(this.isLoading=!0,this.endRound&&void 0===this.fixturesList[this.currentResultRound+1])return void(this.isLoading=!1);if(this.fixture=this.fixturesList[this.currentResultRound+1],this.currentResultRound++,void 0===this.fixturesList[this.currentResultRound+1]){var t="/api/sport/football/"+l+"/"+(this.currentResultRound+1)+"/fixtures/";this.$http({url:t,method:"GET",async:!1}).then(function(t,e,n){if(this.isLoading=!1,""===t.data.data.fixtures)return void(this.endRound=!0);this.fixturesList.push(t.data.data.fixtures[0]),this.loadedRounds.push(t.data.data.fixtures[0].round)},function(t,e,n){console.warn("Football - ERROR LOADING JSON")})}else this.isLoading=!1}}}},n=s,a(s,n)}return s(e,t),e}(r.default);e.exports=l},{"./component-abstract":1}],4:[function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i=t("./component-abstract"),r=function(t){return t&&t.__esModule?t:{default:t}}(i),l=function(t){function e(t){var n;o(this,e);var s=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));s.storage=Euronews.Tools.storage,s.$=Euronews.Tools.$;var i=s,r=JSON.parse(document.querySelector(".js-sport").getAttribute("data-league"));return s.elementsArr=[],s.setComponentConfig({tagName:"football-ranking",template:"#football-ranking-template"}),s.init=function(t){s.getDataContextAndClearStaticDom(t,"ranking",!0);var e=JSON.parse(document.querySelector(".js-sport").getAttribute("data-more"));t.$set("more",e),t.$set("league",r),window.addEventListener("update-league-ranking",function(e){t.$set("league",e.detail.league),t.$set("ranking",e.detail.ranking)},!1)},s.config={data:function(){return{ranking:[],league:[],more:[]}},created:function(){i.init(this)}},n=s,a(s,n)}return s(e,t),e}(r.default);e.exports=l},{"./component-abstract":1}],5:[function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i=t("./component-abstract"),r=function(t){return t&&t.__esModule?t:{default:t}}(i),l=function(t){function e(t){var n;o(this,e);var s=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));s.storage=Euronews.Tools.storage,s.$=Euronews.Tools.$;var i=s,r=JSON.parse(document.querySelector(".js-sport").getAttribute("data-more")),l=JSON.parse(document.querySelector(".js-sport").getAttribute("data-league")),u=l.id;return s.elementsArr=[],s.setComponentConfig({tagName:"football-results",template:"#football-results-template"}),s.init=function(t){s.getDataContextAndClearStaticDom(t,"resultsList",!0),i.initDatas(t),t.$set("more",r),t.$set("league",l),window.addEventListener("update-league-results",function(e){t.$set("resultsList",e.detail.results),t.$set("league",e.detail.league),u=e.detail.leagueId,i.initDatas(t)},!1)},s.initDatas=function(t){var e=t.$get("resultsList"),n=e[0],o=[];$.each(e,function(){o.push(this.round)}),t.$set("result",n),t.$set("loadedRounds",o),t.$set("currentResultRound",0)},s.config={data:function(){return{resultsList:[],result:[],loadedRounds:[],endRound:!1,isLoading:!1,currentResultRound:0,more:[],league:[]}},created:function(){i.init(this)},methods:{previousResult:function(){if(!this.isLoading){if(this.isLoading=!0,this.endRound)return void(this.isLoading=!1);if(this.result=this.resultsList[this.currentResultRound+1],this.currentResultRound++,void 0===this.resultsList[this.currentResultRound+1]){var t="/api/sport/football/"+u+"/"+(this.currentResultRound+1)+"/results";this.$http({url:t,method:"GET"}).then(function(t,e,n){if(""===t.data.data.results)return this.endRound=!0,void(this.isLoading=!1);this.resultsList.push(t.data.data.results[0]),this.loadedRounds.push(t.data.data.results[0].round),this.isLoading=!1},function(t,e,n){console.warn("Football - ERROR LOADING JSON")})}else this.isLoading=!1}},nextResult:function(){this.currentResultRound-1>=0&&(this.result=this.resultsList[this.currentResultRound-1],this.currentResultRound--)}}},n=s,a(s,n)}return s(e,t),e}(r.default);e.exports=l},{"./component-abstract":1}],6:[function(t,e,n){"use strict";var o=t("components/football-results"),a=t("components/football-fixtures"),s=t("components/football-ranking"),i=t("components/football-detailed-ranking");new o("#football-results-component").buildComponent(),new a("#football-fixtures-component").buildComponent(),new s("#football-ranking-component").buildComponent(),new i("#football-ranking-detailed-component").buildComponent(),Euronews.Event.domReady(function(){function t(t){o.removeClass("active"),t.addClass("active"),n(".jsTabsContent > div").hide(),n(t.attr("href")).show()}function e(t){var e=n(".sport .layout .circular-loader");e.toggleClass("hide"),localStorage.setItem("league-id",t);var o="/api/sport/football/"+t+"/";n.get(o,function(e){var n=new CustomEvent("update-league-results",{detail:{leagueId:t,results:e.results,league:e.league}}),o=new CustomEvent("update-league-fixtures",{detail:{leagueId:t,fixtures:e.fixtures,league:e.league}}),a=new CustomEvent("update-league-ranking",{detail:{leagueId:t,ranking:e.ranking,league:e.league}});window.dispatchEvent(n),window.dispatchEvent(o),window.dispatchEvent(a)}).done(function(){e.toggleClass("hide")})}var n=Euronews.Tools.$,o=(Euronews.Tools._,n(".jsSwitchTab a"));o.click(function(e){e.preventDefault(),t(n(this))});var a=n(".js-sport").data("league");n(".team-list a.league-id").on("click",function(t){t.preventDefault(),a=n(t.currentTarget).data("id"),n("#foot-international").val(a),e(a)}),n("#foot-international").on("change",function(t){a=n(t.currentTarget).val(),e(a)});var s=localStorage.getItem("league-id");s>0&&(e(s),n("#foot-international").val(s))})},{"components/football-detailed-ranking":2,"components/football-fixtures":3,"components/football-ranking":4,"components/football-results":5}]},{},[6]);