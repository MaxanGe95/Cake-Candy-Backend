import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema({
  date: String,
  employeeName: String,
  accountNumber: String,
  workingHours: Number,
  salary: Number,
});

const Salary = mongoose.model('Salary', salarySchema);

// Standardexport
export default Salary;
