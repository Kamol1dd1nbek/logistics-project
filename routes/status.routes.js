const express = require('express');
const router = new express.Router();

// ===

const { getAllStatus, getStatusById, addStatus, updateStatus, removeStatus } = require('../controllers/status.controller');

// ===

express.Router.prefix = function (path, subRouter) {
    const router = express.Router();
    this.use(path, router);
    subRouter(router);
    return router;
}

// ===

router.prefix("/", (statusRouter) => {
    statusRouter.get("/", getAllStatus);
    statusRouter.get("/:id", getStatusById);
    statusRouter.post("/", addStatus);
    statusRouter.put("/:id", updateStatus);
    statusRouter.delete("/:id", removeStatus);
});

// ===

module.exports = router;