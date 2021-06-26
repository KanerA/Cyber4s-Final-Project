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
  useEffect(() => {
    const { uid } = user;
    axios
      .get(`stands/${uid}`)
      .then((res) => {
        setStands(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const openStand = async (name) => {
    await axios.post("/stands", {
      name: name,
      owner: user.uid,
    });
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
