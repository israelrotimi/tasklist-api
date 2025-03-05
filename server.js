const express = require("express");
const cors = require("cors");

// const userRouter = require("./routes/users");
// const taskRouter = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000

app.get("/", (req, res) => {
  res.send("send post request to '/users/new' endpoint to login");
});
// app.use("/users", userRouter);
// app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
})
