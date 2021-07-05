import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import changeRestaurant from "../action/changeRestaurant";
import changeRestaurantUser from "../action/changeUser";
import "./styles/StandCreator/StandCreator.css";

export default function StandCreator({
  restaurant,
  restaurantUser,
  refreshFunction,
}) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const openStand = async () => {
    const res = axios
      .post("/stands/create", {
        restaurant_name: nameRef.current,
        user_name: usernameRef.current,
        password: passwordRef.current,
      })
      .then((res) => {
        console.log(restaurantUser);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch(changeRestaurantUser(res.data.user_name));
        dispatch(changeRestaurant(nameRef.current));

        alert(`username: ${res.data.user_name}`);
        console.log(res.data.user_name);
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
      const res = await axios.post(`/stands/login/`, body);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      dispatch(changeRestaurantUser(usernameRef.current));
      dispatch(changeRestaurant(res.data.name));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteStand = async (e) => {
    console.log(usernameRef.current, passwordRef.current);
    try {
      await axios.delete(
        `/stands/remove?u=${usernameRef.current}&p=${passwordRef.current}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        }
      );
    } catch (err) {
      refreshFunction();
      await axios.delete(
        `/stands/remove?u=${usernameRef.current}&p=${passwordRef.current}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        }
      );
    }
    dispatch(changeRestaurant());
    dispatch(changeRestaurantUser());
    alert("deleted");
  };
  return (
    <div>
      {redirect && <Redirect to="/create" />}
      <div className="existing-stands">
        <h1 className="header">Existing Stands</h1>

        <input
          className="create-stand login-prop"
          placeholder="stand's username"
          onChange={(e) => (usernameRef.current = e.target.value)}
        />
        <input
          style={showPassword ? {} : { WebkitTextSecurity: "disc" }}
          className="create-stand login-prop password"
          placeholder="password"
          onChange={(e) => (passwordRef.current = e.target.value)}
        />
        <button
          className="show-password"
          onClick={(e) => {
            setShowPassword(showPassword ? false : true);
          }}
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
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
      <div className="create-stand">
        <h1 className="header">Create new stand</h1>
        <input
          className="create-stand login-prop"
          placeholder="stand name"
          onChange={(e) => (nameRef.current = e.target.value)}
        />
        <input
          className="create-stand login-prop"
          placeholder="stand's username"
          onChange={(e) => (usernameRef.current = e.target.value)}
        />
        <input
          style={showPassword ? {} : { WebkitTextSecurity: "disc" }}
          className="create-stand login-prop password"
          placeholder="password"
          onChange={(e) => (passwordRef.current = e.target.value)}
        />
        <button
          className="show-password"
          onClick={(e) => {
            setShowPassword(showPassword ? false : true);
          }}
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
  );
}
