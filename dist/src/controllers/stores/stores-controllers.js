"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storesUseCases_1 = __importDefault(require("../../useCases/storesUseCases"));
const parseBusinessHours_1 = require("../../useCases/helpers/parseBusinessHours");
const filterStoresInactive_1 = require("../../useCases/helpers/filterStoresInactive");
class StoresController {
    getStores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield storesUseCases_1.default.getStores();
            const { active } = req.query;
            const storesInactive = (0, filterStoresInactive_1.filterStoresInactive)(stores);
            if (active === "true") {
                return res.status(200).json({
                    message: "Stores found successfully",
                    stores: storesInactive.map((store) => (0, parseBusinessHours_1.parseBusinessHours)(store)),
                });
            }
            const storesParsed = stores.map((store) => (0, parseBusinessHours_1.parseBusinessHours)(store));
            const storesInactiveParsed = storesParsed.filter((store) => store.store_is_active === true);
            return res.status(200).json({
                message: "Store created successfully",
                stores: storesInactiveParsed,
            });
        });
    }
    getStoreById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const store = yield storesUseCases_1.default.getStoreById(Number(id));
            if (!store) {
                return res.status(400).json({
                    message: "Store not found",
                });
            }
            return res.status(200).json({
                message: "Store found successfully",
                store: (0, parseBusinessHours_1.parseBusinessHours)(store),
            });
        });
    }
    createStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = req.body;
            const newStore = yield storesUseCases_1.default.createStore(store);
            if (newStore.message) {
                return res.status(400).json({
                    message: newStore.message,
                });
            }
            return res.status(201).json({
                message: "Store created successfully",
                store: Object.assign(Object.assign({}, newStore), { store_business_hours: JSON.parse(newStore.store_business_hours) }),
            });
        });
    }
    updateStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const store = req.body;
            const updatedStore = yield storesUseCases_1.default.updateStore(Number(id), store);
            if (!updatedStore)
                return res.status(400).json({
                    message: "Store not found",
                });
            return res.status(200).json({
                message: "Store updated successfully",
                store: (0, parseBusinessHours_1.parseBusinessHours)(updatedStore),
            });
        });
    }
    updateBusinessHours(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { store_business_hours } = req.body;
            const updatedStore = yield storesUseCases_1.default.updateBusinessHours(Number(id), store_business_hours);
            if (!updatedStore)
                return res.status(400).json({
                    message: "Store not found",
                });
            return res.status(200).json({
                message: "Store updated business hours",
                store: (0, parseBusinessHours_1.parseBusinessHours)(updatedStore),
            });
        });
    }
    inactiveStore(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const store = yield storesUseCases_1.default.inactiveStore(Number(id));
            if (!store)
                return res.status(400).json({
                    message: "Store not found",
                });
            return res.status(200).json({
                message: "Store updated successfully",
                store: (0, parseBusinessHours_1.parseBusinessHours)(store),
            });
        });
    }
    storeIsOpen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, date } = req.params;
            const newDate = new Date(decodeURI(date));
            const store = yield storesUseCases_1.default.getStoreById(Number(id));
            if (!store)
                return res.status(400).json({
                    message: "Store not found",
                });
            const isOpen = yield storesUseCases_1.default.storeIsOpen(Number(id), newDate);
            return res.status(201).json({
                isOpen,
            });
        });
    }
    storeDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const store = yield storesUseCases_1.default.storeDeletePermanent(Number(id));
            if (!store)
                return res.status(400).json({
                    message: "Store not found",
                });
            return res.status(201).json({
                message: "Store deleted successfully",
            });
        });
    }
}
exports.default = new StoresController();
