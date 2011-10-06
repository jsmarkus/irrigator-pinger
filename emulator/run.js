var net = require('net')
  , device = require('./device')
  , config = require('./dev-config');


config.servers.forEach(function (srv) {
	device.listen(srv);
});

