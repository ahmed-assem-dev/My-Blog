import profileImage from "../images/CropedProfile.png";
import { Link } from "react-router-dom";
import { AiFillMail, AiFillLinkedin, AiFillInstagram } from "react-icons/ai";

const AboutPage = () => {
  return (
    <div className="flex  flex-row w-[90%] lg:w-[60%] justify-center mt-10 h-[65vh]">
      <div className="flex flex-col items-center w-1/4 p-5 pr-0 mt-10   ">
        <img
          src={profileImage}
          alt=""
          className="rounded-full w-[150px] h-[150px] ring ring-[#222222] opacity-90 hover:opacity-100 ring-offset-1"
        />
        <h1 className="mt-5 text-2xl font-serif font-medium">Ahmed Assem</h1>
        <ul className="flex w-[60%] justify-between mt-2">
          <li>
            <Link>
              <AiFillMail className="text-2xl opacity-80 hover:opacity-100" />
            </Link>
          </li>
          <li>
            <Link>
              <AiFillLinkedin className="text-2xl opacity-80 hover:opacity-100" />
            </Link>
          </li>
          <li>
            <Link>
              <AiFillInstagram className="text-2xl opacity-80 hover:opacity-100" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-5">
        <h1 className="text-4xl font-mono">About</h1>
        <p className=" w-[90%] text-xl leading-9 font-serif p-5 indent-5 tracking-wide">
          Welcome to my blog! I am Ahmed Assem an electrical engineering student
          at Ain-Shams university and a junior Full-stack web developer.Here I
          talk about web, tech, books and other topics, So if you're interested
          in one of these sign up to stay updated!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
