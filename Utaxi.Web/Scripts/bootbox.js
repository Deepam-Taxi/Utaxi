!function(t,o){"use strict";"function"==typeof define&&define.amd?define(["jquery"],o):"object"==typeof exports?module.exports=o(require("jquery")):t.bootbox=o(t.jQuery)}(this,function t(o,e){"use strict";var a={dialog:"<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",header:"<div class='modal-header'><h4 class='modal-title'></h4></div>",footer:"<div class='modal-footer'></div>",closeButton:"<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",form:"<form class='bootbox-form'></form>",inputs:{text:"<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",textarea:"<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",email:"<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",select:"<select class='bootbox-input bootbox-input-select form-control'></select>",checkbox:"<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",date:"<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",time:"<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",number:"<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",password:"<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"}},n={locale:"en",backdrop:!0,animate:!0,className:null,closeButton:!0,show:!0,container:"body"},r={};function i(t){var o=d[n.locale];return o?o[t]:d.en[t]}function l(t,e,a){t.stopPropagation(),t.preventDefault(),o.isFunction(a)&&!1===a(t)||e.modal("hide")}function c(t,e){var a=0;o.each(t,function(t,o){e(t,o,a++)})}function s(t,e,a){return o.extend(!0,{},t,function(t,o){var e=t.length,a={};if(e<1||e>2)throw new Error("Invalid argument length");return 2===e||"string"==typeof t[0]?(a[o[0]]=t[0],a[o[1]]=t[1]):a=t[0],a}(e,a))}function u(t,o,e,a){return b(s({className:"bootbox-"+t,buttons:p.apply(null,o)},a,e),o)}function p(){for(var t={},o=0,e=arguments.length;o<e;o++){var a=arguments[o],n=a.toLowerCase(),r=a.toUpperCase();t[n]={label:i(r)}}return t}function b(t,o){var a={};return c(o,function(t,o){a[o]=!0}),c(t.buttons,function(t){if(a[t]===e)throw new Error("button key "+t+" is not allowed (options are "+o.join("\n")+")")}),t}r.alert=function(){var t;if((t=u("alert",["ok"],["message","callback"],arguments)).callback&&!o.isFunction(t.callback))throw new Error("alert requires callback property to be a function when provided");return t.buttons.ok.callback=t.onEscape=function(){return!o.isFunction(t.callback)||t.callback()},r.dialog(t)},r.confirm=function(){var t;if((t=u("confirm",["cancel","confirm"],["message","callback"],arguments)).buttons.cancel.callback=t.onEscape=function(){return t.callback(!1)},t.buttons.confirm.callback=function(){return t.callback(!0)},!o.isFunction(t.callback))throw new Error("confirm requires a callback");return r.dialog(t)},r.prompt=function(){var t,n,i,l,u,d,f;if(l=o(a.form),n={className:"bootbox-prompt",buttons:p("cancel","confirm"),value:"",inputType:"text"},d=(t=b(s(n,arguments,["title","callback"]),["cancel","confirm"])).show===e||t.show,t.message=l,t.buttons.cancel.callback=t.onEscape=function(){return t.callback(null)},t.buttons.confirm.callback=function(){var e;switch(t.inputType){case"text":case"textarea":case"email":case"select":case"date":case"time":case"number":case"password":e=u.val();break;case"checkbox":var a=u.find("input:checked");e=[],c(a,function(t,a){e.push(o(a).val())})}return t.callback(e)},t.show=!1,!t.title)throw new Error("prompt requires a title");if(!o.isFunction(t.callback))throw new Error("prompt requires a callback");if(!a.inputs[t.inputType])throw new Error("invalid prompt type");switch(u=o(a.inputs[t.inputType]),t.inputType){case"text":case"textarea":case"email":case"date":case"time":case"number":case"password":u.val(t.value);break;case"select":var m={};if(!(f=t.inputOptions||[]).length)throw new Error("prompt with select requires options");c(f,function(t,a){var n=u;if(a.value===e||a.text===e)throw new Error("given options in wrong format");a.group&&(m[a.group]||(m[a.group]=o("<optgroup/>").attr("label",a.group)),n=m[a.group]),n.append("<option value='"+a.value+"'>"+a.text+"</option>")}),c(m,function(t,o){u.append(o)}),u.val(t.value);break;case"checkbox":var C=o.isArray(t.value)?t.value:[t.value];if(!(f=t.inputOptions||[]).length)throw new Error("prompt with checkbox requires options");if(!f[0].value||!f[0].text)throw new Error("given options in wrong format");u=o("<div/>"),c(f,function(e,n){var r=o(a.inputs[t.inputType]);r.find("input").attr("value",n.value),r.find("label").append(n.text),c(C,function(t,o){o===n.value&&r.find("input").prop("checked",!0)}),u.append(r)})}return t.placeholder&&u.attr("placeholder",t.placeholder),t.pattern&&u.attr("pattern",t.pattern),l.append(u),l.on("submit",function(t){t.preventDefault(),t.stopPropagation(),i.find(".btn-primary").click()}),(i=r.dialog(t)).off("shown.bs.modal"),i.on("shown.bs.modal",function(){u.focus()}),!0===d&&i.modal("show"),i},r.dialog=function(t){t=function(t){var e,a;if("object"!=typeof t)throw new Error("Please supply an object of options");if(!t.message)throw new Error("Please specify a message");return(t=o.extend({},n,t)).buttons||(t.buttons={}),t.backdrop=!!t.backdrop&&"static",e=t.buttons,a=function(t){var o,e=0;for(o in t)e++;return e}(e),c(e,function(t,n,r){if(o.isFunction(n)&&(n=e[t]={callback:n}),"object"!==o.type(n))throw new Error("button with key "+t+" must be an object");n.label||(n.label=t),n.className||(n.className=a<=2&&r===a-1?"btn-primary":"btn-default")}),t}(t);var e=o(a.dialog),r=e.find(".modal-dialog"),i=e.find(".modal-body"),s=t.buttons,u="",p={onEscape:t.onEscape};if(c(s,function(t,o){u+="<button data-bb-handler='"+t+"' type='button' class='btn "+o.className+"'>"+o.label+"</button>",p[t]=o.callback}),i.find(".bootbox-body").html(t.message),!0===t.animate&&e.addClass("fade"),t.className&&e.addClass(t.className),"large"===t.size&&r.addClass("modal-lg"),"small"===t.size&&r.addClass("modal-sm"),t.title&&i.before(a.header),t.closeButton){var b=o(a.closeButton);t.title?e.find(".modal-header").prepend(b):b.css("margin-top","-10px").prependTo(i)}return t.title&&e.find(".modal-title").html(t.title),u.length&&(i.after(a.footer),e.find(".modal-footer").html(u)),e.on("hidden.bs.modal",function(t){t.target===this&&e.remove()}),e.on("shown.bs.modal",function(){e.find(".btn-primary:first").focus()}),e.on("escape.close.bb",function(t){p.onEscape&&l(t,e,p.onEscape)}),e.on("click",".modal-footer button",function(t){var a=o(this).data("bb-handler");l(t,e,p[a])}),e.on("click",".bootbox-close-button",function(t){l(t,e,p.onEscape)}),e.on("keyup",function(t){27===t.which&&e.trigger("escape.close.bb")}),o(t.container).append(e),e.modal({backdrop:t.backdrop,keyboard:!1,show:!1}),t.show&&e.modal("show"),e},r.setDefaults=function(){var t={};2===arguments.length?t[arguments[0]]=arguments[1]:t=arguments[0],o.extend(n,t)},r.hideAll=function(){return o(".bootbox").modal("hide"),r};var d={br:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Sim"},cs:{OK:"OK",CANCEL:"Zrušit",CONFIRM:"Potvrdit"},da:{OK:"OK",CANCEL:"Annuller",CONFIRM:"Accepter"},de:{OK:"OK",CANCEL:"Abbrechen",CONFIRM:"Akzeptieren"},el:{OK:"Εντάξει",CANCEL:"Ακύρωση",CONFIRM:"Επιβεβαίωση"},en:{OK:"OK",CANCEL:"Cancel",CONFIRM:"OK"},es:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Aceptar"},et:{OK:"OK",CANCEL:"Katkesta",CONFIRM:"OK"},fi:{OK:"OK",CANCEL:"Peruuta",CONFIRM:"OK"},fr:{OK:"OK",CANCEL:"Annuler",CONFIRM:"D'accord"},he:{OK:"אישור",CANCEL:"ביטול",CONFIRM:"אישור"},id:{OK:"OK",CANCEL:"Batal",CONFIRM:"OK"},it:{OK:"OK",CANCEL:"Annulla",CONFIRM:"Conferma"},ja:{OK:"OK",CANCEL:"キャンセル",CONFIRM:"確認"},lt:{OK:"Gerai",CANCEL:"Atšaukti",CONFIRM:"Patvirtinti"},lv:{OK:"Labi",CANCEL:"Atcelt",CONFIRM:"Apstiprināt"},nl:{OK:"OK",CANCEL:"Annuleren",CONFIRM:"Accepteren"},no:{OK:"OK",CANCEL:"Avbryt",CONFIRM:"OK"},pl:{OK:"OK",CANCEL:"Anuluj",CONFIRM:"Potwierdź"},pt:{OK:"OK",CANCEL:"Cancelar",CONFIRM:"Confirmar"},ru:{OK:"OK",CANCEL:"Отмена",CONFIRM:"Применить"},sv:{OK:"OK",CANCEL:"Avbryt",CONFIRM:"OK"},tr:{OK:"Tamam",CANCEL:"İptal",CONFIRM:"Onayla"},zh_CN:{OK:"OK",CANCEL:"取消",CONFIRM:"确认"},zh_TW:{OK:"OK",CANCEL:"取消",CONFIRM:"確認"}};return r.init=function(e){return t(e||o)},r});
