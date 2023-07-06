const express = require('express');
const router = new express.Router();

// ===

const { getAllOperations, getOperationById, addOperation, updateOperation, removeOperation } = require('../controllers/operation.controller');

// ===

express.Router.prefix = function (path, subRouter) {
    const router = express.Router();
    this.use(path, router);
    subRouter(router);
    return router;
}

// ===

router.prefix("/", (adminRouter) => {
    adminRouter.get("/", getAllOperations);
    adminRouter.get("/:id", getOperationById);
    adminRouter.post("/", addOperation);
    adminRouter.put("/:id", updateOperation);
    adminRouter.delete("/:id", removeOperation);
});

// ===

module.exports = router;