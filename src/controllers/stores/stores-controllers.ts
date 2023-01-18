import { Request, Response } from "express";
import Stores from "../../model/storeModel";
import StoresUsesCases from "../../useCases/storesUseCases";
import { parseBusinessHours } from "../../useCases/helpers/parseBusinessHours";

class StoresController {
  async getStores(req: Request, res: Response) {
    const stores = await StoresUsesCases.getStores();

    return res.status(201).json({
      message: "Store created successfully",
      stores: stores.map((store) => parseBusinessHours(store)),
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

    return res.status(201).json({
      message: "Store created successfully",
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

    return res.status(201).json({
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

    return res.status(201).json({
      message: "Store updated successfully",
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

    return res.status(201).json({
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
