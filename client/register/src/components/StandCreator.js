import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Stand from "./Stand";

export default function StandCreator({ user, setRestaurant, restaurant }) {
  const [stands, setStands] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const nameRef = useRef();
  useEffect(() => {
    const { uid } = user;
    axios
      .get(`stands/${uid}`)
      .then((res) => {
        setStands(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const openStand = async (name) => {
    await axios.post("/stands", {
      name: name,
      owner: user.uid,
    });
  };
  return (
    <div>
      {redirect && <Redirect to="/create" />}
      {stands?.map((stand, i) => {
        return (
          <Stand
            stand={stand}
            setRestaurant={setRestaurant}
            setRedirect={setRedirect}
            openStand={openStand}
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
        <button
          onClick={() => {
            openStand(nameRef.current);
            setRestaurant(nameRef.current);
            setRedirect(true);
          }}
        >
          open a new stand
        </button>
      </form>
    </div>
  );
}
