'use strict';
(function() {
    // CMP call
    (function() {
        var cmpScriptElement = document.createElement('script');
        var firstScript = document.getElementsByTagName('script')[0];

        cmpScriptElement.async = true;
        cmpScriptElement.type = 'text/javascript';
        cmpScriptElement.src = 'https://quantcast.mgr.consensu.org/cmp.js';

        firstScript.parentNode.insertBefore(cmpScriptElement, firstScript);
    })();



    // Styles Creation
    (function() {
    var css = ""
    
        + " .qc-cmp-button { "
        + "   background-color: #003865 !important; "
        + "   border-color: #003865 !important; "
        + " } "
        + " .qc-cmp-button:hover { "
        + "   background-color: transparent !important; "
        + "   border-color: #003865 !important; "
        + " } "
        + " .qc-cmp-alt-action, "
        + " .qc-cmp-link { "
        + "   color: #003865 !important; "
        + " } "
    
    
        + " .qc-cmp-button { "
        + "   color: #FFFFFF !important; "
        + " } "
    
    
    
    
        + " .qc-cmp-ui, "
        + " .qc-cmp-ui .qc-cmp-title, "
        + " .qc-cmp-ui .qc-cmp-table, "
        + " .qc-cmp-ui .qc-cmp-messaging, "
        + " .qc-cmp-ui .qc-cmp-sub-title, "
        + " .qc-cmp-ui .qc-cmp-vendor-list, "
        + " .qc-cmp-ui .qc-cmp-purpose-info, "
        + " .qc-cmp-ui .qc-cmp-table-header, "
        + " .qc-cmp-ui .qc-cmp-beta-messaging, "
        + " .qc-cmp-ui .qc-cmp-main-messaging, "
        + " .qc-cmp-ui .qc-cmp-vendor-list-title{ "
        + "   color: #333333 !important; "
        + " } "
    
    
        + " .qc-cmp-ui a, "
        + " .qc-cmp-ui .qc-cmp-alt-action { "
        + "   color: #1a86dd !important; "
        + " } "
    
    
        + " .qc-cmp-ui { "
        + "   background-color: #FFFFFF !important; "
        + " } "
        + " .qc-cmp-publisher-purposes-table .qc-cmp-table-header { "
        + "   background-color: #fafafa !important; "
        + " } "
        + " .qc-cmp-publisher-purposes-table .qc-cmp-table-row { "
        + "   background-color: #ffffff !important; "
        + " } "
    
    
        + " .qc-cmp-small-toggle.qc-cmp-toggle-on, "
        + " .qc-cmp-toggle.qc-cmp-toggle-on { "
        + "   background-color: #003865!important; "
        + "   border-color: #003865!important; "
        + " } "
    
    
        + "//// quantcast cookie consent &amp; settings - popup on load.qc-cmp-ui-content {padding: 40px !important; }.qc-cmp-left-nav-link {line-height: 45px !important;}.qc-cmp-back:before {top: 15px !important;}.qc-cmp-button,.qc-cmp-button.qc-cmp-secondary-button:hover {background-color: #003865 !important;border-color: #003865 !important;}.qc-cmp-button:hover,.qc-cmp-button.qc-cmp-secondary-button {background-color: transparent !important;border-color: #003865 !important;}.qc-cmp-alt-action,.qc-cmp-link {color: #003865 !important;}.qc-cmp-button,.qc-cmp-button.qc-cmp-secondary-button:hover {color: #ffffff !important;}.qc-cmp-button:hover,.qc-cmp-button.qc-cmp-secondary-button {color: #003865 !important;}.qc-cmp-small-toggle,.qc-cmp-toggle {background-color: #003865 !important;border-color: #003865 !important;}.qc-cmp-main-messaging,.qc-cmp-messaging,.qc-cmp-sub-title,.qc-cmp-privacy-settings-title,.qc-cmp-purpose-list,.qc-cmp-tab,.qc-cmp-title,.qc-cmp-vendor-list,.qc-cmp-vendor-list-title,.qc-cmp-enabled-cell,.qc-cmp-toggle-status,.qc-cmp-table,.qc-cmp-table-header {color: #000000 !important;}.qc-cmp-ui {background-color: #ffffff !important;}.qc-cmp-table,.qc-cmp-table-row {border: 1px solid #000000 !important;}.qc-cmp-alt-buttons {margin: 0 !important;}"
    
    + "";


    var stylesElement = document.createElement('style');
    var re = new RegExp( '&amp;quote;', 'g' );
    css = css.replace( re, '"' );
    stylesElement.type = 'text/css';
    if (stylesElement.styleSheet){
    // This is required for IE8 and below.
    stylesElement.styleSheet.cssText = css;
    } else {
    stylesElement.appendChild(document.createTextNode(css));
    }
    var body = document.body || document.getElementsByTagName('body')[0];
    body.appendChild(stylesElement);
    })();


(function() {
var gdprAppliesGlobally = true;

function addFrame() {
if (!window.frames['__cmpLocator']) {
if (document.body) {
(function() {
var body = document.body;
var iframe = document.createElement('iframe');

iframe.name = '__cmpLocator';
iframe.style.cssText = 'display:none';
body.appendChild(iframe);
})();
} else {
// In the case where this stub is located in the head,
// this allows us to inject the iframe more quickly than
// relying on DOMContentLoaded or other events.
setTimeout(addFrame, 5);
}
}
}
addFrame();

function cmpMsgHandler(event) {
var json = void 0;
var msgIsString = typeof event.data === 'string';

if (msgIsString) {
json = event.data.indexOf('__cmpCall') !== -1 ? JSON.parse(event.data) : {};
} else {
json = event.data;
}

if (json.__cmpCall) {
(function() {
var cmpCall = json.__cmpCall;

window.__cmp(cmpCall.command, cmpCall.parameter, function(returnValue, success) {
var returnMsg = {
'__cmpReturn': {
'success': success,
'callId': cmpCall.callId,
'returnValue': returnValue
}
};

event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
});
})();
}
}

window.__cmp = function(command) {
var arg = arguments;
var returnValue = null;

if (!arg.length) {
returnValue = __cmp.a;
} else if (arg[0] === 'ping') {
arg[2]({ 'cmpLoaded': false, 'gdprAppliesGlobally': gdprAppliesGlobally }, true);
} else if (command === '__cmp') {
returnValue = false;
} else {
if (typeof __cmp.a === 'undefined') {
__cmp.a = [];
}
__cmp.a.push([].slice.apply(arg));
}

return returnValue
}

window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
window.__cmp.msgHandler = cmpMsgHandler;

if (window.addEventListener) {
window.addEventListener('message', cmpMsgHandler, false);
} else {
window.attachEvent('onmessage', cmpMsgHandler);
}
})();

/*
Javascript auto detect language function.
Supports: Edge 16+, IE 9+, Firefox 57+, Chrome 63+, Opera 48+, Yandex 14.12+, Safari 10.1+
Where `supported` is equal to lang, ex. 'en' | 'fr' | 'ro'.
*/

var autoDetectedLanguage = 'en';

function splitLang(lang) {
  return lang.length > 2 ? lang.split('-')[0] : lang;
};

function isSupported(lang) {
  var langs = ['bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'ga', 'hr', 'hu', 'it', 'lt', 'lv', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv'];
  return langs.includes(lang);
};

if (isSupported(splitLang(document.documentElement.lang))) {
  autoDetectedLanguage = splitLang(document.documentElement.lang);
} else if (isSupported(splitLang(navigator.language))) {
  autoDetectedLanguage = splitLang(navigator.language);
};

window.__cmp('init', { 'Publisher Logo': 'https://static.euronews.com/website/images/euronews_horizontal_flat_vectoriel_newblueweb.svg',
'Display Persistent Consent Link': false,
'No Option': false,
'Vendor Screen Cancel Button Text': '\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C',
'Default Value for Toggles': 'off',
'Google Personalization': true,
'Consent Scope': 'service group',
'Vendor Screen Reject All Button Text': '\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0432\u0441\u0435\u0433\u043E',
'Language': 'ru',
'Initial Screen Accept Button Text': '\u042F \u0414\u0410\u042E \u0421\u041E\u0413\u041B\u0410\u0421\u0418\u0415',
'Display UI': 'inEU',
'Purpose Screen Vendor Link Text': '\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u043E\u0432',
'Purpose Screen Save and Exit Button Text': '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u0432\u044B\u0439\u0442\u0438',
'Vendor Screen Body Text': '\u041D\u0438\u0436\u0435 \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0432\u0430\u0448\u0438 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0439 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438. \u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0438\u0442\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043F\u0438\u0441\u043A\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C, \u0434\u043B\u044F \u043A\u0430\u043A\u0438\u0445 \u0446\u0435\u043B\u0435\u0439 \u043E\u043D\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u0434\u0430\u043D\u043D\u044B\u0435, \u0438 \u0437\u0430\u0442\u0435\u043C \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0432\u0430\u0448 \u0432\u044B\u0431\u043E\u0440. \u0412 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u043B\u0443\u0447\u0430\u044F\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u0443\u043A\u0430\u0437\u0430\u0442\u044C, \u0447\u0442\u043E \u0432\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u0432 \u0440\u0430\u043C\u043A\u0430\u0445 \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0445 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043A\u043B\u0438\u043A\u043D\u0443\u0442\u044C \u043D\u0430 \u0440\u0430\u0437\u0434\u0435\u043B \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u044D\u0442\u0438\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0438 \u043F\u0440\u0438 \u0436\u0435\u043B\u0430\u043D\u0438\u0438 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F.',
'Purpose Screen Title Text': '\u041C\u044B \u0441 \u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0443\u0432\u0430\u0436\u0435\u043D\u0438\u0435\u043C \u043E\u0442\u043D\u043E\u0441\u0438\u043C\u0441\u044F \u043A B\u0430\u0448\u0435\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438',
'Initial Screen Purpose Link Text': '\u041E\u0431\u044A\u044F\u0441\u043D\u0438\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435',
'UI Layout': 'banner',
'Publisher Name': 'Euronews',
'Purpose Screen Body Text': '\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F \u0438 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C, \u043D\u0430 \u043A\u0430\u043A\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 B\u0430\u0448\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u044B. \u0412\u044B \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0432\u043E\u0438 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043D\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u043D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E \u043E\u0442 \u0441\u0430\u0439\u0442\u043E\u0432 \u043D\u0430\u0448\u0438\u0445 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u043E\u0432. \u041A\u0430\u0436\u0434\u0430\u044F \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C \u0438\u043C\u0435\u0435\u0442 \u0441\u0432\u043E\u0451 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u044E\u0449\u0435\u0435, \u043A\u0430\u043A \u043C\u044B \u0438 \u043D\u0430\u0448\u0438 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0432\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435.',
'Publisher Purpose Legitimate Interest IDs': [5],
'Purpose Screen Accept All Button Text': '\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0442\u044C\u0441\u044F \u0441\u043E \u0432\u0441\u0435\u043C',
'Min Days Between UI Displays': 30,
'Vendor Screen Title Text': '\u041C\u044B \u0441 \u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0443\u0432\u0430\u0436\u0435\u043D\u0438\u0435\u043C \u043E\u0442\u043D\u043E\u0441\u0438\u043C\u0441\u044F \u043A B\u0430\u0448\u0435\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438',
'Publisher Purpose IDs': [1,2,3,4,5],
'Vendor Screen Accept All Button Text': '\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0442\u044C\u0441\u044F \u0441\u043E \u0432\u0441\u0435\u043C',
'Consent Scope Group URL': 'https://www.euronews.com/quantcast-consent',
'Cookie Domain': 'www.euronews.com/quantcast-consent',
'Persistent Consent Link Label': '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438',
'Publisher Vendor List URL': 'https://quantcast.mgr.consensu.org/choice/8WySRT3MRSkuS/ru.euronews.com/.well-known/pubvendors.json',
'Vendor Screen Purposes Link Text': '\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u0443',
'Initial Screen Body Text Option': 1,
'Initial Screen Title Text': '\u041C\u044B \u0441 \u0431\u043E\u043B\u044C\u0448\u0438\u043C \u0443\u0432\u0430\u0436\u0435\u043D\u0438\u0435\u043C \u043E\u0442\u043D\u043E\u0441\u0438\u043C\u0441\u044F \u043A B\u0430\u0448\u0435\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438',
'Purpose Screen Reject All Button Text': '\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u043E\u0442 \u0432\u0441\u0435\u0433\u043E',
'Purpose Screen Cancel Button Text': '\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C',
'Initial Screen Reject Button Text': '\u042F \u041D\u0415 \u0414\u0410\u042E \u0421\u041E\u0413\u041B\u0410\u0421\u0418\u0415',
'Group Hosted HTML Cookie Access URL': 'https://www.euronews.com/quantcast-consent',
'Vendor Screen Save and Exit Button Text': '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438 \u0432\u044B\u0439\u0442\u0438' });

})();
