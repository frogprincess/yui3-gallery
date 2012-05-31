YUI.add("gallery-dynamic-dialog",function(a){var b,c=a.Panel,d=a.Lang,e=d.sub,f=d.isValue,g=d.isString,h=a.Object.each;b=a.Base.create("dynamicDialog",a.Base,[],{container:a.one(document.body),panels:{},DEFAULT_EVENTS:{"a.open-dialog":"click","a.remote-dialog":"click"},initializer:function(){this.publish("submit",{defaultFn:this._defSubmitFn,preventable:!0}),this.publish("getSuccess",{defaultFn:this._triggerEventFn,preventable:!0}),this.publish("getFailure",{defaultFn:this._triggerEventFn,preventable:!0}),this.publish("show",{preventable:!1})},setupDelegates:function(){var b=this.container,c=this.DEFAULT_EVENTS,d=a.bind(this._triggerEventFn,this);h(c,function(a,c){b.delegate(a,d,c)})},_fetchDialogContent:function(b){var c=b.currentTarget,d=c.get("tagName")==="A"?c.get("href"):c.get("target"),e=c.getAttribute("data-async")==="true",f=c.getAttribute("title")||"",g=this,h=g.get("remoteFailureText"),i={method:"GET",arguments:{dialog:g},on:{success:function(d,h,i){b.args=i,b.response=h;var j=a.one(a.config.doc.createDocumentFragment());j.append("<div>"+h.responseText+"</div>"),j=j.one("div"),j.setAttribute("data-async",e),j.setAttribute("title",f),b.dialogId=c.get("id"),b.template=j,b.domTarget=b.currentTarget,g.fire("getSuccess",b)},failure:function(d,i,j){b.args=j,b.response=i;var k=a.one(a.config.doc.createDocumentFragment());k.append("<div>"+h+"</div>"),k=k.one("div"),k.setAttribute("data-async",e),k.setAttribute("title",f),b.dialogId=c.get("id"),b.template=k,b.domTarget=b.currentTarget,g.fire("getFailure",b)}}};a.io(d,i)},open:function(b){var c=a.one(b),d={currentTarget:c,preventDefault:function(){},halt:function(){}};return this._dialogFromNode(d)},_triggerEventFn:function(a){this._dialogFromNode(a)},_dialogFromNode:function(b){var c=b.domTarget?b.domTarget:b.currentTarget,d=c.get("tagName")==="A"?c.get("href"):c.get("target"),f={},g=b.dialogId||d.substr(d.indexOf("#")),h=b.template||a.one(g),i=h?h.getAttribute("data-async")==="true":!1,j=this.panels[g],k=c.get("attributes"),l=[];if(c.hasClass(this.get("remoteClass"))&&!h)return b.preventDefault(),this._fetchDialogContent(b);k.each(function(a){var b=a.get("name");if(b.match(/^data-/)){var d=c.getAttribute(b);d!==null&&(f[b.substr(5)]=d)}});if(j||h){b.preventDefault(),j?h&&j.setStdModContent(a.WidgetStdMod.BODY,e(h.getContent(),f)):j=this._setupDialog(c,h,f);var m=j.get("contentBox").one("form");if(m){var n=a.bind(this._defSubmitButtonFn,this);j.formListener&&j.formListener.detach(),j.formListener=m.on("submit",function(a){a.preventDefault(),a.async=i,a.dialog=this,a.trigger=c,a.form=this.get("contentBox").one("form");if(!a.form)throw"Form disappeared, was the dialog content replaced incorrectly?";n(a)},j)}j.trigger=c,j.show(),this.fire("show",{dialog:j,trigger:c})}return j},_setupDialog:function(b,d,f){var g=this,h=b.getAttribute("title")||d.getAttribute("title")||"",i=e(d.getContent(),f),j=b.getAttribute("data-modal")||d.getAttribute("data-modal")||this.get("modal"),k=b.getAttribute("data-zindex")||this.get("zIndex"),l=null,m=d.getAttribute("data-async")==="true",n=a.bind(this._defSubmitButtonFn,this),o=this.get("closeLabel"),p=null,q=null;l=new c({headerContent:h,bodyContent:i,modal:j,centered:!0,zIndex:k,buttons:[{value:o,section:a.WidgetStdMod.HEADER,classNames:["closer"],action:function(a){this.hide()}}]}),l.render(this.container),l.get("boundingBox").addClass("yui3-dynamic-dialog");var r=d.getAttribute("data-dialog-class");r&&l.get("boundingBox").addClass(r.split(" ")),p=l.get("contentBox"),q=p.one("form");if(q){var s=d.getAttribute("data-cancel-class")||"";l.addButton({value:d.getAttribute("data-cancel-label")||this.get("cancelLabel"),classNames:["yui3-dynamic-dialog-cancel",s.split(" ")],action:function(a){a.preventDefault(),this.hide()},section:a.WidgetStdMod.FOOTER});var t=d.getAttribute("data-submit-class")||"";l.addButton({value:d.getAttribute("data-submit-label")||this.get("submitLabel"),classNames:["yui3-dynamic-dialog-submit",t.split(" ")],action:function(a){a.preventDefault(),a.async=m,a.dialog=this,a.trigger=this.trigger,a.form=this.get("contentBox").one("form");if(!a.form)throw"Form disappeared, was the dialog content replaced incorrectly?";n(a)},section:a.WidgetStdMod.FOOTER})}else{var u=d.getAttribute("data-ok-class")||"";l.addButton({value:d.getAttribute("data-ok-label")||this.get("okLabel"),classNames:["yui3-dynamic-dialog-ok",u.split(" ")],action:function(a){a.preventDefault(),this.hide()},section:a.WidgetStdMod.FOOTER})}return l.on("visibleChange",function(a){this.fire("visibleChange",{event:a,panel:l,template:d})},this),this.panels["#"+d.get("id")]=l,l},_defSubmitButtonFn:function(a){this.fire("submit",{dialog:a.dialog,trigger:a.trigger,form:a.form,async:a.async||!1})},_defSubmitFn:function(b){var c=b.dialog,d=b.form,e=b.async,f=b.trigger||c.trigger,g=d.getAttribute("action"),h=d.getAttribute("method")||"POST",i={};if(!e){c.hide(),d.submit();return}i.method=h.toUpperCase(),i.form={id:d},i.context=this,i.arguments={dialog:c,form:d,trigger:f,preventDefault:b.preventDefault},i.on={success:this._ioSuccess,failure:this._ioFailure},a.io(g,i)},_ioSuccess:function(a,b,c){c.dialog.hide(),c.response=b,this.fire("ioSuccess",c)},_ioFailure:function(b,c,d){var e=d.dialog,f=d.form,g=e.get("boundingBox"),h=this.get("ioFailureClass");d.response=c,this.fire("ioFailure",d),g.addClass(h),this._shakeNode(g,a.bind(function(){this.removeClass(h)},g)),c.responseText&&e.setStdModContent(a.WidgetStdMod.BODY,c.responseText)},_shakeNode:function(b,c){var d=b.getX(),e=b.getY(),f=d+5,g;return b.get("clientX"),g=new a.Anim({node:b,to:{xy:[f,e]},duration:.01,iterations:10,direction:"alternate"}),c&&typeof c=="function"&&g.on("end",c),g.run(),g}},{ATTRS:{modal:{value:!1},zIndex:{value:1},closeLabel:{value:"✕"},okLabel:{value:"OK"},cancelLabel:{value:"Cancel"},submitLabel:{value:"Submit"},remoteFailureText:{value:"<p>There was a problem fetching the dialog content. Sorry.</p>"},dialogClass:{value:"open-dialog"},remoteClass:{value:"remote-dialog"},ioFailureClass:{value:"yui3-dynamic-dialog-io-failure"}}}),a.DynamicDialog=b},"",{requires:["anim","substitute","widget","base","panel","io","io-form","event-delegate"]})