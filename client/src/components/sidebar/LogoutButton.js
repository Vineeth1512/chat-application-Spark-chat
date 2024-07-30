import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

function LogoutButton() {
  return (
    <div className="mt-auto">
      <BiLogOutCircle className="w-6 h-6 cursor-pointer text-white" />
    </div>
  );
}

export default LogoutButton;
