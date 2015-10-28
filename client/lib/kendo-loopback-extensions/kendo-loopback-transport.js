if (!jQuery)
    throw new Error('kendo.Akera requires jQuery!');
kendo.Akera = kendo.Akera || {};
var LoopbackTransport = function(lbModel) {
    if (!lbModel)
        throw new Error('Invalid loopback model specified');
    this.lbModel = lbModel;
}
jQuery.extend(true, LoopbackTransport.prototype, {
    read: function(options) {
            var lbModel = this.lbModel;
            var filter = {};
            var self = this;
            filter.limit = options.data.pageSize || null;
            if (this.dataSource.options.serverPaging === true && options.data.page && options.data.page > 1) {
                filter.offset = options.data.skip + 1;
            }
            if (this.dataSource.options.serverSorting === true && options.data.sort) {
                filter.order = [];
                options.data.sort.forEach(function(sort) {
                    filter.order.push(sort.field + ' ' + sort.dir.toUpperCase());
                });
            }
            if (this.dataSource.options.serverFiltering === true && options.data.filter) {
                jQuery.extend(true, filter, kendo.Akera.Filter.convert(options.data.filter, false));
            }
            lbModel.find({
                filter: filter
            }).$promise.then(function(rs) {
                if (self.dataSource.options.serverPaging === true) {
                    lbModel.count().$promise.then(function(resp) {
                        rs[self.dataSource.options.schema.total] = resp.count;
                        options.success(rs);
                    });
                } else {
                    options.success(rs);
                }
            });
        }
        //TODO: Implement CUD operations
})
kendo.Akera.DataSource = kendo.data.DataSource.extend({
    init: function(options) {
        if (!options.lbModel)
            throw new Error('Invalid loopback model specified');
        var transport = new LoopbackTransport(options.lbModel);
        transport.dataSource = this;
        options.transport = transport;
        options.serverFiltering = options.serverFiltering || true;
        options.serverPaging = options.serverPaging || true;
        options.serverSorting = options.serverSorting || true;
        options.schema = options.schema || {};
        options.schema.total = options.schema.total || 'count';
        kendo.data.DataSource.fn.init.call(this, options);
    }
});
