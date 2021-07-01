import React from "react";
// import {Link} from 'react-router-dom';
// import GameScreen from "../components/GameScreen";
import { QUERY_CHARACTERS, QUERY_SINGLE_CHARACTER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_CHARACTER_TO_PROFILE } from "../utils/mutations";
//import quries and mutations?

// import Auth from '../../utils/auth';

const Character = () => {
  const { loading, data: character } = useQuery(QUERY_CHARACTERS);

  const [addCharacterToProfile, { error, data }] = useMutation(
    ADD_CHARACTER_TO_PROFILE
  );
  const addCharacter = async (characterId) => {
    try {
      // const { data } = await addCharacterToProfile({
      //   variables: { characterId },
      // });
      console.log(characterId);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(character);
  return (
    <div>
      <h3> Characters</h3>
      <main className="flex-row justify-start">
        <div className="col-12 col-md-10 mb-5">
          {character.characters.map((hero, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header">
                <h4>Name:{hero.name}</h4>
                <h4>Health: {hero.health}</h4>
                <h4>Attack: {hero.attack}</h4>
                <h4>Cost: {hero.cost}</h4>
              </div>
              <div className="card-body">
                <button onClick={() => addCharacter(hero._id)}>Buy</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
export default Character;
