import { supplierAHotels } from "../Utils/SupplierA"
import { supplierBHotels } from "../Utils/SupplierB";

export async function fetchSupplierA(city:string) {  
    return supplierAHotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());
}

export async function fetchSupplierB(city:string) {  
    return supplierBHotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase());
}
