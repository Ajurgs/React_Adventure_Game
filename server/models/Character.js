const { Schema, model } = require("mongoose");

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  health: {
    type: Number,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
});

const Character = model("Character", characterSchema);
console.log(Character);
module.exports = Character;