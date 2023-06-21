import express from "express";
import employeesRoutes from "./routes/employes.routes.js"
import indexRoutes from "./routes/index.routes.js"
import "./config.js"
const app = express()

app.use(express.json())
app.use("/api",employeesRoutes)
app.use("/api",indexRoutes)

app.use((req, res) => {
  res.status("404").json({message:"not found"});
})

export default app;