const express = require('express');
const router = new express.Router();

// ===

const { getAllCurrencyTypes, getCurrencyTypeById, addCurrencyType, updateCurrencyType, removeCurrencyType } = require('../controllers/currency_type.controller');

// ===

express.Router.prefix = function (path, subRouter) {
    const router = express.Router();
    this.use(path, router);
    subRouter(router);
    return router;
}

// ===

router.prefix("/", (currencyTypesRouter) => {
    currencyTypesRouter.get("/", getAllCurrencyTypes);
    currencyTypesRouter.get("/:id", getCurrencyTypeById);
    currencyTypesRouter.post("/", addCurrencyType);
    currencyTypesRouter.put("/:id", updateCurrencyType);
    currencyTypesRouter.delete("/:id", removeCurrencyType);
});

// ===

module.exports = router;