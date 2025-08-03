const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bank = require("./modules/bank");
const mesh = require("./modules/mesh");
const music = require("./modules/music");
const writing = require("./modules/writing");
const users = require("./modules/users");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/bank", bank);
app.use("/api/mesh", mesh);
app.use("/api/music", music);
app.use("/api/writing", writing);
app.use("/api/users", users);

app.get("/", (_, res) => res.send("ZDOS Backend Running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("ZDOS backend running on", PORT));