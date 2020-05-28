const express = require("express");
const nodemailer = require("nodemailer");

const Request = require("../models/request");

const router = express.Router();

// Mail Services
const transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

router.post("/request", (req, res) => {
  const errors = [];
  const {
    fname,
    lname,
    phone,
    email,
    errands,
    personal_assistant,
    house_keeping,
    cleaning_services,
    address,
    service_starts,
    task_desc,
    communication,
    cash,
    bank_transfer,
  } = req.body;
  if (fname.length < 3) {
    errors.push({ message: "first name is required" });
  }
  if (lname.length < 3) {
    errors.push({ message: "last name is required" });
  }
  if (phone.length < 8) {
    errors.push({ message: "phone is required" });
  }
  if (email.length < 10) {
    errors.push({ message: "email is required" });
  }
  if (address.length < 10) {
    errors.push({ message: "address is required" });
  }
  if (task_desc.length < 10) {
    errors.push({ message: "task description is required" });
  }

  if (errors.length > 0) {
    res.status(422).send(errors);
  } else {
    Request.create(
      {
        fname,
        lname,
        phone,
        email,
        errands,
        personal_assistant,
        house_keeping,
        cleaning_services,
        address,
        service_starts,
        task_desc,
        communication,
        cash,
        bank_transfer,
      },
      (err, request) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          res.status(200);
          //Notify via mail
          const mail = {
            from: "Admin",
            to: "Macalfredsservices@gmail.com",
            subject: "Mail from Macalfred's Errands",
            text: `${request}`,
          };

          transporter.sendMail(mail, (error, data) => {
            if (error) {
              res.json({
                msg: "failed",
              });
            } else {
              res.json({
                msg: "success",
              });
            }
          });
        }
      }
    );
  }
});

module.exports = router;
