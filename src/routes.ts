import { Router } from "express";
import StoresController from "./controllers/stores/stores-controllers";

const router = Router();

router.get("/stores", StoresController.getStores);
router.get("/stores/:id", StoresController.getStoreById);
router.post("/stores", StoresController.createStore);
router.put("/stores/:id", StoresController.updateStore);
router.put("/stores/:id/business-hours", StoresController.updateBusinessHours);
router.put("/stores/:id/inactive", StoresController.inactiveStore);
router.get("/stores/:id/:date/isOpen", StoresController.storeIsOpen);
router.delete("/stores/:id", StoresController.storeDelete);

export default router;
