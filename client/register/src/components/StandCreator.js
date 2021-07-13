import { network } from "../utils/networkWrapper";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import changeRestaurant from "../action/changeRestaurant";
import changeRestaurantUser from "../action/changeUser";
import "./styles/StandCreator/StandCreator.css";
import { createCookie, readCookie } from "../utils/cookies";
import logo from "../logo.png";

export default function StandCreator({
  restaurant,
  restaurantUser,
  refreshFunction,
  setLogin,
}) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const openStand = async () => {
    network
      .post("/stands/create", {
        restaurant_name: nameRef.current,
        user_name: usernameRef.current,
        password: passwordRef.current,
      })
      .then((res) => {
        setLogin(false);
        console.log(restaurantUser);
        createCookie("userId", res.data.id, 0.5);
        createCookie("accessToken", res.data.accessToken, 0.5);
        createCookie("refreshToken", res.data.refreshToken, 0.5);
        dispatch(changeRestaurantUser(res.data.user_name));
        dispatch(changeRestaurant(nameRef.current));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loginToStand = async () => {
    const body = {
      user_name: usernameRef.current,
      password: passwordRef.current,
    };
    try {
      const res = await network.post(`/stands/login/`, body);
      setLogin(false);
      createCookie("userId", res.data.id, 0.5);
      createCookie("accessToken", res.data.accessToken, 0.5);
      createCookie("refreshToken", res.data.refreshToken, 0.5);
      dispatch(changeRestaurantUser(usernameRef.current));
      dispatch(changeRestaurant(res.data.name));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteStand = async (e) => {
    console.log(usernameRef.current, passwordRef.current);
    const accessToken = readCookie("accessToken");
    try {
      await network.delete(
        `/stands/remove?u=${usernameRef.current}&p=${passwordRef.current}`,
        {
          headers: {
            authorization: "Bearer " + accessToken,
          },
        }
      );
    } catch (err) {
      await network.delete(
        `/stands/remove?u=${usernameRef.current}&p=${passwordRef.current}`,
        {
          headers: {
            authorization: "Bearer " + accessToken,
          },
        }
      );
    }

    alert("deleted");
  };
  return (
    <div className="stand-creator">
      {redirect && <Redirect to="/create" />}
      {/* <h1 id="header">Bon Appetit</h1> */}
      {/* <img id="logo" src={logo} alt="logo" /> */}
      <div id="stands">
        <div className="existing-stands">
          <h1 className="header">Existing Stands</h1>
          <div className="stand-inputs">
            <input
              autoComplete="off"
              className="create-stand login-prop"
              placeholder="stand's username"
              onChange={(e) => (usernameRef.current = e.target.value)}
            />
            <input
              autoComplete="off"
              style={showPassword ? {} : { WebkitTextSecurity: "disc" }}
              className="create-stand login-prop password"
              placeholder="password"
              onChange={(e) => (passwordRef.current = e.target.value)}
            />
            <button
              className="show-password"
              onMouseOver={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>
          <div className="stand-controls">
            <button
              className="stand-login"
              onClick={() => {
                loginToStand(usernameRef.current, nameRef.current);

                setRedirect(true);
              }}
            >
              log in
            </button>
            <button className="stand-delete" onClick={(e) => deleteStand(e)}>
              delete stand
            </button>
          </div>
        </div>
        <div className="create-stands">
          <h1 className="header">Create new stand</h1>
          <div className="stand-inputs">
            <input
              autoComplete="off"
              className="create-stand login-prop"
              placeholder="stand name"
              onChange={(e) => (nameRef.current = e.target.value)}
            />
            <input
              autoComplete="off"
              className="create-stand login-prop"
              placeholder="stand's username"
              onChange={(e) => (usernameRef.current = e.target.value)}
            />
            <input
              autoComplete="off"
              style={showPassword ? {} : { WebkitTextSecurity: "disc" }}
              className="create-stand login-prop password"
              placeholder="password"
              onChange={(e) => (passwordRef.current = e.target.value)}
            />
            <button
              className="show-password"
              onMouseOver={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <br />
            <button
              id="open-stand"
              onClick={() => {
                openStand();
                setRedirect(true);
              }}
            >
              open a new stand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
