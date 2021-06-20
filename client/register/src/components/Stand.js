import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";

export default function Stand({ user, setRestaurant, restaurant }) {
  const [stands, setStands] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const nameRef = useRef();
  useEffect(() => {
    const { uid } = user;
    axios
      .get(`/stands/${uid}`)
      .then((res) => setStands(res.data))
      .catch((err) => console.log(err));
  }, []);
  const openRestaurant = async (name) => {
    await axios.post("/stands", {
      name: nameRef.current,
      owner: user.uid,
    });
    setRestaurant(name);
    setRedirect(true);
    console.log(restaurant);
    //not elegant!
  };
  return (
    <div>
      {redirect && <Redirect to="/create" />}
      {stands?.map((stand, i) => {
        return (
          <button onClick={() => setRestaurant(stand.name)} className="stand">
            {stand.name}
          </button>
        );
      })}
      <form>
        <label>Create new stand</label>
        <input
          placeholder="stand name"
          onChange={(e) => (nameRef.current = e.target.value)}
        />
        <button onClick={() => openRestaurant(nameRef.current)}>
          open a new stand
        </button>
      </form>
    </div>
  );
}
