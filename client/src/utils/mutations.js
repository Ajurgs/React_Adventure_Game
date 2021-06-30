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

export const ADD_CHARACTER_TO_PROFILE = gql`
  mutation addCharacterToProfile($character: String!) {
    addCharacterToProfile(characters: $character) {
      token
      character {
        _id
        name
        health
        class
        attack
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
