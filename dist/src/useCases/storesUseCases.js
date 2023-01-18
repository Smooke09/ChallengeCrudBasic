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
exports.StoresUsesCases = void 0;
const storeModel_1 = __importDefault(require("../model/storeModel"));
class StoresUsesCases {
    getStores() {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield storeModel_1.default.query();
            return stores;
        });
    }
    getStoreById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield storeModel_1.default.query().findById(id);
            if (!store)
                return false;
            return store;
        });
    }
    createStore(store) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringfyStores = Object.assign(Object.assign({}, store), { store_business_hours: JSON.stringify(store.store_business_hours) });
            const alreadyExists = yield storeModel_1.default.query().findOne({
                store_name: store.store_name,
            });
            if (alreadyExists)
                return false;
            const newStore = yield storeModel_1.default.query().insert(stringfyStores).returning("*");
            return newStore;
        });
    }
    updateStore(id, store) {
        return __awaiter(this, void 0, void 0, function* () {
            const stringfyStores = Object.assign(Object.assign({}, store), { store_business_hours: JSON.stringify(store.store_business_hours) });
            const updatedStore = yield storeModel_1.default.query().updateAndFetchById(id, stringfyStores);
            if (!updatedStore)
                return false;
            return updatedStore;
        });
    }
    updateBusinessHours(id, businessHours) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedStore = yield storeModel_1.default.query().updateAndFetchById(id, {
                store_business_hours: JSON.stringify(businessHours),
            });
            if (!updatedStore)
                return false;
            return updatedStore;
        });
    }
    inactiveStore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const inactiveStore = yield storeModel_1.default.query().updateAndFetchById(id, {
                store_is_active: false,
            });
            if (!inactiveStore)
                return false;
            return inactiveStore;
        });
    }
    storeIsOpen(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield storeModel_1.default.query().findById(id);
            if (!store)
                return false;
            const businessHours = JSON.parse(store.store_business_hours);
            const day = date.getDay();
            const dayBusinessHours = businessHours.find((businessHour) => businessHour.id === day);
            if (!dayBusinessHours)
                return false;
            const { open_time, close_time } = dayBusinessHours;
            const open = new Date(date);
            const close = new Date(date);
            open.setHours(Number(open_time.split(":")[0]));
            open.setMinutes(Number(open_time.split(":")[1]));
            close.setHours(Number(close_time.split(":")[0]));
            close.setMinutes(Number(close_time.split(":")[1]));
            if (date >= open && date < close)
                return true;
            return false;
        });
    }
    storeDeletePermanent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield storeModel_1.default.query().deleteById(id);
            if (!store)
                return false;
            return store;
        });
    }
}
exports.StoresUsesCases = StoresUsesCases;
exports.default = new StoresUsesCases();
