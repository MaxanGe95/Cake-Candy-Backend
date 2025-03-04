import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Company = mongoose.model('Company', companySchema);
export default Company;
