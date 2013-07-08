var util = require("util"),
	clc = require("cli-color"),
	lib = require("cinovo-logger-lib");

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
	lib.Endpoint.call(this, debug, info, error, critial, "console");
}
util.inherits(ConsoleEndpoint, lib.Endpoint);
ConsoleEndpoint.prototype._log = function(log, callback) {
	var color = getColor(log.level);
	var data = log.date.toString() + " " + color(log.level) + ": ";
	if (log.fullOrigin !== undefined) {
		data += "(" + log.origin + " | " + log.fullOrigin.file + "[" + log.fullOrigin.fn + "]:" + log.fullOrigin.line + ") ";
	} else if (log.origin !== undefined) {
		data += "(" + log.origin + ") ";
	}
	data += log.message;
	if (log.metadata) {
		console.log(data, log.metadata);
	} else {
		console.log(data);
	}
	callback();
};
ConsoleEndpoint.prototype._stop = function(callback) {
	callback();
};

module.exports = function(debug, info, error, critical) {
	return new ConsoleEndpoint(debug, info, error, critical);
};
