import Stores from "../../model/storeModel";

export const stringfyBusinessHours = (store: Stores) => {
  return {
    ...store,
    store_business_hours: JSON.stringify(store.store_business_hours),
  };
};

export const parseBusinessHours = (store: Stores) => {
  return {
    ...store,
    store_business_hours: JSON.parse(store.store_business_hours),
  };
};
