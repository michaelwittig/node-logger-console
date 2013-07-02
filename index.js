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
	logger.Endpoint.call(this, debug, info, error, critial, "console");
}
util.inherits(ConsoleEndpoint, logger.Endpoint);
ConsoleEndpoint.prototype.log = function(log, errCallback) {
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
	errCallback();
};
ConsoleEndpoint.prototype.stop = function(errCallback) {
	try {
		errCallback();
	} finally  {
		this.emit("stop");
	}
};

module.exports = function(debug, info, error, critical) {
	return new ConsoleEndpoint(debug, info, error, critical);
};


