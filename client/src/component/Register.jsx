import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function register(e) {
    alert("clicked");
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/register",
        data: data,
      });
      alert(JSON.stringify(response.data));
    } catch (error) {
      alert(JSON.stringify(error.response.data));
    }
  }

  return (
    <Layout>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button>Register</button>
      </form>
    </Layout>
  );
};

export default Register;
