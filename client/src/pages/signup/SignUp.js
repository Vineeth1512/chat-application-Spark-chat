import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link, useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";
import { Toaster } from "react-hot-toast";

export const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignUp();
  const navigate = useNavigate();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      await signup(inputs);
      navigate("/login");
    } catch (err) {
      console.log("Signup failed", err);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up <span className="text-blue-500">SparkChat ✨</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">FullName</span>
              </label>
              <input
                type="text"
                placeholder="Enter FullName"
                className="w-full input input-bordered max-w-xs"
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full input input-bordered max-w-xs"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered max-w-xs"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">ConfirmPassword</span>
              </label>
              <input
                type="password"
                placeholder="Enter ConfirmPassword"
                className="w-full input input-bordered max-w-xs"
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
            <GenderCheckbox
              oncheckboxChange={handleCheckboxChange}
              selectedGender={inputs.gender}
            />

            <Link
              to={"/login"}
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block ml-2"
            >
              Already have an account?
            </Link>
            <div>
              <button className="btn btn-block mt-2" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up 🚀"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
