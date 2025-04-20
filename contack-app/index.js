import express from "express";
import ContactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/database.js";

const app = express();

const PORT = process.env.PORT;	

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Database connection
connectDB();

// Routes
app.use("/", ContactRoutes);

// Start server
app.listen(PORT, () => {
	console.log(`Server started successfully on Port ${PORT}`);
});
