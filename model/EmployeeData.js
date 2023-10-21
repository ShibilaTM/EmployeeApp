
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  location: String,
  position: String,
  salary:String
});

const EmployeeData = mongoose.model('DataofEmployees', employeeSchema,'DataofEmployees');

module.exports = EmployeeData;