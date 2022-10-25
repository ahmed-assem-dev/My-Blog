import { Link } from "react-router-dom";

const ArticlesSlider = ({ articles }) => {
  return (
    <div className="w-[100%] mt-5 px-5 mx-auto flex flex-col border-y-2 items-center ">
      <h1 className="text-5xl font-mono text-gray-700 my-4 text-left w-[100%]">
        latest Posts:
      </h1>
      <div className="flex flex-col flex-nowrap lg:flex-row overflow-x-auto hover:scrollbar-thin scrollbar-thumb-rounded-full active:scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-100 border-2  rounded-lg p-3 mb-5 w-[90%]">
        {articles.map((article) => (
          <Link
            to={`/articles/${article.name}`}
            key={article.name}
            className="cursor-pointer flex flex-col border border-[#727D71] hover:border-[#E2DADB] bg-gray-150 hover:bg-white shadow-lg scale-90 hover:scale-100 ease-in duration-300  p-4 rounded-lg min-w-[50%]"
          >
            <h2 className="text-4xl font-light text-[#222222]">
              {article.title}
            </h2>
            <p>{article.paragraphs[0].substring(0, 150)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesSlider;
