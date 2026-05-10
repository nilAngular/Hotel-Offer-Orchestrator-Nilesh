import { Client, Connection } from "@temporalio/client";
import { hotelWorkflow } from "../workflows/hotelworkflow";
import { redisClient } from "../redis/redisCient";


export const getHotels =  async (req:any, res:any) =>{

    try{
        const city = req.query.city as string;

        const minPrice = Number(req.query.minPrice)
        const maxPrice = Number(req.query.maxPrice);

        if(!city){
            return res.status(400).json({
                message: "city query param is required"
            })
        }

        const connection = await Connection.connect({
            address: process.env.TEMPORAL_ADDRESS || 'localhost:7233',
        });

        const client = new Client({connection});

        const hotelHandle = await client.workflow.start(hotelWorkflow,{
            args : [city],
            taskQueue: "hotel-task-queue",
            workflowId: `hotel-${city}-${Date.now()}`,
        });

        let hotels = await hotelHandle.result();
        await redisClient.set(`hotels:${city}`, JSON.stringify(hotels));

        const cachedHotels = await redisClient.get(`hotels:${city}`);

        hotels = JSON.parse(cachedHotels || "[]");

        if(!isNaN(minPrice)){
            hotels = hotels.filter(hotel => hotel.price >= minPrice)
        }

        if (!isNaN(maxPrice)) {
            hotels = hotels.filter((hotel: any) => hotel.price <= maxPrice);
        }

        return res.json(hotels);

    }
    catch(err){
        console.log(err);
        
        return res.status(500).json({
            message: "Internal server error",
        })
    }
}