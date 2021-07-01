const { Schema, model } = require("mongoose");

const enemySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  health: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
  },
});

const Enemy = model("Enemy", enemySchema);

module.exports = Enemy;
