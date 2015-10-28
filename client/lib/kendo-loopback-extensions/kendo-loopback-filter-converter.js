kendo.Akera = kendo.Akera || {};
kendo.Akera.Filter = {};

jQuery.extend(true, kendo.Akera.Filter, {
    getClause: function(flt) {
        var clause = {};
        switch (flt.operator) {
            case 'eq':
                clause[flt.field] = flt.value;
                break;
            case 'neq':
                clause[flt.field] = {
                    neq: flt.value
                };
                break;
            case 'gte':
                clause[flt.field] = {
                    gte: flt.value
                };
                break;
            case 'lte':
                clause[flt.field] = {
                    lte: flt.value
                };
                break;
            case 'lt':
                clause[flt.field] = {
                    lt: flt.value
                };
                break;
            case 'gt':
                clause[flt.field] = {
                    gt: flt.value
                };
                break;
            case 'contains':
                clause[flt.field] = {
                    like: '*' + flt.value + '*'
                };
                break;
            case 'startswith':
                clause[flt.field] = {
                    like: flt.value + '*'
                };
                break;
            case 'endswith':
                clause[flt.field] = {
                    like: '*' + flt.value
                };
                break;
            default:
                throw new TypeError('Filter operator ' + flt.operator + ' is not supported.');
        }
        return clause;
    },
    recursiveFilter: function(filter) {
        var self = this;
        var lbFlt = {};
        if (filter.filters) {
            lbFlt[filter.logic] = [];
            filter.filters.forEach(function(flt) {
                lbFlt[filter.logic].push(self.recursiveFilter(flt));
            });
            return lbFlt;
        } else return this.getClause(filter);
    },
    convert: function convert(filter, update) {
        var lbFilter = this.recursiveFilter(filter);
        return update === true ? lbFilter : {
            where: lbFilter
        };
    }
})
