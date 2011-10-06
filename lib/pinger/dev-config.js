//You may define servers manually


/*
exports.servers = [
	'127.0.0.1:8100'
  , '127.0.0.1:8101'
  , '127.0.0.1:8102'
  , '127.0.0.1:8103'
  , '127.0.0.1:8104'
  , '127.0.0.1:8105'
  , '127.0.0.1:8106'
  , '127.0.0.1:8107'
];
*/


//...or huge number of servers the way like this:

exports.servers = [];

for(var port = 10500; port <= 10600; port++) {
	exports.servers.push('127.0.0.1:'+port);
}

//Adding inexistent server

exports.servers.push('127.0.0.1:10601');
