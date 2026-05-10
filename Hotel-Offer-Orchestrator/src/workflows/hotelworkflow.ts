import { proxyActivities } from "@temporalio/workflow";
import * as activities from "../activities/hotelActivities";

const {
    fetchSupplierA,
    fetchSupplierB
} = proxyActivities<typeof activities>(
    {
        startToCloseTimeout : '1 minute'
    }
);

export async function hotelWorkflow(city:string) {
    const [supplierAData, supplierBData] = await Promise.all([
        fetchSupplierA(city),
        fetchSupplierB(city)
    ]);

    const allHotels = [...supplierAData, ...supplierBData]

    const hotelMap = new Map();

    for (let hotel of allHotels){
        const existingHotel = hotelMap.get(hotel.name);

        if(!existingHotel || hotel.price<existingHotel.price){
            hotelMap.set(hotel.name, hotel)
        }
    }

    return Array.from(hotelMap.values());
}
