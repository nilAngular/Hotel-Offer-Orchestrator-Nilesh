import express from "express";
import { supplierAHotels } from "../Utils/SupplierA";
import { supplierBHotels } from "../Utils/SupplierB";
import * as hotelController from "../controllers/hotelController"

const router = express.Router();

router.get("/supplierA/hotels", (req, res) => {
    res.json(supplierAHotels);
});

router.get("/supplierB/hotels", (req, res) => {
    res.json(supplierBHotels);
});

router.get("/health", hotelController.getHealth);

router.get("/api/hotels", hotelController.getHotels);


export default router;