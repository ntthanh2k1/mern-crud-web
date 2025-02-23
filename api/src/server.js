import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); // Middleware - allows us to accept json data in the req.body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(port, () => {
  dbConnection();
  console.log(`Server started at http://localhost:${port}`);
});
