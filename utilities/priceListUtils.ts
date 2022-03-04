import { Vehicle } from "../deliveryClient/models/vehicle";
import { Workshop as WorkshopModel } from "../deliveryClient/models/workshop";
import { Price, Workshop } from "../components/classicPriceList/WorkshopsTable";
import { Price as PriceModel } from "../deliveryClient/models/price";
import { Responses } from "@kentico/kontent-delivery";

export const createWorkshopsVehiclesMap = (vehicles: Vehicle[]) =>
  vehicles.reduce((map: Map<string, string[]>, vehicle: Vehicle): Map<
    string,
    string[]
  > => {
    vehicle.elements.workshops.linkedItems.forEach((workshop) => {
      const workshopVehiclesItem = map.get(workshop.system.id);
      if (!workshopVehiclesItem) {
        map.set(workshop.system.id, [vehicle.elements.name.value]);
      } else {
        workshopVehiclesItem.push(vehicle.elements.name.value);
      }
    });

    return map;
  }, new Map<string, string[]>());

export const getWorkshops = (
  workshops: Responses.IListContentItemsResponse<WorkshopModel>,
  workshopsVehiclesMap: Map<string, string[]>,
  getWorkshopName: (workshop: WorkshopModel) => string
): Workshop[] =>
  workshops.items
    .map(
      (workshop): Workshop => {
        const prices = workshop.elements.price.linkedItemCodenames
          .map((c) => workshops.linkedItems[c] as PriceModel)
          .map(
            (price): Price => ({
              price: price.elements.price.value,
              note: price.elements.note.value,
            })
          );
        return {
          name: getWorkshopName(workshop),
          prices,
          vehicles: workshopsVehiclesMap.get(workshop.system.id) || null,
        };
      }
    )
    .filter((x) => x !== undefined);
