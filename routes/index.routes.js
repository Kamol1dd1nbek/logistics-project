const { Router } = require("express");
const router = new Router();

// ===

const adminRouter = require("./admin.routes");
const operationRouter = require("./operation.routes");
const currencyTypesRouter = require("./currency_type.routes");
const statusRouter = require("./status.routes");

// ===

router.use("/admin", adminRouter);
router.use("/operation", operationRouter);
router.use("/currency-type", currencyTypesRouter);
router.use("/status", statusRouter);

// ===

module.exports = router;