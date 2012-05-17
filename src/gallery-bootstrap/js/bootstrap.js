/**

This sets up the Twitter Bootstrap Data API automatically, and loads all
Twitter Bootstrap components.

@module gallery-bootstrap
**/

/**
Twitter's Bootstrap is a great starting place and has many convenient
JavaScript behaviors. The only problem is that they use jQuery. Worry
no more, as you can use this for all small controls and if you need the
larger controls, you have the option of using `gallery-bootstrap` or the
other individual pieces:

 * `gallery-bootstrap-tooltip`
 * `gallery-bootstrap-tabview`
 * `gallery-bootstrap-scrollspy`

See http://jshirley.github.com/bootstrap/javascript.html for more
information on this fork.

You will need to include the Bootstrap CSS. This is only the JavaScript.

    YUI().use('gallery-bootstrap');

See http://twitter.github.com/bootstrap/javascript.html for more
information.

Everything works through Plugins or through delegation through selectors
on the document.

    // You can plugin the Alert
    Y.all('div.alert').plug( Y.Bootstrap.Alert );

    // Or setup delegation:
    Y.Bootstrap.alert_delegation();

    // Also a JS method to dismiss
    var node = Y.one('div.alert');
    node.plug( Y.Bootstrap.Alert );
    node.alert.dismiss();

There are selectors you can use to narrow down and implement several tooltips
at once. The most sensible example is to match any link with a `rel="tooltip"`
attribute.

    new Y.Bootstrap.Tooltip({ selector : '*[rel=tooltip]' });

@class Bootstrap
**/

var NS = Y.namespace('Bootstrap');

NS.initializer = function(e) {
    Y.log('initializer!');

    NS.dropdown_delegation();
    NS.alert_delegation();
    NS.expandable_delegation();

    Y.all('*[data-provide=typeahead]').plug( NS.Typeahead );

    Y.all('*[data-toggle=tab]').each( function(node) {
        var tabview = new NS.TabView({ node: node });
    } );

    Y.one('body').delegate(
        'click',
        function(e) {
            var target    = e.currentTarget,
                options   = target.getData(),
                direction = options.slide,
                carousel_id,
                carousel;

            carousel_id = Y.one( this.getData('target') );
            if ( !carousel_id ) {
                carousel_id = this.get('href');
                if ( carousel_id ) {
                    carousel_id = carousel_id.replace(/.*(?=#[^\s]+$)/, '');
                    Y.log('finding ' + carousel_id);
                    carousel = Y.one( carousel_id );
                }
            }
            if ( carousel ) {
                // Only prevent if there is actually a carousel
                e.preventDefault();

                if ( ! carousel.carousel ) {
                    carousel.plug( NS.Carousel, options );
                }
                Y.log('Direction: ' + direction);
                carousel.carousel[direction]();
            }
        },
        '*[data-slide]'
    );

    Y.one('body').delegate(
        'click',
        function(e) {
            var target    = e.currentTarget,
                options   = target.getData(),
                id,
                node,

                type = 'modal';

            id = Y.one( this.getData('target') );
            if ( !id ) {
                id = this.get('href');
                if ( id ) {
                    id = id.replace(/.*(?=#[^\s]+$)/, '');
                    node = Y.one( id );
                }
            }
            if ( node ) {
                // Only prevent if there is actually a carousel
                e.preventDefault();

                if ( ! node[type] ) {
                    node.plug( NS.Modal, options );
                }
                node[type].show();
            }
        },
        '*[data-toggle=modal]'
    );
};

Y.on('domready', NS.initializer);

