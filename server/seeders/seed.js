const db = require("../config/connection");
const { Profile, Character, Enemy } = require("../models");
const profileSeeds = require("./profileSeeds.json");
const characterSeeds = require("./characterSeeds.json");
const enemySeeds = require("./enemySeeds.json");

db.once("open", async () => {
  try {
    await Character.deleteMany({});
    await Character.create(characterSeeds);

    await Enemy.deleteMany({});
    await Enemy.create(enemySeeds);

    await Profile.deleteMany({});
    await Profile.create(profileSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
