const express = require('express');
const router = new express.Router();

// ===

const { getAllOrders, getOrderById, addOrder, updateOrder, removeOrder } = require('../controllers/order.controller');

// ===

express.Router.prefix = function (path, subRouter) {
    const router = express.Router();
    this.use(path, router);
    subRouter(router);
    return router;
}

// ===

router.prefix("/", (orderRouter) => {
    orderRouter.get("/", getAllOrders);
    orderRouter.get("/:id", getOrderById);
    orderRouter.post("/", addOrder);
    orderRouter.put("/:id", updateOrder);
    orderRouter.delete("/:id", removeOrder);
});

// ===

module.exports = router;