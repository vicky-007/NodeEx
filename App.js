const Logger = require("./log");
const logger = new Logger();

logger.on("1stlog", e => console.log("lisrt called", e));

logger.log("mess");
