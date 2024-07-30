import React from "react";
import GenderCheckbox from "./GenderCheckbox";

export const SignUp = () => {
  return (
    <>
      <h1> Welcome to SignUp Component..</h1>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            SignUp <span className="text-blue-500">SparkChat</span>
          </h1>
          <form>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">FullName</span>
              </label>
              <input
                type="text"
                placeholder="Enter FullName"
                className="w-full input input-bordered max-w-xs"
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
              />
            </div>
            <GenderCheckbox />

            <a
              href="#"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block ml-2"
            >
              Already have an account?
            </a>
            <div>
              <button className="btn btn-block mt-2">Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
