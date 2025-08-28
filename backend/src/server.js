import express from "express";

const app = express();  

app.get("/api/justramen", (req, res) => {
  res.send("Hello from JustRamen API!");
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});