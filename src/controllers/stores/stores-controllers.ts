import { Request, Response } from "express";
import Stores from "../../model/storeModel";
import StoresUsesCases from "../../useCases/storesUseCases";
import { parseBusinessHours } from "../../useCases/helpers/parseBusinessHours";
import { filterStoresInactive } from "../../useCases/helpers/filterStoresInactive";

class StoresController {
  async getStores(req: Request, res: Response) {
    const stores = await StoresUsesCases.getStores();

    const { active } = req.query;

    const storesInactive = filterStoresInactive(stores);

    if (active === "true") {
      return res.status(200).json({
        message: "Stores found successfully",
        stores: storesInactive.map((store) => parseBusinessHours(store)),
      });
    }

    const storesParsed = stores.map((store) => parseBusinessHours(store));

    const storesInactiveParsed = storesParsed.filter(
      (store) => store.store_is_active === true
    );

    return res.status(200).json({
      message: "Store created successfully",
      stores: storesInactiveParsed,
    });
  }

  async getStoreById(req: Request, res: Response) {
    const { id } = req.params;

    const store = await StoresUsesCases.getStoreById(Number(id));

    if (!store) {
      return res.status(400).json({
        message: "Store not found",
      });
    }

    return res.status(200).json({
      message: "Store found successfully",
      store: parseBusinessHours(store),
    });
  }

  async createStore(req: Request, res: Response) {
    const store = req.body as Stores;

    const newStore = await StoresUsesCases.createStore(store);

    if (!newStore) {
      return res.status(400).json({
        message: "Store already exists",
      });
    }

    return res.status(201).json({
      message: "Store created successfully",
      store: {
        ...newStore,
        store_business_hours: JSON.parse(newStore.store_business_hours),
      },
    });
  }

  async updateStore(req: Request, res: Response) {
    const { id } = req.params;

    const store = req.body as Stores;

    const updatedStore = await StoresUsesCases.updateStore(Number(id), store);

    if (!updatedStore)
      return res.status(400).json({
        message: "Store not found",
      });

    return res.status(200).json({
      message: "Store updated successfully",
      store: parseBusinessHours(updatedStore),
    });
  }

  async updateBusinessHours(req: Request, res: Response) {
    const { id } = req.params;

    const { store_business_hours } = req.body;

    const updatedStore = await StoresUsesCases.updateBusinessHours(
      Number(id),
      store_business_hours
    );

    if (!updatedStore)
      return res.status(400).json({
        message: "Store not found",
      });

    return res.status(200).json({
      message: "Store updated business hours",
      store: parseBusinessHours(updatedStore),
    });
  }

  async inactiveStore(req: Request, res: Response) {
    const { id } = req.params;

    const store = await StoresUsesCases.inactiveStore(Number(id));

    if (!store)
      return res.status(400).json({
        message: "Store not found",
      });

    return res.status(200).json({
      message: "Store updated successfully",
      store: parseBusinessHours(store),
    });
  }

  async storeIsOpen(req: Request, res: Response) {
    const { id, date } = req.params;

    const newDate = new Date(decodeURI(date));

    const store = await StoresUsesCases.getStoreById(Number(id));

    if (!store)
      return res.status(400).json({
        message: "Store not found",
      });

    const isOpen = await StoresUsesCases.storeIsOpen(Number(id), newDate);

    return res.status(201).json({
      isOpen,
    });
  }

  async storeDelete(req: Request, res: Response) {
    const { id } = req.params;

    const store = await StoresUsesCases.storeDeletePermanent(Number(id));

    if (!store)
      return res.status(400).json({
        message: "Store not found",
      });

    return res.status(201).json({
      message: "Store deleted successfully",
    });
  }
}

export default new StoresController();
