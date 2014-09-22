'use strict';

require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneValidation: {
            deps: [
                'underscore',
                'backbone'
            ]
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        backboneModelbinder: '../bower_components/backbone.modelbinder/Backbone.ModelBinder',
        backboneCollectionbinder: '../bower_components/backbone.modelbinder/Backbone.CollectionBinder',
        backboneStickit: '../bower_components/backbone.stickit/backbone.stickit',
        backboneValidation: '../bower_components/backbone-validation/dist/backbone-validation',
        text: '../bower_components/requirejs-text/text'
    }
});

define(function (require) {
    var Backbone = require('backbone'),
        BackboneValidation = require('backboneValidation'),
        User = require('model/user'),
        RegisterView = require('views/register'),
        UserView = require('views/user');

    // Since we are using 2-way binding to automatically update the model, we want the model
    // to hold invalid values.  This keeps stale values from persisting if the new input is invalid.
    // See: http://thedersen.com/projects/backbone-validation/#configuration/force-update
    Backbone.Validation.configure({
        forceUpdate: true
    });

    // Extend the callbacks to work with Bootstrap, as used in this example
    // See: http://thedersen.com/projects/backbone-validation/#configuration/callbacks
    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[id=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[id=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });

    // Initialize the application view
    var user = new User();
    var register = new RegisterView({
        el: '.register',
        model: user
    });
    register.initialize();
    register.render();

    var user = new UserView({
        el: '.user',
        model: user
    });
    user.initialize();
    user.render();
});