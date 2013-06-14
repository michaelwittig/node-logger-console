var util = require("util"),
	clc = require("cli-color"),
	logger = require("cinovo-logger");

function getColor(level) {
	switch(level) {
		case "debug":
			return clc.blue;
		case "info":
			return clc.red.yellow;
		case "err":
			return clc.red.bold;
		case "crit":
			return clc.red.bold;
		default:
			return clc.white;
	}
}

function ConsoleEndpoint(debug, info, error, critial) {
	logger.Endpoint.call(this, debug, info, error, critial);
}
util.inherits(ConsoleEndpoint, logger.Endpoint);
ConsoleEndpoint.prototype.log = function(log, errCallback) {
	var color = getColor(log.level);
	if (log.metadata) {
		console.log(log.date.toUTCString() + " " + color(log.level) + ": (" + log.origin + ") " + log.message, log.metadata);
	} else {
		console.log(log.date.toUTCString() + " " + color(log.level) + ": (" + log.origin + ") " + log.message);
	}
	errCallback();
};

modue.exports = function(debug, info, error, critical) {
	return new ConsoleEndpoint(debug, info, error, critical);
};


