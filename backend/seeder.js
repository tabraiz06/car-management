const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Car = require("./models/Car");


// Seed data
const seedData = async () => {
  try {
    // Check if the user already exists
    let user = await User.findOne({ email: "demo@user.com" });
    if (!user) {
      // Create a demo user
      const hashedPassword = await bcrypt.hash("password", 10);
      user = await User.create({
        username: "Demo User",
        email: "demo@user.com",
        password: hashedPassword,
      });
    }

    // Delete existing cars for the user
    await Car.deleteMany({ userId: user._id });

    // Create 10 demo cars
    const demoCars = [
      {
        title: "Tesla Model S",
        description: "Electric luxury sedan with advanced tech.",
        tags: ["Electric", "Tesla", "Luxury"],
        images: ["uploads/tesla_model_s.jpg"],
        userId: user._id,
      },
      {
        title: "Ford Mustang",
        description: "Classic American muscle car.",
        tags: ["Muscle", "Ford", "Performance"],
        images: ["uploads/ford_mustang.jpg"],
        userId: user._id,
      },
      {
        title: "Toyota Corolla",
        description: "Reliable and fuel-efficient sedan.",
        tags: ["Sedan", "Toyota", "Economy"],
        images: ["uploads/toyota_corolla.jpg"],
        userId: user._id,
      },
      {
        title: "Honda Accord",
        description: "Popular family sedan with spacious interior.",
        tags: ["Sedan", "Honda", "Family"],
        images: ["uploads/honda_accord.jpg"],
        userId: user._id,
      },
      {
        title: "Chevrolet Camaro",
        description: "Stylish sports coupe with powerful performance.",
        tags: ["Sports", "Chevrolet", "Coupe"],
        images: ["uploads/chevrolet_camaro.jpg"],
        userId: user._id,
      },
      {
        title: "BMW X5",
        description: "Luxury SUV with a comfortable interior.",
        tags: ["SUV", "BMW", "Luxury"],
        images: ["uploads/bmw_x5.jpg"],
        userId: user._id,
      },
      {
        title: "Audi Q7",
        description: "Premium SUV with advanced safety features.",
        tags: ["SUV", "Audi", "Premium"],
        images: ["uploads/audi_q7.jpg"],
        userId: user._id,
      },
      {
        title: "Mercedes-Benz C-Class",
        description: "Compact luxury sedan with high-end features.",
        tags: ["Sedan", "Mercedes-Benz", "Luxury"],
        images: ["uploads/mercedes_c_class.jpg"],
        userId: user._id,
      },
      {
        title: "Hyundai Elantra",
        description: "Affordable sedan with modern design.",
        tags: ["Sedan", "Hyundai", "Economy"],
        images: ["uploads/hyundai_elantra.jpg"],
        userId: user._id,
      },
      {
        title: "Volkswagen Golf",
        description: "Compact car with excellent handling.",
        tags: ["Compact", "Volkswagen", "Economy"],
        images: ["uploads/volkswagen_golf.jpg"],
        userId: user._id,
      },
    ];

    // Insert the demo cars into the database
    await Car.insertMany(demoCars);
    console.log("Demo cars seeded successfully!");
   
   
  } catch (error) {
    console.error("Error seeding data:", error);
  } 
};

module.exports= seedData
