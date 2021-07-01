import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Stand from "./Stand";
import { useDispatch } from "react-redux";
import { changeRestaurant } from "../action";

export default function StandCreator({ user, restaurant }) {
  const dispatch = useDispatch();
  const [stands, setStands] = useState([]);
  const [redirect, setRedirect] = useState(false);
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
    } catch (err) {
      console.log(err);
    }
  };
  const loginToStand = async (username) => {
    try {
      const res = await axios.post(
        `/stands/login/${username}`,
        {
          name: username.current,
          password: passwordRef.current,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.accessToken,
          },
        }
      );
      // if (res.status === 201) return setLoginError(true);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      document.location.pathname = "/trivia";
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
      {stands?.map((stand, i) => {
        return (
          <Stand
            deleteStand={deleteStand}
            stand={stand}
            setRedirect={setRedirect}
            passwordRef={passwordRef}
            key={i}
          ></Stand>
        );
      })}
      <form>
        <label>Create new stand</label>
        <input
          placeholder="stand name"
          onChange={(e) => (nameRef.current = e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => (passwordRef.current = e.target.value)}
        />
        <button
          onClick={() => {
            openStand();
            dispatch(changeRestaurant(nameRef.current));
            setRedirect(true);
          }}
        >
          open a new stand
        </button>
      </form>
    </div>
  );
}
