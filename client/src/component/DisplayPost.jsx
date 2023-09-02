import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

const DisplayPost = () => {
  const [postDetail, setPostDetail] = useState({});
  const { userInfo } = useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    axios(`http://localhost:5000/post/${id}`)
      .then((response) => {
        setPostDetail(response.data);
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }, []);

  if (!postDetail) return "";
  return (
    <Layout>
      <div className="displayPost">
        <h1>{postDetail.title}</h1>
        {postDetail.createdAt !== undefined && (
          <time>
            {format(new Date(postDetail.createdAt), "MMM d, y HH:mm")}
          </time>
         )}
        <div className="author">
          <p>by {postDetail.author?.name}</p>
        </div>
        {userInfo.id === postDetail.author?._id && (
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postDetail._id}`}>
              Edit this post
            </Link>
          </div>
        )}
        <div className="image">
          <img src={`http://localhost:5000/${postDetail.cover}`} alt="" />
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
        />
      </div>
    </Layout>
  );
};

export default DisplayPost;
