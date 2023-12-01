import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
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
      "https://3001-4geeksacade-authenticat-jtk76gse7ak.ws-us106.gitpod.io/api/login",
      opts
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("There has been some error");
      })
      .then((data) => {
        console.log("this came from the backend", data);
        localStorage.setItem("token", data.access_token);
        navigate("/private");
      })
      .catch((error) => {
        console.error("There was an error", error);
      });
  };

  return (
    <div className="text-center mt-5">
      {token && token != "" && token != undefined ? (
        "You are logged in with " + token
      ) : (
        <>
          <h1>Login</h1>
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
      )}
    </div>
  );
};
