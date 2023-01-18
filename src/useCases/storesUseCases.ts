import Stores from "../model/storeModel";

export class StoresUsesCases {
  async getStores(): Promise<Stores[]> {
    const stores = await Stores.query();

    return stores;
  }

  async getStoreById(id: number): Promise<Stores | false> {
    const store = await Stores.query().findById(id);

    if (!store) return false;

    return store;
  }

  async createStore(store: Stores): Promise<Stores | false> {
    const stringfyStores = {
      ...store,
      store_business_hours: JSON.stringify(store.store_business_hours),
    };

    const alreadyExists = await Stores.query().findOne({
      store_name: store.store_name,
    });

    if (alreadyExists) return false;

    const newStore = await Stores.query().insert(stringfyStores).returning("*");

    return newStore;
  }

  async updateStore(id: number, store: Stores): Promise<Stores | false> {
    const stringfyStores = {
      ...store,
      store_business_hours: JSON.stringify(store.store_business_hours),
    };

    const updatedStore = await Stores.query().updateAndFetchById(
      id,
      stringfyStores
    );

    if (!updatedStore) return false;

    return updatedStore;
  }

  async updateBusinessHours(
    id: number,
    businessHours: [Record<string, string>]
  ): Promise<Stores | false> {
    const updatedStore = await Stores.query().updateAndFetchById(id, {
      store_business_hours: JSON.stringify(businessHours),
    });

    if (!updatedStore) return false;

    return updatedStore;
  }

  async inactiveStore(id: number) {
    const inactiveStore = await Stores.query().updateAndFetchById(id, {
      store_is_active: false,
    });

    if (!inactiveStore) return false;

    return inactiveStore;
  }

  async storeIsOpen(id: number, date: Date): Promise<boolean> {
    const store = await Stores.query().findById(id);

    if (!store) return false;

    const businessHours = JSON.parse(store.store_business_hours);

    const day = date.getDay();

    const dayBusinessHours = businessHours.find(
      (businessHour: any) => businessHour.id === day
    );

    if (!dayBusinessHours) return false;

    const { open_time, close_time } = dayBusinessHours;

    const open = new Date(date);
    const close = new Date(date);

    open.setHours(Number(open_time.split(":")[0]));
    open.setMinutes(Number(open_time.split(":")[1]));

    close.setHours(Number(close_time.split(":")[0]));
    close.setMinutes(Number(close_time.split(":")[1]));

    if (date >= open && date < close) return true;

    return false;
  }

  async storeDeletePermanent(id: number) {
    const store = await Stores.query().deleteById(id);

    if (!store) return false;

    return store;
  }
}

export default new StoresUsesCases();
