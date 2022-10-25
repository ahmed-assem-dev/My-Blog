// eslint-disable-next-line no-unused-vars
import bg from "../images/bg.jpg";
import bg2 from "../images/img.jpg";
import ArticlesSlider from "../components/ArticlesSlider";
import artciles from "./articles";
const HomePage = () => {
  return (
    <div className="flex flex-col w-[90%]">
      <div className="flex flex-col lg:flex-row w-[100%]">
        <h1 className="text-8xl lg:text-9xl italic leading-[0.8em] font-thin font-mono w-[100%] lg:w-1/2 p-5 pt-10 text-gray-700 text-center">
          Welcome
          <br />
          to
          <br />
          My Blog
        </h1>

        <img
          src={bg2}
          alt="A book"
          className="w-[100%] lg:w-1/2 mt-5 lg:mt-0"
        ></img>
      </div>
      <ArticlesSlider articles={artciles} />
    </div>
  );
};

export default HomePage;
