import React,{useEffect} from "react";

import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useGameContext } from "../utils/GlobalState";
import GameScreen from "../components/GameScreen";
import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { SET_COIN,SET_USER_ID } from "../utils/actions";

const Profile = () => {
  const { profileId } = useParams();
  const [state, dispatch] = useGameContext();
  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );
    useEffect(()=>{
      console.log("got here 123");

      if(data && data.me.coins){
        dispatch({type:SET_USER_ID,payload:data.me._id})
        dispatch({type:SET_COIN,payload:data.me.coins})
      }
    },[data])
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(profile);

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  const { name, coins, characters } = profile;

  return (
    <div>
      <div className="bg-light p-5">
        <h1>Hello {name}!</h1>
        <h4>Coin Balance: {coins}</h4>
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
            Recruit more heroes to add to your roster!
          </h4>
        )}
        <div className="flex-row justify-start">
          <div>
            <Link
              to="/characters"
              type="button"
              className="bg-info p-5 m-2 text-light btn"
            >
              Hero Shop
            </Link>
          </div>
        </div>
      </div>
      <h1>Play if you dare!👻</h1>
      <GameScreen />
    </div>
  );
};

export default Profile;
