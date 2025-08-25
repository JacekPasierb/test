import {Schema, model, models} from "mongoose";

const MotorcycleSchema = new Schema(
  {
    userId: {type: String, required: true, index: true}, // z Clerk
    brand: {type: String, required: true, trim: true},
    model: {type: String, required: true, trim: true},
    year: {type: Number, min: 1900, max: 2100},
    nickname: {type: String, trim: true},
    odometer: {type: Number, min: 0},
    tankCapacity: {type: Number, min: 0},
  },
  {timestamps: true}
);

export default models.Motorcycle || model("Motorcycle", MotorcycleSchema);
