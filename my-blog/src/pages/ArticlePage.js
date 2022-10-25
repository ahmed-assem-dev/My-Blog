/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import artciles from "./articles";
import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import NotFoundPage from "./NotFoundPage";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      // console.log(user);
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user]);

  const article = artciles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1 className="text-5xl mt-5 font-light">{article.title}</h1>
      <div className="flex m-2">
        {user ? (
          <>
            <button
              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={addUpvote}
            >
              {canUpvote ? "Upvote" : "Already upvoted"}
            </button>
            {/* <button onClick={() => console.log(user)}>Log</button> */}
          </>
        ) : (
          <button
            className="text-[#222222] hover:text-white border border-[#222222] hover:bg-[#222222] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in to upvote
          </button>
        )}
        <p className="text-xl font-light p-2">
          This article has {articleInfo.upvotes} upvote(s)
        </p>
      </div>
      {article.paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className="text-xl leading-9 font-serif w-[80%] m-5 mt-2 indent-5 lg:w-[50%] font-light tracking-wide"
        >
          {paragraph}
        </p>
      ))}
      {user ? (
        <AddComment
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button
          className="text-[#222222] hover:text-white border border-[#222222] hover:bg-[#222222] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in to add a comment
        </button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
