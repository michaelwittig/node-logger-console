var assert = require("assert-plus"),
	stream = require("stream"),
	util = require("util"),
	endpoint = require("../index");

var EMPTY_CB = function() {
	"use strict";
	return undefined;
};

// https://gist.github.com/pguillory/729616
function hook_stdout(callback) {
	"use strict";
	var old_write = process.stdout.write;
	process.stdout.write = function(string, encoding, fd) {
		old_write.apply(process.stdout, arguments);
		callback(string, encoding, fd);
	};
	return function() {
		process.stdout.write = old_write;
	};
}

describe("console", function() {
	"use strict";
	describe("debug()", function() {
		it("should work with level and message", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "debug",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("debug") !== -1, "console out: level");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message and origin", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "debug",
				origin: "test",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("debug") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "debug",
				origin: "test",
				message: "message",
				metadata: {a: 1}
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("debug") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("{ a: 1 }") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata = Boolean false", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "debug",
				origin: "test",
				message: "message",
				metadata: false
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("debug") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("false") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
	});
	describe("info()", function() {
		it("should work with level and message", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "info",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("info") !== -1, "console out: level");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message and origin", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "info",
				origin: "test",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("info") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "info",
				origin: "test",
				message: "message",
				metadata: {a: 1}
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("info") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("{ a: 1 }") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata = Boolean false", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "info",
				origin: "test",
				message: "message",
				metadata: false
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("info") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("false") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
	});
	describe("info()", function() {
		it("should work with level and message", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "error",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("error") !== -1, "console out: level");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message and origin", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "error",
				origin: "test",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("error") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "error",
				origin: "test",
				message: "message",
				metadata: {a: 1}
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("error") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("{ a: 1 }") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata = Boolean false", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "error",
				origin: "test",
				message: "message",
				metadata: false
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("error") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("false") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
	});
	describe("critical()", function() {
		it("should work with level and message", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "critical",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("critical") !== -1, "console out: level");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message and origin", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "critical",
				origin: "test",
				message: "message"
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("critical") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "critical",
				origin: "test",
				message: "message",
				metadata: {a: 1}
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("critical") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("{ a: 1 }") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
		it("should work with level, message, origin and metadata = Boolean false", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "critical",
				origin: "test",
				message: "message",
				metadata: false
			},
			unhook = hook_stdout(function(string) {
				unhook();
				assert.ok(string.indexOf("critical") !== -1, "console out: level");
				assert.ok(string.indexOf("test") !== -1, "console out: origin");
				assert.ok(string.indexOf("message") !== -1, "console out: message");
				assert.ok(string.indexOf("false") !== -1, "console out: metadata");
				done();
			});
			endpoint(true, true, true, true).log(log, EMPTY_CB);
		});
	});
});
