import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import {Link} from 'react-router-dom';
// import GameScreen from "../components/GameScreen";
import { useGameContext } from "../utils/GlobalState";
import { RESET_GAME } from "../utils/actions";
import { QUERY_CHARACTERS, QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  ADD_CHARACTER_TO_PROFILE,
  UPDATE_COIN_BALANCE,
} from "../utils/mutations";
//import quries and mutations?

// import Auth from '../../utils/auth';
const Style = {
  characterIcon: {
    width: "50px",
    height: "50px",
  },
};
const Character = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, dispatch] = useGameContext();
  const { loading, data: character } = useQuery(QUERY_CHARACTERS);
  const { loading: loadingMe, data: profile } = useQuery(QUERY_ME);

  useEffect(() => {
    dispatch({ type: RESET_GAME });
  }, []);

  const [addCharacterToProfile, { error, data }] = useMutation(
    ADD_CHARACTER_TO_PROFILE
  );

  const addCharacter = async (characterId) => {
    try {
      const { data } = await addCharacterToProfile({
        variables: { characterId },
      });
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO update profile coin balance when hero is purchased
  const [updateCoinBalance, { coinError, coinData }] =
    useMutation(UPDATE_COIN_BALANCE);

  const updateCoins = async (cost) => {
    console.log("updating coin balance");
    try {
      const { data } = await updateCoinBalance({
        variables: {
          profileId: _id,
          updatedCoins: coins - cost,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const buyCharacter = (id, cost) => {
    addCharacter(id);
    updateCoins(cost);
  };

  if (loading || loadingMe) {
    return <div>Loading...</div>;
  }

  const { coins, characters, _id } = profile.me;

  return (
    <div>
      {location.pathname !== "/me" && (
        <button className="btn btn-dark mb-3" onClick={() => history.goBack()}>
          &larr; Go Back
        </button>
      )}
      <div className="bg-light p-5">
        {characters.length ? (
          <h4>Your Current Party: {characters}</h4>
        ) : (
          <h4 className="recruit">Recruit some heroes to add to your party!</h4>
        )}
      </div>
      <div className="bg-danger p-5">
        <h1>Your remaining coins: {coins} </h1>
        <h4>Successfully fight your way through the dungeon to earn more!</h4>
      </div>
      <h3>Character Shop</h3>
      <main className="flex-row justify-start">
        <div className="col-12 col-md-10 mb-5">
          {character.characters.map((hero, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header">
                <img
                  src={process.env.PUBLIC_URL + hero.image}
                  alt={hero.image}
                  style={Style.characterIcon}
                />

                <h4>Name:{hero.name}</h4>
                <h4>Health: {hero.health}</h4>
                <h4>Class: {hero.class}</h4>
                <h4>Attack: {hero.attack}</h4>
                <h4>Cost: {hero.cost}</h4>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-sm-buy"
                  onClick={() => buyCharacter(hero._id, hero.cost)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
export default Character;
