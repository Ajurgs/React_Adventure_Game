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
      }
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
      }
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
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;
