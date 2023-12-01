import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  const handleClick = () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    console.log(opts);
    fetch(
      "https://3001-4geeksacade-authenticat-jtk76gse7ak.ws-us106.gitpod.io/api/sign-up",
      opts
    )
      .then((resp) => {
        if (resp.status === 201) return resp.json();
        else alert("There has been some error");
      })
      .then((data) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was an error", error);
      });
  };

  return (
    <div className="text-center mt-5">
      <>
        <h1>Sign up</h1>
        <div>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button onClick={handleClick}>Login</button>
        </div>
      </>
    </div>
  );
};
