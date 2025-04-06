const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); // path ta k drictly path for your views folder
const edu = require("./models/chart.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/educare";

main()
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL); // connect mongo db
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hi i am root");
});

app.get("/donate", async (req, res) => {
  try {
    let donate = await edu.find();

    res.render("index", { donate: donate });
  } catch (err) {
    console.error(err);
    res.send("There was an error fetching donations");
  }
  // console.log(chats);
  // res.render("index", { donate: donate }); // render from index.ejs
  // res.send("working here");
});

app.post("/donate", async (req, res) => {
  try {
    let { amount, name, email, mode } = req.body;
    let newedu = new edu({
      amount: amount,
      name: name,
      email: email,
      mode: mode,
    });

    await newedu.save();

    res.send("Thank you for your donation!");
  } catch (error) {
    console.error(error);
    res.send("There was an error processing your donation.");
  }
});
// Save the donation to the database
// await donation.save();

// res.send("Thank you for your donation!");

// res.send("There was an error processing your donation.");

app.listen(8080, () => {
  console.log("server is listening port 8080");
});
