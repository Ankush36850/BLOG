import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Editor from "./Editor";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        axios(`http://localhost:5000/post/${id}`).then((response) => {
            setTitle(response.data.title);
            setSummary(response.data.summary);
            setContent(response.data.content);
        })
    }, [])

    async function updatePost(e) {
        e.preventDefault();

        let data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("id", id);
        if (files?.[0]) (
            data.set("file", files?.[0])
        )

        try {
            let response = await axios("http://localhost:5000/post", {
                method: "PUT",
                data: data,
                withCredentials: true,
            });
            if (response.status === 200) {
                // setRedirect(true);
            }
        } catch (err) {
            console.log(`Error in creating post ${err}`);
        }
    }


    if (redirect === true) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <Layout>
            <form
                className="update-post"
                onSubmit={updatePost}
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

                <Editor value={content} onChange={setContent} />

                <button>Update post</button>
            </form>
        </Layout>
    );
};

export default EditPost;
