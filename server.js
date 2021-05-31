
let id;
const express = require("express");
const app = express();
const path = require("path");
const data = require("./assets/pokemons.json");
const fs = require("fs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


/**
 * listen to port 3000
 */
app.listen(3000, () => {
  console.log("Listening to port 3000...");
});

/**
 * thouse get requests are responsible for the opening of the html pages
 */
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});
app.get("/pokemons", (req, res) => {
  res.sendFile(path.resolve("./public/pokemons.html"));
});
app.get("/pokemons/:id", (req, res) => {
  id = req.params.id;
  res.sendFile(path.resolve("./public/onePok.html"));
});




/**
 * thouse get requests are responsible for the the comunication with the fetch functions.
 * response the requested data
 */

//Sends all the pokemons.
app.get("/api", (req, res) => {
  res.send(data);
});

//Sends all the pokemons, plus the corrent id requested at "/pokemons/:id".
app.get("/api/pokemons", (req, res) => {
  res.send({ data, id });
});

//Sends a single pokemon, given its id.
app.get("/api/pokemons/:id", (req, res) => {
  const { id } = req.params;
  const foundPokemon = data.find((target) => target.id === parseInt(id));

  if (foundPokemon.hasOwnProperty("count")) foundPokemon.count++;
  else foundPokemon.count = 0;

  res.send(foundPokemon);
});

//Sends the correspondent pokemon image, given the id.
app.get("/assets/pokemons/:id.png", (req, res) => {
  const { id } = req.params;
  const imgsFolder = "./assets/images/";
  let foundImg;
  fs.readdirSync(imgsFolder).forEach((file) => {
    if (parseInt(file.split(".")[0]) === parseInt(id)) {
      foundImg = file;
    }
  });
  res.sendFile(path.resolve(imgsFolder + `${foundImg}`));
});
