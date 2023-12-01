import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("token") == undefined ||
      localStorage.getItem("token") == ""
    ) {
      navigate("/login");
    } else {
      const opts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      fetch(
        "https://3001-4geeksacade-authenticat-jtk76gse7ak.ws-us106.gitpod.io/api/private",
        opts
      )
        .then((resp) => {
          if (resp.status === 200) return resp.json();
          else {
            navigate("/signup");
          }
        })
        .then((data) => {
          console.log(data);
          alert("Successfully verified token " + JSON.stringify(data));
        })
        .catch((error) => {
          console.error("There was an error", error);
        });
    }
  });

  return <div className="text-center mt-5">Super secret</div>;
};
