import React from "react";
// import {Link} from 'react-router-dom';
import GameScreen from "../components/GameScreen";
import { QUERY_CHARACTERS } from "../utils/queries";
import { useQuery } from "@apollo/client";

//import quries and mutations?

// import Auth from '../../utils/auth';

const Character = ({
  id,
  health,
  name,

  // class,
}) => {
  const { loading, data } = useQuery(QUERY_CHARACTERS);

  //  => {
  //     if(!character.length) {
  //         return <h3>Choose a Character please!</h3>;
  //     }
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return (
    <>
      {/* <main className="flex-row justify-start">
        <div className="col-12 col-md-10 mb-5">
          <Character
            name={character.name[0]}
            health={character.health[0]}
            // class={character.class[0]}
          />
        </div>
        <button className="charc1" onClick={GameScreen}>
          Select this Character
        </button>
        <button className="charc2" onClick={GameScreen}>
          Select this Character
        </button>
        <button className="charc3" onClick={GameScreen}>
          Select this Character
        </button>
        <button className="charc4" onClick={GameScreen}>
          Select this Character
        </button>
        <button className="charc4" onClick={GameScreen}>
          Select this Character
        </button>
      </main> */}
    </>
  );
};
export default Character;
