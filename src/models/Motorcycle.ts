import {Schema, model, models} from "mongoose";

const MotorcycleSchema = new Schema(
  {
    userId: {type: String, required: true, index: true}, // z Clerk
    marka: {type: String, required: true, trim: true},
    model: {type: String, required: true, trim: true},
    rok: {type: Number, min: 1900, max: 2100},
    ksywka: {type: String, trim: true},
    przebieg: {type: Number, min: 0},
    pojemnosc: {type: Number, min: 0},
    imageUrl: { type: String },
  },
  {timestamps: true}
);

export default models.Motorcycle || model("Motorcycle", MotorcycleSchema);
