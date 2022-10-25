import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from "./hooks/useUser";

const NavBar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <nav className="p-2 m-1 bg-[#222222] text-[#D4E4BC] flex justify-center">
      <ul className="flex ml-auto">
        <li>
          <Link
            to="/"
            className="p-2 hover:underline underline-offset-4 decoration-[#727D71] text-3xl font-thin"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="p-2 hover:underline underline-offset-4 decoration-[#727D71]  text-3xl font-thin"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/articles"
            className="p-2 hover:underline underline-offset-4 decoration-[#727D71] text-3xl font-thin"
          >
            Posts
          </Link>
        </li>
      </ul>

      {user ? (
        <div className="ml-auto border border-black hover:border-[#BB4430] p-2 w-[100px] h-[45px] text-center">
          <button
            onClick={() => {
              signOut(getAuth());
            }}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="ml-auto border border-black hover:border-[#D4E4BC] p-2 w-[100px] h-[45px] text-center">
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
