import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String },
},
{ timestamps: true }
);

const Promo = mongoose.model("Promo", promoSchema);

export default Promo;
