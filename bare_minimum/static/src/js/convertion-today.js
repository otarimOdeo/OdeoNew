odoo.define('bare_minimum.new', function (require) {
"use strict";


var AbstractAction = require('web.AbstractAction');
var core = require('web.core');


var MyClientAction = AbstractAction.extend({
    template: 'convertion-today'

});




core.action_registry.add('bare_minimum', MyClientAction);
return MyClientAction

});

