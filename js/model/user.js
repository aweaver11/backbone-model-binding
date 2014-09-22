define( function (require) {
    var _ = require('underscore'),
        Backbone = require('backbone');

    return Backbone.Model.extend({
        validation: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            email: {
                required: true,
                pattern: 'email'
            },
            country: {
                oneOf: ['United States', 'Germany']
            },
            password: {
                minLength: 8
            },
            repeatPassword: {
                equalTo: 'password',
                msg: 'The passwords does not match'
            },
            age: {
                required: false,
                range: [18, 100]
            },
            terms: {
                acceptance: true
            }
        }
    });
});