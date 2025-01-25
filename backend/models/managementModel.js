import mongoose from "mongoose";

const ManagementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiresAt: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["Admin", "Receptionist", "Staff"],
    required: true,
  },
});

const Management = mongoose.model("Management", ManagementSchema);

export default Management;
