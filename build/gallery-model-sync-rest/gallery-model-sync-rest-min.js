YUI.add("gallery-model-sync-rest",function(h){var d=h.Lang,c=d.sub,g=d.isValue,a=d.isString,b=d.isNumber,f=d.isFunction;function e(){}e.HTTP_METHODS={"create":"POST","read":"GET","update":"PUT","delete":"DELETE"};e.HTTP_HEADERS={"Accept":"application/json","Content-Type":"application/json"};e.HTTP_TIMEOUT=30000;e.EMULATE_HTTP=false;e.CSRF_TOKEN=YUI.Env.CSRF_TOKEN;e._NON_ATTRS_CFG=["root","url"];e.prototype={root:"",url:function(){var i=this.root,j;if(this._isYUIModelList||this.isNew()){return i;}j=this.getAsURL("id");if(i&&i.charAt(i.length-1)==="/"){j+="/";}return this._joinURL(j);},initializer:function(i){i||(i={});g(i.url)&&(this.url=i.url);},sync:function(l,q,p){q||(q={});var j=this._getURL(l),i=e.HTTP_METHODS[l],k=h.merge(e.HTTP_HEADERS,q.headers),o=q.timeout||e.HTTP_TIMEOUT,n=q.csrfToken||e.CSRF_TOKEN,m;if(i==="POST"||i==="PUT"){m=this._serialize();}else{delete k["Content-Type"];}if(e.EMULATE_HTTP&&(i==="PUT"||i==="DELETE")){k["X-HTTP-Method-Override"]=i;i="POST";}if(n&&(i==="POST"||i==="PUT"||i==="DELETE")){k["X-CSRF-Token"]=n;}h.io(j,{method:i,headers:k,data:m,timeout:o,on:{success:function(s,r){if(f(p)){p(null,r.responseText);}},failure:function(s,r){if(f(p)){p({code:r.status,msg:r.statusText},r.responseText);}}}});},_getURL:function(k){var i=this.url,j;if(f(i)){return this.url(k);}if(this._isYUIModel){j={};h.Object.each(this.toJSON(),function(m,l){if(a(m)||b(m)){j[l]=encodeURIComponent(m);}});i=c(i,j);}return i||this.root;},_joinURL:function(j){var i=this.root;if(j.charAt(0)==="/"){j=j.substring(1);}return i&&i.charAt(i.length-1)==="/"?i+j:i+"/"+j;},_serialize:function(){return h.JSON.stringify(this);}};h.namespace("ModelSync").REST=e;},"@VERSION@",{skinnable:false,requires:["model","model-list","io-base","json-stringify"]});