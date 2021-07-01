import { gql } from "@apollo/client";

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const UPDATE_COIN_BALANCE = gql`
  mutation updateCoinBalance($profileId: ID!, $updatedCoins: Int!) {
    updateCoinBalance(profileId: $profileId, coins: $updatedCoins) {
      coins
    }
  }
`;

export const ADD_CHARACTER_TO_PROFILE = gql`
  mutation addCharacterToProfile($character: ID!) {
    addCharacterToProfile(characters: $character) {
      token
      character {
        _id
        name
        health
        class
        attack
        speed
      }
    }
  }
`;

// testing
export const ADD_CHARACTER_TO_PROFILE_BY_ID = gql`
  mutation addCharacterToProfile($character: ID!, $profile: ID!) {
    addCharacterToProfile(characters: $character) {
      token
      character {
        _id
        name
        health
        class
        attack
        speed
      }
    }
  }
`;

export const REMOVE_CHARACTER = gql`
  mutation removeCharacter($character: String!) {
    removeCharacter(character: $character) {
      _id
      name
      characters
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;
