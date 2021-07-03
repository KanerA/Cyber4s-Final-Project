import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Stand from "./Stand";
import { useDispatch } from "react-redux";
import { changeRestaurant, changeRestaurantUser } from "../action";
import "./styles/StandCreator/StandCreator.css";

export default function StandCreator({ user, restaurant, restaurantUser }) {
  const dispatch = useDispatch();
  const [stands, setStands] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const { uid } = user;
    axios
      .get(`stands/${uid}`)
      .then((res) => {
        setStands(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const openStand = async () => {
    const { email } = user;
    // try {
    const res = await axios
      .post("/stands/create", {
        restaurant_name: nameRef.current,
        password: passwordRef.current,
        email,
      })
      .then((res) => {
        // if (res.status === 200) return;
        console.log(restaurantUser);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch(changeRestaurantUser(res.data.user_name));
        dispatch(changeRestaurant(nameRef.current));

        alert(`username: ${res.data.user_name}`);
        console.log(res.data.user_name);
      })
      // }
      .catch((err) => {
        console.log(err);
      });
  };
  const loginToStand = async (username, restaurant) => {
    const body = {
      user_name: username.current,
      password: passwordRef.current,
    };
    try {
      const res = await axios.post(`/stands/login/`, body);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      console.log(res.data.user_name);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteStand = async (username) => {
    console.log(username.current, passwordRef.current);
    await axios.delete(
      `/stands/remove?u=${username.current}&p=${passwordRef.current}`,
      {
        headers: {
          authorization: "Bearer " + localStorage.accessToken,
        },
      },
    );
    const filtered = stands.filter((stand) => stand.name !== restaurant);
    setStands(filtered);
    dispatch(changeRestaurant());
    alert("deleted");
  };
  return (
    <div>
      {redirect && <Redirect to="/create" />}
      <div className="stands">
        <h1 className="header">Existing Stands</h1>
        {stands?.map((stand, i) => {
          return (
            <Stand
              deleteStand={deleteStand}
              stand={stand}
              setRedirect={setRedirect}
              passwordRef={passwordRef}
              key={i}
              loginToStand={loginToStand}
            ></Stand>
          );
        })}
      </div>
      <div className="create-stand">
        <h1 className="header">Create new stand</h1>
        <input
          className="create-stand login-prop"
          placeholder="stand name"
          onChange={(e) => (nameRef.current = e.target.value)}
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
