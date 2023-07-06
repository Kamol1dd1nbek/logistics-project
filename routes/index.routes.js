const { Router } = require("express");
const router = new Router();

// ===

const adminRouter = require("./admin.routes");

// ===

router.use("/admin", adminRouter);

// ===

module.exports = router;