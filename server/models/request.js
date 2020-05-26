const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  fname: {
    type: String,
    required: [true, "first name is required"],
  },
  lname: {
    type: String,
    required: [true, "last name is required"],
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  // services required
  errands: {
    type: Boolean,
    default: false,
  },
  personal_assistant: {
    type: Boolean,
    default: false,
  },
  house_keeping: {
    type: Boolean,
    default: false,
  },
  cleaning_services: {
    type: Boolean,
    default: false,
  },
  // service location
  address: {
    type: String,
    required: [true, "service location is required"],
  },
  //time to initiate service
  service_starts: {
    type: String,
    required: [true, "service date is required"],
  },
  // What task is about
  task_desc: {
    type: String,
    required: [true, "task description is required"],
  },
  // preferred means of communication
  communication: {
    type: String,
    enum: ["email", "call", "sms"],
  },
  // Payment method
  cash: {
    type: Boolean,
    default: false,
  },
  bank_tranfer: {
    type: Boolean,
    default: false,
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
