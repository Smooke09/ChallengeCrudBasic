import Stores from "../../model/storeModel";

export const filterStoresInactive = (stores: Stores[]) => {
  const storesInactive = stores.filter(
    (store) => store.store_is_active !== true
  );

  return storesInactive;
};
