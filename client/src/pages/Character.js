import React from "react";
// import {Link} from 'react-router-dom';
// import GameScreen from "../components/GameScreen";
import { QUERY_CHARACTERS } from "../utils/queries";
import { useQuery } from "@apollo/client";

//import quries and mutations?

// import Auth from '../../utils/auth';

const Character = ({ characters

  // class,
}) => {
  const { loading, data : character } = useQuery(QUERY_CHARACTERS);

  //  => {
  //     if(!character.length) {
  //         return <h3>Choose a Character please!</h3>;
  //     }
  if (loading) {
    return <div>Loading...</div>;
  };

  console.log(character)
  return (
    <div>
      <h3> Characters</h3>
       <main className="flex-row justify-start">
        <div className="col-12 col-md-10 mb-5">
          {characters && characters.map((hero, index)=> (
          <div key = {character.id} className ="card mb-3">
<h4 className="card-header">
{character.name}<br/>
{character.health}<br/>
           Zach</h4>
          </div>
            
          ))}
          </div>  
    
      
      </main> 
    </div> 
  );
};
export default Character;
