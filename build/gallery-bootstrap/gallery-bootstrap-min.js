YUI.add("gallery-bootstrap",function(b){var a=b.namespace("Bootstrap");a.initializer=function(c){new a.Tooltip({selector:"*[rel=tooltip]"});a.dropdown_delegation();a.alert_delegation();a.expandable_delegation();b.all("*[data-provide=typeahead]").plug(a.Typeahead);};b.on("domready",a.initializer);},"@VERSION@",{requires:["gallery-bootstrap-misc","gallery-bootstrap-tooltip","gallery-bootstrap-tabview"]});