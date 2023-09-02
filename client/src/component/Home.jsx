import React, { useState, useEffect } from "react";
import Post from "./Post";
import Layout from "./Layout";
import axios from "axios";

const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/post").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return <Layout>
    {
        posts && posts.map((post) => {
            return <Post {...post}/>
        })
    }
  </Layout>;
};

export default DisplayPosts;
