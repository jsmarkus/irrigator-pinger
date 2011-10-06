var net = require('net');

exports.listen = function (hostport) {
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
	
	net.createServer(function (c) {
		c.setEncoding('utf8');
		
		c.on('data', function (data) {
			if(undefined === data) {
				console.log('Error');
				return;
			}
			var line = String(data).replace(/^\s+|\s+$/, '');
			console.log('READ:', line);
			switch(line) {
				case 'connect_1':
					connect_1();
				break;
				
				default:
					c.write('Unknown command\n', function () {
						console.log('CLOSING');
						c.end();
					});
				break;
			}
		});
		
		function connect_1 () {
			var delay = Math.floor(Math.random() * 10000);
			c.pause();
			setTimeout(function () {
				c.resume();
				c.write(new Buffer([0x55]));
			}, delay);
		}
		
	}).listen(port, host);
}
