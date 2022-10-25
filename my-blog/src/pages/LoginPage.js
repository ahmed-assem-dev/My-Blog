import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <div className="w-[40%] flex flex-col items-center border-y border-gray-200 ease-in duration-300 hover:border-gray-500 my-20 p-5">
      <h1 className="text-5xl font-mono p-5  ">Log in</h1>
      {error && <p className="error">{error}</p>}
      <div className="flex flex-col w-[60%] justify-center">
        <label className="text-2xl font-mono p-1    text-center">Email:</label>
        <input
          className="border border-black p-1 m-1 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
        />
        <label className="text-2xl font-mono p-1 text-center">Password:</label>
        <input
          className="border border-black p-1 m-1 rounded-md "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          type="password"
        />
      </div>
      <button
        className="text-green-700 hover:text-white border border-green-700 ease-in-out duration-300 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-5"
        onClick={logIn}
      >
        Log in
      </button>
      <p className="text-lg">
        Don't have an account?{" "}
        <Link
          className="underline underline-offset-2 hover:no-underline hover:text-gray-700"
          to="/create-account"
        >
          create one here.
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
