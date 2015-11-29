/**
 * Created by roxana on 28.11.2015.
 */
var configuration = require('../configuration.json');

function ArchaeiusConfigurationResolver() {
    console.log('Archaeius property solver started.')
}

ArchaeiusConfigurationResolver.prototype.resolve = function(configuration,propertyName) {
    if(!configuration.propertyName) {
        return;
    } else if(configuration.propertyName != 'undefined' && configuration.propertyName != null) {
        return configuration.propertyName;
    } else {
        for(key in configuration) {

        }
    }
};


module.exports = ArchaeiusConfigurationResolver;