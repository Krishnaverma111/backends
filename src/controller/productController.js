const productModel = require("../model/ProductModel");
const { ProductProfileURL } = require("../cloudinary/ImageUrl");

exports.AddProduct = async (req, res) => {
  try {
    const {
      car_name,
      Model,
      FuelType,
      Price,
      transmission,
      Mileage,
      Color,
    } = req.body;

   
    const requiredFields = {
      car_name,
      Model,
      FuelType,
      Price,
      transmission,
      Mileage,
      Color,
    };

    for (let key in requiredFields) {
      if (!requiredFields[key]) {
        return res.status(400).send({
          status: false,
          msg: `${key} is required.`,
        });
      }
    }

   
    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .send({ status: false, msg: "Car image is required." });
    }

   
    const existingCar = await productModel.findOne({ car_name });
    if (existingCar) {
      return res.status(409).send({
        status: false,
        msg: "Product with this car_name already exists.",
      });
    }

    
    const uploadResult = await ProductProfileURL(req.file.buffer);
    if (!uploadResult?.secure_url) {
      return res.status(500).send({
        status: false,
        msg: "Image upload failed.",
      });
    }



   
    const newProduct = await productModel.create({
      car_name,
      Model,
      FuelType,
      Price,
      transmission,
      Mileage,
      Color,
      Car_img: uploadResult.secure_url,
    });

    return res.status(201).send({
      status: true,
      msg: "Product added successfully.",
      data: newProduct,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({
        status: false,
        msg: "Duplicate car_name not allowed.",
      });
    }

    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: err.message,
    });
  }
};
