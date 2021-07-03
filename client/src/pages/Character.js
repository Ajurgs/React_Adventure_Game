import React, { useEffect,useState, } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import {Link} from 'react-router-dom';
// import GameScreen from "../components/GameScreen";
import { useGameContext } from "../utils/GlobalState";
import { RESET_GAME } from "../utils/actions";
import { QUERY_CHARACTERS, QUERY_ME } from "../utils/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  ADD_CHARACTER_TO_PROFILE,
  UPDATE_COIN_BALANCE,
} from "../utils/mutations";
//import quries and mutations?

// import Auth from '../../utils/auth';
const Style = {
  characterIcon: {
    // width: "15%",
    height: "25%",
  },
};
const Character = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, dispatch] = useGameContext();
  const { loading, data: character,refetch } = useQuery(QUERY_CHARACTERS);
  const { loading: loadingMe, data: profile } = useQuery(QUERY_ME);
  //const [queryMe,{loading:loadingMe,data:myProfile}] = useLazyQuery(QUERY_ME);
  // const [profile,setProfile] = useState({
  //   characters:[],
  //   coins:0,
  //   _id:"",
  // });
  //TODO update profile coin balance when hero is purchased
  const [updateCoinBalance, { coinError, coinData }] =
    useMutation(UPDATE_COIN_BALANCE);
  const [addCharacterToProfile, { error, data }] = useMutation(
    ADD_CHARACTER_TO_PROFILE
  );

  useEffect(() => {
    //queryMe();
    dispatch({ type: RESET_GAME });
  }, []);

  if (loading || loadingMe) {
    return <div>Loading...</div>;
  }
  // const { coins, characters, _id } = profile.me;
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
  let { coins, characters, _id } = profile.me;

  const updateCoins = async (cost) => {
    try {
      console.log(coins - cost);
      const { data } = await updateCoinBalance({
        variables: {
          profileId: _id,
          coins: coins - cost,
        },
      });
      console.log(data);
      coins = data.updateCoinBalance.coins;
      characters = data.updateCoinBalance.characters;
      _id = data.updateCoinBalance._id;
    } catch (error) {
      console.error(error);
    }
  };

  const buyCharacter = (id, cost) => {
    addCharacter(id);
    updateCoins(cost);
  };


  return (
    <div>
      {location.pathname !== "/me" && (
        <button className="btn btn-dark mb-3" onClick={() => history.goBack()}>
          &larr; Go Back
        </button>
      )}
      <div className="bg-light p-5">
        {characters.length ? (
          <>
            <h4>Your Hero Roster:</h4>
            <ul>
              {characters.map((hero, index) => (
                <li key={index}>
                  {hero.name} the {hero.class}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h4 className="recruit">
            Recruit some heroes to add to your roster!
          </h4>
        )}
      </div>
      <div className="bg-danger p-5 remaining-coins">
        <h1>Your remaining coins: {coins} </h1>
        <h4>Successfully fight your way through the dungeon to earn more!</h4>
      </div>

      <h3>Hero Shop</h3>
      {/* <main className="flex-row justify-start">
         <div className="col-12 col-md-10 mb-5">
        <div className="container pd-5">
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div> */}

      <main className="row">
        <div className="col-12 d-flex justify-content-center vh-100">
          <div className="row mx-4 d-flex align-items-center">
            {/* <div className="col-4"> */}

            {character.characters.map((hero, index) => (
              <div key={index} className="card mb-3 character-card">
                <div className="card-header character-card-header">
                  <img
                    src={process.env.PUBLIC_URL + hero.image}
                    alt={hero.image}
                    style={Style.characterIcon}
                  />

                  <h4>Name:{hero.name}</h4>
                  <h5>Health: {hero.health}</h5>
                  <h5>Class: {hero.class}</h5>
                  <h5>Attack: {hero.attack}</h5>
                  <h5>Cost: {hero.cost}</h5>
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
        </div>
        {/* </div> */}
        {/* </div> */}
      </main>
    </div>
  );
};
export default Character;
