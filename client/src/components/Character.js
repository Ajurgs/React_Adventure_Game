import React from 'react';
// import {Link} from 'react-router-dom';
import GameScreen from './GameScreen';

//import quries and mutations?


// import Auth from '../../utils/auth';


const Character = ({
_id,
name,
health,
// class,
  

 }) => {
//  => {
//     if(!character.length) {
//         return <h3>Choose a Character please!</h3>;
//     }
    



return (
<>
<main className = "flex-row justify-start">
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
</main>


</>




)
}
export default Character