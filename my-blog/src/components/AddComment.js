import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddComment = ({ articleName, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      {
        headers,
      }
    );
    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommentText("");
  };

  return (
    <div className="flex flex-col w-[80%] lg:w-[50%] items-center">
      <h3 className="text-2xl font-mono mt-5 text-left w-[100%]">
        Add a Comment:
      </h3>
      {user && (
        <p className="text-lg w-[100%] text-left">
          You are posting as {user.email}
        </p>
      )}
      <textarea
        className="border border-black w-[70%]"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows="4"
        cols="50"
      />
      <button
        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2 mb-2"
        onClick={addComment}
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
