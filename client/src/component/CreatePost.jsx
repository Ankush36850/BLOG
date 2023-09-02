import React, { useState } from "react";
import Layout from "./Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();

    let data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    try {
      let response = await axios("http://localhost:5000/post", {
        method: "POST",
        data: data,
        withCredentials: true,
      });
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (err) {
      console.log(`Error in creating post ${err}`);
    }
  }

  if (redirect === true) {
    return <Navigate to={"/"} />;
  }

  return (
    <Layout>
      <form
        className="create-post"
        onSubmit={createNewPost}
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />

        <Editor value={content} onChange={setContent}/>

        <button>Create post</button>
      </form>
    </Layout>
  );
};

export default CreatePost;
