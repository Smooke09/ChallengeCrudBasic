"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBusinessHours = exports.stringfyBusinessHours = void 0;
const stringfyBusinessHours = (store) => {
    return Object.assign(Object.assign({}, store), { store_business_hours: JSON.stringify(store.store_business_hours) });
};
exports.stringfyBusinessHours = stringfyBusinessHours;
const parseBusinessHours = (store) => {
    return Object.assign(Object.assign({}, store), { store_business_hours: JSON.parse(store.store_business_hours) });
};
exports.parseBusinessHours = parseBusinessHours;
