const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    car_name: { type: String, required: true, trim: true, unique: true },
    Model: { type: String, required: true, trim: true },
    FuelType: { type: String, required: true, trim: true },
    Price: { type: String, required: true, trim: true },
    transmission: { type: String, required: true, trim: true },
    Mileage: { type: String, required: true, trim: true },
    Color: { type: String, required: true, trim: true }, 
    Car_img: { type: String, required: true, trim: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
