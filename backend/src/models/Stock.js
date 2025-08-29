import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
},
{ timestamps: true }
);

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
