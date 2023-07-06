const express = require('express');
const router = new express.Router();

// ===

const { getAlladmins, getAdminById, addAdmin, updateAdmin, removeAdmin } = require('../controllers/admin.controller');

// ===

express.Router.prefix = function (path, subRouter) {
    const router = express.Router();
    this.use(path, router);
    subRouter(router);
    return router;
}

// ===

router.prefix("/", (adminRouter) => {
    adminRouter.get("/", getAlladmins);
    adminRouter.get("/:id", getAdminById);
    adminRouter.post("/", addAdmin);
    adminRouter.put("/:id", updateAdmin);
    adminRouter.delete("/:id", removeAdmin);
});

// ===

module.exports = router;