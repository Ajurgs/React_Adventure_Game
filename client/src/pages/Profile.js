import React, { useEffect } from "react";

import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useGameContext } from "../utils/GlobalState";
import { SET_COIN } from "../utils/actions";

import GameScreen from "../components/GameScreen";
import { QUERY_SINGLE_PROFILE, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // code to try to display profile's coins
  const [state, dispatch] = useGameContext();
  const { coinBalance } = state;
  useEffect(() => dispatch({ type: SET_COIN, payload: coinBalance }, []));

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  console.log(profile);
  const { name, coins, characters } = profile;
  return (
    <div>
      <div className="bg-light p-5">
        <h1>Hello {name}!</h1>
        <h4>Coin Balance: {coins}</h4>
        {characters.length ? (
          <h4>Your Current Party: {characters}</h4>
        ) : (
          <h4>Recruit some hero's to add to your party!</h4>
        )}
        <div className="flex-row justify-start">
          <div>
            <Link
              to="/characters"
              type="button"
              className="bg-info p-5 m-2 text-light btn"
            >
              Character Shop
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
