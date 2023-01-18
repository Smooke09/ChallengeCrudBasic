import { Router } from "express";
import StoresController from "./controllers/stores/stores-controllers";

const router = Router();

router.get("/stores", StoresController.getStores);
router.get("/stores/:id", StoresController.getStoreById);
router.get("/stores/:id/:date/isOpen", StoresController.storeIsOpen);
router.post("/stores/create", StoresController.createStore);
router.put("/stores/update/:id", StoresController.updateStore);
router.put("/stores/:id/business-hours", StoresController.updateBusinessHours);
router.put("/stores/:id/inactive", StoresController.inactiveStore);
router.delete("/stores/delete/:id", StoresController.storeDelete);

export default router;
