import ArticlesList from "../components/ArticlesList";
import artciles from "./articles";

const ArticlesListPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl text-center lg:text-left mb-2 w-[50%] font-mono mt-5 underline decoration-2 underline-offset-4">
        Posts
      </h1>
      <ArticlesList artciles={artciles} />
    </div>
  );
};

export default ArticlesListPage;
