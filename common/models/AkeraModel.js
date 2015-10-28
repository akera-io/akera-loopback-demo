module.exports = function(AkeraModel) {
    AkeraModel.describe = function(cb) {
        var definition = this.definition;
        var description = {
            name: definition.name,
            fields: definition.rawProperties
        }
        for (var field in description.fields) {
            description.fields[field].nullable = !description.fields[field].required || false;
            description.fields[field].editable = true;
            if (description.fields[field].id === true) {
                description.id = field;
                description.fields[field].editable = false;
                delete description.fields[field].id;
            }
            delete description.fields[field].required;
        }
        cb(null,{ description: description });
    }


    AkeraModel.setup = function() {
        AkeraModel.base.setup.apply(this, arguments);
        this.remoteMethod('describe', {
            description: 'Get a full description of the model',
            returns: {
                arg: 'description',
                root: true
            },
            http: {
                verb: 'GET'
            }
        });
    };
    AkeraModel.setup();
}
