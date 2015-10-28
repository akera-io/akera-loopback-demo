module.exports = function(Customer) {

  Customer.getBalance = function(id, cb) {
    try {
      var akeraConn = Customer.dataSource.connector.connection;
      var p = akeraConn.call.parameter;

      akeraConn.call.procedure('demo/sports/getCustBalance.p').parameters(
          p.input(id, 'decimal'), // customer id
          p.output('decimal'), // balance
          p.output('decimal'), // total amt ordered
          p.output('decimal') // total amt invoiced
      ).run().then(function(result) {
        cb(null, {
          balance : result.parameters[0],
          ordered : result.parameters[1],
          invoiced : result.parameters[2]
        });
      }, function(err) {
        cb(err);
      });
    } catch (err) {
      cb(err);
    }
  };

  Customer.remoteMethod('getBalance', {
    description : 'Get a customer balance information',
    accepts : [ {
      arg : 'id',
      type : 'number',
      required : true,
      http : {
        source : "path"
      }
    } ],
    http : {
      verb : 'get',
      path : '/:id/balance'
    },
    returns : {
      arg : 'info',
      type : 'object',
      root : true
    }
  });

};
