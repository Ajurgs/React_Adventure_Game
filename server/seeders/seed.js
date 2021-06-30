const db = require("../config/connection");
const { Profile, Character } = require("../models");
const profileSeeds = require("./profileSeeds.json");
const characterSeeds = require("./characterSeeds.json");

db.once("open", async () => {
  try {
    await Character.deleteMany({});
    await Character.create(characterSeeds);

    await Profile.deleteMany({});
    await Profile.create(profileSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
