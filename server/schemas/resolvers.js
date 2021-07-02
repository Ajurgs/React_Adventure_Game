const { AuthenticationError } = require("apollo-server-express");
const { Profile, Character, Enemy } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().populate("characters");
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId }).populate("characters");
    },

    characters: async () => {
      return Character.find();
    },

    character: async (parent, { characterId }) => {
      return Character.findOne({ _id: characterId });
    },

    enemies: async () => {
      return Enemy.find();
    },

    enemy: async (parent, { enemyId }) => {
      return Enemy.findOne({ _id: enemyId });
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id }).populate(
          "characters"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeCharacter: async (parent, { characterId, profileId }, context) => {
      // if (context.user) {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { characters: characterId } },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateCoinBalance: async (parent, { profileId, coins }) => {
      return Profile.findByIdAndUpdate(
        profileId,
        { coins: coins },
        { new: true }
      );
    },

    //testing
    addCharacterToProfile: async (parent, { characterId }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              characters: characterId,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        ).populate("characters");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //testing resolver
    addCharacterToProfileById: async (parent, { characterId, profileId }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: {
            characters: characterId,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;
