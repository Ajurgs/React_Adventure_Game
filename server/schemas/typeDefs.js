const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    characters: [Character]!
  }

  type Character {
    _id: ID
    name: String
    health: Int
    class: String
    attack: Int
  }

  type Enemy {
    _id: ID
    name: String
    health: Int
    attack: Int
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    characters: [Character]!
    enemies: [Enemy]!
    profile(profileId: ID!): Profile
    character(characterId: ID!): Character
    enemy(enemyId: ID!): Enemy
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCharacterToProfile(characterId: ID!): Profile
    addCharacterToProfileById(characterId: ID!, profileId: ID!): Profile
    removeCharacter(characterId: ID!, profileId: ID!): Profile
    removeProfile: Profile
  }
`;

module.exports = typeDefs;
