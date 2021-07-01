import { gql } from "@apollo/client";

//profile queries
export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      characters {
        _id
        name
        health
        class
        attack
        cost
        speed
      }
      coins
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      characters {
        _id
        name
        health
        class
        attack
        cost
        speed
      }
      coins
    }
  }
`;

//character queries
export const QUERY_CHARACTERS = gql`
  query allCharacters {
    characters {
      _id
      name
      health
      class
      attack
      cost
      speed
    }
  }
`;

export const QUERY_SINGLE_CHARACTER = gql`
  query singleCharacter($characterId: ID!) {
    character(characterId: $characterId) {
      _id
      name
      health
      class
      attack
      cost
      speed
    }
  }
`;

//enemy queries
export const QUERY_ENEMIES = gql`
  query allEnemies {
    enemies {
      _id
      name
      health
      attack
      speed
    }
  }
`;

export const QUERY_SINGLE_ENEMY = gql`
  query singleEnemy($enemyId: ID!) {
    enemy(enemyId: $enemyId) {
      _id
      name
      health
      attack
      speed
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      coins
    }
  }
`;
