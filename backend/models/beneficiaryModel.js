import mongoose from "mongoose";
const beneficiarySchema = new mongoose.Schema({
  cnic: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  purpose: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  token: { type: String, default: null },
},{timestamps: true});

export default mongoose.model("Beneficiary", beneficiarySchema);
