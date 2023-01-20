"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stores_controllers_1 = __importDefault(require("./controllers/stores/stores-controllers"));
const router = (0, express_1.Router)();
router.get("/stores", stores_controllers_1.default.getStores);
router.get("/stores/:id", stores_controllers_1.default.getStoreById);
router.get("/stores/:id/:date/isOpen", stores_controllers_1.default.storeIsOpen);
router.post("/stores/create", stores_controllers_1.default.createStore);
router.put("/stores/update/:id", stores_controllers_1.default.updateStore);
router.put("/stores/:id/business-hours", stores_controllers_1.default.updateBusinessHours);
router.put("/stores/:id/inactive", stores_controllers_1.default.inactiveStore);
router.delete("/stores/delete/:id", stores_controllers_1.default.storeDelete);
exports.default = router;
