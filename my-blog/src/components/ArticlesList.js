import { Link } from "react-router-dom";

const ArticlesList = ({ artciles }) => {
  return (
    <>
      {artciles.map((article) => (
        <Link
          className="w-[90%] lg:w-[50%] cursor-pointer flex flex-row border-y  h-[200px]   hover:border-[#222222]  scale-95 hover:scale-100 ease-in duration-300 p-4 m-2"
          id="list-body"
          key={article.name}
          to={`/articles/${article.name}`}
        >
          <img
            src={article.image}
            alt="Learn React"
            className="mr-2 w-[200px]"
          />
          <div className="w-2/3">
            <h3 className="text-xl font-bold ">{article.title}</h3>
            <p>{article.paragraphs[0].substring(0, 200)}...</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ArticlesList;
