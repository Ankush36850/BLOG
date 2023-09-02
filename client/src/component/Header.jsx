import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    axios("http://localhost:5000/profile", {
      withCredentials: true,
    }).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  function logout() {
    axios("http://localhost:5000/logout", {
      withCredentials: true,
      method: "POST",
    });
    setUserInfo({});
  }

  const userName = userInfo.name;

  return (
    <div className="header ">
      <Link to="/" className="logo">
        My Logo
      </Link>
      <nav>
        {userName ? (
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/" onClick={logout}>Logout </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="login">
              login
            </Link>
            <Link to="/register" className="register">
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
