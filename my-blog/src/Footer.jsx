import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col items-center mt-10 p-10 pt-5 bg-[#96939B] bottom-0">
      <h3 className="font-thin font-mono text-2xl text-center pb-5 w-[100%]">
        Contact me
      </h3>
      <ul className="flex flex-row justify-between w-[100%] lg:w-[30%]">
        <li>
          <Link className="hover:underline underline-offset-4 font-mono decoration-[#727D71] p-2 ">
            Email
          </Link>
        </li>
        <li>
          <Link
            to="https://www.linkedin.com/in/ahmed-al-shahawy/"
            className="hover:underline underline-offset-4 font-mono decoration-[#727D71] p-2 "
          >
            Linkedin
          </Link>
        </li>
        <li>
          <Link className="hover:underline underline-offset-4 font-mono decoration-[#727D71] p-2 ">
            Instagram
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
