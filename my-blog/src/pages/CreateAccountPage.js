import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError("Please enter a valid email!");
      console.log(e);
    }
  };

  return (
    <div className="w-[40%] flex flex-col items-center border-y border-gray-200 ease-in duration-300 hover:border-gray-500 my-20 p-5">
      <h1 className="text-5xl font-mono p-5">Create Account</h1>
      {error && <p className="text-red-700 p-1 font-mono">{error}</p>}
      <div className="flex flex-col w-[60%] justify-center">
        <label className="text-2xl font-mono p-1 text-center">Email:</label>
        <input
          className="border border-black p-1 m-1 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
        />
        <label className="text-2xl font-mono p-1 text-center">Password:</label>
        <input
          className="border border-black p-1 m-1 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          type="password"
        />
        <label className="text-2xl font-mono p-1 text-center">
          Confirm Password:
        </label>
        <input
          className="border border-black p-1 m-1 rounded-md"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          type="password"
        />
      </div>
      <button
        className="text-green-700 hover:text-white border border-green-700 ease-in-out duration-300 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-5"
        onClick={createAccount}
      >
        Sign up
      </button>
      <p className="text-lg">
        Already have one?{" "}
        <Link
          className="underline underline-offset-2 hover:no-underline hover:text-gray-700"
          to="/login"
        >
          Log in here.
        </Link>
      </p>
    </div>
  );
};

export default CreateAccountPage;
