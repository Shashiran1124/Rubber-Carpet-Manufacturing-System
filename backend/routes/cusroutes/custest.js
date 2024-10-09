const router = require("express").Router();
const SalesOrder = require("../../models/cusmodels/SalesOrder");  // Correct path to model
const nodemailer = require('nodemailer');


// Create a transporter for sending emails using SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server address
    port: 587,                // Use 587 for TLS or 465 for SSL
    secure: false,           // Set to true if using port 465
    auth: {
        user: 'malindunethmina113@gmail.com',  // Your email address
        pass: 'ujmo rgrd obtc mtkm'      // Your email password or app password
    }
});





// Data insertion
router.route("/add").post((req, res) => {
    const { customerName,orderDate, contactNumber,email, productCatalog, address, quantity} = req.body;
    
    const newSalesOrder = new SalesOrder({
        customerName,
        orderDate,
        contactNumber,
        email,
        productCatalog,
        address,
        quantity,

        
    });
    
    newSalesOrder.save()
    .then(() => {
        // Send an email to the user
        const mailOptions = {
            from: 'PRI RUBBER', // Sender address
            to: email,                     // Recipient's email
            subject: 'Sales Order Confirmation',
            text: `Dear ${customerName},\n\nYour order for ${productCatalog} has been successfully placed.\n\nThank you for your purchase!\n\nBest regards,\nYour Company`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ error: "Error sending confirmation email" });
            } else {
                console.log('Email sent:', info.response);
                res.status(201).json("Sales Order Added and email sent to the user");
            }
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error adding sales order" });
    });
});


// Fetch all sales orders
router.route("/").get((req, res) => {
    SalesOrder.find()
        .then((salesOrders) => {
            res.json(salesOrders);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error fetching sales orders" });  // Send error response
        });
});
// Delete a sales order
router.route("/delete/:id").delete((req, res) => {
    const salesOrderId = req.params.id;

    SalesOrder.findByIdAndDelete(salesOrderId)
        .then(() => {
            res.json("Sales Order Deleted");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Error deleting sales order" });  // Send error response
        });
});
// Update a by ID
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id;
    const { customerName, orderDate, contactNumber,email, productCatalog, address,quantity,} = req.body;

    try {
        const updatedSalesOrder = await SalesOrder.findByIdAndUpdate(
            id,
            { customerName,orderDate, contactNumber,email, productCatalog, address,quantity},
            { new: true }  // Return the updated document
        );

        if (!updatedSalesOrder) {
            return res.status(404).json({ message: "sales order not found" });
        }

        res.json({ message: "sales order updated successfully", updatedSalesOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating sales orders" });
    }
});




module.exports = router;
