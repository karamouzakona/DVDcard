const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { port } = require("./config");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.post("/api/user", async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log({ userName, password });

    if (userName !== "test") res.send({ error: "user not found" });
    else if (password === "1234") {
      return res.send({ message: "ok" });
    } else {
      throw res.send({ error: "wrong password" });
    }
  } catch (error) {
    res.send(error);
  }
});

let dvds = ["Titanic"];

app.get("/api/dvds", async (req, res) => {
  res.send(dvds || []);
});

app.post("/api/dvds", async (req, res) => {
  const { title } = req.body;
  if (title) dvds.push(title);

  res.send(dvds);
});

app.delete("/api/dvds/:index", async (req, res) => {
  const { index } = req.params;
  dvds = dvds.filter((d, i) => i != index);

  res.send(dvds);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
