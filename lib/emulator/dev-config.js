//You may define servers manually


/*
exports.servers = [
	'0.0.0.0:8100'
  , '0.0.0.0:8101'
  , '0.0.0.0:8102'
  , '0.0.0.0:8103'
  , '0.0.0.0:8104'
  , '0.0.0.0:8105'
  , '0.0.0.0:8106'
  , '0.0.0.0:8107'
];
*/


//...or huge number of servers the way like this:

exports.servers = [];

for(var port = 10500; port <= 10600; port++) {
	exports.servers.push('0.0.0.0:'+port);
}

