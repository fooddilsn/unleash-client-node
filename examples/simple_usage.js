var unleash = require('./unleash');
var util = require('util');

function ActiveForUserWithEmailStrategy() {
    this.name = 'ActiveForUserWithEmail';
}

util.inherits(ActiveForUserWithEmailStrategy, unleash.Strategy);

ActiveForUserWithEmailStrategy.prototype.isEnabled = function(parameters, context) {
    return parameters.emails.indexOf(context.email) !== -1;
};

unleash.initialize({
    url: 'http://unleash.herokuapp.com/features',
    refreshIntervall: 10000,
    strategies: [new ActiveForUserWithEmailStrategy()]
});

console("Fetching toggles from: http://unleash.herokuapp.com");

setInterval(function() {
    console.log("featureX enabled: " + unleash.isEnabled("featureX"));
}, 1000);
