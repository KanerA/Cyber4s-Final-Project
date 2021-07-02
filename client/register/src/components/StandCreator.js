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
    const { uid } = user;
    try {
      const res = await axios.post("/stands/create", {
        restaurant_name: nameRef.current,
        password: passwordRef.current,
        owner: uid,
      });
      if (res.status === 200) return;
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      alert(`username: ${res.data.user_name}`);
      dispatch(changeRestaurantUser(res.data.user_name));
      dispatch(changeRestaurant(nameRef.current));
    } catch (err) {
      console.log(err);
    }
  };
  const loginToStand = async (username) => {
    try {
      const res = await axios.post(
        `/stands/login/${username}`,
        {
          user_name: username.current,
          password: passwordRef.current,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        },
      );
      // if (res.status === 201) return setLoginError(true);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      dispatch(changeRestaurant(nameRef.current));
    } catch (err) {
      console.log(err);
      // setLoginError(true);
    }
  };
  const deleteStand = async () => {
    await axios.delete(`/stands/remove?o=${user.uid}&n=${restaurant}`);
    const filtered = stands.filter((stand) => stand.name !== restaurant);
    setStands(filtered);
    dispatch(changeRestaurant());
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
