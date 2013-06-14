Console Endpoint for cinovo-logger.

# Getting started

## At first you must require the logger.

    var logger = require("cinovo-logger");

## How to append the cinovo-logger-console Endpoint

    var logger = require("cinovo-logger");
    logger.append(require("cinovo-logger-console")(true, true, true, true));

## How to use the logger

### debug

    logger.debug("myscript", "all values are ok", {a: 1, b: 2});

### info

    logger.info("myscript", "all values are ok", {a: 1, b: 2});

### error

    logger.error("myscript", "some values are not ok", {a: 1, b: 2});
    logger.exception("myscript", "some values are not ok", new Error("values are not ok"));

### critical

    logger.critical("myscript", "all values are not ok", {a: 1, b: 2});

# Console Endpoint

The Console Endpoint prints to console.

## Configuration

If you set `debug` to `true` you will see debug logs.
If you set `info` to `true` you will see info logs.
If you set `error` to `true` you will see error logs.
If you set `critical` to `true` you will see critical logs.

    logger.append(require("cinovo-logger-console")(debug, info, error, critical));
