var events = require('events')
  , util = require('util')
  , net = require('net');

var timeout = 10000; //ms. Responce timeout


var Client = function (hostport) {
	var parsed, host, port;
	
	parsed = hostport.split(':');
	host = parsed[0];
	port = parseInt(parsed[1]);

	if(!net.isIP(host)) {
		throw new Error('Incorrect IP');
	}
	if(!port) {
		throw new Error('Incorrect port');
	}
	
	this.host = host;
	this.port = port;
	this.hostport = hostport;

};

util.inherits(Client, events.EventEmitter);

Client.prototype.check = function () {
	var client = this
	  , host = this.host
	  , port = this.port
	  , hostport = this.hostport
	  , s = new net.Socket();
	
	s.on('error', function () {
		reportDead();
	});
	
	s.connect(port, host, function () {
		
		s.setTimeout(timeout);
		s.on('timeout', function () {
			reportDead();
		});
		s.write('connect_1', function () {
			s.once('data', function (res) {
				if(res[0] === 0x55 && res.length === 1) {
					reportAlive();
				} else {
					reportDead();
				}
			});
		});
	});
	
	
	function reportDead () {
		client.emit('dead', hostport);
		s.destroy();
	}

	function reportAlive () {
		client.emit('alive', hostport);
		s.destroy();
	}
};


//----------------------------------------------------------------------

exports.Client = Client;
