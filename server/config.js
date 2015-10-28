var prompt = require('inquirer').prompt;
var path = require('path');
var fs = require('fs');
var config = require('./config.json');
var datasources = require('./datasources.json');

prompt([ {
  name : "port",
  message : "Port that the demo application will start on",
  filter : Number,
  validate : function(input) {
    return !isNaN(parseInt(input)) || 'Port must be a number';
  },
  "default" : config.port
}, {
  name : "akhost",
  message : "Akera server host name or ip address",
  "default" : datasources.akera.host
}, {
  name : "akport",
  message : "Akera server port number",
  filter : Number,
  validate : function(input) {
    return !isNaN(parseInt(input)) || 'Port must be a number';
  },
  "default" : datasources.akera.port
}, {
  name : "akssl",
  message : "Use SSL connection to Akera server",
  "default" : datasources.akera.useSSL,
  type : "confirm"
}, {
  name : "akdb",
  message : "Logical name of a 'sports2000' database on Akera server",
  "default" : datasources.akera.database
} ], function(response) {
  saveConfig(config, datasources, response);
});

function saveConfig(config, datasources, response) {
  prompt([ {
    type : 'confirm',
    message : 'Save changes',
    name : 'ok',
    'default' : true
  } ], function(answer) {
    if (answer.ok) {
      try {
        config.port = response.port;
        datasources.akera.host = response.akhost;
        datasources.akera.port = response.akport;
        datasources.akera.useSSL = response.akssl;
        datasources.akera.database = response.akdb;

        fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(
            config, null, '\t'));
        fs.writeFileSync(path.join(__dirname, 'datasources.json'), JSON
            .stringify(datasources, null, '\t'));
      } catch (err) {
        console.log('Unable to save configuration: ' + err.message);
      }
    }
  });
}
