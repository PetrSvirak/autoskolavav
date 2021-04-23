import { Vehicle } from "../deliveryClient/models/vehicle";

export const createWorkshopsVehiclesMap = (vehicles: Vehicle[]) =>
  vehicles.reduce((map: Map<string, string[]>, vehicle: Vehicle): Map<
    string,
    string[]
  > => {
    vehicle.workshops.value.forEach((workshop) => {
      const workshopVehiclesItem = map.get(workshop.system.id);
      if (!workshopVehiclesItem) {
        map.set(workshop.system.id, [vehicle.name.value]);
      } else {
        workshopVehiclesItem.push(vehicle.name.value);
        map.set(workshop.system.id, workshopVehiclesItem);
      }
    });

    return map;
  }, new Map<string, string[]>());
