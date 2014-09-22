define( function (require) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        Stickit = require('backboneStickit'),
        User = require('model/user'),
        templateHtml = require('text!templates/register.html');

    var AppView = Backbone.View.extend({
        events: {
            'click #register-user': function (e) {
                e.preventDefault();
                this.registerUser();
            }
        },

        template: _.template(templateHtml),

        // Use stickit to perform binding between the model and the view
        // Include the validation option for fields that have Backbone.Validation in the model
        bindings: {
            '#firstname': {
                observe: 'firstname',
                setOptions: {
                    validate: true
                }
            },
            '#lastname': {
                observe: 'lastname',
                setOptions: {
                    validate: true
                }
            },
            '#email': {
                observe: 'email',
                setOptions: {
                    validate: true
                }
            },
            '#phone': {
                observe: 'phone',
                onGet: function(value) {
                    // Format as (555) 555-5555
                    return _.isUndefined(value) ? '' : value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                },
                onSet: function(value) {
                    // Only allow numbers
                    return value.replace(/[^0-9]/g, '');
                },
                setOptions: {
                    validate: true
                }
            },
            '#country': {
                observe: 'country',
                selectOptions: {
                    collection: function() {
                        return ['United States', 'Germany', 'France', 'Japan'];
                    }
                },
                setOptions: {
                    validate: true
                }
            },
            '#password': {
                observe: 'password',
                setOptions: {
                    validate: true
                }
            },
            '#repeatPassword': {
                observe: 'repeatPassword',
                setOptions: {
                    validate: true
                }
            },
            '#age': {
                observe: 'age',
                setOptions: {
                    validate: true
                }
            },
            '#terms': {
                observe: 'terms',
                setOptions: {
                    validate: true
                }
            }
        },

        initialize: function (args) {
            Backbone.Validation.bind(this);
        },

        render: function () {
            this.$el.html(this.template());
            this.stickit();
        },

        remove: function() {
            Backbone.Validation.unbind(this);
        },

        registerUser: function () {
            // See: http://thedersen.com/projects/backbone-validation/#methods/isvalid
            if(this.model.isValid(true)) {
                // this.model.save();
                alert('Register Successful!');
            }
        }
    });

    return AppView;
});