const { Router } = require("express");
const router = new Router();

// ===

const adminRouter = require("./admin.routes");
const operationRouter = require("./operation.routes");

// ===

router.use("/admin", adminRouter);
router.use("/operation", operationRouter);

// ===

module.exports = router;