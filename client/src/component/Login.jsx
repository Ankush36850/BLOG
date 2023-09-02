import React, { useContext, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  let { setUserInfo } = useContext(UserContext);

  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let [redirect, setRedirect] = useState(false);

  async function login(e) {
    e.preventDefault();
    alert("Clicked");
    try {
      let response = await axios({
        method: "POST",
        url: "http://localhost:5000/login",
        withCredentials: true,
        data: data,
      });
      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
      }
    } catch (err) {
      let message = JSON.stringify(err.response.data.message);
      alert(message);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <Layout>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </Layout>
  );
};

export default Login;
