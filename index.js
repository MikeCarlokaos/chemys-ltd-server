// const path = require("path");
// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Nodemailer transporter setup
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.USER,
//     pass: process.env.PASS,
//   },
// });

// // Verify transporter setup
// transporter.verify((err, success) => {
//   if (err) {
//     console.log("Error verifying transporter:", err);
//   } else {
//     console.log(`Server is ready to take messages: ${success}`);
//   }
// });

// // POST endpoint to handle form submissions
// app.post("/send", (req, res) => {
//   const { fname, lname, phone, email, company, enquiry } = req.body;

//   const content = `
//   <h2>Contact Details</h2>
//     <p><strong>First Name:</strong> ${fname} ${lname}</p>
//     <p><strong>Phone:</strong> ${phone}</p>
//     <p><strong>Email:</strong> ${email}</p>
//     <p><strong>Company:</strong> ${company}</p>

//     <h2>Enquiry</h2>
//     <p>${enquiry}</p>
//   `;

//   // Nodemailer mail options
//   let mailOptions = {
//     from: email,
//     to: process.env.CLIENT_EMAIL,
//     subject: `Enquiry from website contact-form`,
//     html: content, // Use HTML content instead of plain text
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (err, data) => {
//     if (err) {
//       console.error("Error sending email:", err);
//       res.json({
//         status: "fail",
//       });
//     } else {
//       console.log("Message sent");
//       res.json({
//         status: "success",
//       });
//     }
//   });
// });

// // Serve static files for the React app
// const staticFilesPath = path.resolve(__dirname, "../dist");
// app.use(express.static(staticFilesPath));
// console.log("Render logs - Serving static files from:", staticFilesPath);

// // Handle GET requests to /send route
// app.get("/send", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// // All other GET requests not handled before will return the React app
// const indexPath = path.resolve(__dirname, "../dist", "index.html");
// console.log("Render logs - Serving index.html from:", indexPath);
// app.get("*", (req, res) => {
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       console.error("Error sending index.html:", err);
//       res.status(500).send("Error sending index.html");
//     }
//   });
// });

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
//   console.log("Render logs - Server running from:", __dirname);
// });

const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
const corsOptions = {
  origin: "https://chemyslimiteddemo.onrender.com/", // Replace with your frontend domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Nodemailer transporter setup
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// Verify transporter setup
transporter.verify((err, success) => {
  if (err) {
    console.log("Error verifying transporter:", err);
  } else {
    console.log(`Server is ready to take messages: ${success}`);
  }
});

// POST endpoint to handle form submissions
app.post("/send", (req, res) => {
  const { fname, lname, phone, email, company, enquiry } = req.body;

  const content = `
    <h2>Contact Details</h2>
    <p><strong>First Name:</strong> ${fname} ${lname}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company}</p>

    <h2>Enquiry</h2>
    <p>${enquiry}</p>
  `;

  // Nodemailer mail options
  let mailOptions = {
    from: email,
    to: process.env.CLIENT_EMAIL,
    subject: `Enquiry from website contact-form`,
    html: content,
  };

  // Send email
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.error("Error sending email:", err);
      res.json({
        status: "fail",
      });
    } else {
      console.log("Message sent");
      res.json({
        status: "success",
      });
    }
  });
});

// Serve static files for the React app
const staticFilesPath = path.resolve(__dirname, "../dist");
app.use(express.static(staticFilesPath));
console.log("Render logs - Serving static files from:", staticFilesPath);

// Handle GET requests to /send route
app.get("/send", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return the React app
const indexPath = path.resolve(__dirname, "../dist", "index.html");
console.log("Render logs - Serving index.html from:", indexPath);
app.get("*", (req, res) => {
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send("Error sending index.html");
    }
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log("Render logs - Server running from:", __dirname);
});
