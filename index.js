var util = require("util"),
	clc = require("cli-color"),
	lib = require("cinovo-logger-lib");

function getColor(level) {
	"use strict";
	switch(level) {
		case "debug":
			return clc.blue;
		case "info":
			return clc.red.yellow;
		case "error":
			return clc.red.bold;
		case "critical":
			return clc.red.bold;
		default:
			return clc.white;
	}
}

function ConsoleEndpoint(debug, info, error, critial) {
	"use strict";
	lib.Endpoint.call(this, debug, info, error, critial, "console");
}
util.inherits(ConsoleEndpoint, lib.Endpoint);
ConsoleEndpoint.prototype._log = function(log, callback) {
	"use strict";
	var color = getColor(log.level),
		data = log.date.toString() + " " + color(log.level) + ": ";
	if (log.fullOrigin !== undefined) {
		data += "(" + log.origin + " | " + log.fullOrigin.file + "[" + log.fullOrigin.fn + "]:" + log.fullOrigin.line + ") ";
	} else if (log.origin !== undefined) {
		data += "(" + log.origin + ") ";
	}
	data += log.message;
	if (log.metadata !== undefined) {
		console.log(data, util.inspect(log.metadata, {depth: null}));
	} else {
		console.log(data);
	}
	callback();
};
ConsoleEndpoint.prototype._stop = function(callback) {
	"use strict";
	callback();
};

module.exports = function(debug, info, error, critical) {
	"use strict";
	return new ConsoleEndpoint(debug, info, error, critical);
};
