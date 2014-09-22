define( function (require) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        Stickit = require('backboneStickit'),
        User = require('model/user'),
        templateHtml = require('text!templates/user.html');

    var AppView = Backbone.View.extend({
        events: {
        },

        template: _.template(templateHtml),
        bindings: {
            '[name=fullname]': {
                observe: ['firstname', 'lastname'],
                onGet: function(values, options) {
                    // Use grep to filter out 'undefined' values
                    return jQuery.grep(values, Boolean).join(' ');
                }
            },
            '#email': 'email',
            '#phone': 'phone',
            '#country': 'country',
            '#password': 'password',
            '#age': 'age',
            '#terms': 'terms'
        },

        initialize: function (args) {
        },

        render: function () {
            this.$el.html(this.template());
            this.stickit();
        },

        remove: function() {
            Backbone.Validation.unbind(this);
        }
    });

    return AppView;
});