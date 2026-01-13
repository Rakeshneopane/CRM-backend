const express = require("express");
const cors = require("cors");
const initailiseDatabase = require("./dbConnect/dbConnect");

const tagRoutes = require("./routes/tagRoutes");
const leadRoutes = require("./routes/leadRoutes");
const agentRoutes = require("./routes/agentRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

initailiseDatabase();

app.get("/", (req,res)=>{
    res.send("Anvaya CRM API is working");
})

app.use("/api", tagRoutes);
app.use("/api", leadRoutes);
app.use("/api", agentRoutes);
app.use("/api", reportRoutes);


// app.listen(PORT, ()=>{
//     console.log("Listening to port", PORT);
// })

module.exports = app;
